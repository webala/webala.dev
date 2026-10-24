export interface Stat {
  value: string;
  label: string;
}

/** Figures from the verified fact sheet, used exactly as written there. */
export const stats: Stat[] = [
  { value: "5+", label: "Years shipping production software" },
  { value: "10,000+", label: "Concurrent users served with near-real-time updates" },
  { value: "3", label: "Products designed and run end to end" },
];
