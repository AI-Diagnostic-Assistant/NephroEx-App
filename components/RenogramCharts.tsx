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
        description="This bar plot provides a clear visualization of how each input feature influences the model’s prediction. The length of each bar quantifies the magnitude of the feature’s impact, making it easy to compare the relative importance of different features."
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
        description="This waterfall chart breaks down the prediction process by showing the incremental contribution of each feature. It clearly illustrates how positive and negative effects of individual features combine to form the final prediction, offering a step-by-step view of the model’s decision-making process."
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
