import { useState } from 'react';
import { campaigns, statusMeta } from '@/data/campaigns';
import { creators } from '@/data/creators';
import { brands } from '@/data/brands';
import { payouts, payoutStatusMeta } from '@/data/payouts';
import { trend, categoryPerformance } from '@/data/analytics';
import { compact, money } from '@/data/format';
import { AreaTrend, BarBreakdown } from '@/components/charts';
import { Avatar, Badge, Button, Card, Icon, Input, PageHeader, StatCard, StatusPill, Tabs } from '@/components/ui';
import { getCurrentSession } from '@/data/auth';

/* ---------------- Overview ---------------- */
function Overview() {
  const session = getCurrentSession();
  const adminName = session?.name || 'Sakky';
  const pendingReview = campaigns.filter((c) => c.status === 'review');
  return (
    <div className="space-y-6">
      <PageHeader title="Platform overview" subtitle={`${adminName} · system health and moderation queue`} action={<Button variant="outline" icon="filter">This month</Button>} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="GMV" value="$4.2M" delta={18.4} icon="trending-up" />
        <StatCard label="Active users" value="12,480" delta={9.2} icon="users" />
        <StatCard label="Live campaigns" value="342" delta={5.6} icon="megaphone" />
        <StatCard label="Payouts (Aug)" value="$1.9M" delta={22.1} icon="wallet" />
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2">
          <h3 className="font-display text-base font-semibold text-foreground">Platform GMV</h3>
          <div className="mt-4"><AreaTrend data={trend.map((t) => t.earnings * 160)} labels={trend.map((t) => t.label)} /></div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-base font-semibold text-foreground">Review queue</h3>
            <Badge tone="warn">{pendingReview.length} pending</Badge>
          </div>
          <div className="mt-4 space-y-3">
            {pendingReview.map((c) => (
              <div key={c.id} className="rounded-lg border border-border p-3">
                <div className="flex items-center justify-between"><span className="text-sm font-medium text-foreground">{c.name}</span><StatusPill tone="warn" label="In Review" /></div>
                <div className="mt-1 text-xs text-muted-foreground">{c.brand} · {money(c.budget, { compact: true })} budget</div>
                <div className="mt-3 flex gap-2"><Button size="sm" className="flex-1" icon="check">Approve</Button><Button size="sm" variant="outline" className="flex-1">Reject</Button></div>
              </div>
            ))}
            {pendingReview.length === 0 && <p className="text-sm text-muted-foreground">Queue is clear 🎉</p>}
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ---------------- Users ---------------- */
function Users() {
  const [tab, setTab] = useState('creators');
  return (
    <div className="space-y-6">
      <PageHeader title="Users" subtitle="Manage creators and brands on the platform." action={<Button variant="outline" icon="filter">Export</Button>} />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Tabs tabs={[{ key: 'creators', label: 'Creators' }, { key: 'brands', label: 'Brands' }]} active={tab} onChange={setTab} />
        <div className="w-full max-w-xs sm:w-auto"><Input icon="search" placeholder="Search users…" /></div>
      </div>
      <Card className="overflow-hidden">
        <div className="scroll-area overflow-x-auto">
          {tab === 'creators' ? (
            <table className="w-full text-sm">
              <thead><tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground"><th className="px-6 py-3 font-medium">Creator</th><th className="px-6 py-3 font-medium">Niche</th><th className="px-6 py-3 font-medium">Followers</th><th className="px-6 py-3 font-medium">Engagement</th><th className="px-6 py-3 font-medium">Status</th></tr></thead>
              <tbody>
                {creators.map((c) => (
                  <tr key={c.id} className="border-b border-border last:border-0 transition-colors hover:bg-muted/40">
                    <td className="px-6 py-4"><div className="flex items-center gap-3"><Avatar src={c.avatar} name={c.name} size={34} /><div><div className="font-medium text-foreground">{c.name}</div><div className="text-xs text-muted-foreground">{c.handle}</div></div></div></td>
                    <td className="px-6 py-4 text-muted-foreground">{c.niche}</td>
                    <td className="px-6 py-4 font-mono text-muted-foreground">{compact(c.followers)}</td>
                    <td className="px-6 py-4 font-mono text-success">{c.engagementRate}%</td>
                    <td className="px-6 py-4"><StatusPill tone={c.verified ? 'success' : 'muted'} label={c.verified ? 'Verified' : 'Unverified'} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-sm">
              <thead><tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground"><th className="px-6 py-3 font-medium">Brand</th><th className="px-6 py-3 font-medium">Industry</th><th className="px-6 py-3 font-medium">Campaigns</th><th className="px-6 py-3 text-right font-medium">Total spend</th></tr></thead>
              <tbody>
                {brands.map((b) => (
                  <tr key={b.id} className="border-b border-border last:border-0 transition-colors hover:bg-muted/40">
                    <td className="px-6 py-4"><div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary-50 font-mono text-xs font-bold text-primary-700">{b.logo}</span><span className="font-medium text-foreground">{b.name}</span></div></td>
                    <td className="px-6 py-4 text-muted-foreground">{b.industry}</td>
                    <td className="px-6 py-4 font-mono text-muted-foreground">{b.activeCampaigns}</td>
                    <td className="px-6 py-4 text-right font-mono font-semibold text-foreground">{money(b.totalSpend)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Card>
    </div>
  );
}

/* ---------------- Moderation ---------------- */
function Moderation() {
  return (
    <div className="space-y-6">
      <PageHeader title="Campaign moderation" subtitle="Review, approve, and monitor all campaigns." />
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Pending review" value="1" icon="shield" />
        <StatCard label="Approved (Aug)" value="284" delta={7.4} icon="check" />
        <StatCard label="Flagged" value="3" icon="target" />
      </div>
      <Card className="overflow-hidden">
        <div className="border-b border-border px-6 py-4"><h3 className="font-display text-base font-semibold text-foreground">All campaigns</h3></div>
        <div className="scroll-area overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground"><th className="px-6 py-3 font-medium">Campaign</th><th className="px-6 py-3 font-medium">Brand</th><th className="px-6 py-3 font-medium">Budget</th><th className="px-6 py-3 font-medium">Status</th><th className="px-6 py-3 text-right font-medium">Action</th></tr></thead>
            <tbody>
              {campaigns.map((c) => (
                <tr key={c.id} className="border-b border-border last:border-0 transition-colors hover:bg-muted/40">
                  <td className="px-6 py-4 font-medium text-foreground">{c.name}</td>
                  <td className="px-6 py-4 text-muted-foreground">{c.brand}</td>
                  <td className="px-6 py-4 font-mono text-muted-foreground">{money(c.budget, { compact: true })}</td>
                  <td className="px-6 py-4"><StatusPill tone={statusMeta[c.status].tone} label={statusMeta[c.status].label} /></td>
                  <td className="px-6 py-4 text-right"><Button variant="ghost" size="sm" iconRight="arrow-up-right">Review</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

/* ---------------- Payouts ---------------- */
function AdminPayouts() {
  return (
    <div className="space-y-6">
      <PageHeader title="Payouts" subtitle="Process and audit all creator payouts." action={<Button icon="wallet">Run batch</Button>} />
      <div className="grid gap-4 sm:grid-cols-4">
        <StatCard label="Queued" value="$142K" icon="wallet" />
        <StatCard label="Processing" value="$38K" icon="target" />
        <StatCard label="Paid (Aug)" value="$1.9M" delta={22.1} icon="check" />
        <StatCard label="Failed" value="$4.2K" icon="trending-down" />
      </div>
      <Card className="overflow-hidden">
        <div className="scroll-area overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground"><th className="px-6 py-3 font-medium">Creator</th><th className="px-6 py-3 font-medium">Campaign</th><th className="px-6 py-3 font-medium">Method</th><th className="px-6 py-3 font-medium">Status</th><th className="px-6 py-3 text-right font-medium">Amount</th></tr></thead>
            <tbody>
              {payouts.map((p) => (
                <tr key={p.id} className="border-b border-border last:border-0 transition-colors hover:bg-muted/40">
                  <td className="px-6 py-4 font-medium text-foreground">{p.creator}</td>
                  <td className="px-6 py-4 text-muted-foreground">{p.campaign}</td>
                  <td className="px-6 py-4 font-mono text-muted-foreground">{p.method}</td>
                  <td className="px-6 py-4"><StatusPill tone={payoutStatusMeta[p.status].tone} label={payoutStatusMeta[p.status].label} /></td>
                  <td className="px-6 py-4 text-right font-mono font-semibold text-foreground">{money(p.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

/* ---------------- Reports ---------------- */
function Reports() {
  return (
    <div className="space-y-6">
      <PageHeader title="Reports" subtitle="Platform-wide analytics and exports." action={<Button variant="outline" icon="arrow-up-right">Export CSV</Button>} />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6"><h3 className="font-display text-base font-semibold text-foreground">Revenue trend</h3><div className="mt-4"><AreaTrend data={trend.map((t) => t.earnings * 160)} labels={trend.map((t) => t.label)} /></div></Card>
        <Card className="p-6"><h3 className="font-display text-base font-semibold text-foreground">Volume by category</h3><div className="mt-4"><BarBreakdown data={categoryPerformance} /></div></Card>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="p-6"><div className="flex items-center gap-2 text-sm text-muted-foreground"><Icon name="users" size={16} />Take rate</div><div className="mt-2 font-mono text-2xl font-bold text-foreground">14%</div></Card>
        <Card className="p-6"><div className="flex items-center gap-2 text-sm text-muted-foreground"><Icon name="zap" size={16} />Fraud blocked</div><div className="mt-2 font-mono text-2xl font-bold text-foreground">$182K</div></Card>
        <Card className="p-6"><div className="flex items-center gap-2 text-sm text-muted-foreground"><Icon name="globe" size={16} />Countries</div><div className="mt-2 font-mono text-2xl font-bold text-foreground">47</div></Card>
      </div>
    </div>
  );
}

export const adminPages: Record<string, () => JSX.Element> = {
  dashboard: Overview,
  users: Users,
  campaigns: Moderation,
  payouts: AdminPayouts,
  reports: Reports,
};
