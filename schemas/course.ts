import { z } from "zod";

export const CreateCourseSchema = z.object({
  title: z.string().min(1, {
    message: "Course title is required!",
  }),
});

export type CreateCourseSchema = z.infer<typeof CreateCourseSchema>;

export const EditCourseSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  thumbnail: z.string().optional(),
  categoryId: z.string().optional(),
  price: z.coerce.number().optional(),
});

export type EditCourseSchema = z.infer<typeof EditCourseSchema>;
