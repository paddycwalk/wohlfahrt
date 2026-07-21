import { useState, useEffect, useCallback, useRef } from "react";
import { Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Logo } from "../atoms/Logo";

const navigation = [
  {
    name: "Startseite",
    path: "/",
    image:
      "https://images.unsplash.com/photo-1572742482459-e04d6cfdd6f3?crop=entropy&cs=tinysrgb&fit=max&fm=webp&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiYXRocm9vbSUyMG1hcmJsZSUyMHRpbGVzfGVufDF8fHx8MTc3NTgyNzIyMnww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    name: "Über uns",
    path: "/ueber-uns",
    image:
      "https://images.unsplash.com/photo-1751037773857-9bdd4d55a54a?crop=entropy&cs=tinysrgb&fit=max&fm=webp&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBraXRjaGVuJTIwaGVycmluZ2JvbmUlMjB0aWxlc3xlbnwxfHx8fDE3NzU4MjcyMjR8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    name: "Leistungen",
    path: "/leistungen",
    image:
      "https://images.unsplash.com/photo-1770993189354-66f68ca11ef6?crop=entropy&cs=tinysrgb&fit=max&fm=webp&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwaW50ZXJpb3IlMjBmbG9vciUyMGRlc2lnbnxlbnwxfHx8fDE3NzU4MjcyMjR8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    name: "Ausstellung",
    path: "/ausstellung",
    image:
      "https://images.unsplash.com/photo-1656147173067-2022b4ab3cc6?crop=entropy&cs=tinysrgb&fit=max&fm=webp&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwc2hvd3Jvb20lMjBpbnRlcmlvciUyMHRpbGVzfGVufDF8fHx8MTc3NTgyNzIyNHww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    name: "Referenzen",
    path: "/referenzen",
    image:
      "https://images.unsplash.com/photo-1572742482459-e04d6cfdd6f3?crop=entropy&cs=tinysrgb&fit=max&fm=webp&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiYXRocm9vbSUyMG1hcmJsZSUyMHRpbGVzfGVufDF8fHx8MTc3NTgyNzIyMnww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    name: "Produkte",
    path: "/produkte",
    image:
      "https://images.unsplash.com/photo-1762380371803-113992341bec?crop=entropy&cs=tinysrgb&fit=max&fm=webp&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc2FuJTIwbW9zYWljJTIwdGlsZSUyMHBhdHRlcm58ZW58MXx8fHwxNzc1ODI3MjI0fDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    name: "Aktuelles",
    path: "/aktuelles",
    image:
      "https://images.unsplash.com/photo-1751037773857-9bdd4d55a54a?crop=entropy&cs=tinysrgb&fit=max&fm=webp&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBraXRjaGVuJTIwaGVycmluZ2JvbmUlMjB0aWxlc3xlbnwxfHx8fDE3NzU4MjcyMjR8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    name: "Karriere",
    path: "/karriere",
    image:
      "https://images.unsplash.com/photo-1770993189354-66f68ca11ef6?crop=entropy&cs=tinysrgb&fit=max&fm=webp&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwaW50ZXJpb3IlMjBmbG9vciUyMGRlc2lnbnxlbnwxfHx8fDE3NzU4MjcyMjR8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    name: "Kontakt",
    path: "/kontakt",
    image:
      "https://images.unsplash.com/photo-1656147173067-2022b4ab3cc6?crop=entropy&cs=tinysrgb&fit=max&fm=webp&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwc2hvd3Jvb20lMjBpbnRlcmlvciUyMHRpbGVzfGVufDF8fHx8MTc3NTgyNzIyNHww&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const location = useLocation();
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Accessibility: Escape schliesst das Menue, Focus-Trap haelt den Fokus im Overlay
  useEffect(() => {
    if (!menuOpen) return;

    const overlay = overlayRef.current;
    const getFocusable = () => {
      const overlayItems = overlay
        ? Array.from(
            overlay.querySelectorAll<HTMLElement>(
              'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
            ),
          ).filter((el) => el.offsetParent !== null)
        : [];
      // Der Schliessen-/Menue-Button liegt im <header> (ausserhalb des Overlays),
      // muss aber im Tab-Zyklus erreichbar sein.
      const menuButton = menuButtonRef.current;
      return menuButton ? [menuButton, ...overlayItems] : overlayItems;
    };

    // Fokus initial in das Overlay setzen
    const focusables = getFocusable();
    focusables[0]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (e.key === "Tab") {
        const items = getFocusable();
        if (items.length === 0) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const toggleMenu = useCallback(() => setMenuOpen((prev) => !prev), []);

  // Pfad ohne abschliessenden Slash vergleichen (trailingSlash: true liefert
  // z. B. "/leistungen/"). Die Startseite bleibt "/".
  const currentPath =
    location.pathname.length > 1
      ? location.pathname.replace(/\/$/, "")
      : location.pathname;

  const lightPages = ["/impressum", "/datenschutz", "/haftungsausschluss"];
  const isLightPage = lightPages.includes(currentPath);
  const darkHeader = (scrolled || isLightPage) && !menuOpen;

  return (
    <>
      {/* Top Bar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          darkHeader
            ? "bg-white/95 backdrop-blur-md border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Logo */}
            <Link to="/" className="relative z-[60]">
              <div className="flex flex-col items-start gap-1">
                <motion.div
                  initial={false}
                  animate={{
                    filter:
                      menuOpen || (!scrolled && !isLightPage)
                        ? "brightness(0) invert(1)"
                        : darkHeader
                          ? "brightness(0)"
                          : "none",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Logo />
                </motion.div>
                {darkHeader && (
                  <motion.span
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.3 }}
                    className="text-[10px] tracking-[0.15em] uppercase text-accent font-bold"
                  >
                    Wohlfahrt & Wohlfahrt Fliesen GmbH
                  </motion.span>
                )}
              </div>
            </Link>

            {/* Center — Hidden tagline on desktop */}
            <div className="hidden lg:flex items-center gap-3">
              <motion.span
                initial={false}
                animate={{
                  color:
                    menuOpen || (!scrolled && !isLightPage)
                      ? "#ffffff"
                      : "#737373",
                  opacity: darkHeader ? 1 : 0.7,
                }}
                transition={{ duration: 0.3 }}
                className="text-xs tracking-[0.3em] uppercase"
              >
                Meisterbetrieb seit 1954
              </motion.span>
            </div>

            {/* Menu Toggle — Custom animated hamburger */}
            <button
              ref={menuButtonRef}
              onClick={toggleMenu}
              className="relative z-[60] ml-4 flex shrink-0 items-center gap-4 group cursor-pointer sm:ml-0"
              aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
              aria-expanded={menuOpen}
              aria-haspopup="dialog"
              aria-controls="main-menu-overlay"
            >
              <motion.span
                initial={false}
                animate={{
                  color:
                    menuOpen || (!scrolled && !isLightPage)
                      ? "#ffffff"
                      : "#0a0a0a",
                }}
                transition={{ duration: 0.3 }}
                className="text-xs tracking-[0.25em] uppercase hidden sm:block"
              >
                {menuOpen ? "Schließen" : "Menü"}
              </motion.span>

              <div className="relative w-8 h-8 flex items-center justify-center">
                {/* Top line */}
                <motion.span
                  initial={false}
                  animate={{
                    rotate: menuOpen ? 45 : 0,
                    y: menuOpen ? 0 : -4,
                    backgroundColor:
                      menuOpen || (!scrolled && !isLightPage)
                        ? "#ffffff"
                        : "#0a0a0a",
                  }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute w-7 h-[1.5px] origin-center"
                />
                {/* Bottom line */}
                <motion.span
                  initial={false}
                  animate={{
                    rotate: menuOpen ? -45 : 0,
                    y: menuOpen ? 0 : 4,
                    x: menuOpen ? 0 : 5,
                    width: menuOpen ? 28 : 18,
                    backgroundColor:
                      menuOpen || (!scrolled && !isLightPage)
                        ? "#ffffff"
                        : "#0a0a0a",
                  }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute h-[1.5px] origin-center"
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={overlayRef}
            id="main-menu-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Hauptmenü"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-[#0a0a0a]"
          >
            {/* Grain overlay */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%20256%20256%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22noise%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%224%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23noise)%22%2F%3E%3C%2Fsvg%3E')]" />
            </div>

            {/* Menu Content */}
            <div className="relative z-10 h-full flex flex-col">
              {/* Spacer for header */}
              <div className="h-20 md:h-24 shrink-0" />

              {/* Navigation */}
              <div className="flex-1 flex lg:items-center items-start overflow-y-auto py-6 lg:py-0">
                <div className="container mx-auto px-4 md:px-8 w-full my-auto">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0">
                    {/* Main Nav Links */}
                    <nav className="lg:col-span-8 xl:col-span-7">
                      {navigation.map((item, index) => (
                        <motion.div
                          key={item.path}
                          initial={{ opacity: 0, x: -40 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{
                            delay: 0.2 + index * 0.05,
                            duration: 0.6,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="border-b border-white/[0.07] first:border-t"
                          onMouseEnter={() => setHoveredIndex(index)}
                          onMouseLeave={() => setHoveredIndex(null)}
                        >
                          <Link
                            to={item.path}
                            className="group flex items-center gap-4 md:gap-8 py-3 md:py-4 transition-all duration-300 hover:pl-4"
                          >
                            {/* Index number */}
                            <span className="text-[10px] tracking-[0.2em] text-white/20 group-hover:text-accent transition-colors duration-300 w-6 shrink-0 font-[Montserrat]">
                              {String(index + 1).padStart(2, "0")}
                            </span>

                            {/* Nav text */}
                            <span
                              className={`text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-[Bebas_Neue] uppercase tracking-[0.04em] transition-all duration-300 leading-[1.1] ${
                                currentPath === item.path
                                  ? "text-accent"
                                  : "text-white/80 group-hover:text-white"
                              }`}
                            >
                              {item.name}
                            </span>

                            {/* Hover arrow */}
                            <svg
                              className="w-5 h-5 text-white/0 group-hover:text-accent transition-all duration-300 group-hover:translate-x-1 ml-auto md:ml-0 shrink-0"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                            >
                              <path d="M7 17L17 7M17 7H7M17 7V17" />
                            </svg>
                          </Link>
                        </motion.div>
                      ))}
                    </nav>

                    {/* Right Side Info */}
                    <div className="lg:col-span-3 lg:col-start-10 xl:col-start-10 flex flex-col justify-end pb-4">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.6 }}
                        className="space-y-8"
                      >
                        <div>
                          <p className="text-[10px] tracking-[0.3em] text-accent uppercase mb-3">
                            Kontakt
                          </p>
                          <a
                            href="tel:+49712171082"
                            className="text-white/60 text-sm hover:text-white transition-colors block mb-1"
                          >
                            07121 / 71082
                          </a>
                          <a
                            href="mailto:info@fliesen-wohlfahrt.de"
                            className="text-white/60 text-sm hover:text-white transition-colors block"
                          >
                            info@fliesen-wohlfahrt.de
                          </a>
                        </div>

                        <div>
                          <p className="text-[10px] tracking-[0.3em] text-accent uppercase mb-3">
                            Adresse
                          </p>
                          <p className="text-white/60 text-sm">
                            Hinterer Spielbach 4
                            <br />
                            72793 Pfullingen
                          </p>
                        </div>

                        <div>
                          <p className="text-[10px] tracking-[0.3em] text-accent uppercase mb-3">
                            Social
                          </p>
                          <div className="flex gap-6">
                            <a
                              href="https://www.facebook.com/FliesenWohlfahrt/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-white/40 text-xs tracking-[0.2em] uppercase hover:text-accent transition-colors"
                            >
                              Facebook
                            </a>
                            <a
                              href="https://www.instagram.com/fliesen_wohlfahrt/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-white/40 text-xs tracking-[0.2em] uppercase hover:text-accent transition-colors"
                            >
                              Instagram
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Bar */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="shrink-0 border-t border-white/[0.07] py-4"
              >
                <div className="container mx-auto px-4 md:px-8 flex flex-col sm:flex-row justify-between items-center gap-2">
                  <span className="text-white/20 text-[10px] tracking-[0.2em] uppercase">
                    &copy; 2026 Wohlfahrt & Wohlfahrt
                  </span>
                  <div className="flex gap-6">
                    <Link
                      to="/impressum"
                      className="text-white/30 text-[10px] tracking-[0.2em] uppercase hover:text-accent transition-colors"
                    >
                      Impressum
                    </Link>
                    <Link
                      to="/datenschutz"
                      className="text-white/30 text-[10px] tracking-[0.2em] uppercase hover:text-accent transition-colors"
                    >
                      Datenschutz
                    </Link>
                    <Link
                      to="/haftungsausschluss"
                      className="text-white/30 text-[10px] tracking-[0.2em] uppercase hover:text-accent transition-colors"
                    >
                      Haftungsausschluss
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
