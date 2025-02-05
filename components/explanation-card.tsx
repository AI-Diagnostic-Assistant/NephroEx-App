import { Explanation } from "@/lib/types";
import { getSignedUrls } from "@/lib/data-access";
import HeatMaps from "@/components/HeatMaps";
import RenogramCharts from "@/components/RenogramCharts";

interface ExplanationCardProps {
  explanation: Explanation;
  confidence: number;
  key: number;
}
export async function ExplanationCard(props: ExplanationCardProps) {
  const { explanation, confidence, key } = props;

  const signedUrls = await getSignedUrls(
    explanation.heatmapObjectPaths,
    "heatmaps",
  );

  return (
    <div key={key} className="flex flex-col gap-4 p-4 px-3 py-2 rounded-lg ">
      {explanation.shapValuesRenogram && (
        <RenogramCharts
          shapValuesRenogram={explanation.shapValuesRenogram}
          confidence={confidence}
        />
      )}
      {signedUrls && <HeatMaps signedUrls={signedUrls} />}
      {explanation.description && (
        <div className="bg-primary-foreground px-3 py-2 rounded-lg">
          <h3>Reasoning</h3>
          <p>{explanation.description}</p>
        </div>
      )}
    </div>
  );
}
