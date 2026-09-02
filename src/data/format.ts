export function compact(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(n >= 10_000_000 ? 0 : 1) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(n >= 10_000 ? 0 : 1) + 'K';
  return String(n);
}

export function money(n: number, opts: { compact?: boolean } = {}): string {
  if (opts.compact && n >= 1000) return '$' + compact(n);
  return '$' + n.toLocaleString('en-US');
}

export function pct(n: number): string {
  return (n > 0 ? '+' : '') + n.toFixed(1) + '%';
}
