type DonutChartItem = {
  value: number;
  color: string;
};

export type DonutChartProps = {
  data: DonutChartItem[];
  centerLabel: string;
};
