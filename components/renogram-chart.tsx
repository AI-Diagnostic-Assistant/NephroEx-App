"use client";

import {LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid} from 'recharts';

interface RenogramChartProps {
    datasets: { label: string; data: number[] }[];
    title: string;
}

export default function RenogramChart({ datasets }: RenogramChartProps) {

    const maxLength = Math.max(...datasets.map((d) => d.data.length));
    const chartData = Array.from({ length: maxLength }, (_, index) => {
        const dataPoint: any = { time: index + 1 };
        datasets.forEach((dataset) => {
            dataPoint[dataset.label] = dataset.data[index] || 0;
        });
        return dataPoint;
    });

    return (
        <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
                <LineChart data={chartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="frame"
                        label={{ value: 'Frames', position: 'insideBottom', offset: -5 }}
                        interval={15}
                    />
                    <YAxis label={{ value: 'Activity', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    {datasets.map((dataset, index) => (
                        <Line
                            key={index}
                            type="monotone"
                            dataKey={dataset.label}
                            stroke={`rgba(${75 + index * 50}, ${192 - index * 50}, ${192}, 1)`}
                            strokeWidth={2}
                            dot={false}
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
