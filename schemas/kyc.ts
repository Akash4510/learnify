import { z } from "zod";

export const KYCSchema = z.object({
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
  aadhaarNumber: z.string({
    required_error: "Aadhaar number is required",
  }),
  bankAccountNumber: z.string({
    required_error: "Bank account number is required",
  }),
  bankIfscCode: z.string({
    required_error: "Bank IFSC code is required",
  }),
});

export type KYCSchema = z.infer<typeof KYCSchema>;
