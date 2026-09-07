const fs = require("fs");
let faqs = JSON.parse(fs.readFileSync("src/data/faqs.json", "utf8"));
faqs = faqs.map(f => {
  if (f.id === "faq_owner_1") {
    f.question = "Bhardwaj Financial Services (BFS) ka owner ya founder kaun hai? Malik ka naam batao.";
  } else if (f.id === "faq_smalltalk_1") {
    f.question = "Main badhiya hu! Theek hu, fine, good.";
  } else if (f.id === "faq_smalltalk_2") {
    f.question = "Aap kaise ho? How are you? Kya haal hai?";
  } else if (f.id === "faq_contact_1") {
    f.question = "Aapka contact number, phone, mobile ya address kahan hai? Call pe baat karni hai.";
  } else if (f.id === "faq_about_1") {
    f.question = "Bhardwaj Financial Services kya karte ho? Tumhari company ki services kya hai?";
  } else if (f.id === "faq_smalltalk_3") {
    f.question = "Dhanyawad, thanks, shukriya, thank you!";
  } else if (f.id === "faq_bot_1") {
    f.question = "Tum kaun ho? Apna naam batao.";
  }
  return f;
});
fs.writeFileSync("src/data/faqs.json", JSON.stringify(faqs, null, 2), "utf8");

