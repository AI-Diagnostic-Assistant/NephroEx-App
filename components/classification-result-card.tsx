import { Classification } from "@/lib/types";
import {
  capitalizeFirstLetter,
  cn,
  decimalToPercentage,
  predictionColorMapper,
} from "@/lib/utils";
import PatientInfo from "@/components/PatientInfo";
import { Badge } from "@/components/ui/badge";
import { Dna } from "lucide-react";
import ModuleCard from "@/components/module-card";

interface ClassificationResultCardProps {
  classification: Classification;
}
export default async function ClassificationResultCard(
  props: ClassificationResultCardProps,
) {
  const { classification } = props;

  return (
    <ModuleCard
      title="Classification Result"
      description="Analysis of kidney function based on DICOM images uploaded."
      icon={<Dna className="text-primary-brand" />}
      badge={
        <Badge variant="outline" className="h-min">
          {decimalToPercentage(classification.confidence)}% Confidence
        </Badge>
      }
      className="xl:min-w-[400px] rounded-tl-none"
    >
      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="flex flex-col flex-1 bg-primary-foreground px-3 py-2 rounded-lg">
            <h3>CKD status</h3>
            <h2
              className={cn(
                "text-primary-brand",
                predictionColorMapper(classification.prediction),
              )}
            >
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
    </ModuleCard>
  );
}
