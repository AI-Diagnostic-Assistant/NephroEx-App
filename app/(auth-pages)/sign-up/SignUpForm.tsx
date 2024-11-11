"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signUpFormSchema } from "@/lib/schemas";
import { SignUpFormValues } from "@/lib/types";
import { signUpAction } from "@/app/actions";
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

export default function SignUpForm() {
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignUpFormValues) => {
    const error = await signUpAction(data);
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
        <h1 className="text-2xl font-medium">Sign up</h1>
        <p className="text-sm text text-foreground">
          Already have an account?{" "}
          <Link className="text-primary font-medium underline" href="/sign-in">
            Sign in
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your password"
                      type="password"
                      {...field}
                    ></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
        <SubmitButton pending={isSubmitting} pendingText="Signing up...">
          Sign up
        </SubmitButton>
      </form>
    </Form>
  );
}
