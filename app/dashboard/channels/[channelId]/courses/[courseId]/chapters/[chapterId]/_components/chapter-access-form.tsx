"use client";

import {
  // useEffect,
  useTransition,
} from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { editChapter } from "@/actions/course/chapter";
import { Switch } from "@/components/ui/switch";

interface ChapterAccessFormProps {
  channelId: string;
  courseId: string;
  chapterId: string;
  isFree?: boolean;
}

const formSchema = z.object({
  isFree: z.boolean().default(false),
});

type formSchema = z.infer<typeof formSchema>;

export const ChapterAccessForm = ({
  channelId,
  courseId,
  chapterId,
  isFree,
}: ChapterAccessFormProps) => {
  const [isPending, startTransition] = useTransition();
  // const [isEditing, setIsEditing] = useState<boolean>(false);

  const form = useForm<formSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isFree: !!isFree,
    },
  });

  const { handleSubmit, control } = form;

  // const toggleEditing = () => {
  //   setIsEditing((value) => !value);
  // };

  const onSubmit = async (values: formSchema) => {
    startTransition(() => {
      editChapter({ channelId, courseId, chapterId, values })
        .then((data) => {
          const { error, success } = data;
          if (success) {
            toast.success("Chapter access settings updated");
            // toggleEditing();
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
            name="isFree"
            render={({ field }) => (
              <FormItem>
                {/* <div className="text-base flex items-center justify-between gap-4 px-0.5">
                  <FormLabel className="text-base">Chapter access</FormLabel>

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
                          form.setFocus("isFree");
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
                            <span className="hidden lg:flex ml-1">access</span>
                          </span>
                        </>
                      )}
                    </Button>
                  </div>
                </div> */}

                <FormControl>
                  <div className="flex items-center justify-between">
                    <p>Is this course free?</p>
                    <Switch
                      checked={field.value}
                      onCheckedChange={(value) => {
                        field.onChange(value);
                        form.setValue("isFree", value);
                        onSubmit({ isFree: value });
                      }}
                      disabled={isPending}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* {isEditing && (
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
          )} */}
        </div>
      </form>
    </Form>
  );
};
