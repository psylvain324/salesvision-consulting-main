/**
 * Integrations API.
 * Placeholder: uses localStorage when USE_MOCK_API is true.
 */
import { api } from "./client";
import { ENDPOINTS } from "./endpoints";
import { USE_MOCK_API } from "./config";
import { STORAGE_KEYS } from "./storageKeys";

export type AddedIntegration = {
  id: string;
  integrationId: string;
  connectedAt: string;
  assignedActions: string[];
  connectionStatus: "pending_auth" | "connected";
  connectedAccount?: string;
};

/** GET /integrations */
export async function listIntegrations(): Promise<AddedIntegration[]> {
  if (USE_MOCK_API) {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.integrations);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  const data = await api.get<AddedIntegration[]>(ENDPOINTS.integrations.list);
  return data;
}

/** POST /integrations — save all integrations */
export async function saveIntegrations(
  integrations: AddedIntegration[]
): Promise<AddedIntegration[]> {
  if (USE_MOCK_API) {
    localStorage.setItem(
      STORAGE_KEYS.integrations,
      JSON.stringify(integrations)
    );
    return integrations;
  }
  return api.post<AddedIntegration[]>(ENDPOINTS.integrations.save, integrations);
}
