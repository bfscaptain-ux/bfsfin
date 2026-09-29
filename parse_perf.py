import json

def parse_perf():
    try:
        with open('lhreport-mobile.json', 'r', encoding='utf-8') as f:
            data = json.load(f)
            
        print("--- SCORES ---")
        for cat, cat_data in data.get('categories', {}).items():
            print(f"{cat}: {cat_data.get('score', 0) * 100}")
            
        print("\n--- PERFORMANCE METRICS ---")
        metrics = ['first-contentful-paint', 'largest-contentful-paint', 'total-blocking-time', 'cumulative-layout-shift', 'speed-index', 'interactive']
        for metric in metrics:
            audit = data['audits'].get(metric)
            if audit:
                print(f"{audit['title']}: {audit['displayValue']} (Score: {audit.get('score')})")
                
        print("\n--- DIAGNOSTICS ---")
        for audit_id in ['render-blocking-resources', 'unused-javascript', 'unused-css-rules', 'uses-optimized-images', 'server-response-time', 'mainthread-work-breakdown', 'bootup-time']:
            audit = data['audits'].get(audit_id)
            if audit and audit.get('score') != 1:
                print(f"- {audit['title']}: {audit.get('displayValue', '')}")
    except Exception as e:
        print("Error:", e)

parse_perf()
