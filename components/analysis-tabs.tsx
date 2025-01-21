import {
  Tabs,
  TabsContent,
  RadixTabsList,
  RadixTabsTrigger,
} from "@/components/ui/tabs";
import { Classification } from "@/lib/types";
import { ClassificationCard } from "@/components/classification-card";
import React from "react";

const AnalysisTabs = ({
  classifications,
}: {
  classifications: Classification[];
}) => {
  const typeMapper = (type: string): string => {
    const mapping: { [key: string]: string } = {
      cnn: "Image analysis",
      svm: "Renogram analysis",
    };
    return mapping[type] || "Unknown Type";
  };

  return (
    <Tabs defaultValue={classifications[0]?.type} className="w-full">
      <RadixTabsList className="px-4">
        {classifications.map((item) => (
          <RadixTabsTrigger
            key={item.id}
            value={item.type}
            className="px-4 py-2"
          >
            {typeMapper(item.type)}
          </RadixTabsTrigger>
        ))}
      </RadixTabsList>

      {classifications.map((classification) => (
        <TabsContent
          className="px-4"
          key={classification.id}
          value={classification.type}
        >
          <ClassificationCard classification={classification} />
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default AnalysisTabs;
