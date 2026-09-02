import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from 'react';
import { useEffect } from 'react';
import { Icon, type IconName } from './icons';

/* ---------------- utils ---------------- */
export function cx(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(' ');
}

type Tone = 'success' | 'info' | 'warn' | 'danger' | 'muted' | 'primary';

const toneClasses: Record<Tone, string> = {
  success: 'bg-success-soft text-success',
  info: 'bg-info-soft text-info',
  warn: 'bg-warn-soft text-warn',
  danger: 'bg-danger-soft text-danger',
  muted: 'bg-muted text-muted-foreground',
  primary: 'bg-primary-100 text-primary-700',
};

import buttonBgImg from '@/assets/button-bg.png';
import logoDark from '@/assets/logo-dark.png';

/* ---------------- Button ---------------- */
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  icon?: IconName;
  iconRight?: IconName;
}

export function Button({ variant = 'primary', size = 'md', icon, iconRight, className, children, style, ...props }: ButtonProps) {
  const isPrimary = variant === 'primary';
  const isDark = variant === 'dark';
  const isWatermark = isPrimary || isDark;

  const variants = {
    primary:
      'relative overflow-hidden bg-[#7c3aed] text-white hover:brightness-110 shadow-md hover:shadow-purple-500/30 rounded-full font-medium active:scale-[0.98]',
    dark:
      'relative overflow-hidden border border-white/15 bg-[#121216] text-white hover:border-purple-500/40 hover:bg-[#18181e] shadow-md hover:shadow-purple-500/10 rounded-full font-medium active:scale-[0.98]',
    secondary: 'bg-foreground text-background hover:opacity-90 rounded-full font-medium',
    outline: 'border border-border bg-card text-foreground hover:bg-muted rounded-full font-medium',
    ghost: 'text-foreground hover:bg-muted rounded-full font-medium',
  };
  const sizes = {
    sm: cx('h-8 text-[13px] gap-1.5', isWatermark ? 'pl-4 pr-10' : 'px-4'),
    md: cx('h-10 text-sm gap-2', isWatermark ? 'pl-5 pr-12' : 'px-6'),
    lg: cx('h-12 text-[15px] gap-2.5', isWatermark ? 'pl-7 pr-16' : 'px-8'),
  };
  return (
    <button
      className={cx(
        'group inline-flex items-center justify-center transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        'disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]',
        variants[variant],
        sizes[size],
        className,
      )}
      style={{
        ...(isPrimary
          ? {
              backgroundImage: `url(${buttonBgImg})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right center',
              backgroundSize: 'auto 100%',
              backgroundColor: '#7c3aed',
            }
          : {}),
        ...style,
      }}
      {...props}
    >
      {isDark && (
        <img
          src={logoDark}
          alt=""
          className="pointer-events-none absolute -right-1 top-1/2 -translate-y-1/2 h-[135%] max-h-none w-auto object-contain opacity-25 mix-blend-screen transition-opacity group-hover:opacity-45"
          aria-hidden
        />
      )}
      <span className="relative z-10 flex items-center gap-2">
        {icon && <Icon name={icon} size={size === 'sm' ? 14 : 17} />}
        {children}
        {iconRight && <Icon name={iconRight} size={size === 'sm' ? 14 : 17} />}
      </span>
    </button>
  );
}

/* ---------------- Badge / StatusPill ---------------- */
export function Badge({ tone = 'muted', children, className }: { tone?: Tone; children: ReactNode; className?: string }) {
  return (
    <span className={cx('inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium', toneClasses[tone], className)}>
      {children}
    </span>
  );
}

export function StatusPill({ tone, label }: { tone: Tone; label: string }) {
  return (
    <Badge tone={tone}>
      <span className={cx('h-1.5 w-1.5 rounded-full', tone === 'success' && 'bg-success', tone === 'info' && 'bg-info', tone === 'warn' && 'bg-warn', tone === 'danger' && 'bg-danger', tone === 'muted' && 'bg-muted-foreground', tone === 'primary' && 'bg-primary')} />
      {label}
    </Badge>
  );
}

/* ---------------- Card ---------------- */
export function Card({ children, className, hover }: { children: ReactNode; className?: string; hover?: boolean }) {
  return (
    <div
      className={cx(
        'rounded-lg border border-border bg-card shadow-xs',
        hover && 'transition-all duration-200 hover:shadow-md hover:-translate-y-0.5',
        className,
      )}
    >
      {children}
    </div>
  );
}

/* ---------------- Input / Select ---------------- */
export function Input({ icon, className, ...props }: InputHTMLAttributes<HTMLInputElement> & { icon?: IconName }) {
  return (
    <div className="relative">
      {icon && (
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          <Icon name={icon} size={17} />
        </span>
      )}
      <input
        className={cx(
          'h-10 w-full rounded-md border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground',
          'transition-colors focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-100',
          icon ? 'pl-9 pr-3' : 'px-3',
          className,
        )}
        {...props}
      />
    </div>
  );
}

export function Select({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cx(
        'h-10 rounded-md border border-border bg-card px-3 text-sm text-foreground appearance-none',
        'focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-100',
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}

/* ---------------- Avatar ---------------- */
export function Avatar({ src, name, size = 40 }: { src?: string; name: string; size?: number }) {
  const initials = name.split(' ').map((p) => p[0]).slice(0, 2).join('');
  return src ? (
    <img src={src} alt={name} width={size} height={size} className="rounded-full object-cover bg-muted" style={{ width: size, height: size }} />
  ) : (
    <span
      className="inline-flex items-center justify-center rounded-full bg-primary-100 font-semibold text-primary-700"
      style={{ width: size, height: size, fontSize: size * 0.38 }}
    >
      {initials}
    </span>
  );
}

/* ---------------- StatCard ---------------- */
export function StatCard({ label, value, delta, icon }: { label: string; value: string; delta?: number; icon?: IconName }) {
  const up = (delta ?? 0) >= 0;
  return (
    <Card className="p-5" hover>
      <div className="flex items-start justify-between">
        <span className="text-sm text-muted-foreground">{label}</span>
        {icon && (
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary-50 text-primary-600">
            <Icon name={icon} size={16} />
          </span>
        )}
      </div>
      <div className="mt-3 font-mono text-2xl font-semibold tracking-tight text-foreground">{value}</div>
      {delta !== undefined && (
        <div className={cx('mt-1.5 inline-flex items-center gap-1 text-xs font-medium', up ? 'text-success' : 'text-danger')}>
          <Icon name={up ? 'trending-up' : 'trending-down'} size={14} />
          {(up ? '+' : '') + delta.toFixed(1)}% vs last month
        </div>
      )}
    </Card>
  );
}

/* ---------------- ProgressBar ---------------- */
export function ProgressBar({ value, className }: { value: number; className?: string }) {
  return (
    <div className={cx('h-2 w-full overflow-hidden rounded-full bg-muted', className)}>
      <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  );
}

/* ---------------- Tabs ---------------- */
export function Tabs({ tabs, active, onChange }: { tabs: { key: string; label: string }[]; active: string; onChange: (k: string) => void }) {
  return (
    <div className="inline-flex items-center gap-1 rounded-lg border border-border bg-card p-1">
      {tabs.map((t) => (
        <button
          key={t.key}
          onClick={() => onChange(t.key)}
          className={cx(
            'rounded-md px-3.5 py-1.5 text-sm font-medium transition-colors',
            active === t.key ? 'bg-primary text-primary-foreground shadow-xs' : 'text-muted-foreground hover:text-foreground',
          )}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

/* ---------------- EmptyState ---------------- */
export function EmptyState({ icon, title, message, action }: { icon: IconName; title: string; message: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-card/50 px-6 py-16 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-50 text-primary-600">
        <Icon name={icon} size={26} />
      </span>
      <h3 className="mt-4 font-display text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">{message}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

/* ---------------- Skeleton ---------------- */
export function Skeleton({ className }: { className?: string }) {
  return <div className={cx('animate-shimmer rounded-md', className)} />;
}

/* ---------------- Modal ---------------- */
export function Modal({ open, onClose, title, children, footer }: { open: boolean; onClose: () => void; title: string; children: ReactNode; footer?: ReactNode }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div className="relative z-10 w-full max-w-lg animate-fade-in rounded-xl border border-border bg-card shadow-lg">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="font-display text-lg font-semibold text-foreground">{title}</h2>
          <button onClick={onClose} className="text-muted-foreground transition-colors hover:text-foreground" aria-label="Close">
            <Icon name="close" size={20} />
          </button>
        </div>
        <div className="scroll-area max-h-[60vh] overflow-y-auto px-6 py-5">{children}</div>
        {footer && <div className="flex justify-end gap-3 border-t border-border px-6 py-4">{footer}</div>}
      </div>
    </div>
  );
}

/* ---------------- Section header ---------------- */
export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight text-foreground">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

/* ---------------- Theme Toggle ---------------- */
import { useTheme } from '@/hooks/useTheme';
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className={cx(
        'relative flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground',
        className
      )}
      aria-label="Toggle theme"
    >
      <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={19} />
    </button>
  );
}

export { Icon };
export type { IconName };
