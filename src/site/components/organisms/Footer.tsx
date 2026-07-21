"use client";

import { Link } from "react-router";
import { MapPin, Phone, Mail } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "../atoms/BrandIcons";
import { Logo } from "../atoms/Logo";
import { useSiteSettings } from "@/site/content/SiteSettingsProvider";
import { formatOpeningHours } from "@/site/content/site";

export function Footer() {
  const s = useSiteSettings();
  const openingHours = formatOpeningHours(s);
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <Logo className="brightness-0 invert mb-4" />
            <p className="text-sm text-primary-foreground/80 mb-4">
              {s.footerIntro}
            </p>
            <div className="flex gap-4">
              {s.social.facebook && (
                <a
                  href={s.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.companyName} auf Facebook`}
                  className="hover:text-accent transition-colors"
                >
                  <FacebookIcon size={24} />
                </a>
              )}
              {s.social.instagram && (
                <a
                  href={s.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.companyName} auf Instagram`}
                  className="hover:text-accent transition-colors"
                >
                  <InstagramIcon size={24} />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg mb-4">Schnelllinks</h3>
            <ul className="space-y-2 text-sm">
              {s.footerQuickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg mb-4">Kontakt</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `${s.street}, ${s.zip} ${s.city}`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  {s.street}
                  <br />
                  {s.zip} {s.city}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} className="flex-shrink-0" />
                <a
                  href={`tel:${s.phoneHref}`}
                  className="hover:text-accent transition-colors"
                >
                  {s.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} className="flex-shrink-0" />
                <a
                  href={`mailto:${s.email}`}
                  className="hover:text-accent transition-colors"
                >
                  {s.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-lg mb-4">Öffnungszeiten</h3>
            <ul className="space-y-2 text-sm">
              {openingHours.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60">
          <p>
            &copy; {year} {s.companyName}. Alle Rechte vorbehalten.
          </p>
          <div className="flex flex-col items-center gap-2 md:flex-row md:gap-6">
            {s.legalNav.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="hover:text-accent transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
