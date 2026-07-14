import Image from "next/image";
import Link from "next/link";
import { RealisationsGrid } from "@/components/realisations-grid";
import { getRealisations } from "@/lib/realisations";

export default async function HomePage() {
  const items = await getRealisations();
  const featured = items.slice(0, 6);

  return (
    <main className="pb-16">
      <section className="section-wrap relative overflow-hidden pb-10 pt-14 md:pt-20">
        <div className="fade-up relative z-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--ink-500)]">
              Atelier tunisien de decoration en platre
            </p>
            <h1 className="font-display text-4xl leading-tight text-[var(--ink-900)] md:text-6xl">
              Nour Amri Deco
              <span className="mt-2 block text-2xl text-[var(--brand-terracotta)] md:text-3xl">
                Finitions artisanales pour plafonds, corniches et moulures
              </span>
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-[var(--ink-700)] md:text-lg">
              Nous realisons des compositions en staff sur mesure pour maisons,
              appartements et locaux professionnels, avec un souci constant de
              precision et de elegance.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/galerie"
                className="rounded-full bg-[var(--ink-900)] px-6 py-3 text-sm font-semibold tracking-wide text-white transition hover:bg-[var(--ink-800)]"
              >
                Voir toutes nos realisations
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-[var(--line)] bg-white px-6 py-3 text-sm font-semibold tracking-wide text-[var(--ink-800)] transition hover:border-[var(--ink-600)]"
              >
                Nous contacter
              </Link>
            </div>
          </div>

          <div className="fade-up rounded-[28px] border border-[var(--line)] bg-white/90 p-3 shadow-[0_20px_50px_-30px_rgba(47,35,25,0.75)] [animation-delay:150ms]">
            <Image
              src="https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&w=1400&q=80"
              alt="Plafond decoratif realise en platre"
              width={1400}
              height={900}
              sizes="(max-width: 768px) 100vw, 40vw"
              priority
              className="h-[300px] w-full rounded-2xl object-cover md:h-[440px]"
            />
          </div>
        </div>
      </section>

      <section className="section-wrap space-y-6 py-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--ink-500)]">
              Portfolio
            </p>
            <h2 className="font-display text-3xl text-[var(--ink-900)] md:text-4xl">
              Nos meilleures realisations
            </h2>
          </div>
          <Link
            href="/galerie"
            className="hidden text-sm font-medium text-[var(--ink-700)] hover:text-[var(--ink-900)] md:inline"
          >
            Explorer la galerie complete
          </Link>
        </div>

        <RealisationsGrid items={featured} />
      </section>
    </main>
  );
}
