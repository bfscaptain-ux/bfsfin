import re

with open("src/components/admin/AdminSidebar.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Fix the broken array
broken_array = """    { label: "Dashboard Overview", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Website Leads", href: "/admin/leads", icon: Users, badge: "NEW" },
    { label: "Callback Requests", href: "/admin/callbacks", icon: PhoneCall,
  CalendarDays, badge: "URGENT" },
    { label: "Bank Rates CMS", href: "/admin/rates", icon: TrendingDown },"""

fixed_array = """    { label: "Dashboard Overview", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Website Leads", href: "/admin/leads", icon: Users, badge: "NEW" },
    { label: "Consultations", href: "/admin/appointments", icon: CalendarDays },
    { label: "Callback Requests", href: "/admin/callbacks", icon: PhoneCall, badge: "URGENT" },
    { label: "Bank Rates CMS", href: "/admin/rates", icon: TrendingDown },"""

content = content.replace(broken_array, fixed_array)

with open("src/components/admin/AdminSidebar.tsx", "w", encoding="utf-8") as f:
    f.write(content)
