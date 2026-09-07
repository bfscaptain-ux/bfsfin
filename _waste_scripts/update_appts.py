import re

with open("src/app/admin/appointments/page.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Change Icon and text
content = content.replace('Urgent Callback Requests', 'Consultation Appointments')
content = content.replace('Clients waiting for an immediate phone call.', 'Scheduled face-to-face or virtual consultations.')
content = content.replace('AdminCallbacks', 'AdminAppointments')

# Change filter
content = content.replace('l.loanType === "Callback Request"', 'l.source.startsWith("APPOINTMENT:")')

# Change search text
content = content.replace('Callbacks Pending', 'Appointments Scheduled')

# Add "Scheduled For" slot decoding. The source field looks like `APPOINTMENT: 2026-08-30 | 10:30 AM`
# I will change the "Source" column to "Subject / Topic" and "Requested Date & Time" to "Scheduled Slot".

content = content.replace('<th className="p-4">Source</th>', '<th className="p-4">Subject / Topic</th>')
content = content.replace('<th className="p-4">Requested Date & Time</th>', '<th className="p-4">Scheduled Slot</th>')

# The column data mapping needs to be updated.
# Instead of dt.date and dt.time, we can just split `item.source`.
# Wait, I'll just rewrite the table mapping in python.
row_jsx = """
                  const isAppt = item.source.startsWith("APPOINTMENT:");
                  const slotParts = isAppt ? item.source.replace("APPOINTMENT:", "").trim().split("|") : [];
                  const slotDate = slotParts[0] ? new Date(slotParts[0].trim()).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : "N/A";
                  const slotTime = slotParts[1] ? slotParts[1].trim() : "N/A";

                  return (
                    <tr key={item.id} className="hover:bg-emerald-800/30 transition group">
                      <td className="p-4">
                        <div className="font-bold text-white text-[15px]">{item.name}</div>
                        <div className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                          <Phone className="w-3 h-3 text-emerald-500" /> {item.phone}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1.5 font-bold text-emerald-300">
                          <CalendarDays className="w-4 h-4 text-emerald-400" /> {slotDate}
                        </div>
                        <div className="text-xs text-emerald-100 font-bold mt-1 flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-amber-400" /> {slotTime}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-xs font-bold text-white bg-slate-800 inline-block px-3 py-1 rounded border border-slate-700">{item.loanType}</div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <button className="bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-black px-3 py-1.5 rounded uppercase tracking-wider transition">
                            Mark Attended
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
"""

content = re.sub(
    r'const dt = formatDateTime\(item\.createdAt\);\s*return \(\s*<tr key=\{item\.id\}(.*?)</button>\s*</div>\s*</td>\s*</tr>\s*\);\s*\}\)',
    row_jsx + '})',
    content,
    flags=re.DOTALL
)

with open("src/app/admin/appointments/page.tsx", "w", encoding="utf-8") as f:
    f.write(content)
