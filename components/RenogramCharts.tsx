import BarChartShap from "@/components/bar-chart-shap";
import WaterfallChartShap from "@/components/waterfall-plot";

type Props = {
  shapValuesRenogram: number[][];
  confidence: number;
};

export default function RenogramCharts({
  shapValuesRenogram,
  confidence,
}: Props) {
  return (
    <div className="flex flex-wrap gap-4 w-full">
      <div className="bg-primary-foreground px-3 py-10 rounded-lg w-full">
        <BarChartShap
          shapValues={shapValuesRenogram[0]}
          featureValues={shapValuesRenogram[1]}
        />
      </div>
      <div className="bg-primary-foreground px-3 py-10 rounded-lg w-full">
        <WaterfallChartShap
          shapValues={shapValuesRenogram[0]}
          featureValues={shapValuesRenogram[1]}
          baseValue={shapValuesRenogram[2][0]}
          confidence={confidence}
        />
      </div>
    </div>
  );
}
