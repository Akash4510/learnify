import { Category, Channel, Chapter, Course } from "@prisma/client";
import { SafeChannel } from "./channel";

export interface CourseWithCategory extends Course {
  category: Category | null;
}

export interface CourseWithChannel extends Course {
  channel: Channel;
}

export interface CourseWithSafeChannel extends Course {
  channel: SafeChannel;
}

export interface CourseWithChapters extends Course {
  chapters: Chapter[];
}

export interface CourseWithCategoryAndSafeChannel extends CourseWithCategory {
  channel: SafeChannel;
}
