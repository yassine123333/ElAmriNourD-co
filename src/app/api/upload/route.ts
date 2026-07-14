import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthorized } from "@/lib/admin";
import { uploadToCloudinary } from "@/lib/cloudinary";

export async function POST(request: NextRequest) {
  const password = request.headers.get("x-admin-password");

  if (!isAdminAuthorized(password)) {
    return NextResponse.json({ message: "Acces refuse." }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ message: "Fichier manquant." }, { status: 400 });
    }

    const url = await uploadToCloudinary(file);
    return NextResponse.json({ url }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Erreur pendant l'upload.",
      },
      { status: 500 },
    );
  }
}
