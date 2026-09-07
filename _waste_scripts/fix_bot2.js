const fs = require("fs");
let code = fs.readFileSync("src/components/SmartBot.tsx", "utf8");

const replaces = [
  [/Waah!.*?Aapka profile ekdum first class.*?Ab batayein, aapko kitne ka loan chahiye\?/g, "Excellent. Aapka profile bahut achha hai aur best interest rates ke poore chances hain. Kripya batayein aapko kitne loan amount ki aavashyakta hai?"],
  [/Ek chhoti si baat poochhni thi.*?Kya aapne koi property dekh li hai, ya abhi sirf ye check karna hai ki kitna loan mil sakta hai\?/g, "Aage badhne se pehle, kripya batayein: Kya aapne property final kar li hai ya abhi sirf limit check karni hai?"],
  [/Smart choice! BT se interest rate kaafi kam ho sakta hai.*?/g, "Behtareen chunaav. Balance Transfer se aapka interest rate kaafi kam ho sakta hai. Aapka current loan kis Bank ya NBFC mein chal raha hai?"],
  [/Great! Ek aakhiri cheez, aap job karte hain ya aapka apna business hai\?/g, "Dhanyawad. Kripya apni employment profile chunein:"],
  [/Bilkul!.*?Ek aur important baat — banks aapka CIBIL score zaroor dekhte hain.*?/g, "Aage badhne ke liye, kripya apna anumanit (approximate) CIBIL score batayein:"],
  [/Maafi chahta hun, amount samajh nahi aaya.*?Kripya upar diye gaye calculator se "Proceed" dabayein, ya amount numbers mein likhein.*/g, "Kshama karein, amount samajh nahi aaya. Kripya amount numbers mein darj karein (jaise: 25 Lakh)."],
  [/Maaf kijiye, mujhe samajh nahi aaya.*?Kripya apna CIBIL score number mein likhein.*?/g, "Kshama karein. Kripya apna CIBIL score numbers mein darj karein ya niche diye options chunein."],
  [/Hello! Hum abhi aapki application process kar rahe hain.*?Cancel Process.*?/g, "Namaskar. Hum aapki application process kar rahe hain. Kripya apne pichle sawal ka jawab dein, ya Cancel Process chunein."]
];

for(const [reg, rep] of replaces) {
  code = code.replace(reg, rep);
}

fs.writeFileSync("src/components/SmartBot.tsx", code, "utf8");

