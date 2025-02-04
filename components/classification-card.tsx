import { Analysis, Classification } from "@/lib/types";
import { ExplanationCard } from "@/components/explanation-card";
import ClassificationResultCard from "@/components/classification-result-card";
import React from "react";
import RenogramChartCard from "@/components/renogram-chart-card";
import HeatMapCard from "@/components/HeatMapCard";

interface ClassificationCardProps {
  classification: Classification;
  analysis: Analysis;
}
export async function ClassificationCard(props: ClassificationCardProps) {
  const { classification, analysis } = props;

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex gap-4 w-full">
        <ClassificationResultCard classification={classification} />
        {analysis.roiActivity ? (
          <RenogramChartCard
            datasets={[
              { label: "Left Activities", data: analysis.roiActivity[0] },
              { label: "Right Activities", data: analysis.roiActivity[1] },
              { label: "Total Activities", data: analysis.roiActivity[2] },
            ]}
            title="Renogram: Activities Over Time"
          />
        ) : (
          <>
            {classification.explanation?.map((explanation, index) => (
              <HeatMapCard explanation={explanation} key={index} />
            ))}
          </>
        )}
      </div>
      <div className="flex flex-col gap-9 bg-white p-4 xl:min-w-96 border border-gray-100 shadow-sm rounded-md">
        <div className="flex flex-col">
          <h2>Explanation</h2>
          <p>
            {" "}
            The charts show the importance distribution of the features. This is
            what the model used to base its decision on.
          </p>
        </div>
        <div>
          {classification.explanation?.map((explanation, index) => (
            <ExplanationCard explanation={explanation} key={index} confidence={classification.confidence} />
          ))}
        </div>
      </div>
    </div>
  );
}
