"use server";

import { createClient, isLoggedIn } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import camelcaseKeys from "camelcase-keys";
import { AnalysisFormValues, isAnalysis } from "@/lib/types";
import { createPatient } from "@/lib/data-access/patient";
import { classifyImages } from "@/lib/data-access/backend-service";

export async function createAnalysis(data: AnalysisFormValues, token: string) {
  if (!(await isLoggedIn())) redirect("/sign-in");

  const formData = new FormData();
  formData.append("file", data.dicomImages);

  if (data.patientId) {
    formData.append("patientId", data.patientId);
  } else if (data.patientName) {
    const { data: patientData, error } = await createPatient(
      data.patientName,
      data.email ?? null,
    );
    if (error || !patientData) {
      throw new Error(
        "An error occurred while creating the patient: " + error?.message,
      );
    }
    formData.append("patientId", patientData.id);
  } else {
    throw new Error(
      "Patient ID or name was not provided. Please try again and select a patient or create one",
    );
  }

  const { data: classifyData, error } = await classifyImages(formData, token);

  if (error || !classifyData) {
    throw new Error("An error occurred during classification");
  }
  return { id: classifyData.id };
}

export async function getPatientsWithAnalyses() {
  if (!(await isLoggedIn())) redirect("/sign-in");

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("patient")
    .select(
      `
        *,
        analysis (*)
    `,
    )
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch data: ${error.message}`);
  }

  data?.map((patient) =>
    patient.analysis.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    ),
  );

  return data ? camelcaseKeys(data, { deep: true }) : [];
}

export async function getAnalysisData(id: string) {
  if (!(await isLoggedIn())) redirect("/sign-in");
  const supabase = await createClient();

  //const { data, error } = await supabase
  //.from("analysis")
  //.select()
  //.eq("id", id)
  //.single();

  const { data, error } = await supabase
    .from("analysis")
    .select(
      `
        *,
        classification (
            *,
            explanation (*)
        )
    `,
    )
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching data:", error);
  }

  let formattedData = data ? camelcaseKeys(data, { deep: true }) : null;

  if (formattedData && !isAnalysis(formattedData)) {
    throw new Error("Data does not match the Analysis type");
  }

  return { data: formattedData, error };
}
