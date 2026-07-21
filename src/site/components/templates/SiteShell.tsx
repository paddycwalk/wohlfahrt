"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { MotionConfig } from "motion/react";
import { Toaster } from "sonner";
import { Header } from "@/site/components/organisms/Header";
import { Footer } from "@/site/components/organisms/Footer";
import { ScrollToTop } from "@/site/components/molecules/ScrollToTop";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ScrollToTop />
        <Toaster position="top-right" />
      </div>
    </MotionConfig>
  );
}
