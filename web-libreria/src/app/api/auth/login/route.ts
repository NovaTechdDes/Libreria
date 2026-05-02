import { NextResponse } from "next/server";

const ADMIN_USER = {
  email: "admin@tienda.com",
  password: "123456",
};

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (email === ADMIN_USER.email && password === ADMIN_USER.password) {
    const response = NextResponse.json({ success: true });

    response.cookies.set("auth-token", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 2,
    });

    return response;
  }

  return NextResponse.json(
    { success: false, message: "Credenciales incorrectas" },
    { status: 401 },
  );
}
