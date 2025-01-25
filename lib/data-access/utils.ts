import { createClient, isLoggedIn } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

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

export async function getPublicUrl(path: string | null, bucketName: string) {
  const supabase = await createClient();

  if (!path) return null;

  const { data } = supabase.storage.from(bucketName).getPublicUrl(path);

  return data.publicUrl;
}
