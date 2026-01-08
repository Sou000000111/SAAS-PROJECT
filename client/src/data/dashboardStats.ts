export type Range = "week" | "month" | "year";

export const dashboardStats: Record<
  Range,
  {
    users: { value: number; change: number };
    revenue: { value: number; change: number };
    free: { value: number; change: number };
    pro: { value: number; change: number };
  }
> = {
  week: {
    users: { value: 1200, change: 12 },
    revenue: { value: 45000, change: -5 },
    free: { value: 320, change: 3 },
    pro: { value: 80, change: 10 },
  },
  month: {
    users: { value: 5400, change: 8 },
    revenue: { value: 180000, change: 6 },
    free: { value: 1400, change: -2 },
    pro: { value: 320, change: 15 },
  },
  year: {
    users: { value: 62000, change: 18 },
    revenue: { value: 2100000, change: 22 },
    free: { value: 18000, change: 10 },
    pro: { value: 4200, change: 30 },
  },
};
