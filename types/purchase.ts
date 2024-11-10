import { Course, CoursePurchase } from "@prisma/client";

export type CoursePurchaseWithCourse = CoursePurchase & {
  course: Course;
};
