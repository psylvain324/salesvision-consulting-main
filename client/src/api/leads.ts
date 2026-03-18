/**
 * Leads API.
 * Placeholder: returns empty array when USE_MOCK_API is true.
 * Replace with real api calls when backend is ready.
 */
import { api } from "./client";
import { ENDPOINTS } from "./endpoints";
import { USE_MOCK_API, API_BASE_URL } from "./config";

export type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  source: string;
  notes: string;
  group?: string;
  isReferral?: boolean;
  referralSource?: string;
  referralPaymentMade?: boolean;
  referralPaymentAmount?: number;
  /** ISO date string when lead was first captured */
  initialCaptureDate?: string;
  /** ISO date string for next follow-up */
  nextFollowUpDate?: string;
  /** Current workflow step label */
  currentStep?: string;
  /** Next workflow step label */
  nextStep?: string;
};

/** GET /leads */
export async function listLeads(): Promise<Lead[]> {
  if (USE_MOCK_API) {
    return [];
  }
  return api.get<Lead[]>(ENDPOINTS.leads.list);
}

/** POST /leads */
export async function createLead(lead: Omit<Lead, "id">): Promise<Lead> {
  if (USE_MOCK_API) {
    return { ...lead, id: crypto.randomUUID() };
  }
  return api.post<Lead>(ENDPOINTS.leads.create, lead);
}

/** PUT /leads/:id */
export async function updateLead(id: string, lead: Partial<Lead>): Promise<Lead> {
  if (USE_MOCK_API) {
    return { id, ...lead } as Lead;
  }
  return api.put<Lead>(ENDPOINTS.leads.update(id), lead);
}

/** DELETE /leads/:id */
export async function deleteLead(id: string): Promise<void> {
  if (USE_MOCK_API) return;
  await api.delete(ENDPOINTS.leads.delete(id));
}

/** POST /leads/import */
export async function importLeads(file: File): Promise<{ count: number }> {
  if (USE_MOCK_API) {
    return { count: 0 };
  }
  const formData = new FormData();
  formData.append("file", file);
  // Note: use fetch directly for FormData; api.post uses JSON
  const { API_BASE_URL } = await import("./config").then((m) => m);
  const base = (API_BASE_URL ?? "/api").replace(/\/$/, "");
  const res = await fetch(`${base}${ENDPOINTS.leads.import}`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Import failed");
  return res.json();
}
