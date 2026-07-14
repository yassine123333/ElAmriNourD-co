"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Realisation } from "@/lib/types";

type RealisationsGridProps = {
  items: Realisation[];
};

export function RealisationsGrid({ items }: RealisationsGridProps) {
  const [selectedItem, setSelectedItem] = useState<Realisation | null>(null);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSelectedItem(null);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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
            {item.image_url ? (
              <button
                type="button"
                onClick={() => setSelectedItem(item)}
                className="h-full w-full cursor-zoom-in"
                aria-label={`Agrandir l'image : ${item.titre}`}
              >
                <Image
                  src={item.image_url}
                  alt={item.titre}
                  width={1200}
                  height={900}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </button>
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[var(--paper)] px-6 text-center text-sm text-[var(--ink-500)]">
                Image retiree
              </div>
            )}
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

      {selectedItem?.image_url ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`Image agrandie : ${selectedItem.titre}`}
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative max-h-full max-w-6xl"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={selectedItem.image_url}
              alt={selectedItem.titre}
              width={1600}
              height={1200}
              sizes="100vw"
              className="max-h-[85vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
            />
            <button
              type="button"
              onClick={() => setSelectedItem(null)}
              className="absolute -right-2 -top-2 flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl font-medium text-[var(--ink-900)] shadow-lg transition hover:bg-[var(--paper)]"
              aria-label="Fermer l'image agrandie"
            >
              ×
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
