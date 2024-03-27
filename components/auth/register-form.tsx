"use client";

import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { WrapperCard } from "./wrapper-card";
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
import { FormAlert } from "@/components/form-alert";

export const RegisterForm = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: RegisterSchema) => {
    setError("");
    setSuccess("");

    try {
      const res = await axios.post("/api/auth/register", {
        ...values,
      });

      setSuccess(res.data.message);
    } catch (error: any) {
      console.log(error.response?.data.message);

      if (axios.isAxiosError(error)) {
        setError(error.response?.data.message);
      } else {
        setError(error.message);
      }
      console.log(error);
    }
  };

  const { isSubmitting } = form.formState;

  return (
    <WrapperCard
      title="Sign up"
      subtitle="Create a new account"
      switchFormLabel="Already have an account? Login"
      switchFormHref="/auth/login"
      showSocials
    >
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
                    <Input {...field} type="text" disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" disabled={isSubmitting} />
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
                    <Input {...field} type="password" disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {error && <FormAlert type="error" message={error} />}
          {success && <FormAlert type="success" message={success} />}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            Create account
          </Button>
        </form>
      </Form>
    </WrapperCard>
  );
};
