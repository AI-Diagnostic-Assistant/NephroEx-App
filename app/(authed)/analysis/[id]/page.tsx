import { getPublicUrl, getReportData, getSignedUrls } from "@/lib/data-access";
import { Tabs } from "@/components/ui/tabs";
import React from "react";
import AnalysisTabsContent from "@/components/analysis-tabs-content";
import AnalysisTabsHeader from "@/components/analysis-tabs-header";
import RadioTracerFlow from "@/components/radiotracer-flow";
import ModuleCard from "@/components/module-card";
import { DicomViewer } from "@/components/dicom-viewer";
import { ImageIcon } from "lucide-react";

export default async function Analysis({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const id = (await params).id;
  const { data, error } = await getReportData(id);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No data found for Analysis #{id}</div>;
  }

  const { createdAt, analyses, patientDicomStorageId } = data;

  const summed_frames_signed_urls = await getSignedUrls(
    data.dicomStorageIds,
    "grouped-dicom-frames",
  );

  const publicUrl = await getPublicUrl(
    data?.roiContourObjectPath,
    "roi_contours",
  );

  const total_patient_dicom_public_url = patientDicomStorageId
    ? await getPublicUrl(patientDicomStorageId, "patient-dicom-files")
    : null;

  return (
    <div>
      <Tabs defaultValue="renogram" className="w-full">
        <AnalysisTabsHeader analyses={analyses} createdAt={createdAt} id={id} />
        <AnalysisTabsContent analyses={analyses} />
      </Tabs>
      <div className="p-4 w-full max-w-screen-lg mx-auto">
        {summed_frames_signed_urls && (
          <RadioTracerFlow
            summedFramesSignedUrls={summed_frames_signed_urls}
            publicUrl={publicUrl}
          />
        )}
        <ModuleCard
          title="DICOM Viewer"
          icon={<ImageIcon className="text-primary-brand" />}
          description="Entire DICOM sequence uploaded is displayed here. Hint:
                    Scroll on the image to switch DICOM frame."
          className="w-full mt-4"
        >
          <DicomViewer dicomUrl={`wadouri:${total_patient_dicom_public_url}`} />
        </ModuleCard>
      </div>
    </div>
  );
}
