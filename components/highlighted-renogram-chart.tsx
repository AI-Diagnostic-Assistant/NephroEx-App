"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine, Tooltip,
} from "recharts";
import * as d3 from "d3";
import {generateTimeIntervals} from "@/lib/utils";

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

  const totalImagingTime = 30 * 60; // 30 minutes in seconds
  const intervalSize = 3 * 60; // 3-minute intervals in seconds
  const frameRate = 10; // 10 seconds per frame

  const { segmentStartFrames, segmentLabelPositions, segmentLabels } =
      generateTimeIntervals(totalImagingTime, intervalSize, frameRate);

  const lineSegments = shapValues.map((_, segmentIndex) => {
    const start = segmentIndex * (intervalSize / frameRate);
    const end = Math.min(start + (intervalSize / frameRate), totalData.length);
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
      <div className="flex items-center">
        <div className="flex flex-col items-center">
          <span className="text-xs">High</span>
          <svg width="20" height="150">
            <defs>
              <linearGradient id="colorScale" x1="0" x2="0" y1="1" y2="0">
                {Array.from({length: 10}, (_, i) => {
                  const offset = i * 10;
                  const color = getHeatmapColor(i / 9);
                  return <stop key={offset} offset={`${offset}%`} stopColor={color}/>;
                })}
              </linearGradient>
            </defs>
            <rect width="20" height="150" fill="url(#colorScale)"/>
          </svg>
          <span className="text-xs">Low</span>
        </div>

        <div style={{width: "100%", height: 400}}>
          <ResponsiveContainer>
            <LineChart margin={{ top: 20, bottom: 20, left: 20, right: 20 }}>
              <CartesianGrid vertical={false}/>
              <XAxis
                  type="number"
                  dataKey="frame"
                  domain={[1, totalData.length]}
                  label={{ value: "Time (min)", position: "insideBottom", offset: -5 }}
                  ticks={segmentLabelPositions} // Centered tick positions
                  tickFormatter={(value, index) => segmentLabels[index] || ""}
              />
              <YAxis
                  label={{angle: -90, position: "insideLeft"}}
              />
              {segmentStartFrames.map((frame) => (
                  <ReferenceLine key={`ref-${frame}`} x={frame} stroke="gray" strokeDasharray="3 3" />
              ))}
              {lineSegments.map(({data, color, key}) => (
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
      </div>
  );
}
