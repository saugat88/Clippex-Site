import type { Brand } from './types';

export const brands: Brand[] = [
  { id: 'br-1', name: 'Lumen Skincare', logo: 'LS', industry: 'Beauty', activeCampaigns: 4, totalSpend: 128400 },
  { id: 'br-2', name: 'Volt Audio', logo: 'VA', industry: 'Consumer Tech', activeCampaigns: 2, totalSpend: 94200 },
  { id: 'br-3', name: 'Grove Kitchen', logo: 'GK', industry: 'Food & Bev', activeCampaigns: 3, totalSpend: 61800 },
  { id: 'br-4', name: 'Apex Athletics', logo: 'AA', industry: 'Fitness', activeCampaigns: 5, totalSpend: 210500 },
  { id: 'br-5', name: 'Nova Finance', logo: 'NF', industry: 'Fintech', activeCampaigns: 1, totalSpend: 45000 },
];

export const currentBrand = brands[0];
