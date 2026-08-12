import { PrismaClient } from "@prisma/client";
import { Mail, MapPin, Phone, Calendar, IndianRupee, CheckCircle2 } from "lucide-react";
import { markAsResolved } from "./actions";

const prisma = new PrismaClient();

export default async function ContactRequestsPage() {
  const requests = await prisma.contactRequest.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
          <div>
            <h1 className="text-2xl lg:text-3xl font-black text-white flex items-center gap-3">
              <Mail className="w-8 h-8 text-blue-400" />
              Contact Requests CMS
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Manage queries and callback requests from the main website.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950/50 border-b border-slate-800 text-slate-400 text-xs uppercase font-bold">
              <tr>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Client Info</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Loan Details</th>
                <th className="px-6 py-4">Message</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {requests.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    No contact requests found.
                  </td>
                </tr>
              ) : (
                requests.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        req.status === "NEW" 
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                          : "bg-slate-800 text-slate-400 border border-slate-700"
                      }`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-white mb-1">{req.name}</div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                        <Phone className="w-3 h-3" /> {req.phone}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <Mail className="w-3 h-3" /> {req.email}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-1.5 text-slate-300">
                        <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                        <span>
                          <span className="font-medium">{req.city}</span>
                          <br />
                          <span className="text-xs text-slate-500">{req.state}</span>
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-200">{req.loanType}</div>
                      {req.loanAmount && (
                        <div className="flex items-center gap-1 text-xs text-amber-400 mt-1 font-medium">
                          <IndianRupee className="w-3 h-3" /> {req.loanAmount}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 max-w-xs">
                      {req.message ? (
                        <p className="text-xs text-slate-400 truncate" title={req.message}>
                          {req.message}
                        </p>
                      ) : (
                        <span className="text-xs text-slate-600 italic">No message</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(req.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric"
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {req.status !== "RESOLVED" && (
                        <form action={markAsResolved.bind(null, req.id)}>
                          <button 
                            type="submit"
                            className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ml-auto"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" /> Resolve
                          </button>
                        </form>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
