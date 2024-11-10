"use server";

import { revalidatePath } from "next/cache";
import { CREATOR_ACCESS_REQUEST_STATUS, USER_ROLE } from "@prisma/client";

import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export const rejectCreatorAccess = async ({
  requestId,
}: {
  requestId: string;
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

  if (dbUser.role !== USER_ROLE.ADMIN) {
    return {
      error: {
        message: "Not an admin!",
      },
    };
  }

  const request = await db.creatorAccessRequest.findUnique({
    where: {
      id: requestId,
    },
  });

  if (!request) {
    return {
      error: {
        message: "Creator access request not found!",
      },
    };
  }

  if (request.status !== CREATOR_ACCESS_REQUEST_STATUS.PENDING) {
    return {
      error: {
        message:
          request.status === CREATOR_ACCESS_REQUEST_STATUS.APPROVED
            ? "This request has already been approved"
            : "This request has already been rejected",
      },
    };
  }

  // Reject the request
  const updatedRequest = await db.creatorAccessRequest.update({
    where: {
      id: requestId,
    },
    data: {
      status: CREATOR_ACCESS_REQUEST_STATUS.REJECTED,
    },
  });

  revalidatePath("/dashboard/manage/creator-access-requests");

  return {
    success: {
      message: "Creator access request rejected!",
      updatedRequest,
    },
  };
};
