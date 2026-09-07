const fs = require("fs"); let code = fs.readFileSync("src/app/layout.tsx", "utf8"); 
const patchScript = `<Script
          id="google-translate-hydration-patch"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: \`
              if (typeof Node === "function" && Node.prototype) {
                const originalRemoveChild = Node.prototype.removeChild;
                Node.prototype.removeChild = function(child) {
                  if (child.parentNode !== this) return child;
                  return originalRemoveChild.apply(this, arguments);
                };
                const originalInsertBefore = Node.prototype.insertBefore;
                Node.prototype.insertBefore = function(newNode, referenceNode) {
                  if (referenceNode && referenceNode.parentNode !== this) return newNode;
                  return originalInsertBefore.apply(this, arguments);
                };
              }
            \`
          }}
        />\n        <div id="google_translate_element"></div>`;
code = code.replace(`<div id="google_translate_element"></div>`, patchScript);
fs.writeFileSync("src/app/layout.tsx", code);
