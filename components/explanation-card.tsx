import { Explanation } from "@/lib/types";
import { getSignedUrls } from "@/lib/data-access";
import HeatMaps from "@/components/HeatMaps";
import RenogramCharts from "@/components/RenogramCharts";
import HighlightedRenogramChart from "@/components/highlighted-renogram-chart";
import { generateTimeIntervals } from "@/lib/utils";

interface ExplanationCardProps {
  explanation: Explanation;
  confidence: number;
  totalActivities: number[];
  prediction: string;
}
export async function ExplanationCard(props: ExplanationCardProps) {
  const { explanation, confidence, totalActivities, prediction } = props;

  const signedUrls = await getSignedUrls(
    explanation.heatmapObjectPaths,
    "heatmaps",
  );

  const totalImagingTime = 30 * 60; // 30 minutes in seconds
  const intervalSize = 3 * 60; // 3-minute intervals in seconds
  const frameRate = 10; // 10 seconds per frame

  const { segmentLabels } = generateTimeIntervals(
    totalImagingTime,
    intervalSize,
    frameRate,
  );

  return (
    <div className="flex flex-col gap-4 py-2 rounded-lg ">
      {explanation.shapValuesRenogram && (
        <RenogramCharts
          shapValuesRenogram={explanation.shapValuesRenogram}
          confidence={confidence}
          prediction={prediction}
          featureNames={["Mean", "Variance", "Skewness", "Kurtosis"]}
        />
      )}
      {explanation.shapValuesRenogramSummed && (
        <>
          <RenogramCharts
            shapValuesRenogram={explanation.shapValuesRenogramSummed}
            confidence={confidence}
            prediction={prediction}
            featureNames={segmentLabels}
          />
          <div className="bg-primary-foreground px-3 py-10 rounded-lg w-full">
            <HighlightedRenogramChart
              shapValues={explanation.shapValuesRenogramSummed[0]}
              totalData={totalActivities}
            />
          </div>
        </>
      )}
      {signedUrls && <HeatMaps signedUrls={signedUrls} />}
      {explanation.description && (
        <div className="bg-primary-foreground px-3 py-2 rounded-lg text-foreground">
          <h3>Reasoning</h3>
          <p>{explanation.description}</p>
        </div>
      )}
    </div>
  );
}
