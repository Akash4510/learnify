"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, PlusCircle, X } from "lucide-react";
import Image from "next/image";

import { CreateChannelSchema } from "@/schemas/channel";
import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import { createChannel } from "@/actions/channel/create-channel";
import { useCurrentUser } from "@/hooks/use-current-user";
import { FileUpload } from "@/components/file-upload";

export const CreateChannelForm = () => {
  const router = useRouter();

  const form = useForm<CreateChannelSchema>({
    resolver: zodResolver(CreateChannelSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const { handleSubmit } = form;

  const [isPending, startTransition] = useTransition();

  const onSubmit = async (values: CreateChannelSchema) => {
    console.log(values);

    startTransition(() => {
      createChannel(values)
        .then((data) => {
          if (data?.error) {
            toast.error(data.error);
          }
          if (data?.success) {
            toast.success(data.success.message);
            form.reset();
            router.push(`/dashboard/channels/${data.success.channel.id}`);
          }
        })
        .catch(() => toast.error("Something went wrong"));
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-accent border rounded-md p-5 space-y-6 backdrop-blur-xl">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Channel Name</FormLabel>
                  <FormControl className="!mt-2.5">
                    <Input
                      placeholder="Enter a channel name"
                      autoComplete="off"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    You cannot change your channel name after
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">
                    Channel Description
                  </FormLabel>
                  <FormControl className="!mt-2.5">
                    <Textarea
                      disabled={isPending}
                      rows={5}
                      placeholder="Enter your channel description..."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Describe your channel in a few words
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="bg-accent border rounded-md p-5 space-y-6 backdrop-blur-xl">
            <FormField
              control={form.control}
              name="logo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Channel logo</FormLabel>
                  <FormDescription className="!mt-1">
                    Choose a logo for your channel
                  </FormDescription>
                  <FormControl className="!mt-4">
                    <div className="w-full h-64 flex items-center justify-center">
                      {field.value ? (
                        <div className="relative h-28 w-28">
                          <Image
                            src={field.value}
                            alt="Server image"
                            fill
                            className="rounded-full object-cover"
                          />

                          <button
                            onClick={() => field.onChange("")}
                            disabled={isPending}
                            className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
                            type="button"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <FileUpload
                          endpoint="channelLogo"
                          onChange={field.onChange}
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="bg-accent border rounded-md p-5 space-y-6 backdrop-blur-xl col-span-1 md:col-span-2 lg:col-span-1">
            <FormField
              control={form.control}
              name="coverImg"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">
                    Channel cover image
                  </FormLabel>
                  <FormDescription className="!mt-1">
                    Choose a cover image for your channel
                  </FormDescription>
                  <FormControl className="!mt-4">
                    <div className="w-full h-64 flex items-center justify-center">
                      {field.value ? (
                        <div className="relative h-full w-full rounded-md">
                          <Image
                            src={field.value}
                            alt="Server image"
                            fill
                            className="rounded-md object-cover"
                          />

                          <button
                            onClick={() => field.onChange("")}
                            disabled={isPending}
                            className="bg-rose-500 text-white p-1 rounded-full absolute -top-1 -right-1 shadow-sm"
                            type="button"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <FileUpload
                          endpoint="channelCoverImg"
                          onChange={field.onChange}
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 pt-4">
          <Button disabled={isPending} className="w-full sm:w-52">
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <PlusCircle className="h-4 w-4 mr-2" />
                <span>Create channel</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
