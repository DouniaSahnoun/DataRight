import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * Logo de marque : le visuel `public/logo.jpg` affiché en entier, réduit pour
 * tenir dans le carré. L'image source est carrée (1055 × 1048), elle occupe donc
 * tout le cadre sans être rognée ; le fond sombre comble l'écart d'un pixel.
 */
export function BrandMark({
  size = 36,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "relative block shrink-0 overflow-hidden rounded-lg bg-[#0f0e0d]",
        className,
      )}
      style={{ width: size, height: size }}
    >
      <Image
        src="/logo.jpg"
        alt=""
        fill
        sizes={`${size * 2}px`}
        priority
        aria-hidden
        className="object-contain"
      />
    </span>
  );
}
