import { Link } from "react-router";
import { MapPin, Phone, Mail } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "../atoms/BrandIcons";
import { Logo } from "../atoms/Logo";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <Logo className="brightness-0 invert mb-4" />
            <p className="text-sm text-primary-foreground/80 mb-4">
              Ihr Experte für hochwertige Fliesen und professionelle Verlegung
              seit über 67 Jahren.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/FliesenWohlfahrt/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Wohlfahrt & Wohlfahrt auf Facebook"
                className="hover:text-accent transition-colors"
              >
                <FacebookIcon size={24} />
              </a>
              <a
                href="https://www.instagram.com/fliesen_wohlfahrt/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Wohlfahrt & Wohlfahrt auf Instagram"
                className="hover:text-accent transition-colors"
              >
                <InstagramIcon size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg mb-4">Schnelllinks</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/ueber-uns"
                  className="hover:text-accent transition-colors"
                >
                  Über uns
                </Link>
              </li>
              <li>
                <Link
                  to="/leistungen"
                  className="hover:text-accent transition-colors"
                >
                  Leistungen
                </Link>
              </li>
              <li>
                <Link
                  to="/produkte"
                  className="hover:text-accent transition-colors"
                >
                  Produkte
                </Link>
              </li>
              <li>
                <Link
                  to="/karriere"
                  className="hover:text-accent transition-colors"
                >
                  Karriere
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg mb-4">Kontakt</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span>
                  Hinterer Spielbach 4<br />
                  72793 Pfullingen
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} className="flex-shrink-0" />
                <a
                  href="tel:+49712171082"
                  className="hover:text-accent transition-colors"
                >
                  07121 / 71082
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} className="flex-shrink-0" />
                <a
                  href="mailto:info@fliesen-wohlfahrt.de"
                  className="hover:text-accent transition-colors"
                >
                  info@fliesen-wohlfahrt.de
                </a>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-lg mb-4">Öffnungszeiten</h3>
            <ul className="space-y-2 text-sm">
              <li>Mo. – Fr.: 08:00 – 12:30 Uhr</li>
              <li>Mo. – Fr.: 14:00 – 17:00 Uhr</li>
              <li>Sa.: Nach Vereinbarung</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60">
          <p>&copy; 2026 Wohlfahrt & Wohlfahrt. Alle Rechte vorbehalten.</p>
          <div className="flex gap-6">
            <Link
              to="/impressum"
              className="hover:text-accent transition-colors"
            >
              Impressum
            </Link>
            <Link
              to="/datenschutz"
              className="hover:text-accent transition-colors"
            >
              Datenschutz
            </Link>
            <Link
              to="/haftungsausschluss"
              className="hover:text-accent transition-colors"
            >
              Haftungsausschluss
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
