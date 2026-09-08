import { cn } from "@/lib/utils";

const PALETTE = [
  "bg-primary-soft text-primary-hover",
  "bg-success-soft text-success",
  "bg-warning-soft text-warning",
  "bg-info-soft text-info",
  "bg-danger-soft text-danger",
];

function toneFor(seed: string) {
  const code = seed.charCodeAt(0) || 0;
  return PALETTE[code % PALETTE.length];
}

export function Avatar({
  name,
  size = 36,
  className,
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full font-semibold",
        toneFor(name),
        className,
      )}
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {initials}
    </span>
  );
}
