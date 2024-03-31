"use client";

import { useState, useTransition } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  IndianRupee,
  Loader2,
  Pencil,
  PlusCircle,
  Save,
  X,
} from "lucide-react";
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
import { editCourse } from "@/actions/course/edit-course";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/utils";

interface PriceFormProps {
  courseId: string;
  price: number | null;
}

const formSchema = z.object({
  price: z.coerce.number(),
});

type formSchema = z.infer<typeof formSchema>;

export const PriceForm = ({ courseId, price }: PriceFormProps) => {
  const form = useForm<formSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: price || undefined,
    },
  });

  const { handleSubmit, setFocus } = form;

  const [isPending, startTransition] = useTransition();

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const toggleEditing = () => {
    setIsEditing((value) => !value);
  };

  const onSubmit = async (values: formSchema) => {
    if (price === values.price) {
      toast.info("No modifications!");
      return;
    }

    startTransition(() => {
      editCourse(courseId, values).then((data) => {
        if (data.error) {
          toast.error(data.error);
        }
        if (data.success) {
          toast.success("Price updated successfully");
          toggleEditing();
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
            name="price"
            render={({ field }) => (
              <FormItem>
                <div className="text-base flex items-center justify-between gap-4 px-0.5">
                  <FormLabel className="text-base">Course Price</FormLabel>

                  <div className="flex items-center justify-center gap-4">
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      disabled={isPending}
                      className="bg-accent hover:bg-secondary h-8 transition-all"
                      onClick={() => {
                        toggleEditing();
                        setTimeout(() => {
                          setFocus("price");
                        }, 20);
                      }}
                    >
                      {isEditing ? (
                        <>
                          <X className="size-3 sm:mr-2" />
                          <span className="hidden sm:flex">Cancel</span>
                        </>
                      ) : price ? (
                        <>
                          <Pencil className="size-3 sm:mr-2" />
                          <span className="hidden sm:flex">
                            Edit
                            <span className="hidden lg:flex ml-1">price</span>
                          </span>
                        </>
                      ) : (
                        <>
                          <IndianRupee className="size-3 sm:mr-2" />
                          <span className="hidden sm:flex">
                            Set
                            <span className="hidden lg:flex ml-1">price</span>
                          </span>
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                <FormControl className="!mt-2.5">
                  {isEditing ? (
                    <Input
                      placeholder="Set a price for your course"
                      autoComplete="off"
                      disabled={isPending}
                      {...field}
                    />
                  ) : field.value ? (
                    <p className="font-medium text-sm py-2 bg-background/10 px-4 rounded-md">
                      {formatPrice(field.value)}
                    </p>
                  ) : (
                    <p className="font-light text-sm py-2 bg-orange-500/10 text-orange-500 px-4 rounded-md font-mono opacity-75">
                      No price set
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
