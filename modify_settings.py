import re

with open("src/app/admin/settings/page.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Add to fetch
fetch_add = """            ownerName: data.settings.ownerName || "Vineeta Sharma",
            ownerRole: data.settings.ownerRole || "Founder & Managing Director, BFS",
            ownerQuote: data.settings.ownerQuote || "We don't just secure loans; we legally vet your lifetime investment. Total transparency, zero hidden brokerage.",
            ownerImage: data.settings.ownerImage || "/owner.png","""
content = content.replace("personalLoanRate: data.settings.personalLoanRate || \"10.50\"", 
                          "personalLoanRate: data.settings.personalLoanRate || \"10.50\",\n" + fetch_add)

# Add to useState
state_add = """    ownerName: "Vineeta Sharma",
    ownerRole: "Founder & Managing Director, BFS",
    ownerQuote: "We don't just secure loans; we legally vet your lifetime investment. Total transparency, zero hidden brokerage.",
    ownerImage: "/owner.png","""
content = content.replace("personalLoanRate: \"10.50\"", 
                          "personalLoanRate: \"10.50\",\n" + state_add)

# Add to handleSave
save_add = """    const ownerFields = ["ownerName", "ownerRole", "ownerQuote", "ownerImage"] as const;
    for (const key of ownerFields) {
      await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, value: settings[key] })
      });
    }"""
content = content.replace("// Save SMTP Email", save_add + "\n\n    // Save SMTP Email")

# Add upload handler
upload_fn = """
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const formData = new FormData();
    formData.append("file", file);
    
    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.success) {
        setSettings({ ...settings, ownerImage: data.url });
      } else {
        alert("Upload failed");
      }
    } catch (err) {
      alert("Upload error");
    }
  };
"""
content = content.replace("const handleSave = async", upload_fn + "\n  const handleSave = async")

# Add JSX
jsx_add = """
        <div className="space-y-4 pt-4 border-t border-emerald-800">
          <h3 className="text-base font-bold text-white border-b border-emerald-800 pb-2">Owner Profile Settings</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Owner Name *</label>
              <input
                type="text"
                required
                value={settings.ownerName}
                onChange={(e) => setSettings({ ...settings, ownerName: e.target.value })}
                className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Owner Role *</label>
              <input
                type="text"
                required
                value={settings.ownerRole}
                onChange={(e) => setSettings({ ...settings, ownerRole: e.target.value })}
                className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-slate-300 font-semibold mb-1">Owner Quote *</label>
              <textarea
                required
                value={settings.ownerQuote}
                onChange={(e) => setSettings({ ...settings, ownerQuote: e.target.value })}
                className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-emerald-500"
                rows={2}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-slate-300 font-semibold mb-1">Owner Photo</label>
              <div className="flex items-center gap-4">
                {settings.ownerImage && (
                  <img src={settings.ownerImage} alt="Owner" className="w-16 h-16 rounded-full object-cover border border-emerald-700" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-emerald-800 file:text-emerald-100 hover:file:bg-emerald-700 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
"""
content = content.replace('<div className="pt-4 flex justify-end">', jsx_add + '\n        <div className="pt-4 flex justify-end">')

with open("src/app/admin/settings/page.tsx", "w", encoding="utf-8") as f:
    f.write(content)
