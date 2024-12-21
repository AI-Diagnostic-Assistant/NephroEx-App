import { createClient } from "@/utils/supabase/server";

export default async function CompositeImages() {
  const supabase = await createClient();
  const { data: notes } = await supabase.from("Composite_image").select();

  console.log(notes);

  return <pre>{JSON.stringify(notes, null, 2)}</pre>;
}
