import type { ReactNode } from "react";
import clsx from "clsx";

export default function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={clsx("container-px mx-auto w-full max-w-[1200px]", className)}>{children}</div>;
}
