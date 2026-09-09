import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import { profile } from "@/lib/data";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");
const SITE_URL = "https://hatimchampeli-portfolio.pages.dev";

export function generateStaticParams() {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => ({ slug: f.replace(/\.mdx$/, "") }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { metadata } = await import(`@/content/blog/${slug}.mdx`);
  const url = `${SITE_URL}/blog/${slug}`;

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.tags,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: metadata.title,
      description: metadata.description,
      publishedTime: metadata.date,
      authors: [profile.name],
      tags: metadata.tags,
      images: metadata.coverImage ? [{ url: `${SITE_URL}${metadata.coverImage}` }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.description,
      images: metadata.coverImage ? [`${SITE_URL}${metadata.coverImage}`] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { default: Post, metadata } = await import(`@/content/blog/${slug}.mdx`);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: metadata.title,
    description: metadata.description,
    datePublished: metadata.date,
    dateModified: metadata.date,
    author: { "@type": "Person", name: profile.name, url: SITE_URL },
    publisher: { "@type": "Person", name: profile.name },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${slug}` },
    keywords: metadata.tags.join(", "),
  };

  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />
      <main className="flex-1">
        <article className="circuit-bg section-pad pt-36">
          <Container className="max-w-[760px]">
            <Reveal>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-muted transition-colors hover:text-ink"
              >
                <ArrowLeft size={15} /> All posts
              </Link>
            </Reveal>

            <Reveal delay={0.06}>
              <div className="mt-6 flex flex-wrap items-center gap-3 text-[12.5px] text-muted">
                <time dateTime={metadata.date}>
                  {new Date(metadata.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
                <span className="h-1 w-1 rounded-full bg-line" />
                <span>{metadata.tags.join(" · ")}</span>
              </div>
              <h1 className="font-display mt-3 text-[clamp(28px,4.4vw,42px)] font-semibold leading-[1.1] text-ink text-balance">
                {metadata.title}
              </h1>
            </Reveal>

            {metadata.coverImage && (
              <Reveal delay={0.09}>
                <div className="relative mt-8 aspect-[16/9.5] w-full overflow-hidden rounded-lg border border-line">
                  <Image src={metadata.coverImage} alt={metadata.title} fill priority className="object-cover" sizes="760px" />
                </div>
              </Reveal>
            )}

            <Reveal delay={0.12}>
              <div className="prose prose-neutral mt-10 max-w-none prose-headings:font-display prose-headings:font-semibold prose-headings:text-ink prose-p:text-body prose-p:leading-relaxed prose-strong:text-ink-soft prose-li:text-body dark:prose-invert">
                <Post />
              </div>
            </Reveal>
          </Container>
        </article>
      </main>
      <Footer />
    </>
  );
}
