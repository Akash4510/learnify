"use server";

import { KYC_STATUS } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { KYCSchema } from "@/schemas/kyc";

export const updateKYC = async (values: KYCSchema) => {
  const validatedFields = KYCSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: {
        message: "Please provide your complete KYC details",
      },
    };
  }

  const user = await getCurrentUser();

  if (!user) {
    return {
      error: {
        message: "Unauthorized",
      },
    };
  }

  const dbUser = await db.user.findUnique({
    where: {
      id: user?.id,
    },
  });

  if (!dbUser) {
    return {
      error: {
        message: "User not found",
      },
    };
  }

  const kyc = await db.kYC.update({
    where: {
      userId: dbUser.id,
    },
    data: {
      ...values,
      status: KYC_STATUS.PENDING,
    },
  });

  revalidatePath("/account");

  return {
    success: {
      message: "KYC details updated successfully",
      data: kyc,
    },
  };
};
