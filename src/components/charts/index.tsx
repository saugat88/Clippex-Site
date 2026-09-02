import { useId } from 'react';

/* Lightweight, dependency-free SVG charts themed to design tokens. */

interface Series {
  label: string;
  values: number[];
}

/* ---------------- AreaTrend ---------------- */
export function AreaTrend({ data, labels, height = 220 }: { data: number[]; labels: string[]; height?: number }) {
  const id = useId();
  const w = 640;
  const h = height;
  const pad = { t: 16, r: 8, b: 28, l: 8 };
  const max = Math.max(...data) * 1.1;
  const min = Math.min(...data) * 0.9;
  const iw = w - pad.l - pad.r;
  const ih = h - pad.t - pad.b;
  const x = (i: number) => pad.l + (i / (data.length - 1)) * iw;
  const y = (v: number) => pad.t + ih - ((v - min) / (max - min || 1)) * ih;
  const line = data.map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i)},${y(v)}`).join(' ');
  const area = `${line} L${x(data.length - 1)},${pad.t + ih} L${x(0)},${pad.t + ih} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height }} role="img" aria-label="Trend chart">
      <defs>
        <linearGradient id={`grad-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-primary-600)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--color-primary-600)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75, 1].map((g) => (
        <line key={g} x1={pad.l} x2={w - pad.r} y1={pad.t + ih * g} y2={pad.t + ih * g} stroke="var(--color-border)" strokeDasharray="3 4" />
      ))}
      <path d={area} fill={`url(#grad-${id})`} />
      <path d={line} fill="none" stroke="var(--color-primary-600)" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      {data.map((v, i) => (
        <circle key={i} cx={x(i)} cy={y(v)} r={3} fill="var(--color-card)" stroke="var(--color-primary-600)" strokeWidth={2} />
      ))}
      {labels.map((l, i) => (
        <text key={l} x={x(i)} y={h - 8} textAnchor="middle" className="fill-[var(--color-muted-foreground)]" style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>
          {l}
        </text>
      ))}
    </svg>
  );
}

/* ---------------- BarBreakdown ---------------- */
export function BarBreakdown({ data, height = 220 }: { data: { label: string; value: number }[]; height?: number }) {
  const w = 640;
  const h = height;
  const pad = { t: 16, r: 8, b: 28, l: 8 };
  const iw = w - pad.l - pad.r;
  const ih = h - pad.t - pad.b;
  const max = Math.max(...data.map((d) => d.value)) * 1.1;
  const bw = (iw / data.length) * 0.55;
  const gap = iw / data.length;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height }} role="img" aria-label="Breakdown chart">
      {[0.25, 0.5, 0.75, 1].map((g) => (
        <line key={g} x1={pad.l} x2={w - pad.r} y1={pad.t + ih * g} y2={pad.t + ih * g} stroke="var(--color-border)" strokeDasharray="3 4" />
      ))}
      {data.map((d, i) => {
        const bh = (d.value / max) * ih;
        const cx = pad.l + gap * i + gap / 2;
        return (
          <g key={d.label}>
            <rect x={cx - bw / 2} y={pad.t + ih - bh} width={bw} height={bh} rx={5} fill="var(--color-primary-500)" className="transition-all">
              <title>{`${d.label}: ${d.value}`}</title>
            </rect>
            <text x={cx} y={h - 8} textAnchor="middle" className="fill-[var(--color-muted-foreground)]" style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ---------------- LineMulti ---------------- */
export function LineMulti({ series, labels, height = 220, colors }: { series: Series[]; labels: string[]; height?: number; colors?: string[] }) {
  const w = 640;
  const h = height;
  const pad = { t: 16, r: 8, b: 28, l: 8 };
  const iw = w - pad.l - pad.r;
  const ih = h - pad.t - pad.b;
  const all = series.flatMap((s) => s.values);
  const max = Math.max(...all) * 1.1;
  const palette = colors ?? ['var(--color-primary-600)', 'var(--color-primary-300)'];
  const x = (i: number) => pad.l + (i / (labels.length - 1)) * iw;
  const y = (v: number) => pad.t + ih - (v / (max || 1)) * ih;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height }} role="img" aria-label="Comparison chart">
      {[0.25, 0.5, 0.75, 1].map((g) => (
        <line key={g} x1={pad.l} x2={w - pad.r} y1={pad.t + ih * g} y2={pad.t + ih * g} stroke="var(--color-border)" strokeDasharray="3 4" />
      ))}
      {series.map((s, si) => (
        <path
          key={s.label}
          d={s.values.map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i)},${y(v)}`).join(' ')}
          fill="none"
          stroke={palette[si % palette.length]}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
      {labels.map((l, i) => (
        <text key={l} x={x(i)} y={h - 8} textAnchor="middle" className="fill-[var(--color-muted-foreground)]" style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>
          {l}
        </text>
      ))}
    </svg>
  );
}

/* ---------------- DonutSplit ---------------- */
export function DonutSplit({ data, size = 180 }: { data: { label: string; value: number; color: string }[]; size?: number }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const r = size / 2 - 12;
  const c = size / 2;
  const circ = 2 * Math.PI * r;
  let offset = 0;

  return (
    <div className="flex items-center gap-6">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Distribution chart">
        <g transform={`rotate(-90 ${c} ${c})`}>
          {data.map((d) => {
            const frac = d.value / total;
            const dash = frac * circ;
            const seg = (
              <circle
                key={d.label}
                cx={c}
                cy={c}
                r={r}
                fill="none"
                stroke={d.color}
                strokeWidth={16}
                strokeDasharray={`${dash} ${circ - dash}`}
                strokeDashoffset={-offset}
                strokeLinecap="butt"
              />
            );
            offset += dash;
            return seg;
          })}
        </g>
        <text x={c} y={c - 4} textAnchor="middle" className="fill-[var(--color-foreground)]" style={{ fontFamily: 'var(--font-mono)', fontSize: 22, fontWeight: 600 }}>
          {total}%
        </text>
        <text x={c} y={c + 16} textAnchor="middle" className="fill-[var(--color-muted-foreground)]" style={{ fontSize: 11 }}>
          total
        </text>
      </svg>
      <ul className="space-y-2">
        {data.map((d) => (
          <li key={d.label} className="flex items-center gap-2 text-sm">
            <span className="h-2.5 w-2.5 rounded-sm" style={{ background: d.color }} />
            <span className="text-foreground">{d.label}</span>
            <span className="ml-auto font-mono text-muted-foreground">{d.value}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
