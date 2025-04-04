import { formatDateToNo, typeMapper } from "@/lib/utils";
import { RadixTabsList, RadixTabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { Analysis } from "@/lib/types";

interface ReportHeaderProps {
  createdAt: string;
  analyses: Analysis[];
  id: number;
}
export default function AnalysisTabsHeader(props: ReportHeaderProps) {
  const { createdAt, analyses, id } = props;

  return (
    <div className="bg-white flex items-end gap-9 mb-4 px-4 pt-6 shadow-sm sticky z-50 top-0">
      <div className="flex flex-col">
        <p className="text-muted-foreground">{formatDateToNo(createdAt)}</p>
        <h1>Report #{id}</h1>
      </div>
      <RadixTabsList className="flex space-x-4 bg-transparent">
        {analyses.map((analysis: Analysis) => (
          <RadixTabsTrigger
            key={analysis.id}
            value={analysis.category}
            className="px-4 py-5"
          >
            {typeMapper(analysis.category)}
          </RadixTabsTrigger>
        ))}
      </RadixTabsList>
    </div>
  );
}
