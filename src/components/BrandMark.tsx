import { BrandIcon } from "@/lib/icons";
import type { brands } from "@/lib/data";

type Mark = (typeof brands)[number];

export default function BrandMark({ mark }: { mark: Mark }) {
  if (mark.type === "icon") {
    return (
      <span className="flex items-center gap-2 text-muted grayscale opacity-70 transition-opacity duration-300 hover:opacity-100 hover:text-ink">
        <BrandIcon id={mark.id} className="h-5 w-5" />
        <span className="text-[13px] font-medium">{mark.name}</span>
      </span>
    );
  }

  return (
    <span className="font-display text-[14px] font-semibold tracking-tight text-muted opacity-70 transition-opacity duration-300 hover:opacity-100 hover:text-ink">
      {mark.name}
    </span>
  );
}
