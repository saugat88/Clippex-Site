import type { Payout } from './types';

export const payouts: Payout[] = [
  { id: 'py-1', campaign: 'Summer Glow Launch', creator: 'Nova', amount: 3820, status: 'paid', date: 'Aug 28, 2026', method: 'Bank •••4021' },
  { id: 'py-2', campaign: 'Apex Trainer Series', creator: 'Kai', amount: 2140, status: 'processing', date: 'Aug 27, 2026', method: 'PayPal' },
  { id: 'py-3', campaign: 'Volt Buds Pro Drop', creator: 'Zephyr', amount: 5460, status: 'paid', date: 'Aug 25, 2026', method: 'Bank •••7788' },
  { id: 'py-4', campaign: 'Grove Meal Kit', creator: 'Mira', amount: 1700, status: 'pending', date: 'Aug 24, 2026', method: 'Wise' },
  { id: 'py-5', campaign: 'Summer Glow Launch', creator: 'Sakky', amount: 2960, status: 'paid', date: 'Aug 22, 2026', method: 'Bank •••1290' },
  { id: 'py-6', campaign: 'Apex Trainer Series', creator: 'Xenon', amount: 4180, status: 'failed', date: 'Aug 20, 2026', method: 'PayPal' },
  { id: 'py-7', campaign: 'Volt Buds Pro Drop', creator: 'Nova', amount: 1240, status: 'paid', date: 'Aug 18, 2026', method: 'Bank •••4021' },
];

export const payoutStatusMeta: Record<Payout['status'], { label: string; tone: 'success' | 'info' | 'warn' | 'danger' }> = {
  paid: { label: 'Paid', tone: 'success' },
  processing: { label: 'Processing', tone: 'info' },
  pending: { label: 'Pending', tone: 'warn' },
  failed: { label: 'Failed', tone: 'danger' },
};
