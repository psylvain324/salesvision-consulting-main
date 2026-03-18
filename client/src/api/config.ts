/**
 * API configuration.
 * Set USE_MOCK_API to false and configure API_BASE_URL when your backend is ready.
 */
export const USE_MOCK_API =
  import.meta.env.VITE_USE_MOCK_API !== "false";

/** Base URL for API requests. Use /api for same-origin or full URL for separate backend. */
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "/api";
