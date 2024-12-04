import { LogOut, Activity, ChevronsUpDown } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import AnalysisCard from "@/components/analysis-card";
import { User } from "@supabase/auth-js";
import { signOutAction } from "@/app/actions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createClient } from "@/utils/supabase/server";

type AppSidebarProps = {
  analysisData: any[];
  user: User;
};

export async function AppSidebar(props: AppSidebarProps) {
  const supabase = await createClient();
  const { analysisData, user } = props;
  const { data: fullUser } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <Sidebar className="pb-2">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center">
              <div>
                <Activity />
              </div>
              <div className="flex flex-col items-start p-4">
                <span className="font-bold text-lg">AIDA</span>
                <span className="text-sm">AI Diagnostic Assistant</span>
              </div>
            </div>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton className="bg-white flex items-center justify-center p-4 border border-gray-300 rounded">
              <p className="text-black font-medium"> New Analysis </p>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>History</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {analysisData.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton asChild>
                    <AnalysisCard analysis={item} />
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="flex justify-between">
                  {fullUser?.full_name ? (
                    <div>
                      <p className="font-semibold">{fullUser.full_name}</p>
                      <p className="text-xs">{user.email}</p>
                    </div>
                  ) : (
                    <p>{user.email}</p>
                  )}
                  <ChevronsUpDown />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" side="right">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <form action={signOutAction}>
                  <SidebarMenuButton formAction={signOutAction}>
                    <LogOut />
                    <span> Sign out </span>
                  </SidebarMenuButton>
                </form>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
