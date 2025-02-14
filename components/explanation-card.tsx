import { Explanation } from "@/lib/types";
import { getSignedUrls } from "@/lib/data-access";
import HeatMaps from "@/components/HeatMaps";
import RenogramCharts from "@/components/RenogramCharts";
import HighlightedRenogramChart from "@/components/highlighted-renogram-chart";

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
            featureNames={[
              "Group 1",
              "Group 2",
              "Group 3",
              "Group 4",
              "Group 5",
              "Group 6",
              "Group 7",
              "Group 8",
              "Group 9",
              "Group 10",
            ]}
          />
          <HighlightedRenogramChart
            shapValues={explanation.shapValuesRenogramSummed[0]}
            totalData={totalActivities}
          />
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
