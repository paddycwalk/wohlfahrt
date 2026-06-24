import { ImageWithFallback } from "../figma/ImageWithFallback";

interface LogoProps {
  className?: string;
}

export function Logo({ className = "" }: LogoProps) {
  return (
    <ImageWithFallback
      src="/logo.webp"
      alt="Wohlfahrt & Wohlfahrt Logo"
      className={`h-12 w-auto ${className}`}
      width={270}
      height={49}
    />
  );
}
