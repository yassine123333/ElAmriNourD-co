import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdminAuthorized } from "@/lib/admin";
import { removeRealisation, removeRealisationImage } from "@/lib/realisations";

type RouteContext = {
  params: {
    id: string;
  };
};

export async function DELETE(request: NextRequest, context: RouteContext) {
  const password = request.headers.get("x-admin-password");

  if (!isAdminAuthorized(password)) {
    return NextResponse.json({ message: "Acces refuse." }, { status: 401 });
  }

  try {
    await removeRealisation(context.params.id);
    revalidatePath("/");
    revalidatePath("/galerie");
    revalidatePath("/admin");
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Erreur lors de la suppression.",
      },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  const password = request.headers.get("x-admin-password");

  if (!isAdminAuthorized(password)) {
    return NextResponse.json({ message: "Acces refuse." }, { status: 401 });
  }

  try {
    const item = await removeRealisationImage(context.params.id);
    revalidatePath("/");
    revalidatePath("/galerie");
    revalidatePath("/admin");
    return NextResponse.json({ item });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Erreur lors de la suppression de l'image.",
      },
      { status: 500 },
    );
  }
}
