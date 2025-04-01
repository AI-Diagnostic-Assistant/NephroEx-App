import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InfoIcon, ShieldAlert, ShieldCheck } from "lucide-react";
import { Classification } from "@/lib/types";
import { decimalToPercentage, isLeftKidney } from "@/lib/utils";
import { JSX } from "react";

type Props = {
  classification: Classification;
};

type KidneyStatus = {
  title: string;
  message: string;
  icon: JSX.Element;
  textColor: string;
};

const getKidneyStatus = (prediction: string): KidneyStatus => {
  const isHealthy = prediction === "healthy";
  return {
    title: isHealthy ? "Normal" : "Obstructed",
    message: isHealthy
      ? "No signs of urinary tract obstruction detected"
      : "AI detected patterns consistent with urinary tract obstruction",
    icon: isHealthy ? (
      <ShieldCheck className="text-primary-green" />
    ) : (
      <ShieldAlert className="text-red-500" />
    ),
    textColor: isHealthy ? "text-primary-green" : "text-red-500",
  };
};

export default function ObstructionCard({ classification }: Props) {
  const { prediction, confidence, kidneyLabel } = classification;
  const status = getKidneyStatus(prediction);
  return (
    <Card className="border-gray-100 w-full rounded-lg">
      <CardContent className="p-4 flex flex-col gap-3">
        <div className="flex justify-between">
          <Badge
            variant={isLeftKidney(kidneyLabel) ? "left" : "right"}
            className="h-min border-none font-medium"
          >
            {isLeftKidney(kidneyLabel) ? "LEFT" : "RIGHT"} KIDNEY
          </Badge>
          {status.icon}
        </div>

        <div className="flex justify-between items-center">
          <h2 className={status.textColor}>{status.title}</h2>
          <div className="flex flex-col items-end">
            <p className="text-muted-foreground">Confidence</p>
            <h4 className="text-lg font-semibold">
              {decimalToPercentage(confidence)} %
            </h4>
          </div>
        </div>

        <div className="flex gap-x-2.5 items-center pt-3 border-t">
          <InfoIcon size={12} />
          <p className="text-muted-foreground text-xs">{status.message}</p>
        </div>
      </CardContent>
    </Card>
  );
}
