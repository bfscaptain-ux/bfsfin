with open("src/app/about/founder/FounderClient.tsx", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace(
    '<p className="text-xl text-slate-500 dark:text-slate-400 mt-2 font-medium">Founder & Managing Director, BFS</p>',
    '<p className="text-xl text-slate-500 dark:text-slate-400 mt-2 font-medium">{owner.role}</p>'
)

with open("src/app/about/founder/FounderClient.tsx", "w", encoding="utf-8") as f:
    f.write(content)
