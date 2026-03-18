/**
 * Marketing campaigns API.
 * Placeholder: uses localStorage when USE_MOCK_API is true.
 */
import { api } from "./client";
import { ENDPOINTS } from "./endpoints";
import { USE_MOCK_API } from "./config";
import { STORAGE_KEYS } from "./storageKeys";

export type CampaignConfig = {
  frequency?: string;
  frequencyValue?: number;
  scheduleType?: "continuous" | "scheduled";
  runDays?: string[];
  runTimeStart?: string;
  runTimeEnd?: string;
  timezone?: string;
  objective?: string;
  budgetType?: "daily" | "lifetime";
  budgetAmount?: string;
  aiGenerateCaptions?: boolean;
  aiOptimizeTiming?: boolean;
  aiAbTest?: boolean;
  metaPlacements?: string[];
  linkedinTargeting?: string;
  twitterPostType?: string;
  googleCampaignType?: string;
};

export type MarketingCampaign = {
  id: string;
  platformId: string;
  name: string;
  config: CampaignConfig;
  createdAt: string;
};

/** GET /campaigns */
export async function listCampaigns(): Promise<MarketingCampaign[]> {
  if (USE_MOCK_API) {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.campaigns);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  const data = await api.get<MarketingCampaign[]>(ENDPOINTS.campaigns.list);
  return data;
}

/** POST /campaigns */
export async function saveCampaigns(
  campaigns: MarketingCampaign[]
): Promise<MarketingCampaign[]> {
  if (USE_MOCK_API) {
    localStorage.setItem(STORAGE_KEYS.campaigns, JSON.stringify(campaigns));
    return campaigns;
  }
  return api.put<MarketingCampaign[]>(ENDPOINTS.campaigns.saveAll, campaigns);
}
