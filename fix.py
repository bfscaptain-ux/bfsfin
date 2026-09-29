import re

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Fix inputs
    def input_repl(match):
        tag = match.group(0)
        if 'aria-label' not in tag and 'id=' not in tag:
            return tag.replace('<input', '<input aria-label="Input Field"')
        return tag
    content = re.sub(r'<input[^>]*>', input_repl, content)

    # Fix buttons without text
    def button_repl(match):
        tag = match.group(0)
        inner = match.group(1)
        if 'aria-label' not in tag and not re.search(r'[a-zA-Z]', inner):
            return tag.replace('<button', '<button aria-label="Action button"') + inner + '</button>'
        return tag + inner + '</button>'
    content = re.sub(r'(<button[^>]*>)(.*?)</button>', button_repl, content, flags=re.DOTALL)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

fix_file('src/app/HomeClient.tsx')
fix_file('src/components/Header.tsx')
fix_file('src/components/Footer.tsx')
fix_file('src/components/EMICalculator.tsx')
fix_file('src/components/QuickEligibility.tsx')
