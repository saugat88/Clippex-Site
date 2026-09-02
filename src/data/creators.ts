import type { Creator } from './types';
import avatarNova from '@/assets/avatars/nova.jpg';
import avatarZephyr from '@/assets/avatars/zephyr.jpg';
import avatarMira from '@/assets/avatars/mira.jpg';
import avatarKai from '@/assets/avatars/kai.jpg';
import avatarSakky from '@/assets/avatars/sakky.jpg';
import avatarXenon from '@/assets/avatars/xenon.jpg';

export const creators: Creator[] = [
  {
    id: 'cr-1',
    name: 'Nova',
    handle: '@novamakes',
    avatar: avatarNova,
    niche: 'Beauty & Skincare',
    followers: 842000,
    avgViews: 210000,
    engagementRate: 7.4,
    platforms: ['tiktok', 'instagram'],
    rating: 4.9,
    verified: true,
  },
  {
    id: 'cr-2',
    name: 'Zephyr',
    handle: '@zephyrbuilds',
    avatar: avatarZephyr,
    niche: 'Tech & Gadgets',
    followers: 1240000,
    avgViews: 480000,
    engagementRate: 5.1,
    platforms: ['youtube', 'x'],
    rating: 4.7,
    verified: true,
  },
  {
    id: 'cr-3',
    name: 'Mira',
    handle: '@miraeats',
    avatar: avatarMira,
    niche: 'Food & Cooking',
    followers: 356000,
    avgViews: 128000,
    engagementRate: 9.2,
    platforms: ['instagram', 'tiktok'],
    rating: 4.8,
    verified: true,
  },
  {
    id: 'cr-4',
    name: 'Kai',
    handle: '@kaimoves',
    avatar: avatarKai,
    niche: 'Fitness',
    followers: 512000,
    avgViews: 190000,
    engagementRate: 6.8,
    platforms: ['tiktok', 'youtube'],
    rating: 4.6,
    verified: false,
  },
  {
    id: 'cr-5',
    name: 'Sakky',
    handle: '@sakkystyle',
    avatar: avatarSakky,
    niche: 'Fashion',
    followers: 978000,
    avgViews: 265000,
    engagementRate: 6.3,
    platforms: ['instagram'],
    rating: 4.9,
    verified: true,
  },
  {
    id: 'cr-6',
    name: 'Xenon',
    handle: '@xenongames',
    avatar: avatarXenon,
    niche: 'Gaming',
    followers: 2100000,
    avgViews: 720000,
    engagementRate: 4.4,
    platforms: ['youtube', 'x'],
    rating: 4.5,
    verified: true,
  },
];

export const currentCreator = creators[0];
