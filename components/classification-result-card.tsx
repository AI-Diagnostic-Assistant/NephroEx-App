import { Analysis, Classification } from "@/lib/types";
import { Dna } from "lucide-react";
import ModuleCard from "@/components/module-card";
import ObstructionCard from "@/components/ObstructionCard";
import { classificationDescriptionMapper } from "@/lib/utils";

interface ClassificationResultCardProps {
  analysis: Analysis;
}
export default async function ClassificationResultCard(
  props: ClassificationResultCardProps,
) {
  const { analysis } = props;

  return (
    <ModuleCard
      title="Classification Result"
      description={classificationDescriptionMapper(analysis.category)}
      icon={<Dna className="text-primary-brand" />}
      className="xl:min-w-[400px] w-full"
    >
      <div className="space-y-4">
        <div className="flex gap-4">
          {analysis.classification.map((classification: Classification) => (
            <ObstructionCard
              key={classification.id}
              classification={classification}
            />
          ))}
        </div>
      </div>
    </ModuleCard>
  );
}
