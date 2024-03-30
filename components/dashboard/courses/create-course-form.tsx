"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Loader2, PlusCircle } from "lucide-react";
import { toast } from "sonner";

import { CreateCourseSchema } from "@/schemas/course";
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
import { createCourse } from "@/actions/course/create-course";

interface CreateCourseFormProps {
  channelId: string;
}

export const CreateCourseForm = ({ channelId }: CreateCourseFormProps) => {
  const router = useRouter();

  const form = useForm<CreateCourseSchema>({
    resolver: zodResolver(CreateCourseSchema),
    defaultValues: {
      title: "",
    },
  });

  const { handleSubmit } = form;

  const [isPending, startTransition] = useTransition();

  const onSubmit = async (values: CreateCourseSchema) => {
    startTransition(() => {
      createCourse(channelId, values).then((data) => {
        if (data.error) {
          toast.error(data.error);
        }
        if (data.success) {
          toast.success(data.success.message);
          const courseId = data.success.course.id;

          router.push(`/dashboard/channels/${channelId}/courses/${courseId}`);
        }
      });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-accent border rounded-md p-4 max-w-[36rem]">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Course Title</FormLabel>
                <FormControl className="!mt-2.5">
                  <Input
                    placeholder="Enter the title of your course"
                    autoComplete="off"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  What would you like to name your course? Don&apos;t worry, you
                  can change this later
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-row-reverse items-center justify-end gap-4">
          <Button disabled={isPending} className="w-full sm:w-40">
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <PlusCircle className="h-4 w-4 mr-2" />
                <span>Create course</span>
              </>
            )}
          </Button>

          <Button
            variant="accent"
            disabled={isPending}
            className="w-full sm:w-32"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
};
