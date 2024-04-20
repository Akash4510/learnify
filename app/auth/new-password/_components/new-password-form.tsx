"use client";

import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import { WrapperCard } from "@/components/auth/wrapper-card";
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
import { AlertMessage } from "@/components/ui/alert-message";
import { setNewPassword } from "@/actions/auth";

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

  const { handleSubmit, control } = form;

  const onSubmit = async (values: NewPasswordSchema) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      setNewPassword(values, token)
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
              control={control}
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

          <div className="space-y-1">
            {error && <AlertMessage variant="error" message={error} />}
            {success && <AlertMessage variant="success" message={success} />}
          </div>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <span>Reset password</span>
            )}
          </Button>
        </form>
      </Form>
    </WrapperCard>
  );
};
