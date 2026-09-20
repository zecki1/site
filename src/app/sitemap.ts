import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://zecki1.com.br";
  const lastModified = new Date();
  return [
    { url: base, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/sobre`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/servicos`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/curriculo`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contato`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/codigo`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/desafio`, lastModified, changeFrequency: "monthly", priority: 0.5 },
  ];
}