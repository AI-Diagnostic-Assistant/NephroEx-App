"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine,
} from "recharts";
import * as d3 from "d3";
import ExplanationModule from "@/components/explanation-module";
import { ChartLine } from "lucide-react";

interface HighlightedRenogramChartProps {
  interpolatedSmoothedRenogram: number[];
  shapValues: number[];
  timeVector: number[];
  timeBins: string[];
  predictedClass: "sick" | "healthy";
}

export default function HighlightedRenogramChart({
  interpolatedSmoothedRenogram,
  shapValues,
  timeVector,
  timeBins,
  predictedClass,
}: HighlightedRenogramChartProps) {
  // compute signed SHAP extent
  const maxShap = Math.max(...shapValues);
  const minShap = Math.min(...shapValues);
  const maxMag = Math.max(Math.abs(minShap), Math.abs(maxShap));

  // static colors
  const healthyColor = "green";
  const sickColor = "red";
  const neutralColor = "#e0e0e0"; // light grey for zero

  // map positive/negative to green/red based on predicted class
  const posColor = predictedClass === "healthy" ? healthyColor : sickColor;
  const negColor = predictedClass === "healthy" ? sickColor : healthyColor;

  const colorScale = d3
    .scaleLinear<string>()
    .domain([-maxMag, 0, maxMag])
    .range([negColor, neutralColor, posColor]);

  const numericBins = timeBins.map((lbl) => {
    const [from, to] = lbl.split("–").map((s) => parseFloat(s));
    return [from, to] as [number, number];
  });
  const binMids = numericBins.map(([s, e]) => (s + e) / 2);

  const boundaries = Array.from(
    new Set(numericBins.flatMap(([start, end]) => [start, end])),
  ).sort((a, b) => a - b);

  // Build one line‐segment per bin
  const segments = numericBins.map(([start, end], idx) => {
    const color = colorScale(shapValues[idx]);
    // pick only those points whose timeVector is in [start,end)
    const data = timeVector
      .map((t, i) =>
        t >= start && t < end
          ? { time: t, value: interpolatedSmoothedRenogram[i] }
          : null,
      )
      .filter((pt): pt is { time: number; value: number } => pt !== null);

    return {
      key: `seg-${idx}`,
      data,
      color,
    };
  });

  return (
    <ExplanationModule
      title="Highlighted Renogram"
      description="Renogram curve with 2-minute segments colored by SHAP importance (warm→high)."
      icon={<ChartLine className="text-primary-brand" />}
    >
      <div className="flex items-center">
        <div className="flex flex-col items-center mr-4 text-xs">
          <span>↑ Pushes towards {predictedClass}</span>
          <svg width={20} height={150}>
            <defs>
              <linearGradient id="divergeScale" x1="0" x2="0" y1="1" y2="0">
                {[-maxMag, 0, maxMag].map((d, i, arr) => (
                  <stop
                    key={i}
                    offset={`${(i / (arr.length - 1)) * 100}%`}
                    stopColor={colorScale(d)}
                  />
                ))}
              </linearGradient>
            </defs>
            <rect width="20" height="150" fill="url(#divergeScale)" />
          </svg>
          <span>↓ Pushes away from {predictedClass}</span>
        </div>

        <div style={{ width: "100%", height: 400 }} className="text-xs">
          <ResponsiveContainer>
            <LineChart margin={{ top: 20, bottom: 30, left: 20, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />

              <XAxis
                dataKey="time"
                type="number"
                domain={["dataMin", "dataMax"]}
                ticks={binMids}
                tickFormatter={(val) => {
                  const idx = binMids.indexOf(val as number);
                  return idx >= 0 ? String(timeBins[idx]) : "";
                }}
                label={{
                  value: "Time (minutes)",
                  position: "insideBottom",
                  offset: -5,
                }}
              />
              <YAxis
                label={{
                  value: "Counts/sec",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              {boundaries.map((b) => (
                <ReferenceLine
                  key={`ref-${b}`}
                  x={b}
                  stroke="#888"
                  strokeDasharray="3 3"
                />
              ))}

              {segments.map(({ key, data, color }) => (
                <Line
                  key={key}
                  type="monotone"
                  data={data}
                  dataKey="value"
                  stroke={color}
                  strokeWidth={3}
                  dot={false}
                  isAnimationActive={false}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </ExplanationModule>
  );
}
