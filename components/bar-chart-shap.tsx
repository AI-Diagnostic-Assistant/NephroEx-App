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

interface BarChartProps {
  shapValues: number[];
  featureNames: string[];
  prediction: string;
}

export default function BarChartShap(props: BarChartProps) {
  const { shapValues, featureNames, prediction } = props;

  const data = featureNames.map((feature, index) => ({
    name: feature,
    shapValue: shapValues[index],
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} layout="vertical" margin={{ top: 20, bottom: 20, left: 20, right: 20 }}>
        <XAxis
          type="number"
          label={{
            value: "SHAP Value (Impact on Model Output)",
            position: "insideBottom",
            offset: -4,
            style: { textAnchor: "middle" },
          }}
        />
        <YAxis dataKey="name" type="category" width={200} />
        <Tooltip />
        <Bar dataKey="shapValue" barSize={20}>
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
