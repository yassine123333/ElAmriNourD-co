"use client";

import Link from "next/link";
import { useState } from "react";
import { NavLink } from "@/components/nav-link";

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--line)] bg-[var(--paper)]/90 backdrop-blur">
      <div className="mx-auto w-full max-w-6xl px-4 py-3 md:px-8">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" onClick={closeMenu} className="min-w-0 flex flex-col leading-tight">
          <span className="font-display text-xl text-[var(--ink-900)]">
            Nour Amri Deco
          </span>
          <span className="hidden text-xs uppercase tracking-[0.2em] text-[var(--ink-500)] sm:block">
            Atelier de platre en Tunisie
          </span>
          </Link>

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-[var(--line)] bg-white text-[var(--ink-800)] md:hidden"
            aria-expanded={isMenuOpen}
            aria-controls="main-navigation"
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            <span className="text-xl leading-none" aria-hidden="true">{isMenuOpen ? "×" : "☰"}</span>
          </button>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Navigation principale">
            <NavLink href="/" label="Accueil" />
            <NavLink href="/galerie" label="Galerie" />
            <NavLink href="/a-propos" label="A propos" />
            <NavLink href="/contact" label="Contact" />
            <NavLink href="/admin" label="Admin" />
          </nav>
        </div>

        <nav
          id="main-navigation"
          className={`${isMenuOpen ? "mt-3 grid" : "hidden"} gap-1 border-t border-[var(--line)] pt-3 md:hidden`}
          aria-label="Navigation mobile"
        >
          <NavLink href="/" label="Accueil" onClick={closeMenu} />
          <NavLink href="/galerie" label="Galerie" onClick={closeMenu} />
          <NavLink href="/a-propos" label="A propos" onClick={closeMenu} />
          <NavLink href="/contact" label="Contact" onClick={closeMenu} />
          <NavLink href="/admin" label="Admin" onClick={closeMenu} />
        </nav>
      </div>
    </header>
  );
}
