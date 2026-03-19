import type { MetadataRoute } from "next";
import { tools } from "@/lib/tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://freeonlinetools-my.netlify.app";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...tools.map((tool) => ({
      url: `${baseUrl}/${tool.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
