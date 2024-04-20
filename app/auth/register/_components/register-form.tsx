"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import { WrapperCard } from "@/components/auth/wrapper-card";
import { RegisterSchema } from "@/schemas/auth";
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
import { register } from "@/actions/auth";

export const RegisterForm = () => {
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
  } = form;

  const onSubmit = async (values: RegisterSchema) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      register(values)
        .then((data) => {
          const { error, success } = data;

          if (success) {
            setSuccess(success.message);
            form.reset();
          }
          if (error) {
            setError(error.message);
          }
        })
        .catch((err) => {
          console.log(err);
          setError("Something went wrong!");
        });
    });
  };

  return (
    <WrapperCard
      title="Sign up"
      subtitle="Create a new account"
      switchFormLabel="Already have an account? Login"
      switchFormHref="/auth/login"
      showSocials
    >
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
                    <Input
                      {...field}
                      type="text"
                      disabled={isPending}
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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

            <div className="flex items-center justify-between gap-2">
              <FormField
                control={control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" disabled={isPending} />
                    </FormControl>
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
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-1">
              {formErrors.password?.message && (
                <AlertMessage
                  variant="error"
                  message={formErrors.password.message}
                />
              )}
              {formErrors.confirmPassword?.message && (
                <AlertMessage
                  variant="error"
                  message={formErrors.confirmPassword.message}
                />
              )}
            </div>

            <div className="space-y-1 pt-2">
              {error && <AlertMessage variant="error" message={error} />}
              {success && <AlertMessage variant="success" message={success} />}
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <span>Create account</span>
            )}
          </Button>
        </form>
      </Form>
    </WrapperCard>
  );
};
