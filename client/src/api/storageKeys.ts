/**
 * localStorage keys used when USE_MOCK_API is true.
 * Keeps mock behavior aligned with previous implementation.
 */
export const STORAGE_KEYS = {
  auth: "client-portal-auth",
  profile: "client-portal-profile",
  bookings: "client-portal-bookings",
  workflow: (id: string) => `client-portal-workflow-${id}`,
  campaigns: "client-portal-campaigns",
  integrations: "client-portal-integrations",
} as const;
