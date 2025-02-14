"use server";

import { isLoggedIn } from "@/utils/supabase/server";
import camelcaseKeys from "camelcase-keys";
import { redirect } from "next/navigation";

export async function classifyImages(formData: FormData, token: string) {
  if (!(await isLoggedIn())) redirect("/sign-in");

  try {
    const response = await fetch("http://127.0.0.1:8080/classify", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();
    let formattedData = data ? camelcaseKeys(data, { deep: true }) : null;
    return { data: formattedData, error: null };
  } catch (error) {
    console.error("Error classifying images:", error);
    return { data: null, error };
  }
}
