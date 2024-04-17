import { Channel } from "@prisma/client";
import { CourseWithCategory } from "./course";

export interface SafeChannel {
  id: string;
  name: string;
  logo: string | null;
}

export interface ChannelWithCourses extends Channel {
  courses: CourseWithCategory[];
}
