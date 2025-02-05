import { LogOut, Activity, ChevronsUpDown, Plus } from "lucide-react";
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
import { User } from "@supabase/auth-js";
import { signOutAction } from "@/app/actions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createClient } from "@/utils/supabase/server";
import { ThemeSwitcher } from "@/components/theme-switcher";
import PatientAnalysisList from "@/components/patient-analysis-list";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AppSidebarProps = {
  user: User;
};

export async function AppSidebar(props: AppSidebarProps) {
  const supabase = await createClient();

  const { user } = props;
  const { data: fullUser } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <Sidebar>
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
            <SidebarMenuButton
              asChild
              className={cn(
                buttonVariants({ variant: "default", size: "default" }),
                "bg-primary-brand hover:bg-primary-brand/70 hover:text-white hover:cursor-pointer flex items-center justify-center p-4 border border-gray-300 rounded",
              )}
            >
              <div className="flex justify-center">
                <Plus />
                <a href={"/"} className="font-medium text-center">
                  {" "}
                  New Report
                </a>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Patients</SidebarGroupLabel>
          <SidebarGroupContent>
            <PatientAnalysisList />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="flex justify-between h-min">
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
                <DropdownMenuItem>Theme</DropdownMenuItem>
                <ThemeSwitcher />
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
