/**
 * Profile API.
 * Placeholder: uses localStorage when USE_MOCK_API is true.
 */
import { api } from "./client";
import { ENDPOINTS } from "./endpoints";
import { USE_MOCK_API } from "./config";
import { STORAGE_KEYS } from "./storageKeys";

export type ProfileData = {
  fullName: string;
  email: string;
  phone: string;
  industry: string;
  job: string;
  role: string;
  socialProfiles: { id: string; platformId: string; url: string }[];
};

/** GET /profile */
export async function getProfile(): Promise<ProfileData | null> {
  if (USE_MOCK_API) {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.profile);
      if (!raw) return null;
      return JSON.parse(raw) as ProfileData;
    } catch {
      return null;
    }
  }
  const data = await api.get<ProfileData | null>(ENDPOINTS.profile.get);
  return data;
}

/** POST /profile — save profile */
export async function saveProfile(data: ProfileData): Promise<ProfileData> {
  if (USE_MOCK_API) {
    localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(data));
    return data;
  }
  return api.post<ProfileData>(ENDPOINTS.profile.save, data);
}
