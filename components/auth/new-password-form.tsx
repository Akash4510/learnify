"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { WrapperCard } from "./wrapper-card";
import { NewPasswordSchema } from "@/schemas/auth";
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
import { setNewPassword } from "@/actions/auth/new-password";

export const NewPasswordForm = () => {
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const form = useForm<NewPasswordSchema>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: NewPasswordSchema) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      setNewPassword(values, token)
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {error && <FormAlert type="error" message={error} />}
          {success && <FormAlert type="success" message={success} />}

          <Button type="submit" className="w-full" disabled={isPending}>
            Reset password
          </Button>
        </form>
      </Form>
    </WrapperCard>
  );
};
