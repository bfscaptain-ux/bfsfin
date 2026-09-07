import os

schema_code = """
model Review {
  id        String   @id @default(uuid())
  name      String
  location  String?  @default("India")
  rating    Int      @default(5)
  text      String
  status    String   @default("APPROVED") // PENDING, APPROVED
  createdAt DateTime @default(now())
}
"""

with open('prisma/schema.prisma', 'a') as f:
    f.write(schema_code)
