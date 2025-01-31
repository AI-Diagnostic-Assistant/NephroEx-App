import { getPublicUrl, getReportData, getSignedUrls } from "@/lib/data-access";
import { DicomViewer } from "@/components/dicom-viewer";
import Image from "next/image";
import { Tabs } from "@/components/ui/tabs";
import React from "react";
import AnalysisTabsContent from "@/components/analysis-tabs-content";
import AnalysisTabsHeader from "@/components/analysis-tabs-header";

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

  const { createdAt, analyses } = data;

  const summed_frames_signed_urls = await getSignedUrls(data.dicomStorageIds);

  const publicUrl = await getPublicUrl(
    data?.roiContourObjectPath,
    "roi_contours",
  );

  const total_patient_dicom_public_url = await getPublicUrl(
    data.patientDicomStorageId,
    "patient-dicom-files",
  );

  return (
    <div>
      <Tabs defaultValue={analyses[0]?.category} className="w-full">
        <AnalysisTabsHeader analyses={analyses} createdAt={createdAt} id={id} />
        <AnalysisTabsContent analyses={analyses} />
      </Tabs>
      <div className="flex flex-col gap-9 p-4">
        <div className="bg-white border border-gray-100 p-4 shadow-sm rounded-md flex flex-col gap-9">
          <div>
            <h2>Radiotracer Flow</h2>
            <div className="flex gap-1 flex-wrap">
              {summed_frames_signed_urls?.map((signedUrl, index) => (
                <div key={index} className="relative">
                  <img
                    src={signedUrl.signedUrl}
                    alt="Excretion timeline"
                    className="w-36"
                  />
                  {publicUrl && (
                    <Image
                      src={publicUrl}
                      alt="ROI contour"
                      width={144}
                      height={144}
                      className="absolute top-0 left-0 z-50"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
          <div>
            {data.patientDicomStorageId && (
              <div>
                <h2>DICOM Viewer</h2>
                <DicomViewer
                  dicomUrl={`wadouri:${total_patient_dicom_public_url}`}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
