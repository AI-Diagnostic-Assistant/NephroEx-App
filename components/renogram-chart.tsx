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

interface DiureticTimingResponse {
  diureticTiming: number;
}

interface RenogramChartProps {
  interpolatedRenograms: { label: string; data: number[] }[];
  interpolatedSmoothedRenograms: { label: string; data: number[] }[];
  timeVector: number[];
  title: string;
}

function formatTime(minutes: number): string {
  const mins = Math.floor(minutes);
  const secs = Math.round((minutes - mins) * 60);
  return `${mins}m ${secs}s`;
}

export default function RenogramChart(props: RenogramChartProps) {
  const { interpolatedRenograms, interpolatedSmoothedRenograms, timeVector } =
    props;

  const params = useParams();
  const reportId = params.id;

  const { data } = useSWR<DiureticTimingResponse | null, Error>(
    reportId ? ["/report/", reportId] : null,
    ([, reportId]) => getDiureticTiming(Number(reportId)),
  );

  const times = timeVector.map((t) =>
    typeof t === "string" ? parseFloat(t) : t,
  );

  const minTime = Math.min(...times);
  const maxTime = Math.max(...times);

  // build ticks at every 2 minutes, rounding end points
  const ticks: number[] = [];
  for (let t = Math.ceil(minTime); t <= Math.floor(maxTime); t += 2) {
    ticks.push(t);
  }

  const chartData = timeVector.map((t, i) => {
    const row: any = { time: t };
    [...interpolatedRenograms, ...interpolatedSmoothedRenograms].forEach(
      (ds) => {
        row[ds.label] = ds.data[i] ?? 0;
      },
    );
    return row;
  });

  const peakIndices = interpolatedRenograms.map((dataset) =>
    dataset.data.findIndex((value) => value === Math.max(...dataset.data)),
  );

  return (
    <div style={{ width: "100%", height: 550 }} className="text-xs">
      <ResponsiveContainer>
        <LineChart data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="time"
            type="number"
            domain={["dataMin", "dataMax"]}
            label={{
              value: "Time (minutes)",
              position: "insideBottomRight",
              offset: -5,
            }}
            tickFormatter={formatTime}
            ticks={ticks}
          />
          <YAxis
            label={{
              value: "Counts/sec",
              angle: -90,
              position: "insideLeft",
            }}
            tickCount={10} // Increase number of ticks
          />

          <Tooltip
            labelFormatter={formatTime}
            formatter={(value: number, name: string) => {
              // only show names that include “smoothed”
              if (!name.toLowerCase().includes("raw")) {
                return [value, name];
              }
              // otherwise return [displayedValue, displayedName]
              return [];
            }}
          />
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
          {interpolatedRenograms.map((dataset, index) => {
            return (
              <Line
                key={index}
                type="monotone"
                dataKey={dataset.label}
                stroke={"#000000"}
                strokeWidth={1.5}
                legendType="none"
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
          {interpolatedSmoothedRenograms.map((ds) => (
            <Line
              key={ds.label}
              type="monotone"
              dataKey={ds.label}
              stroke={ds.label === "Left Kidney-BKG" ? "#0e3893" : "#e36e0d"}
              strokeWidth={2}
              dot={false}
              opacity={0.7}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
