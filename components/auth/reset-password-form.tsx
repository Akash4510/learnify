"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { WrapperCard } from "./wrapper-card";
import { ResetPasswordSchema } from "@/schemas/auth";
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
import { FormAlert } from "@/components/form-alert";
import { resetPassword } from "@/actions/auth/reset-passwrod";

export const ResetPasswordForm = () => {
  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: ResetPasswordSchema) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      resetPassword(values)
        .then((data) => {
          if (data?.error) {
            setError(data.error);
          }
          if (data?.success) {
            setSuccess(data.success);
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  };

  return (
    <WrapperCard
      title="Reset your password"
      subtitle="Create a new password for your account"
      switchFormLabel="Back to login"
      switchFormHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
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
            Send reset email
          </Button>
        </form>
      </Form>
    </WrapperCard>
  );
};
