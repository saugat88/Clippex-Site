import { useState } from 'react';
import { campaigns, statusMeta } from '@/data/campaigns';
import { creators } from '@/data/creators';
import { trend, categoryPerformance } from '@/data/analytics';
import { compact, money } from '@/data/format';
import { AreaTrend, BarBreakdown, LineMulti } from '@/components/charts';
import {
  Badge,
  Button,
  Card,
  Icon,
  Input,
  Modal,
  PageHeader,
  ProgressBar,
  Select,
  StatCard,
  StatusPill,
  Tabs,
} from '@/components/ui';

/* ---------------- Create Campaign Modal ---------------- */
function CreateCampaignModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Create a campaign"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button icon="zap" onClick={onClose}>Launch campaign</Button>
        </>
      }
    >
      <div className="space-y-4">
        <div><label className="mb-1.5 block text-sm font-medium text-foreground">Campaign name</label><Input placeholder="e.g. Fall Collection Push" /></div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div><label className="mb-1.5 block text-sm font-medium text-foreground">Payout model</label><Select className="w-full"><option>CPM — per 1K views</option><option>CPA — per action</option><option>CPC — per click</option><option>Flat + Bonus</option></Select></div>
          <div><label className="mb-1.5 block text-sm font-medium text-foreground">Category</label><Select className="w-full"><option>Beauty</option><option>Tech</option><option>Fitness</option><option>Food</option><option>Finance</option></Select></div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div><label className="mb-1.5 block text-sm font-medium text-foreground">Total budget</label><Input placeholder="$50,000" /></div>
          <div><label className="mb-1.5 block text-sm font-medium text-foreground">Payout rate</label><Input placeholder="$14 / 1K views" /></div>
        </div>
        <div><label className="mb-1.5 block text-sm font-medium text-foreground">Creative brief</label><textarea rows={3} placeholder="Describe the content you want creators to produce…" className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary-100" /></div>
      </div>
    </Modal>
  );
}

import { getCurrentSession } from '@/data/auth';

/* ---------------- Dashboard ---------------- */
function Dashboard() {
  const [modal, setModal] = useState(false);
  const session = getCurrentSession();
  const brandName = session?.name || 'Chaguthi';
  return (
    <div className="space-y-6">
      <PageHeader title="Brand dashboard" subtitle={`${brandName} · performance overview`} action={<Button icon="plus" onClick={() => setModal(true)}>New campaign</Button>} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total spend" value="$128,400" delta={14.2} icon="card" />
        <StatCard label="Reach" value="6.9M" delta={21.4} icon="eye" />
        <StatCard label="Conversions" value="21.2K" delta={17.8} icon="target" />
        <StatCard label="ROAS" value="4.2x" delta={6.1} icon="trending-up" />
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-base font-semibold text-foreground">Views vs. conversions</h3>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-primary-600" />Views</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-primary-300" />Conv.</span>
            </div>
          </div>
          <div className="mt-4">
            <LineMulti
              labels={trend.map((t) => t.label)}
              series={[
                { label: 'Views', values: trend.map((t) => t.views / 40000) },
                { label: 'Conversions', values: trend.map((t) => t.conversions / 100) },
              ]}
            />
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="font-display text-base font-semibold text-foreground">Budget pacing</h3>
          <div className="mt-5 space-y-5">
            {campaigns.filter((c) => c.brand === 'Lumen Skincare').map((c) => {
              const p = Math.round((c.spent / c.budget) * 100);
              return (
                <div key={c.id}>
                  <div className="mb-1.5 flex justify-between text-sm"><span className="font-medium text-foreground">{c.name}</span><span className="font-mono text-muted-foreground">{p}%</span></div>
                  <ProgressBar value={p} />
                </div>
              );
            })}
          </div>
        </Card>
      </div>
      <CreateCampaignModal open={modal} onClose={() => setModal(false)} />
    </div>
  );
}

/* ---------------- Campaigns ---------------- */
function Campaigns() {
  const [modal, setModal] = useState(false);
  const [tab, setTab] = useState('all');
  const filtered = tab === 'all' ? campaigns : campaigns.filter((c) => (tab === 'active' ? c.status === 'active' : c.status === tab));
  return (
    <div className="space-y-6">
      <PageHeader title="Campaigns" subtitle="Manage and monitor all your campaigns." action={<Button icon="plus" onClick={() => setModal(true)}>New campaign</Button>} />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Tabs tabs={[{ key: 'all', label: 'All' }, { key: 'active', label: 'Active' }, { key: 'review', label: 'In review' }, { key: 'draft', label: 'Drafts' }]} active={tab} onChange={setTab} />
        <div className="w-full max-w-xs sm:w-auto"><Input icon="search" placeholder="Search…" /></div>
      </div>
      <Card className="overflow-hidden">
        <div className="scroll-area overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-6 py-3 font-medium">Campaign</th>
                <th className="px-6 py-3 font-medium">Model</th>
                <th className="px-6 py-3 font-medium">Creators</th>
                <th className="px-6 py-3 font-medium">Views</th>
                <th className="px-6 py-3 font-medium">Budget</th>
                <th className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="border-b border-border last:border-0 transition-colors hover:bg-muted/40">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary-50 font-mono text-xs font-bold text-primary-700">{c.brandLogo}</span>
                      <div><div className="font-medium text-foreground">{c.name}</div><div className="text-xs text-muted-foreground">{c.category}</div></div>
                    </div>
                  </td>
                  <td className="px-6 py-4"><Badge tone="primary">{c.model}</Badge></td>
                  <td className="px-6 py-4 font-mono text-muted-foreground">{c.creators}</td>
                  <td className="px-6 py-4 font-mono text-muted-foreground">{compact(c.views)}</td>
                  <td className="px-6 py-4">
                    <div className="font-mono text-xs text-muted-foreground">{money(c.spent, { compact: true })} / {money(c.budget, { compact: true })}</div>
                    <ProgressBar value={(c.spent / c.budget) * 100} className="mt-1 w-24" />
                  </td>
                  <td className="px-6 py-4"><StatusPill tone={statusMeta[c.status].tone} label={statusMeta[c.status].label} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <CreateCampaignModal open={modal} onClose={() => setModal(false)} />
    </div>
  );
}

