import { z } from "zod";

export const CreateChapterSchema = z.object({
  title: z.string().min(1, {
    message: "Chapter title is required!",
  }),
});

export type CreateChapterSchema = z.infer<typeof CreateChapterSchema>;
