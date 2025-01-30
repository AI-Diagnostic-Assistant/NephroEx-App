import {formatDateToNo} from "@/lib/utils";
import {RadixTabsList, RadixTabsTrigger} from "@/components/ui/tabs";
import React from "react";
import {Analysis} from "@/lib/types";


interface ReportHeaderProps {
    createdAt: string;
    analyses: Analysis[];
    id: number;

}
export default function AnalysisTabsHeader(props: ReportHeaderProps) {

    const {createdAt, analyses, id} = props;

    const typeMapper = (category: string): string => {
        const mapping: { [key: string]: string } = {
            image: "Image analysis",
            renogram: "Renogram analysis",
        };
        return mapping[category] || "Unknown Type";
    };

    return (
        <div className="bg-white flex items-end gap-9 mb-4 px-4 pt-20 border-b border-b-gray-100">
            <div className="flex flex-col">
                <p className="text-primary-brand">{formatDateToNo(createdAt)}</p>
                <h1>Report #{id}</h1>
            </div>
            <RadixTabsList className="-mb-px flex space-x-4 bg-transparent">
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


    )
}