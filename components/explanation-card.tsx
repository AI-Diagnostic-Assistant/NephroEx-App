import { Classification } from "@/lib/types";
import RenogramCharts from "@/components/RenogramCharts";
import HighlightedRenogramChart from "@/components/highlighted-renogram-chart";
import {
  capitalizeFirstLetter,
  explanationDescriptionMapper,
} from "@/lib/utils";
import TextualExplanation from "@/components/textual-explanation";
import { ChartBarBig } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ModuleCard from "@/components/module-card";
import React from "react";

interface ExplanationCardProps {
  classifications: Classification[];
  category: string;
  interpolatedSmoothedRenograms: number[][];
  timeVector: number[];
}

export async function ExplanationCard({
  classifications,
  category,
  interpolatedSmoothedRenograms,
  timeVector,
}: ExplanationCardProps) {
  const imageAcquisitionValues = {
    totalImagingTime: 40 * 60,
    intervalSize: 2 * 60,
    frameRate: 10,
  };

  const quantitativeFeatureNames = [
    "Mean",
    "Variance",
    "Skewness",
    "Kurtosis",
    "C_last",
    "slope_0_5_min",
    "slope_15_20_min",
    "Length",
    "Time to peek",
    "Peak to 1/2 peak",
    "Diuretic T1/2",
    "30min/peak",
    "30min/3min",
    "Split function",
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
                      barPlotHeight={400}
                      waterfallPlotHeight={500}
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
                        featureNames={
                          (
                            classification.timeBins as [number, number][] | null
                          )?.map(
                            ([s, e]) => `${Math.round(s)}–${Math.round(e)} min`,
                          ) ?? []
                        }
                        barPlotHeight={550}
                        waterfallPlotHeight={650}
                      />

                      <HighlightedRenogramChart
                        shapValues={explanation.shapValuesRenogramSummed[0]}
                        interpolatedSmoothedRenogram={
                          interpolatedSmoothedRenograms[index]
                        }
                        imageAcquisitionValues={imageAcquisitionValues}
                        timeVector={timeVector}
                        timeBins={
                          (
                            classification.timeBins as [number, number][] | null
                          )?.map(
                            ([s, e]) => `${Math.round(s)}–${Math.round(e)} min`,
                          ) ?? []
                        }
                        predictedClass={classification.prediction}
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
