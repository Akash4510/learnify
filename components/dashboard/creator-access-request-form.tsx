"use client";

import { useState, useTransition } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Pencil, PlusCircle, X } from "lucide-react";
import { toast } from "sonner";
import { CreatorAccessRequest } from "@prisma/client";

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
import { Textarea } from "@/components/ui/textarea";
import { requestCreatorAccess } from "@/actions/creator/request-creator-access";
import { Heading } from "@/components/heading";
import { cn } from "@/lib/utils";
import { editCreatorAccess } from "@/actions/creator/edit-creator-access-request";

const formSchema = z.object({
  topic: z.string().min(1, {
    message: "Topic is required!",
  }),
  proposal: z.string().min(1, {
    message: "Proposal is required!",
  }),
});

interface CreatorAccessRequestFormProps {
  initialData?: CreatorAccessRequest;
}

export const CreatorAccessRequestForm = ({
  initialData,
}: CreatorAccessRequestFormProps) => {
  const [isPending, startTransition] = useTransition();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: initialData?.topic || "",
      proposal: initialData?.proposal || "",
    },
  });

  const { handleSubmit, control } = form;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    startTransition(() => {
      if (initialData) {
        editCreatorAccess({ requestId: initialData.id, ...values })
          .then((data) => {
            const { error, success } = data;
            if (success) {
              toast.success(success.message);
            }
            if (error) {
              toast.error(error.message);
            }
          })
          .catch(() => {
            toast.error("Something went wrong!");
          })
          .finally(() => {
            setIsEditing(false);
          });
      } else {
        requestCreatorAccess({ ...values })
          .then((data) => {
            const { error, success } = data;
            if (success) {
              toast.success(success.message);
            }
            if (error) {
              toast.error(error.message);
            }
          })
          .catch(() => {
            toast.error("Something went wrong!");
          });
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 ">
          {initialData ? (
            <>
              <Heading
                title="Pending Creator Access Proposal"
                subtitle="This is your existing creator access proposal. You can edit this proposal until it get's approved"
              />

              <Button
                type="button"
                variant="secondary"
                disabled={isPending}
                className="bg-accent hover:bg-muted-foreground/20 w-full md:w-24 transition-all"
                onClick={() => {
                  if (isEditing) {
                    form.reset();
                  }

                  setIsEditing((value) => !value);
                }}
              >
                {isEditing ? (
                  <>
                    <X className="size-3 mr-2" />
                    <span>Cancel</span>
                  </>
                ) : (
                  <>
                    <Pencil className="size-3 mr-2" />
                    <span>Edit</span>
                  </>
                )}
              </Button>
            </>
          ) : (
            <Heading
              title="Request Creator Access"
              subtitle="Request to become a creator so that you can upload courses and start teaching"
            />
          )}
        </div>
        <div className="bg-accent border rounded-md p-4 space-y-6">
          <FormField
            control={control}
            name="topic"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">
                  What do you want to teach?
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Designing / Web Development / Finance ..."
                    autoComplete="off"
                    disabled={isPending || (initialData && !isEditing)}
                    className="disabled:cursor-text"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Mention the topics or domains you want to teach. You can add
                  multiple topics or domains
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="proposal"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">
                  Why do you want to be a creator?
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="I want to become a creator because..."
                    autoComplete="off"
                    rows={5}
                    disabled={isPending || (initialData && !isEditing)}
                    className="disabled:cursor-text"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Write a proposal on &apos;Why do you want to be a
                  creator?&apos;
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-row-reverse items-center justify-end gap-4">
          <Button
            disabled={isPending || (initialData && !isEditing)}
            className={cn("w-full sm:w-40", initialData && "sm:w-32")}
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                {!initialData && <PlusCircle className="size-4 mr-2" />}
                <span>{initialData ? "Update" : "Request Access"}</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
