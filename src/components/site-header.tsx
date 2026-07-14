import Link from "next/link";
import { NavLink } from "@/components/nav-link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--line)] bg-[var(--paper)]/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 md:px-8">
        <Link href="/" className="flex flex-col leading-tight">
          <span className="font-display text-xl text-[var(--ink-900)]">
            Nour Amri Deco
          </span>
          <span className="text-xs uppercase tracking-[0.2em] text-[var(--ink-500)]">
            Atelier de platre en Tunisie
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          <NavLink href="/" label="Accueil" />
          <NavLink href="/galerie" label="Galerie" />
          <NavLink href="/a-propos" label="A propos" />
          <NavLink href="/contact" label="Contact" />
        </nav>
      </div>
    </header>
  );
}
