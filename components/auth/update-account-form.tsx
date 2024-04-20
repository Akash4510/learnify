"use client";

import { useState, useTransition } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import { UpdateAccountSchema } from "@/schemas/auth";
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
import { AlertMessage } from "@/components/ui/alert-message";
import { updateAccount } from "@/actions/auth";

export const UpdateAccountForm = () => {
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const form = useForm<UpdateAccountSchema>({
    resolver: zodResolver(UpdateAccountSchema),
    defaultValues: {
      name: "",
    },
  });

  const { handleSubmit, control } = form;

  const onSubmit = async (values: UpdateAccountSchema) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      updateAccount(values)
        .then((data) => {
          const { error, success } = data;

          if (success) {
            setSuccess(success.message);
            form.reset();

            // This is to update the current session
            update();
          }
          if (error) {
            setError(error.message);
          }
        })
        .catch(() => {
          setError("Something went wrong!");
        });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} type="text" disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-1">
          {error && <AlertMessage variant="error" message={error} />}
          {success && <AlertMessage variant="success" message={success} />}
        </div>

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <span>Update</span>
          )}
        </Button>
      </form>
    </Form>
  );
};
