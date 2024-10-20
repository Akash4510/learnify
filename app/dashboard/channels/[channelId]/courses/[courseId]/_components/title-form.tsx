"use client";

import { useState, useTransition } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Pencil, Save, X } from "lucide-react";
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
import { editCourse } from "@/actions/course";

interface TitleFormProps {
  channelId: string;
  courseId: string;
  title: string;
}

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Course title is required",
  }),
});

type formSchema = z.infer<typeof formSchema>;

export const TitleForm = ({ channelId, courseId, title }: TitleFormProps) => {
  const [isPending, startTransition] = useTransition();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const form = useForm<formSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: title,
    },
  });

  const { handleSubmit, control } = form;

  const toggleEditing = () => {
    setIsEditing((value) => !value);
  };

  const onSubmit = async (values: formSchema) => {
    if (title === values.title) {
      toast.info("No modifications!");
      return;
    }

    startTransition(() => {
      editCourse({ channelId, courseId, values })
        .then((data) => {
          const { error, success } = data;

          if (success) {
            toast.success("Course title updated");
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
            name="title"
            render={({ field }) => (
              <FormItem>
                <div className="text-base flex items-center justify-between gap-4 px-0.5">
                  <FormLabel className="text-base">Course title</FormLabel>

                  <div className="flex items-center justify-center gap-4">
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      disabled={isPending}
                      className="bg-accent hover:bg-muted-foreground/20 h-8 transition-all"
                      onClick={() => {
                        toggleEditing();

                        if (isEditing) {
                          form.resetField("title");
                        }

                        setTimeout(() => {
                          form.setFocus("title");
                        }, 20);
                      }}
                    >
                      {isEditing ? (
                        <>
                          <X className="size-3 sm:mr-2" />
                          <span className="hidden sm:flex">Cancel</span>
                        </>
                      ) : (
                        <>
                          <Pencil className="size-3 sm:mr-2" />
                          <span className="hidden sm:flex">
                            Edit
                            <span className="hidden lg:flex ml-1">title</span>
                          </span>
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                <FormControl className="!mt-2.5">
                  {isEditing ? (
                    <Input
                      placeholder="e.g. Advanced Web Development"
                      autoComplete="off"
                      disabled={isPending}
                      {...field}
                    />
                  ) : (
                    <p className="font-medium py-2 bg-background/30 px-4 rounded-md">
                      {field.value}
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
