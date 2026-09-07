import { prisma } from "@/lib/prisma";
import ComplaintClient from "./ComplaintClient";

export const dynamic = "force-dynamic";

export default async function ComplaintPage() {
  const heroImageRecord = await prisma.heroImage.findUnique({
    where: { pageId: "complaint" }
  });

  const heroImage = heroImageRecord?.imageUrl || "/pattern.svg";

  return <ComplaintClient heroImage={heroImage} />;
}
