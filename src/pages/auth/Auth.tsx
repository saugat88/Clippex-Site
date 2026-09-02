import { useState } from 'react';
import type { Role } from '@/data/types';
import { Button, Icon, cx } from '@/components/ui';
import logoDark from '@/assets/logo-dark.png';
import logoLight from '@/imports/Light-2.png';
import { authenticate, register, type AuthUser } from '@/data/auth';

const roleCards: { role: 'creator' | 'brand'; title: string; body: string; icon: 'user' | 'megaphone' }[] = [
  { role: 'creator', title: 'Creator', body: 'Find campaigns and get paid for performance.', icon: 'user' },
  { role: 'brand', title: 'Brand', body: 'Launch campaigns and pay for verified results.', icon: 'megaphone' },
];

export function Auth({ onAuth, onBack }: { onAuth: (user: AuthUser) => void; onBack: () => void }) {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [role, setRole] = useState<Role>('creator');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const isSignIn = mode === 'signin';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (isSignIn) {
      try {
        const user = authenticate(email, password);
        onAuth(user);
      } catch (err: any) {
        setError(err.message || 'Invalid email or password.');
      }
    } else {
      if (!name.trim()) {
        setError('Please enter your full name.');
        return;
      }
      if (!email.trim() || !email.includes('@')) {
        setError('Please enter a valid email address.');
        return;
      }
      if (password.length < 4) {
        setError('Password must be at least 4 characters.');
        return;
      }

      try {
        const user = register({ name, email, password, role });
        onAuth(user);
      } catch (err: any) {
        setError(err.message || 'Registration failed.');
      }
    }
  };

  return (
    <div className="grid h-full lg:grid-cols-2">
      {/* ------------------------------------------------------------------ */}
      {/* Left Brand Panel: DARK for Login, LIGHT for Signup                 */}
      {/* ------------------------------------------------------------------ */}
      <div
        className={cx(
          'relative hidden overflow-hidden lg:flex lg:flex-col lg:justify-between lg:p-12 transition-colors duration-500',
          isSignIn
            ? 'bg-[#09090b] text-white'
            : 'bg-[#f5f5f9] text-slate-900 border-r border-slate-200/80',
        )}
      >
        {/* Ambient Glows */}
        {isSignIn ? (
          <>
            <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-purple-500/50 blur-[130px]" />
            <div className="pointer-events-none absolute -bottom-24 -left-16 h-96 w-96 rounded-full bg-indigo-500/40 blur-[130px]" />
          </>
        ) : (
          <>
            <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-purple-300/30 blur-[130px]" />
            <div className="pointer-events-none absolute -bottom-24 -left-16 h-96 w-96 rounded-full bg-indigo-300/25 blur-[130px]" />
          </>
        )}

        {/* Brand Header / Back */}
        <button
          onClick={onBack}
          className={cx(
            'relative flex items-center gap-2 transition-opacity hover:opacity-80 text-left',
            isSignIn ? 'text-white' : 'text-slate-900',
          )}
        >
          <img
            src={isSignIn ? logoDark : logoLight}
            alt="CX Logo"
            className={cx('h-8 w-8 object-contain drop-shadow-sm', isSignIn && 'mix-blend-screen')}
          />
          <span className="font-display text-lg font-extrabold tracking-tight">CLIPPEX</span>
        </button>

        {/* Hero Narrative */}
        <div className="relative">
          <h2
            className={cx(
              'font-display text-4xl font-bold leading-tight tracking-tight',
              isSignIn ? 'text-white' : 'text-slate-900',
            )}
          >
            Performance marketing, finally measurable.
          </h2>
          <p
            className={cx(
              'mt-4 max-w-md leading-relaxed',
              isSignIn ? 'text-white/70' : 'text-slate-600',
            )}
          >
            Verified attribution, automatic payouts, and one dashboard across every platform.
          </p>

          <div className="mt-10 flex gap-8">
            {[
              { k: '$48M+', v: 'Paid out' },
              { k: '12K+', v: 'Creators' },
              { k: '4.2x', v: 'Median ROAS' },
            ].map((s) => (
              <div key={s.v}>
                <div
                  className={cx(
                    'font-mono text-2xl font-bold',
                    isSignIn ? 'text-white' : 'text-slate-900',
                  )}
                >
                  {s.k}
                </div>
                <div className={cx('text-sm', isSignIn ? 'text-white/60' : 'text-slate-500')}>
                  {s.v}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={cx('relative text-sm', isSignIn ? 'text-white/50' : 'text-slate-400')}>
          © 2026 CLIPPEX All rights reserved.
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Right Form Panel: LIGHT for Login, DARK for Signup                 */}
      {/* ------------------------------------------------------------------ */}
      <div
        className={cx(
          'scroll-area relative flex items-center justify-center overflow-y-auto px-5 py-10 overflow-hidden transition-colors duration-500',
          isSignIn ? 'bg-[#fafafc] text-slate-900' : 'bg-[#09090b] text-white',
        )}
      >
        {/* Ambient glow in right panel */}
        {isSignIn ? (
          <>
            <div className="pointer-events-none absolute -top-20 right-0 h-96 w-96 rounded-full bg-purple-500/10 blur-[140px]" />
            <div className="pointer-events-none absolute bottom-0 left-0 h-80 w-80 rounded-full bg-indigo-500/8 blur-[130px]" />
          </>
        ) : (
          <>
            <div className="pointer-events-none absolute -top-20 right-0 h-96 w-96 rounded-full bg-purple-600/20 blur-[140px]" />
            <div className="pointer-events-none absolute bottom-0 left-0 h-80 w-80 rounded-full bg-indigo-600/15 blur-[130px]" />
          </>
        )}

        <div className="relative z-10 w-full max-w-md">
          {/* Mobile Back Button (no theme toggle button anywhere!) */}
          <div className="flex items-center justify-between mb-8 lg:hidden">
            <button
              onClick={onBack}
              className={cx(
                'inline-flex items-center gap-1.5 text-sm transition-colors',
                isSignIn
                  ? 'text-slate-500 hover:text-slate-900'
                  : 'text-neutral-400 hover:text-white',
              )}
            >
              <Icon name="arrow-right" size={15} className="rotate-180" /> Back to home
            </button>
          </div>

          <h1
            className={cx(
              'font-display text-3xl font-bold tracking-tight',
              isSignIn ? 'text-slate-900' : 'text-white',
            )}
          >
            {isSignIn ? 'Welcome back' : 'Create your account'}
          </h1>
          <p
            className={cx(
              'mt-2 text-sm',
              isSignIn ? 'text-slate-500' : 'text-neutral-400',
            )}
          >
            {isSignIn
              ? 'Sign in to access your CLIPPEX workspace.'
              : 'Choose your account type to register.'}
          </p>

          {/* Role selector (Sign-Up Mode only) */}
          {!isSignIn && (
            <div className="mt-6 grid gap-2.5">
              {roleCards.map((r) => (
                <button
                  key={r.role}
                  type="button"
                  onClick={() => setRole(r.role)}
                  className={cx(
                    'flex items-center gap-3 rounded-xl border p-3.5 text-left transition-all',
                    role === r.role
                      ? 'border-purple-500 bg-purple-500/15 ring-2 ring-purple-500/30 text-white'
                      : 'border-white/10 bg-[#141416] hover:border-white/20 text-neutral-300',
                  )}
                >
                  <span
                    className={cx(
                      'flex h-10 w-10 items-center justify-center rounded-lg',
                      role === r.role ? 'bg-purple-600 text-white' : 'bg-white/5 text-neutral-400',
                    )}
                  >
                    <Icon name={r.icon} size={19} />
                  </span>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-white">{r.title}</div>
                    <div className="text-xs text-neutral-400">{r.body}</div>
                  </div>
                  {role === r.role && <Icon name="check" size={18} className="text-purple-400" />}
                </button>
              ))}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-4 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3.5 py-2.5 text-xs font-medium text-rose-400">
              {error}
            </div>
          )}

          <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
            {!isSignIn && (
              <div>
                <label className="mb-1.5 block text-sm font-medium text-neutral-300">
                  Full name
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">
                    <Icon name="user" size={17} />
                  </span>
                  <input
                    placeholder="e.g. Alex Rivera"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="h-10 w-full rounded-md border border-white/10 bg-[#141416] pl-9 pr-3 text-sm text-white placeholder:text-neutral-500 transition-colors focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                  />
                </div>
              </div>
            )}

            <div>
              <label
                className={cx(
                  'mb-1.5 block text-sm font-medium',
                  isSignIn ? 'text-slate-700' : 'text-neutral-300',
                )}
              >
                Email address
              </label>
              <div className="relative">
                <span
                  className={cx(
                    'pointer-events-none absolute left-3 top-1/2 -translate-y-1/2',
                    isSignIn ? 'text-slate-400' : 'text-neutral-500',
                  )}
                >
                  <Icon name="globe" size={17} />
                </span>
                <input
                  type="email"
                  placeholder="name@work-email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={cx(
                    'h-10 w-full rounded-md border pl-9 pr-3 text-sm transition-colors focus:outline-none focus:ring-2',
                    isSignIn
                      ? 'border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-purple-600 focus:ring-purple-100'
                      : 'border-white/10 bg-[#141416] text-white placeholder:text-neutral-500 focus:border-purple-500 focus:ring-purple-500/20',
                  )}
                />
              </div>
            </div>

            <div>
              <label
                className={cx(
                  'mb-1.5 block text-sm font-medium',
                  isSignIn ? 'text-slate-700' : 'text-neutral-300',
                )}
              >
                Password
              </label>
              <div className="relative">
                <span
                  className={cx(
                    'pointer-events-none absolute left-3 top-1/2 -translate-y-1/2',
                    isSignIn ? 'text-slate-400' : 'text-neutral-500',
                  )}
                >
                  <Icon name="shield" size={17} />
                </span>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={cx(
                    'h-10 w-full rounded-md border pl-9 pr-3 text-sm transition-colors focus:outline-none focus:ring-2',
                    isSignIn
                      ? 'border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-purple-600 focus:ring-purple-100'
                      : 'border-white/10 bg-[#141416] text-white placeholder:text-neutral-500 focus:border-purple-500 focus:ring-purple-500/20',
                  )}
                />
              </div>
            </div>

            {isSignIn && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-300 accent-purple-600"
                    defaultChecked
                  />
                  <span>Remember me</span>
                </label>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setError('Password reset instructions sent to your email.');
                  }}
                  className="font-medium text-purple-600 hover:text-purple-700 hover:underline"
                >
                  Forgot password?
                </a>
              </div>
            )}

            <Button type="submit" size="lg" className="w-full" iconRight="arrow-right">
              {isSignIn ? 'Sign in' : 'Create account'}
            </Button>
          </form>

          <p
            className={cx(
              'mt-6 text-center text-sm',
              isSignIn ? 'text-slate-600' : 'text-neutral-400',
            )}
          >
            {isSignIn ? "Don't have an account? " : 'Already have an account? '}
            <button
              type="button"
              onClick={() => {
                setMode(isSignIn ? 'signup' : 'signin');
                setError(null);
                setName('');
                setEmail('');
                setPassword('');
              }}
              className={cx(
                'font-semibold hover:underline',
                isSignIn ? 'text-purple-600 hover:text-purple-700' : 'text-purple-400 hover:text-purple-300',
              )}
            >
              {isSignIn ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
