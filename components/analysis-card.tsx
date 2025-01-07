"use client";

import { Analysis } from "@/lib/types";

type AnalysisCardProps = {
  analysis: Analysis;
};
export default function AnalysisCard(props: AnalysisCardProps) {
  const { analysis } = props;

  const formattedDate = new Date(analysis.createdAt).toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    },
  );

  return (
    <a
      href={`/analysis/${analysis.id}`}
      className="flex justify-between w-full"
    >
      <p> Stage {analysis.ckdStagePrediction} </p>
      <p className="text-gray-700"> {formattedDate}</p>
    </a>
  );
}
