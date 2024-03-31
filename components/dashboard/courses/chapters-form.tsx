"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Pencil, PlusCircle, X } from "lucide-react";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Chapter } from "@prisma/client";
import { CreateChapterSchema } from "@/schemas/chapter";
import { createChapter, reorderChapters } from "@/actions/course/chapter";
import { ChaptersList } from "./chapters-list";
import { useRouter } from "next/navigation";

interface DescriptionFormProps {
  courseId: string;
  channelId: string;
  chapters: Chapter[];
}

export const ChaptersForm = ({
  courseId,
  channelId,
  chapters,
}: DescriptionFormProps) => {
  const router = useRouter();

  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [isReordering, setIsReordering] = useState<boolean>(false);

  const toggleCreating = () => {
    setIsCreating((value) => !value);
  };

  const form = useForm<CreateChapterSchema>({
    resolver: zodResolver(CreateChapterSchema),
    defaultValues: {
      title: "",
    },
  });

  const { handleSubmit } = form;

  const [isPending, startTransition] = useTransition();

  const onSubmit = async (values: CreateChapterSchema) => {
    startTransition(() => {
      createChapter(courseId, values).then((data) => {
        if (data.error) {
          toast.error(data.error);
        }
        if (data.success) {
          toast.success(data.success.message);
          toggleCreating();
          form.reset();
        }
      });
    });
  };

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    setIsReordering(true);
    startTransition(() => {
      reorderChapters(courseId, updateData)
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
          }
          if (data.success) {
            toast.success(data.success.message);
          }
        })
        .finally(() => setIsReordering(false));
    });
  };

  const onEdit = (id: string) => {
    router.push(
      `/dashboard/channels/${channelId}/courses/${courseId}/chapters/${id}`
    );
  };

  return (
    <div className="relative bg-accent rounded-md p-4">
      {isReordering && (
        <div className="absolute z-10 h-full w-full inset-0 rounded-md flex items-center justify-center bg-background/80">
          <Loader2 className="size-6 animate-spin" />
        </div>
      )}

      <div className="text-base flex items-center justify-between gap-4 px-0.5">
        <p className="text-base">Course chapters</p>

        <div className="flex items-center justify-center gap-4">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            disabled={isPending}
            className="bg-accent hover:bg-secondary h-8 transition-all"
            onClick={() => {
              toggleCreating();
              setTimeout(() => {
                form.setFocus("title");
              }, 20);
            }}
          >
            {isCreating ? (
              <>
                <X className="size-3 sm:mr-2" />
                <span className="hidden sm:flex">Cancel</span>
              </>
            ) : (
              <>
                <PlusCircle className="size-3 sm:mr-2" />
                <span className="hidden sm:flex">
                  Add <span className="hidden lg:flex ml-1">a chapter</span>
                </span>
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="mt-3 space-y-4">
        {isCreating && (
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl className="!mt-2.5">
                      <Input
                        placeholder="Enter the title of the chapter"
                        autoComplete="off"
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {isCreating && (
                <Button
                  size="sm"
                  className="h-8 w-24 mt-2.5 transition-all"
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="size-3 animate-spin" />
                    </>
                  ) : (
                    <>
                      <PlusCircle className="size-3 mr-2" />
                      <span>Add</span>
                    </>
                  )}
                </Button>
              )}
            </form>
          </Form>
        )}

        {chapters.length !== 0 ? (
          <ChaptersList data={chapters} onEdit={onEdit} onReorder={onReorder} />
        ) : (
          <p className="font-light text-sm py-2 bg-background/30 px-4 rounded-md font-mono opacity-75">
            No chapters
          </p>
        )}
        <p className="text-xs text-muted-foreground mt-4">
          Drag and drop to reorder the chapters
        </p>
      </div>
    </div>
  );
};
