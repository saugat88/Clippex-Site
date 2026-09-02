import { useState, type ReactNode } from 'react';
import { navByRole } from '@/data/nav';
import { Avatar, Icon, cx } from '@/components/ui';
import { useTheme } from '@/hooks/useTheme';
import logoDark from '@/assets/logo-dark.png';
import logoLight from '@/imports/Light-2.png';
import type { AuthUser } from '@/data/auth';

function Logo({ small }: { small?: boolean }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="flex items-center gap-2">
      <img
        src={isDark ? logoDark : logoLight}
        alt="CX Logo"
        className={cx("h-8 w-8 object-contain drop-shadow-sm", isDark && "mix-blend-screen")}
      />
      {!small && <span className="font-display text-lg font-extrabold tracking-tight text-foreground">CLIPPEX</span>}
    </div>
  );
}

interface ShellProps {
  user: AuthUser;
  page: string;
  onNavigate: (page: string) => void;
  onExit: () => void;
  children: ReactNode;
}

export function AppShell({ user, page, onNavigate, onExit, children }: ShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const role = user.role;
  const items = navByRole[role];

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center px-6">
        <Logo />
      </div>

      <nav className="scroll-area flex-1 space-y-1 overflow-y-auto px-3 pt-2">
        {items.map((item) => {
          const active = page === item.key;
          return (
            <button
              key={item.key}
              onClick={() => {
                onNavigate(item.key);
                setMobileOpen(false);
              }}
              className={cx(
                'flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                active ? 'bg-primary-50 text-primary-700' : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              )}
            >
              <Icon name={item.icon} size={19} className={active ? 'text-primary-600' : ''} />
              {item.label}
              {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />}
            </button>
          );
        })}
      </nav>

      <div className="border-t border-border p-3">
        <div className="flex items-center gap-3 rounded-md px-2 py-2">
          <Avatar src={user.avatar} name={user.name} size={36} />
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-semibold text-foreground">{user.name}</div>
            <div className="truncate text-xs text-muted-foreground">{user.handle}</div>
          </div>
          <button onClick={onExit} className="text-muted-foreground transition-colors hover:text-danger" title="Sign out" aria-label="Sign out">
            <Icon name="logout" size={18} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="grid h-full grid-rows-[auto_1fr] lg:grid-cols-[264px_1fr] lg:grid-rows-1">
      {/* Desktop sidebar */}
      <aside className="hidden border-r border-border bg-card lg:block">{sidebar}</aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-72 border-r border-border bg-card animate-fade-in">{sidebar}</aside>
        </div>
      )}

      <div className="flex min-w-0 flex-col">
        {/* Top bar */}
        <header className="flex h-16 items-center gap-3 border-b border-border bg-card/80 px-4 backdrop-blur-sm sm:px-6">
          <button className="text-muted-foreground lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <Icon name="menu" size={22} />
          </button>
          <div className="hidden max-w-md flex-1 sm:block">
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <Icon name="search" size={17} />
              </span>
              <input
                placeholder="Search campaigns, creators, payouts…"
                className="h-9 w-full rounded-md border border-border bg-muted/50 pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:border-primary focus:bg-card focus:outline-none focus:ring-2 focus:ring-primary-100"
              />
            </div>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <button
              onClick={() => onNavigate('settings')}
              className={cx(
                "relative flex h-9 w-9 items-center justify-center rounded-md transition-colors",
                page === 'settings' ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
              aria-label="Settings"
              title="Settings & Appearance"
            >
              <Icon name="settings" size={19} />
            </button>
            <button className="relative flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground" aria-label="Notifications">
              <Icon name="bell" size={19} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary ring-2 ring-card" />
            </button>
            <button
              onClick={() => onNavigate('settings')}
              className="ml-1 hidden items-center gap-2 rounded-md border border-border bg-card px-2 py-1 sm:flex hover:border-primary/40 transition-colors"
            >
              <Avatar src={user.avatar} name={user.name} size={26} />
              <span className="text-sm font-medium text-foreground">{user.name.split(' ')[0]}</span>
              <Icon name="chevron-down" size={15} className="text-muted-foreground" />
            </button>
          </div>
        </header>

        <main className="scroll-area relative flex-1 overflow-y-auto bg-background">
          {/* Subtle ambient workspace glow orbs */}
          <div className="pointer-events-none fixed -top-24 right-0 h-[500px] w-[500px] rounded-full bg-gradient-to-b from-purple-600/12 to-transparent blur-[140px] dark:from-purple-600/18" aria-hidden />
          <div className="pointer-events-none fixed bottom-0 left-72 h-[400px] w-[400px] rounded-full bg-gradient-to-t from-indigo-600/10 to-transparent blur-[140px] dark:from-indigo-600/15" aria-hidden />
          <div key={role + page} className="relative z-10 mx-auto max-w-7xl animate-fade-in px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
// force hmr 1
