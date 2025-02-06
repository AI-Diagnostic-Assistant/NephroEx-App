import {
  analysisFormSchema,
  signInFormSchema,
  signUpFormSchema,
} from "@/lib/schemas";
import { z } from "zod";
import { Database as DatabaseGenerated } from "./generated-types";
import { MergeDeep } from "type-fest";

type Database = MergeDeep<
  DatabaseGenerated,
  {
    public: {
      Tables: {
        analysis: {
          Row: {
            roi_activity: number[][] | null;
          };
        };
        explanation: {
          Row: {
            shap_values_renogram: number[][];
          };
        };
      };
    };
  }
>;

// Utility to convert snake_case keys to camelCase
type CamelCase<S extends string> = S extends `${infer T}_${infer U}`
  ? `${T}${Capitalize<CamelCase<U>>}`
  : S;

// Convert object keys from snake_case to camelCase
type CamelCaseKeys<T> = {
  [K in keyof T as CamelCase<K & string>]: T[K];
};

// Automatically generate camelCase versions of Supabase tables
type CamelCaseTables = {
  [K in keyof Database["public"]["Tables"] as K]: CamelCaseKeys<
    Database["public"]["Tables"][K]["Row"]
  >;
};

export type SignUpFormValues = z.infer<typeof signUpFormSchema>;

export type SignInFormValues = z.infer<typeof signInFormSchema>;

export type AnalysisFormValues = z.infer<typeof analysisFormSchema>;

export type PatientReport = Patient & { report: Report[] };

export type Report = CamelCaseTables["report"] & {
  analyses: Analysis[];
};

export type Classification = CamelCaseTables["classification"] & {
  explanation: Explanation[];
};

export type Analysis = CamelCaseTables["analysis"] & {
  classification: Classification[];
};

export type Explanation = CamelCaseTables["explanation"];

export type Patient = CamelCaseTables["patient"];

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
