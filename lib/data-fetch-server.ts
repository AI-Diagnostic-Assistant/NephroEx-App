import { createClient } from "@/utils/supabase/server";
import camelcaseKeys from "camelcase-keys";
import { isAnalysis } from "@/lib/types";

export async function getAnalysisData(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("analysis")
    .select()
    .eq("id", id)
    .single();

  let formattedData = data ? camelcaseKeys(data, { deep: true }) : null;

  if (formattedData && !isAnalysis(formattedData)) {
    throw new Error("Data does not match the Analysis type");
  }

  return { data: formattedData, error };
}
