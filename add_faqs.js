const fs = require("fs");
const faqs = JSON.parse(fs.readFileSync("src/data/faqs.json", "utf8"));

const newFaqs = [
  {
    "id": "faq_owner_1",
    "question": "malik naam batao founder owner boss kiski website hai aapke",
    "answer": "Bhardwaj Financial Services ke founder aur owner Adv. Praveen Bhardwaj aur Vineeta Sharma hain. Yeh Agra ki #1 Home Loan aur Finance company hai.",
    "category": "About",
    "order": 1000,
    "status": "published"
  },
  {
    "id": "faq_smalltalk_1",
    "question": "main badiya hu theek achha hu fine good badhiya",
    "answer": "Sunkar achha laga! Agar aapko Home Loan, Property Loan ya kisi bhi financial details ke baare mein janna ho, toh main yahan hoon.",
    "category": "SmallTalk",
    "order": 1001,
    "status": "published"
  },
  {
    "id": "faq_smalltalk_2",
    "question": "tum kaise ho how are you kya haal hai",
    "answer": "Main bilkul theek hoon! Ek AI hone ke naate main hamesha aapki madad ke liye taiyar rehta hoon. Batayein, aapki kis prakar sahayata karu?",
    "category": "SmallTalk",
    "order": 1002,
    "status": "published"
  },
  {
    "id": "faq_contact_1",
    "question": "contact number phone mobile call baat karni hai address kahan",
    "answer": "Aap humse +91-7900-979-001 par sampark kar sakte hain. Humara office Agra, Uttar Pradesh mein sthit hai.",
    "category": "About",
    "order": 1003,
    "status": "published"
  },
  {
    "id": "faq_about_1",
    "question": "kya karte ho tumhari company services kya hai",
    "answer": "Bhardwaj Financial Services (BFS) Agra mein Home Loan, Loan Against Property (LAP), aur Balance Transfer ki suvidha deti hai. Hum kai bade banks (SBI, HDFC, PNB) ke priority partner hain.",
    "category": "About",
    "order": 1004,
    "status": "published"
  },
  {
    "id": "faq_smalltalk_3",
    "question": "thank you dhanyawad thanks shukriya",
    "answer": "Aapka swagat hai! Agar aapko aur koi jankari chahiye toh kripya zaroor puchein.",
    "category": "SmallTalk",
    "order": 1005,
    "status": "published"
  },
  {
    "id": "faq_bot_1",
    "question": "tum kaun ho apna naam batao",
    "answer": "Main BFS ka Advanced AI Loan Advisor hoon. Mujhe aapki home loan ki journey ko asan banane ke liye design kiya gaya hai.",
    "category": "SmallTalk",
    "order": 1006,
    "status": "published"
  }
];

// Avoid duplicates
const existingIds = new Set(faqs.map(f => f.id));
newFaqs.forEach(nf => {
  if(!existingIds.has(nf.id)) faqs.push(nf);
});

fs.writeFileSync("src/data/faqs.json", JSON.stringify(faqs, null, 2), "utf8");

