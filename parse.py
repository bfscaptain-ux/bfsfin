import json

def parse_report():
    with open('lhreport-new.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    categories = data.get('categories', {})
    print("--- SCORES ---")
    for cat, cat_data in categories.items():
        print(f"{cat}: {cat_data.get('score', 0) * 100}")
        
    print("\n--- FAILING BEST PRACTICES ---")
    bp_refs = categories.get('best-practices', {}).get('auditRefs', [])
    for ref in bp_refs:
        audit = data['audits'].get(ref['id'])
        if audit and audit.get('score') != 1 and audit.get('score') is not None:
            print(f"- {audit['id']}: {audit['title']}")
            if 'details' in audit and 'items' in audit['details']:
                for item in audit['details']['items']:
                    print(f"  {str(item)[:100]}") # Truncate to avoid unicode errors

parse_report()
