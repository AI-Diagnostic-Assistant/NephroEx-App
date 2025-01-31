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

type AnalysisCategoryType = "renogram" | "image";

export type PatientReport = Patient & { report: Report[] };

export type Report = {
  id: number;
  createdAt: string;
  userId: string | null;
  dicomStorageIds: string[];
  patientDicomStorageId: string;
  roiContourObjectPath: string;
  analyses: Analysis[];
};

export type Analysis = {
  id: number;
  createdAt: string;
  category: AnalysisCategoryType;
  roiActivity: number[][];
  classification: Classification[];
  reportId: number;
};

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
  createdAt: string;
  type: XAIType;
  technique: XAITechnique;
  description: string;
  shapValuesCurve: number[];
  heatmapObjectPath: string | null;
  classificationId: number;
};

export type Patient = {
  id: number;
  createdAt: string;
  name: string;
  email: string;
  clinicianId: number;
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

export function isReport(obj: any): obj is Report {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.id === "number" &&
    typeof obj.createdAt === "string" &&
    (typeof obj.userId === "string" || obj.userId === null)
  );
}
