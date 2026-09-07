const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');
const path = require('path');

async function main() {
  const policyText = `
### MASTER LTV, FOIR & GEOGRAPHICAL POLICY ###

लोन काउंसलिंग और फाइल लॉगिन में लोकेशन (जियोग्राफिकल लिमिट) और LTV (Loan-to-Value) दो सबसे महत्वपूर्ण क्रेडिट पैरामीटर हैं।

1. लोकेशन एवं सर्विस एरिया के नियम (Geographical Radius)
* कोर म्यूनिसिपल एरिया (Nagar Nigam): शहर के अंदर स्थित स्वीकृत लेआउट। सभी सरकारी/प्राइवेट बैंक (HDFC, ICICI) तुरंत लॉगिन करते हैं।
* पेरी-अर्बन / सेमी-अर्बन (Semi-Urban): शहर से 10-30 किमी परिधि। प्राइवेट बैंक और HFCs (Can Fin, PNB, Piramal) कवर करते हैं।
* रूरल / लाल डोरा / देहात (Gram Panchayat): अन-अप्रूव्ड लेआउट। केवल अफोर्डेबल HFCs, SFBs (AU, Equitas) और NBFCs में प्रोसेस होता है।

2. LTV (Loan to Value) की सीमाएं
* Home Loan (≤ ₹30 लाख): 90% LTV
* Home Loan (₹30L – ₹75L): 80% LTV
* Home Loan (> ₹75 लाख): 75% LTV
* Plot + Construction: 70% – 75% LTV
* LAP (Residential): 60% – 70% LTV
* LAP (Commercial / Shop): 50% – 55% LTV
* Gram Panchayat / Lal Dora: 40% – 50% LTV

3. ग्राम पंचायत और बिना नक्शे वाली प्रॉपर्टी के विशेष नियम
* आवश्यक दस्तावेज: ग्राम प्रधान एनओसी, धारा 143 (गैर-कृषि आदेश), बिजली बिल, पक्का रास्ता (न्यूनतम 10-15 फीट) और भौतिक कब्जा।

4. टेक्निकल वैल्यूएशन के 3 प्रकार
* Market Value (FMV): बाजार भाव।
* Agreement Value: सरकारी सर्किल रेट/स्टांप वैल्यू।
* Realizable / Distress Value: नीलामी मूल्य (FMV का 80-85%)।
* गोल्डन रूल: बैंक लोन हमेशा Technical Realizable Value या Agreement Value में से जो भी कम (Lower) होगा, उसी पर LTV देगा।

5. LAP में LTV डेविएशन (70%+ LTV) कैसे अप्रूव कराएं?
* मजबूत कैश फ्लो (FOIR 35% से कम)।
* क्रॉस-कोलैटरलाइजेशन (अतिरिक्त FD/प्रॉपर्टी)।
* सेल्फ-ऑक्यूपाइड रेजिडेंशियल प्रॉपर्टी होना अनिवार्य।
* सिबिल 775+ और DPD '000'।

6. सैलरीड vs बिजनेस प्रोफाइल्स के लिए FOIR (Fixed Obligation to Income Ratio)
* Salaried FOIR लिमिट: 50% – 65%
* Business FOIR लिमिट: 60% – 75% (कैश फ्लो + डेप्रिसिएशन)
* बैलेंस करने का नियम: यदि LTV अधिक है (90%), तो FOIR 50% से नीचे रखना अनिवार्य है। आय कम पड़ने पर Co-Applicant जोड़ें या Tenure बढ़ाकर EMI कम करें।
`;

  // Create text file in public/uploads/knowledge
  const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'knowledge');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
  
  const filename = 'Master_LTV_FOIR_Geography_Policy.txt';
  const filePath = path.join(uploadDir, filename);
  fs.writeFileSync(filePath, policyText);

  // Add to Knowledge Base
  await prisma.knowledgeDocument.create({
    data: {
      filename: "Master LTV, FOIR & Geo Policy",
      fileUrl: "/uploads/knowledge/" + filename,
      status: "INDEXED_READY"
    }
  });

  console.log('Master LTV and FOIR Policy added to Knowledge Base!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
