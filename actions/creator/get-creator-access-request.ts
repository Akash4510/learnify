"use server";

import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { CREATOR_ACCESS_REQUEST_STATUS, USER_ROLE } from "@prisma/client";

export const getCreatorAccessRequests = async () => {
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

  const requests = await db.creatorAccessRequest.findMany({
    where: {
      userId: user.id,
    },
  });

  if (!requests) {
    return {
      error: {
        message: "Creator access requests not found!",
      },
    };
  }

  const rejectedRequests = requests.filter(
    (req) => req.status === CREATOR_ACCESS_REQUEST_STATUS.REJECTED
  );
  const pendingRequests = requests.filter(
    (req) => req.status === CREATOR_ACCESS_REQUEST_STATUS.PENDING
  );

  return {
    success: {
      message: "Creator access request fetched!",
      rejectedRequests,
      pendingRequests,
    },
  };
};
