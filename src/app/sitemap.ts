import type { MetadataRoute } from "next";
import { activeOrigin } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: activeOrigin, changeFrequency: "monthly", priority: 1 },
    { url: `${activeOrigin}/privacy`, changeFrequency: "yearly", priority: 0.4 },
  ];
}
