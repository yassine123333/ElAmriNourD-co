import { GalleryFilters } from "@/components/gallery-filters";
import { RealisationsGrid } from "@/components/realisations-grid";
import { getRealisations } from "@/lib/realisations";
import { CATEGORIES, Category } from "@/lib/types";

type GaleriePageProps = {
  searchParams: {
    categorie?: string;
  };
};

export default async function GaleriePage({ searchParams }: GaleriePageProps) {
  const rawCategory = searchParams.categorie;
  const category = CATEGORIES.includes(rawCategory as Category)
    ? (rawCategory as Category)
    : undefined;

  const items = await getRealisations(category);

  return (
    <main className="mx-auto w-full max-w-6xl space-y-8 px-4 py-10 md:px-8">
      <section className="space-y-3">
        <h1 className="font-display text-4xl text-[var(--ink-900)]">Galerie</h1>
        <p className="max-w-2xl text-[var(--ink-600)]">
          Parcourez nos realisations en decoration platre: plafonds, corniches,
          moulures et staff decoratif.
        </p>
      </section>

      <GalleryFilters activeCategory={category} />
      <RealisationsGrid items={items} />
    </main>
  );
}
