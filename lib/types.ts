import { signInFormSchema, signUpFormSchema } from "@/lib/schemas";
import { z } from "zod";

export type SignUpFormValues = z.infer<typeof signUpFormSchema>;

export type SignInFormValues = z.infer<typeof signInFormSchema>;

type XAITechnique = "LIME" | "SHAP" | "GradCAM" | "Textual";

type XAIType = "Visual" | "Textual";

export type CompositeImage = {
  id: number;
  createdAt: string;
  imageUrl: string;
};

export type Analysis = {
  id: number;
  createdAt: string;
  probabilities: number[];
  userId: string;
  ckdStagePrediction: number;
};

export type AnalysisWithExplanation = Analysis & {
  explanation: Explanation[];
};

export type Explanation = {
  id: number;
  createdAt: string;
  technique: XAITechnique;
  type: XAIType;
};
