import type { TimePoint } from './types';

export const trend: TimePoint[] = [
  { label: 'Mar', views: 1200000, conversions: 3200, earnings: 8400 },
  { label: 'Apr', views: 1680000, conversions: 4100, earnings: 11200 },
  { label: 'May', views: 1450000, conversions: 3800, earnings: 9900 },
  { label: 'Jun', views: 2310000, conversions: 6400, earnings: 16800 },
  { label: 'Jul', views: 2870000, conversions: 8100, earnings: 21400 },
  { label: 'Aug', views: 3420000, conversions: 9600, earnings: 26200 },
];

export const platformSplit = [
  { label: 'TikTok', value: 48, color: 'var(--color-primary-600)' },
  { label: 'Instagram', value: 27, color: 'var(--color-primary-400)' },
  { label: 'YouTube', value: 18, color: 'var(--color-primary-300)' },
  { label: 'X', value: 7, color: 'var(--color-primary-200)' },
];

export const categoryPerformance = [
  { label: 'Beauty', value: 92 },
  { label: 'Tech', value: 74 },
  { label: 'Fitness', value: 88 },
  { label: 'Food', value: 61 },
  { label: 'Fashion', value: 79 },
  { label: 'Gaming', value: 54 },
];
