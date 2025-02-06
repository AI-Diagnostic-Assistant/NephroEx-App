"use client";


import {Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

interface BarChartProps {
    shapValues: number[];
    featureNames: string[];
}

export default function BarChartShap(props: BarChartProps) {

    const { shapValues, featureNames } = props;

    const data = featureNames.map((feature, index) => ({
        name: feature ,
        shapValue: shapValues[index],
    }));


    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data} layout="vertical">
                <XAxis
                    type="number"
                    label={{
                        value: "SHAP Value (Impact on Model Output)",
                        position: "insideBottom",
                        offset: -4,
                        style: { textAnchor: "middle" }
                    }}
                />
                <YAxis dataKey="name"
                       type="category"
                       width={200}
                />
                <Tooltip />
                <Bar dataKey="shapValue" barSize={20}>
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.shapValue >= 0 ? "#ef4444" : "#3b82f6"} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>

    )
}