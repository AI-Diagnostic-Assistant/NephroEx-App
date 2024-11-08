import {createClient} from "@/utils/supabase/server";
import camelcaseKeys from "camelcase-keys";

export async function getAnalysisData() {

    const supabase = await createClient()


    const { data, error } = await supabase
        .from('Analysis')
        .select();

    if (error) {
        throw new Error(`Failed to fetch data: ${error.message}`);
    }

    return data ? camelcaseKeys(data, { deep: true }) : [];
}