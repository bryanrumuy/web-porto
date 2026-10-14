import type { MetadataRoute } from "next";

const SITE_URL = "https://bryanrumuy-porto.vercel.app";
const PAGES = ["", "/about", "/skills", "/projects", "/contact"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));
}
