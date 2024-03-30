import { z } from "zod";

export const CreateCourseSchema = z.object({
  title: z.string().min(1, {
    message: "Course title is required!",
  }),
});

export type CreateCourseSchema = z.infer<typeof CreateCourseSchema>;
