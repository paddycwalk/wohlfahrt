"use client";

import * as React from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

/**
 * Kompatibilitaetsschicht: bildet die in diesem Projekt genutzten
 * react-router-APIs auf die Next.js-Navigation ab. Dadurch muss der
 * aus Figma Make generierte Seiten-/Komponenten-Code nicht angefasst werden.
 *
 * Absichtlich minimal: nur `Link` und `useLocation` werden tatsaechlich
 * importiert (siehe `react-router`-Alias in tsconfig.json + next.config.mjs).
 * Wer hier etwas ergaenzt, sollte langfristig lieber direkt auf `next/link`
 * bzw. `usePathname` umstellen und den Shim ganz entfernen.
 */

type LinkProps = Omit<React.ComponentProps<typeof NextLink>, "href"> & {
  to: string;
};

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  function Link({ to, ...rest }, ref) {
    return <NextLink ref={ref} href={to} {...rest} />;
  },
);

export function useLocation() {
  const pathname = usePathname();
  return { pathname, search: "", hash: "", state: null, key: "default" };
}
