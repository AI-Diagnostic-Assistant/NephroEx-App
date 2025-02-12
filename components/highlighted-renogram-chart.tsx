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

interface HighlightedRenogramChartProps {
  totalData: number[];
  shapValues: number[];
}

export default function HighlightedRenogramChart({
  totalData,
  shapValues,
}: HighlightedRenogramChartProps) {
  const maxShap = Math.max(...shapValues);
  const minShap = Math.min(...shapValues);
  const normalizedShap = shapValues.map(
    (val) => (val - minShap) / (maxShap - minShap),
  );

  const getHeatmapColor = (normalizedValue: number) =>
    d3.interpolateWarm(1 - normalizedValue);

  const segmentSize = 18; // Each SHAP value represents 18 frames
  const segmentStartFrames = shapValues.map(
    (_, index) => index * segmentSize + 1,
  ); // Start of each segment

  const segmentLabelPositions = segmentStartFrames.map(
    (frame) => frame + segmentSize / 2,
  );

  const lineSegments = shapValues.map((_, segmentIndex) => {
    const start = segmentIndex * segmentSize;
    const end = Math.min(start + segmentSize, totalData.length);
    const segmentColor = getHeatmapColor(normalizedShap[segmentIndex]);

    const segmentData = totalData.slice(start, end).map((value, index) => ({
      frame: start + index + 1,
      value,
    }));

    if (end < totalData.length) {
      segmentData.push({
        frame: end + 1,
        value: totalData[end],
      });
    }

    return {
      data: segmentData,
      color: segmentColor,
      key: `segment-${segmentIndex}`,
    };
  });

  return (
    <div style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer>
        <LineChart>
          <CartesianGrid vertical={false} />
          <XAxis
            type="number"
            dataKey="frame"
            domain={[1, totalData.length]}
            label={{ value: "Frames", position: "insideBottom", offset: -5 }}
            ticks={segmentLabelPositions} // Centered tick positions
            tickFormatter={(value) => {
              const groupIndex = segmentLabelPositions.indexOf(value);
              return groupIndex !== -1 ? `Group ${groupIndex + 1}` : "";
            }}
          />
          <YAxis
            label={{ value: "Activity", angle: -90, position: "insideLeft" }}
          />
          {segmentStartFrames.map((frame) => (
            <ReferenceLine
              key={`ref-${frame}`}
              x={frame}
              stroke="gray"
              strokeDasharray="3 3"
            />
          ))}
          {lineSegments.map(({ data, color, key }) => (
            <Line
              key={key}
              type="monotone"
              data={data}
              dataKey="value"
              stroke={color}
              strokeWidth={3}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
