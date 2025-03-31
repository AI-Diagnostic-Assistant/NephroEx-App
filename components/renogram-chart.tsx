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

  const { data } = useSWR(
    reportId ? ["/report/", reportId] : null,
    ([_, reportId]) => getDiureticTiming(Number(reportId)),
  );

  return (
    <div style={{ width: "100%", height: 400 }}>
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
            label={{ value: "Activity", angle: -90, position: "insideLeft" }}
          />
          <Tooltip labelFormatter={formatTime} />
          <Legend />
          {data && (
            <ReferenceLine
              x={data.diureticTiming}
              stroke="#EF4444"
              label={{
                value: `Diuretic at ${data.diureticTiming}m`,
                position: "insideTopLeft",
                fill: "#EF4444",
              }}
            />
          )}
          {datasets.map((dataset, index) => (
            <Line
              key={index}
              type="monotone"
              dataKey={dataset.label}
              stroke={index === 0 ? "#2563EB" : "#4F46E5"}
              strokeWidth={2}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
