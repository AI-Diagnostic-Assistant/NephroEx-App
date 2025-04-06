"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine,
} from "recharts";
import { getDiureticTiming } from "@/lib/data-access";
import useSWR from "swr";
import { useParams } from "next/navigation";
import React from "react";

interface RenogramChartProps {
  datasets: { label: string; data: number[] }[];
  title: string;
}

function formatTime(minutes: number): string {
  const mins = Math.floor(minutes);
  const secs = Math.round((minutes - mins) * 60);
  return `${mins}m ${secs}s`;
}

export default function RenogramChart({ datasets }: RenogramChartProps) {
  const params = useParams();
  const reportId = params.id;
  const maxLength = Math.max(...datasets.map((d) => d.data.length));
  const chartData = Array.from({ length: maxLength }, (_, index) => {
    const minutes = ((index + 1) * 10) / 60;
    const dataPoint: any = { time: minutes };
    datasets.forEach((dataset) => {
      dataPoint[dataset.label] = dataset.data[index] || 0;
    });
    return dataPoint;
  });

  const peakIndices = datasets.map((dataset) =>
    dataset.data.findIndex((value) => value === Math.max(...dataset.data)),
  );

  const { data } = useSWR(
    reportId ? ["/report/", reportId] : null,
    ([_, reportId]) => getDiureticTiming(Number(reportId)),
  );

  return (
    <div style={{ width: "100%", height: 550 }} className="text-xs">
      <ResponsiveContainer>
        <LineChart data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="time"
            label={{
              value: "Time (minutes)",
              position: "insideBottomRight",
              offset: -5,
            }}
          />
          <YAxis
            label={{
              value: "Counts/sec",
              angle: -90,
              position: "insideLeft",
            }}
            tickCount={10} // Increase number of ticks
          />

          <Tooltip labelFormatter={formatTime} />
          <Legend />
          {data && (
            <ReferenceLine
              x={data.diureticTiming}
              stroke="#EF4444"
              label={{
                value: `Diuretic Injection`,
                position: "insideTopLeft",
                fill: "#e01111",
              }}
              strokeDasharray="3 3"
            />
          )}
          {datasets.map((dataset, index) => {
            return (
              <Line
                key={index}
                type="monotone"
                dataKey={dataset.label}
                stroke={index === 0 ? "#0e3893" : "#e36e0d"}
                strokeWidth={2}
                dot={(props) => {
                  const { index: dataIndex, cx, cy } = props;
                  if (dataIndex === peakIndices[index]) {
                    return (
                      <circle
                        cx={cx}
                        cy={cy}
                        r={6}
                        fill={index === 0 ? "#0e3893" : "#e36e0d"}
                        stroke="#fff"
                        strokeWidth={2}
                      />
                    );
                  }
                }}
              />
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
