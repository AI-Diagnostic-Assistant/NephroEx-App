import { getPublicUrl, getReportData, getSignedUrls } from "@/lib/data-access";
import { Tabs } from "@/components/ui/tabs";
import React from "react";
import AnalysisTabsContent from "@/components/analysis-tabs-content";
import AnalysisTabsHeader from "@/components/analysis-tabs-header";
import RadioTracerFlow from "@/components/radiotracer-flow";

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

  return (
    <div>
      <Tabs defaultValue={analyses[0]?.category} className="w-full">
        <AnalysisTabsHeader analyses={analyses} createdAt={createdAt} id={id} />
        <AnalysisTabsContent
          analyses={analyses}
          patientDicomStorageId={patientDicomStorageId}
        />
      </Tabs>
      <div className="p-4">
        {summed_frames_signed_urls && (
          <RadioTracerFlow
            summedFramesSignedUrls={summed_frames_signed_urls}
            publicUrl={publicUrl}
          />
        )}
      </div>
    </div>
  );
}
