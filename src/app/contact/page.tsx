import { ContactForm } from "@/components/contact-form";

const phone = "+216 56 213 803";
const whatsapp = "21656213803";

export default function ContactPage() {
  return (
    <main className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 md:grid-cols-2 md:px-8">
      <section className="space-y-4">
        <p className="text-sm uppercase tracking-[0.2em] text-[var(--ink-500)]">
          Parlons de votre projet
        </p>
        <h1 className="font-display text-4xl text-[var(--ink-900)]">Contact</h1>
        <p className="text-[var(--ink-700)]">
          Decrivez votre besoin, nous revenons vers vous rapidement.
        </p>

        <div className="space-y-3 rounded-2xl border border-[var(--line)] bg-white p-5 shadow-sm">
          <a href={`tel:${phone.replace(/\s+/g, "")}`} className="block text-[var(--ink-800)] hover:underline">
            Telephone: {phone}
          </a>
          <a
            href={`https://wa.me/${whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="block text-[var(--ink-800)] hover:underline"
          >
            WhatsApp direct
          </a>
          <a
            href="https://www.facebook.com/amri.abdelkader.5?locale=fr_FR"
            target="_blank"
            rel="noreferrer"
            className="block text-[var(--ink-800)] hover:underline"
          >
            Page Facebook
          </a>
          <p className="text-[var(--ink-700)]">Zone intervention: Tunisie</p>
        </div>
      </section>

      <ContactForm />
    </main>
  );
}
