"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  href: string;
  label: string;
  onClick?: () => void;
};

export function NavLink({ href, label, onClick }: NavLinkProps) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`min-h-11 rounded-full px-4 py-2 text-sm transition ${
        active
          ? "bg-[var(--brand-gold)] text-[var(--ink-900)]"
          : "text-[var(--ink-700)] hover:bg-white/70"
      }`}
    >
      {label}
    </Link>
  );
}
