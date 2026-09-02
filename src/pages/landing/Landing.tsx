import { useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react';
import heroProductImage from '@/imports/ChatGPT_Image_Sep_3__2026__01_36_45_AM.png';
import logoDark from '@/assets/logo-dark.png';
import logoLight from '@/imports/Light-2.png';
import { useTheme } from '@/hooks/useTheme';
import { creators } from '@/data/creators';
import { trend } from '@/data/analytics';
import { compact } from '@/data/format';
import { AreaTrend, LineMulti } from '@/components/charts';
import { Badge, Button, Card, Icon, cx, type IconName } from '@/components/ui';
import { CountUp, Reveal, useInView } from '@/components/ui/motion';

/* ------------------------------------------------------------------ */
/* Shared landing primitives                                           */
/* ------------------------------------------------------------------ */

function Logo({ inverted }: { inverted?: boolean }) {
  const { theme } = useTheme();
  const isDark = inverted ? false : theme === 'dark';

  return (
    <div className="flex items-center gap-2">
      <img
        src={isDark ? logoDark : logoLight}
        alt="CX Logo"
        className={cx("h-8 w-8 object-contain drop-shadow-sm", isDark && "mix-blend-screen")}
      />
      <span className={cx('font-display text-lg font-extrabold tracking-tight', inverted ? 'text-background' : 'text-foreground')}>
        CLIPPEX
      </span>
    </div>
  );
}

function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cx('inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-primary', className)}>
      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
      {children}
    </span>
  );
}

/* Recurring CLIPPEX visual motif: faint dotted grid + atmospheric lavender wash */
function Atmosphere({ className }: { className?: string }) {
  return (
    <div className={cx('pointer-events-none absolute inset-0 overflow-hidden', className)} aria-hidden>
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage: 'radial-gradient(circle, var(--color-border) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent 75%)',
        }}
      />
    </div>
  );
}

