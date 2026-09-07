import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import fs from "fs/promises";
import path from "path";
import { processUserMessage } from "@/lib/nlp";
import { parseDocumentQuery } from "@/lib/documents";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { text, contextStr } = body;

    if (!text) {
      return NextResponse.json({ success: false, error: "Text is required" }, { status: 400 });
    }

    const scenarios = await prisma.botScenario.findMany({ where: { isActive: true } });
    const rules = await prisma.botTrainingRule.findMany({ where: { isActive: true } });
    const rates = await prisma.bankRate.findMany();
    
    let faqs: any[] = [];
    let serviceAreas: any[] = [];
    try {
      const faqsData = await fs.readFile(path.join(process.cwd(), "src", "data", "faqs.json"), "utf8");
      faqs = JSON.parse(faqsData).filter((f: any) => f.status === "published");
    } catch(e) {}
    try {
      const saData = await fs.readFile(path.join(process.cwd(), "src", "data", "service-areas.json"), "utf8");
      serviceAreas = JSON.parse(saData);
    } catch(e) {}

    const knowledge = { scenarios, rules, rates, faqs, serviceAreas };
    
    // --- RASA INTEGRATION START ---
    let nlpResult = processUserMessage(text, knowledge, contextStr);
    
    try {
      // 1. Get Intent from Rasa (use 127.0.0.1 to avoid IPv6 issues in Node.js)
      const rasaParseRes = await fetch("http://127.0.0.1:5005/model/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
      });
      const rasaParse = await rasaParseRes.json();
      
      if (rasaParse && rasaParse.intent && rasaParse.intent.confidence > 0.6) {
        const rasaIntent = rasaParse.intent.name;
        
        // 2. Map Rasa intent to our frontend intents or keep it
        const RASA_HANDLED_INTENTS = [
          "greet", "goodbye", "affirm", "deny", "bot_challenge", "ask_documents", 
          "inform_employment", "smalltalk_how_are_you", "thank_you", "express_worry_cibil",
          "ask_finance_general", "ask_home_loan", "ask_business_loan", "ask_personal_loan",
          "ask_lap", "ask_balance_transfer", "ask_insurance_general", "ask_health_insurance",
          "ask_life_insurance", "ask_motor_insurance", "ask_insurance_claim",
          "ask_credit_card_general", "ask_credit_card_free", "ask_credit_card_lounge",
          "ask_credit_card_cashback", "ask_credit_card_eligibility", "ask_apply_product",
          "ask_contact_support", "check_home_loan_eligibility", "check_personal_loan_eligibility",
          "check_business_loan_eligibility", "check_lap_eligibility", "check_gold_loan_eligibility",
          "check_general_loan_eligibility", "check_credit_card_eligibility_advanced",
          "check_health_insurance_eligibility", "check_term_life_eligibility", "check_motor_insurance_eligibility"
        ];

        const isDocumentQueryExplicit = Boolean(text.toLowerCase().match(/\b(document|documents|kagaz|kagajat|paper|papers)\b/));
        if (nlpResult.intent === "context_followup") {
          // Contextual resolution from bot's own previous response
        } else if (rasaIntent === "ask_documents" || isDocumentQueryExplicit) {
          const docResult = parseDocumentQuery(text);
          nlpResult = {
            intent: "document_query",
            sentiment: "neutral",
            confidence: 0.99,
            extractedEntities: {},
            reply: docResult.html,
            options: docResult.options
          };
        } else if (rasaIntent === "ask_contact_support") {
          nlpResult = {
            intent: "fallback",
            sentiment: "neutral",
            confidence: 0.99,
            extractedEntities: {},
            reply: "Aap hamare Senior Financial Advisor se seedha WhatsApp ya Direct Helpline par sampark kar sakte hain:",
            options: ["WhatsApp Executive 💬", "Call Executive 📞", "Check Eligibility 🔢", "Start Over 🔄"]
          };
        } else if (rasaIntent === "nlu_fallback" || rasaIntent === "out_of_scope") {
          nlpResult = {
            intent: "fallback",
            sentiment: "neutral",
            confidence: 0.2,
            extractedEntities: {},
            reply: "Maaf kijiyega, main aapke is sawaal ko poori tarah samajh nahi paaya. 🤖 Hamare senior executive aapse seedha WhatsApp par baat karne ke liye taiyar hain:",
            options: ["WhatsApp Executive 💬", "Call Executive 📞", "Check Eligibility 🔢", "Start Over 🔄"]
          };
        } else if (RASA_HANDLED_INTENTS.includes(rasaIntent) || rasaIntent.startsWith("check_") || rasaIntent.startsWith("ask_")) {
            // Get actual text reply from Rasa
            const rasaMsgRes = await fetch("http://127.0.0.1:5005/webhooks/rest/webhook", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ sender: "user123", message: text })
            });
            const rasaMsgs = await rasaMsgRes.json();
            
            const replyText = rasaMsgs.length > 0 
              ? rasaMsgs.map((m: any) => m.text).filter(Boolean).join("\n\n") 
              : nlpResult.reply;
            
            // Map Rasa "greet" to frontend "greeting" intent to trigger UI correctly
            const mappedIntent = rasaIntent === "greet" ? "greeting" : rasaIntent;

            let suggestedOptions: string[] | undefined = undefined;
            if (rasaIntent === "greet") {
              suggestedOptions = ["Loans & Finance 💰", "Insurance Plans 🛡️", "Credit Cards 💳", "Check Eligibility 🔢"];
            } else if (rasaIntent.startsWith("check_")) {
              suggestedOptions = ["Check Eligibility 🔢", "Apply Online 📝", "WhatsApp Executive 💬", "Call Executive 📞"];
            } else if (rasaIntent.startsWith("ask_finance") || rasaIntent.startsWith("ask_home") || rasaIntent.startsWith("ask_business") || rasaIntent.startsWith("ask_personal") || rasaIntent.startsWith("ask_lap") || rasaIntent.startsWith("ask_balance")) {
              suggestedOptions = ["Apply for Finance 💰", "Check Eligibility 🔢", "WhatsApp Executive 💬", "Bank Rates 🏦"];
            } else if (rasaIntent.startsWith("ask_insurance")) {
              suggestedOptions = ["Apply for Insurance 🛡️", "Health Insurance 🏥", "Term Life Plan 👨‍👩‍👧‍👦", "Motor Insurance 🚗"];
            } else if (rasaIntent.startsWith("ask_credit_card")) {
              suggestedOptions = ["Apply for Card 💳", "Lifetime Free Card 🆓", "Airport Lounge ✈️", "Card Eligibility 📋"];
            } else if (rasaIntent === "ask_apply_product") {
              suggestedOptions = ["Apply Finance 💰", "Apply Insurance 🛡️", "Apply Credit Card 💳", "WhatsApp Executive 💬"];
            } else if (rasaIntent === "ask_about_bfs") {
              suggestedOptions = ["Home Loan (7.15%*) 🏠", "Check Eligibility 🔢", "WhatsApp Executive 💬", "Finance & Loans 💰"];
            } else if (rasaIntent === "affirm") {
              suggestedOptions = ["Home Loan (7.15%*) 🏠", "Check Eligibility 🔢", "WhatsApp Executive 💬", "Finance & Loans 💰"];
            }
            
            nlpResult = {
              intent: mappedIntent as any,
              sentiment: "neutral",
              confidence: rasaParse.intent.confidence,
              extractedEntities: {},
              reply: replyText,
              options: suggestedOptions
            };
        }
      } else if (!nlpResult.reply && (!rasaParse?.intent || rasaParse?.intent?.confidence <= 0.6)) {
        nlpResult = {
          intent: "fallback",
          sentiment: "neutral",
          confidence: 0.1,
          extractedEntities: {},
          reply: "Main aapke prashna ko poori tarah samajh nahi paaya. 🤖 Kripya hamare senior executive se seedha WhatsApp par connect karein:",
          options: ["WhatsApp Executive 💬", "Call Executive 📞", "Check Eligibility 🔢", "Start Over 🔄"]
        };
      }
    } catch (rasaError) {
      console.log("Rasa server not reachable, falling back to local NLP.");
    }
    // --- RASA INTEGRATION END ---

    // Final check: if local NLP didn't understand and gave no reply, trigger fallback
    if (!nlpResult.reply && (nlpResult.intent === "unknown" || (nlpResult.intent as any) === "fallback")) {
      nlpResult = {
        intent: "fallback",
        sentiment: "neutral",
        confidence: 0.1,
        extractedEntities: {},
        reply: "Main aapka prashna poori tarah nahi samajh paaya. 🤖 Kripya hamare senior executive se seedha WhatsApp par connect karein:",
        options: ["WhatsApp Executive 💬", "Call Executive 📞", "Check Eligibility 🔢", "Start Over 🔄"]
      };
    }

    return NextResponse.json({ success: true, data: nlpResult });
  } catch (error: any) {
    console.error("Bot Chat API Error:", error);
    return NextResponse.json({ success: false, error: "Failed to process message" }, { status: 500 });
  }
}
