import Image from "next/image";
import { Realisation } from "@/lib/types";

type RealisationsGridProps = {
  items: Realisation[];
};

export function RealisationsGrid({ items }: RealisationsGridProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-[var(--line)] bg-white/70 p-8 text-center text-[var(--ink-600)]">
        Aucune realisation pour cette categorie pour le moment.
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <article
          key={item.id}
          className="group overflow-hidden rounded-2xl border border-[var(--line)] bg-white shadow-sm"
          style={{ animationDelay: `${index * 90}ms` }}
        >
          <div className="aspect-[4/3] overflow-hidden">
            <Image
              src={item.image_url}
              alt={item.titre}
              width={1200}
              height={900}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          </div>
          <div className="space-y-2 p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-[var(--ink-500)]">
              {item.categorie}
            </p>
            <h3 className="font-display text-xl text-[var(--ink-900)]">{item.titre}</h3>
            <p className="text-sm leading-relaxed text-[var(--ink-600)]">
              {item.description}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
