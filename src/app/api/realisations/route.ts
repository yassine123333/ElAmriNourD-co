import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdminAuthorized } from "@/lib/admin";
import { createRealisation, getRealisations } from "@/lib/realisations";
import { CATEGORIES, Category } from "@/lib/types";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const rawCategory = searchParams.get("categorie") || undefined;
  const category = CATEGORIES.includes(rawCategory as Category)
    ? (rawCategory as Category)
    : undefined;

  try {
    const items = await getRealisations(category);
    return NextResponse.json({ items });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Impossible de lire les donnees.",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const password = request.headers.get("x-admin-password");

  if (!isAdminAuthorized(password)) {
    return NextResponse.json({ message: "Acces refuse." }, { status: 401 });
  }

  try {
    const body = (await request.json()) as {
      titre?: string;
      description?: string;
      categorie?: Category;
      image_url?: string;
    };

    if (!body.titre || !body.image_url || !body.categorie) {
      return NextResponse.json(
        { message: "Champs manquants." },
        { status: 400 },
      );
    }

    if (!CATEGORIES.includes(body.categorie)) {
      return NextResponse.json(
        { message: "Categorie invalide." },
        { status: 400 },
      );
    }

    const item = await createRealisation({
      titre: body.titre,
      description: body.description?.trim() || "",
      categorie: body.categorie,
      image_url: body.image_url,
    });

    revalidatePath("/");
    revalidatePath("/galerie");
    revalidatePath("/admin");

    return NextResponse.json({ item }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Erreur lors de l'ajout.",
      },
      { status: 500 },
    );
  }
}
