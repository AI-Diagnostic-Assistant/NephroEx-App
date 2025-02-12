import RenogramChart from "@/components/renogram-chart";
import React from "react";
import { ChartLine } from "lucide-react";

interface RenogramChartCardProps {
  datasets: { label: string; data: number[] }[];
  title: string;
}
export default function RenogramChartCard(props: RenogramChartCardProps) {
  const { datasets, title } = props;

  return (
    <div className="bg-white xl:min-w-96 border rounded-md p-4 flex flex-col gap-4 w-full">
      <div className="flex gap-1">
        <ChartLine className="text-primary-brand" />
        <h2>Renogram</h2>
      </div>
      <div className="bg-primary-foreground px-3 py-2 rounded-lg w-full">
        <RenogramChart datasets={datasets} title={title} />
      </div>
    </div>
  );
}
