import {
  analysisFormSchema,
  signInFormSchema,
  signUpFormSchema,
} from "@/lib/schemas";
import { z } from "zod";

export type SignUpFormValues = z.infer<typeof signUpFormSchema>;

export type SignInFormValues = z.infer<typeof signInFormSchema>;

export type AnalysisFormValues = z.infer<typeof analysisFormSchema>;

type XAITechnique = "LIME" | "SHAP" | "GradCAM" | "Textual";

type XAIType = "Visual" | "Textual";

export type Classification = {
  id: string;
  type: string;
  confidence: number[];
  createdAt: string;
  prediction: string;
  analysisId: number;
  explanation: Explanation[];
};

export type Explanation = {
  id: number;
  type: XAIType;
  technique: XAITechnique;
  roiActivity: number[][];
  description: string;
  classificationId: number;
};

export type Analysis = {
  id: number;
  createdAt: string;
  ckdStagePrediction: number;
  userId: string | null;
  probabilities: number[];
  dicomStorageIds: string[];
  patientDicomStorageId: string;
  classification: Classification[];
};

export type AnalysisWithExplanation = Analysis & {
  explanation: Explanation[];
};

export function isAnalysis(obj: any): obj is Analysis {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.id === "number" &&
    typeof obj.createdAt === "string" &&
    Array.isArray(obj.probabilities) &&
    obj.probabilities.every((prob: any) => typeof prob === "number") &&
    (typeof obj.userId === "string" || obj.userId === null) &&
    typeof obj.ckdStagePrediction === "number"
  );
}
