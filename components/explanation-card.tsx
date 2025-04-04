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
  //Can set it to 40 minutes since the models are padded to the longest sequence. So the all XAI techiques and models are using 240 elements.
  const imageAcquisitionValues = {
    totalImagingTime: 40 * 60,
    intervalSize: 2 * 60,
    frameRate: 10,
  };

  const { segmentLabels } = generateTimeIntervals(
    imageAcquisitionValues.totalImagingTime,
    imageAcquisitionValues.intervalSize,
    imageAcquisitionValues.frameRate,
  );

  const quantitativeFeatureNames = [
    "Mean",
    "Variance",
    "Skewness",
    "Kurtosis",
    "Time to Peak",
    "Peak to 1/2 peak",
    "Diuretic T1/2",
    "30min/peak",
    "30min/3min",
  ];

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
                      featureNames={quantitativeFeatureNames}
                      barPlotHeight={300}
                      waterfallPlotHeight={350}
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
                        barPlotHeight={550}
                        waterfallPlotHeight={650}
                      />
                      <HighlightedRenogramChart
                        shapValues={explanation.shapValuesRenogramSummed[0]}
                        totalData={totalActivities?.[index] || []}
                        imageAcquisitionValues={imageAcquisitionValues}
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
