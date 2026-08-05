import { useState, useEffect, useCallback, useRef } from "react";
import { Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Logo } from "../atoms/Logo";
import { FacebookIcon, InstagramIcon } from "../atoms/BrandIcons";
import { useSiteSettings } from "@/site/content/SiteSettingsProvider";

export function Header() {
  const s = useSiteSettings();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const navScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollMore, setCanScrollMore] = useState(false);

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

  // Scroll-Hinweis: zeigt an, ob im Menue noch nach unten gescrollt werden kann.
  useEffect(() => {
    if (!menuOpen) return;
    const el = navScrollRef.current;
    if (!el) return;

    const update = () => {
      const remaining = el.scrollHeight - el.scrollTop - el.clientHeight;
      setCanScrollMore(remaining > 8);
    };

    // Nach dem Oeffnen-Transition messen
    const raf = requestAnimationFrame(update);
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [menuOpen]);

  const toggleMenu = useCallback(() => setMenuOpen((prev) => !prev), []);

  // Pfad ohne abschliessenden Slash vergleichen (trailingSlash: true liefert
  // z. B. "/leistungen/"). Die Startseite bleibt "/".
  const currentPath =
    location.pathname.length > 1
      ? location.pathname.replace(/\/$/, "")
      : location.pathname;

  const lightPages = ["/impressum", "/datenschutz", "/haftungsausschluss"];
  // Seiten mit hellem Hero brauchen den dunklen Header (weisser Hintergrund,
  // dunkle Schrift) bereits ganz oben – sonst waere die weisse Schrift auf
  // hellem Grund unlesbar.
  const isLightPage = lightPages.includes(currentPath);
  const darkHeader = (scrolled || isLightPage) && !menuOpen;
  // Genaues Gegenteil von `darkHeader`: Header liegt transparent ueber dem Hero
  // (oder das Overlay ist offen) – Logo, Schrift und Burger muessen weiss sein.
  const lightText = !darkHeader;

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
            <Link
              to="/"
              className="relative z-[60] min-w-0"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <div className="flex flex-col items-start gap-1 min-w-0">
                <motion.div
                  initial={false}
                  animate={{
                    filter: lightText
                      ? "brightness(0) invert(1)"
                      : "brightness(0)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Logo />
                </motion.div>
                {/* Dauerhaft im Layout, nur ein- und ausgeblendet. Wurde der
                    Firmenname erst bei `darkHeader` gerendert, wuchs der linke
                    Block beim Scrollen um 16,5 px Hoehe und 20 px Breite – das
                    Logo sprang dadurch 8,2 px nach oben und der Meisterbetrieb-
                    Claim 10,1 px nach rechts (`justify-between` verteilt die
                    zusaetzliche Breite auf beide Luecken). */}
                <motion.span
                  initial={false}
                  animate={{ opacity: darkHeader ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="whitespace-nowrap text-[8px] tracking-[0.08em] sm:text-[10px] sm:tracking-[0.15em] uppercase text-accent font-bold leading-tight"
                >
                  {s.legalName}
                </motion.span>
              </div>
            </Link>

            {/* Center — Claim aus den Settings (Storyblok, sonst lokaler
                Default). Voller Kontrast statt Grau und fett gesetzt, damit er
                neben Logo und Burger nicht untergeht. Farbwechsel laeuft ueber
                `transition-colors`, damit die Farben aus den Tokens kommen und
                nicht als Hex dupliziert werden. */}
            <div className="hidden shrink-0 items-center md:flex">
              <span
                className={`whitespace-nowrap text-xs font-bold uppercase leading-none tracking-[0.15em] transition-colors duration-300 lg:text-base lg:tracking-[0.2em] ${
                  lightText
                    ? // Der Hero zeigt an dieser Stelle hellen Marmor – ohne
                      // Schatten verschwindet die weisse Schrift darin.
                      "text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.55)]"
                    : "text-foreground"
                }`}
              >
                {s.tagline}
              </span>
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
                animate={{ color: lightText ? "#ffffff" : "#0a0a0a" }}
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
                    backgroundColor: lightText ? "#ffffff" : "#0a0a0a",
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
                    backgroundColor: lightText ? "#ffffff" : "#0a0a0a",
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
            exit={{
              clipPath: "inset(0 0 100% 0)",
              transition: { duration: 0.42, ease: [0.76, 0, 0.24, 1] },
            }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
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
              <div
                ref={navScrollRef}
                className="relative flex-1 flex lg:items-center items-start overflow-y-auto py-6 lg:py-0"
              >
                <div className="container mx-auto px-4 md:px-8 w-full my-auto">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0">
                    {/* Main Nav Links */}
                    <nav className="lg:col-span-8 xl:col-span-7">
                      {s.mainNav.map((item, index) => (
                        <motion.div
                          key={item.path}
                          initial={{ opacity: 0, x: -40 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{
                            delay: 0.12 + index * 0.03,
                            duration: 0.4,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="border-b border-white/[0.07] first:border-t"
                        >
                          <Link
                            to={item.path}
                            onClick={(e) => {
                              // Auf der aktuellen Seite navigiert der Link nicht –
                              // ein erneuter Klick schliesst stattdessen das Flyout.
                              if (currentPath === item.path) {
                                e.preventDefault();
                                setMenuOpen(false);
                              }
                            }}
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
                        transition={{ delay: 0.4, duration: 0.4 }}
                        className="space-y-8"
                      >
                        <div>
                          <p className="text-[10px] tracking-[0.3em] text-accent uppercase mb-3">
                            Kontakt
                          </p>
                          <a
                            href={`tel:${s.phoneHref}`}
                            className="text-white/60 text-sm hover:text-white transition-colors block mb-1"
                          >
                            {s.phone}
                          </a>
                          <a
                            href={`mailto:${s.email}`}
                            className="text-white/60 text-sm hover:text-white transition-colors block"
                          >
                            {s.email}
                          </a>
                        </div>

                        <div>
                          <p className="text-[10px] tracking-[0.3em] text-accent uppercase mb-3">
                            Adresse
                          </p>
                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                              `${s.street}, ${s.zip} ${s.city}`,
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/60 text-sm hover:text-white transition-colors"
                          >
                            {s.street}
                            <br />
                            {s.zip} {s.city}
                          </a>
                        </div>

                        <div>
                          <p className="text-[10px] tracking-[0.3em] text-accent uppercase mb-3">
                            Social
                          </p>
                          <div className="flex gap-4">
                            {s.social.facebook && (
                              <a
                                href={s.social.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                                className="text-white/40 hover:text-accent transition-colors"
                              >
                                <FacebookIcon size={20} />
                              </a>
                            )}
                            {s.social.instagram && (
                              <a
                                href={s.social.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className="text-white/40 hover:text-accent transition-colors"
                              >
                                <InstagramIcon size={20} />
                              </a>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scroll-Hinweis */}
              <AnimatePresence>
                {canScrollMore && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="pointer-events-none absolute inset-x-0 bottom-16 z-20 flex justify-center"
                    aria-hidden="true"
                  >
                    <motion.span
                      animate={{ y: [0, 6, 0] }}
                      transition={{
                        duration: 1.6,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="flex items-center gap-2 text-[9px] tracking-[0.3em] uppercase text-white/30"
                    >
                      Scrollen
                      <svg
                        className="w-3 h-3"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </motion.span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bottom Bar */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="shrink-0 border-t border-white/[0.07] py-4"
              >
                <div className="container mx-auto px-4 md:px-8 flex flex-col sm:flex-row justify-between items-center gap-2">
                  <span className="text-white/20 text-[10px] tracking-[0.2em] uppercase">
                    {new Date().getFullYear()} {s.companyName}
                  </span>
                  <div className="flex gap-6">
                    {s.legalNav.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        className="text-white/30 text-[10px] tracking-[0.2em] uppercase hover:text-accent transition-colors"
                      >
                        {link.name}
                      </Link>
                    ))}
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
