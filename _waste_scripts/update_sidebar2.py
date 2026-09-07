import re

with open("src/components/admin/AdminSidebar.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Add Calendar icon import
content = content.replace('PhoneCall,', 'PhoneCall,\n  CalendarDays,')

# Add nav item
nav_item = '    { label: "Website Leads", href: "/admin/leads", icon: Users, badge: "NEW" },\n    { label: "Consultations", href: "/admin/appointments", icon: CalendarDays },\n    { label: "Callback Requests", href: "/admin/callbacks", icon: PhoneCall, badge: "URGENT" },'
content = content.replace('    { label: "Website Leads", href: "/admin/leads", icon: Users, badge: "NEW" },\n    { label: "Callback Requests", href: "/admin/callbacks", icon: PhoneCall, badge: "URGENT" },', nav_item)

with open("src/components/admin/AdminSidebar.tsx", "w", encoding="utf-8") as f:
    f.write(content)
