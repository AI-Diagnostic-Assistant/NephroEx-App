import { Explanation } from "@/lib/types";
import BarChartShap from "@/components/bar-chart-shap";
import WaterfallChartShap from "@/components/waterfall-plot";

interface ExplanationCardProps {
  explanation: Explanation;
  confidence: number;
}
export async function ExplanationCard(props: ExplanationCardProps) {
  const { explanation, confidence } = props;

  console.log(explanation, explanation);

  return (
    <div className="flex flex-col gap-4 p-4 px-3 py-2 rounded-lg ">
      <div>
        {explanation.shapValuesRenogram && (
          <div className="flex flex-wrap gap-4 w-full">
            <div className="bg-primary-foreground px-3 py-10 rounded-lg w-full">
              <BarChartShap
                shapValues={explanation.shapValuesRenogram[0]}
                featureValues={explanation.shapValuesRenogram[1]}
              />
            </div>
            <div className="bg-primary-foreground px-3 py-10 rounded-lg w-full">
              <WaterfallChartShap
                shapValues={explanation.shapValuesRenogram[0]}
                featureValues={explanation.shapValuesRenogram[1]}
                baseValue={explanation.shapValuesRenogram[2][0]}
                confidence={confidence}
              />
            </div>
          </div>
        )}
        {explanation.heatmapObjectPath}
      </div>
      <div>
        {explanation.description && (
          <div className="bg-primary-foreground px-3 py-2 rounded-lg">
            <h3>Reasoning</h3>
            <p>{explanation.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}
