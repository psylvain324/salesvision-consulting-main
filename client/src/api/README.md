# API Layer

Read and post to the backend through this layer. Placeholders use localStorage or mock data until your endpoints are ready.

## Config

- **`USE_MOCK_API`** — When `true` (default), all functions use localStorage or return mock data. Set `VITE_USE_MOCK_API=false` to hit real endpoints.
- **`API_BASE_URL`** — Base URL for requests (default `/api`). Set `VITE_API_BASE_URL` in `.env`.

## Usage

```ts
import { login, logout } from "@/api/auth";
import { getProfile, saveProfile } from "@/api/profile";
import { getAvailability, saveAvailability } from "@/api/bookings";
import { getWorkflowConfig, saveWorkflowConfig } from "@/api/workflows";
import { listCampaigns, saveCampaigns } from "@/api/campaigns";
import { listIntegrations, saveIntegrations } from "@/api/integrations";
import { listLeads, createLead } from "@/api/leads";
```

## Endpoints (placeholders)

Defined in `endpoints.ts`. Update paths when your API routes are defined.

| Domain    | Read (GET)           | Write (POST/PUT)          |
|-----------|----------------------|---------------------------|
| Auth      | `/auth/me`           | `/auth/login`, `/auth/logout`, `/auth/{google,apple,amazon}` |
| Profile   | `/profile`           | `/profile`                |
| Bookings  | `/bookings/availability` | `/bookings/availability` |
| Workflows | `/workflows/:id`     | `/workflows/:id`          |
| Campaigns | `/campaigns`         | `/campaigns`              |
| Integrations | `/integrations`    | `/integrations`           |
| Leads     | `/leads`             | `/leads`, `/leads/:id`, `/leads/import` |
| Payment   | `/payment/methods`   | `/payment/methods`, `/payment/methods/:id` |
| Membership| `/membership`        | —                         |
