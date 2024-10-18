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
import { Combobox } from "@/components/ui/combobox";
import { editCourse } from "@/actions/course";

interface CategoryFormProps {
  channelId: string;
  courseId: string;
  categoryId: string | null;
  options: {
    label: string;
    value: string;
  }[];
}

const formSchema = z.object({
  categoryId: z.string().optional(),
});

type formSchema = z.infer<typeof formSchema>;

export const CategoryForm = ({
  channelId,
  courseId,
  categoryId,
  options,
}: CategoryFormProps) => {
  const [isPending, startTransition] = useTransition();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const form = useForm<formSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: categoryId || undefined,
    },
  });

  const { handleSubmit, control } = form;

  const toggleEditing = () => {
    setIsEditing((value) => !value);
  };

  const onSubmit = async (values: formSchema) => {
    if (categoryId === values.categoryId) {
      toast.info("No modification");
      toggleEditing();
      return;
    }

    startTransition(() => {
      // Have to add this check because unselecting a category
      // will set the value to be an empty string, which will
      // throw an error in the server action as the value of the
      // categoryId must be an Object Id or undefined
      if (values.categoryId === "") {
        values.categoryId = undefined;
      }

      editCourse(channelId, courseId, values)
        .then((data) => {
          const { error, success } = data;

          if (success) {
            values.categoryId
              ? toast.success("Category updated")
              : toast.warning("Category cannot be empty");

            !values.categoryId && form.reset();
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

  const selectedOption = options.find((option) => option.value === categoryId);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-accent rounded-md p-4">
          <FormField
            control={control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <div className="text-base flex items-center justify-between gap-4 px-0.5">
                  <FormLabel className="text-base">Course cateogry</FormLabel>

                  <div className="flex items-center justify-center gap-4">
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      disabled={isPending}
                      className="bg-accent hover:bg-muted-foreground/20 h-8 transition-all"
                      onClick={() => {
                        toggleEditing();
                      }}
                    >
                      {isEditing ? (
                        <>
                          <X className="size-3 sm:mr-2" />
                          <span className="hidden sm:flex">Cancel</span>
                        </>
                      ) : categoryId ? (
                        <>
                          <Pencil className="size-3 sm:mr-2" />
                          <span className="hidden sm:flex">
                            Edit
                            <span className="hidden lg:flex ml-1">
                              category
                            </span>
                          </span>
                        </>
                      ) : (
                        <>
                          <PlusCircle className="size-3 sm:mr-2" />
                          <span className="hidden sm:flex">
                            Add
                            <span className="hidden lg:flex ml-1">
                              a category
                            </span>
                          </span>
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                <FormControl className="!mt-2.5">
                  {isEditing ? (
                    <Combobox label="category" options={options} {...field} />
                  ) : selectedOption ? (
                    <p className="font-medium text-sm py-2 bg-background/10 px-4 rounded-md">
                      {selectedOption.label}
                    </p>
                  ) : (
                    <p className="font-light text-sm py-2 bg-background/30 px-4 rounded-md font-mono opacity-75">
                      No category selected
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
