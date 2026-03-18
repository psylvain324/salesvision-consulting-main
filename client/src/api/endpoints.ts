/**
 * API endpoint paths.
 * Placeholders for all endpoints that will reach the backend.
 * Update these when your API routes are defined.
 */
export const ENDPOINTS = {
  auth: {
    login: "/auth/login",
    logout: "/auth/logout",
    me: "/auth/me",
    google: "/auth/google",
    apple: "/auth/apple",
    amazon: "/auth/amazon",
  },
  profile: {
    get: "/profile",
    save: "/profile",
  },
  bookings: {
    get: "/bookings/availability",
    save: "/bookings/availability",
  },
  workflows: {
    get: (id: string) => `/workflows/${id}`,
    save: (id: string) => `/workflows/${id}`,
  },
  campaigns: {
    list: "/campaigns",
    create: "/campaigns",
    saveAll: "/campaigns",
    update: (id: string) => `/campaigns/${id}`,
    delete: (id: string) => `/campaigns/${id}`,
  },
  integrations: {
    list: "/integrations",
    save: "/integrations",
    connect: (id: string) => `/integrations/${id}/connect`,
    disconnect: (id: string) => `/integrations/${id}/disconnect`,
  },
  leads: {
    list: "/leads",
    create: "/leads",
    update: (id: string) => `/leads/${id}`,
    delete: (id: string) => `/leads/${id}`,
    import: "/leads/import",
  },
  payment: {
    methods: "/payment/methods",
    addMethod: "/payment/methods",
    removeMethod: (id: string) => `/payment/methods/${id}`,
  },
  membership: {
    get: "/membership",
  },
} as const;
