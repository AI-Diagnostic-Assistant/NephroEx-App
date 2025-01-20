import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }
  return (
    <div className="flex">
      <div className="flex flex-col gap-2">
        <SidebarProvider>
          <AppSidebar user={user} />
        </SidebarProvider>
      </div>
      <div className="w-full">
        <div>{children}</div>
      </div>
    </div>
  );
}
