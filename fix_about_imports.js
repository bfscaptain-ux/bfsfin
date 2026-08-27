const fs = require('fs');
let content = fs.readFileSync('src/app/about/AboutClient.tsx', 'utf8');

content = content.replace(
  'import { useState, useEffect } from "react";',
  'import { useState, useEffect } from "react";\nimport DynamicFaq from "@/components/DynamicFaq";'
);

fs.writeFileSync('src/app/about/AboutClient.tsx', content);
console.log('Fixed AboutClient imports');
