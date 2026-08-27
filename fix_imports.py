with open("src/app/HomeClient.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Fix the react import
content = content.replace(
"""import {
  User,
  Landmark, useState, useEffect } from "react";""",
"import { useState, useEffect } from \"react\";"
)

content = content.replace(
"""import {
  User,
  Landmark,
  useState, useEffect } from "react";""",
"import { useState, useEffect } from \"react\";"
)

# Now make sure User and Landmark are imported from lucide-react
# We know Landmark is already there (from the error message). We need to make sure User is there.
lucide_import_pattern = "import {\n  ShieldCheck,"
if "User," not in content and " User " not in content:
    content = content.replace(lucide_import_pattern, "import {\n  User,\n  ShieldCheck,")

with open("src/app/HomeClient.tsx", "w", encoding="utf-8") as f:
    f.write(content)
