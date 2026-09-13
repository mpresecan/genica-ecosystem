import type { MetadataRoute } from "next";
import { PROPERTIES } from "@genica/ui";

const BASE = PROPERTIES.aigenica.url;
const ROUTES = ['', 'pipeline', 'engagements', 'privacy', 'imprint'];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ROUTES.map((r) => ({
    url: r ? `${BASE}/${r}` : BASE,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: r === "" ? 1 : r === "privacy" || r === "imprint" ? 0.2 : 0.8,
  }));
}
