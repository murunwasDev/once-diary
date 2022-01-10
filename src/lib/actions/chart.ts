import Chart from "chart.js/auto/auto.js";
import type { ChartType, ChartDataset, ChartItem } from "chart.js";

export const chart = (
  node: ChartItem,
  params: { type: ChartType; labels: string[]; datasets: ChartDataset[] }
) => {
  const chart = new Chart(node, {
    type: params.type,
    data: {
      labels: params.labels,
      datasets: params.datasets
    }
  });

  // Cleans up charts on unmount
  return {
    destroy() {
      chart.destroy();
    }
  };
};
