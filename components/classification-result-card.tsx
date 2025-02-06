import { Classification } from "@/lib/types";
import { capitalizeFirstLetter, decimalToPercentage } from "@/lib/utils";
import PatientInfo from "@/components/PatientInfo";

interface ClassificationResultCardProps {
  classification: Classification;
}
export default async function ClassificationResultCard(
  props: ClassificationResultCardProps,
) {
  const { classification } = props;

  return (
    <div className="bg-white p-4 flex flex-col gap-4 xl:min-w-96 border border-gray-100 shadow-sm rounded-md">
      <div className="flex flex-col">
        <h2>Classification Result</h2>
        <p className="text-xs text-gray-400">
          {" "}
          Analysis of kidney function based on DICOM images uploaded.
        </p>
      </div>
      <div className="flex gap-4">
        <div className="flex flex-col flex-1 bg-primary-foreground px-3 py-2 rounded-lg">
          <h3>CKD status</h3>
          <h2 className="text-primary-brand">
            {capitalizeFirstLetter(classification.prediction)}
          </h2>
        </div>
        <div className="flex flex-col flex-1 bg-primary-foreground px-3 py-2 rounded-lg">
          <h3>Confidence</h3>
          <h2>{decimalToPercentage(classification.confidence)} %</h2>
        </div>
      </div>
      <PatientInfo />
    </div>
  );
}
