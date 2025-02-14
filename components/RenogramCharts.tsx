import BarChartShap from "@/components/bar-chart-shap";
import WaterfallChartShap from "@/components/waterfall-plot";

type RenogramChartProps = {
  shapValuesRenogram: number[][];
  confidence: number;
  featureNames: string[];
  prediction: string;
};

export default function RenogramCharts(props: RenogramChartProps) {
  const { shapValuesRenogram, confidence, featureNames, prediction } = props;

  console.log("conf", confidence);

  return (
    <div className="flex flex-wrap gap-4 w-full">
      <div className="bg-primary-foreground px-3 py-10 rounded-lg w-full">
        <BarChartShap
          shapValues={shapValuesRenogram[0]}
          featureNames={featureNames}
          prediction={prediction}
        />
      </div>
      <div className="bg-primary-foreground px-3 py-10 rounded-lg w-full">
        <WaterfallChartShap
          shapValues={shapValuesRenogram[0]}
          featureValues={shapValuesRenogram[1]}
          baseValue={shapValuesRenogram[2][0]}
          confidence={confidence}
          prediction={prediction}
          featureNames={featureNames}
        />
      </div>
    </div>
  );
}
