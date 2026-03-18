/**
 * Auth API.
 * Placeholder: uses localStorage when USE_MOCK_API is true.
 * Replace with real api calls when backend is ready.
 */
import { api } from "./client";
import { ENDPOINTS } from "./endpoints";
import { USE_MOCK_API } from "./config";
import { STORAGE_KEYS } from "./storageKeys";

export type LoginCredentials = { email: string; password: string };
export type LoginResponse = { success: boolean };

/** POST /auth/login — email/password login */
export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
  if (USE_MOCK_API) {
    // Placeholder: accept any credentials, persist to localStorage
    localStorage.setItem(STORAGE_KEYS.auth, "true");
    return { success: true };
  }
  return api.post<LoginResponse>(ENDPOINTS.auth.login, credentials);
}

/** POST /auth/logout */
export async function logout(): Promise<void> {
  if (USE_MOCK_API) {
    localStorage.removeItem(STORAGE_KEYS.auth);
    return;
  }
  await api.post(ENDPOINTS.auth.logout);
}

/** GET /auth/me — get current user */
export async function getCurrentUser(): Promise<{ authenticated: boolean }> {
  if (USE_MOCK_API) {
    const raw = localStorage.getItem(STORAGE_KEYS.auth);
    return { authenticated: raw === "true" };
  }
  return api.get(ENDPOINTS.auth.me);
}

/** Redirect to OAuth provider. Placeholder: for now just marks as logged in locally. */
export async function loginWithProvider(
  provider: "google" | "apple" | "amazon"
): Promise<LoginResponse> {
  if (USE_MOCK_API) {
    // Placeholder: in production, redirect to backend OAuth URL
    // window.location.href = `/api/auth/${provider}`;
    localStorage.setItem(STORAGE_KEYS.auth, "true");
    return { success: true };
  }
  return api.post<LoginResponse>(ENDPOINTS.auth[provider]);
}
