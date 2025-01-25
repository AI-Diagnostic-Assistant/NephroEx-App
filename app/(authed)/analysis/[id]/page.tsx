import { formatDateToNo } from "@/lib/utils";
import AnalysisTabs from "@/components/analysis-tabs";

import { DicomViewer } from "@/components/dicom-viewer";
import Image from "next/image";
import { getAnalysisData } from "@/lib/data-access/analysis";
import { getPublicUrl, getSignedUrls } from "@/lib/data-access/utils";

export default async function Analysis({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const { data, error } = await getAnalysisData(id);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No data found for Analysis #{id}</div>;
  }

  const { createdAt, classification } = data;

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
      <div className="mb-8 px-4 pt-20">
        <p className="text-primary-brand">{formatDateToNo(createdAt)}</p>
        <h1>Analysis #{id}</h1>
        <p className="text-sidebar-foreground/70">
          This is a complete analysis of the uploaded DICOM file.
        </p>
      </div>
      <div className="flex flex-col gap-9 p-4">
        <div className="bg-white border border-gray-100 py-4 shadow-sm rounded-md">
          <AnalysisTabs classifications={classification} />
        </div>
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
