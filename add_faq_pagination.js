const fs = require('fs');

let content = fs.readFileSync('src/app/admin/faqs/page.tsx', 'utf8');

// Add states for pagination
content = content.replace(
  'const [loading, setLoading] = useState(true);',
  'const [loading, setLoading] = useState(true);\n  const [currentPage, setCurrentPage] = useState(1);\n  const [totalPages, setTotalPages] = useState(1);\n  const [totalFaqs, setTotalFaqs] = useState(0);'
);

// Update fetchFaqs
const oldFetch = `const fetchFaqs = () => {
    setLoading(true);
    fetch("/api/faqs?limit=2000&status=all")
      .then(res => res.json())
      .then(res => {
        setFaqs(res.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load FAQs", err);
        setLoading(false);
      });
  };`;

const newFetch = `const fetchFaqs = (page = 1) => {
    setLoading(true);
    fetch(\`/api/faqs?page=\${page}&limit=15&status=all\`)
      .then(res => res.json())
      .then(res => {
        setFaqs(res.data || []);
        setTotalPages(res.meta?.totalPages || 1);
        setTotalFaqs(res.meta?.total || 0);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load FAQs", err);
        setLoading(false);
      });
  };`;

content = content.replace(oldFetch, newFetch);

// Update useEffect to depend on currentPage
content = content.replace(
  `useEffect(() => {
    fetchFaqs();
  }, []);`,
  `useEffect(() => {
    fetchFaqs(currentPage);
  }, [currentPage]);`
);

// When creating or deleting, we should refetch the CURRENT page, or go to page 1.
// Let's replace fetchFaqs() with fetchFaqs(currentPage) in handleDelete and handleCreate
content = content.replace(/fetchFaqs\(\);/g, 'fetchFaqs(currentPage);');

// Update total count badge
content = content.replace(
  '{faqs.length} Total',
  '{totalFaqs} Total'
);

// Add Pagination Controls UI at the bottom of the table
const oldTableEnd = `</tbody>
            </table>
          </div>`;

const newTableEnd = `</tbody>
            </table>
            
            {/* Pagination Controls */}
            <div className="flex items-center justify-between border-t border-emerald-800 pt-4 mt-4 px-2">
              <div className="text-xs text-slate-400">
                Showing page <span className="text-white font-bold">{currentPage}</span> of <span className="text-white font-bold">{totalPages}</span>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg bg-emerald-950 border border-emerald-800 text-slate-300 disabled:opacity-50 hover:bg-emerald-900 transition-colors text-xs font-bold shadow-sm"
                >
                  Previous
                </button>
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg bg-emerald-950 border border-emerald-800 text-slate-300 disabled:opacity-50 hover:bg-emerald-900 transition-colors text-xs font-bold shadow-sm"
                >
                  Next
                </button>
              </div>
            </div>
            
          </div>`;

content = content.replace(oldTableEnd, newTableEnd);

fs.writeFileSync('src/app/admin/faqs/page.tsx', content);
console.log('Added pagination!');
