import BarChartShap from "@/components/bar-chart-shap";
import WaterfallChartShap from "@/components/waterfall-plot";
import ExplanationModule from "@/components/explanation-module";
import { ChartLine } from "lucide-react";

type RenogramChartProps = {
  shapValuesRenogram: number[][];
  confidence: number;
  featureNames: string[];
  prediction: string;
  barPlotHeight?: number;
  waterfallPlotHeight?: number;
};

export default function RenogramCharts(props: RenogramChartProps) {
  const {
    shapValuesRenogram,
    confidence,
    featureNames,
    prediction,
    barPlotHeight,
    waterfallPlotHeight,
  } = props;

  return (
    <div className="flex flex-col gap-4 w-full">
      <ExplanationModule
        title="Bar Plot"
        description="The bar plot shows the impact of each feature on the model's prediction."
        icon={<ChartLine className="text-primary-brand" />}
      >
        <BarChartShap
          shapValues={shapValuesRenogram[0]}
          featureNames={featureNames}
          prediction={prediction}
          barPlotHeight={barPlotHeight}
        />
      </ExplanationModule>
      <ExplanationModule
        title="Waterfall Chart"
        description="The waterfall chart shows the contribution of each feature to the model's prediction."
        icon={<ChartLine className="text-primary-brand" />}
      >
        <WaterfallChartShap
          shapValues={shapValuesRenogram[0]}
          featureValues={shapValuesRenogram[1]}
          baseValue={shapValuesRenogram[2][0]}
          confidence={confidence}
          prediction={prediction}
          featureNames={featureNames}
          waterfallPlotHeight={waterfallPlotHeight}
        />
      </ExplanationModule>
    </div>
  );
}
