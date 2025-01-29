
"use client";

import {Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

interface WaterfallPlotProps {
    shapValues: number[];
}
export default function WaterfallPlot(props: WaterfallPlotProps) {

    const { shapValues } = props;

    const featureNames = [
        "Time to Peak", "Peak Value", "AUC", "Rising Slope", "Recovery Time",
        "Mean", "Variance", "Skewness", "Kurtosis"
    ];

    let cumulative = 0;
    const data = shapValues.map((value, index) => {
        cumulative += value;
        return {
            name: featureNames[index],
            cumulative,
        };
    });


    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="cumulative" stroke="#10b981" strokeWidth={2} />
            </LineChart>
        </ResponsiveContainer>
    )
}