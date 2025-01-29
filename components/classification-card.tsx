import {
  capitalizeFirstLetter,
  decimalToPercentage,
  roundListToThreeSignificantDigits,
} from "@/lib/utils";
import { Classification } from "@/lib/types";
import { ExplanationCard } from "@/components/explanation-card";
import ClassificationResultCard from "@/components/classification-result-card";
import RenogramChart from "@/components/renogram-chart";

interface ClassificationCardProps {
  classification: Classification;
}
export async function ClassificationCard(props: ClassificationCardProps) {
  const { classification } = props;

  return (
    <div className="flex gap-4 w-full">
        <div className="bg-white xl:min-w-96 border border-gray-100 shadow-sm rounded-md">
            <ClassificationResultCard classification={classification} />
        </div>
        <div className="bg-white xl:min-w-96 border border-gray-100 shadow-sm rounded-md">
            {classification.explanation?.map((explanation, index) => (
                <ExplanationCard explanation={explanation} key={index} />
            ))}
        </div>
    </div>
  );
}
