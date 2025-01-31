import { Explanation } from "@/lib/types";
import { getPublicUrl } from "@/lib/data-access/utils";
import Image from "next/image";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default async function HeatMapCard({
  explanation,
}: {
  explanation: Explanation;
}) {
  const publicUrl = await getPublicUrl(
    explanation.heatmapObjectPath,
    "heatmaps",
  );

  return (
    <div className="flex flex-col gap-4 bg-white border border-gray-100 shadow-sm rounded-md p-4">
      <div className="flex flex-col">
        <h2>Heat Map</h2>
        <p className="text-gray-500 text-sm">
          Visual explanation of the DICOM file uploaded. The image below is the
          summed image from the entire DICOM sequence. A heatmap overlay
          represents the area of interest chosen by the AI
        </p>
      </div>
      {publicUrl ? (
        <div className="bg-primary-foreground w-full rounded-lg p-3">
          <Image
            quality={100}
            src={publicUrl}
            width={500}
            height={500}
            alt="Heatmap of composite dicom image"
            className="mx-auto"
          />
        </div>
      ) : (
        <Alert variant="destructive" className="max-w-96">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            No heatmap found for this analysis.
          </AlertDescription>
        </Alert>
      )}
      {explanation.description && (
        <div className="bg-primary-foreground px-3 py-2 rounded-lg">
          <h3>Reasoning</h3>
          <p>{explanation.description}</p>
        </div>
      )}
    </div>
  );
}
