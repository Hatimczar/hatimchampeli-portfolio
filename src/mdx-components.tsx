import type { MDXComponents } from "mdx/types";
import Link from "next/link";

const components: MDXComponents = {
  a: ({ href = "", children, ...props }) => (
    <Link href={href} className="text-accent underline underline-offset-2 hover:text-ink" {...props}>
      {children}
    </Link>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
