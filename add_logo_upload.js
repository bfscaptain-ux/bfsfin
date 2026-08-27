const fs = require('fs');

let content = fs.readFileSync('src/app/admin/bank-logos/page.tsx', 'utf8');

const uploadLogic = `
  const handleLogoUpload = async (key: string, file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    
    try {
      const res = await fetch("/api/admin/upload-logo", {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      if (data.url) {
        updateBank(key, 'logo', data.url);
      }
    } catch (e) {
      alert("Upload failed");
    }
  };
`;

content = content.replace(
  'const updateBank = (key: string, field: string, value: string) => {',
  uploadLogic + '\n  const updateBank = (key: string, field: string, value: string) => {'
);

const oldLogoUI = `<div>
                  <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Logo URL (Optional)</label>
                  <input 
                    type="text" 
                    value={bank.logo || ""} 
                    onChange={(e) => updateBank(key, 'logo', e.target.value)}
                    placeholder="https://..."
                    className="w-full bg-emerald-900/50 border border-emerald-800 rounded-lg px-3 py-2 text-emerald-300 text-xs mt-1 focus:outline-none focus:border-emerald-500" 
                  />
                </div>`;

const newLogoUI = `<div>
                  <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Bank Logo</label>
                  <div className="flex gap-2 mt-1">
                    <input 
                      type="text" 
                      value={bank.logo || ""} 
                      onChange={(e) => updateBank(key, 'logo', e.target.value)}
                      placeholder="Icon name or URL"
                      className="flex-1 bg-emerald-900/50 border border-emerald-800 rounded-lg px-3 py-2 text-emerald-300 text-xs focus:outline-none focus:border-emerald-500" 
                    />
                    <label className="bg-emerald-800 hover:bg-emerald-700 cursor-pointer px-3 py-2 rounded-lg flex items-center justify-center transition-colors">
                      <span className="text-[10px] font-bold text-emerald-100 uppercase tracking-wider">Upload</span>
                      <input 
                        type="file" 
                        accept="image/*"
                        className="hidden" 
                        onChange={(e) => {
                          if (e.target.files?.[0]) handleLogoUpload(key, e.target.files[0]);
                        }} 
                      />
                    </label>
                  </div>
                </div>`;

content = content.replace(oldLogoUI, newLogoUI);

fs.writeFileSync('src/app/admin/bank-logos/page.tsx', content);
console.log('Added file upload UI!');
