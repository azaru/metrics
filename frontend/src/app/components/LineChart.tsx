import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import { DataPoint, LineData, LineDataPoint, TransformedDataItem } from '../types';
import { t } from 'i18next';

interface LineChartProps {
  data: DataPoint[];
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {

  const sortedData = [...data].sort((a, b) => a.timestamp - b.timestamp);
  const transformedData: Record<string, TransformedDataItem> = {};

  sortedData.forEach((item) => {
    const date = new Date(item.timestamp);

    date.setMinutes(Math.floor(date.getMinutes() / 5) * 5);
    date.setSeconds(0);
    date.setMilliseconds(0);

    const key = `${item.name}-${date.toISOString()}`;

    if (!transformedData[key]) {
      transformedData[key] = {
        name: item.name,
        x: `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getFullYear()).slice(-2)} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`,
        y: 0,
      };
    }

    transformedData[key].y += item.value;
  });

  const groupedData: Record<string, LineDataPoint[]> = {};
  Object.values(transformedData).forEach((item) => {
    if (!groupedData[item.name]) {
      groupedData[item.name] = [];
    }

    groupedData[item.name].push({ x: item.x, y: item.y });
  });

  const lineData: LineData[] = Object.keys(groupedData).map((key) => ({
    id: key,
    data: groupedData[key],
  }));

  return (
    <div style={{ height: "400px" }}>
      <ResponsiveLine
        data={lineData}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', stacked: true, min: 'auto', max: 'auto' }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: t("app.components.lineChart.timestamp.legend"),
          legendOffset: 36,
          legendPosition: 'middle'
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: t("app.components.lineChart.value.legend"),
          legendOffset: -40,
          legendPosition: 'middle'
        }}
      />
    </div>
  );
};

export default LineChart;
