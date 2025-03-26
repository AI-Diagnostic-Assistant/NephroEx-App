import { z } from "zod";

export const signUpFormSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .refine(
      (password) => {
        return password.length > 6;
      },
      { message: "Password must be at least 6 characters long" },
    ),
});

export const signInFormSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const analysisFormSchema = z
  .object({
    dicomImages: z
      .instanceof(File, { message: "You must select a file" })
      .refine((file) => file.type === "application/dicom", {
        message: "You must select a DICOM file",
      }),
    patientId: z.string().optional(),
    patientName: z.string().optional(),
    email: z.preprocess(
      (val) => (val === "" ? undefined : val),
      z.string().email("Invalid email format").optional(),
    ),
    diuretic: z
      .number({ message: "Must be a number" })
      .min(0, "Must be a positive number")
      .max(30, "Must be less than 30"),
  })
  .superRefine((data, ctx) => {
    if (data.patientId && (data.patientName || data.email)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["patientId"],
        message: "Cannot provide both Patient ID and Name/Email.",
      });
    }

    if (!data.patientId && !data.patientName) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["patientName"],
        message: "You must provide either Patient ID or Patient Name.",
      });
    }
  });
