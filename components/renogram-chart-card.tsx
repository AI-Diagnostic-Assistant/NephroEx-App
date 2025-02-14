import RenogramChart from "@/components/renogram-chart";
import React from "react";
import { ChartLine } from "lucide-react";
import ModuleCard from "@/components/module-card";

interface RenogramChartCardProps {
  datasets: { label: string; data: number[] }[];
  title: string;
}
export default function RenogramChartCard(props: RenogramChartCardProps) {
  const { datasets, title } = props;

  return (
    <ModuleCard
      title="Renogram"
      description="Activities over time for the left, right and total kidneys over the entire DICOM sequence."
      icon={<ChartLine className="text-primary-brand" />}
      className="w-full"
    >
      <div className="bg-primary-foreground px-3 py-2 rounded-lg">
        <RenogramChart datasets={datasets} title={title} />
      </div>
    </ModuleCard>
  );
}
