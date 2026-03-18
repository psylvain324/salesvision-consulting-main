/**
 * Configurable lead fields: system definitions (API/database names) + user display names.
 * System fields are static—used by API. Users configure which to show and their display labels.
 * Options inspired by HubSpot, Salesforce, Pipedrive, and other CRMs.
 */

export type LeadFieldType = "string" | "date" | "number" | "boolean";

export type SystemLeadField = {
  /** API/database key—static, used by backend */
  dbName: string;
  /** Default display label (user can override) */
  defaultDisplayName: string;
  type: LeadFieldType;
  /** CRM systems that commonly use this field */
  crmSources?: string[];
};

/** System fields: static API keys. Order = suggested default visibility. */
export const SYSTEM_LEAD_FIELDS: SystemLeadField[] = [
  // === Core identity (every CRM) ===
  { dbName: "name", defaultDisplayName: "Name", type: "string", crmSources: ["HubSpot", "Salesforce", "Pipedrive", "Zoho"] },
  { dbName: "email", defaultDisplayName: "Email", type: "string", crmSources: ["HubSpot", "Salesforce", "Pipedrive", "Zoho"] },
  { dbName: "phone", defaultDisplayName: "Phone", type: "string", crmSources: ["HubSpot", "Salesforce", "Pipedrive", "Zoho"] },
  { dbName: "mobilePhone", defaultDisplayName: "Mobile", type: "string", crmSources: ["HubSpot", "Salesforce"] },
  { dbName: "company", defaultDisplayName: "Company", type: "string", crmSources: ["HubSpot", "Salesforce", "Pipedrive", "Zoho"] },
  { dbName: "jobTitle", defaultDisplayName: "Job title", type: "string", crmSources: ["HubSpot", "Salesforce", "Pipedrive"] },
  { dbName: "industry", defaultDisplayName: "Industry", type: "string", crmSources: ["HubSpot", "Salesforce"] },

  // === Source & attribution ===
  { dbName: "source", defaultDisplayName: "Source", type: "string", crmSources: ["HubSpot", "Salesforce", "Pipedrive"] },
  { dbName: "leadSource", defaultDisplayName: "Lead source", type: "string", crmSources: ["Salesforce"] },
  { dbName: "campaign", defaultDisplayName: "Campaign", type: "string", crmSources: ["HubSpot", "Salesforce"] },
  { dbName: "medium", defaultDisplayName: "Medium", type: "string", crmSources: ["HubSpot"] },

  // === Notes & description ===
  { dbName: "notes", defaultDisplayName: "Notes", type: "string", crmSources: ["HubSpot", "Salesforce", "Pipedrive", "Zoho"] },
  { dbName: "description", defaultDisplayName: "Description", type: "string", crmSources: ["HubSpot", "Salesforce", "Pipedrive"] },

  // === Dates ===
  { dbName: "initialCaptureDate", defaultDisplayName: "Initial capture", type: "date", crmSources: ["HubSpot", "Salesforce", "Pipedrive"] },
  { dbName: "createdAt", defaultDisplayName: "Created date", type: "date", crmSources: ["HubSpot", "Salesforce", "Pipedrive"] },
  { dbName: "nextFollowUpDate", defaultDisplayName: "Next follow-up", type: "date", crmSources: ["HubSpot", "Salesforce", "Pipedrive"] },
  { dbName: "lastContactedAt", defaultDisplayName: "Last contacted", type: "date", crmSources: ["HubSpot", "Salesforce"] },
  { dbName: "lastActivityDate", defaultDisplayName: "Last activity", type: "date", crmSources: ["HubSpot", "Salesforce"] },

  // === Pipeline / stage ===
  { dbName: "currentStep", defaultDisplayName: "Current step", type: "string", crmSources: ["HubSpot", "Salesforce", "Pipedrive"] },
  { dbName: "currentStage", defaultDisplayName: "Stage", type: "string", crmSources: ["HubSpot", "Salesforce", "Pipedrive"] },
  { dbName: "leadStatus", defaultDisplayName: "Lead status", type: "string", crmSources: ["Salesforce"] },
  { dbName: "lifecycleStage", defaultDisplayName: "Lifecycle", type: "string", crmSources: ["HubSpot"] },
  { dbName: "nextStep", defaultDisplayName: "Next step", type: "string", crmSources: ["HubSpot", "Salesforce", "Pipedrive"] },
  { dbName: "dealStage", defaultDisplayName: "Deal stage", type: "string", crmSources: ["HubSpot", "Pipedrive"] },

  // === Grouping / segment ===
  { dbName: "group", defaultDisplayName: "Group", type: "string", crmSources: ["HubSpot", "Salesforce"] },
  { dbName: "segment", defaultDisplayName: "Segment", type: "string", crmSources: ["HubSpot"] },
  { dbName: "tags", defaultDisplayName: "Tags", type: "string", crmSources: ["HubSpot", "Pipedrive"] },

  // === Referral ===
  { dbName: "isReferral", defaultDisplayName: "Referral", type: "boolean", crmSources: ["HubSpot", "Salesforce"] },
  { dbName: "referralSource", defaultDisplayName: "Referred by", type: "string", crmSources: ["HubSpot", "Salesforce"] },
  { dbName: "referralPaymentMade", defaultDisplayName: "Ref. payment made", type: "boolean", crmSources: [] },
  { dbName: "referralPaymentAmount", defaultDisplayName: "Ref. amount", type: "number", crmSources: [] },

  // === Value / revenue ===
  { dbName: "dealValue", defaultDisplayName: "Deal value", type: "number", crmSources: ["HubSpot", "Salesforce", "Pipedrive"] },
  { dbName: "revenue", defaultDisplayName: "Revenue", type: "number", crmSources: ["Salesforce"] },

  // === Address ===
  { dbName: "address", defaultDisplayName: "Address", type: "string", crmSources: ["HubSpot", "Salesforce", "Pipedrive"] },
  { dbName: "city", defaultDisplayName: "City", type: "string", crmSources: ["HubSpot", "Salesforce", "Pipedrive"] },
  { dbName: "state", defaultDisplayName: "State", type: "string", crmSources: ["HubSpot", "Salesforce", "Pipedrive"] },
  { dbName: "zip", defaultDisplayName: "ZIP", type: "string", crmSources: ["HubSpot", "Salesforce", "Pipedrive"] },
  { dbName: "country", defaultDisplayName: "Country", type: "string", crmSources: ["HubSpot", "Salesforce", "Pipedrive"] },

  // === Social ===
  { dbName: "linkedinUrl", defaultDisplayName: "LinkedIn", type: "string", crmSources: ["HubSpot", "Salesforce"] },
  { dbName: "twitterHandle", defaultDisplayName: "Twitter", type: "string", crmSources: ["HubSpot"] },

  // === Ownership / score ===
  { dbName: "ownerId", defaultDisplayName: "Owner", type: "string", crmSources: ["HubSpot", "Salesforce", "Pipedrive"] },
  { dbName: "assignedTo", defaultDisplayName: "Assigned to", type: "string", crmSources: ["Salesforce", "Pipedrive"] },
  { dbName: "score", defaultDisplayName: "Score", type: "number", crmSources: ["HubSpot"] },
  { dbName: "rating", defaultDisplayName: "Rating", type: "string", crmSources: ["Salesforce"] },
];

