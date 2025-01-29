import RenogramChart from "@/components/renogram-chart";
import {Explanation} from "@/lib/types";
import BarChartShap from "@/components/bar-chart-shap";
import WaterfallPlot from "@/components/waterfall-plot";

interface ExplanationCardProps {
    explanation: Explanation;
}
export async function ExplanationCard(props: ExplanationCardProps) {

    const { explanation } = props

    return (
        <div className="flex flex-col gap-4 p-4">
            <div className="flex flex-col">
                <h2>Explanation</h2>
                <p> The charts show the importance distribution of the features. This is what the model used to base its decision on.</p>
            </div>
            <div>
                {explanation.shapValuesCurve && (
                    <div className="flex flex-wrap">
                        <div className="w-1/2">
                            <BarChartShap shapValues={explanation.shapValuesCurve}/>
                        </div>
                        <div className="w-1/2">
                            <WaterfallPlot shapValues={explanation.shapValuesCurve}/>
                        </div>
                    </div>

                )}
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
    )
}