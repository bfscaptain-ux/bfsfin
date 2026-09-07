const fs = require("fs");
let faqs = JSON.parse(fs.readFileSync("src/data/faqs.json", "utf8"));
faqs = faqs.filter(f => !f.id.startsWith("faq_owner") && !f.id.startsWith("faq_smalltalk") && !f.id.startsWith("faq_contact") && !f.id.startsWith("faq_about") && !f.id.startsWith("faq_bot"));
fs.writeFileSync("src/data/faqs.json", JSON.stringify(faqs, null, 2), "utf8");

