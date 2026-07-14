import Link from "next/link";
import { CATEGORIES } from "@/lib/types";

type GalleryFiltersProps = {
  activeCategory?: string;
};

export function GalleryFilters({ activeCategory }: GalleryFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href="/galerie"
        className={`rounded-full px-4 py-2 text-sm transition ${
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
          className={`rounded-full px-4 py-2 text-sm transition ${
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
