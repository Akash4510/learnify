"use server";

import { revalidatePath } from "next/cache";
import { CREATOR_ACCESS_REQUEST_STATUS, USER_ROLE } from "@prisma/client";

import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export const editCreatorAccess = async ({
  requestId,
  topic,
  proposal,
}: {
  requestId: string;
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

  const updatedRequest = await db.creatorAccessRequest.update({
    where: {
      id: requestId,
      status: CREATOR_ACCESS_REQUEST_STATUS.PENDING,
    },
    data: {
      topic,
      proposal,
    },
  });

  if (!updatedRequest) {
    return {
      error: {
        message: "Creator access request not found!",
      },
    };
  }

  revalidatePath("/creator-dashboard");

  return {
    success: {
      message: "Creator access request updated!",
      updatedRequest,
    },
  };
};
