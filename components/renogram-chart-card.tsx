import RenogramChart from "@/components/renogram-chart";
import React from "react";

interface RenogramChartCardProps {
    datasets: { label: string, data: number[] }[];
    title: string;
}
export default function RenogramChartCard(props: RenogramChartCardProps) {

    const { datasets, title } = props;

    return (
        <div className="bg-white xl:min-w-96 border border-gray-100 shadow-sm rounded-md p-4 flex flex-col gap-4 w-full">
            <h2>Renogram</h2>
            <p>Visual explanation of the DICOM file uploaded...</p>
            <div className="bg-primary-foreground px-3 py-2 rounded-lg w-full">
                <RenogramChart datasets={datasets} title={title}/>
            </div>
        </div>
    )
}