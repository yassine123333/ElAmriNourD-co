import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthorized } from "@/lib/admin";
import { removeRealisation } from "@/lib/realisations";

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
