import { Resend } from "resend";

import { VerifyEmailTemplate } from "@/email-templates/verify-email-template";
import { ResetPasswordTemplate } from "@/email-templates/reset-password-template";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL!;

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/verify-email?token=${token}`;

  await resend.emails.send({
    from: "learnupind@gmail.com",
    to: email,
    subject: "Confirm your email",
    react: VerifyEmailTemplate({ confirmLink }),
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  console.log("resetLink - sending reset mail", resetLink);

  const res = await resend.emails.send({
    from: "learnupind@gmail.com",
    to: email,
    subject: "Reset your password",
    react: ResetPasswordTemplate({ resetLink }),
  });

  console.log("res", res);
};
