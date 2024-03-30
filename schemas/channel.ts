import { z } from "zod";

export const CreateChannelSchema = z.object({
  name: z.string().min(1, {
    message: "Channel name is required",
  }),
  description: z.string().min(1, {
    message: "Channel description is required",
  }),
  logo: z.string().optional(),
  coverImg: z.string().optional(),
});

export type CreateChannelSchema = z.infer<typeof CreateChannelSchema>;

export const EditChannelSchema = z.object({
  name: z.string().min(1, {
    message: "Channel name is required",
  }),
  description: z.string().min(1, {
    message: "Channel description is required",
  }),
  logo: z.string().optional(),
  coverImg: z.string().optional(),
});

export type EditChannelSchema = z.infer<typeof EditChannelSchema>;
