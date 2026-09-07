import os

files_to_fix = [
    "src/app/layout.tsx",
    "src/components/FloatingSupport.tsx"
]

for filepath in files_to_fix:
    if os.path.exists(filepath):
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
        content = content.replace("Adv. Praveen Bhardwaj", "Vineeta Sharma")
        content = content.replace("Adv Praveen Bhardwaj", "Vineeta Sharma")
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
