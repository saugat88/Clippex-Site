import type { Role } from './types';
import avatarSakky from '@/assets/avatars/sakky.jpg';
import avatarXenon from '@/assets/avatars/xenon.jpg';
import avatarChaguthi from '@/assets/avatars/chaguthi.jpg';
import avatarNova from '@/assets/avatars/nova.jpg';

export interface AuthUser {
  id: string;
  email: string;
  password: string;
  name: string;
  role: Role;
  handle: string;
  avatar: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: Role;
  handle?: string;
}

export const SEED_ACCOUNTS: AuthUser[] = [
  {
    id: 'user-admin-sakky',
    email: 'sakky@clippex.com',
    password: 'sakky123',
    name: 'Sakky',
    role: 'admin',
    handle: 'Platform Admin',
    avatar: avatarSakky,
  },
  {
    id: 'user-creator-xenon',
    email: 'xenon@clippex.com',
    password: 'xenon123',
    name: 'Xenon',
    role: 'creator',
    handle: '@xenonlive',
    avatar: avatarXenon,
  },
  {
    id: 'user-brand-chaguthi',
    email: 'chaguthi@clippex.com',
    password: 'chaguthi123',
    name: 'Chaguthi',
    role: 'brand',
    handle: 'Chaguthi Brands',
    avatar: avatarChaguthi,
  },
];

const STORAGE_KEY_USERS = 'clippex_users';
const STORAGE_KEY_SESSION = 'clippex_session';

export function getAllUsers(): AuthUser[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_USERS);
    if (!raw) return SEED_ACCOUNTS;
    const customUsers: AuthUser[] = JSON.parse(raw);
    const customFiltered = customUsers.filter(
      (cu) => !SEED_ACCOUNTS.some((su) => su.email.toLowerCase() === cu.email.toLowerCase())
    );
    return [...SEED_ACCOUNTS, ...customFiltered];
  } catch {
    return SEED_ACCOUNTS;
  }
}

export function getCurrentSession(): AuthUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SESSION);
    if (!raw) return null;
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function saveSession(user: AuthUser): void {
  try {
    localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(user));
  } catch {
    // ignore
  }
}

export function clearSession(): void {
  try {
    localStorage.removeItem(STORAGE_KEY_SESSION);
  } catch {
    // ignore
  }
}

export function authenticate(email: string, pass: string): AuthUser {
  const users = getAllUsers();
  const trimmedEmail = email.trim().toLowerCase();
  const user = users.find(
    (u) => u.email.toLowerCase() === trimmedEmail && u.password === pass
  );

  if (!user) {
    throw new Error('Invalid email or password. Please verify your credentials.');
  }

  saveSession(user);
  return user;
}

export function register(data: RegisterData): AuthUser {
  if (data.role === 'admin') {
    throw new Error('Admin accounts cannot be registered publicly.');
  }

  const users = getAllUsers();
  const trimmedEmail = data.email.trim().toLowerCase();

  const exists = users.some((u) => u.email.toLowerCase() === trimmedEmail);
  if (exists) {
    throw new Error('An account with this email address already exists.');
  }

  const newUser: AuthUser = {
    id: `user-${Date.now()}`,
    email: trimmedEmail,
    password: data.password,
    name: data.name.trim(),
    role: data.role,
    handle: data.handle || (data.role === 'creator' ? `@${data.name.toLowerCase().replace(/\s+/g, '')}` : `${data.name} Team`),
    avatar: data.role === 'creator' ? avatarNova : avatarChaguthi,
  };

  try {
    const raw = localStorage.getItem(STORAGE_KEY_USERS);
    const customUsers: AuthUser[] = raw ? JSON.parse(raw) : [];
    customUsers.push(newUser);
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(customUsers));
  } catch {
    // ignore
  }

  saveSession(newUser);
  return newUser;
}
