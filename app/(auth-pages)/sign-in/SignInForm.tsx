"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signInFormSchema } from "@/lib/schemas";
import { SignInFormValues } from "@/lib/types";
import { signInAction } from "@/app/actions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/submit-button";
import Link from "next/link";

export default function SignInForm() {
  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInFormValues) => {
    const error = await signInAction(data);
    if (error) {
      console.error(error);
    }
  };

  const { isSubmitting } = form.formState;

  return (
    <Form {...form}>
      <form
        className="flex flex-col my-2 min-w-64 max-w-64 mx-auto"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <h1 className="text-2xl font-medium">Sign in</h1>
        <p className="text-sm text-foreground">
          Don't have an account?{" "}
          <Link
            className="text-foreground font-medium underline"
            href="/sign-up"
          >
            Sign up
          </Link>
        </p>
        <div className="flex flex-col gap-5 mt-8 mb-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="you@example.com"
                      type="email"
                      required
                      {...field}
                    ></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => {
              return (
                <FormItem>
                  <div className="flex justify-between">
                    <FormLabel>Password</FormLabel>
                    <Link
                      className="text-xs text-foreground underline"
                      href="/forgot-password"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <FormControl>
                    <Input
                      placeholder="Your password"
                      type="password"
                      required
                      {...field}
                    ></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
        <SubmitButton pending={isSubmitting} pendingText="Signing in...">
          Sign in
        </SubmitButton>
      </form>
    </Form>
  );
}
