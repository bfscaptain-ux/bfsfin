const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');
const path = require('path');

async function main() {
  const counselorHandbook = `
### MASTER COUNSELOR HANDBOOK & ETHICS ###

एक अच्छा **फाइनेंशियल काउंसलर / लोन एडवाइजर** वह होता है जो सिर्फ बैंक की फाइल लॉगिन न करे, बल्कि ग्राहक की वित्तीय स्थिति, जरूरत और भविष्य के लक्ष्यों को समझकर सही रास्ता दिखाए।

1. ग्राहक की ज़रूरत और प्रोफाइल का सटीक विश्लेषण (Need & Profile Assessment)
* आय का प्रकार समझना: Salaried है या Self-Employed.
* बजट और FOIR (Fixed Obligation to Income Ratio): सही EMI का हिसाब लगाना.
* LTV (Loan-to-Value): प्रॉपर्टी की वैल्यू के अनुपात में लोन समझाना.

2. सही लोन प्रोडक्ट चुनने में मार्गदर्शन (Right Product Match)
* घर खरीदना: Home Loan (कम ब्याज दर, लंबी अवधि, टैक्स छूट 80C).
* बिजनेस जरूरत: LAP (Loan Against Property) / Top-up.
* पुरानी लोन EMI ज्यादा होना: Balance Transfer (BT) + Top-up (Net Savings दिखाना).
* अल्पकालिक वर्किंग कैपिटल: Overdraft (OD) / Cash Credit (CC).

3. बैंकों और वित्तीय संस्थानों का गहरा ज्ञान
* PSU Banks, Private Banks, और HFCs/NBFCs की नीतियों का अंतर.
* सिबिल या इनकम में कमी होने पर सही संस्था का चुनाव.

4. पूरी लागत और पारदर्शिता (Total Cost of Borrowing)
* छिपे हुए खर्चे: Processing Fee, Legal & Technical Charges, Stamp Duty.
* फोरक्लोजर/प्रीपेमेंट नियम समझाना.
* Reducing Balance बनाम Flat Rate का अंतर.

5. सिबिल (CIBIL) सुधार और डॉक्यूमेंटेशन हैंडहोल्डिंग
* क्रेडिट हेल्थ चेक और गैर-जरूरी पूछताछ से बचाना.
* एक बार में स्पष्ट डॉक्यूमेंट लिस्ट देना.

6. संवाद (Communication) और ईमानदारी (Ethics)
* सरल भाषा में समझाना.
* ग्राहक का हित सर्वोपरि: ज्यादा कमीशन के लिए महंगा लोन नहीं बेचना.
`;

  // Create text file in public/uploads/knowledge
  const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'knowledge');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
  
  const filename = 'Master_Counselor_Handbook.txt';
  const filePath = path.join(uploadDir, filename);
  fs.writeFileSync(filePath, counselorHandbook);

  // Add to Knowledge Base
  await prisma.knowledgeDocument.create({
    data: {
      filename: "Master Counselor Handbook (Hindi)",
      fileUrl: "/uploads/knowledge/" + filename,
      status: "INDEXED_READY"
    }
  });

  console.log('Master Counselor Handbook added to Knowledge Base!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