/* ---------------- Creators (discover roster) ---------------- */
function CreatorsPage() {
  const [q, setQ] = useState('');
  const filtered = creators.filter((c) => c.name.toLowerCase().includes(q.toLowerCase()) || c.niche.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="space-y-6">
      <PageHeader title="Discover creators" subtitle="Find and invite creators that fit your campaigns." />
      <div className="w-full max-w-md"><Input icon="search" placeholder="Search by name or niche…" value={q} onChange={(e) => setQ(e.target.value)} /></div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c) => (
          <Card key={c.id} className="p-5" hover>
            <div className="flex items-start gap-3">
              <img src={c.avatar} alt={c.name} className="h-14 w-14 rounded-full bg-muted object-cover" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5"><span className="truncate font-semibold text-foreground">{c.name}</span>{c.verified && <Icon name="verified" size={15} className="text-primary" />}</div>
                <div className="text-xs text-muted-foreground">{c.handle}</div>
                <Badge tone="muted" className="mt-1.5">{c.niche}</Badge>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 border-t border-border pt-4 text-center">
              <div><div className="font-mono text-sm font-semibold text-foreground">{compact(c.followers)}</div><div className="text-xs text-muted-foreground">Followers</div></div>
              <div><div className="font-mono text-sm font-semibold text-success">{c.engagementRate}%</div><div className="text-xs text-muted-foreground">Engage</div></div>
              <div><div className="font-mono text-sm font-semibold text-foreground">{compact(c.avgViews)}</div><div className="text-xs text-muted-foreground">Avg views</div></div>
            </div>
            <Button size="sm" className="mt-4 w-full" icon="plus">Invite to campaign</Button>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Analytics ---------------- */
function Analytics() {
  return (
    <div className="space-y-6">
      <PageHeader title="Analytics" subtitle="Cross-campaign performance and attribution." action={<Button variant="outline" icon="filter">Last 6 months</Button>} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Impressions" value="6.9M" delta={21.4} icon="eye" />
        <StatCard label="CTR" value="2.8%" delta={0.6} icon="target" />
        <StatCard label="CPA" value="$6.05" delta={-4.2} icon="card" />
        <StatCard label="ROAS" value="4.2x" delta={6.1} icon="trending-up" />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6"><h3 className="font-display text-base font-semibold text-foreground">Spend efficiency</h3><div className="mt-4"><AreaTrend data={trend.map((t) => t.conversions)} labels={trend.map((t) => t.label)} /></div></Card>
        <Card className="p-6"><h3 className="font-display text-base font-semibold text-foreground">ROI by category</h3><div className="mt-4"><BarBreakdown data={categoryPerformance} /></div></Card>
      </div>
    </div>
  );
}

/* ---------------- Billing ---------------- */
function Billing() {
  return (
    <div className="space-y-6">
      <PageHeader title="Billing" subtitle="Manage payment methods and invoices." action={<Button variant="outline" icon="plus">Add funds</Button>} />
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2">
          <h3 className="font-display text-base font-semibold text-foreground">Payment method</h3>
          <div className="mt-4 flex items-center gap-4 rounded-lg border border-border bg-muted/40 p-4">
            <span className="flex h-11 w-16 items-center justify-center rounded-md bg-foreground font-mono text-xs font-bold text-background">VISA</span>
            <div className="flex-1"><div className="font-mono text-sm font-semibold text-foreground">•••• •••• •••• 4021</div><div className="text-xs text-muted-foreground">Expires 09/28</div></div>
            <Badge tone="success">Default</Badge>
          </div>
          <h3 className="mt-8 font-display text-base font-semibold text-foreground">Recent invoices</h3>
          <div className="mt-3 divide-y divide-border">
            {[
              { id: 'INV-2026-084', date: 'Aug 1, 2026', amount: 48200 },
              { id: 'INV-2026-071', date: 'Jul 1, 2026', amount: 41600 },
              { id: 'INV-2026-058', date: 'Jun 1, 2026', amount: 38600 },
            ].map((inv) => (
              <div key={inv.id} className="flex items-center justify-between py-3">
                <div><div className="font-mono text-sm font-medium text-foreground">{inv.id}</div><div className="text-xs text-muted-foreground">{inv.date}</div></div>
                <div className="flex items-center gap-4"><span className="font-mono text-sm font-semibold text-foreground">{money(inv.amount)}</span><Button variant="ghost" size="sm" iconRight="arrow-up-right">PDF</Button></div>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="font-display text-base font-semibold text-foreground">Account balance</h3>
          <div className="mt-4 font-mono text-3xl font-bold text-foreground">$62,340</div>
          <p className="mt-1 text-sm text-muted-foreground">Available for campaigns</p>
          <Button className="mt-5 w-full" icon="plus">Add funds</Button>
          <div className="mt-6 rounded-lg bg-primary-50 p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-primary-700"><Icon name="sparkle" size={16} /> Auto-reload on</div>
            <p className="mt-1 text-xs text-primary-700/70">Balance tops up $25K when it drops below $10K.</p>
          </div>
        </Card>
      </div>
    </div>
  );
}

export const brandPages: Record<string, () => JSX.Element> = {
  dashboard: Dashboard,
  campaigns: Campaigns,
  creators: CreatorsPage,
  analytics: Analytics,
  billing: Billing,
};
