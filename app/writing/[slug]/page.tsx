import { notFound } from "next/navigation";

// Posts are read from /content/writing in pass 5. Until then,
// every slug 404s.
export default async function Post({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await params;
  notFound();
}
