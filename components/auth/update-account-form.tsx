"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";

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
import { FormAlert } from "@/components/form-alert";
import { Button } from "@/components/ui/button";
import { updateAccount } from "@/actions/auth/update-account";

export const UpdateAccountForm = () => {
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const form = useForm<UpdateAccountSchema>({
    resolver: zodResolver(UpdateAccountSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: UpdateAccountSchema) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      updateAccount(values)
        .then((data) => {
          if (data?.error) {
            setError(data.error);
          }
          if (data?.success) {
            setSuccess(data.success);
            // This is to update the current session
            update();
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
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

        {error && <FormAlert type="error" message={error} />}
        {success && <FormAlert type="success" message={success} />}

        <Button type="submit" className="w-full" disabled={isPending}>
          Update
        </Button>
      </form>
    </Form>
  );
};
