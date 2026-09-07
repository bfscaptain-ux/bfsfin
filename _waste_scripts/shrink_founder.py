import re

with open("src/app/HomeClient.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Reduce section vertical padding
content = content.replace('<section className="py-24 bg-slate-50', '<section className="py-12 bg-slate-50')

# 2. Make width full screen (or ultra-wide)
content = content.replace('className="max-w-[1400px] mx-auto', 'className="w-full max-w-[1920px] mx-auto')

# 3. Reduce card padding
content = content.replace('p-8 md:p-16 lg:p-20 relative overflow-hidden', 'p-8 md:p-10 lg:px-16 lg:py-10 relative overflow-hidden')

# 4. Reduce gaps
content = content.replace('gap-8 lg:gap-12 items-center', 'gap-6 lg:gap-8 items-center')

# 5. Make Image slightly smaller to reduce height
content = content.replace('md:w-[360px] md:h-[360px]', 'md:w-[260px] md:h-[260px]')
content = content.replace('w-[95%] h-[95%]', 'w-[96%] h-[96%]')

# 6. Reduce bottom margins to save vertical space
content = content.replace('uppercase MEET OUR FOUNDER</span>\n                  <div className="h-[2px]', 'uppercase MEET OUR FOUNDER</span>\n                  <div className="h-[2px]') # keep as is
content = content.replace('w-full mb-6', 'w-full mb-3')
content = content.replace('mb-2 tracking-tight', 'mb-1 tracking-tight')
content = content.replace('font-black text-[20px] mb-8 tracking-wide', 'font-black text-[18px] mb-4 tracking-wide')
content = content.replace('text-lg leading-relaxed mb-8', 'text-base leading-relaxed mb-4')
content = content.replace('justify-center mb-6', 'justify-center mb-4')
content = content.replace('mt-12 z-10', 'mt-4 z-10')
content = content.replace('mt-12 mb-8', 'mt-6 mb-4')
content = content.replace('mb-8">\n                  <div className="h-[2px]', 'mb-4">\n                  <div className="h-[2px]')

# 7. Button sizing (make it a bit more compact but still wide)
content = content.replace('py-5 rounded-2xl', 'py-3 rounded-xl')
content = content.replace('text-lg font-bold text-white', 'text-[15px] font-bold text-white')

# 8. Quote mark sizes (reduce slightly)
content = content.replace('text-[120px]', 'text-[80px]')

# 9. Verified badge positioning
content = content.replace('absolute -bottom-5', 'absolute -bottom-4')
content = content.replace('px-8 py-4 rounded-3xl', 'px-6 py-2.5 rounded-2xl')
content = content.replace('min-w-[260px]', 'min-w-[200px]')

with open("src/app/HomeClient.tsx", "w", encoding="utf-8") as f:
    f.write(content)
