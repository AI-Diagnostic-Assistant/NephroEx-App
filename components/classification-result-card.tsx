import { Classification } from "@/lib/types";
import { capitalizeFirstLetter, cn, decimalToPercentage } from "@/lib/utils";
import PatientInfo from "@/components/PatientInfo";
import { Badge } from "@/components/ui/badge";
import { Dna } from "lucide-react";

interface ClassificationResultCardProps {
  classification: Classification;
  className?: string;
}
export default async function ClassificationResultCard(
  props: ClassificationResultCardProps,
) {
  const { classification, className } = props;

  return (
    <div
      className={cn(
        "bg-white p-4 flex flex-col gap-4 xl:min-w-[400px] border rounded-md",
        className,
      )}
    >
      <div className="flex flex-col">
        <div className="flex gap-1">
          <Dna className="text-primary-brand" />
          <div className="flex justify-between w-full items-center">
            <h2>Classification Result</h2>
            <Badge variant="outline" className="h-min">
              {decimalToPercentage(classification.confidence)}% Confidence
            </Badge>
          </div>
        </div>
        <p className="text-muted-foreground">
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
