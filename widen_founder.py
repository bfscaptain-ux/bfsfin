import re

with open("src/app/HomeClient.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Make the container wider
content = content.replace('max-w-[1100px]', 'max-w-[1400px]')

# Increase padding of the card
content = content.replace('p-8 md:p-14 relative', 'p-8 md:p-16 lg:p-20 relative')

# Make the circle bigger
content = content.replace('md:w-[300px] md:h-[300px]', 'md:w-[360px] md:h-[360px]')
content = content.replace('w-[96%] h-[96%]', 'w-[95%] h-[95%]')

# Increase name text size
content = content.replace('text-3xl md:text-[40px]', 'text-4xl md:text-5xl lg:text-[56px] leading-[1.1]')

# Increase role text size
content = content.replace('text-[#00A160] dark:text-emerald-400 font-bold text-[16px] mb-8', 'text-[#00A160] dark:text-emerald-400 font-black text-[20px] mb-8 tracking-wide uppercase')

# Increase bio text size
content = content.replace('text-slate-600 dark:text-slate-400 text-[15px] leading-relaxed mb-8', 'text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-8')

# Increase trust badge text size
content = content.replace('text-[14px] text-slate-800', 'text-base text-slate-800')

# Increase quote size
content = content.replace('text-[19px] italic font-medium', 'text-2xl md:text-3xl italic font-medium leading-[1.6]')
content = content.replace('mt-8 z-10', 'mt-12 z-10') # Push quote down a bit

# Increase button size
content = content.replace('max-w-[280px] mx-auto flex', 'max-w-[320px] mx-auto flex')
content = content.replace('text-[15px] font-bold', 'text-lg font-bold')
content = content.replace('py-4 rounded-xl', 'py-5 rounded-2xl')

# Increase big quote mark sizes
content = content.replace('text-[80px]', 'text-[120px]')

# Make VERIFIED badge bigger
content = content.replace('px-5 py-3 rounded-2xl', 'px-8 py-4 rounded-3xl')
content = content.replace('min-w-[220px]', 'min-w-[260px]')
content = content.replace('text-[13px] font-black', 'text-[16px] font-black')
content = content.replace('text-[12px] text-slate-500', 'text-[14px] text-slate-500')

with open("src/app/HomeClient.tsx", "w", encoding="utf-8") as f:
    f.write(content)
