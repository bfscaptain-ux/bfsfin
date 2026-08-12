const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.md')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk(path.join(__dirname, 'src'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // 1. Owner changes
    content = content.replace(/Founder & Managing Director/g, 'Owner');
    content = content.replace(/Founder & Principal Consultant/g, 'Chief Legal Advisor');
    content = content.replace(/Founder & Team/g, 'Owner & Team');
    content = content.replace(/Leadership & Founder/g, 'Leadership & Owner');
    content = content.replace(/the visionary founder of/g, 'the Owner of');
    content = content.replace(/Founder of Bhardwaj Financial/g, 'Owner of Bhardwaj Financial');
    content = content.replace(/From the Founder's Desk/g, 'From the Owner\'s Desk');
    
    // 2. Name swaps based on context
    // Praveen was the founder, now Vinita is owner, Praveen is legal advisor
    
    // In HomeClient.tsx, it's a quote block
    if (file.includes('HomeClient.tsx')) {
        content = content.replace(/Adv\. Praveen Bhardwaj/g, 'Mrs. Vinita Sharma');
        content = content.replace(/<img\s+src="\/praveen_bhardwaj\.png"/g, '<img src="/vinita_sharma.png"');
        content = content.replace(/alt="Adv\. Praveen Bhardwaj"/g, 'alt="Mrs. Vinita Sharma"');
        content = content.replace(/Founder & Managing Director, BFS/g, 'Owner, BFS');
    }
    
    // In layout.tsx
    if (file.includes('layout.tsx')) {
        content = content.replace(/Adv\. Praveen Bhardwaj/g, 'Mrs. Vinita Sharma');
    }

    // In page.tsx schema
    if (file.includes('page.tsx') && !file.includes('about')) {
        content = content.replace(/"name": "Praveen Bhardwaj"/g, '"name": "Mrs. Vinita Sharma"');
    }
    
    // In admin page
    if (file.includes('admin') && file.includes('page.tsx')) {
        content = content.replace(/Adv\. Praveen Bhardwaj \(Super Admin\)/g, 'Mrs. Vinita Sharma (Super Admin)');
    }
    if (file.includes('AdminSidebar.tsx')) {
        content = content.replace(/Adv\. Praveen Bhardwaj/g, 'Mrs. Vinita Sharma');
    }
    
    // In insights page, author is still Praveen Bhardwaj but as legal advisor
    if (file.includes('insights') && file.includes('page.tsx')) {
        content = content.replace(/author: "Praveen Bhardwaj"/g, 'author: "Adv. Praveen Bhardwaj (Legal Advisor)"');
    }
    
    // In interviews page
    if (file.includes('interviews') && file.includes('page.tsx')) {
        content = content.replace(/Founder & Principal Consultant/g, 'Chief Legal Advisor');
    }
    
    // In FloatingSupport.tsx
    // The bot says: "Thank you! Adv. Praveen Bhardwaj's team will contact you..." -> This is fine, he is the legal advisor.
    
    // In AboutClient.tsx
    if (file.includes('AboutClient.tsx')) {
        content = content.replace(/Adv\. Praveen Bhardwaj/g, 'Mrs. Vinita Sharma');
    }
    
    // In FounderClient.tsx (should probably be owner client now)
    if (file.includes('FounderClient.tsx')) {
        content = content.replace(/Adv\. Praveen Bhardwaj/g, 'Mrs. Vinita Sharma');
        content = content.replace(/Founder & Managing Director, BFS/g, 'Owner, BFS');
        content = content.replace(/Praveen/g, 'Vinita'); // generic replace for the story
        content = content.replace(/He /g, 'She ');
        content = content.replace(/ his /g, ' her ');
        content = content.replace(/ him /g, ' her ');
    }
    
    if (file.includes('founder') && file.includes('page.tsx')) {
        content = content.replace(/Mr\. Praveen Bhardwaj/g, 'Mrs. Vinita Sharma');
    }
    
    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated: ${file}`);
    }
});
