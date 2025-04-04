import { Analysis } from "@/lib/types";
import { TabsContent } from "@/components/ui/tabs";
import React from "react";
import ClassificationResultCard from "@/components/classification-result-card";
import PatientInfo from "@/components/PatientInfo";
import RenogramChartCard from "@/components/renogram-chart-card";
import { ExplanationCard } from "@/components/explanation-card";

type ReportContentProps = {
  analyses: Analysis[];
};

export default function AnalysisTabsContent(props: ReportContentProps) {
  const { analyses } = props;

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
            {analysis.roiActivity && (
              <RenogramChartCard
                datasets={[
                  { label: "Left Activities", data: analysis.roiActivity[0] },
                  { label: "Right Activities", data: analysis.roiActivity[1] },
                ]}
                title="Renogram: Activities Over Time"
              />
            )}
            <ExplanationCard
              classifications={analysis.classification}
              category={analysis.category}
              totalActivities={analysis.roiActivity}
            />
          </div>
        </TabsContent>
      ))}
    </div>
  );
}
