const fs = require("fs"); let code = fs.readFileSync("src/components/Header.tsx", "utf8"); 
code = code.replace(`import ThemeToggle from "@/components/ThemeToggle";`, `import ThemeToggle from "@/components/ThemeToggle";\nimport LanguageSwitcher from "@/components/LanguageSwitcher";`);
code = code.replace(`<ThemeToggle />\n              </div>\n            </div>\n          </div>\n        </div>`, `<LanguageSwitcher />\n                <ThemeToggle />\n              </div>\n            </div>\n          </div>\n        </div>`);
code = code.replace(`<ThemeToggle />\n            </div>\n          </div>`, `<LanguageSwitcher />\n              <ThemeToggle />\n            </div>\n          </div>`);
fs.writeFileSync("src/components/Header.tsx", code);