export type LeadFieldConfigItem = {
  dbName: string;
  displayName: string;
  visible: boolean;
  order: number;
};

export type LeadFieldsConfig = {
  fields: LeadFieldConfigItem[];
};

/** Default field config: most common CRM fields with default display names. */
export const DEFAULT_LEAD_FIELDS_CONFIG: LeadFieldsConfig = {
  fields: [
    { dbName: "name", displayName: "Name", visible: true, order: 0 },
    { dbName: "email", displayName: "Email", visible: true, order: 1 },
    { dbName: "phone", displayName: "Phone", visible: true, order: 2 },
    { dbName: "company", displayName: "Company", visible: true, order: 3 },
    { dbName: "source", displayName: "Source", visible: true, order: 4 },
    { dbName: "notes", displayName: "Notes", visible: true, order: 5 },
    { dbName: "group", displayName: "Group", visible: true, order: 6 },
    { dbName: "isReferral", displayName: "Referral", visible: true, order: 7 },
    { dbName: "referralSource", displayName: "Referred by", visible: true, order: 8 },
    { dbName: "referralPaymentMade", displayName: "Ref. payment made", visible: false, order: 9 },
    { dbName: "referralPaymentAmount", displayName: "Ref. amount", visible: false, order: 10 },
    { dbName: "initialCaptureDate", displayName: "Initial capture", visible: true, order: 11 },
    { dbName: "nextFollowUpDate", displayName: "Next follow-up", visible: true, order: 12 },
    { dbName: "currentStep", displayName: "Current step", visible: true, order: 13 },
    { dbName: "nextStep", displayName: "Next step", visible: true, order: 14 },
  ],
};

/** dbNames that expect date values (for formatting) */
export const DATE_FIELD_DB_NAMES = new Set(
  SYSTEM_LEAD_FIELDS.filter((f) => f.type === "date").map((f) => f.dbName)
);

export function getSystemField(dbName: string): SystemLeadField | undefined {
  return SYSTEM_LEAD_FIELDS.find((f) => f.dbName === dbName);
}

