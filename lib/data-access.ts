"use server";

import { createClient, isLoggedIn } from "@/utils/supabase/server";
import camelcaseKeys from "camelcase-keys";
import { redirect } from "next/navigation";
import { isReport } from "@/lib/types";

export async function getReportData(id: number) {
  if (!(await isLoggedIn())) redirect("/sign-in");
  const supabase = await createClient();

  //const { data, error } = await supabase
  //.from("analysis")
  //.select()
  //.eq("id", id)
  //.single();

  const { data, error } = await supabase
    .from("report")
    .select(
      `
      *,
        analyses:analysis (
        *,
         classification (
            *,
            explanation (*)
        )
        
        )
       
    `,
    )
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching data:", error);
  }

  let formattedData = data ? camelcaseKeys(data, { deep: true }) : null;

  if (formattedData && !isReport(formattedData)) {
    throw new Error("Data does not match the Report type");
  }

  return { data: formattedData, error };
}

export async function getDiureticTiming(id: number) {
  if (!(await isLoggedIn())) redirect("/sign-in");
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("report")
    .select("diuretic_timing")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(`Failed to fetch diuretic timing: ${error.message}`);
  }

  return data ? camelcaseKeys(data, { deep: true }) : null;
}

export async function getSignedUrls(
  objectPaths: string[] | null,
  bucket: string,
) {
  if (!(await isLoggedIn())) redirect("/sign-in");
  const supabase = await createClient();

  if (!objectPaths) return null;

  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUrls(objectPaths, 3600);

  if (error) {
    throw new Error(`Failed to fetch signed urls: ${error.message}`);
  }

  return data;
}

export async function getPublicUrl(path: string | null, bucketName: string) {
  const supabase = await createClient();

  if (!path) return null;

  const { data } = supabase.storage.from(bucketName).getPublicUrl(path);

  return data.publicUrl;
}
