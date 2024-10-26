"use server";

import { db } from "@/lib/db";
import { Attachment, Chapter, MuxData } from "@prisma/client";

export const getChapter = async ({
  userId,
  courseId,
  chapterId,
}: {
  userId: string;
  courseId: string;
  chapterId: string;
}) => {
  const purchase = await db.coursePurchase.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId,
      },
    },
  });

  const course = await db.course.findUnique({
    where: {
      id: courseId,
      isPublished: true,
    },
    select: {
      price: true,
    },
  });

  const chapter = await db.chapter.findUnique({
    where: {
      id: chapterId,
      isPublished: true,
    },
  });

  if (!chapter || !course) {
    return {
      error: {
        message: "Chapter not found!",
      },
    };
  }

  let muxData: MuxData | null = null;
  let attachments: Attachment[] = [];
  let nextChapter: Chapter | null = null;

  if (purchase) {
    attachments = await db.attachment.findMany({
      where: {
        courseId,
      },
    });
  }

  if (chapter.isFree || purchase) {
    muxData = await db.muxData.findUnique({
      where: {
        chapterId,
      },
    });

    nextChapter = await db.chapter.findFirst({
      where: {
        courseId,
        isPublished: true,
        position: {
          gt: chapter.position,
        },
      },
      orderBy: {
        position: "asc",
      },
    });
  }

  const userProgress = await db.userProgress.findUnique({
    where: {
      userId_chapterId: {
        userId,
        chapterId,
      },
    },
  });

  return {
    success: {
      message: "Chapter fetched successfully",
      data: {
        chapter,
        course,
        muxData,
        attachments,
        nextChapter,
        userProgress,
        purchase,
      },
    },
  };
};
