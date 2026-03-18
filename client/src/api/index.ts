/**
 * Client Portal API layer.
 * All read/post operations go through these modules.
 * Placeholder mode (USE_MOCK_API=true): uses localStorage or mock data.
 * Live mode: calls real backend endpoints.
 */
export { api } from "./client";
export { USE_MOCK_API, API_BASE_URL } from "./config";
export { ENDPOINTS } from "./endpoints";
export { STORAGE_KEYS } from "./storageKeys";

export * from "./auth";
export * from "./profile";
export * from "./bookings";
export * from "./workflows";
export * from "./campaigns";
export * from "./integrations";
export * from "./leads";
