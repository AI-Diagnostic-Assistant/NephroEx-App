import RenogramChart from "@/components/renogram-chart";
import React from "react";
import { ChartLine } from "lucide-react";
import ModuleCard from "@/components/module-card";

interface RenogramChartCardProps {
  interpolatedRenograms: { label: string; data: number[] }[];
  interpolatedSmoothedRenograms: { label: string; data: number[] }[];
  timeVector: number[];
  title: string;
}
export default function RenogramChartCard(props: RenogramChartCardProps) {
  const {
    interpolatedRenograms,
    interpolatedSmoothedRenograms,
    timeVector,
    title,
  } = props;

  return (
    <ModuleCard
      title="Renogram"
      description="Renogram curves showing region-of-interest (ROI) counts per second for the left and right kidneys throughout the full DICOM acquisition time (in minutes). Time-to-peak activity is marked with circles on each curve, and the timing of diuretic injection is indicated by a vertical reference line."
      icon={<ChartLine className="text-primary-brand" />}
      className="w-full"
    >
      <div className="px-3 py-2 rounded-lg">
        <RenogramChart
          interpolatedRenograms={interpolatedRenograms}
          interpolatedSmoothedRenograms={interpolatedSmoothedRenograms}
          timeVector={timeVector}
          title={title}
        />
      </div>
    </ModuleCard>
  );
}
