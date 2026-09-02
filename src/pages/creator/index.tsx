import { useState } from 'react';
import { campaigns, statusMeta } from '@/data/campaigns';
import { currentCreator } from '@/data/creators';
import { payouts, payoutStatusMeta } from '@/data/payouts';
import { trend, platformSplit, categoryPerformance } from '@/data/analytics';
import { compact, money } from '@/data/format';
import { AreaTrend, BarBreakdown, DonutSplit } from '@/components/charts';
import type { Campaign } from '@/data/types';
import {
  Avatar,
  Badge,
  Button,
  Card,
  EmptyState,
  Icon,
  Input,
  Modal,
  PageHeader,
  ProgressBar,
  Skeleton,
  StatCard,
  StatusPill,
  Tabs,
  cx,
} from '@/components/ui';

import { getCurrentSession } from '@/data/auth';

/* ---------------- Dashboard ---------------- */
function Dashboard() {
  const session = getCurrentSession();
  const creatorName = session?.name || currentCreator.name;
  const active = campaigns.filter((c) => c.status === 'active');
  return (
    <div className="space-y-6">
      <PageHeader
        title={`Welcome back, ${creatorName.split(' ')[0]} 👋`}
        subtitle="Here's how your content is performing this month."
        action={<Button icon="compass">Discover campaigns</Button>}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Earnings (Aug)" value="$26,240" delta={22.3} icon="wallet" />
        <StatCard label="Total views" value="3.4M" delta={19.1} icon="eye" />
        <StatCard label="Conversions" value="9,612" delta={18.5} icon="target" />
        <StatCard label="Active campaigns" value="4" delta={0} icon="megaphone" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-base font-semibold text-foreground">Earnings trend</h3>
              <p className="text-sm text-muted-foreground">Last 6 months</p>
            </div>
            <Badge tone="success"><Icon name="trending-up" size={13} /> +22.3%</Badge>
          </div>
          <div className="mt-4">
            <AreaTrend data={trend.map((t) => t.earnings)} labels={trend.map((t) => t.label)} />
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="font-display text-base font-semibold text-foreground">Audience by platform</h3>
          <div className="mt-6">
            <DonutSplit data={platformSplit} />
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-base font-semibold text-foreground">Active campaigns</h3>
          <Button variant="ghost" size="sm" iconRight="arrow-right">View all</Button>
        </div>
        <div className="space-y-3">
          {active.map((c) => (
            <div key={c.id} className="flex flex-col gap-3 rounded-lg border border-border p-4 sm:flex-row sm:items-center">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary-50 font-mono text-sm font-bold text-primary-700">{c.brandLogo}</span>
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-foreground">{c.name}</div>
                <div className="text-sm text-muted-foreground">{c.brand} · {c.model} · {money(c.payout)}{c.model !== 'Flat + Bonus' ? '/unit' : ''}</div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="font-mono text-sm font-semibold text-foreground">{compact(c.views)}</div>
                  <div className="text-xs text-muted-foreground">views</div>
                </div>
                <StatusPill tone={statusMeta[c.status].tone} label={statusMeta[c.status].label} />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* ---------------- Discover ---------------- */
function Discover() {
  const [cat, setCat] = useState('all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('match');
  const [showAll, setShowAll] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [appliedCampaigns, setAppliedCampaigns] = useState<Record<string, boolean>>({});

  const cats = ['All', 'Gaming', 'Football', 'Podcast', 'Music', 'Tech'];

  const filtered = campaigns
    .filter((c) => {
      const matchesCat =
        cat === 'all' || c.category.toLowerCase() === cat.toLowerCase();
      const matchesSearch =
        search === '' ||
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.brand.toLowerCase().includes(search.toLowerCase()) ||
        c.description.toLowerCase().includes(search.toLowerCase());
      return matchesCat && matchesSearch;
    })
    .sort((a, b) => {
      if (sort === 'match') return (b.matchRate ?? 70) - (a.matchRate ?? 70);
      if (sort === 'payout') return b.payout - a.payout;
      if (sort === 'ending') return (a.daysLeft ?? 30) - (b.daysLeft ?? 30);
      if (sort === 'popular') return b.views - a.views;
      return 0;
    });

  const displayed = showAll ? filtered : filtered.slice(0, 4);

  const handleApply = (id: string) => {
    setAppliedCampaigns((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="space-y-6">
      {/* Page Title & Subtitle */}
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Discover campaigns
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Find campaigns matched to your niche, audience and performance.
        </p>
      </div>

      {/* Top 4 Metrics / Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="flex items-center gap-3.5 rounded-xl border border-white/[0.08] bg-[#121215] p-4 transition-all hover:border-white/15">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.05] border border-white/[0.08] text-white/90">
            <Icon name="rocket" size={20} />
          </div>
          <div>
            <div className="font-mono text-xl font-bold tracking-tight text-foreground">24</div>
            <div className="text-xs font-semibold text-foreground/90">Open campaigns</div>
            <div className="text-[11px] text-muted-foreground/70">Apply now</div>
          </div>
        </div>

        <div className="flex items-center gap-3.5 rounded-xl border border-white/[0.08] bg-[#121215] p-4 transition-all hover:border-white/15">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.05] border border-white/[0.08] text-white/90">
            <Icon name="users" size={20} />
          </div>
          <div>
            <div className="font-mono text-xl font-bold tracking-tight text-foreground">128</div>
            <div className="text-xs font-semibold text-foreground/90">Active creators</div>
            <div className="text-[11px] text-muted-foreground/70">Participating</div>
          </div>
        </div>

        <div className="flex items-center gap-3.5 rounded-xl border border-white/[0.08] bg-[#121215] p-4 transition-all hover:border-white/15">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.05] border border-white/[0.08] text-white/90">
            <Icon name="dollar" size={20} />
          </div>
          <div>
            <div className="font-mono text-xl font-bold tracking-tight text-foreground">$4.2K</div>
            <div className="text-xs font-semibold text-foreground/90">Avg. payout</div>
            <div className="text-[11px] text-muted-foreground/70">Per creator</div>
          </div>
        </div>

        <div className="flex items-center gap-3.5 rounded-xl border border-white/[0.08] bg-[#121215] p-4 transition-all hover:border-white/15">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.05] border border-white/[0.08] text-white/90">
            <Icon name="clock" size={20} />
          </div>
          <div>
            <div className="font-mono text-xl font-bold tracking-tight text-foreground">12</div>
            <div className="text-xs font-semibold text-foreground/90">Ending soon</div>
            <div className="text-[11px] text-muted-foreground/70">Don't miss out</div>
          </div>
        </div>
      </div>

      {/* Search, Filter Pills & Sort Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
        {/* Search */}
        <div className="relative w-full max-w-xs sm:w-72">
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
            <Icon name="search" size={15} />
          </span>
          <input
            type="text"
            placeholder="Search campaigns..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 w-full rounded-xl border border-white/[0.08] bg-[#121215] pl-9 pr-3 text-xs placeholder:text-muted-foreground/70 focus:border-white/20 focus:outline-none transition-all"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {cats.map((c) => {
            const isActive =
              (cat === 'all' && c === 'All') ||
              cat.toLowerCase() === c.toLowerCase();
            return (
              <button
                key={c}
                onClick={() => setCat(c.toLowerCase())}
                className={cx(
                  'rounded-full px-3.5 py-1 text-xs font-medium transition-all',
                  isActive
                    ? 'bg-white text-black shadow-xs'
                    : 'border border-white/[0.08] bg-[#121215]/60 text-muted-foreground hover:border-white/15 hover:text-foreground'
                )}
              >
                {c}
              </button>
            );
          })}
        </div>

        {/* Sort Dropdown */}
        <div className="relative ml-auto sm:ml-0">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="h-9 rounded-xl border border-white/[0.08] bg-[#121215] px-3 pr-7 text-xs font-medium text-foreground focus:border-white/20 focus:outline-none transition-all appearance-none cursor-pointer"
          >
            <option value="match">Sort: Best match</option>
            <option value="payout">Sort: Highest payout</option>
            <option value="ending">Sort: Ending soon</option>
            <option value="popular">Sort: Most popular</option>
          </select>
          <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground">
            <Icon name="chevron-down" size={13} />
          </span>
        </div>
      </div>

      {/* Section Heading: Recommended for you */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-start gap-2">
          <span className="mt-0.5 text-muted-foreground">
            <Icon name="sparkle" size={16} />
          </span>
          <div>
            <h2 className="font-display text-base font-semibold text-foreground">
              Recommended for you
            </h2>
            <p className="text-xs text-muted-foreground/80">
              Top campaigns matched to your audience and niche.
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            setCat('all');
            setSearch('');
            setShowAll(true);
          }}
          className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          View all <Icon name="arrow-right" size={12} />
        </button>
      </div>

      {/* Grid of Campaign Cards */}
      {displayed.length === 0 ? (
        <EmptyState
          icon="compass"
          title="No campaigns found"
          message="Try adjusting your search terms or selecting a different category."
          action={
            <Button variant="outline" onClick={() => { setCat('all'); setSearch(''); }}>
              Clear filters
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {displayed.map((c) => {
            const isApplied = appliedCampaigns[c.id];
            return (
              <div
                key={c.id}
                className="group flex flex-col rounded-2xl border border-white/[0.08] bg-[#121215] hover:border-white/20 transition-all duration-300 overflow-hidden"
              >
                {/* Product Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/40">
                  {c.image ? (
                    <img
                      src={c.image}
                      alt={c.name}
                      className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  ) : (
                    <div className="h-full w-full bg-muted flex items-center justify-center text-muted-foreground">
                      <Icon name="megaphone" size={28} />
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-[#121215] via-transparent to-black/20 pointer-events-none" />

                  {/* Top-Right Model Badge */}
                  <div className="absolute top-3 right-3 rounded-full bg-black/70 border border-white/10 backdrop-blur-md px-2.5 py-0.5 text-[11px] font-medium text-white/80">
                    {c.model}
                  </div>
                </div>

                {/* Card Content */}
                <div className="flex flex-1 flex-col p-4 pt-3.5">
                  {/* Brand line */}
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span className="flex h-5 w-5 items-center justify-center rounded bg-white/[0.08] font-mono text-[10px] font-semibold text-white/90 border border-white/10">
                      {c.brandLogo}
                    </span>
                    <span className="font-medium text-foreground/90">{c.brand}</span>
                  </div>

                  {/* Title */}
                  <h3
                    onClick={() => setSelectedCampaign(c)}
                    className="mt-2 font-display text-base font-semibold text-foreground leading-snug hover:text-white cursor-pointer transition-colors"
                  >
                    {c.name}
                  </h3>

                  {/* Description */}
                  <p className="mt-1.5 text-xs text-muted-foreground/80 leading-relaxed line-clamp-2">
                    {c.description}
                  </p>

                  {/* Platforms Row */}
                  <div className="mt-3 flex items-center gap-1.5 text-[11px] text-muted-foreground/70">
                    <span className="rounded-md bg-white/[0.04] border border-white/[0.06] px-2 py-0.5">TikTok</span>
                    <span className="rounded-md bg-white/[0.04] border border-white/[0.06] px-2 py-0.5">Reels</span>
                    <span className="rounded-md bg-white/[0.04] border border-white/[0.06] px-2 py-0.5">Shorts</span>
                  </div>

                  <div className="my-3 border-t border-white/[0.06]" />

                  {/* Payout & Time Remaining */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-mono text-base font-bold text-emerald-400">
                        {c.model === 'Flat Fee' || c.payout >= 100
                          ? money(c.payout)
                          : `$${c.payout < 10 ? c.payout.toFixed(2) : c.payout}`}
                      </div>
                      <div className="text-[11px] text-muted-foreground/70">
                        {c.payoutSubtext || (c.model === 'CPM' ? 'per 1K views' : 'per action')}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs font-medium text-foreground/90">
                        {c.daysLeft ?? 14}d left
                      </div>
                      <div className="text-[11px] text-muted-foreground/70">
                        {c.endsText ?? 'Ends soon'}
                      </div>
                    </div>
                  </div>

                  <div className="my-3 border-t border-white/[0.06]" />

                  {/* Stats & CTA */}
                  <div className="flex items-center justify-between gap-2 mt-auto">
                    <div className="text-[11px] text-muted-foreground/70">
                      <span>{c.creatorsJoined ?? `${c.creators}K`} joined</span>
                      <span className="mx-1.5 opacity-40">·</span>
                      <span>{c.spotsLeft ?? 20} spots</span>
                    </div>

                    <button
                      onClick={() => setSelectedCampaign(c)}
                      className={cx(
                        'rounded-lg border px-3 py-1.5 text-xs font-medium flex items-center gap-1.5 transition-all',
                        isApplied
                          ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                          : 'border-white/10 bg-white/[0.05] hover:bg-white/[0.1] text-foreground'
                      )}
                    >
                      {isApplied ? (
                        <>Applied <Icon name="check" size={11} /></>
                      ) : (
                        <>View <Icon name="arrow-right" size={11} className="text-muted-foreground" /></>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Load More Button */}
      {filtered.length > 4 && (
        <div className="flex justify-center pt-2">
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/20 px-4 py-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-all"
          >
            <span>{showAll ? 'Show fewer campaigns' : 'Load more campaigns'}</span>
            <Icon
              name="chevron-down"
              size={14}
              className={cx('transition-transform', showAll && 'rotate-180')}
            />
          </button>
        </div>
      )}

      {/* Campaign Detail Modal */}
      {selectedCampaign && (
        <Modal
          open={!!selectedCampaign}
          onClose={() => setSelectedCampaign(null)}
          title={selectedCampaign.name}
          footer={
            <>
              <Button variant="outline" onClick={() => setSelectedCampaign(null)}>
                Close
              </Button>
              <Button
                variant="primary"
                icon={appliedCampaigns[selectedCampaign.id] ? 'check' : 'zap'}
                onClick={() => handleApply(selectedCampaign.id)}
              >
                {appliedCampaigns[selectedCampaign.id] ? 'Application Submitted' : 'Apply to Campaign'}
              </Button>
            </>
          }
        >
          <div className="space-y-4">
            {selectedCampaign.image && (
              <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-muted">
                <img
                  src={selectedCampaign.image}
                  alt={selectedCampaign.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-3 right-3 rounded-full bg-black/70 border border-white/10 backdrop-blur-md px-2.5 py-0.5 text-xs font-medium text-white/80">
                  {selectedCampaign.model}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <div className="text-xs text-muted-foreground">Brand</div>
                <div className="font-semibold text-foreground flex items-center gap-1.5">
                  {selectedCampaign.brand}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground">Payout Rate</div>
                <div className="font-mono text-base font-bold text-emerald-400">
                  {selectedCampaign.model === 'Flat Fee' || selectedCampaign.payout >= 100
                    ? money(selectedCampaign.payout)
                    : `$${selectedCampaign.payout}`}
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-foreground">Creative Brief</h4>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                {selectedCampaign.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 rounded-lg border border-border bg-muted/30 p-3 text-xs">
              <div>
                <span className="text-muted-foreground">Time Remaining:</span>
                <div className="font-semibold text-foreground mt-0.5">
                  {selectedCampaign.daysLeft} days left ({selectedCampaign.endsText})
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Availability:</span>
                <div className="font-semibold text-foreground mt-0.5">
                  {selectedCampaign.spotsLeft} spots remaining
                </div>
              </div>
            </div>

            {appliedCampaigns[selectedCampaign.id] && (
              <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/30 p-3 text-xs text-emerald-400 flex items-center gap-2">
                <Icon name="check" size={16} />
                <span>You've applied! We'll notify you as soon as the brand reviews your pitch.</span>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}

/* ---------------- My Campaigns ---------------- */
function MyCampaigns() {
  const [tab, setTab] = useState('active');
  const mine = campaigns.filter((c) => c.status !== 'draft');
  const filtered = tab === 'all' ? mine : mine.filter((c) => (tab === 'active' ? c.status === 'active' : c.status === 'ended' || c.status === 'review'));

  return (
    <div className="space-y-6">
      <PageHeader title="My campaigns" subtitle="Track performance and payouts across your active work." />
      <Tabs tabs={[{ key: 'active', label: 'Active' }, { key: 'past', label: 'Past' }, { key: 'all', label: 'All' }]} active={tab} onChange={setTab} />
      <div className="space-y-4">
        {filtered.map((c) => {
          const progress = Math.round((c.spent / c.budget) * 100);
          return (
            <Card key={c.id} className="p-5" hover>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-50 font-mono text-sm font-bold text-primary-700">{c.brandLogo}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground">{c.name}</span>
                    <StatusPill tone={statusMeta[c.status].tone} label={statusMeta[c.status].label} />
                  </div>
                  <div className="text-sm text-muted-foreground">{c.brand} · {c.model}</div>
                </div>
                <div className="grid grid-cols-3 gap-6 sm:gap-8">
                  <div><div className="font-mono text-sm font-semibold text-foreground">{compact(c.views)}</div><div className="text-xs text-muted-foreground">views</div></div>
                  <div><div className="font-mono text-sm font-semibold text-foreground">{compact(c.conversions)}</div><div className="text-xs text-muted-foreground">conv.</div></div>
                  <div><div className="font-mono text-sm font-semibold text-success">{money(Math.round(c.spent * 0.12))}</div><div className="text-xs text-muted-foreground">earned</div></div>
                </div>
              </div>
              <div className="mt-4">
                <div className="mb-1.5 flex justify-between text-xs text-muted-foreground"><span>Budget used</span><span className="font-mono">{money(c.spent, { compact: true })} / {money(c.budget, { compact: true })}</span></div>
                <ProgressBar value={progress} />
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------- Analytics ---------------- */
function Analytics() {
  return (
    <div className="space-y-6">
      <PageHeader title="Analytics" subtitle="Deep-dive into your content performance." action={<Button variant="outline" icon="filter">Last 6 months</Button>} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Avg. engagement" value="7.4%" delta={1.2} icon="zap" />
        <StatCard label="Avg. views / post" value="210K" delta={8.4} icon="eye" />
        <StatCard label="Conversion rate" value="3.1%" delta={0.4} icon="target" />
        <StatCard label="Follower growth" value="+12.4K" delta={5.6} icon="trending-up" />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h3 className="font-display text-base font-semibold text-foreground">Views over time</h3>
          <div className="mt-4"><AreaTrend data={trend.map((t) => t.views)} labels={trend.map((t) => t.label)} /></div>
        </Card>
        <Card className="p-6">
          <h3 className="font-display text-base font-semibold text-foreground">Performance by category</h3>
          <div className="mt-4"><BarBreakdown data={categoryPerformance} /></div>
        </Card>
      </div>
    </div>
  );
}

/* ---------------- Payouts ---------------- */
function Payouts() {
  const mine = payouts.filter((p) => p.creator === currentCreator.name);
  return (
    <div className="space-y-6">
      <PageHeader title="Payouts" subtitle="Your earnings and withdrawal history." action={<Button icon="wallet">Withdraw funds</Button>} />
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Available balance" value="$5,060" icon="wallet" />
        <StatCard label="Pending" value="$1,240" icon="target" />
        <StatCard label="Lifetime earnings" value="$142,890" delta={22.3} icon="trending-up" />
      </div>
      <Card className="overflow-hidden">
        <div className="border-b border-border px-6 py-4"><h3 className="font-display text-base font-semibold text-foreground">Transaction history</h3></div>
        <div className="scroll-area overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-6 py-3 font-medium">Campaign</th>
                <th className="px-6 py-3 font-medium">Method</th>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 text-right font-medium">Amount</th>
              </tr>
            </thead>
            <tbody>
              {(mine.length ? mine : payouts).map((p) => (
                <tr key={p.id} className="border-b border-border last:border-0 transition-colors hover:bg-muted/40">
                  <td className="px-6 py-4 font-medium text-foreground">{p.campaign}</td>
                  <td className="px-6 py-4 font-mono text-muted-foreground">{p.method}</td>
                  <td className="px-6 py-4 text-muted-foreground">{p.date}</td>
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

/* ---------------- Profile ---------------- */
function Profile() {
  const [loading, setLoading] = useState(false);
  const c = currentCreator;
  return (
    <div className="space-y-6">
      <PageHeader title="Profile" subtitle="Manage your public creator profile and connected platforms." />
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-6 text-center">
          <Avatar src={c.avatar} name={c.name} size={88} />
          <div className="mt-4 flex items-center justify-center gap-1.5">
            <h3 className="font-display text-lg font-semibold text-foreground">{c.name}</h3>
            {c.verified && <Icon name="verified" size={17} className="text-primary" />}
          </div>
          <p className="text-sm text-muted-foreground">{c.handle}</p>
          <Badge tone="primary" className="mt-3">{c.niche}</Badge>
          <div className="mt-6 grid grid-cols-3 gap-3 border-t border-border pt-6">
            <div><div className="font-mono text-base font-bold text-foreground">{compact(c.followers)}</div><div className="text-xs text-muted-foreground">Followers</div></div>
            <div><div className="font-mono text-base font-bold text-foreground">{c.engagementRate}%</div><div className="text-xs text-muted-foreground">Engage</div></div>
            <div className="flex flex-col items-center"><div className="flex items-center gap-0.5 font-mono text-base font-bold text-foreground"><Icon name="star" size={14} className="text-warn" />{c.rating}</div><div className="text-xs text-muted-foreground">Rating</div></div>
          </div>
        </Card>
        <Card className="p-6 lg:col-span-2">
          <h3 className="font-display text-base font-semibold text-foreground">Account details</h3>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div><label className="mb-1.5 block text-sm font-medium text-foreground">Display name</label><Input defaultValue={c.name} /></div>
            <div><label className="mb-1.5 block text-sm font-medium text-foreground">Handle</label><Input defaultValue={c.handle} /></div>
            <div><label className="mb-1.5 block text-sm font-medium text-foreground">Niche</label><Input defaultValue={c.niche} /></div>
            <div><label className="mb-1.5 block text-sm font-medium text-foreground">Email</label><Input defaultValue="nova@clippex.co" /></div>
          </div>
          <div className="mt-6">
            <label className="mb-2 block text-sm font-medium text-foreground">Connected platforms</label>
            <div className="flex flex-wrap gap-2">
              {(['tiktok', 'instagram', 'youtube', 'x'] as const).map((p) => (
                <Badge key={p} tone={c.platforms.includes(p) ? 'success' : 'muted'} className="capitalize">
                  {c.platforms.includes(p) && <Icon name="check" size={12} />} {p}
                </Badge>
              ))}
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <Button
              onClick={() => {
                setLoading(true);
                setTimeout(() => setLoading(false), 1200);
              }}
            >
              {loading ? 'Saving…' : 'Save changes'}
            </Button>
            <Button variant="outline">Cancel</Button>
          </div>
        </Card>
      </div>

      {loading && (
        <Card className="p-6">
          <div className="space-y-3">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </Card>
      )}
    </div>
  );
}

export const creatorPages: Record<string, () => JSX.Element> = {
  dashboard: Dashboard,
  discover: Discover,
  campaigns: MyCampaigns,
  analytics: Analytics,
  payouts: Payouts,
  profile: Profile,
};
