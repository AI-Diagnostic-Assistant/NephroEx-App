import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import {getAnalysisData} from "@/lib/data-fetch";
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/app-sidebar";


export default async function ProtectedPage() {

    const supabase = await createClient()

    const analysisData = await getAnalysisData()

    console.log(analysisData)

    const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/");
  }

  return (
      <div className="flex gap-9">
          <div className="flex flex-col gap-2">
              <SidebarProvider>
                  <AppSidebar analysisData={analysisData} user={user}/>
                  <SidebarTrigger />
              </SidebarProvider>
          </div>
          <div>
              HER SKAL DETALJER FRA EN ANALYSE LIGGE
          </div>
      </div>
  )

}
