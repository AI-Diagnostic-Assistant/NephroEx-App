import { Analysis, Classification } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClassificationCard } from "@/components/classification-card";
import React from "react";

type ReportContentProps = {
  analyses: Analysis[];
  patientDicomStorageId?: string | null;
};

export default function AnalysisTabsContent(props: ReportContentProps) {
  const { analyses, patientDicomStorageId } = props;

  const typeMapper = (category: string): string => {
    const mapping: { [key: string]: string } = {
      svm: "Datapoint Importance",
      decision_tree: "Feature Importance",
    };
    return mapping[category] || "Unknown Type";
  };

  return (
    <div>
      {analyses.map((analysis: Analysis) => (
        <TabsContent
          key={analysis.id}
          value={analysis.category}
          className="px-4 py-4"
        >
          {analysis.category === "renogram" ? (
            <>
              <Tabs defaultValue={analysis.classification[0]?.type}>
                <TabsList className="px-4">
                  {analysis.classification.map(
                    (classification: Classification) => (
                      <TabsTrigger
                        key={classification.id}
                        value={classification.type}
                      >
                        {typeMapper(classification.type)}
                      </TabsTrigger>
                    ),
                  )}
                </TabsList>
                {analysis.classification.map(
                  (classification: Classification) => (
                    <TabsContent
                      key={classification.id}
                      value={classification.type}
                      className="py-4"
                    >
                      <ClassificationCard
                        classification={classification}
                        analysis={analysis}
                      />
                    </TabsContent>
                  ),
                )}
              </Tabs>
            </>
          ) : (
            <div>
              {analysis.classification.map((classification: Classification) => (
                <ClassificationCard
                  classification={classification}
                  analysis={analysis}
                  key={classification.id}
                  patientDicomStorageId={patientDicomStorageId}
                />
              ))}
            </div>
          )}
        </TabsContent>
      ))}
    </div>
  );
}
