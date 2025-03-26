import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InfoIcon, ShieldAlert, ShieldCheck } from "lucide-react";
import { Classification } from "@/lib/types";
import { cn, decimalToPercentage } from "@/lib/utils";

type Props = {
  classification: Classification;
};

const predictionColorMapper = (prediction: string): string => {
  const mapping: { [key: string]: string } = {
    healthy: "text-primary-green",
    sick: "text-red-500",
  };
  return mapping[prediction] || "text-primary-brand";
};

const predictionMapper = (prediction: string): boolean => {
  return prediction === "healthy";
};

const isLeftKidney = (kidneyLabel: string | null): boolean => {
  return kidneyLabel === "left";
};

export default function ObstructionCard({ classification }: Props) {
  const { prediction, confidence, kidneyLabel } = classification;
  return (
    <Card className="shadow-none w-full min-w-[400px]">
      <CardContent className="p-4 flex flex-col gap-3">
        <div className="flex justify-between">
          {isLeftKidney(kidneyLabel) ? (
            <Badge variant="left" className="h-min border-none">
              LEFT KIDNEY
            </Badge>
          ) : (
            <Badge variant="right" className="h-min border-none">
              RIGHT KIDNEY
            </Badge>
          )}
          {predictionMapper(prediction) ? (
            <ShieldCheck className="text-primary-green" />
          ) : (
            <ShieldAlert className="text-red-500" />
          )}
        </div>
        <div className="flex justify-between items-center">
          <h2
            className={cn(
              "text-2xl font-semibold",
              predictionColorMapper(prediction),
            )}
          >
            Obstructed
          </h2>
          <div className="flex flex-col items-end">
            <p className="text-muted-foreground">Confidence</p>
            <h4 className="text-lg font-semibold">
              {decimalToPercentage(confidence)} %
            </h4>
          </div>
        </div>
        <div className="flex gap-x-2.5 items-center pt-3 border-t">
          <InfoIcon size={12} />
          {predictionMapper(prediction) ? (
            <p className="text-muted-foreground text-xs">
              No signs of urinary tract obstruction detected
            </p>
          ) : (
            <p className="text-muted-foreground text-xs">
              AI detected patterns consistent with urinary tract obstruction
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
