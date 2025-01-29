import {
  Tabs,
  TabsContent,
  RadixTabsList,
  RadixTabsTrigger, TabsList, TabsTrigger,
} from "@/components/ui/tabs";
import {Analysis, Classification} from "@/lib/types";
import { ClassificationCard } from "@/components/classification-card";
import React from "react";
import RenogramChart from "@/components/renogram-chart";

const AnalysisTabs = ({
  analyses,
}: {
  analyses: Analysis[];
}) => {
  const typeMapper = (category: string): string => {
    const mapping: { [key: string]: string } = {
      image: "Image analysis",
      renogram: "Renogram analysis",
    };
    return mapping[category] || "Unknown Type";
  };

  return (
    <Tabs defaultValue={analyses[0]?.category} className="w-full">
      <RadixTabsList className="px-4">
        {analyses.map((analysis: Analysis) => (
          <RadixTabsTrigger
            key={analysis.id}
            value={analysis.category}
            className="px-4 py-2"
          >
            {typeMapper(analysis.category)}
          </RadixTabsTrigger>
        ))}
      </RadixTabsList>

      {analyses.map((analysis: Analysis) => (
          <TabsContent
              className="px-4 py-4"
              key={analysis.id}
              value={analysis.category}
          >
            {analysis.category === "renogram" ? (
                <><>

                  <Tabs defaultValue={analysis.classification[0]?.type}>
                    <TabsList className="px-4">
                      {analysis.classification.map((classification: Classification) => (
                          <TabsTrigger key={classification.id} value={classification.type}>
                            {classification.type}
                          </TabsTrigger>
                      ))}
                    </TabsList>

                    {analysis.classification.map((classification: Classification) => (
                        <TabsContent key={classification.id} value={classification.type} className="py-4">
                          <ClassificationCard classification={classification}/>
                        </TabsContent>
                    ))}
                  </Tabs></>
                  <div className="bg-white xl:min-w-96 border border-gray-100 shadow-sm rounded-md p-4 flex flex-col gap-4">
                    <div className="flex flex-col">
                      <h2> Renogram </h2>
                      <p> Visual explanation of the DICOM file uploaded. The image below is the summed image from the entire DICOM sequence. A heatmap overlay represents the area of interest chosen by the AI</p>
                    </div>
                    <div className="bg-primary-foreground px-3 py-2 rounded-lg w-full">
                      <RenogramChart datasets={[
                        {
                          label: "Left Activities",
                          data: analysis.roiActivity[0]
                        },
                        {
                          label: "Right Activities",
                          data: analysis.roiActivity[1]
                        },
                        {
                          label: "Total Activities",
                          data: analysis.roiActivity[2]
                        },
                      ]} title="Renogram: Activities Over Time"/>
                    </div>
                  </div>

                  </>



            ) : (
                // No nested tabs for Image Analysis
                <div> Hei </div>
            )}
          </TabsContent>
      ))}
    </Tabs>
  );
};

export default AnalysisTabs;
