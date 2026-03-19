import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://freeonlinetools-my.netlify.app/sitemap.xml",
    host: "https://freeonlinetools-my.netlify.app",
  };
}
