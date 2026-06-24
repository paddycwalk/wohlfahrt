"use client";

import * as React from "react";
import NextLink from "next/link";
import { usePathname, useRouter } from "next/navigation";

/**
 * Kompatibilitaetsschicht: bildet die in diesem Projekt genutzten
 * react-router-APIs auf die Next.js-Navigation ab. Dadurch muss der
 * aus Figma Make generierte Seiten-/Komponenten-Code nicht angefasst werden.
 */

type LinkProps = Omit<React.ComponentProps<typeof NextLink>, "href"> & {
  to: string;
};

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  function Link({ to, ...rest }, ref) {
    return <NextLink ref={ref} href={to} {...rest} />;
  },
);

type NavLinkProps = Omit<
  React.ComponentProps<typeof NextLink>,
  "href" | "className" | "children"
> & {
  to: string;
  className?: string | ((state: { isActive: boolean }) => string);
  children?:
    | React.ReactNode
    | ((state: { isActive: boolean }) => React.ReactNode);
};

export const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  function NavLink({ to, className, children, ...rest }, ref) {
    const pathname = usePathname();
    const isActive = pathname === to;
    const resolvedClassName =
      typeof className === "function" ? className({ isActive }) : className;
    const resolvedChildren =
      typeof children === "function" ? children({ isActive }) : children;
    return (
      <NextLink ref={ref} href={to} className={resolvedClassName} {...rest}>
        {resolvedChildren}
      </NextLink>
    );
  },
);

export function useLocation() {
  const pathname = usePathname();
  return { pathname, search: "", hash: "", state: null, key: "default" };
}

export function useNavigate() {
  const router = useRouter();
  return (to: string | number) => {
    if (typeof to === "number") {
      if (to < 0) router.back();
      else router.forward();
      return;
    }
    router.push(to);
  };
}

export function useParams<T extends Record<string, string>>() {
  return {} as T;
}

export function Outlet() {
  return null;
}
