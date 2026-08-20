export const site = {
  name: "Azamat Erkinov",
  url: "https://azamat.app",
  tagline:
    "I build AI systems for data that can't move, and I think most companies are renting infrastructure they should own.",
  description:
    "Forward deployed engineer putting open-weight models on enterprise hardware. AI systems for data that can't move.",
  intro: [
    "I study data science and economics at Minerva University, and I build AI systems for data that can't move — either because it's private, or because it's public and nobody's made it usable.",
    "Right now I'm a forward deployed engineer at Tensor AI, putting quantized open-weight models on enterprise hardware so companies stop sending their documents to someone else's API. Before that I automated FCC compliance testing at UL Solutions. Since early 2025 I've been building an assistant for Safecast — it lets anyone ask questions in plain language across 200 million radiation measurements collected by volunteers since Fukushima.",
    "I won “Most Impressive Engineering Lift” at a YC-RFS hackathon in Tokyo for a multi-agent research platform, and I ran an essay contest on AI safety that reached 900 people across 40 countries.",
    "I'm Uzbek, I work in three languages, and Minerva has me living in a different city every semester. Currently in San Francisco.",
  ],
  email: "azamat.erkinov@tensorai.io",
  links: {
    github: "https://github.com/Azamatprea",
    linkedin: "https://www.linkedin.com/in/azamaterkinov",
    resume: "/Azamat_Erkinov.pdf",
    safecastMap: "https://map.safecast.org",
  },
  nowLine:
    "Currently in San Francisco, reading about what happened to on-prem search.",
} as const;

export type Site = typeof site;
