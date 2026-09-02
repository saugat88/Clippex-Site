import type { Role } from './types';
import type { IconName } from '@/components/ui/icons';

export interface NavItem {
  key: string;
  label: string;
  icon: IconName;
}

export const navByRole: Record<Role, NavItem[]> = {
  creator: [
    { key: 'dashboard', label: 'Dashboard', icon: 'grid' },
    { key: 'discover', label: 'Discover', icon: 'compass' },
    { key: 'campaigns', label: 'My Campaigns', icon: 'megaphone' },
    { key: 'analytics', label: 'Analytics', icon: 'chart' },
    { key: 'payouts', label: 'Payouts', icon: 'wallet' },
    { key: 'profile', label: 'Profile', icon: 'user' },
    { key: 'settings', label: 'Settings', icon: 'settings' },
  ],
  brand: [
    { key: 'dashboard', label: 'Dashboard', icon: 'grid' },
    { key: 'campaigns', label: 'Campaigns', icon: 'megaphone' },
    { key: 'creators', label: 'Creators', icon: 'users' },
    { key: 'analytics', label: 'Analytics', icon: 'chart' },
    { key: 'billing', label: 'Billing', icon: 'card' },
    { key: 'settings', label: 'Settings', icon: 'settings' },
  ],
  admin: [
    { key: 'dashboard', label: 'Overview', icon: 'grid' },
    { key: 'users', label: 'Users', icon: 'users' },
    { key: 'campaigns', label: 'Moderation', icon: 'shield' },
    { key: 'payouts', label: 'Payouts', icon: 'wallet' },
    { key: 'reports', label: 'Reports', icon: 'chart' },
    { key: 'settings', label: 'Settings', icon: 'settings' },
  ],
};

export const roleMeta: Record<Role, { label: string; defaultPage: string }> = {
  creator: { label: 'Creator', defaultPage: 'dashboard' },
  brand: { label: 'Brand', defaultPage: 'dashboard' },
  admin: { label: 'Admin', defaultPage: 'dashboard' },
};
