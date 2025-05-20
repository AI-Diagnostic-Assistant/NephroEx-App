import { Analysis } from "@/lib/types";
import { TabsContent } from "@/components/ui/tabs";
import React from "react";
import ClassificationResultCard from "@/components/classification-result-card";
import PatientInfo from "@/components/PatientInfo";
import RenogramChartCard from "@/components/renogram-chart-card";
import { ExplanationCard } from "@/components/explanation-card";

type ReportContentProps = {
  analyses: Analysis[];
  interpolatedRenograms: number[][];
  interpolatedSmoothedRenograms: number[][];
  originalTv: number[];
  interpolatedTv: number[];
};

export default function AnalysisTabsContent(props: ReportContentProps) {
  const {
    analyses,
    interpolatedRenograms,
    interpolatedSmoothedRenograms,
    interpolatedTv,
  } = props;

  return (
    <div className="max-w-screen-lg mx-auto">
      {analyses.map((analysis: Analysis) => (
        <TabsContent
          key={analysis.id}
          value={analysis.category}
          className="px-4 py-8"
        >
          <div className="flex flex-col gap-4 w-full">
            <div className="flex gap-4 w-full">
              <ClassificationResultCard analysis={analysis} />
              <PatientInfo />
            </div>
            {interpolatedRenograms && (
              <RenogramChartCard
                interpolatedRenograms={[
                  {
                    label: "Raw Left Kidney-BKG",
                    data: interpolatedRenograms[0],
                  },
                  {
                    label: "Raw Right Kidney-BKG",
                    data: interpolatedRenograms[1],
                  },
                ]}
                interpolatedSmoothedRenograms={[
                  {
                    label: "Left Kidney-BKG",
                    data: interpolatedSmoothedRenograms[0],
                  },
                  {
                    label: "Right Kidney-BKG",
                    data: interpolatedSmoothedRenograms[1],
                  },
                ]}
                timeVector={interpolatedTv}
                title="Renogram: Activities Over Time"
              />
            )}
            <ExplanationCard
              classifications={analysis.classification}
              category={analysis.category}
              interpolatedSmoothedRenograms={interpolatedSmoothedRenograms}
              timeVector={interpolatedTv}
            />
          </div>
        </TabsContent>
      ))}
    </div>
  );
}
