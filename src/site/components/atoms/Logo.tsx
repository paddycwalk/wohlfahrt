import { ImageWithFallback } from "../figma/ImageWithFallback";
import { asset } from "../../lib/asset";

interface LogoProps {
  className?: string;
}

export function Logo({ className = "" }: LogoProps) {
  return (
    <ImageWithFallback
      src={asset("/logo.webp")}
      alt="Wohlfahrt & Wohlfahrt Logo"
      className={`h-9 w-auto max-w-full object-contain sm:h-10 md:h-12 ${className}`}
      width={270}
      height={49}
    />
  );
}