/* A tiny sparkline used inside product mock cards — draws itself into view */
function Sparkline({ values, className, stroke = 'var(--color-primary-600)' }: { values: number[]; className?: string; stroke?: string }) {
  const { ref, inView } = useInView<SVGSVGElement>();
  const w = 120;
  const h = 36;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const pts = values.map((v, i) => `${(i / (values.length - 1)) * w},${h - ((v - min) / (max - min || 1)) * h}`).join(' ');
  return (
    <svg ref={ref} viewBox={`0 0 ${w} ${h}`} className={className} preserveAspectRatio="none" aria-hidden>
      <polyline
        points={pts}
        fill="none"
        stroke={stroke}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={inView ? 'animate-draw' : undefined}
        style={{ ['--draw-len' as string]: '260' }}
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const flow: { step: string; icon: IconName; title: string; body: string }[] = [
  { step: '01', icon: 'compass', title: 'Discover', body: 'Creators browse open briefs matched to their niche, reach and past performance.' },
  { step: '02', icon: 'target', title: 'Create', body: 'Brands set budget and payout model; creators produce and publish tracked content.' },
  { step: '03', icon: 'eye', title: 'Perform', body: 'Every view and conversion is verified server-side with built-in fraud detection.' },
  { step: '04', icon: 'wallet', title: 'Earn', body: 'Payouts fire automatically against real, measured results — no invoices, no waiting.' },
];

const trustPillars: { icon: IconName; title: string; body: string }[] = [
  { icon: 'verified', title: 'Verified', body: 'Independent attribution on every impression and conversion.' },
  { icon: 'globe', title: 'Transparent', body: 'Live dashboards both sides can audit in real time.' },
  { icon: 'shield', title: 'Secure', body: 'SOC 2 infrastructure with compliance review before launch.' },
  { icon: 'target', title: 'Measurable', body: 'Every dollar is tied to a verified outcome.' },
];

const testimonials = [
  {
    quote: 'CLIPPEX changed how we allocate performance budget. Paying on verified views reduced our CPA by 42% in 60 days.',
    name: 'Marcus Vance',
    role: 'Head of Growth, Volt Audio',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    rating: 5,
  },
  {
    quote: 'No more chasing invoices or negotiating upfront fees. I clip, post, hit numbers, and get paid same-day.',
    name: 'Nova Rivera',
    role: 'Fitness & Lifestyle Creator (2.4M)',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
    rating: 5,
  },
  {
    quote: 'The verification layer gives our legal and brand safety teams total confidence running creator performance at scale.',
    name: 'Elena Chen',
    role: 'VP Marketing, Apex Apparel',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80',
    rating: 5,
  },
];

const plans = [
  {
    name: 'Starter',
    price: '$0',
    note: 'Free to join & browse',
    points: ['Access to open campaigns', 'Server-side tracking link', 'Standard payout schedule', 'Community Discord access'],
    cta: 'Start free',
    highlight: false,
  },
  {
    name: 'Pro Brand',
    price: '$299',
    note: '/month + 5% payout fee',
    points: ['Unlimited active campaigns', 'Full creator roster access', 'Custom payout triggers (CPA / CPM)', 'Real-time anti-fraud analytics', 'Dedicated account manager'],
    cta: 'Start 14-day trial',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    note: 'Bespoke performance',
    points: ['Dedicated attribution pipeline', 'Custom legal & compliance review', 'Volume fee discounts', 'SLA & 24/7 priority support', 'Multi-brand team seats'],
    cta: 'Contact sales',
    highlight: false,
  },
];

/* ------------------------------------------------------------------ */
/* Hero interactive 3D product mockup                                 */
/* ------------------------------------------------------------------ */

function HeroProduct() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -(py * 7), y: px * 7 });
  };

  const handlePointerLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative flex items-center justify-center p-2 lg:p-4"
      style={{ perspective: '1100px' }}
    >
      <div className="relative flex items-center justify-center">
        {/* Subtle radial glow under product */}
        <div className="pointer-events-none absolute -inset-6 rounded-full bg-purple-600/30 blur-[75px] dark:bg-purple-600/40" />

        <img
          src={heroProductImage}
          alt="CLIPPEX product dashboard showing the Summer Glow Launch campaign with 2.7M verified views, live performance chart, a cleared $3,820 creator payout, and a creator video clip"
          className="relative z-10 w-full max-w-[490px] sm:max-w-[520px] select-none drop-shadow-2xl transition-transform duration-300 ease-out will-change-transform"
          style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
          draggable={false}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export function Landing({ onEnter }: { onEnter: () => void }) {
  return (
    <div className="scroll-area relative h-full overflow-y-auto bg-background">
      {/* Nav */}
      <header className="sticky top-0 z-30 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5">
          <Logo />
          <div className="flex items-center gap-7">
            <nav className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex">
              <a href="#how" className="transition-colors hover:text-foreground">How it works</a>
              <a href="#creators" className="transition-colors hover:text-foreground">For creators</a>
              <a href="#brands" className="transition-colors hover:text-foreground">For brands</a>
              <a href="#pricing" className="transition-colors hover:text-foreground">Pricing</a>
            </nav>
            <Button size="sm" onClick={onEnter}>Sign in</Button>
          </div>
        </div>
      </header>

      {/* ---------------- 1. Hero (Full-Width with Edge Lighting) ---------------- */}
      <section className="relative w-full overflow-hidden flex items-center min-h-[560px] lg:min-h-[640px]">
        <Atmosphere />
        {/* Full-width edge ambient glow cones */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-[550px] w-[550px] rounded-full bg-gradient-to-br from-purple-600/30 via-violet-600/20 to-transparent blur-[140px]" />
        <div className="pointer-events-none absolute -left-20 top-20 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-indigo-600/25 via-purple-600/20 to-transparent blur-[130px]" />
        <div className="pointer-events-none absolute left-1/3 bottom-0 h-72 w-96 rounded-full bg-purple-600/20 blur-[120px]" />

        <div className="relative mx-auto grid max-w-5xl w-full items-center gap-8 lg:gap-10 px-5 py-14 lg:py-20 lg:grid-cols-[1fr_1.1fr]">
          <div className="flex flex-col justify-between self-stretch py-1">
            <div>
              <h1 className="font-display text-4xl sm:text-[46px] lg:text-[48px] font-extrabold leading-[1.08] tracking-tight text-foreground">
                Pay creators for<br />
                <span className="text-primary">results</span>, not promises.
              </h1>
              <p className="mt-4 max-w-md text-sm sm:text-base leading-relaxed text-muted-foreground">
                CLIPPEX connects brands with vetted creators and pays out against verified views and conversions. No flat fees, no guesswork — just measurable growth.
              </p>
            </div>
            <div className="pt-6 flex flex-col items-start gap-3">
              <Button
                size="lg"
                variant="primary"
                className="min-w-[270px] sm:min-w-[280px] pl-7 pr-16 justify-start text-[15px]"
                iconRight="arrow-right"
                onClick={onEnter}
              >
                Launch a campaign
              </Button>
              <Button
                size="lg"
                variant="dark"
                className="min-w-[270px] sm:min-w-[280px] pl-7 pr-16 justify-start text-[15px]"
                iconRight="arrow-right"
                onClick={onEnter}
              >
                Join a campaign
              </Button>
            </div>
          </div>
          <HeroProduct />
        </div>
      </section>

      {/* ---------------- 2. Metrics band (Full-Width) ---------------- */}
      <section className="w-full border-y border-border bg-card">
        <div className="mx-auto grid max-w-5xl grid-cols-1 sm:grid-cols-3 items-center gap-6 px-5 py-8">
          <div className="flex flex-col items-start">
            <CountUp
              value={48}
              prefix="$"
              suffix="M+"
              decimals={0}
              className="font-mono text-3xl font-bold text-foreground"
            />
            <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground mt-1">Creator payouts</div>
          </div>
          <div className="flex flex-col sm:items-center">
            <CountUp
              value={12}
              prefix=""
              suffix="K+"
              decimals={0}
              className="font-mono text-3xl font-bold text-foreground"
            />
            <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground mt-1">Active creators</div>
          </div>
          <div className="flex flex-col sm:items-end">
            <CountUp
              value={4.2}
              prefix=""
              suffix="x"
              decimals={1}
              className="font-mono text-3xl font-bold text-foreground"
            />
            <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground mt-1">Median ROAS</div>
          </div>
        </div>
      </section>

      {/* ---------------- 3. How it works (Full-Width with Edge Lighting) ---------------- */}
      <section id="how" className="relative w-full overflow-hidden border-b border-border/40 py-20">
        <Atmosphere />
        {/* Full-width edge ambient glow cones */}
        <div className="pointer-events-none absolute -right-24 top-1/4 h-[550px] w-[550px] rounded-full bg-gradient-to-br from-purple-600/25 via-violet-600/15 to-transparent blur-[150px]" />
        <div className="pointer-events-none absolute -left-24 bottom-1/4 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-indigo-600/22 via-purple-600/15 to-transparent blur-[150px]" />

        <div className="relative mx-auto max-w-5xl px-5">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div className="max-w-xl">
              <Eyebrow>How CLIPPEX works</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                A connected system, from brief to payout
              </h2>
              <p className="mt-3 text-muted-foreground">
                Four seamless steps, one continuous loop of measurable performance.
              </p>
            </div>
            <div className="hidden sm:inline-flex items-center gap-2 self-start md:self-end text-xs font-mono text-muted-foreground uppercase tracking-wider bg-card/80 border border-border px-3.5 py-1.5 rounded-full shadow-sm">
              <span className="h-2 w-2 rounded-full bg-purple-500 animate-pulse" />
              Automated loop
            </div>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {flow.map((f, i) => (
              <Reveal key={f.title} delay={i * 100} className="relative">
                <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-card/60 p-6 backdrop-blur-md transition-all duration-300 hover:border-purple-500/50 hover:bg-card/90 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1">
                  <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-purple-500/10 blur-xl transition-all duration-500 group-hover:bg-purple-500/25 group-hover:scale-125" />

                  <div>
                    <div className="flex items-center justify-between">
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 border border-purple-500/25 text-purple-400 group-hover:bg-purple-500/20 group-hover:text-purple-300 group-hover:border-purple-500/40 transition-all shadow-inner">
                        <Icon name={f.icon} size={22} />
                      </span>
                      <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded-full bg-muted/60 text-muted-foreground border border-border/60 group-hover:border-purple-500/30 group-hover:text-purple-300 transition-colors">
                        {f.step}
                      </span>
                    </div>
                    <h3 className="mt-6 font-display text-lg font-bold text-foreground group-hover:text-purple-200 transition-colors">
                      {f.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {f.body}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center gap-1.5 pt-4 border-t border-border/40 text-xs font-medium text-muted-foreground/80 group-hover:text-purple-400 transition-colors">
                    <span>Step {i + 1}</span>
                    <Icon name="arrow-right" size={13} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- 4. Creator value (Full-Width with Edge Lighting) ---------------- */}
      <section id="creators" className="relative w-full overflow-hidden border-y border-border bg-card/60 py-20">
        {/* Minimal edge glow — dark-grey band */}
        <div className="pointer-events-none absolute -right-24 top-1/4 h-[500px] w-[500px] rounded-full bg-purple-600/[0.04] blur-[180px]" />
        <div className="pointer-events-none absolute -left-24 bottom-10 h-[450px] w-[450px] rounded-full bg-indigo-600/[0.03] blur-[180px]" />

        <div className="relative mx-auto grid max-w-5xl items-center gap-12 px-5 lg:grid-cols-2">
          <div>
            <Eyebrow>For creators</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Create. Perform. Earn.</h2>
            <p className="mt-3 max-w-md text-muted-foreground">Find campaigns that fit your audience, publish tracked content, and watch verified earnings land automatically.</p>
            <ul className="mt-7 space-y-4">
              {[
                { icon: 'compass' as IconName, t: 'Curated campaign discovery', b: 'Briefs matched to your niche, reach and engagement.' },
                { icon: 'eye' as IconName, t: 'Verified view tracking', b: 'Transparent attribution you can see in real time.' },
                { icon: 'wallet' as IconName, t: 'Same-day payouts', b: 'Cash out to bank, PayPal, or Wise the moment you clear.' },
              ].map((x) => (
                <li key={x.t} className="flex gap-3.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600"><Icon name={x.icon} size={18} /></span>
                  <div><div className="text-sm font-semibold text-foreground">{x.t}</div><div className="text-sm text-muted-foreground">{x.b}</div></div>
                </li>
              ))}
            </ul>
            <Button className="mt-8" onClick={onEnter} iconRight="arrow-right">Join as a creator</Button>
          </div>

          {/* Product mock: creator earnings */}
          <Card className="p-6 shadow-md border-border/80 bg-card/70 backdrop-blur-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img src={creators[0].avatar} alt="" className="h-9 w-9 rounded-full bg-muted object-cover" />
                <div><div className="text-sm font-semibold text-foreground">Nova's earnings</div><div className="text-xs text-muted-foreground">August 2026</div></div>
              </div>
              <Badge tone="success"><Icon name="trending-up" size={13} />+22.3%</Badge>
            </div>
            <div className="mt-5 font-mono text-3xl font-bold text-foreground">$26,240</div>
            <div className="mt-4"><AreaTrend data={trend.map((t) => t.earnings)} labels={trend.map((t) => t.label)} height={150} /></div>
            <div className="mt-5 space-y-2.5">
              {[
                { c: 'Summer Glow Launch', a: '$3,820', s: 'Paid' },
                { c: 'Apex Trainer Series', a: '$2,140', s: 'Processing' },
              ].map((r) => (
                <div key={r.c} className="flex items-center justify-between rounded-lg border border-border px-3.5 py-2.5">
                  <span className="text-sm text-foreground">{r.c}</span>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-semibold text-foreground">{r.a}</span>
                    <Badge tone={r.s === 'Paid' ? 'success' : 'info'}>{r.s}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* ---------------- 5. Brand value (Full-Width with Edge Lighting) ---------------- */}
      <section id="brands" className="relative w-full overflow-hidden border-b border-border/40 py-20">
        <Atmosphere />
        {/* Full-width edge ambient glow cones */}
        <div className="pointer-events-none absolute -left-24 top-1/4 h-[550px] w-[550px] rounded-full bg-gradient-to-tr from-indigo-600/25 via-purple-600/15 to-transparent blur-[150px]" />
        <div className="pointer-events-none absolute -right-24 bottom-10 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-purple-600/25 via-violet-600/15 to-transparent blur-[150px]" />

        <div className="relative mx-auto grid max-w-5xl items-center gap-12 px-5 lg:grid-cols-2">
          {/* Product mock: brand analytics */}
          <Card className="relative order-2 p-6 shadow-md border-border/80 bg-card/70 backdrop-blur-md lg:order-1">
            <div className="flex items-center justify-between">
              <div><div className="text-sm font-semibold text-foreground">Campaign performance</div><div className="text-xs text-muted-foreground">Views vs. conversions</div></div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
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
                height={160}
              />
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3 border-t border-border pt-5">
              {[
                { l: 'Reach', v: '6.9M' },
                { l: 'CPA', v: '$6.05' },
                { l: 'ROAS', v: '4.2x' },
              ].map((m) => (
                <div key={m.l}><div className="font-mono text-lg font-semibold text-foreground">{m.v}</div><div className="text-xs text-muted-foreground">{m.l}</div></div>
              ))}
            </div>
          </Card>

          <div className="order-1 lg:order-2">
            <Eyebrow>For brands</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Every dollar tied to a result</h2>
            <p className="mt-3 max-w-md text-muted-foreground">Launch a campaign, activate vetted creators, and pay only for verified performance — measured against outcomes, not impressions you can't trust.</p>
            <ul className="mt-7 space-y-4">
              {[
                { icon: 'megaphone' as IconName, t: 'Launch in minutes', b: 'Define budget, payout model and brief in one flow.' },
                { icon: 'users' as IconName, t: 'Activate the right creators', b: 'Discover roster by niche, engagement and historical ROI.' },
                { icon: 'shield' as IconName, t: 'Brand-safe by default', b: 'Compliance review and fraud detection on every campaign.' },
              ].map((x) => (
                <li key={x.t} className="flex gap-3.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600"><Icon name={x.icon} size={18} /></span>
                  <div><div className="text-sm font-semibold text-foreground">{x.t}</div><div className="text-sm text-muted-foreground">{x.b}</div></div>
                </li>
              ))}
            </ul>
            <Button className="mt-8" onClick={onEnter} iconRight="arrow-right">Launch a campaign</Button>
          </div>
        </div>
      </section>

      {/* ---------------- 6. Trust pillars (Full-Width) ---------------- */}
      <section className="relative w-full overflow-hidden border-y border-border bg-card py-20">
        {/* Minimal edge glow — dark-grey band */}
        <div className="pointer-events-none absolute -left-24 top-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-indigo-600/[0.03] blur-[180px]" />
        <div className="pointer-events-none absolute -right-24 top-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-purple-600/[0.03] blur-[180px]" />

        <div className="relative mx-auto max-w-5xl px-5">
          <div className="mx-auto max-w-xl text-center">
            <Eyebrow className="justify-center">Built on trust</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground">Performance you can prove</h2>
          </div>
          <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {trustPillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 110} className="text-center">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600 transition-transform duration-300 hover:scale-105 shadow-sm"><Icon name={p.icon} size={22} /></span>
                <h3 className="mt-4 font-display text-base font-semibold text-foreground">{p.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- 7. Testimonials (Full-Width with Edge Lighting) ---------------- */}
      <section className="relative w-full overflow-hidden border-b border-border/40 py-20">
        <Atmosphere />
        {/* Full-width edge ambient glow cones */}
        <div className="pointer-events-none absolute -right-24 top-1/3 h-[500px] w-[500px] rounded-full bg-purple-600/22 blur-[150px]" />
        <div className="pointer-events-none absolute -left-24 bottom-1/3 h-[500px] w-[500px] rounded-full bg-indigo-600/18 blur-[150px]" />

        <div className="relative mx-auto max-w-5xl px-5">
          <div className="relative max-w-xl">
            <Eyebrow>What people say</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Loved by both sides of the deal</h2>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 120}>
              <Card className={cx('flex h-full flex-col p-6 transition-shadow duration-300 hover:shadow-md border-border/80 bg-card/70 backdrop-blur-md', i === 1 && 'lg:-translate-y-4 lg:shadow-md')}>
                <div className="flex gap-0.5 text-warn">
                  {Array.from({ length: t.rating }).map((_, s) => <Icon key={s} name="star" size={15} className="fill-warn" />)}
                </div>
                <p className="mt-4 flex-1 text-[15px] leading-relaxed text-foreground">“{t.quote}”</p>
                <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                  {t.avatar ? (
                    <img src={t.avatar} alt={t.name} className="h-10 w-10 rounded-full bg-muted object-cover" />
                  ) : (
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-700">{t.name.split(' ').map((p) => p[0]).slice(0, 2).join('')}</span>
                  )}
                  <div><div className="text-sm font-semibold text-foreground">{t.name}</div><div className="text-xs text-muted-foreground">{t.role}</div></div>
                </div>
              </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- 8. Featured creators (Full-Width) ---------------- */}
      <section className="relative w-full overflow-hidden border-y border-border bg-card/60 py-20">
        {/* Minimal edge glow — dark-grey band */}
        <div className="pointer-events-none absolute -left-24 top-1/4 h-[450px] w-[450px] rounded-full bg-indigo-600/[0.03] blur-[180px]" />
        <div className="pointer-events-none absolute -right-24 bottom-1/4 h-[450px] w-[450px] rounded-full bg-purple-600/[0.04] blur-[180px]" />

        <div className="relative mx-auto max-w-5xl px-5">
          <div className="flex items-end justify-between">
            <div className="max-w-xl">
              <Eyebrow>The roster</Eyebrow>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Creators driving real results</h2>
            </div>
            <Button variant="outline" size="sm" iconRight="arrow-right" onClick={onEnter} className="hidden sm:inline-flex">Browse all</Button>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {creators.slice(0, 6).map((c) => (
              <Card key={c.id} className="flex items-center gap-4 p-4 border-border/80 bg-card/70 backdrop-blur-md" hover>
                <img src={c.avatar} alt={c.name} className="h-14 w-14 rounded-full bg-muted object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="truncate font-semibold text-foreground">{c.name}</span>
                    {c.verified && <Icon name="verified" size={15} className="text-primary" />}
                  </div>
                  <div className="text-xs text-muted-foreground">{c.niche}</div>
                  <div className="mt-1.5 flex gap-3 font-mono text-xs text-muted-foreground">
                    <span>{compact(c.followers)} followers</span>
                    <span className="text-success">{c.engagementRate}% eng.</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- 9. Pricing (Full-Width with Edge Lighting) ---------------- */}
      <section id="pricing" className="relative w-full overflow-hidden border-b border-border/40 py-20">
        <Atmosphere />
        {/* Full-width edge ambient glow cones */}
        <div className="pointer-events-none absolute -right-24 top-1/3 h-[550px] w-[550px] rounded-full bg-purple-600/22 blur-[150px]" />
        <div className="pointer-events-none absolute -left-24 bottom-1/3 h-[500px] w-[500px] rounded-full bg-indigo-600/18 blur-[150px]" />

        <div className="relative mx-auto max-w-5xl px-5">
          <div className="relative mx-auto max-w-xl text-center">
            <Eyebrow className="justify-center">Pricing</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Plans that scale with performance</h2>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {plans.map((p, i) => (
              <Reveal key={p.name} delay={i * 110}>
              <Card className={cx('relative flex h-full flex-col p-7 transition-shadow duration-300 hover:shadow-md border-border/80 bg-card/70 backdrop-blur-md', p.highlight && 'border-primary ring-2 ring-primary-100')}>
                {p.highlight && <Badge tone="primary" className="absolute -top-3 left-7">Most popular</Badge>}
                <h3 className="font-display text-lg font-semibold text-foreground">{p.name}</h3>
                <div className="mt-3 flex items-baseline gap-1.5">
                  <span className="font-display text-4xl font-extrabold text-foreground">{p.price}</span>
                  <span className="text-sm text-muted-foreground">{p.note}</span>
                </div>
                <ul className="mt-6 flex-1 space-y-3">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-2.5 text-sm text-foreground">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-50 text-primary-600"><Icon name="check" size={13} /></span>
                      {pt}
                    </li>
                  ))}
                </ul>
                <Button className="mt-7" variant={p.highlight ? 'primary' : 'outline'} onClick={onEnter}>{p.cta}</Button>
              </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- 10. Final CTA (Full-Width with Edge Lighting) ---------------- */}
      <section className="relative w-full overflow-hidden py-24">
        {/* Full-width edge ambient glow cones */}
        <div className="pointer-events-none absolute -left-24 top-1/2 -translate-y-1/2 h-[550px] w-[550px] rounded-full bg-indigo-600/22 blur-[160px]" />
        <div className="pointer-events-none absolute -right-24 top-1/2 -translate-y-1/2 h-[550px] w-[550px] rounded-full bg-purple-600/25 blur-[160px]" />

        <div className="relative mx-auto max-w-5xl px-5">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#121217] via-[#0e0e13] to-[#161224] px-8 py-14 sm:px-14 shadow-2xl shadow-purple-950/40">
            <div className="pointer-events-none absolute -right-16 -top-16 h-96 w-96 rounded-full bg-purple-600/25 blur-[120px]" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-80 w-80 rounded-full bg-indigo-600/20 blur-[120px]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(147,51,234,0.12),transparent_65%)]" />

            <div className="relative grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
                  Turn views into value.
                </h2>
                <p className="mt-4 max-w-md text-base leading-relaxed text-neutral-300">
                  Join thousands of brands and creators growing together on measurable performance.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3.5">
                  <Button size="lg" variant="primary" icon="zap" onClick={onEnter} className="shadow-lg shadow-purple-600/25">
                    Get started free
                  </Button>
                  <Button size="lg" variant="dark" onClick={onEnter}>
                    Book a demo
                  </Button>
                </div>
              </div>

              <div className="hidden rounded-2xl border border-white/10 bg-[#0d0d12]/90 p-6 backdrop-blur-xl shadow-2xl lg:block">
                <div className="flex items-center justify-between text-xs text-neutral-400">
                  <span>Net creator payouts</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-emerald-400">
                    <Icon name="trending-up" size={13} />
                    YTD
                  </span>
                </div>
                <div className="mt-2 font-mono text-3xl font-bold text-white">$48.2M</div>
                <div className="mt-3">
                  <Sparkline values={[12, 18, 15, 24, 30, 28, 40, 52]} className="h-10 w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Footer (Full-Width) ---------------- */}
      <footer className="w-full border-t border-border/60 bg-card/40 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row">
          <Logo />
          <p className="text-sm text-muted-foreground">© 2026 CLIPPEX All rights reserved.</p>
          <div className="flex gap-5 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
// force hmr 2
