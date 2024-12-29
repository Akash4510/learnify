"use server";

import { USER_ROLE } from "@prisma/client";

import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { CoursePurchaseWithCourse } from "@/types/purchase";

const groupByCourse = (purchases: CoursePurchaseWithCourse[]) => {
  const grouped: { [courseTitle: string]: number } = {};

  purchases.forEach((purchase) => {
    const courseTitle = purchase.course.title;

    if (!grouped[courseTitle]) {
      grouped[courseTitle] = 0;
    }
    grouped[courseTitle] += purchase.course.price!;
  });

  return grouped;
};

export const getChannelAnalytics = async ({
  channelId,
}: {
  channelId: string;
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

  if (dbUser.role === USER_ROLE.USER) {
    return {
      error: {
        message: "Not a creator!",
      },
    };
  }

  const purchases = await db.coursePurchase.findMany({
    where: {
      course: {
        channel: {
          id: channelId,
        },
      },
    },
    include: {
      course: true,
    },
  });

  const groupedEarnings = groupByCourse(purchases);
  const data = Object.entries(groupedEarnings).map(([courseTitle, total]) => ({
    name: courseTitle,
    total,
  }));

  const totalRevenue = data.reduce((acc, curr) => acc + curr.total, 0);
  const totalSales = purchases.length;

  return {
    success: {
      message: "Analytics fetched successfully!",
      data,
      totalRevenue,
      totalSales,
    },
  };
};

export const getCreatorAnalytics = async () => {
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

  if (dbUser.role === USER_ROLE.USER) {
    return {
      error: {
        message: "Not a creator!",
      },
    };
  }

  const purchases = await db.coursePurchase.findMany({
    where: {
      course: {
        channel: {
          creatorId: user.id,
        },
      },
    },
    include: {
      course: true,
    },
  });

  const groupedEarnings = groupByCourse(purchases);
  // const groupedEarnings = {
  //   testCourse: 3000,
  //   anotherCourse: 5000,
  //   hello: 3900,
  //   anotherHello: 5400,
  //   amazingCourse: 6900,
  //   lastOne: 4000,
  // };
  const data = Object.entries(groupedEarnings).map(([courseTitle, total]) => ({
    name: courseTitle,
    total,
  }));

  const totalRevenue = data.reduce((acc, curr) => acc + curr.total, 0);
  const totalSales = purchases.length;

  return {
    success: {
      message: "Analytics fetched successfully!",
      data,
      totalRevenue,
      totalSales,
    },
  };
};
