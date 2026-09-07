import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ApplyClient from "./ApplyClient";

export async function generateMetadata({ params }: { params: { jobId: string } }) {
  const job = await prisma.jobPost.findUnique({ where: { id: params.jobId } });
  if (!job) return { title: "Job Not Found" };
  return { title: `Apply for ${job.title} | BFS Careers` };
}

export default async function ApplyPage({ params }: { params: { jobId: string } }) {
  const job = await prisma.jobPost.findUnique({ where: { id: params.jobId } });

  if (!job || !job.isActive || (job.expiresAt && new Date(job.expiresAt) < new Date())) {
    notFound();
  }

  return <ApplyClient job={job} />;
}
