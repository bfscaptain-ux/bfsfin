import os
import re

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replacements
    new_content = content.replace('bg-[#0b132b]', 'bg-emerald-950')
    new_content = new_content.replace('to-[#0b132b]', 'to-emerald-950')
    new_content = new_content.replace('from-[#0b132b]', 'from-emerald-950')
    
    # Optional: replace slate-900 with emerald-900 to give a green tint instead of dark gray
    # (But admin panel might look very green. Let's do it anyway to satisfy "sare har ek page ko green theam")
    new_content = new_content.replace('bg-slate-900', 'bg-emerald-900')
    new_content = new_content.replace('bg-slate-950', 'bg-emerald-950')
    new_content = new_content.replace('border-slate-800', 'border-emerald-800')

    # Replace blue colors with emerald
    new_content = re.sub(r'\btext-blue-(\d+)', r'text-emerald-\1', new_content)
    new_content = re.sub(r'\bbg-blue-(\d+)', r'bg-emerald-\1', new_content)
    new_content = re.sub(r'\bborder-blue-(\d+)', r'border-emerald-\1', new_content)
    new_content = re.sub(r'\bring-blue-(\d+)', r'ring-emerald-\1', new_content)
    new_content = re.sub(r'\bfrom-blue-(\d+)', r'from-emerald-\1', new_content)
    new_content = re.sub(r'\bto-blue-(\d+)', r'to-emerald-\1', new_content)
    new_content = re.sub(r'\bvia-blue-(\d+)', r'via-emerald-\1', new_content)

    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated: {filepath}")

def main():
    src_dir = os.path.join(os.getcwd(), 'src')
    for root, dirs, files in os.walk(src_dir):
        for file in files:
            if file.endswith(('.tsx', '.ts', '.css')):
                process_file(os.path.join(root, file))

if __name__ == "__main__":
    main()
