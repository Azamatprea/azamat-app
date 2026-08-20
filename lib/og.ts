export function ogImage(title: string, eyebrow?: string) {
  const q = new URLSearchParams({ title });
  if (eyebrow) q.set("eyebrow", eyebrow);
  return {
    images: [
      {
        url: `/og?${q.toString()}`,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  };
}
