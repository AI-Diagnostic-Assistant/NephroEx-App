import { formatDateToNo } from "@/lib/utils";
import AnalysisTabs from "@/components/analysis-tabs";
import { getAnalysisData, getSignedUrls } from "@/lib/data-access";

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

  const publicUrls = await getSignedUrls(data.dicomStorageIds);

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
        <div className="bg-white border border-gray-100 p-4 shadow-sm rounded-md">
          <AnalysisTabs classifications={classification} />
        </div>
        <div className="bg-white border border-gray-100 p-4 shadow-sm rounded-md">
          <h2>Radiotracer flow</h2>
          <div className="flex gap-1 flex-wrap">
            {publicUrls?.map((publicUrl, index) => (
              <div key={index}>
                <img
                  src={publicUrl.signedUrl}
                  alt="Excretion timeline"
                  className="w-36"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
