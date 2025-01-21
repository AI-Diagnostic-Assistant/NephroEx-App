"use client";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { getPatientsWithAnalyses } from "@/lib/data-access";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import camelcaseKeys from "camelcase-keys";
import { usePathname } from "next/navigation";
import { formatDateToNo, isActive } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronRight } from "lucide-react";

export default function PatientAnalysisList() {
  const [patientData, setPatientData] = useState<any[]>([]);
  const supabase = createClient();
  const path = usePathname();

  supabase
    .channel("custom-insert-channel")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "analysis" },
      (payload) => {
        console.log("Change received!", payload);
        setPatientData((prev) => [
          ...prev,
          camelcaseKeys(payload.new, { deep: true }),
        ]);
      },
    )
    .subscribe();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPatientsWithAnalyses();
      setPatientData(data);
    };
    fetchData();
  }, []);

  return (
    <SidebarMenu>
      {patientData.map((item) => (
        <Collapsible defaultOpen key={item.id} className="group/collapsible">
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton className="flex justify-between">
                <p className="text-sm">{item.name}</p>
                <ChevronRight className="transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {item.analysis.map((analysis: any) => (
                  <SidebarMenuSubItem key={analysis.id}>
                    <SidebarMenuSubButton
                      href={`/analysis/${analysis.id}`}
                      isActive={isActive(path, String(analysis.id))}
                    >
                      <p className="text-gray-700">
                        {" "}
                        {formatDateToNo(analysis.createdAt)}
                      </p>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      ))}
    </SidebarMenu>
  );
}
