export type Role = 'creator' | 'brand' | 'admin';

export type CampaignStatus = 'active' | 'draft' | 'review' | 'ended' | 'paused';
export type PayoutStatus = 'paid' | 'processing' | 'pending' | 'failed';
export type Platform = 'tiktok' | 'instagram' | 'youtube' | 'x';

export interface Creator {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  niche: string;
  followers: number;
  avgViews: number;
  engagementRate: number;
  platforms: Platform[];
  rating: number;
  verified: boolean;
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
  industry: string;
  activeCampaigns: number;
  totalSpend: number;
}

export interface Campaign {
  id: string;
  name: string;
  brand: string;
  brandLogo: string;
  status: CampaignStatus;
  model: 'CPM' | 'CPA' | 'CPC' | 'Flat + Bonus' | 'Flat Fee';
  payout: number;
  budget: number;
  spent: number;
  views: number;
  conversions: number;
  creators: number;
  category: string;
  startDate: string;
  endDate: string;
  description: string;
  image?: string;
  matchRate?: number;
  daysLeft?: number;
  endsText?: string;
  spotsLeft?: number;
  creatorsJoined?: string;
  payoutSubtext?: string;
  platforms?: ('tiktok' | 'instagram' | 'youtube')[];
}

export interface Payout {
  id: string;
  campaign: string;
  creator: string;
  amount: number;
  status: PayoutStatus;
  date: string;
  method: string;
}

export interface TimePoint {
  label: string;
  views: number;
  conversions: number;
  earnings: number;
}
