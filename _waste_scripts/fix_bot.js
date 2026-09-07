const fs = require("fs");
let code = fs.readFileSync("src/components/SmartBot.tsx", "utf8");

const autoDetectCode = `
  const autoDetectLanguage = (text: string) => {
    if (/[\\u0900-\\u097F]/.test(text)) return "hi";
    if (/[\\u0A80-\\u0AFF-/.test(text)) return "gu";
    if (/[\\u0980-\\u09FF]/.test(text)) return "bn";
    if (/[\\u0A00-\\u0A7F]/.test(text)) return "pa";
    return null;
  };
`;

code = code.replace("const handleUserAction = (text: string) => {", autoDetectCode + "\n  const handleUserAction = (text: string) => {");

const langSwitchLogic = `
    const detectedLang = autoDetectLanguage(text);
    if (detectedLang) {
      const select = document.querySelector(".goog-te-combo") as HTMLSelectElement;
      if (select && select.value !== detectedLang) {
        select.value = detectedLang;
        select.dispatchEvent(new Event("change"));
      }
    }
`;
code = code.replace("if (!text.trim()) return;", "if (!text.trim()) return;\n" + langSwitchLogic);

code = code.replace(/Waah! Aapka score 750 toh bahut badhiya hai! \uD83C\uDE92 Is par aapko sabse best interest rates aur jaldi approval milega\^/g, "Behtareen! Aapka CIBIL score 750+ bahut achha hai. Is par aapko sabse best interest rates aur turant approval milega.");
code = code.replace(/Smart choice! BT se interest rate kaafi kam ho sakta hai\\. Aapka current loan kis bank ya NBFC se chal raha hai\?/g, "Behtareen chunaav. Balance Transfer se aapka interest rate kaafi kam ho sakta hai. Aapka current loan kis Bank ya NBFC mein chal raha hai?");
code = code.replace(/Ek chhoti si baat poochhni thi \uD83C\uDE14 Kya aapne koi property dekh li hai, ya abhi sirf ye check karna hai ki kitna loan mil sakta hai\?/g, "Aage badhne se pehle, kripya batayein: Kya aapne property final kar li hai ya abhi sirf limit check karni hai?");
code = code.replace(/Aur wahan abhi aapka interest rate \(ROI\) lagbhag kitna chal raha hai\?/g, "Wahan aapka maujooda interest rate (ROI) lagbhag kitna hai?");
code = code.replace(/Great! Ek aakhiri cheez, aap job karte hain ya aapka apna business hai\?/g, "Dhanyawad. Kripya apni employment profile chunein:");
code = code.replace(/Bilkul! \uD83D\uDC4D Ek aur important baat — banks aapka CIBIL score zaroor dekhte hain\\. Aapka score abhi lagbhag kitna hai\?/g, "Aage badhne ke liye, kripya apna anumanit (approximate) CIBIL score batayein:");
code = code.replace(/Waah! \uD83C\uDF1F Aapka profile ekdum first class lag raha hai — best interest rate milne ke poore chances hain! Ab batayein, aapko kitne ka loan chahiye\?/g, "Excellent. Aapka profile bahut achha hai aur best interest rates ke poore chances hain. Kripya batayein aapko kitne loan amount ki aavashyakta hai?");
code = code.replace(/Maafi chahta hun, amount samajh nahi aaya\\. \uD83C\uDE15 Kripya upar diye gaye calculator se "Proceed" dabayein, ya amount numbers mein likhein \(jaise: "25 Lakh" ya "1.5 Crore"\)\\/g, "Kshama karein, amount samajh nahi aaya. Kripya amount numbers mein darj karein (jaise: 25 Lakh).");
code = code.replace(/Maaf kijiye, mujhe samajh nahi aaya\\. \uD83C\uDE15 Kripya apna CIBIL score number mein likhein \hjaise 750\) ya button dabayein\\./g, "Kshama karein. Kripya apna CIBIL score numbers mein darj karein ya niche diye chunein.");
code = code.replace(/Perfect! \uD83DD\uDE8A Ab bas ek kaam aur — aapka naam batayein toh main aapka personalized profile ready karta hun!/g, "Dhanyawad. Kripya apna shubh naam darj karein taaki hum aapki profile taiyar kar sakein.");
code = code.replace(/Accha! Aap job karte hain ya apna koi business hai\? \uD83D\uDBCC/g, "Kripya apni employment type chunein:");
code = code.replace(/Shukriya! \uD83D\uDE8A Ab sirf do cheezein chahiye — naam aur number\\. Pehle apna naam batayein!/g, "Dhanyawad. Kripya aage badhne ke liye apna naam darj karein:");
code = code.replace(/Bahut accha \$\{text\} ji! \uD83C\uDF89 Ab apna 10-digit mobile number share karein — hamare senior expert aapko personally call karenge aur best deal finalize karenge!/g, "Dhanyawad ${text} ji. Kripya apna 10-digit mobile number darj karein. Hamare senior expert jald hi aapse sampark karenge.");
code = code.replace(/Ek second\\.\\.\\. aapki profile secure tarike se submit ho rahi hai! \u23F3/g, "Kripya pratiksha karein. Aapki profile securely submit ki ja rahi hai...");
code = code.replace(/Hello! Hum abhi aapki application process kar rahe hain\\. Kripya apna pichla jawab dein, ya process rokne ke liye 'Cancel Process' dabayein\\./g, "Namaskar. Hum aapki application process kar rahe hain. Kripya apne pichle sawal ka jawab dein, ya 'Cancel Process' chunein.");
code = code.replace(/Khair, wapas aate hain/g, "Wapas form par aate hue");
code = code.replace(/Kripya form ka bacha hua jawab dein\\./g, "Kripya apni application puri karein.");

fs.writeFileSync("src/components/SmartBot.tsx", code);
