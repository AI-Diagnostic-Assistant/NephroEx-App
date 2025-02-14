import { Analysis, Classification } from "@/lib/types";
import { ExplanationCard } from "@/components/explanation-card";
import ClassificationResultCard from "@/components/classification-result-card";
import React from "react";
import RenogramChartCard from "@/components/renogram-chart-card";
import { DicomViewer } from "@/components/dicom-viewer";
import { getPublicUrl } from "@/lib/data-access";
import { ChartBarBig } from "lucide-react";
import ModuleCard from "@/components/module-card";
import { Image as ImageIcon } from "lucide-react";

type ClassificationCardProps = {
  classification: Classification;
  analysis: Analysis;
  patientDicomStorageId?: string | null;
};

export async function ClassificationCard(props: ClassificationCardProps) {
  const { classification, analysis, patientDicomStorageId } = props;

  const total_patient_dicom_public_url = patientDicomStorageId
    ? await getPublicUrl(patientDicomStorageId, "patient-dicom-files")
    : null;

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
            {patientDicomStorageId && (
              <ModuleCard
                title="DICOM Viewer"
                icon={<ImageIcon className="text-primary-brand" />}
                description="Entire DICOM sequence uploaded is displayed here. Hint:
                    Scroll on the image to switch DICOM frame."
                className="w-full"
              >
                <DicomViewer
                  dicomUrl={`wadouri:${total_patient_dicom_public_url}`}
                />
              </ModuleCard>
            )}
          </>
        )}
      </div>
      <ModuleCard
        title="Explanation"
        description="The charts show the importance distribution of the features. This is
            what the model used to base its decision on."
        icon={<ChartBarBig className="text-primary-brand" />}
        className="w-full xl:min-w-96"
      >
        {classification.explanation?.map((explanation) => (
          <ExplanationCard
            key={explanation.id}
            explanation={explanation}
            confidence={classification.confidence}
            totalActivities={
              analysis.roiActivity ? analysis.roiActivity[2] : []
            }
          />
        ))}
      </ModuleCard>
    </div>
  );
}
