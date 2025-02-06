import { Analysis, Classification } from "@/lib/types";
import { ExplanationCard } from "@/components/explanation-card";
import ClassificationResultCard from "@/components/classification-result-card";
import React from "react";
import RenogramChartCard from "@/components/renogram-chart-card";
import { DicomViewer } from "@/components/dicom-viewer";
import { getPublicUrl } from "@/lib/data-access";
import { ChartBarBig } from "lucide-react";

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
              <div className="bg-white w-full p-4 flex flex-col gap-4 border border-gray-100 shadow-sm rounded-md">
                <div>
                  <h2>DICOM Viewer</h2>
                  <p className="text-muted-foreground">
                    Entire DICOM sequence uploaded is displayed here. Hint:
                    Scroll on the image to switch DICOM frame.
                  </p>
                </div>
                <DicomViewer
                  dicomUrl={`wadouri:${total_patient_dicom_public_url}`}
                />
              </div>
            )}
          </>
        )}
      </div>
      <div className="flex flex-col gap-9 bg-white p-4 xl:min-w-96 border border-gray-100 shadow-sm rounded-md">
        <div className="flex flex-col">
          <div className="flex gap-1">
            <ChartBarBig className="text-primary-brand" />
            <h2>Explanation</h2>
          </div>
          <p className="text-muted-foreground">
            The charts show the importance distribution of the features. This is
            what the model used to base its decision on.
          </p>
        </div>
        <div>
          {classification.explanation?.map((explanation, index) => (
            <ExplanationCard
              key={explanation.id}
              explanation={explanation}
              confidence={classification.confidence}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
