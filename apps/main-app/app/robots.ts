import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/auth/login", "/auth/signup", "/home"],
      //   disallow: [""],
    },
    sitemap: "https://centralresume.me/sitemap.xml",
  };
}
