import { createClient } from "@/utils/supabase/client";
import camelcaseKeys from "camelcase-keys";

export async function getAnalyses() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("analysis")
    .select()
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch data: ${error.message}`);
  }

  return data ? camelcaseKeys(data, { deep: true }) : [];
}
