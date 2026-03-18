/**
 * Workflow config API.
 * Placeholder: uses localStorage when USE_MOCK_API is true.
 */
import { api } from "./client";
import { ENDPOINTS } from "./endpoints";
import { USE_MOCK_API } from "./config";
import { STORAGE_KEYS } from "./storageKeys";

export type WorkflowConfig = {
  enabled: boolean;
  runType: "schedule" | "lead";
  scheduleInterval: string | number;
  scheduleTime: string;
  scheduleDays: string;
  leadDelayValue: number;
  leadDelayUnit: "minutes" | "hours" | "days";
  triggerConditions: string;
  actions: string;
};

/** GET /workflows/:id */
export async function getWorkflowConfig(
  workflowId: string
): Promise<WorkflowConfig | null> {
  if (USE_MOCK_API) {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.workflow(workflowId));
      if (!raw) return null;
      return JSON.parse(raw) as WorkflowConfig;
    } catch {
      return null;
    }
  }
  const data = await api.get<WorkflowConfig | null>(
    ENDPOINTS.workflows.get(workflowId)
  );
  return data;
}

/** PUT /workflows/:id */
export async function saveWorkflowConfig(
  workflowId: string,
  config: WorkflowConfig
): Promise<WorkflowConfig> {
  if (USE_MOCK_API) {
    localStorage.setItem(
      STORAGE_KEYS.workflow(workflowId),
      JSON.stringify(config)
    );
    return config;
  }
  return api.put<WorkflowConfig>(ENDPOINTS.workflows.save(workflowId), config);
}
