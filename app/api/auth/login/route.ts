import { NextResponse } from "next/server";
import { AuthError } from "next-auth";

import { LoginSchema } from "@/schemas/auth";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const validatedFields = LoginSchema.safeParse(body);

    if (!validatedFields.success) {
      return NextResponse.json({ message: "Invalid fields" }, { status: 400 });
    }

    const { email, password } = validatedFields.data;

    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });

    return NextResponse.json(
      { message: "Logged in successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.log("[LOGIN_POST]", err);

    if (err instanceof AuthError) {
      switch (err.type) {
        case "CredentialsSignin":
          console.log("next auth error");
          return NextResponse.json(
            { message: "Invalid credentialsss" },
            { status: 400 }
          );

        default:
          return NextResponse.json(
            { message: "Internal Server Errorrr" },
            { status: 500 }
          );
      }
    }

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
