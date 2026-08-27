const fs = require('fs');

let content = fs.readFileSync('src/app/about/AboutClient.tsx', 'utf8');

// Add import
content = content.replace(
  'import { ArrowRight, CheckCircle2, Phone, Mail, MapPin, Award, Shield, Users, Clock, Building, Zap } from "lucide-react";',
  'import { ArrowRight, CheckCircle2, Phone, Mail, MapPin, Award, Shield, Users, Clock, Building, Zap } from "lucide-react";\nimport DynamicFaq from "@/components/DynamicFaq";'
);

const regex = /<div className="space-y-4">\s*\{\[\s*\{\s*q: "What makes Bhardwaj Finance[\s\S]*?<\/motion\.div>\s*\)\)}\s*<\/div>/;

const newFaq = `<div className="space-y-4">
            <DynamicFaq category="General" />
          </div>`;

content = content.replace(regex, newFaq);
fs.writeFileSync('src/app/about/AboutClient.tsx', content);
console.log('Replaced About FAQs!');
