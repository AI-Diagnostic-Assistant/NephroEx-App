import { formatDateToNo } from "@/lib/utils";
import AnalysisTabs from "@/components/analysis-tabs";
import { getAnalysisData } from "@/lib/data-access";

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

  return (
    <div>
      <div className="mb-8 p-4 pt-24">
        <p className="text-primary-brand">{formatDateToNo(createdAt)}</p>
        <h1>Analysis #{id}</h1>
        <p className="text-sidebar-foreground/70">
          This is a complete analysis of the uploaded DICOM file.
        </p>
      </div>
      <div className="flex flex-col gap-9 p-4">
        <div className="bg-white border border-gray-100 p-4">
          <AnalysisTabs classifications={classification} />
        </div>
        <div className="bg-white border border-gray-100 p-4">
          <h2>Excretion timeline</h2>
          <div>Her skal DICOM bilder vises</div>
        </div>
      </div>
    </div>
  );
}
