"use client";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import AnalysisCard from "@/components/analysis-card";
import { getAnalysisData } from "@/lib/data-fetch";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import camelcaseKeys from "camelcase-keys";

export default function AnalysisList() {
  const [analysisData, setAnalysisData] = useState<any[]>([]);
  const supabase = createClient();

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
      const data = await getAnalysisData();
      setAnalysisData(data);
    };
    fetchData();
  }, []);

  return (
    <SidebarMenu>
      {analysisData.map((item) => (
        <SidebarMenuItem key={item.id}>
          <SidebarMenuButton>
            <AnalysisCard analysis={item} />
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
