"use client";

import { FormEvent, useMemo, useState } from "react";
import { CATEGORIES, Realisation } from "@/lib/types";

type AdminPanelProps = {
  initialItems: Realisation[];
};

type FormState = {
  titre: string;
  categorie: (typeof CATEGORIES)[number];
  description: string;
  file: File | null;
};

const initialFormState: FormState = {
  titre: "",
  categorie: "Plafonds",
  description: "",
  file: null,
};

export function AdminPanel({ initialItems }: AdminPanelProps) {
  const [password, setPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [items, setItems] = useState(initialItems);
  const [form, setForm] = useState<FormState>(initialFormState);
  const [feedback, setFeedback] = useState("");
  const [busy, setBusy] = useState(false);

  const canSubmit = useMemo(
    () => Boolean(form.titre && form.description && form.file),
    [form],
  );

  async function unlock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!password) {
      setFeedback("Entrez le mot de passe admin.");
      return;
    }

    setBusy(true);
    setFeedback("");

    try {
      const response = await fetch("/api/admin/session", {
        method: "POST",
        headers: { "x-admin-password": password },
      });
      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message || "Acces refuse.");
      }

      setIsUnlocked(true);
    } catch (error) {
      setFeedback(
        error instanceof Error ? error.message : "Acces refuse.",
      );
    } finally {
      setBusy(false);
    }
  }

  async function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canSubmit || !form.file) {
      setFeedback("Veuillez completer tous les champs et ajouter une image.");
      return;
    }

    setBusy(true);
    setFeedback("");

    try {
      const uploadData = new FormData();
      uploadData.append("file", form.file);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        headers: { "x-admin-password": password },
        body: uploadData,
      });

      const uploadJson = (await uploadRes.json()) as {
        url?: string;
        message?: string;
      };

      if (!uploadRes.ok || !uploadJson.url) {
        throw new Error(uploadJson.message || "Upload echoue.");
      }

      const createRes = await fetch("/api/realisations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify({
          titre: form.titre,
          categorie: form.categorie,
          description: form.description,
          image_url: uploadJson.url,
        }),
      });

      const createJson = (await createRes.json()) as {
        item?: Realisation;
        message?: string;
      };

      if (!createRes.ok || !createJson.item) {
        throw new Error(createJson.message || "Ajout impossible.");
      }

      setItems((prev) => [createJson.item!, ...prev]);
      setForm(initialFormState);
      setFeedback("Realisation ajoutee avec succes.");
    } catch (error) {
      setFeedback(
        error instanceof Error
          ? error.message
          : "Une erreur inattendue est survenue.",
      );
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Supprimer cette realisation ?")) {
      return;
    }

    setBusy(true);
    setFeedback("");

    try {
      const response = await fetch(`/api/realisations/${id}`, {
        method: "DELETE",
        headers: { "x-admin-password": password },
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message || "Suppression impossible.");
      }

      setItems((prev) => prev.filter((item) => item.id !== id));
      setFeedback("Realisation supprimee.");
    } catch (error) {
      setFeedback(
        error instanceof Error
          ? error.message
          : "Une erreur inattendue est survenue.",
      );
    } finally {
      setBusy(false);
    }
  }

  async function handleImageDelete(id: string) {
    if (!confirm("Supprimer uniquement l'image de cette realisation ?")) {
      return;
    }

    setBusy(true);
    setFeedback("");

    try {
      const response = await fetch(`/api/realisations/${id}`, {
        method: "PATCH",
        headers: { "x-admin-password": password },
      });
      const data = (await response.json()) as {
        item?: Realisation;
        message?: string;
      };

      if (!response.ok || !data.item) {
        throw new Error(data.message || "Suppression de l'image impossible.");
      }

      setItems((prev) =>
        prev.map((item) => (item.id === id ? data.item! : item)),
      );
      setFeedback("Image retiree. La realisation a ete conservee.");
    } catch (error) {
      setFeedback(
        error instanceof Error
          ? error.message
          : "Une erreur inattendue est survenue.",
      );
    } finally {
      setBusy(false);
    }
  }

  if (!isUnlocked) {
    return (
      <section className="mx-auto w-full max-w-md rounded-2xl border border-[var(--line)] bg-white p-6 shadow-sm">
        <h1 className="font-display text-2xl text-[var(--ink-900)]">Espace admin</h1>
        <p className="mt-2 text-sm text-[var(--ink-600)]">
          Entrez le mot de passe defini dans ADMIN_PASSWORD.
        </p>
        <form onSubmit={unlock} className="mt-5 space-y-3">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-[var(--line)] px-4 py-2"
            placeholder="Mot de passe"
          />
          <button
            disabled={busy}
            className="w-full rounded-full bg-[var(--ink-900)] px-4 py-2 text-white disabled:opacity-60"
          >
            {busy ? "Verification..." : "Entrer"}
          </button>
        </form>
        {feedback ? <p className="mt-3 text-sm text-red-700">{feedback}</p> : null}
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-[var(--line)] bg-white p-6 shadow-sm">
        <h2 className="font-display text-2xl text-[var(--ink-900)]">
          Ajouter une realisation
        </h2>
        <form onSubmit={handleCreate} className="mt-4 grid gap-3 md:grid-cols-2">
          <input
            value={form.titre}
            onChange={(e) => setForm((prev) => ({ ...prev, titre: e.target.value }))}
            className="rounded-xl border border-[var(--line)] px-4 py-2"
            placeholder="Titre"
          />
          <select
            value={form.categorie}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                categorie: e.target.value as FormState["categorie"],
              }))
            }
            className="rounded-xl border border-[var(--line)] px-4 py-2"
          >
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <textarea
            value={form.description}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, description: e.target.value }))
            }
            className="rounded-xl border border-[var(--line)] px-4 py-2 md:col-span-2"
            rows={3}
            placeholder="Description courte"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setForm((prev) => ({ ...prev, file: e.target.files?.[0] || null }))
            }
            className="rounded-xl border border-[var(--line)] px-4 py-2 md:col-span-2"
          />
          <button
            disabled={busy || !canSubmit}
            className="rounded-full bg-[var(--brand-gold)] px-5 py-2 text-[var(--ink-900)] transition hover:brightness-95 disabled:opacity-60 md:col-span-2"
          >
            {busy ? "Traitement..." : "Ajouter"}
          </button>
        </form>
      </div>

      {feedback ? (
        <p className="rounded-xl bg-[var(--paper)] px-4 py-3 text-sm text-[var(--ink-700)]">
          {feedback}
        </p>
      ) : null}

      <div className="space-y-3">
        {items.map((item) => (
          <article
            key={item.id}
            className="flex items-center justify-between rounded-xl border border-[var(--line)] bg-white px-4 py-3"
          >
            <div>
              <p className="font-medium text-[var(--ink-900)]">{item.titre}</p>
              <p className="text-sm text-[var(--ink-600)]">{item.categorie}</p>
            </div>
            <div className="flex flex-wrap justify-end gap-2">
              {item.image_url ? (
                <button
                  onClick={() => handleImageDelete(item.id)}
                  disabled={busy}
                  className="rounded-full border border-amber-200 px-4 py-1 text-sm text-amber-800 transition hover:bg-amber-50 disabled:opacity-60"
                >
                  Supprimer l&apos;image
                </button>
              ) : null}
              <button
                onClick={() => handleDelete(item.id)}
                disabled={busy}
                className="rounded-full border border-red-200 px-4 py-1 text-sm text-red-700 transition hover:bg-red-50 disabled:opacity-60"
              >
                Supprimer
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
