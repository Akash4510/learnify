import { z } from "zod";

export const CreateChapterSchema = z.object({
  title: z.string().min(1, {
    message: "Chapter title is required!",
  }),
});

export type CreateChapterSchema = z.infer<typeof CreateChapterSchema>;

export const EditChapterSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  isFree: z.boolean().default(false).optional(),
  videoUrl: z.string().optional(),
});

export type EditChapterSchema = z.infer<typeof EditChapterSchema>;
