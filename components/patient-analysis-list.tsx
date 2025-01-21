"use client";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import AnalysisCard from "@/components/analysis-card";
import { getAnalyses } from "@/lib/data-access";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import camelcaseKeys from "camelcase-keys";
import { usePathname } from "next/navigation";
import { isActive } from "@/lib/utils";

export default function AnalysisList() {
  const [analysisData, setAnalysisData] = useState<any[]>([]);
  const supabase = createClient();
  const path = usePathname();

  supabase
    .channel("custom-insert-channel")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "analysis" },
      (payload) => {
        console.log("Change received!", payload);
        setAnalysisData((prev) => [
          ...prev,
          camelcaseKeys(payload.new, { deep: true }),
        ]);
      },
    )
    .subscribe();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAnalyses();
      setAnalysisData(data);
    };
    fetchData();
  }, []);

  return (
    <SidebarMenu>
      {analysisData.map((item) => (
        <SidebarMenuItem key={item.id}>
          <SidebarMenuButton isActive={isActive(path, String(item.id))}>
            <AnalysisCard analysis={item} />
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
