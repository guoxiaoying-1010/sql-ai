import metricsData from "@/data/metrics.json";
import { Metric } from "../types";

export function loadMetrics(): Metric[] {
  return metricsData as Metric[];
}