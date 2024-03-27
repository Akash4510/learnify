"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { WrapperCard } from "./wrapper-card";
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
import { FormAlert } from "@/components/form-alert";
import { login } from "@/actions/auth/login";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

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

  const onSubmit = async (values: LoginSchema) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(values, callbackUrl)
        .then((data) => {
          if (data?.error) {
            toast.error(data.error);
          }
          if (data?.success) {
            toast.success(data.success);
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  };

  return (
    <WrapperCard
      title="Login"
      subtitle="Welcome back to trade master"
      switchFormLabel="Don't have an account? Sign Up"
      switchFormHref="/auth/register"
      showSocials
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
          </div>

          <div className="!mt-2">
            <Link
              href="/auth/reset-password"
              className="text-sm text-primary hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? <Loader2 className="animate-spin h-4 w-4" /> : "Login"}
          </Button>
        </form>
      </Form>
    </WrapperCard>
  );
};
