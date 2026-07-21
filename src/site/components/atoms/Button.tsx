import { motion } from "motion/react";
import { Slot } from "@radix-ui/react-slot";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  children: ReactNode;
  /**
   * Rendert die Styles auf das Kind-Element (z. B. einen Link) statt ein
   * eigenes <button> zu erzeugen. So entsteht bei Link-Buttons nur EIN
   * fokussierbares Element (ein <a>) statt verschachteltem <a><button>,
   * was den doppelten Tab-Stopp und ungueltiges HTML vermeidet.
   */
  asChild?: boolean;
}

const MotionSlot = motion.create(Slot);

export function Button({
  variant = "primary",
  children,
  className = "",
  asChild = false,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex w-fit items-center justify-center px-8 py-4 transition-all duration-300 cursor-pointer disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2";

  const variants = {
    primary: "bg-accent text-accent-foreground hover:bg-accent/90",
    secondary: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline:
      "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground",
    ghost: "text-primary hover:bg-secondary",
  };

  const Comp = asChild ? MotionSlot : motion.button;

  return (
    <Comp
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Comp>
  );
}
