import type { SVGProps } from 'react';

export type IconName =
  | 'grid'
  | 'compass'
  | 'megaphone'
  | 'chart'
  | 'wallet'
  | 'user'
  | 'users'
  | 'card'
  | 'shield'
  | 'search'
  | 'bell'
  | 'menu'
  | 'close'
  | 'plus'
  | 'check'
  | 'arrow-right'
  | 'arrow-up-right'
  | 'trending-up'
  | 'trending-down'
  | 'eye'
  | 'zap'
  | 'target'
  | 'globe'
  | 'star'
  | 'verified'
  | 'logout'
  | 'chevron-down'
  | 'sparkle'
  | 'play'
  | 'filter'
  | 'moon'
  | 'sun'
  | 'rocket'
  | 'clock'
  | 'dollar'
  | 'settings'
  | 'tiktok'
  | 'instagram'
  | 'youtube';

const paths: Record<IconName, JSX.Element> = {
  settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></>,
  grid: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>,
  compass: <><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5z" /></>,
  megaphone: <><path d="M3 11v2a1 1 0 0 0 1 1h2l4 4V6L6 10H4a1 1 0 0 0-1 1Z" /><path d="M14 8a4 4 0 0 1 0 8" /><path d="M18 5a8 8 0 0 1 0 14" /></>,
  chart: <><path d="M3 3v18h18" /><path d="M7 15l3-4 3 2 4-6" /></>,
  wallet: <><rect x="3" y="6" width="18" height="13" rx="2" /><path d="M3 10h18" /><circle cx="16.5" cy="14" r="1.2" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 20a8 8 0 0 1 16 0" /></>,
  users: <><circle cx="9" cy="8" r="3.5" /><path d="M3 20a6 6 0 0 1 12 0" /><path d="M16 5.5a3.5 3.5 0 0 1 0 7" /><path d="M18 20a6 6 0 0 0-3-5.2" /></>,
  card: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 9h18" /><path d="M7 15h4" /></>,
  shield: <><path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6z" /><path d="m9 12 2 2 4-4" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="m21 21-4-4" /></>,
  bell: <><path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z" /><path d="M10 19a2 2 0 0 0 4 0" /></>,
  menu: <><path d="M3 6h18M3 12h18M3 18h18" /></>,
  close: <><path d="M6 6l12 12M18 6 6 18" /></>,
  plus: <><path d="M12 5v14M5 12h14" /></>,
  check: <><path d="m5 12 5 5L20 7" /></>,
  'arrow-right': <><path d="M5 12h14M13 6l6 6-6 6" /></>,
  'arrow-up-right': <><path d="M7 17 17 7M8 7h9v9" /></>,
  'trending-up': <><path d="M3 17 9 11l4 4 8-8" /><path d="M15 4h6v6" /></>,
  'trending-down': <><path d="M3 7 9 13l4-4 8 8" /><path d="M15 20h6v-6" /></>,
  eye: <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></>,
  zap: <><path d="M13 3 4 14h7l-1 7 9-11h-7z" /></>,
  target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3c2.5 3 2.5 15 0 18M12 3c-2.5 3-2.5 15 0 18" /></>,
  star: <><path d="m12 3 2.6 5.6 6 .6-4.5 4 1.3 6-5.4-3.1L6.6 19.2l1.3-6-4.5-4 6-.6z" /></>,
  verified: <><path d="m12 2 2.2 1.6 2.7-.2 1 2.5 2.3 1.4-.6 2.7.6 2.7-2.3 1.4-1 2.5-2.7-.2L12 22l-2.2-1.6-2.7.2-1-2.5-2.3-1.4.6-2.7-.6-2.7 2.3-1.4 1-2.5 2.7.2z" /><path d="m9 12 2 2 4-4" /></>,
  logout: <><path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3" /><path d="M10 12h10M17 9l3 3-3 3" /></>,
  'chevron-down': <><path d="m6 9 6 6 6-6" /></>,
  sparkle: <><path d="M12 3v6M12 15v6M3 12h6M15 12h6" /><path d="m6.5 6.5 3 3M14.5 14.5l3 3M17.5 6.5l-3 3M9.5 14.5l-3 3" /></>,
  play: <><path d="M7 4v16l13-8z" /></>,
  filter: <><path d="M3 5h18l-7 8v6l-4-2v-4z" /></>,
  moon: <><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></>,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" /></>,
  rocket: <><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-3.95 11a22.35 22.35 0 0 1-6.05 2z" /><path d="M9 21l3-3" /><path d="M15 9l-3-3" /></>,
  clock: <><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>,
  dollar: <><circle cx="12" cy="12" r="10" /><path d="M12 6v12M15 9.5a2.5 2.5 0 0 0-5 0c0 3 5 2 5 5a2.5 2.5 0 0 1-5 0" /></>,
  tiktok: <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />,
  instagram: <><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></>,
  youtube: <><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" /><polygon points="10 15 15 12 10 9 10 15" fill="currentColor" /></>,
};

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
}

export function Icon({ name, size = 20, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
