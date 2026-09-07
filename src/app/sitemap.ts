import fs from "node:fs";
import path from "node:path";
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const SITE_URL = "https://hatimchampeli-portfolio.pages.dev";
const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));

  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/blog`, changeFrequency: "weekly", priority: 0.8 },
    ...posts.map((slug) => ({
      url: `${SITE_URL}/blog/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
