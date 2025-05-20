"use client";

import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { shapColorMapper } from "@/lib/utils";
import { CustomTooltip } from "@/components/custom-tooltip";

interface BarChartProps {
  shapValues: number[];
  featureNames: string[];
  prediction: string;
  barPlotHeight?: number;
}

export default function BarChartShap(props: BarChartProps) {
  const { shapValues, featureNames, prediction, barPlotHeight } = props;

  const data = featureNames.map((feature, index) => ({
    name: feature,
    shapValue: shapValues[index],
  }));

  const minX = Math.min(...data.map((d) => d.shapValue));
  const maxX = Math.max(...data.map((d) => d.shapValue));

  const buffer = (maxX - minX) * 0.1; // 10% buffer
  const adjustedMinX = minX - buffer;
  const adjustedMaxX = maxX + buffer;

  return (
    <ResponsiveContainer
      width="100%"
      height={barPlotHeight}
      className="text-xs"
    >
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 20, bottom: 20, left: 0, right: 20 }}
      >
        <XAxis
          type="number"
          label={{
            value: "Impact on Model Output",
            position: "insideBottom",
            offset: -4,
            style: { textAnchor: "middle" },
          }}
          domain={[
            Math.round(adjustedMinX * 1000) / 1000,
            Math.round(adjustedMaxX * 1000) / 1000,
          ]}
        />
        <YAxis dataKey="name" type="category" width={120} />
        <Tooltip
          content={({ active, payload, label }) => (
            <CustomTooltip
              active={active}
              payload={payload?.[0]?.value}
              label={label}
            />
          )}
        />
        <Bar dataKey="shapValue" barSize={10}>
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={shapColorMapper(entry.shapValue, prediction)}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
