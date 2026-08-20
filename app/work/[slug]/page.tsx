import { notFound } from "next/navigation";

// Case studies are read from /content/work in pass 4. Until then,
// every slug 404s rather than rendering an empty shell.
export default async function CaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await params;
  notFound();
}
