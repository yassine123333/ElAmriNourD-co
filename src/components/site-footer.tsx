export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-[var(--line)] bg-white/70">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-[var(--ink-600)] md:px-8 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Nour Amri Deco</p>
        <p>Amri Abdelkader - Travaux de plafonds, corniches et moulures</p>
      </div>
    </footer>
  );
}
