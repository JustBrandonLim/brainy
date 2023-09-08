import type { MetadataRoute } from "next";

export default function Robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://brainy.justbrandonlim.com/sitemap.xml",
    host: "https://brainy.justbrandonlim.com",
  };
}
