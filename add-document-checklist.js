const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');
const path = require('path');

async function main() {
  const documentChecklist = `
### MASTER DOCUMENT CHECKLIST (LOAN WISE & PROFILE WISE) ###

यह मास्टर लोन डॉक्यूमेंटेशन डायरेक्टरी (Master Document Checklist) है, जिसे आप किसी भी लोन केस (Resident Indian और NRI दोनों) के लिए फाइल लॉगिन और वेरिफिकेशन में सीधे इस्तेमाल कर सकते हैं। इसे अलग-अलग लोन कैटेगरी, ग्राहक प्रोफाइल और प्रॉपर्टी टाइप के अनुसार वर्गीकृत किया गया है:

📁 भाग 1: अनिवार्य सामान्य दस्तावेज (Standard KYC)
(यह सेट हर प्रकार के लोन और आवेदक/सह-आवेदक/गारंटर पर लागू होता है)
* PAN Card (अनिवार्य)
* Aadhaar Card (मोबाइल लिंक्ड)
* निवास प्रमाण (Address Proof): बिजली बिल (2 माह से पुराना न हो) / वोटर आईडी / पासपोर्ट / रेंट एग्रीमेंट
* पासपोर्ट साइज फोटो: 2-3 नवीनतम रंगीन फोटो
* हस्ताक्षर सत्यापन (Signature Proof): पैन कार्ड / बैंक पासबुक / बैंकर वेरिफिकेशन
* प्रोसेसिंग फीस चेक: बैंक के नाम लॉगिन फीस चेक
* एप्लीकेशन फॉर्म: विधिवत भरा हुआ और हस्ताक्षरित

💼 भाग 2: आय प्रमाण दस्तावेज (Income Profile Wise)
A. वेतनभोगी (Salaried Applicants - Resident)
* पिछले 3 से 6 महीने की सैलरी स्लिप (कंपनी स्टैम्प व सिग्नेचर सहित)
* पिछले 6 से 12 महीने का सैलरी बैंक अकाउंट स्टेटमेंट (PDF फॉर्मेट, नेट बैंकिंग से डाउनलोडेड)
* पिछले 2 से 3 वर्षों का Form 16 (Part A & B) या ITR + Computation
* कंपनी का Employee ID Card और Appointment / Increment Letter
* यदि पूर्व कंपनी बदली है: पुरानी कंपनी का Relieving / Experience Letter

B. स्व-नियोजित / कारोबारी (Self-Employed Business / MSME)
* पिछले 3 वर्षों का ITR + कम्प्यूटेशन ऑफ इनकम
* पिछले 3 वर्षों की CA-ऑडिटेड बैलेंस शीट और Profit & Loss Account (टैक्स ऑडिट रिपोर्ट Form 3CA/3CD सहित, यदि लागू हो)
* पिछले 12 महीने का करंट अकाउंट बैंक स्टेटमेंट (मुख्य बिजनेस खाता) + सभी सेविंग अकाउंट्स के 12 माह के स्टेटमेंट
* बिजनेस विंटेज एवं रजिस्ट्रेशन प्रमाण: Udyam / MSME Registration Certificate, GST Certificate + पिछले 12 महीने का GSTR-3B और GSTR-1, Shop & Establishment Act License / Trade License / FSSAI License
* कंपनी गठन दस्तावेज (Entity Proof): 
  - Partnership: Partnership Deed + ROF Registration + Authority Letter
  - Pvt Ltd / Ltd: Certificate of Incorporation + MOA + AOA + Shareholding Pattern + Board Resolution
  - Proprietorship: कोई भी 2 सरकारी बिजनेस प्रूफ
* ऑफिस / फैक्ट्री / गोदाम का ओनरशिप प्रूफ या रजिस्टर्ड रेंट एग्रीमेंट + बिजली बिल

C. स्व-नियोजित प्रोफेशनल्स (SEP - Doctors, CAs, Architects, Engineers)
* पिछले 3 वर्षों का ITR + बैलेंस शीट और P&L
* पिछले 12 महीने का बैंक स्टेटमेंट (करंट और सेविंग)
* क्वालिफिकेशन डिग्री सर्टिफिकेट (MBBS/MD, CA, B.Arch आदि)
* Certificate of Practice (COP) / स्टेट मेडिकल काउंसिल / बार काउंसिल / ICAI रजिस्ट्रेशन
* क्लिनिक / ऑफिस का सेटअप और ओनरशिप प्रूफ / रेंट एग्रीमेंट

D. अनिवासी भारतीय (NRI / Expat - Salaried & Business)
* Valid Passport (सभी पेजों की प्रति) + Valid Visa / Work Permit / Permanent Residence (PR)
* विदेशी पहचान पत्र (जैसे Emirates ID, Green Card, SSN आदि)
* विदेशी नियोक्ता का Employment Contract / Offer Letter
* पिछले 6 महीने की विदेशी सैलरी स्लिप
* पिछले 12 महीने का विदेशी सैलरी अकाउंट स्टेटमेंट + पिछले 12 महीने का भारत का NRE/NRO बैंक स्टेटमेंट
* संबंधित देश की Credit Bureau Report (Equifax, Experian, AECB, TransUnion आदि)
* टैक्स रिटर्न दस्तावेज (जैसे US का W-2 Form, UK का P60, या GCC देशों के लिए सैलरी सर्टिफिकेट)
* Power of Attorney (GPA): भारतीय दूतावास (Indian Embassy/Consulate) द्वारा सत्यापित (Attested) या Apostille, और भारत में Adjudicate कराई गई प्रति + POA होल्डर के KYC

🏠 भाग 3: होम लोन (Home Loan - सभी 7 कैटेगरी)
1. फ्रेश रेडी-टू-मूव / रीसेल प्रॉपर्टी परचेज (Resale Purchase)
* Title Deed / Sale Deed: वर्तमान विक्रेता के नाम पर रजिस्टर्ड बैनामा
* Prior Deeds (Back Chain): पिछले 13 से 30 वर्षों की पुरानी सेल डीड्स/इकरारनामों की पूरी चेन
* Agreement to Sell (ATS / BBA): क्रेता और विक्रेता के बीच रजिस्टर्ड/नोटराइज्ड इकरारनामा
* Payment Receipts: सेलर को दी गई टोकन/मार्जिन मनी (Advance Money) की बैंकिंग रसीदें
* Mutation Extract (दाखिल-खारिज): सरकारी नगर निगम/तहसील रिकॉर्ड में विक्रेता का नाम
* Non-Encumbrance Certificate (NEC): सब-रजिस्ट्रार ऑफिस से 13-30 साल का भार-मुक्त प्रमाण पत्र
* Property Tax Receipts & Electricity Bill: नवीनतम हाउस टैक्स व बिजली बिल रसीद

2. अंडर-कंस्ट्रक्शन / बिल्डर फ्लैट परचेज (Under Construction / Builder Flat)
* Allotment Letter: बिल्डर द्वारा जारी अलॉटमेंट लेटर
* Builder-Buyer Agreement (BBA): रजिस्टर्ड या बैंक अप्रूव्ड एग्रीमेंट
* Builder NOC & Tripartite Agreement (TPA): बिल्डर द्वारा जारी बैंक लोन अनापत्ति प्रमाण पत्र
* Payment Receipts / Demand Letters: अब तक बिल्डर को किए गए भुगतान की रसीदें और स्टेज-वाइज डिमांड नोट
* RERA Registration Certificate: प्रोजेक्ट का रेरा अप्रूवल नंबर
* Approved Building Plan: विकास प्राधिकरण (Development Authority) से स्वीकृत नक्शा और सैंक्शन लेटर

3. प्लॉट खरीद + कंस्ट्रक्शन लोन (Plot Purchase + Construction Composite)
* प्लॉट की सेल डीड या एग्रीमेंट टू सेल + बैक चेन डीड्स
* रजिस्टर्ड आर्किटेक्ट/सिविल इंजीनियर द्वारा तैयार Construction Estimate / BOQ
* विकास प्राधिकरण / नगर निगम से स्वीकृत नक्शा (Sanctioned Map / Building Plan)
* भू-उपयोग प्रमाण (Non-Agricultural / 143 / CLU Order, यदि लागू हो)

4. स्वयं के प्लॉट पर गृह निर्माण लोन (Home Construction on Own Land)
* प्लॉट की मूल रजिस्टर्ड सेल डीड (Original Title Deed) + 30 साल की बैक चेन
* सक्षम प्राधिकारी से स्वीकृत नक्शा (Approved Plan)
* आर्किटेक्ट द्वारा प्रमाणित चरणबद्ध लागत अनुमान (Detailed Construction Estimate)
* नवीनतम दाखिल-खारिज (Mutation) और खतौनी/जमाबंदी

5. बैलेंस ट्रांसफर + टॉप-अप लोन (BT + Top-Up Home Loan)
* List of Original Documents (LOD / LOFC): मौजूदा बैंक से जारी ओरिजिनल पेपर्स की अधिकृत लिस्ट
* Foreclosure / Settlement Letter: मौजूदा लोन को बंद करने की कुल बकाया राशि का अधिकृत पत्र
* Sanction Letter: पुराने बैंक का ओरिजिनल सैंक्शन लेटर
* Loan Account Statement (SOA): शुरुआत से लेकर अब तक (या न्यूनतम 12-18 माह) का रीपेमेंट ट्रैक रिकॉर्ड
* प्रॉपर्टी पेपर्स की फोटोकॉपी का पूरा सेट

6. होम एक्सटेंशन / रिनोवेशन लोन (Home Extension / Improvement)
* मकान की मूल रजिस्ट्री और चेन डीड्स
* रेनोवेशन/एक्सटेंशन का आर्किटेक्ट एस्टिमेट
* म्यूटेशन और टैक्स रसीदें

7. प्रधानमंत्री आवास योजना (PMAY / Affordable Housing - यदि सब्सिडी लागू हो)
* परिवार के सभी सदस्यों के आधार कार्ड
* आय प्रमाण पत्र (Income Certificate - तहसीलदार/सक्षम प्राधिकारी द्वारा)
* आवेदक या परिवार के नाम भारत में कहीं पक्का मकान न होने का स्व-घोषणा पत्र (Affidavit)

🏢 भाग 4: प्रॉपर्टी पर लोन (Loan Against Property - LAP / Mortgage)
* संपूर्ण प्रॉपर्टी चेन: 30 वर्षों की मूल सेल डीड्स + गिफ्ट डीड/पार्टिशन डीड/रिलीज डीड (यदि लागू हो)
* सक्षम प्राधिकारी अप्रूवल: कमर्शियल/रेजिडेन्शियल स्वीकृत नक्शा या कंपाउंडिंग आर्डर
* Non-Encumbrance Certificate (NEC): 13-30 वर्ष का भार-मुक्त प्रमाण पत्र
* दाखिल-खारिज (Mutation): नवीनतम जमाबंदी/खतौनी या नगर निगम म्यूटेशन रिकॉर्ड
* प्रॉपर्टी टैक्स व यूटिलिटी बिल: पिछले 3 साल की संपत्ति कर रसीदें + कॉमर्शियल/घरेलू बिजली बिल
* किराया आय प्रमाण (Rent Discounting - LRD के लिए): टेनेंट के साथ रजिस्टर्ड लीज एग्रीमेंट, 12 महीने का रेंट क्रेडिट बैंक स्टेटमेंट, किरायेदार कंपनी का TDS सर्टिफिकेट

💼 भाग 5: अनसिक्योर्ड बिजनेस लोन (Unsecured Business Loan - BL)
* KYC: प्रोप्राइटर/पार्टनर्स/डायरेक्टर्स के पैन व आधार
* इनकम टैक्स: पिछले 2 से 3 साल का ITR, कम्प्यूटेशन, CA ऑडिट रिपोर्ट (बैलेंस शीट + P&L)
* बैंकिंग: पिछले 12 महीने का करंट अकाउंट बैंक स्टेटमेंट (सभी एक्टिव अकाउंट्स)
* GST: GST रजिस्ट्रेशन सर्टिफिकेट + पिछले 12 महीने के GSTR-3B रिटर्न
* बिजनेस विंटेज: कम से कम 3 साल पुराना बिजनेस प्रूफ (MSME / Shop Act / पुराने ITR)
* ओनरशिप प्रूफ: बिजनेस premises या निवास स्थान में से किसी एक का मालिकाना हक प्रमाण

💳 भाग 6: पर्सनल लोन (Personal Loan - PL)
* KYC: पैन कार्ड, आधार कार्ड, निवास प्रमाण
* सैलरी प्रूफ: पिछले 3 महीने की सैलरी स्लिप
* बैंक अकाउंट: पिछले 6 महीने का सैलरी बैंक स्टेटमेंट (नेट बैंकिंग पीडीएफ)
* एम्प्लॉयमेंट प्रूफ: कंपनी आईडी कार्ड, अपॉइंटमेंट लेटर या ऑफिशियल ईमेल वेरिफिकेशन
* मौजूदा लोन डिटेल्स: यदि कोई पर्सनल लोन/कार लोन चल रहा है, तो उसके सैंक्शन लेटर और 6 माह का SOA

🎓 भाग 7: एजुकेशन लोन (Education Loan - EL)
* छात्र के दस्तावेज: पैन कार्ड, आधार कार्ड, पासपोर्ट, 10वीं-12वीं-ग्रेजुएशन मार्कशीट्स, एंट्रेंस स्कोर कार्ड, Admission Letter, फीस स्ट्रक्चर.
* सह-आवेदक दस्तावेज: माता-पिता के KYC, आय प्रमाण (ITR/Salary Slip).
* सिक्योर्ड एजुकेशन लोन (7.5 लाख से अधिक): प्रॉपर्टी की रजिस्ट्री चेन, अप्रूव्ड मैप, NEC.

🚗 भाग 8: व्हीकल / ऑटो लोन (Car / Commercial Vehicle Loan)
* KYC व इनकम: स्टैंडर्ड KYC + 3 माह सैलरी स्लिप / 2 साल ITR + 6 माह बैंक स्टेटमेंट
* नई गाड़ी: अधिकृत डीलर से Proforma Invoice
* पुरानी गाड़ी: RC कॉपी, इंश्योरेंस, PUC, ओनरशिप ट्रांसफर हेतु RTO Form 29/30/35

✍️ भाग 9: पोस्ट-सैंक्शन और डिस्बर्समेंट किट (Post-Sanction Disbursement Set)
* लोन एग्रीमेंट (Loan Agreement Kit): बैंक का अधिकृत लोन कॉन्ट्रैक्ट
* NACH / e-Mandate: EMI ऑटो-डेबिट के लिए हस्ताक्षरित मैंडेट फॉर्म
* SPDC (Security Cheques): रीपेमेंट बैंक अकाउंट के 3 से 5 ब्लैंक कैंसिल्ड चेक
* मार्जिन मनी ट्रेल (Own Contribution Proof)
* CERSAI & MODT: सब-रजिस्ट्रार ऑफिस में बंधक पंजीकरण रसीद
* ओरिजिनल पेपर्स सबमिशन रिसीविंग पत्र
`;

  // Create text file in public/uploads/knowledge
  const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'knowledge');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
  
  const filename = 'Master_Document_Checklist.txt';
  const filePath = path.join(uploadDir, filename);
  fs.writeFileSync(filePath, documentChecklist);

  // Add to Knowledge Base
  await prisma.knowledgeDocument.create({
    data: {
      filename: "Master Document Checklist (All Loans)",
      fileUrl: "/uploads/knowledge/" + filename,
      status: "INDEXED_READY"
    }
  });

  console.log('Master Document Checklist added to Knowledge Base!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
