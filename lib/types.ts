import { signInFormSchema, signUpFormSchema } from "@/lib/schemas";
import { z } from "zod";

export type SignUpFormValues = z.infer<typeof signUpFormSchema>;

export type SignInFormValues = z.infer<typeof signInFormSchema>;

export type CompositeImage = {
  id: number;
  createdAt: string;
  imageUrl: string;
};

export type Analysis = {
  id: number;
  createdAt: string;
  probabilities: number[];
  userId: number;
  ckdStagePrediction: number;
};
