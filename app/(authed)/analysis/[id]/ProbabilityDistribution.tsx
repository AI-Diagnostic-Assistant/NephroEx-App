import { Progress } from "@/components/ui/progress";
import { decimalToPercentage } from "@/lib/utils";

export default function ProbabilityDistribution({
  distribution,
  prediction,
}: {
  distribution: number[];
  prediction: number;
}) {
  return (
    <div className="flex items-center gap-8 bg-primary-foreground px-3 py-2 rounded-lg">
      <h1>{prediction + 1}</h1>
      <div className="flex-1">
        {distribution.map((value, index) => (
          <div key={value + index} className="flex items-center gap-3">
            <div className="w-10 text-center">{index + 1}</div>
            <Progress value={decimalToPercentage(value)} className="h-2" />
            <div className="w-20 text-right">
              {decimalToPercentage(value)} %
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
