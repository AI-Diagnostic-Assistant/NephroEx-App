import { getAnalysisData } from "@/lib/data-fetch-server";
import {
  decimalToPercentage,
  formatDateToNo,
  roundListToThreeSignificantDigits,
} from "@/lib/utils";
import ProbabilityDistribution from "@/app/(authed)/analysis/[id]/ProbabilityDistribution";

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

  const { createdAt, userId, probabilities, ckdStagePrediction } = data;

  return (
    <div>
      <div className="mb-8">
        <p className="text-primary-brand">{formatDateToNo(createdAt)}</p>
        <h1>Analysis #{id}</h1>
        <p className="text-sidebar-foreground/70">
          This is a complete analysis of the uploaded DICOM files
        </p>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col gap-4 xl:min-w-96">
          <h2>CKD Stage Prediction</h2>
          <div className="flex gap-4">
            <div className="flex flex-col flex-1 bg-primary-foreground px-3 py-2 rounded-lg">
              <h3>CKD Stage</h3>
              <h2 className="text-primary-brand">
                Stage {ckdStagePrediction + 1}
              </h2>
            </div>
            <div className="flex flex-col flex-1 bg-primary-foreground px-3 py-2 rounded-lg">
              <h3>Confidence</h3>
              <h2>
                {decimalToPercentage(
                  roundListToThreeSignificantDigits([
                    probabilities[ckdStagePrediction],
                  ])[0],
                )}{" "}
                %
              </h2>
            </div>
          </div>
          <ProbabilityDistribution
            distribution={roundListToThreeSignificantDigits(probabilities)}
            prediction={ckdStagePrediction}
          />
        </div>
        <div>
          <h1>Explanation</h1>
        </div>
      </div>
    </div>
  );
}
