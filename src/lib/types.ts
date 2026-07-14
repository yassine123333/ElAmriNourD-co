export const CATEGORIES = [
  "Plafonds",
  "Corniches",
  "Moulures",
  "Staff décoratif",
  "Autre",
] as const;

export type Category = (typeof CATEGORIES)[number];

export type Realisation = {
  id: string;
  titre: string;
  description: string;
  categorie: Category;
  image_url: string | null;
  created_at: string;
};

export type ContactMessage = {
  id?: string;
  nom: string;
  telephone: string;
  message: string;
  created_at?: string;
};
