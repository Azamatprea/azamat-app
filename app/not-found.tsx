import Link from "next/link";
import { Section } from "@/components/section";

export default function NotFound() {
  return (
    <Section label="404">
      <h1 className="text-2xl font-bold mb-4">Nothing at this address</h1>
      <p className="text-slate mb-6">
        The page you're after doesn't exist, or isn't published.
      </p>
      <Link href="/" className="underline underline-offset-4 hover:text-slate">
        Back to the front page
      </Link>
    </Section>
  );
}
