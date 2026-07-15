import Link from "next/link";
import { CATEGORIES } from "@/lib/types";

type GalleryFiltersProps = {
  activeCategory?: string;
};

export function GalleryFilters({ activeCategory }: GalleryFiltersProps) {
  return (
    <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:overflow-visible md:px-0">
      <Link
        href="/galerie"
        className={`shrink-0 rounded-full px-4 py-2 text-sm transition ${
          !activeCategory
            ? "bg-[var(--ink-900)] text-white"
            : "border border-[var(--line)] bg-white hover:border-[var(--ink-600)]"
        }`}
      >
        Tout voir
      </Link>
      {CATEGORIES.map((category) => (
        <Link
          key={category}
          href={`/galerie?categorie=${encodeURIComponent(category)}`}
          className={`shrink-0 rounded-full px-4 py-2 text-sm transition ${
            activeCategory === category
              ? "bg-[var(--brand-gold)] text-[var(--ink-900)]"
              : "border border-[var(--line)] bg-white hover:border-[var(--ink-600)]"
          }`}
        >
          {category}
        </Link>
      ))}
    </div>
  );
}
