import re

with open("src/app/contact/locations/LocationsClient.tsx", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace(
    'Sanjay Place Commercial Hub,<br />\n                        Agra, Uttar Pradesh - 282002<br />',
    'Block-C11, Shop No.-5, First Floor, near MK Tailor,<br />\n                        Sanjay Palace, Sanjay Place,<br />\n                        Agra, Uttar Pradesh - 282002<br />'
)

with open("src/app/contact/locations/LocationsClient.tsx", "w", encoding="utf-8") as f:
    f.write(content)
