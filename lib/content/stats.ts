export interface Stat {
  value: string;
  label: string;
}

/** Figures drawn from the résumé; keep them honest and few. */
export const stats: Stat[] = [
  { value: "5+", label: "Years shipping production software" },
  { value: "10K+", label: "Payments processed in a launch month" },
  { value: "5", label: "Engineers mentored through to production" },
];
