import type { MetadataRoute } from "next";

export default function Sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://brainy.justbrandonlim.com",
      lastModified: new Date("2023-09-06").toISOString().split("T")[0],
    },
  ];
}
