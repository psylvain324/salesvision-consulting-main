/**
 * Bookings/availability API.
 * Placeholder: uses localStorage when USE_MOCK_API is true.
 */
import { api } from "./client";
import { ENDPOINTS } from "./endpoints";
import { USE_MOCK_API } from "./config";
import { STORAGE_KEYS } from "./storageKeys";

export type TimeSlotBlock = {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
};

/** GET /bookings/availability */
export async function getAvailability(): Promise<TimeSlotBlock[]> {
  if (USE_MOCK_API) {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.bookings);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  const data = await api.get<TimeSlotBlock[]>(ENDPOINTS.bookings.get);
  return data;
}

/** POST /bookings/availability */
export async function saveAvailability(
  blocks: TimeSlotBlock[]
): Promise<TimeSlotBlock[]> {
  if (USE_MOCK_API) {
    localStorage.setItem(STORAGE_KEYS.bookings, JSON.stringify(blocks));
    return blocks;
  }
  return api.post<TimeSlotBlock[]>(ENDPOINTS.bookings.save, blocks);
}
