"use client";

import { useState, useEffect, useRef } from "react";
import { Upload, Trash2, Plus, Users } from "lucide-react";
import Image from "next/image";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  initials: string;
  color: string;
  desc: string;
  imageUrl?: string;
}

export default function AdminTeam() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [initials, setInitials] = useState("");
  const [color, setColor] = useState("emerald");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      const res = await fetch("/api/team");
      const data = await res.json();
      setTeam(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      setFile(f);
      setPreview(URL.createObjectURL(f));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !role || !initials || !desc) {
      alert("Please fill all text fields");
      return;
    }
    setUploading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("role", role);
    formData.append("initials", initials);
    formData.append("color", color);
    formData.append("desc", desc);
    if (file) {
      formData.append("image", file);
    }

    try {
      const res = await fetch("/api/team", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setTeam([...team, data.member]);
        setName("");
        setRole("");
        setInitials("");
        setColor("emerald");
        setDesc("");
        setFile(null);
        setPreview(null);
        if (fileRef.current) fileRef.current.value = "";
      } else {
        alert("Upload failed: " + data.error);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this team member?")) return;
    setDeleting(id);
    try {
      const res = await fetch("/api/team?id=" + id, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setTeam(team.filter((m) => m.id !== id));
      } else {
        alert("Failed to delete");
      }
    } catch (error) {
      console.error(error);
      alert("Error deleting");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Users className="w-8 h-8 text-emerald-500" />
        <div>
          <h1 className="text-2xl font-black text-white">Team CMS</h1>
          <p className="text-slate-400 text-sm">Upload team members here. They will appear in the leadership section on the about page.</p>
        </div>
      </div>

      <div className="bg-emerald-900/40 border border-emerald-500/20 rounded-2xl p-6">
        <h2 className="text-lg font-bold text-emerald-400 flex items-center gap-2 mb-4">
          <Plus className="w-5 h-5" /> Add New Team Member
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name (e.g. Rahul Singh)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-emerald-950 border border-emerald-800 rounded-xl px-4 py-2 text-white w-full"
              required
            />
            <input
              type="text"
              placeholder="Role (e.g. OPERATIONS HEAD)"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="bg-emerald-950 border border-emerald-800 rounded-xl px-4 py-2 text-white w-full"
              required
            />
            <input
              type="text"
              placeholder="Initials (e.g. RS)"
              value={initials}
              onChange={(e) => setInitials(e.target.value)}
              className="bg-emerald-950 border border-emerald-800 rounded-xl px-4 py-2 text-white w-full"
              required
            />
            <select
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="bg-emerald-950 border border-emerald-800 rounded-xl px-4 py-2 text-white w-full"
            >
              <option value="emerald">Emerald</option>
              <option value="orange">Orange</option>
              <option value="purple">Purple</option>
              <option value="blue">Blue</option>
            </select>
          </div>
          
          <textarea
            placeholder="Description (e.g. Coordinating with bank partners...)"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="bg-emerald-950 border border-emerald-800 rounded-xl px-4 py-2 text-white w-full h-24"
            required
          />

          <div className="flex items-center gap-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileRef}
              className="bg-emerald-950 border border-emerald-800 rounded-xl px-4 py-2 text-white w-full md:w-auto"
            />
            {preview && <Image src={preview} alt="preview" width={40} height={40} className="rounded-full object-cover" />}
            <button
              type="submit"
              disabled={uploading}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-6 rounded-xl flex items-center gap-2"
            >
              {uploading ? "Uploading..." : <><Upload className="w-4 h-4" /> Add Member</>}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-emerald-900/40 border border-emerald-500/20 rounded-2xl p-6">
        <h2 className="text-lg font-bold text-emerald-400 mb-4 flex items-center gap-2">
           Uploaded Members ({team.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {team.map((m) => (
            <div key={m.id} className="bg-white rounded-2xl p-6 border border-slate-200 flex flex-col items-center text-center relative group">
              <button
                onClick={() => handleDelete(m.id)}
                disabled={deleting === m.id}
                className="absolute top-2 right-2 p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              
              <div className={"w-20 h-20 rounded-full border-4 flex items-center justify-center mb-4 border-" + m.color + "-500 overflow-hidden relative bg-white"}>
                 {m.imageUrl ? (
                   <Image src={m.imageUrl} alt={m.name} fill className="object-cover" />
                 ) : (
                   <span className={"text-2xl font-black text-" + m.color + "-600"}>{m.initials}</span>
                 )}
              </div>
              <h4 className="font-bold text-lg text-slate-900">{m.name}</h4>
              <p className={"text-xs font-bold uppercase tracking-wider mb-3 text-" + m.color + "-500"}>{m.role}</p>
              <p className="text-sm text-slate-500">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

