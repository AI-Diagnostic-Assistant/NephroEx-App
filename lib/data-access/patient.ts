"use server";

import { createClient, isLoggedIn } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import camelcaseKeys from "camelcase-keys";

export async function getAllPatients() {
  if (!(await isLoggedIn())) redirect("/sign-in");

  const supabase = await createClient();

  const { data, error } = await supabase.from("patient").select();

  let formattedData = data ? camelcaseKeys(data, { deep: true }) : null;

  return { data: formattedData, error };
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
