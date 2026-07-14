"use client";

import { FormEvent, useState } from "react";

const initialState = { nom: "", telephone: "", message: "" };

export function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [feedback, setFeedback] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setFeedback("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message || "Erreur lors de l'envoi.");
      }

      setStatus("success");
      setFeedback("Votre message a bien ete envoye. Merci.");
      setForm(initialState);
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error
          ? error.message
          : "Une erreur inattendue est survenue.",
      );
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-[var(--line)] bg-white p-6 shadow-sm">
      <div>
        <label htmlFor="nom" className="mb-1 block text-sm text-[var(--ink-700)]">
          Nom
        </label>
        <input
          id="nom"
          required
          value={form.nom}
          onChange={(e) => setForm((prev) => ({ ...prev, nom: e.target.value }))}
          className="w-full rounded-xl border border-[var(--line)] px-4 py-2 outline-none transition focus:border-[var(--ink-700)]"
        />
      </div>

      <div>
        <label htmlFor="telephone" className="mb-1 block text-sm text-[var(--ink-700)]">
          Telephone
        </label>
        <input
          id="telephone"
          required
          value={form.telephone}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, telephone: e.target.value }))
          }
          className="w-full rounded-xl border border-[var(--line)] px-4 py-2 outline-none transition focus:border-[var(--ink-700)]"
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-1 block text-sm text-[var(--ink-700)]">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={form.message}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, message: e.target.value }))
          }
          className="w-full rounded-xl border border-[var(--line)] px-4 py-2 outline-none transition focus:border-[var(--ink-700)]"
        />
      </div>

      <button
        disabled={status === "loading"}
        className="rounded-full bg-[var(--ink-900)] px-5 py-2 text-sm font-medium text-white transition hover:bg-[var(--ink-700)] disabled:opacity-60"
      >
        {status === "loading" ? "Envoi..." : "Envoyer"}
      </button>

      {feedback ? (
        <p
          className={`text-sm ${
            status === "success" ? "text-emerald-700" : "text-red-700"
          }`}
        >
          {feedback}
        </p>
      ) : null}
    </form>
  );
}
