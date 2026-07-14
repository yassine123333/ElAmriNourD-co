import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthorized } from "@/lib/admin";

export async function POST(request: NextRequest) {
  const password = request.headers.get("x-admin-password");

  if (!isAdminAuthorized(password)) {
    return NextResponse.json({ message: "Mot de passe admin incorrect." }, { status: 401 });
  }

  return NextResponse.json({ ok: true });
}
