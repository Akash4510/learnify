"use server";

import { revalidatePath } from "next/cache";
import { CREATOR_ACCESS_REQUEST_STATUS, USER_ROLE } from "@prisma/client";

import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export const requestCreatorAccess = async ({
  topic,
  proposal,
}: {
  topic: string;
  proposal: string;
}) => {
  const user = await getCurrentUser();

  if (!user || !user.id) {
    return {
      error: {
        message: "Unauthenticated!",
      },
    };
  }

  const dbUser = await db.user.findUnique({
    where: { id: user.id },
  });

  if (!dbUser) {
    return {
      error: {
        message: "User not found!",
      },
    };
  }

  if (dbUser.role === USER_ROLE.CREATOR) {
    return {
      error: {
        message: "Already a creator!",
      },
    };
  }

  const existingRequest = await db.creatorAccessRequest.findFirst({
    where: {
      userId: user.id,
      status: CREATOR_ACCESS_REQUEST_STATUS.PENDING,
    },
  });

  if (existingRequest) {
    return {
      error: {
        message:
          "Already a creator access request is pending. You cannot create another request, if a request is still pending",
      },
    };
  }

  const request = await db.creatorAccessRequest.create({
    data: {
      userId: user.id,
      topic,
      proposal,
    },
  });

  revalidatePath("/creator-dashboard");

  return {
    success: {
      message: "Creator access requested!",
      request,
    },
  };
};
