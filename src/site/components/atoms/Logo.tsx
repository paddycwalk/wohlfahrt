import { ImageWithFallback } from "../figma/ImageWithFallback";

interface LogoProps {
  className?: string;
}

export function Logo({ className = "" }: LogoProps) {
  return (
    <ImageWithFallback
      src="https://a.storyblok.com/f/293408914760698/6c7c1cd90b/logo.webp"
      alt="Wohlfahrt & Wohlfahrt Logo"
      className={`h-9 w-auto max-w-full object-contain sm:h-10 md:h-12 ${className}`}
      width={270}
      height={49}
      // Das Original ist mit 2.120 B bereits kleiner als jede Variante, die der
      // Storyblok Image Service daraus macht (320w: 4.278 B). Also unangetastet.
      unoptimized
    />
  );
}
