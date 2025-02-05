import { Explanation } from "@/lib/types";
import BarChartShap from "@/components/bar-chart-shap";
import WaterfallChartShap from "@/components/waterfall-plot";
import Image from "next/image";
import { getSignedUrls } from "@/lib/data-access";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface ExplanationCardProps {
  explanation: Explanation;
  confidence: number;
  key: number;
}
export async function ExplanationCard(props: ExplanationCardProps) {
  const { explanation, confidence, key } = props;

  console.log(explanation, explanation);

  const signedUrls = await getSignedUrls(
    explanation.heatmapObjectPaths,
    "heatmaps",
  );

  console.log("Signed urls", signedUrls);

  return (
    <div key={key} className="flex flex-col gap-4 p-4 px-3 py-2 rounded-lg ">
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
        <div className="flex gap-1 flex-wrap">
          {signedUrls?.map((signedUrl, index) => (
            <div key={signedUrl.signedUrl}>
              {signedUrls && (
                <Image
                  quality={100}
                  src={signedUrl.signedUrl}
                  width={144}
                  height={144}
                  alt="Heatmap of composite dicom image"
                  className="mx-auto"
                />
              )}
            </div>
          ))}
        </div>
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
