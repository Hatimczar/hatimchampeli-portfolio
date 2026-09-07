import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export const metadata = {
  title: "Blog",
  description: "Notes on Apple ecosystem deployments, e-commerce operations, and AI-driven marketing.",
};

type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
};

async function getPosts(): Promise<PostMeta[]> {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.mdx$/, "");
      const mod = await import(`@/content/blog/${slug}.mdx`);
      return { slug, ...mod.metadata } as PostMeta;
    })
  );

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export default async function BlogIndexPage() {
  const posts = await getPosts();

  return (
    <>
      <Nav />
      <main className="flex-1">
        <section className="circuit-bg section-pad pt-36">
          <Container>
            <SectionHeading
              eyebrow="Blog"
              title="Notes from the field"
              description="Apple ecosystem deployments, e-commerce operations, and AI-driven marketing — written from what actually happened, not the theory."
            />

            <div className="mt-14 flex flex-col gap-5">
              {posts.map((post, i) => (
                <Reveal key={post.slug} delay={i * 0.05}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col gap-3 rounded-lg border border-line bg-surface p-7 shadow-tight transition-shadow duration-300 hover:shadow-soft md:flex-row md:items-center md:justify-between md:p-8"
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-3 text-[12.5px] text-muted">
                        <time dateTime={post.date}>
                          {new Date(post.date).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </time>
                        <span className="h-1 w-1 rounded-full bg-line" />
                        <span>{post.tags.join(" · ")}</span>
                      </div>
                      <h3 className="font-display mt-2 text-[19px] font-semibold text-ink md:text-[21px]">
                        {post.title}
                      </h3>
                      <p className="mt-2 max-w-2xl text-[14.5px] leading-relaxed text-body">{post.description}</p>
                    </div>
                    <ArrowUpRight
                      size={20}
                      className="mt-4 shrink-0 text-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent md:mt-0"
                    />
                  </Link>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
