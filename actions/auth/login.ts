"use server";

import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";

import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas/auth";
import { db } from "@/lib/db";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const login = async (
  values: LoginSchema,
  callbackUrl?: string | null
) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: {
        message: "Invalid fields!",
      },
    };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return {
      error: {
        message: "Email does not exist!",
      },
    };
  }

  const isPasswordCorrect = await bcrypt.compare(
    password,
    existingUser.password
  );
  if (!isPasswordCorrect) {
    return {
      error: {
        message: "Invalid credentials",
      },
    };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return {
      success: {
        message:
          "Confirmation email sent! Please confirm your email to log in to your account",
      },
    };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });

    return {
      success: {
        message: "Logged in successfully",
      },
    };
  } catch (error) {
    // !!This error block will always be triggered because redirecting in NextJs always throws an error, and we are redirecting the user after successful login

    // And here we are manually checking if the error is thrown by the NextJs redirect or is related to auth. If it is related to auth then handle the error
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: {
              message: "Invalid credentials!",
            },
          };

        default:
          return {
            error: {
              message: "Something went wrong!",
            },
          };
      }
    }

    // !!We need to throw the error manually here as this is the NEXT_REDIRECT error, and in NextJs, the `redirect` function work by throwing this error, and here we are catching that error, meaning the server action won't be completed, so to complete the server action we manually need to throw the error.
    throw error;
  }
};
