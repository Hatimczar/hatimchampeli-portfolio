import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export function generateStaticParams() {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => ({ slug: f.replace(/\.mdx$/, "") }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const mod = await import(`@/content/blog/${slug}.mdx`);
  return { title: mod.metadata.title, description: mod.metadata.description };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { default: Post, metadata } = await import(`@/content/blog/${slug}.mdx`);

  return (
    <>
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
