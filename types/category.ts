import { Category } from "@prisma/client";
import { CourseWithSafeChannel } from "./course";

export interface CategoryWithCourses extends Category {
  courses: CourseWithSafeChannel[];
}
