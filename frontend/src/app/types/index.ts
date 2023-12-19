interface DataPoint {
  name: string;
  value: number;
  timestamp: number; 
}

interface LineDataPoint {
  x: string;
  y: number;
}

interface LineData {
  id: string;
  data: LineDataPoint[];
}

interface FilterData {
  name: string | undefined;
  from: number;
  to: number;
}
interface TransformedDataItem {
  name: string;
  x: string;
  y: number;
}

interface MetricsState {
  data: DataPoint[];
  loading: boolean;
  error: string | null;
  filter: FilterData;
  master: {
    name: string[];
  };
}

export type { DataPoint, LineData, FilterData, LineDataPoint, TransformedDataItem, MetricsState };