"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
  ReferenceLine,
  LabelList,
} from "recharts";
import { shapColorMapper } from "@/lib/utils";
import { CustomTooltip } from "@/components/custom-tooltip";

interface BarChartProps {
  shapValues: number[];
  featureValues: number[];
  baseValue: number;
  confidence: number;
  featureNames: string[];
  prediction: string;
}

export default function WaterfallChartShap(props: BarChartProps) {
  const {
    shapValues,
    featureValues,
    baseValue,
    confidence,
    featureNames,
    prediction,
  } = props;

  const sortedIndices = shapValues
    .map((value, index) => ({ index, absValue: Math.abs(value) }))
    .sort((a, b) => b.absValue - a.absValue) // Highest absolute SHAP value first
    .map((item) => item.index);

  let cumulativeValue = baseValue;
  const orderedData = [];

  for (const index of sortedIndices.reverse()) {
    const prevValue = cumulativeValue;
    cumulativeValue += shapValues[index];

    orderedData.push({
      name: `${featureValues[index]} = ${featureNames[index]}`,
      uv: shapValues[index], // Waterfall bar height
      pv: prevValue, // Base position
      shapValue: `${shapValues[index] >= 0 ? "+" : ""}${shapValues[index].toFixed(2)}`,
    });
  }

  const data = orderedData.reverse();

  const minX = Math.min(...orderedData.map((d) => d.pv), baseValue);
  const maxX = Math.max(...orderedData.map((d) => d.pv + d.uv), confidence);

  const buffer = (maxX - minX) * 0.1; // 10% buffer
  const adjustedMinX = minX - buffer;
  const adjustedMaxX = maxX + buffer;

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 20, bottom: 20, left: 20, right: 20 }}
      >
        <XAxis
          type="number"
          domain={[adjustedMinX, adjustedMaxX]}
          allowDataOverflow
        />
        <YAxis dataKey="name" type="category" width={250} />
        <Tooltip
          content={({ active, payload, label }) => (
            <CustomTooltip
              active={active}
              payload={payload?.[1]?.value}
              label={label}
            />
          )}
        />
        <Bar dataKey="pv" stackId="a" fill="transparent" />
        <Bar dataKey="uv" stackId="a" barSize={20}>
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={shapColorMapper(entry.uv, prediction)}
            />
          ))}
          <LabelList
            dataKey="shapValue"
            position="inside"
            fill="white"
            fontSize={12}
          />
        </Bar>
        <ReferenceLine
          x={baseValue}
          stroke="black"
          strokeDasharray="3 3"
          label={{
            value: `E[f(x)] = ${baseValue.toFixed(2)}`,
            position: "top",
          }}
        />
        <ReferenceLine
          x={confidence}
          stroke="black"
          strokeDasharray="4 4"
          label={{
            value: `f(x) = ${confidence.toFixed(2)}`,
            position: "middle",
          }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
