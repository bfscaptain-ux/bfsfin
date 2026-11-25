import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client Testimonials & Verified Reviews | Bhardwaj Financial Services",
  description: "Read real, verified customer reviews and success stories from borrowers across Agra and India who secured home loans, business financing, and cashless insurance through BFS.",
  alternates: {
    canonical: "https://bfsfin.com/testimonials",
  }
};

export default function TestimonialsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
