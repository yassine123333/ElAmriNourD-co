export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-4xl space-y-10 px-4 py-10 md:px-8">
      <section className="space-y-4">
        <p className="text-sm uppercase tracking-[0.2em] text-[var(--ink-500)]">
          Notre atelier
        </p>
        <h1 className="font-display text-4xl text-[var(--ink-900)]">A propos</h1>
        <p className="leading-relaxed text-[var(--ink-700)]">
          Nour Amri Deco met en avant le savoir-faire artisanal de Amri Abdelkader,
          specialiste tunisien de la decoration en platre. Chaque chantier est
          realise avec precision pour creer des espaces elegants, durables et
          harmonieux.
        </p>
      </section>

      <section className="grid gap-4 rounded-2xl border border-[var(--line)] bg-white p-6 shadow-sm md:grid-cols-3">
        <article>
          <p className="font-display text-3xl text-[var(--ink-900)]">15+</p>
          <p className="text-sm text-[var(--ink-600)]">Annees experience</p>
        </article>
        <article>
          <p className="font-display text-3xl text-[var(--ink-900)]">300+</p>
          <p className="text-sm text-[var(--ink-600)]">Projets termines</p>
        </article>
        <article>
          <p className="font-display text-3xl text-[var(--ink-900)]">Tunisie</p>
          <p className="text-sm text-[var(--ink-600)]">Zone intervention</p>
        </article>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-2xl text-[var(--ink-900)]">Notre approche</h2>
        <p className="leading-relaxed text-[var(--ink-700)]">
          Nous travaillons avec une logique simple: ecouter le besoin, proposer
          un design adapte au lieu, puis executer avec des finitions propres.
          Du style classique au contemporain, le but reste le meme:
          sublimer le volume interieur.
        </p>
      </section>
    </main>
  );
}
