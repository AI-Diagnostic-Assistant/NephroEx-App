import { LogOut, Activity } from "lucide-react"

import {
    Sidebar,
    SidebarContent, SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import AnalysisCard from "@/components/analysis-card";
import {User} from "@supabase/auth-js";
import {signOutAction} from "@/app/actions";


type AppSidebarProps = {
    analysisData: any[]
    user: User
}

export function AppSidebar(props: AppSidebarProps) {
    const { analysisData, user } = props;
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <div className="flex items-center">
                            <div>
                                <Activity />
                            </div>
                            <div className="flex flex-col items-start p-4">
                                <span className="font-bold text-lg">AIDA</span>
                                <span className="text-sm">AI Diagnostic Assistant</span>
                            </div>
                        </div>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarMenuButton className="bg-white flex items-center justify-center p-4 border border-gray-300 rounded" >
                        <p className="text-black font-medium"> New Analysis </p>
                    </SidebarMenuButton>
                </SidebarGroup>
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
                <SidebarFooter>
                    <SidebarGroupLabel>
                        Settings
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <form action={signOutAction}>
                                        <SidebarMenuButton formAction={signOutAction}>
                                            <LogOut/>
                                            <span>  Sign out </span>
                                        </SidebarMenuButton>
                                    </form>
                                    <p>{user.email}</p>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                </SidebarFooter>
            </SidebarContent>
        </Sidebar>
    )
}