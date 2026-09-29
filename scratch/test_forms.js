const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbymBNLS0IXJ_ZTAHSdQdADRLhWrz33zIgiv_fZP_4nTayLPD-WLNPVsFndKhcBxBy0G/exec";

const payloads = [
  // 1. ITR Filing
  {
    formType: "ITR Filing",
    name: "Rahul Sharma (ITR Test)",
    phone: "9876543210",
    email: "rahul.itr@test.com",
    message: "PAN: ABCDE1234F - Need to file ITR-1. OTP: Verified",
    subType: "Salaried (ITR-1 Sahaj)",
    income: "5L - 10L",
    city: "Delhi",
    userLocation: "New Delhi, India"
  },
  // 2. MSME Registration
  {
    formType: "MSME Registration",
    name: "Priya Singh (MSME Test)",
    phone: "9988776655",
    email: "priya.msme@test.com",
    enterpriseName: "Priya Traders",
    message: "Need Udyam Registration",
    city: "Mumbai",
    userLocation: "Andheri, Mumbai, Maharashtra"
  },
  // 3. Live Visitor
  {
    formType: "Website Visitor",
    isVisitor: true,
    page: "/products/insurance",
    city: "Bangalore",
    state: "Karnataka",
    country: "India",
    device: "Mobile",
    browser: "Safari",
    ip: "192.168.1.1",
    userLocation: "Bangalore, Karnataka, India"
  },
  // 4. Appointment
  {
    formType: "Appointment",
    name: "Amit Kumar (Appt Test)",
    phone: "9123456780",
    email: "amit.appt@test.com",
    slotDate: "10/09/2026",
    slotTime: "Afternoon (02:00 PM - 04:00 PM)",
    subType: "Home Loan Consultation",
    city: "Pune",
    userLocation: "Pune, Maharashtra, India"
  },
  // 5. Instant Callback
  {
    formType: "Callback",
    name: "Sneha Gupta (Callback Test)",
    phone: "9876501234",
    productType: "Personal Loan",
    subType: "Urgent Call Request",
    city: "Lucknow",
    userLocation: "Lucknow, UP, India"
  },
  // 6. Complaint
  {
    formType: "Complaint",
    name: "Vikram Verma (Complaint Test)",
    phone: "9900887766",
    email: "vikram.comp@test.com",
    subType: "Service Delay",
    message: "My loan application is pending for 2 weeks.",
    city: "Agra",
    userLocation: "Agra, UP, India"
  },
  // 7. Loan Application
  {
    formType: "Loan Application",
    name: "Neha Patel (Loan Test)",
    phone: "8877665544",
    email: "neha.loan@test.com",
    productType: "Finance",
    subType: "Business Loan",
    loanAmount: "₹25,00,000",
    income: "₹1,50,000/month",
    employmentType: "Self Employed",
    city: "Ahmedabad",
    userLocation: "Ahmedabad, Gujarat, India"
  },
  // 8. Insurance Quote
  {
    formType: "Insurance Quote",
    name: "Suresh Reddy (Insurance Test)",
    phone: "7766554433",
    email: "suresh.ins@test.com",
    productType: "Insurance",
    subType: "Health Insurance",
    city: "Hyderabad",
    state: "Telangana",
    userLocation: "Hyderabad, Telangana, India"
  }
];

async function runTests() {
  console.log("Starting tests... Sending 8 payloads.");
  
  for (let i = 0; i < payloads.length; i++) {
    const payload = payloads[i];
    console.log(`Sending: ${payload.formType}...`);
    
    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      
      const result = await response.text();
      console.log(`Result [${payload.formType}]:`, result);
    } catch (err) {
      console.error(`Error sending [${payload.formType}]:`, err.message);
    }
    
    // Wait 2 seconds between requests to avoid any rate limits or locks
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  console.log("All tests completed!");
}

runTests();
