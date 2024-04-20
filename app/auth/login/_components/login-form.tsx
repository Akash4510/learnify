"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import { WrapperCard } from "@/components/auth/wrapper-card";
import { LoginSchema } from "@/schemas/auth";
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
import { login } from "@/actions/auth";

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "This email is already in use"
      : "";

  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState(urlError);
  const [success, setSuccess] = useState("");

  const form = useForm<LoginSchema>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { handleSubmit, control } = form;

  const onSubmit = async (values: LoginSchema) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(values, callbackUrl)
        .then((data) => {
          const { error, success } = data;

          if (success) {
            setSuccess(success.message);
            form.reset();
          }
          if (error) {
            console.log(error);
            setError(error.message);
          }
        })
        .catch((err) => {
          console.log(err);
          // The login action handles all the erros properly so we don't need to handle the errors here.
          // This will only be triggered when there is redirect error, thrown by NextJs which is okay, and is required to redirect.
        });
    });
  };

  return (
    <WrapperCard
      title="Login"
      subtitle="Welcome back to Learnify"
      switchFormLabel="Don't have an account? Sign Up"
      switchFormHref="/auth/register"
      showSocials
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

            <div className="!mt-1.5">
              <Link
                href="/auth/reset-password"
                className="text-sm text-primary hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <div className="space-y-1">
              {error && <AlertMessage variant="error" message={error} />}
              {success && <AlertMessage variant="success" message={success} />}
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? <Loader2 className="animate-spin h-4 w-4" /> : "Login"}
          </Button>
        </form>
      </Form>
    </WrapperCard>
  );
};
