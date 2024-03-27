import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { RegisterSchema } from "@/schemas/auth";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const validatedFields = RegisterSchema.safeParse(body);

    if (!validatedFields.success) {
      return NextResponse.json({ message: "Invalid fields" }, { status: 400 });
    }

    const { name, email, password } = validatedFields.data;

    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return NextResponse.json(
        { message: "Email already in use" },
        { status: 400 }
      );
    }

    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword, // Make sure to store hashed password only
      },
    });

    const verificationToken = await generateVerificationToken(email);

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return NextResponse.json(
      { message: "Confirmation email sent" },
      { status: 200 }
    );
  } catch (err) {
    console.log("[REGISTER_POST]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
