import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import FileUpload from "@/components/file-upload";

export default async function Page() {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return redirect("/sign-in");
  }

  const accessToken = session.access_token;

  return (
    <div className="flex h-[calc(100vh-32px)] justify-center items-center">
      <FileUpload token={accessToken} />
    </div>
  );
}
