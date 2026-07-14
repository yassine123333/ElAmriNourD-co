import { AdminPanel } from "@/components/admin-panel";
import { getRealisations } from "@/lib/realisations";

export default async function AdminPage() {
  const items = await getRealisations();

  return (
    <main className="mx-auto w-full max-w-5xl space-y-6 px-4 py-10 md:px-8">
      <h1 className="font-display text-4xl text-[var(--ink-900)]">Administration</h1>
      <AdminPanel initialItems={items} />
    </main>
  );
}
