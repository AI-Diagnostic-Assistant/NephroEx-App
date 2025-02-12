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

interface BarChartProps {
  shapValues: number[];
  featureValues: number[];
  baseValue: number;
  confidence: number;
  featureNames: string[];
}

export default function WaterfallChartShap(props: BarChartProps) {
  const { shapValues, featureValues, baseValue, confidence, featureNames } =
    props;

  // Sort indices by absolute SHAP values in descending order (largest SHAP effect at top)
  const sortedIndices = shapValues
    .map((value, index) => ({ index, absValue: Math.abs(value) }))
    .sort((a, b) => b.absValue - a.absValue) // Highest absolute SHAP value first
    .map((item) => item.index);

  // Compute cumulative values **in increasing order of absolute SHAP values**
  let cumulativeValue = baseValue;
  const orderedData = []; // Temporary array to store correctly ordered values

  for (const index of sortedIndices.reverse()) {
    // Reverse so that smallest SHAP starts first
    const prevValue = cumulativeValue;
    cumulativeValue += shapValues[index];

    orderedData.push({
      name: `${featureValues[index]} = ${featureNames[index]}`,
      uv: shapValues[index], // Waterfall bar height
      pv: prevValue, // Base position
      shapValue: `${shapValues[index] >= 0 ? "+" : ""}${shapValues[index].toFixed(2)}`,
    });
  }

  // Reverse back so that largest SHAP is displayed at the top
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
        <Tooltip />
        <Bar dataKey="pv" stackId="a" fill="transparent" />
        <Bar dataKey="uv" stackId="a" barSize={20}>
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.uv >= 0 ? "#ef4444" : "#3b82f6"}
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
