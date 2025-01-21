"use server";

import { createClient, isLoggedIn } from "@/utils/supabase/server";
import camelcaseKeys from "camelcase-keys";
import { redirect } from "next/navigation";
import { isAnalysis } from "@/lib/types";

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

export async function getAllPatients() {
  if (!(await isLoggedIn())) redirect("/sign-in");

  const supabase = await createClient();

  const { data, error } = await supabase.from("patient").select();

  let formattedData = data ? camelcaseKeys(data, { deep: true }) : null;

  return { data: formattedData, error };
}

export async function getSignedUrls(dicomStorageId: string[]) {
  if (!(await isLoggedIn())) redirect("/sign-in");
  const supabase = await createClient();

  const { data, error } = await supabase.storage
    .from("grouped-dicom-frames")
    .createSignedUrls(dicomStorageId, 3600);

  if (error) {
    throw new Error(`Failed to fetch signed urls: ${error.message}`);
  }

  return data;
}

export async function getSignedUrl(fileName: string, bucketName: string) {
  const supabase = await createClient();

  const { data } =  supabase.storage
      .from(bucketName)
      .getPublicUrl(fileName);

  return data;
}

export async function createPatient(name: string, email: string | null) {
  if (!(await isLoggedIn())) redirect("/sign-in");

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("patient")
    .insert({ name: name, email: email })
    .select("id")
    .single();

  let formattedData = data ? camelcaseKeys(data, { deep: true }) : null;

  return { data: formattedData, error };
}
