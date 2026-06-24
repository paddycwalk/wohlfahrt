import { Outlet, useLocation } from "react-router";
import { useEffect } from "react";
import { Toaster } from "sonner";
import { Header } from "../organisms/Header";
import { Footer } from "../organisms/Footer";
import { ScrollToTop } from "../molecules/ScrollToTop";

export function Layout() {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
      <Toaster position="top-right" />
    </div>
  );
}