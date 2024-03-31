"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Loader2, Pencil, PlusCircle } from "lucide-react";
import { toast } from "sonner";
import { Course } from "@prisma/client";

import { EditCourseSchema } from "@/schemas/course";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { editCourse } from "@/actions/course/edit-course";

interface CourseTitleFormProps {
  initialData: Course;
}

export const EditCourseForm = ({ initialData }: CourseTitleFormProps) => {
  const form = useForm<EditCourseSchema>({
    resolver: zodResolver(EditCourseSchema),
    defaultValues: {
      title: initialData.title,
      description: initialData.description || undefined,
      thumbnail: initialData.thumbnail || undefined,
    },
  });

  const { handleSubmit, setFocus } = form;

  const [isPending, startTransition] = useTransition();

  const [isTitleEditing, setIsTitleEditing] = useState<boolean>(false);

  const onSubmit = async (values: EditCourseSchema) => {
    startTransition(() => {
      const courseId = initialData.id;

      editCourse(courseId, values).then((data) => {
        if (data.error) {
          toast.error(data.error);
        }
        if (data.success) {
          toast.success(data.success.message);
        }
      });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-accent rounded-md p-4">
          <FormField
            control={form.control}
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
                      className="bg-accent hover:bg-secondary h-8"
                      onClick={() => {
                        setIsTitleEditing((value) => !value);
                        setTimeout(() => {
                          setFocus("title");
                        }, 50);
                      }}
                    >
                      {isTitleEditing ? (
                        <span>Cancel</span>
                      ) : (
                        <>
                          <Pencil className="size-3 mr-2" />
                          <span>Edit</span>
                        </>
                      )}
                    </Button>

                    {isTitleEditing && (
                      <Button size="sm" className="h-8">
                        Save
                      </Button>
                    )}
                  </div>
                </div>
                <FormControl className="!mt-2.5">
                  {isTitleEditing ? (
                    <Input
                      placeholder="e.g. Advanced Web Development"
                      autoComplete="off"
                      disabled={isPending}
                      {...field}
                    />
                  ) : (
                    <p className="text-xl font-light py-1.5">{field.value}</p>
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};
