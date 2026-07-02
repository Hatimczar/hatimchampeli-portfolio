import clsx from "clsx";
import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  dark = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
}) {
  return (
    <div className={align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-2xl"}>
      <Reveal>
        <span
          className={clsx(
            "inline-flex items-center gap-2 font-mono text-[13px] uppercase tracking-[0.14em]",
            dark ? "text-accent-soft" : "text-accent"
          )}
        >
          <span className={clsx("h-1.5 w-1.5 rounded-full", dark ? "bg-accent-soft" : "bg-accent")} />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2
          className={clsx(
            "font-display mt-4 text-[clamp(28px,4vw,44px)] font-semibold leading-[1.1]",
            dark ? "text-white" : "text-ink"
          )}
        >
          {title}
        </h2>
      </Reveal>
      {description ? (
        <Reveal delay={0.14}>
          <p className={clsx("mt-4 text-[17px] leading-relaxed", dark ? "text-white/70" : "text-body")}>
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
