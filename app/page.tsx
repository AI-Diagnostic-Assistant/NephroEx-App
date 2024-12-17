import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { getAnalysisData } from "@/lib/data-fetch";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import FileUpload from "@/components/file-upload";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const analysisData = await getAnalysisData();

  console.log(analysisData);

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!user || !session) {
    return redirect("/sign-in");
  }

  const accessToken = session.access_token;

  return (
    <div className="flex gap-9">
      <div className="flex flex-col gap-2">
        <SidebarProvider>
          <AppSidebar analysisData={analysisData} user={user} />
          <SidebarTrigger />
        </SidebarProvider>
      </div>
      <div className="flex flex-1 justify-center items-center">
        <div>
          <FileUpload token={accessToken} />
        </div>
      </div>
    </div>
  );
}
