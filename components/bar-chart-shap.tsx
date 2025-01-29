"use client";


import {Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

interface BarChartProps {
    shapValues: number[];

}


export default function BarChartShap(props: BarChartProps) {

    const featureNames = [
        "Time to Peak", "Peak Value", "AUC", "Rising Slope", "Recovery Time",
        "Mean", "Variance", "Skewness", "Kurtosis"
    ];

    const { shapValues } = props;

    const data = featureNames.map((feature, index) => ({
        name: feature,
        shapValue: shapValues[index],
    }));


    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data} layout="vertical">
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={200} />
                <Tooltip />
                <Bar dataKey="shapValue" fill="#3b82f6" barSize={20} />
            </BarChart>
        </ResponsiveContainer>

    )


}