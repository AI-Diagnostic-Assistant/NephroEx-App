import { Classification } from "@/lib/types";
import RenogramCharts from "@/components/RenogramCharts";
import HighlightedRenogramChart from "@/components/highlighted-renogram-chart";
import {
  capitalizeFirstLetter,
  explanationDescriptionMapper,
  generateTimeIntervals,
} from "@/lib/utils";
import TextualExplanation from "@/components/textual-explanation";
import { ChartBarBig } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ModuleCard from "@/components/module-card";
import React from "react";

interface ExplanationCardProps {
  classifications: Classification[];
  category: string;
  totalActivities: number[][] | null;
}

export async function ExplanationCard({
  classifications,
  category,
  totalActivities,
}: ExplanationCardProps) {
  const totalImagingTime = 30 * 60; // 30 minutes in seconds
  const intervalSize = 3 * 60; // 3-minute intervals in seconds
  const frameRate = 10; // 10 seconds per frame

  const { segmentLabels } = generateTimeIntervals(
    totalImagingTime,
    intervalSize,
    frameRate,
  );

  return (
    <ModuleCard
      title="Explanation"
      description={explanationDescriptionMapper(category)}
      icon={<ChartBarBig className="text-primary-brand" />}
      className="w-full xl:min-w-96"
    >
      <Tabs defaultValue="left">
        <TabsList className="rounded-lg mb-4">
          {classifications.map((classification: Classification) => (
            <TabsTrigger
              key={classification.id}
              className="data-[state=active]:shadow-none data-[state=active]:bg-white"
              value={classification.kidneyLabel}
            >
              {capitalizeFirstLetter(classification.kidneyLabel)} Kidney
            </TabsTrigger>
          ))}
        </TabsList>
        {classifications.map((classification: Classification, index) => (
          <TabsContent
            key={classification.id}
            value={classification.kidneyLabel}
            className=""
          >
            <div className="rounded-lg ">
              {classification.explanation.map((explanation) => (
                <div key={explanation.id} className="space-y-4">
                  {explanation.shapValuesRenogram && (
                    <RenogramCharts
                      key={explanation.id}
                      shapValuesRenogram={explanation.shapValuesRenogram}
                      confidence={classification.confidence}
                      prediction={classification.prediction}
                      featureNames={[
                        "Mean",
                        "Variance",
                        "Skewness",
                        "Kurtosis",
                      ]}
                    />
                  )}
                  {explanation.shapValuesRenogramSummed && (
                    <div className="space-y-4">
                      <RenogramCharts
                        shapValuesRenogram={
                          explanation.shapValuesRenogramSummed
                        }
                        confidence={classification.confidence}
                        prediction={classification.prediction}
                        featureNames={segmentLabels}
                      />
                      <HighlightedRenogramChart
                        shapValues={explanation.shapValuesRenogramSummed[0]}
                        totalData={totalActivities?.[index] || []}
                      />
                    </div>
                  )}
                  {explanation.description && (
                    <TextualExplanation
                      description={explanation.description}
                      kidneyLabel={classification.kidneyLabel}
                    />
                  )}
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </ModuleCard>
  );
}
