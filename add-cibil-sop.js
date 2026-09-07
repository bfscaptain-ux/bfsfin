const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');
const path = require('path');

async function main() {
  const cibilSOP = `
### MASTER CIBIL TRAINING & FIXATION SOP ###

किसी नए व्यक्ति या टीम मेंबर को बिल्कुल शून्य (Zero) से सिबिल (CIBIL) चेक करना और उसकी रिपोर्ट पढ़ना सिखाने के लिए यह 4-स्टेप ट्रेनिंग गाइड है।

Step 1: बुनियादी बातें समझाएं (Basic Foundation)
* 750 - 900: Excellent (लोन तुरंत और सबसे कम ब्याज दर पर मिलेगा)।
* 700 - 749: Good (आसानी से अप्रूवल संभव)।
* 650 - 699: Average (HFCs/NBFCs में जाएगा, ब्याज दर थोड़ी अधिक हो सकती है)।
* 300 - 649: Poor / Default (लोन रिजेक्ट होने का जोखिम, सुधार की जरूरत)।
* -1 या 0 (NH / No History): फ्रेश प्रोफाइल।
* Soft vs Hard Inquiry: खुद चेक करना Soft है (स्कोर नहीं गिरता)। बैंक का चेक करना Hard है (स्कोर गिरता है)।

Step 2: चेक करने के लिए आवश्यक विवरण (Required Details)
पूरा नाम, जन्म तिथि (DOB), PAN Card, आधार लिंक्ड मोबाइल नंबर, और पिन कोड।

Step 3: सिबिल निकालने की लाइव प्रक्रिया
1. cibil.com या पार्टनर डैशबोर्ड खोलें।
2. डेटा दर्ज करें।
3. OTP वेरिफिकेशन पूरा करें।
4. Detailed Report (PDF) डाउनलोड करें।

Step 4: CIBIL रिपोर्ट में क्या और कैसे देखना है (Report Reading Training)
1. Score Summary: 300-900 का ट्रेंड।
2. Account Information: एक्टिव vs क्लोज्ड। होम लोन vs अनसिक्योर्ड लोन।
3. DPD (Days Past Due): '000' या 'STD' मतलब सही भुगतान। SMA/SUB मतलब डिफॉल्ट।
4. Account Status / Remarks: Closed सही है। Settled, Written Off, Restructured तुरंत रिजेक्ट होते हैं।
5. Enquiries: पिछले 1 महीने में 4 से ज्यादा इन्क्वायरी (क्रेडिट-हंग्री प्रोफाइल) निगेटिव है।

गोल्डन रूल्स:
* स्पेलिंग मिस्टेक न करें वरना 'No Record Found' आएगा।
* DPD ग्रिड ज़ूम करके देखें, 000 होना चाहिए।
* Closed और Settled में फर्क समझें। सेटल्ड होने पर NDC अनिवार्य है।

---

### खराब सिबिल सुधारने और बैंक में जस्टिफाई करने की रणनीति ###

1. सिबिल समस्याओं का समाधान
A. Settled / Written-off को "Closed" में बदलना:
मूल बैंक से संपर्क करें -> वेवर अमाउंट (Waiver Difference) चुकाएं -> NOC/NDC लें -> बैंक से CIBIL अपडेट करवाएं (30-45 दिन)।

B. गलत डेटा / टेक्निकल एरर सुधारना (Disputes):
cibil.com पर Dispute Raise करें -> बैंक SOA प्रूफ लगाएं -> 30 दिन का TAT।

C. DPD Cleansing:
तुरंत बकाया क्लियर करें। Credit Utilization Ratio (CUR) 30% से कम रखें।

2. बैंक क्रेडिट टीम के सामने जस्टिफिकेशन
* पुराना सेटलमेंट: NOC + जस्टिफिकेशन लेटर (मेडिकल/जॉब लॉस प्रूफ)।
* माइनर DPD (1-30 दिन): टेक्निकल क्लेरिफिकेशन (ECS बाउंस/बैंक चेंज)।
* कम CIBIL (650-700): मजबूत को-एप्लिकेंट (माता-पिता/पत्नी) जोड़ें और LTV 80% से घटाकर 60-65% करें।

3. सिबिल को 0 से 750+ ले जाने का रिबिल्डिंग फॉर्मूला
1. FD-Backed (सिक्योर्ड) क्रेडिट कार्ड लें (उदा. SBI, IDFC)।
2. कार्ड से सिर्फ छोटे बिल भरें (30% से कम उपयोग) और Due Date से 3 दिन पहले पूरा भुगतान (Total Due) करें।
3. 6 महीने तक कोई लोन या हार्ड इन्क्वायरी न करें।
4. 6-9 महीने बाद स्कोर 750+ होने पर होम लोन फाइल करें।

4. लेंडर का सही चयन (Lender Mapping)
* 750+ (Clean Track): PSU बैंक (SBI, PNB) या टॉप प्राइवेट बैंक (HDFC, ICICI)।
* 650-720 (DPD या पुराना सेटलमेंट): हाउसिंग फाइनेंस कंपनियां (Can Fin, LIC HFL, PNB HFL, Aadhar Housing, Piramal)।
`;

  // Create text file in public/uploads/knowledge
  const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'knowledge');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
  
  const filename = 'Master_CIBIL_SOP.txt';
  const filePath = path.join(uploadDir, filename);
  fs.writeFileSync(filePath, cibilSOP);

  // Add to Knowledge Base
  await prisma.knowledgeDocument.create({
    data: {
      filename: "Master CIBIL SOP & Strategy",
      fileUrl: "/uploads/knowledge/" + filename,
      status: "INDEXED_READY"
    }
  });

  console.log('Master CIBIL SOP added to Knowledge Base!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
