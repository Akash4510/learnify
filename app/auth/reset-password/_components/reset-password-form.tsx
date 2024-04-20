"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import { WrapperCard } from "@/components/auth/wrapper-card";
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
import { AlertMessage } from "@/components/ui/alert-message";
import { resetPassword } from "@/actions/auth";

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

  const { handleSubmit, control } = form;

  const onSubmit = async (values: ResetPasswordSchema) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      resetPassword(values)
        .then((data) => {
          const { error, success } = data;

          if (success) {
            setSuccess(success.message);
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
    <WrapperCard
      title="Reset your password"
      subtitle="Create a new password for your account"
      switchFormLabel="Back to login"
      switchFormHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <FormField
              control={control}
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

            <div className="space-y-1">
              {error && <AlertMessage variant="error" message={error} />}
              {success && <AlertMessage variant="success" message={success} />}
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <span>Send reset email</span>
            )}
          </Button>
        </form>
      </Form>
    </WrapperCard>
  );
};
