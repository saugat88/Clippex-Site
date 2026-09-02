import { useTheme } from '@/hooks/useTheme';
import { Card, Icon, Badge, Button } from '@/components/ui';
import type { AuthUser } from '@/data/auth';

export function SettingsPage({ user, onSignOut }: { user: AuthUser; onSignOut: () => void }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="space-y-8 max-w-4xl pb-12">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Settings & Preferences</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage your workspace theme, account credentials, and platform preferences.</p>
      </div>

      {/* Theme & Appearance Section */}
      <Card className="p-6 sm:p-8 space-y-6">
        <div>
          <div className="flex items-center gap-2">
            <Icon name="sun" size={20} className="text-primary" />
            <h2 className="font-display text-lg font-bold text-foreground">Workspace Appearance</h2>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Select your preferred interface theme. Dark theme is the default visual identity of CLIPPEX.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Dark Mode Card */}
          <button
            type="button"
            onClick={() => {
              if (theme !== 'dark') toggleTheme();
            }}
            className={`group relative flex flex-col items-start p-5 rounded-xl border-2 text-left transition-all ${
              theme === 'dark'
                ? 'border-primary bg-primary/10 shadow-lg shadow-purple-500/10'
                : 'border-border bg-card/60 hover:border-border/80 hover:bg-card'
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  <Icon name="moon" size={18} />
                </span>
                <div>
                  <div className="font-semibold text-foreground flex items-center gap-2">
                    Dark Mode
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-bold">
                      Default
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">Obsidian & high-contrast glow</div>
                </div>
              </div>
              {theme === 'dark' && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white">
                  <Icon name="check" size={12} />
                </span>
              )}
            </div>

            {/* Visual preview mini-canvas */}
            <div className="mt-4 w-full h-20 rounded-lg bg-[#09090b] border border-white/10 p-2.5 flex flex-col justify-between overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="h-2 w-12 rounded-full bg-white/20" />
                <div className="h-2 w-6 rounded-full bg-purple-500" />
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                <div className="h-8 rounded bg-[#141416] border border-white/5" />
                <div className="h-8 rounded bg-[#141416] border border-white/5" />
                <div className="h-8 rounded bg-[#141416] border border-white/5" />
              </div>
            </div>
          </button>

          {/* Light Mode Card */}
          <button
            type="button"
            onClick={() => {
              if (theme !== 'light') toggleTheme();
            }}
            className={`group relative flex flex-col items-start p-5 rounded-xl border-2 text-left transition-all ${
              theme === 'light'
                ? 'border-primary bg-primary/10 shadow-lg shadow-purple-500/10'
                : 'border-border bg-card/60 hover:border-border/80 hover:bg-card'
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/20 text-amber-500 border border-amber-500/30">
                  <Icon name="sun" size={18} />
                </span>
                <div>
                  <div className="font-semibold text-foreground">Light Mode</div>
                  <div className="text-xs text-muted-foreground">Studio white & clean slate</div>
                </div>
              </div>
              {theme === 'light' && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white">
                  <Icon name="check" size={12} />
                </span>
              )}
            </div>

            {/* Visual preview mini-canvas */}
            <div className="mt-4 w-full h-20 rounded-lg bg-[#fafafa] border border-black/10 p-2.5 flex flex-col justify-between overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="h-2 w-12 rounded-full bg-black/20" />
                <div className="h-2 w-6 rounded-full bg-purple-600" />
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                <div className="h-8 rounded bg-white border border-black/5" />
                <div className="h-8 rounded bg-white border border-black/5" />
                <div className="h-8 rounded bg-white border border-black/5" />
              </div>
            </div>
          </button>
        </div>
      </Card>

      {/* Account & Profile Card */}
      <Card className="p-6 sm:p-8 space-y-6">
        <div>
          <div className="flex items-center gap-2">
            <Icon name="user" size={20} className="text-primary" />
            <h2 className="font-display text-lg font-bold text-foreground">Account Profile</h2>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">Your authenticated account credentials and security level.</p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-xl border border-border bg-muted/30">
          <img src={user.avatar} alt={user.name} className="h-14 w-14 rounded-full object-cover border-2 border-primary/30" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base text-foreground truncate">{user.name}</h3>
              <Badge tone="purple">{user.role.toUpperCase()}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{user.handle}</p>
          </div>
        </div>
      </Card>

      {/* Notifications */}
      <Card className="p-6 sm:p-8 space-y-4">
        <div>
          <div className="flex items-center gap-2">
            <Icon name="bell" size={20} className="text-primary" />
            <h2 className="font-display text-lg font-bold text-foreground">Notifications & Alerts</h2>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">Manage transaction alerts and campaign milestone notifications.</p>
        </div>

        <div className="divide-y divide-border">
          {[
            { t: 'Payout cleared alerts', d: 'Receive instant alerts when verified payout batches complete.' },
            { t: 'Campaign milestone notices', d: 'Get notified when content hits guaranteed view thresholds.' },
            { t: 'Security & login alerts', d: 'Instant notices for new device logins.' },
          ].map((n, i) => (
            <div key={n.t} className={`flex items-center justify-between py-3.5 ${i === 0 ? 'pt-2' : ''}`}>
              <div>
                <div className="text-sm font-semibold text-foreground">{n.t}</div>
                <div className="text-xs text-muted-foreground">{n.d}</div>
              </div>
              <span className="flex h-6 w-11 items-center rounded-full bg-primary p-1 cursor-pointer">
                <span className="h-4 w-4 rounded-full bg-white translate-x-5 transition-transform" />
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Session Management */}
      <Card className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-danger/30">
        <div>
          <h2 className="font-display text-base font-bold text-foreground">Sign Out of Session</h2>
          <p className="text-xs text-muted-foreground mt-0.5">End your current session on this device and return to the landing page.</p>
        </div>
        <Button variant="outline" size="sm" onClick={onSignOut} iconRight="logout" className="border-danger/40 text-danger hover:bg-danger-soft">
          Sign out
        </Button>
      </Card>
    </div>
  );
}
