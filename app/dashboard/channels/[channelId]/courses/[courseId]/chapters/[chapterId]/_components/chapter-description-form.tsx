"use client";

import { useState, useTransition } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Pencil, PlusCircle, Save, X } from "lucide-react";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { editChapter } from "@/actions/course/chapter";
import { Editor } from "@/components/editor";
import { Preview } from "@/components/preview";

interface ChapterDescriptionFormProps {
  channelId: string;
  courseId: string;
  chapterId: string;
  description: string | null;
}

const formSchema = z.object({
  description: z.string().optional(),
});

type formSchema = z.infer<typeof formSchema>;

export const ChapterDescriptionForm = ({
  channelId,
  courseId,
  chapterId,
  description,
}: ChapterDescriptionFormProps) => {
  const [isPending, startTransition] = useTransition();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const form = useForm<formSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: description || undefined,
    },
  });

  const { handleSubmit, control } = form;

  const toggleEditing = () => {
    setIsEditing((value) => !value);
  };

  const onSubmit = async (values: formSchema) => {
    if (description === values.description) {
      toast.info("No modifications!");
      return;
    }

    startTransition(() => {
      editChapter(channelId, courseId, chapterId, values)
        .then((data) => {
          const { error, success } = data;
          if (success) {
            values.description
              ? toast.success("Chapter description updated")
              : toast.success("Chapter description removed");
            toggleEditing();
          }
          if (error) {
            toast.error(error.message);
          }
        })
        .catch(() => {
          toast.error("Something went wrong!");
        });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-accent rounded-md p-4">
          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <div className="text-base flex items-center justify-between gap-4 px-0.5">
                  <FormLabel className="text-base">
                    Chapter description
                  </FormLabel>

                  <div className="flex items-center justify-center gap-4">
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      disabled={isPending}
                      className="bg-accent hover:bg-muted-foreground/20 h-8 transition-all"
                      onClick={() => {
                        toggleEditing();
                        setTimeout(() => {
                          form.setFocus("description");
                        }, 20);
                      }}
                    >
                      {isEditing ? (
                        <>
                          <X className="size-3 sm:mr-2" />
                          <span className="hidden sm:flex">Cancel</span>
                        </>
                      ) : description ? (
                        <>
                          <Pencil className="size-3 sm:mr-2" />
                          <span className="hidden sm:flex">
                            Edit
                            <span className="hidden lg:flex ml-1">
                              description
                            </span>
                          </span>
                        </>
                      ) : (
                        <>
                          <PlusCircle className="size-3 sm:mr-2" />
                          <span className="hidden sm:flex">
                            Add
                            <span className="hidden lg:flex ml-1">
                              a description
                            </span>
                          </span>
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                <FormControl className="!mt-2.5 font-black">
                  {isEditing ? (
                    <Editor {...field} />
                  ) : field.value ? (
                    <Preview value={field.value} />
                  ) : (
                    <p className="font-light text-sm py-2 bg-background/30 px-4 rounded-md font-mono opacity-75">
                      No description added
                    </p>
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {isEditing && (
            <Button
              size="sm"
              className="h-8 w-24 mt-4 transition-all"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="size-3 animate-spin" />
                </>
              ) : (
                <>
                  <Save className="size-3 mr-2" />
                  <span>Save</span>
                </>
              )}
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};