/** Common spreadsheet column aliases for auto-mapping during import. */
const HEADER_ALIASES: Record<string, string> = {
  name: "name",
  "contact name": "name",
  "full name": "name",
  "contact": "name",
  "first name": "name",
  "last name": "name",
  email: "email",
  "e-mail": "email",
  "email address": "email",
  "e-mail address": "email",
  "mail": "email",
  phone: "phone",
  "phone number": "phone",
  "telephone": "phone",
  "mobile": "mobilePhone",
  "mobile phone": "mobilePhone",
  "cell": "mobilePhone",
  company: "company",
  "company name": "company",
  "organization": "company",
  "org": "company",
  source: "source",
  "lead source": "leadSource",
  "referral source": "source",
  notes: "notes",
  "note": "notes",
  "comments": "notes",
  "description": "description",
  group: "group",
  "segment": "segment",
  "tags": "tags",
  "job title": "jobTitle",
  "title": "jobTitle",
  "position": "jobTitle",
  industry: "industry",
  "initial capture": "initialCaptureDate",
  "initial_capture_date": "initialCaptureDate",
  "initialcapturedate": "initialCaptureDate",
  "created date": "createdAt",
  "created_at": "createdAt",
  "date created": "createdAt",
  "next follow-up": "nextFollowUpDate",
  "next_follow_up_date": "nextFollowUpDate",
  "nextfollowupdate": "nextFollowUpDate",
  "follow up": "nextFollowUpDate",
  "follow-up date": "nextFollowUpDate",
  "last contacted": "lastContactedAt",
  "last contact": "lastContactedAt",
  "last activity": "lastActivityDate",
  "current step": "currentStep",
  "current_step": "currentStep",
  "currentstep": "currentStep",
  "stage": "currentStage",
  "status": "leadStatus",
  "next step": "nextStep",
  "next_step": "nextStep",
  "nextstep": "nextStep",
  "deferred by": "referralSource",
  "referred_by": "referralSource",
  "referralsource": "referralSource",
  "referral_source": "referralSource",
  "is_referral": "isReferral",
  "isreferral": "isReferral",
  "ref_payment_made": "referralPaymentMade",
  "ref_amount": "referralPaymentAmount",
  "refamount": "referralPaymentAmount",
  address: "address",
  city: "city",
  state: "state",
  "zip": "zip",
  "zip code": "zip",
  "postal code": "zip",
  country: "country",
  "deal value": "dealValue",
  "revenue": "revenue",
  campaign: "campaign",
  medium: "medium",
};

/** Suggest dbName for a spreadsheet column header (case-insensitive, strips spaces). */
export function suggestMappingForHeader(header: string): string | undefined {
  const normalized = header.toLowerCase().trim().replace(/\s+/g, " ").replace(/_/g, "_");
  const withSpaces = normalized.replace(/_/g, " ");
  return (
    HEADER_ALIASES[normalized] ??
    HEADER_ALIASES[withSpaces] ??
    HEADER_ALIASES[header.toLowerCase().replace(/\s/g, "_")] ??
    undefined
  );
}

const STORAGE_KEY = "client-portal-lead-fields-config";

export function loadLeadFieldsConfig(): LeadFieldsConfig {
  try {
    const raw = typeof localStorage !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    if (raw) {
      const parsed = JSON.parse(raw) as LeadFieldsConfig;
      if (parsed?.fields && Array.isArray(parsed.fields)) {
        return mergeWithDefaults(parsed);
      }
    }
  } catch {}
  return { ...DEFAULT_LEAD_FIELDS_CONFIG };
}

export function saveLeadFieldsConfig(config: LeadFieldsConfig): void {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  }
}

function mergeWithDefaults(config: LeadFieldsConfig): LeadFieldsConfig {
  const savedMap = new Map(config.fields.map((f) => [f.dbName, f]));
  const result: LeadFieldConfigItem[] = [];
  for (const def of DEFAULT_LEAD_FIELDS_CONFIG.fields) {
    const saved = savedMap.get(def.dbName);
    result.push(saved ? { ...def, ...saved } : def);
    savedMap.delete(def.dbName);
  }
  for (const [, saved] of savedMap) {
    const sys = getSystemField(saved.dbName);
    result.push({
      dbName: saved.dbName,
      displayName: saved.displayName ?? sys?.defaultDisplayName ?? saved.dbName,
      visible: saved.visible ?? false,
      order: saved.order ?? result.length,
    });
  }
  result.sort((a, b) => a.order - b.order);
  return { fields: result };
}

export function getVisibleFieldsFromConfig(config: LeadFieldsConfig): LeadFieldConfigItem[] {
  return config.fields.filter((f) => f.visible).sort((a, b) => a.order - b.order);
}

export function getDisplayName(config: LeadFieldsConfig, dbName: string): string {
  return config.fields.find((f) => f.dbName === dbName)?.displayName ?? getSystemField(dbName)?.defaultDisplayName ?? dbName;
}

export function updateFieldInConfig(
  config: LeadFieldsConfig,
  dbName: string,
  updates: Partial<Pick<LeadFieldConfigItem, "displayName" | "visible" | "order">>
): LeadFieldsConfig {
  const fields = config.fields
    .map((f) => (f.dbName === dbName ? { ...f, ...updates } : f))
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  return { fields };
}

export function addFieldToConfig(config: LeadFieldsConfig, dbName: string): LeadFieldsConfig {
  if (config.fields.some((f) => f.dbName === dbName)) return config;
  const sys = getSystemField(dbName);
  const maxOrder = Math.max(0, ...config.fields.map((f) => f.order));
  const fields = [
    ...config.fields,
    { dbName, displayName: sys?.defaultDisplayName ?? dbName, visible: true, order: maxOrder + 1 },
  ];
  return { fields };
}

export function removeFieldFromConfig(config: LeadFieldsConfig, dbName: string): LeadFieldsConfig {
  return { fields: config.fields.filter((f) => f.dbName !== dbName) };
}
