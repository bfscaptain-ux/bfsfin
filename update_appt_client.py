import re

with open("src/app/appointment/AppointmentClient.tsx", "r", encoding="utf-8") as f:
    content = f.read()

submit_logic = """  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email || `no-email-${Date.now()}@appointment.local`,
          loanType: consultationType || "General Consultation",
          source: `APPOINTMENT: ${selectedDate} | ${selectedTime}`
        })
      });
      setStep(4);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };"""

content = re.sub(
    r'const handleSubmit = \(e: React\.FormEvent\) => \{\n\s*e\.preventDefault\(\);\n\s*setIsSubmitting\(true\);\n\s*// Simulate API call\n\s*setTimeout\(\(\) => \{\n\s*setIsSubmitting\(false\);\n\s*setStep\(4\); // Success step\n\s*\}, 1500\);\n\s*\};',
    submit_logic,
    content
)

with open("src/app/appointment/AppointmentClient.tsx", "w", encoding="utf-8") as f:
    f.write(content)
