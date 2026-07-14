import { NextRequest, NextResponse } from "next/server";
import { saveContactMessage } from "@/lib/realisations";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      nom?: string;
      telephone?: string;
      message?: string;
    };

    if (!body.nom || !body.telephone || !body.message) {
      return NextResponse.json(
        { message: "Veuillez remplir tous les champs." },
        { status: 400 },
      );
    }

    await saveContactMessage({
      nom: body.nom,
      telephone: body.telephone,
      message: body.message,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Erreur lors de l'envoi.",
      },
      { status: 500 },
    );
  }
}
