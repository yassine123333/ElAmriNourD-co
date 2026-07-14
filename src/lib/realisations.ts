import { isDatabaseConfigured, query } from "@/lib/db";
import { SAMPLE_REALISATIONS } from "@/lib/sample-data";
import { Category, ContactMessage, Realisation } from "@/lib/types";

type NewRealisationInput = {
  titre: string;
  description: string;
  categorie: Category;
  image_url: string;
};

type RealisationRow = Omit<Realisation, "created_at"> & {
  created_at: string | Date;
};

const sortByNewest = (items: Realisation[]) =>
  [...items].sort((a, b) =>
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );

const toRealisation = (row: RealisationRow): Realisation => ({
  ...row,
  created_at:
    row.created_at instanceof Date
      ? row.created_at.toISOString()
      : row.created_at,
});

export async function getRealisations(
  category?: Category,
  includeWithoutImage = false,
) {
  if (!isDatabaseConfigured) {
    const fallback = category
      ? SAMPLE_REALISATIONS.filter((item) => item.categorie === category)
      : SAMPLE_REALISATIONS;
    return sortByNewest(fallback);
  }

  try {
    const filters = [
      ...(category ? ["categorie = $1"] : []),
      ...(!includeWithoutImage ? ["image_url is not null"] : []),
    ];
    const sql = `select id, titre, description, categorie, image_url, created_at
      from public.realisations
      ${filters.length ? `where ${filters.join(" and ")}` : ""}
      order by created_at desc`;
    const values = category ? [category] : [];

    const result = await query<RealisationRow>(
      sql,
      values,
    );
    return result.rows.map(toRealisation);
  } catch (error) {
    throw new Error(
      `Erreur base de donnees: ${error instanceof Error ? error.message : "lecture impossible."}`,
    );
  }
}

export async function createRealisation(input: NewRealisationInput) {
  if (!isDatabaseConfigured) {
    throw new Error(
      "Base non configuree. Ajoutez SUPABASE_DB_URL.",
    );
  }

  try {
    const result = await query<RealisationRow>(
      `insert into public.realisations (titre, description, categorie, image_url)
       values ($1, $2, $3, $4)
       returning id, titre, description, categorie, image_url, created_at`,
      [input.titre, input.description, input.categorie, input.image_url],
    );

    const created = result.rows[0];

    if (!created) {
      throw new Error("Aucune ligne retournee apres insertion.");
    }

    return toRealisation(created);
  } catch (error) {
    throw new Error(
      `Insertion echouee: ${error instanceof Error ? error.message : "erreur inconnue."}`,
    );
  }
}

export async function removeRealisation(id: string) {
  if (!isDatabaseConfigured) {
    throw new Error(
      "Suppression impossible sans SUPABASE_DB_URL.",
    );
  }

  try {
    await query("delete from public.realisations where id = $1", [id]);
  } catch (error) {
    throw new Error(
      `Suppression echouee: ${error instanceof Error ? error.message : "erreur inconnue."}`,
    );
  }
}

export async function removeRealisationImage(id: string) {
  if (!isDatabaseConfigured) {
    throw new Error(
      "Suppression impossible sans SUPABASE_DB_URL.",
    );
  }

  try {
    const result = await query<RealisationRow>(
      `update public.realisations
       set image_url = null
       where id = $1
       returning id, titre, description, categorie, image_url, created_at`,
      [id],
    );

    const updated = result.rows[0];

    if (!updated) {
      throw new Error("Realisation introuvable.");
    }

    return toRealisation(updated);
  } catch (error) {
    throw new Error(
      `Suppression de l'image echouee: ${error instanceof Error ? error.message : "erreur inconnue."}`,
    );
  }
}

export async function saveContactMessage(payload: ContactMessage) {
  if (!isDatabaseConfigured) {
    return;
  }

  try {
    await query(
      "insert into public.messages (nom, telephone, message) values ($1, $2, $3)",
      [payload.nom, payload.telephone, payload.message],
    );
  } catch (error) {
    throw new Error(
      `Enregistrement du message impossible: ${error instanceof Error ? error.message : "erreur inconnue."}`,
    );
  }
}
