const fs = require('fs');
let content = fs.readFileSync('src/components/ReviewsSection.tsx', 'utf8');

// Add import
if (!content.includes('import Link from "next/link";')) {
  content = content.replace('import { Star, MapPin, X, PlusCircle } from "lucide-react";', 'import { Star, MapPin, X, PlusCircle } from "lucide-react";\nimport Link from "next/link";');
}

// Replace div with Link for the review card
content = content.replace(
  /<div key=\{review\.id \+ index\} className="w-\[85vw\]/g,
  '<Link href={`/reviews/${review.id}`} key={review.id + index} className="block cursor-pointer w-[85vw]'
);

// We need to also close it with </Link> instead of </div>
// The easiest way is to find the end of the card structure
const oldEnding = `                      <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 truncate">
                        <MapPin className="w-3 h-3 shrink-0" />
                        {review.location || "India"}
                      </p>
                    </div>
                  </div>
                </div>`;
const newEnding = `                      <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 truncate">
                        <MapPin className="w-3 h-3 shrink-0" />
                        {review.location || "India"}
                      </p>
                    </div>
                  </div>
                </Link>`;

content = content.replace(oldEnding, newEnding);

fs.writeFileSync('src/components/ReviewsSection.tsx', content);
console.log('Link added!');
