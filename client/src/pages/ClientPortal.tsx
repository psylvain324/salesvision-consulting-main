/*
 * CLIENT PORTAL: Dashboard-style layout with left sidebar navigation.
 * Sections: Workflows (with config), Settings (profile, bookings), Account (payment methods & membership).
 * Placeholder structure for future integration.
 */
import { useState, useRef, useEffect, useMemo } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Link } from "wouter";
import {
  Workflow,
  User,
  Calendar as CalendarIcon,
  CalendarDays,
  List,
  CreditCard,
  Crown,
  ChevronRight,
  ArrowRight,
  Plug2,
  Plus,
  Trash2,
  Share2,
  LayoutDashboard,
  Clock,
  Timer,
  Users,
  Upload,
  FileSpreadsheet,
  Download,
  Sparkles,
  RefreshCw,
  Link2,
  UserPlus,
  Mail,
  GitBranch,
  FileText,
  Handshake,
  Megaphone,
  ChevronDown,
  LayoutGrid,
  Layers,
  Settings2,
  Target,
  Image,
  CalendarClock,
  Lock,
  LogIn,
  LogOut,
  CheckCircle2,
  Save,
  Play,
  Plane,
  HeartPulse,
  Building2,
  Briefcase,
  MapPin,
  Bell,
  ClipboardCheck,
  Percent,
  Luggage,
  KeyRound,
  PartyPopper,
  House,
  FileSignature,
  Gift,
  Inbox,
  Rss,
  Video,
  Ship,
  MessageSquare,
  Star,
  Zap,
  Shield,
  Database,
  Search,
  ArrowUpDown,
  CircleUser,
  type LucideIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { login, logout, getCurrentUser, loginWithProvider } from "@/api/auth";
import { runWorkflow } from "@/api/workflows";
import {
  SYSTEM_LEAD_FIELDS,
  DEFAULT_LEAD_FIELDS_CONFIG,
  DATE_FIELD_DB_NAMES,
  getSystemField,
  suggestMappingForHeader,
  loadLeadFieldsConfig,
  saveLeadFieldsConfig,
  getVisibleFieldsFromConfig,
  getDisplayName,
  addFieldToConfig,
  updateFieldInConfig,
  removeFieldFromConfig,
  type LeadFieldsConfig,
  type LeadFieldConfigItem,
} from "@/config/leadFields";

type SectionId =
  | "workflows"
  | "profile"
  | "bookings"
  | "leads"
  | "integrations"
  | "marketing"
  | "account";

const sidebarSections: {
  id: SectionId;
  label: string;
  icon: typeof Workflow;
  /** Shows a chevron — section opens a second column (categories / profile tabs). */
  hasSubmenu?: boolean;
}[] = [
  { id: "workflows", label: "Workflows", icon: Workflow, hasSubmenu: true },
  { id: "profile", label: "Profile", icon: User, hasSubmenu: true },
  { id: "bookings", label: "Booking", icon: CalendarIcon, hasSubmenu: true },
  { id: "leads", label: "Leads", icon: Users, hasSubmenu: true },
  { id: "integrations", label: "Integrations", icon: Plug2, hasSubmenu: true },
  { id: "marketing", label: "Campaigns", icon: Megaphone, hasSubmenu: true },
  { id: "account", label: "Account", icon: CircleUser, hasSubmenu: true },
];

/** Workflow library groupings — shown as a second column (sub-nav) next to the main portal menu. */
type WorkflowCategoryId =
  | "core"
  | "health-insurance"
  | "travel"
  | "real-estate"
  | "social-marketing"
  | "meetings-docs"
  | "custom";

const workflowCategories: {
  id: WorkflowCategoryId;
  label: string;
  shortLabel: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    id: "core",
    label: "Leads & pipeline",
    shortLabel: "Leads & pipeline",
    description: "Capture, qualify, route, and nurture opportunities across industries.",
    icon: Target,
  },
  {
    id: "health-insurance",
    label: "Health insurance",
    shortLabel: "Health insurance",
    description: "Open enrollment, renewals, underwriting, and compliance-friendly follow-ups.",
    icon: HeartPulse,
  },
  {
    id: "travel",
    label: "Travel agents",
    shortLabel: "Travel",
    description: "Inquiries, quotes, payments, documents, and post-trip re-engagement.",
    icon: Plane,
  },
  {
    id: "real-estate",
    label: "Real estate",
    shortLabel: "Real estate",
    description: "Listings, showings, transactions, and sphere-of-influence touches.",
    icon: Building2,
  },
  {
    id: "social-marketing",
    label: "Social & marketing",
    shortLabel: "Social & marketing",
    description: "Outreach, content rhythm, reviews, and campaign nurture.",
    icon: Share2,
  },
  {
    id: "meetings-docs",
    label: "Meetings & documents",
    shortLabel: "Meetings & docs",
    description: "Scheduling, proposals, and structured onboarding after the win.",
    icon: Briefcase,
  },
  {
    id: "custom",
    label: "Request custom",
    shortLabel: "Custom",
    description:
      "Submit a new automation idea, track pending requests, and open workflows built for your account.",
    icon: Sparkles,
  },
];

type WorkflowTemplate = {
  id: string;
  name: string;
  desc: string;
  icon: LucideIcon;
  iconBg: string;
  categoryId: WorkflowCategoryId;
};

const workflowTemplates: WorkflowTemplate[] = [
  /* —— Core: leads & pipeline —— */
  {
    id: "lead-capture",
    categoryId: "core",
    name: "Lead Capture & Qualification",
    desc: "Gathers web form data, AI-scores leads by behavior, and routes high-value prospects to reps.",
    icon: UserPlus,
    iconBg: "bg-emerald-500/10 text-emerald-600",
  },
  {
    id: "basic-qualification-screening",
    categoryId: "core",
    name: "Basic Qualification Screening",
    desc: "Use form or import data to determine fit; branch unqualified leads to alternate paths or remove, then run your next configured step.",
    icon: CheckCircle2,
    iconBg: "bg-indigo-500/10 text-indigo-600",
  },
  {
    id: "follow-up",
    categoryId: "core",
    name: "Automated Follow-Up Sequence",
    desc: "Tailored emails or alerts from engagement signals (e.g., nudge rep when prospect opens email twice with no reply).",
    icon: Mail,
    iconBg: "bg-blue-500/10 text-blue-600",
  },
  {
    id: "pipeline",
    categoryId: "core",
    name: "Pipeline Management Automation",
    desc: "Auto-advance CRM stages from triggers (e.g., application received → underwriting review).",
    icon: GitBranch,
    iconBg: "bg-violet-500/10 text-violet-600",
  },
  {
    id: "core-territory-routing",
    categoryId: "core",
    name: "Territory & Product-Line Routing",
    desc: "Assign leads by ZIP, state, LOB, or round-robin; notify the right producer with context and SLAs.",
    icon: MapPin,
    iconBg: "bg-cyan-500/10 text-cyan-600",
  },
  {
    id: "core-no-show-recovery",
    categoryId: "core",
    name: "No-Show & Ghost Recovery",
    desc: "After missed calls or appointments, send reschedule links and internal alerts so opportunities do not go cold.",
    icon: Bell,
    iconBg: "bg-rose-500/10 text-rose-600",
  },
  /* —— Health insurance —— */
  {
    id: "hi-oep-aep-nurture",
    categoryId: "health-insurance",
    name: "OEP / AEP Education & Touchpoints",
    desc: "Seasonal cadence: plan comparison tips, deadline reminders, and consent-aware messaging for Medicare and ACA windows.",
    icon: CalendarClock,
    iconBg: "bg-red-500/10 text-red-600",
  },
  {
    id: "hi-renewal-ladder",
    categoryId: "health-insurance",
    name: "Policy Renewal Ladder (60 / 30 / 7)",
    desc: "Automated renewal reminders, rate-change explanations, and tasks for agents to confirm coverage before lapse.",
    icon: Timer,
    iconBg: "bg-orange-500/10 text-orange-700",
  },
  {
    id: "hi-underwriting-docs",
    categoryId: "health-insurance",
    name: "Underwriting Document Chase",
    desc: "Track missing apps, HIPAA-safe document requests, and nudge clients until the carrier packet is complete.",
    icon: ClipboardCheck,
    iconBg: "bg-emerald-600/10 text-emerald-700",
  },
  {
    id: "hi-quote-expiry",
    categoryId: "health-insurance",
    name: "Quote Expiration & Re-Quote",
    desc: "Alert before quotes expire; offer updated options and book a review call when rates or networks change.",
    icon: Percent,
    iconBg: "bg-amber-500/10 text-amber-700",
  },
  {
    id: "hi-appointment-prep",
    categoryId: "health-insurance",
    name: "Appointment Prep & Needs Analysis",
    desc: "Pre-call questionnaire, dependent/coverage summary, and agenda so every consultation is efficient and compliant.",
    icon: FileText,
    iconBg: "bg-slate-500/10 text-slate-700",
  },
  {
    id: "hi-cross-sell-nurture",
    categoryId: "health-insurance",
    name: "Cross-Line Nurture (Where Licensed)",
    desc: "Post-enrollment sequences for dental, vision, life, or ancillary—only when rules and licensing allow.",
    icon: Layers,
    iconBg: "bg-violet-600/10 text-violet-700",
  },
  {
    id: "hi-referral-thanks",
    categoryId: "health-insurance",
    name: "Referral Thank-You & Compliance Log",
    desc: "Thank referrers, log source-of-business notes for audits, and optional review requests where permitted.",
    icon: Handshake,
    iconBg: "bg-teal-600/10 text-teal-700",
  },
  /* —— Travel agents —— */
  {
    id: "tr-inquiry-qualify",
    categoryId: "travel",
    name: "Inquiry Intake & Qualification",
    desc: "Instant acknowledgment, budget/dates/party-size capture, and route luxury vs. value leads to the right advisor.",
    icon: Inbox,
    iconBg: "bg-sky-500/10 text-sky-600",
  },
  {
    id: "tr-quote-followup",
    categoryId: "travel",
    name: "Quote Follow-Up (24h / 72h)",
    desc: "Structured follow-ups after proposals—handle objections, add urgency for holds, and log outcomes in CRM.",
    icon: Mail,
    iconBg: "bg-blue-600/10 text-blue-700",
  },
  {
    id: "tr-payment-reminders",
    categoryId: "travel",
    name: "Deposit & Final Payment Reminders",
    desc: "Payment due dates, supplier deadlines, and finance-option nudges so bookings do not cancel for non-payment.",
    icon: CreditCard,
    iconBg: "bg-green-600/10 text-green-700",
  },
  {
    id: "tr-predeparture-checklist",
    categoryId: "travel",
    name: "Pre-Departure Checklist & Upsells",
    desc: "Passport/visa reminders, insurance offer, seat selection nudges, and supplier voucher confirmations.",
    icon: Luggage,
    iconBg: "bg-indigo-500/10 text-indigo-700",
  },
  {
    id: "tr-post-trip-reengage",
    categoryId: "travel",
    name: "Post-Trip Thank-You & Re-Book",
    desc: "Feedback request, photo/review ask, and anniversary or “where next” campaigns to drive repeat bookings.",
    icon: PartyPopper,
    iconBg: "bg-pink-500/10 text-pink-600",
  },
  {
    id: "tr-disruption-alert",
    categoryId: "travel",
    name: "Schedule Change & Disruption Alerts",
    desc: "When carriers update itineraries, draft client messages and tasks for agents to approve and send quickly.",
    icon: RefreshCw,
    iconBg: "bg-orange-500/10 text-orange-600",
  },
  {
    id: "tr-group-coordination",
    categoryId: "travel",
    name: "Group Travel Coordination",
    desc: "Rooming lists, per-passenger payment status, and deadline blasts for weddings, reunions, and corporate retreats.",
    icon: Users,
    iconBg: "bg-purple-500/10 text-purple-600",
  },
  {
    id: "tr-cruise-docs",
    categoryId: "travel",
    name: "Cruise & Tour Document Packet",
    desc: "Gather passport copies, dining preferences, and emergency contacts; send sailing-day reminders and port tips.",
    icon: Ship,
    iconBg: "bg-cyan-600/10 text-cyan-700",
  },
  /* —— Real estate —— */
  {
    id: "re-new-listing-alerts",
    categoryId: "real-estate",
    name: "New Listing & Price-Drop Alerts",
    desc: "Notify matched buyers and your sphere when listings hit the market or improve—personalized with search criteria.",
    icon: House,
    iconBg: "bg-emerald-500/10 text-emerald-700",
  },
  {
    id: "re-open-house-followup",
    categoryId: "real-estate",
    name: "Open House Visitor Follow-Up",
    desc: "Same-day thank-you, listing recap, and nurture track for hot vs. casual visitors with CRM tagging.",
    icon: CalendarDays,
    iconBg: "bg-amber-500/10 text-amber-700",
  },
  {
    id: "re-showing-feedback",
    categoryId: "real-estate",
    name: "Showing Feedback Requests",
    desc: "Prompt buyer agents for feedback after showings; aggregate insights for sellers and price conversations.",
    icon: MessageSquare,
    iconBg: "bg-violet-500/10 text-violet-700",
  },
  {
    id: "re-contract-milestones",
    categoryId: "real-estate",
    name: "Under-Contract Milestone Checklist",
    desc: "Inspection, appraisal, financing, and closing reminders for buyers, sellers, and cooperating brokers.",
    icon: FileSignature,
    iconBg: "bg-slate-600/10 text-slate-700",
  },
  {
    id: "re-past-client-checkin",
    categoryId: "real-estate",
    name: "Past Client & SOI Check-Ins",
    desc: "Home-iversary notes, market snapshots, and referral prompts timed to stay top of mind without spamming.",
    icon: Gift,
    iconBg: "bg-rose-500/10 text-rose-700",
  },
  {
    id: "re-expired-listing-outreach",
    categoryId: "real-estate",
    name: "Expired / FSBO Nurture (Compliant)",
    desc: "Respectful multi-touch outreach with opt-out; positions your value prop and invites a listing conversation.",
    icon: Target,
    iconBg: "bg-orange-600/10 text-orange-700",
  },
  {
    id: "re-lead-response-sla",
    categoryId: "real-estate",
    name: "Portal & IDX Lead Speed-to-Lead",
    desc: "Sub-minute alerts, auto-text/email first touch, and manager escalation if no response within your SLA.",
    icon: Zap,
    iconBg: "bg-yellow-500/10 text-yellow-700",
  },
  /* —— Social & marketing —— */
  {
    id: "cold-outreach",
    categoryId: "social-marketing",
    name: "Cold Outreach Campaign",
    desc: "Prospecting cadences across email and social; pause on reply and sync outcomes to CRM.",
    icon: Megaphone,
    iconBg: "bg-orange-500/10 text-orange-600",
  },
  {
    id: "sm-content-calendar",
    categoryId: "social-marketing",
    name: "Content Calendar & Approvals",
    desc: "Remind creators of posting windows, route drafts for approval, and sync published links to CRM or ads.",
    icon: CalendarDays,
    iconBg: "bg-fuchsia-500/10 text-fuchsia-600",
  },
  {
    id: "sm-dm-comment-sla",
    categoryId: "social-marketing",
    name: "DM & Comment SLA Alerts",
    desc: "Route social engagement to on-call reps with timers so leads from Instagram, Facebook, or LinkedIn do not stall.",
    icon: MessageSquare,
    iconBg: "bg-blue-500/10 text-blue-600",
  },
  {
    id: "sm-review-requests",
    categoryId: "social-marketing",
    name: "Review & Testimonial Requests",
    desc: "Trigger after positive milestones (closed deal, returned trip, policy active) with platform-specific links.",
    icon: Star,
    iconBg: "bg-amber-400/10 text-amber-600",
  },
  {
    id: "sm-lead-magnet-nurture",
    categoryId: "social-marketing",
    name: "Lead Magnet → Email Nurture",
    desc: "Deliver the asset, then a short educational series that warms the lead for a booking or consultation.",
    icon: Download,
    iconBg: "bg-emerald-500/10 text-emerald-600",
  },
  {
    id: "sm-webinar-event",
    categoryId: "social-marketing",
    name: "Webinar & Event Reminders",
    desc: "Registration confirmations, day-before and hour-of pings, plus no-show replay or reschedule flow.",
    icon: Video,
    iconBg: "bg-red-500/10 text-red-600",
  },
  {
    id: "sm-ugc-mentions",
    categoryId: "social-marketing",
    name: "UGC & Mention Digest",
    desc: "Weekly digest of tags and branded hashtags; create tasks to engage, reshare, or add followers to nurture.",
    icon: Rss,
    iconBg: "bg-indigo-500/10 text-indigo-600",
  },
  /* —— Meetings & documents —— */
  {
    id: "meeting-scheduling",
    categoryId: "meetings-docs",
    name: "Meeting Scheduling & Prep",
    desc: "Scheduling links, calendar holds, and auto-generated agendas pulled from CRM context.",
    icon: CalendarDays,
    iconBg: "bg-amber-500/10 text-amber-600",
  },
  {
    id: "proposal-rfp",
    categoryId: "meetings-docs",
    name: "Proposal / RFP Generation",
    desc: "Template-driven proposals or carrier comparisons pre-filled from discovery notes.",
    icon: FileText,
    iconBg: "bg-slate-500/10 text-slate-600",
  },
  {
    id: "onboarding",
    categoryId: "meetings-docs",
    name: "Customer Onboarding",
    desc: "Post-close welcome packs, e-signature follow-through, and first-30-day task lists.",
    icon: Handshake,
    iconBg: "bg-teal-500/10 text-teal-600",
  },
];

const AUTH_STORAGE_KEY = "client-portal-auth";
const STORAGE_KEYS = {
  profile: "client-portal-profile",
  bookings: "client-portal-bookings",
  bookingAppointments: "client-portal-booking-appointments",
  bookingsCalendarConfig: "client-portal-bookings-calendar-config",
  workflow: (id: string) => `client-portal-workflow-${id}`,
  campaigns: "client-portal-campaigns",
  integrations: "client-portal-integrations",
  membership: "client-portal-membership",
  leadFieldsConfig: "client-portal-lead-fields-config",
  importMappings: "client-portal-import-mappings",
  customWorkflowRequests: "client-portal-custom-workflow-requests",
  customWorkflowsBuilt: "client-portal-custom-workflows-built",
  leads: "client-portal-leads",
  crmLastSync: "client-portal-crm-last-sync",
} as const;

type CustomWorkflowRequestStored = {
  id: string;
  notes: string;
  submittedAt: string;
  status: "pending" | "fulfilled";
};

type CustomWorkflowBuiltStored = {
  id: string;
  name: string;
  desc: string;
  addedAt: string;
  sourceRequestId?: string;
};

function loadCustomRequests(): CustomWorkflowRequestStored[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.customWorkflowRequests);
    if (!raw) return [];
    const list = JSON.parse(raw) as unknown[];
    if (!Array.isArray(list)) return [];
    return list.map((item: Record<string, unknown>) => ({
      id: String(item.id ?? crypto.randomUUID()),
      notes: String(item.notes ?? ""),
      submittedAt: String(item.submittedAt ?? item.at ?? new Date().toISOString()),
      status: item.status === "fulfilled" ? ("fulfilled" as const) : ("pending" as const),
    }));
  } catch {
    return [];
  }
}

function saveCustomRequests(next: CustomWorkflowRequestStored[]) {
  localStorage.setItem(STORAGE_KEYS.customWorkflowRequests, JSON.stringify(next));
}

function loadBuiltWorkflows(): CustomWorkflowBuiltStored[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.customWorkflowsBuilt);
    if (!raw) return [];
    const list = JSON.parse(raw) as unknown[];
    if (!Array.isArray(list)) return [];
    return list
      .filter((x): x is Record<string, unknown> => x !== null && typeof x === "object")
      .map((item) => ({
        id: String(item.id ?? crypto.randomUUID()),
        name: String(item.name ?? "Custom workflow"),
        desc: String(item.desc ?? ""),
        addedAt: String(item.addedAt ?? new Date().toISOString()),
        sourceRequestId: item.sourceRequestId ? String(item.sourceRequestId) : undefined,
      }));
  } catch {
    return [];
  }
}

function saveBuiltWorkflows(next: CustomWorkflowBuiltStored[]) {
  localStorage.setItem(STORAGE_KEYS.customWorkflowsBuilt, JSON.stringify(next));
}

function builtEntryToTemplate(b: CustomWorkflowBuiltStored): WorkflowTemplate {
  return {
    id: b.id,
    name: b.name,
    desc: b.desc,
    icon: Sparkles,
    iconBg: "bg-violet-500/10 text-violet-600",
    categoryId: "custom",
  };
}

const CALENDAR_APPS = [
  { id: "google-calendar", label: "Google Calendar" },
  { id: "calendly", label: "Calendly" },
  { id: "outlook-calendar", label: "Outlook Calendar" },
] as const;

function ClientPortalLogin({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleBypass = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({ email, password });
    onLogin();
  };

  const handleSocialLogin = async (provider: "google" | "apple" | "amazon") => {
    await loginWithProvider(provider);
    onLogin();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
        <div className="text-center mb-8">
          <h1 className="font-[Sora] text-2xl font-bold text-gray-900 mb-2">
            Sign in to Client Portal
          </h1>
          <p className="text-gray-600 text-sm">
            Enter your credentials or sign in with a provider
          </p>
        </div>

        <form onSubmit={handleBypass} className="space-y-4 mb-6">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1"
            />
          </div>
          <Button type="submit" className="w-full" size="lg">
            <LogIn className="w-4 h-4 mr-2" />
            Sign in
          </Button>
        </form>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-500">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <Button
            type="button"
            variant="outline"
            className="flex flex-col items-center gap-1 py-4 h-auto"
            onClick={() => void handleSocialLogin("google")}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="text-xs font-medium">Google</span>
          </Button>
          <Button
            type="button"
            variant="outline"
            className="flex flex-col items-center gap-1 py-4 h-auto"
            onClick={() => void handleSocialLogin("apple")}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.23 2.67-3.16 4.13-3.74 4.25z"/>
            </svg>
            <span className="text-xs font-medium">Apple</span>
          </Button>
          <Button
            type="button"
            variant="outline"
            className="flex flex-col items-center gap-1 py-4 h-auto"
            onClick={() => void handleSocialLogin("amazon")}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#FF9900">
              <path d="M15.23 17.99h-2.17l-1.2-3.63h-4.38L6.42 18H4.26L9.7 5.68h2.37l5.16 12.31zM8.53 12.82l2.12-6.24 2.13 6.24H8.53z"/>
              <path d="M18.95 9.32c-.29-.12-.89-.25-1.49-.25-1.6 0-2.8 1.02-2.8 2.73 0 1.5.9 2.22 1.9 2.68 1.02.47 1.09.78 1.09 1.21 0 .61-.67.87-1.24.87-.83 0-1.3-.13-1.97-.45l-.27 1.4c.58.25 1.2.45 1.97.45 1.66 0 2.82-.96 2.82-2.84 0-1.41-.84-2.25-1.81-2.67-.98-.42-1.12-.7-1.12-1.12 0-.47.49-.85 1.2-.85.64 0 1.14.14 1.51.32l.27-1.38z"/>
            </svg>
            <span className="text-xs font-medium">Amazon</span>
          </Button>
        </div>
      </div>
      <p className="mt-6 text-xs text-gray-500 text-center max-w-md">
        Bypass mode: any email/password will sign you in. Social logins require backend OAuth setup.
      </p>
    </div>
  );
}

export default function ClientPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    getCurrentUser().then((r) => setIsAuthenticated(r.authenticated));
  }, []);
  const [activeSection, setActiveSection] = useState<SectionId>("workflows");
  const [selectedWorkflow, setSelectedWorkflow] = useState<string | null>(null);
  const [profileIndustry, setProfileIndustry] = useState("");
  const [profileJob, setProfileJob] = useState("");
  const [profileRole, setProfileRole] = useState("");

  const handleLogout = async () => {
    await logout();
    setIsAuthenticated(false);
  };

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-gray-400 text-sm">Loading...</div>
      </div>
    );
  }
  if (!isAuthenticated) {
    return (
      <ClientPortalLogin
        onLogin={() => setIsAuthenticated(true)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Single header — fixed at top, professional styling */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-gray-200/80 bg-white shadow-sm shadow-black/5">
        <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/">
            <span className="font-[Sora] font-bold text-lg tracking-tight text-gray-900 hover:opacity-90 transition-opacity">
              Sales<span className="gradient-text-blue">Vision</span>
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-sv-blue/10 flex items-center justify-center">
                <LayoutDashboard className="w-4 h-4 text-sv-blue" strokeWidth={2} />
              </div>
              <span className="font-[Sora] font-semibold text-sm tracking-wide text-gray-700 uppercase hidden sm:inline">
                Client Portal
              </span>
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-gray-600 hover:text-gray-900">
              <LogOut className="w-4 h-4 mr-1.5" />
              Log out
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row min-h-screen pt-16">
        {/* Left Sidebar */}
        <aside className="w-full lg:w-[13.5rem] shrink-0 border-b lg:border-b-0 lg:border-r border-gray-200 bg-white">
          <nav className="p-3 space-y-0.5">
            {sidebarSections.map((section) => (
              <button
                key={section.id}
                type="button"
                onClick={() => {
                  setActiveSection(section.id);
                  if (section.id !== "workflows") setSelectedWorkflow(null);
                }}
                className={`flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-left text-sm font-medium transition-colors ${
                  activeSection === section.id
                    ? "bg-sv-blue/10 text-sv-blue"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <section.icon className="w-[1.125rem] h-[1.125rem] shrink-0" />
                <span className="flex-1 min-w-0 truncate">{section.label}</span>
                {section.hasSubmenu ? (
                  <ChevronRight
                    className={`w-4 h-4 shrink-0 opacity-45 ${
                      activeSection === section.id ? "text-sv-blue opacity-70" : "text-gray-400"
                    }`}
                    aria-hidden
                  />
                ) : null}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-5 sm:p-6 lg:pl-8 lg:pr-10 lg:py-7 overflow-auto min-w-0">
          {activeSection === "workflows" && (
            <WorkflowsContent
              selectedWorkflow={selectedWorkflow}
              onSelectWorkflow={setSelectedWorkflow}
              onBack={() => setSelectedWorkflow(null)}
            />
          )}
          {activeSection === "profile" && (
            <ProfileContent
              industry={profileIndustry}
              setIndustry={setProfileIndustry}
              job={profileJob}
              setJob={setProfileJob}
              role={profileRole}
              setRole={setProfileRole}
            />
          )}
          {activeSection === "bookings" && (
            <BookingsContent onNavigateToSection={setActiveSection} />
          )}
          {activeSection === "leads" && (
            <LeadsContent
              profileJob={profileJob}
              profileRole={profileRole}
              profileIndustry={profileIndustry}
              onNavigateToSection={setActiveSection}
            />
          )}
          {activeSection === "integrations" && <IntegrationsContent />}
          {activeSection === "marketing" && <MarketingCampaignsContent />}
          {activeSection === "account" && <AccountContent />}
        </main>
      </div>
    </div>
  );
}

type CustomWorkflowSubView = "new" | "pending" | "library";

function CustomWorkflowSubPanels({
  activeSubView,
  setActiveSubView,
  onSelectWorkflow,
  dataRevision,
  bumpData,
}: {
  activeSubView: CustomWorkflowSubView;
  setActiveSubView: (v: CustomWorkflowSubView) => void;
  onSelectWorkflow: (id: string) => void;
  dataRevision: number;
  bumpData: () => void;
}) {
  const [notes, setNotes] = useState("");
  const [justSubmitted, setJustSubmitted] = useState(false);
  const [fulfillForId, setFulfillForId] = useState<string | null>(null);
  const [fulfillName, setFulfillName] = useState("");
  const [fulfillDesc, setFulfillDesc] = useState("");
  const [manualOpen, setManualOpen] = useState(false);
  const [manualName, setManualName] = useState("");
  const [manualDesc, setManualDesc] = useState("");

  const allRequests = useMemo(() => loadCustomRequests(), [dataRevision]);
  const pendingList = useMemo(() => allRequests.filter((r) => r.status === "pending"), [allRequests]);
  const builtList = useMemo(() => loadBuiltWorkflows(), [dataRevision]);

  const openFulfill = (req: CustomWorkflowRequestStored) => {
    setFulfillForId(req.id);
    setFulfillName(`Custom: ${req.notes.slice(0, 48)}${req.notes.length > 48 ? "…" : ""}`);
    setFulfillDesc(req.notes);
  };

  const submitNewRequest = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = notes.trim();
    if (!trimmed) return;
    const next = [
      ...loadCustomRequests(),
      {
        id: crypto.randomUUID(),
        notes: trimmed,
        submittedAt: new Date().toISOString(),
        status: "pending" as const,
      },
    ];
    saveCustomRequests(next);
    setNotes("");
    setJustSubmitted(true);
    setTimeout(() => setJustSubmitted(false), 5000);
    bumpData();
    setActiveSubView("pending");
  };

  const withdrawRequest = (id: string) => {
    saveCustomRequests(loadCustomRequests().filter((r) => r.id !== id));
    bumpData();
  };

  const confirmFulfill = () => {
    if (!fulfillForId || !fulfillName.trim()) return;
    const built = loadBuiltWorkflows();
    const newEntry: CustomWorkflowBuiltStored = {
      id: `custom-${crypto.randomUUID()}`,
      name: fulfillName.trim(),
      desc: fulfillDesc.trim() || "Custom workflow",
      addedAt: new Date().toISOString(),
      sourceRequestId: fulfillForId,
    };
    saveBuiltWorkflows([...built, newEntry]);
    saveCustomRequests(
      loadCustomRequests().map((r) =>
        r.id === fulfillForId ? { ...r, status: "fulfilled" as const } : r
      )
    );
    setFulfillForId(null);
    setFulfillName("");
    setFulfillDesc("");
    bumpData();
    setActiveSubView("library");
  };

  const confirmManualAdd = () => {
    if (!manualName.trim()) return;
    const built = loadBuiltWorkflows();
    saveBuiltWorkflows([
      ...built,
      {
        id: `custom-${crypto.randomUUID()}`,
        name: manualName.trim(),
        desc: manualDesc.trim() || "Custom workflow",
        addedAt: new Date().toISOString(),
      },
    ]);
    setManualOpen(false);
    setManualName("");
    setManualDesc("");
    bumpData();
  };

  const removeBuilt = (id: string) => {
    saveBuiltWorkflows(loadBuiltWorkflows().filter((b) => b.id !== id));
    bumpData();
  };

  const tabs: { id: CustomWorkflowSubView; label: string; icon: LucideIcon; count?: number }[] = [
    { id: "new", label: "New request", icon: Sparkles },
    { id: "pending", label: "Pending", icon: Clock, count: pendingList.length },
    { id: "library", label: "My custom workflows", icon: Workflow, count: builtList.length },
  ];

  return (
    <div className="max-w-5xl">
      <div
        role="tablist"
        aria-label="Custom workflow views"
        className="flex flex-wrap gap-2 mb-6 p-1 rounded-xl bg-gray-100/80 border border-gray-200/80"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const selected = activeSubView === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActiveSubView(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                selected
                  ? "bg-white text-sv-blue shadow-sm border border-gray-200"
                  : "text-gray-600 hover:text-gray-900 hover:bg-white/60"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0 opacity-80" />
              {tab.label}
              {tab.count !== undefined && tab.count > 0 ? (
                <span className="text-[10px] font-semibold tabular-nums bg-violet-100 text-violet-800 px-1.5 py-0.5 rounded-md">
                  {tab.count}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      {activeSubView === "new" && (
        <section
          className="rounded-2xl border border-violet-200/80 bg-gradient-to-br from-violet-50/90 via-white to-sv-blue/[0.04] p-6 sm:p-8 shadow-sm shadow-violet-500/5"
          aria-labelledby="custom-workflow-heading"
        >
          <h2 id="custom-workflow-heading" className="font-[Sora] text-lg sm:text-xl font-bold text-gray-900 mb-2">
            Make a request
          </h2>
          <p className="text-sm text-gray-600 mb-5 leading-relaxed">
            Describe triggers, systems (CRM, email, calendar, etc.), and outcomes. We&apos;ll review and follow up.
            Include your email in the text if you need a reply before the portal is fully integrated.
          </p>
          <form onSubmit={submitNewRequest} className="space-y-4">
            <div>
              <Label htmlFor="custom-workflow-notes" className="text-gray-700">
                What should this automation do?
              </Label>
              <Textarea
                id="custom-workflow-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Example: When a lead books a cruise deposit in Cal.com, create a Pipedrive deal, send a branded PDF checklist, and remind me 7 days before final payment…"
                rows={5}
                className="mt-2 resize-y min-h-[120px] border-gray-200 text-sm"
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <Button
                type="submit"
                disabled={!notes.trim()}
                className="w-full sm:w-auto bg-violet-600 hover:bg-violet-700 text-white"
              >
                Submit request
              </Button>
              <Link href="/contact">
                <span className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 text-sm font-medium text-sv-blue hover:text-violet-700 transition-colors">
                  Or contact us directly
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
            {justSubmitted && (
              <p className="text-sm text-emerald-700 flex items-center gap-2" role="status">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                Request added to Pending.
              </p>
            )}
          </form>
        </section>
      )}

      {activeSubView === "pending" && (
        <div className="space-y-4">
          {pendingList.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
              No pending requests. Use <strong className="text-gray-700">New request</strong> to describe an automation
              you&apos;d like built.
            </div>
          ) : (
            <ul className="space-y-3">
              {pendingList.map((req) => (
                <li
                  key={req.id}
                  className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5 flex flex-col sm:flex-row sm:items-start gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-400 mb-1">
                      Submitted {new Date(req.submittedAt).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-800 whitespace-pre-wrap">{req.notes}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 shrink-0">
                    <Button type="button" variant="outline" size="sm" onClick={() => openFulfill(req)}>
                      I received my workflow
                    </Button>
                    <Button type="button" variant="ghost" size="sm" className="text-red-600 hover:text-red-700" onClick={() => withdrawRequest(req.id)}>
                      Withdraw
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {activeSubView === "library" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-sm text-gray-600">
              Workflows built for you appear here. Open one to configure triggers and actions (stored per browser).
            </p>
            <Button type="button" size="sm" variant="outline" onClick={() => setManualOpen(true)}>
              <Plus className="w-4 h-4 mr-1.5" />
              Add manually
            </Button>
          </div>
          {builtList.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
              No custom workflows yet. When we deliver your build, use{" "}
              <strong className="text-gray-700">I received my workflow</strong> on a pending request, or{" "}
              <strong className="text-gray-700">Add manually</strong> if it was set up outside the request flow.
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {builtList.map((b) => (
                <div
                  key={b.id}
                  className="flex items-start gap-4 p-5 rounded-xl border border-gray-200 bg-white text-left"
                >
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center bg-violet-500/10 text-violet-600">
                    <Sparkles className="w-5 h-5" strokeWidth={2} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-violet-700/80 mb-1 block">
                      Custom
                    </span>
                    <h3 className="font-semibold text-gray-900 text-sm leading-tight">{b.name}</h3>
                    <p className="text-xs text-gray-500 mt-1.5 line-clamp-3">{b.desc}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <Button type="button" size="sm" className="text-xs" onClick={() => onSelectWorkflow(b.id)}>
                        Configure
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        className="text-xs text-red-600 hover:text-red-700"
                        onClick={() => removeBuilt(b.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <Dialog open={!!fulfillForId} onOpenChange={(o) => !o && setFulfillForId(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add to my workflows</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-500">
            Name and describe the workflow we delivered. You can edit these before saving.
          </p>
          <div className="space-y-3 py-2">
            <div>
              <Label htmlFor="fulfill-name">Name</Label>
              <Input
                id="fulfill-name"
                value={fulfillName}
                onChange={(e) => setFulfillName(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="fulfill-desc">Description</Label>
              <Textarea
                id="fulfill-desc"
                value={fulfillDesc}
                onChange={(e) => setFulfillDesc(e.target.value)}
                rows={4}
                className="mt-1"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setFulfillForId(null)}>
              Cancel
            </Button>
            <Button type="button" onClick={confirmFulfill} disabled={!fulfillName.trim()}>
              Save to my workflows
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={manualOpen} onOpenChange={setManualOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add custom workflow</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-500">Use this if a workflow was set up for you outside the request queue.</p>
          <div className="space-y-3 py-2">
            <div>
              <Label htmlFor="manual-name">Name</Label>
              <Input
                id="manual-name"
                value={manualName}
                onChange={(e) => setManualName(e.target.value)}
                placeholder="e.g. Open house follow-up bot"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="manual-desc">Description</Label>
              <Textarea
                id="manual-desc"
                value={manualDesc}
                onChange={(e) => setManualDesc(e.target.value)}
                rows={3}
                className="mt-1"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setManualOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={confirmManualAdd} disabled={!manualName.trim()}>
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function WorkflowsContent({
  selectedWorkflow,
  onSelectWorkflow,
  onBack,
}: {
  selectedWorkflow: string | null;
  onSelectWorkflow: (id: string) => void;
  onBack: () => void;
}) {
  const [activeCategory, setActiveCategory] = useState<WorkflowCategoryId | "all">("all");
  const [customSubView, setCustomSubView] = useState<CustomWorkflowSubView>("new");
  const [customDataRevision, setCustomDataRevision] = useState(0);
  const bumpCustomData = () => setCustomDataRevision((n) => n + 1);

  const selectedTemplate = useMemo(() => {
    if (!selectedWorkflow) return undefined;
    const fromLibrary = workflowTemplates.find((w) => w.id === selectedWorkflow);
    if (fromLibrary) return fromLibrary;
    const built = loadBuiltWorkflows().find((b) => b.id === selectedWorkflow);
    return built ? builtEntryToTemplate(built) : undefined;
  }, [selectedWorkflow, customDataRevision]);

  const categoryMeta = selectedTemplate
    ? workflowCategories.find((c) => c.id === selectedTemplate.categoryId)
    : undefined;

  const customCategoryCount = useMemo(() => {
    const pending = loadCustomRequests().filter((r) => r.status === "pending").length;
    return pending + loadBuiltWorkflows().length;
  }, [customDataRevision]);

  const filteredWorkflows =
    activeCategory === "all"
      ? workflowTemplates
      : activeCategory === "custom"
        ? []
        : workflowTemplates.filter((w) => w.categoryId === activeCategory);

  if (selectedWorkflow) {
    return (
      <div className="max-w-4xl">
        <nav
          className="flex flex-wrap items-center gap-1 text-sm text-gray-500 mb-6"
          aria-label="Breadcrumb"
        >
          <button
            type="button"
            onClick={() => {
              if (selectedTemplate?.categoryId === "custom") {
                setActiveCategory("custom");
              } else {
                setActiveCategory("all");
              }
              onBack();
            }}
            className="hover:text-sv-blue transition-colors"
          >
            Workflows
          </button>
          <ChevronRight className="w-4 h-4 shrink-0 text-gray-300" aria-hidden />
          {categoryMeta && (
            <>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory(categoryMeta.id);
                  onBack();
                }}
                className="hover:text-sv-blue transition-colors max-w-[12rem] truncate text-left"
              >
                {categoryMeta.shortLabel}
              </button>
              <ChevronRight className="w-4 h-4 shrink-0 text-gray-300" aria-hidden />
            </>
          )}
          <span className="text-gray-900 font-medium truncate max-w-[min(100%,16rem)] sm:max-w-md">
            {selectedTemplate?.name ?? "Workflow"}
          </span>
        </nav>
        <WorkflowConfig workflow={selectedTemplate} onBack={onBack} />
      </div>
    );
  }

  const CategoryNav = (
    <>
      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-1 mb-2">
        Categories
      </p>
      <div className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-1 lg:pb-0 -mx-1 px-1 lg:mx-0 lg:px-0">
        <button
          type="button"
          onClick={() => setActiveCategory("all")}
          className={`flex items-center gap-2.5 w-full min-w-[max-content] lg:min-w-0 text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap lg:whitespace-normal ${
            activeCategory === "all"
              ? "bg-sv-blue/10 text-sv-blue"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          }`}
        >
          <LayoutGrid className="w-4 h-4 shrink-0 opacity-80" />
          All workflows
          <span className="ml-auto text-xs text-gray-400 font-normal hidden lg:inline">
            {workflowTemplates.length}
          </span>
        </button>
        {workflowCategories.map((cat) => {
          const count =
            cat.id === "custom"
              ? customCategoryCount
              : workflowTemplates.filter((w) => w.categoryId === cat.id).length;
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2.5 w-full min-w-[max-content] lg:min-w-0 text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap lg:whitespace-normal ${
                activeCategory === cat.id
                  ? "bg-sv-blue/10 text-sv-blue"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0 opacity-80" />
              <span className="lg:hidden">{cat.shortLabel}</span>
              <span className="hidden lg:inline">{cat.label}</span>
              <span className="ml-auto text-xs text-gray-400 font-normal tabular-nums">{count}</span>
            </button>
          );
        })}
      </div>
    </>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-0 lg:items-start">
      {/* Secondary nav — to the right of the main portal sidebar (breadcrumb-style grouping) */}
      <aside className="w-full lg:w-56 shrink-0 lg:border-r lg:border-gray-200 lg:pr-5 lg:mr-6 lg:min-h-[calc(100vh-6rem)]">
        {CategoryNav}
      </aside>

      <div className="flex-1 min-w-0">
        <nav className="hidden sm:flex flex-wrap items-center gap-1 text-xs text-gray-400 mb-3" aria-hidden>
          <span>Workflows</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-600">
            {activeCategory === "all" ? "All categories" : workflowCategories.find((c) => c.id === activeCategory)?.label}
          </span>
          {activeCategory === "custom" ? (
            <>
              <ChevronRight className="w-3 h-3" />
              <span className="text-gray-600">
                {customSubView === "new" && "New request"}
                {customSubView === "pending" && "Pending"}
                {customSubView === "library" && "My custom workflows"}
              </span>
            </>
          ) : null}
        </nav>
        <h1 className="font-[Sora] text-2xl font-bold text-gray-900 mb-2">Workflows</h1>
        <p className="text-gray-600 mb-2 max-w-2xl">
          {activeCategory === "all"
            ? "Browse every automation template. Pick a category on the left to focus on your industry or use case."
            : workflowCategories.find((c) => c.id === activeCategory)?.description}
        </p>
        {activeCategory !== "custom" ? (
          <p className="text-sm text-gray-500 mb-6">
            Showing {filteredWorkflows.length} workflow{filteredWorkflows.length === 1 ? "" : "s"}
            {activeCategory !== "all" ? ` in ${workflowCategories.find((c) => c.id === activeCategory)?.label}` : ""}.
          </p>
        ) : (
          <p className="text-sm text-gray-500 mb-6">
            New requests, pending intake, and workflows already on your account.
          </p>
        )}

        {activeCategory === "custom" ? (
          <CustomWorkflowSubPanels
            activeSubView={customSubView}
            setActiveSubView={setCustomSubView}
            onSelectWorkflow={onSelectWorkflow}
            dataRevision={customDataRevision}
            bumpData={bumpCustomData}
          />
        ) : (
          <div className="grid sm:grid-cols-2 xl:grid-cols-2 gap-4 max-w-5xl">
            {filteredWorkflows.map((workflow) => {
              const IconComponent = workflow.icon;
              const cat = workflowCategories.find((c) => c.id === workflow.categoryId);
              return (
                <button
                  key={workflow.id}
                  type="button"
                  onClick={() => onSelectWorkflow(workflow.id)}
                  className="flex items-start gap-4 p-5 rounded-xl border border-gray-200 bg-white text-left hover:border-sv-blue/40 hover:shadow-lg hover:shadow-sv-blue/5 transition-all duration-200 group"
                >
                  <div
                    className={`flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center ${workflow.iconBg} transition-transform group-hover:scale-105`}
                  >
                    <IconComponent className="w-5 h-5" strokeWidth={2} />
                  </div>
                  <div className="flex-1 min-w-0">
                    {cat && (
                      <span className="text-[10px] font-semibold uppercase tracking-wide text-sv-blue/70 mb-1 block">
                        {cat.shortLabel}
                      </span>
                    )}
                    <h3 className="font-semibold text-gray-900 group-hover:text-sv-blue transition-colors text-sm leading-tight">
                      {workflow.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1.5 leading-relaxed line-clamp-3">{workflow.desc}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-sv-blue shrink-0 mt-1 transition-colors" />
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

const SCHEDULE_INTERVALS = [
  { value: 15, label: "Every 15 minutes" },
  { value: 30, label: "Every 30 minutes" },
  { value: 45, label: "Every 45 minutes" },
  { value: 60, label: "Every hour" },
  { value: 120, label: "Every 2 hours" },
  { value: 360, label: "Every 6 hours" },
  { value: 720, label: "Every 12 hours" },
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
];

const LEAD_DELAY_UNITS = [
  { value: "minutes", label: "Minutes" },
  { value: "hours", label: "Hours" },
  { value: "days", label: "Days" },
] as const;

function WorkflowConfig({
  workflow,
  onBack,
}: {
  workflow: WorkflowTemplate | undefined;
  onBack: () => void;
}) {
  const storageKey = STORAGE_KEYS.workflow(workflow?.id ?? "default");
  const [enabled, setEnabled] = useState(true);
  const [runType, setRunType] = useState<"schedule" | "lead">("lead");
  const [scheduleInterval, setScheduleInterval] = useState<string | number>(60);
  const [scheduleTime, setScheduleTime] = useState("09:00");
  const [scheduleDays, setScheduleDays] = useState<string>("1,2,3,4,5");
  const [leadDelayValue, setLeadDelayValue] = useState(3);
  const [leadDelayUnit, setLeadDelayUnit] = useState<"minutes" | "hours" | "days">("days");
  const [triggerConditions, setTriggerConditions] = useState("");
  const [actions, setActions] = useState("");
  const [savedFeedback, setSavedFeedback] = useState(false);
  const [runFeedback, setRunFeedback] = useState<"idle" | "running" | "success" | "error">("idle");

  const handleRunNow = async () => {
    if (!workflow?.id) return;
    setRunFeedback("running");
    try {
      const result = await runWorkflow(workflow.id);
      setRunFeedback(result.success ? "success" : "error");
      setTimeout(() => setRunFeedback("idle"), 2500);
    } catch {
      setRunFeedback("error");
      setTimeout(() => setRunFeedback("idle"), 2500);
    }
  };

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.enabled !== undefined) setEnabled(parsed.enabled);
        if (parsed.runType) setRunType(parsed.runType);
        if (parsed.scheduleInterval !== undefined) setScheduleInterval(parsed.scheduleInterval);
        if (parsed.scheduleTime) setScheduleTime(parsed.scheduleTime);
        if (parsed.scheduleDays) setScheduleDays(parsed.scheduleDays);
        if (parsed.leadDelayValue !== undefined) setLeadDelayValue(parsed.leadDelayValue);
        if (parsed.leadDelayUnit) setLeadDelayUnit(parsed.leadDelayUnit);
        if (parsed.triggerConditions) setTriggerConditions(parsed.triggerConditions);
        if (parsed.actions) setActions(parsed.actions);
      }
    } catch {}
  }, [storageKey]);

  const handleSaveConfig = () => {
    const data = {
      enabled,
      runType,
      scheduleInterval,
      scheduleTime,
      scheduleDays,
      leadDelayValue,
      leadDelayUnit,
      triggerConditions,
      actions,
    };
    localStorage.setItem(storageKey, JSON.stringify(data));
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 2000);
  };

  const dayLabels: Record<string, string> = {
    "0": "Sun", "1": "Mon", "2": "Tue", "3": "Wed", "4": "Thu", "5": "Fri", "6": "Sat",
  };

  return (
    <div>
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-sv-blue mb-6 transition-colors"
      >
        <ChevronRight className="w-4 h-4 rotate-180" />
        Back to workflows
      </button>
      <h1 className="font-[Sora] text-2xl font-bold text-gray-900 mb-2">
        {workflow?.name ?? "Workflow"} — Configuration
      </h1>
      <p className="text-gray-600 mb-8">{workflow?.desc}</p>

      <div className="space-y-6 max-w-4xl">
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Configuration options</h3>
          <label className="flex items-center gap-2 mb-6">
            <input
              type="checkbox"
              checked={enabled}
              onChange={(e) => setEnabled(e.target.checked)}
              className="rounded border-gray-300"
            />
            <span className="text-sm font-medium text-gray-700">Enable workflow</span>
          </label>

          {/* When to run */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-sv-blue" />
              When to run
            </h4>
            <p className="text-sm text-gray-500 mb-4">
              Choose whether to run on a fixed schedule or relative to when a lead was added.
            </p>
            <div className="flex gap-4 mb-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="runType"
                  checked={runType === "lead"}
                  onChange={() => setRunType("lead")}
                  className="border-gray-300"
                />
                <Timer className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">After lead added</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="runType"
                  checked={runType === "schedule"}
                  onChange={() => setRunType("schedule")}
                  className="border-gray-300"
                />
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">On schedule</span>
              </label>
            </div>

            {runType === "lead" && (
              <div className="flex flex-wrap items-center gap-3 p-4 rounded-lg bg-gray-50 border border-gray-100">
                <span className="text-sm text-gray-600">Run</span>
                <input
                  type="number"
                  min={1}
                  max={365}
                  value={leadDelayValue}
                  onChange={(e) => setLeadDelayValue(Math.max(1, Math.min(365, Number(e.target.value) || 1)))}
                  className="w-20 px-3 py-2 rounded-lg border border-gray-200 text-sm"
                />
                <select
                  value={leadDelayUnit}
                  onChange={(e) => setLeadDelayUnit(e.target.value as "minutes" | "hours" | "days")}
                  className="px-3 py-2 rounded-lg border border-gray-200 text-sm"
                >
                  {LEAD_DELAY_UNITS.map((u) => (
                    <option key={u.value} value={u.value}>
                      {u.label}
                    </option>
                  ))}
                </select>
                <span className="text-sm text-gray-600">after lead was first added</span>
              </div>
            )}

            {runType === "schedule" && (
              <div className="space-y-4 p-4 rounded-lg bg-gray-50 border border-gray-100">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Interval</label>
                  <select
                    value={scheduleInterval}
                    onChange={(e) =>
                      setScheduleInterval(e.target.value === "daily" || e.target.value === "weekly" ? e.target.value : Number(e.target.value))
                    }
                    className="w-full sm:w-64 px-3 py-2 rounded-lg border border-gray-200 text-sm"
                  >
                    {SCHEDULE_INTERVALS.map((s) => (
                      <option key={String(s.value)} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>
                {(scheduleInterval === "daily" || scheduleInterval === "weekly") && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Time of day</label>
                      <input
                        type="time"
                        value={scheduleTime}
                        onChange={(e) => setScheduleTime(e.target.value)}
                        className="px-3 py-2 rounded-lg border border-gray-200 text-sm"
                      />
                    </div>
                    {scheduleInterval === "weekly" && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Days of week</label>
                        <div className="flex flex-wrap gap-2">
                          {["1", "2", "3", "4", "5", "6", "0"].map((d) => (
                            <label
                              key={d}
                              className={`inline-flex items-center px-3 py-1.5 rounded-lg border text-sm cursor-pointer ${
                                scheduleDays.includes(d)
                                  ? "border-sv-blue bg-sv-blue/10 text-sv-blue"
                                  : "border-gray-200 text-gray-600 hover:border-gray-300"
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={scheduleDays.includes(d)}
                                onChange={(e) =>
                                  setScheduleDays(
                                    e.target.checked
                                      ? [...scheduleDays.split(","), d].filter(Boolean).sort().join(",")
                                      : scheduleDays.split(",").filter((x) => x !== d).join(",")
                                  )
                                }
                                className="sr-only"
                              />
                              {dayLabels[d]}
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-gray-100">
            <label className="block text-sm font-medium text-gray-700 mb-2">Trigger conditions</label>
            <p className="text-xs text-gray-500 mb-1.5">
              Available lead fields: nextFollowUpDate, initialCaptureDate, currentStep, nextStep, source, group, etc.
            </p>
            <input
              type="text"
              placeholder="e.g. nextFollowUpDate is today, currentStep is Qualify, Source is website..."
              value={triggerConditions}
              onChange={(e) => setTriggerConditions(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm"
            />
          </div>
          <div className="pt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Actions</label>
            <input
              type="text"
              placeholder="Configure actions..."
              value={actions}
              onChange={(e) => setActions(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm"
            />
          </div>
          <div className="flex flex-wrap items-center gap-3 pt-6 mt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={handleSaveConfig}
              className="flex items-center gap-2 px-5 py-2.5 text-sm sv-neo-btn sv-neo-btn--blue font-semibold rounded-xl"
            >
              <Save className="w-4 h-4" />
              Save configuration
            </button>
            <button
              type="button"
              onClick={handleRunNow}
              disabled={runFeedback === "running"}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Play className="w-4 h-4" />
              {runFeedback === "running" ? "Running…" : "Run now"}
            </button>
            {savedFeedback && (
              <span className="flex items-center gap-1.5 text-sm text-emerald-600">
                <CheckCircle2 className="w-4 h-4" />
                Saved
              </span>
            )}
            {runFeedback === "success" && (
              <span className="flex items-center gap-1.5 text-sm text-emerald-600">
                <CheckCircle2 className="w-4 h-4" />
                Ran successfully
              </span>
            )}
            {runFeedback === "error" && (
              <span className="flex items-center gap-1.5 text-sm text-red-600">Run failed</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

type Lead = {
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

const visibleFieldConfigFrom = (config: LeadFieldsConfig) =>
  getVisibleFieldsFromConfig(config).map((f) => ({
    dbName: f.dbName,
    displayName: getDisplayName(config, f.dbName),
  }));

const LEAD_FIELDS = DEFAULT_LEAD_FIELDS_CONFIG.fields.map((f) => ({ id: f.dbName, label: f.displayName }));

const GROUP_BY_OPTIONS = [
  { id: "none", label: "No grouping" },
  { id: "source", label: "Source" },
  { id: "group", label: "Group" },
  { id: "isReferral", label: "Referral" },
];

const CSV_TEMPLATE = "name,email,phone,company,source,notes,is_referral,referred_by,ref_payment_made,ref_amount,initial_capture_date,next_follow_up_date,current_step,next_step\nJohn Doe,john@example.com,+1 555-0100,Acme Corp,Website,Interested in quote,no,,,,,2025-03-11,2025-03-18,Qualify,Schedule call\nJane Smith,jane@example.com,+1 555-0101,Beta Inc,Referral,Follow up,yes,Jane Doe,yes,100,,2025-03-15,Proposal,Send contract";

const LEAD_QUANTITY_OPTIONS = [50, 100, 250, 500] as const;
const LEAD_QUALITY_OPTIONS = ["Low", "Medium", "High"] as const;
const LEAD_VETTED_OPTIONS = ["Vetted", "Non-Vetted"] as const;
const LEAD_OUTPUT_OPTIONS = ["CSV", "Excel (.xlsx)"] as const;

type LeadSubSectionId = "grid" | "generate" | "import" | "crm";

const leadSubSections: {
  id: LeadSubSectionId;
  label: string;
  shortLabel: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    id: "grid",
    label: "Grid",
    shortLabel: "Grid",
    description:
      "Full lead table with search, filters, sortable columns, and visible columns. Add rows manually or use grouped view.",
    icon: LayoutGrid,
  },
  {
    id: "generate",
    label: "Generate",
    shortLabel: "Gen",
    description:
      "Build prospect lists from profile context and options; download or add results to your grid (demo / placeholder flow).",
    icon: Sparkles,
  },
  {
    id: "import",
    label: "Import",
    shortLabel: "Import",
    description: "CSV import with UTF-8 guidance, append vs replace, duplicate skipping, and optional email validation.",
    icon: Upload,
  },
  {
    id: "crm",
    label: "CRM sync",
    shortLabel: "CRM",
    description: "Configure push/pull, conflict rules, scope, and connect from Integrations when your CRM is wired up.",
    icon: RefreshCw,
  },
];

function loadStoredLeads(): Lead[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.leads);
    if (!raw) return [];
    const list = JSON.parse(raw) as unknown;
    if (!Array.isArray(list)) return [];
    return list
      .filter((x): x is Record<string, unknown> => x !== null && typeof x === "object")
      .map((x) => ({
        id: String(x.id ?? crypto.randomUUID()),
        name: String(x.name ?? ""),
        email: String(x.email ?? ""),
        phone: String(x.phone ?? ""),
        company: String(x.company ?? ""),
        source: String(x.source ?? ""),
        notes: String(x.notes ?? ""),
        group: x.group ? String(x.group) : undefined,
        isReferral: typeof x.isReferral === "boolean" ? x.isReferral : undefined,
        referralSource: x.referralSource ? String(x.referralSource) : undefined,
        referralPaymentMade: typeof x.referralPaymentMade === "boolean" ? x.referralPaymentMade : undefined,
        referralPaymentAmount: typeof x.referralPaymentAmount === "number" ? x.referralPaymentAmount : undefined,
        initialCaptureDate: x.initialCaptureDate ? String(x.initialCaptureDate) : undefined,
        nextFollowUpDate: x.nextFollowUpDate ? String(x.nextFollowUpDate) : undefined,
        currentStep: x.currentStep ? String(x.currentStep) : undefined,
        nextStep: x.nextStep ? String(x.nextStep) : undefined,
      }));
  } catch {
    return [];
  }
}

function isValidEmail(s: string): boolean {
  const t = s.trim();
  if (!t) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t);
}

/** Today in YYYY-MM-DD (for initialCaptureDate default) */
function todayISO(): string {
  return new Date().toISOString().split("T")[0];
}

/** Date N days from today in YYYY-MM-DD (CRM default: 7 days for next follow-up) */
function todayPlusDays(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

const LEAD_DEFAULTS = {
  initialCaptureDate: () => todayISO(),
  nextFollowUpDate: () => todayPlusDays(7),
  currentStep: "New",
  nextStep: "Qualify",
} as const;

function formatLeadDate(iso?: string): string {
  if (!iso) return "—";
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
  } catch {
    return iso;
  }
}

function getLeadValue(lead: Lead, fieldId: string): string {
  const v = (lead as Record<string, unknown>)[fieldId];
  if (v === undefined || v === null) return "—";
  if (typeof v === "boolean") return v ? "Yes" : "No";
  if (typeof v === "number") return v > 0 ? `$${v.toFixed(2)}` : "—";
  if (DATE_FIELD_DB_NAMES.has(fieldId) && typeof v === "string") return formatLeadDate(v);
  return String(v);
}

function getGroupKey(lead: Lead, fieldId: string): string {
  if (fieldId === "none") return "";
  const v = getLeadValue(lead, fieldId);
  return v || "(blank)";
}

function AddLeadDialog({
  open,
  onOpenChange,
  onAdd,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (lead: Omit<Lead, "id">) => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [source, setSource] = useState("");
  const [notes, setNotes] = useState("");
  const [group, setGroup] = useState("");
  const [isReferral, setIsReferral] = useState(false);
  const [referralSource, setReferralSource] = useState("");
  const [referralPaymentMade, setReferralPaymentMade] = useState(false);
  const [referralPaymentAmount, setReferralPaymentAmount] = useState("");
  const [initialCaptureDate, setInitialCaptureDate] = useState("");
  const [nextFollowUpDate, setNextFollowUpDate] = useState("");
  const [currentStep, setCurrentStep] = useState("");
  const [nextStep, setNextStep] = useState("");

  const reset = () => {
    setName("");
    setEmail("");
    setPhone("");
    setCompany("");
    setSource("");
    setNotes("");
    setGroup("");
    setIsReferral(false);
    setReferralSource("");
    setReferralPaymentMade(false);
    setReferralPaymentAmount("");
    setInitialCaptureDate("");
    setNextFollowUpDate("");
    setCurrentStep("");
    setNextStep("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      name,
      email,
      phone,
      company,
      source,
      notes,
      group: group || undefined,
      isReferral: isReferral || undefined,
      referralSource: referralSource || undefined,
      referralPaymentMade: referralPaymentMade || undefined,
      referralPaymentAmount: referralPaymentAmount ? parseFloat(referralPaymentAmount) || undefined : undefined,
      initialCaptureDate: initialCaptureDate || LEAD_DEFAULTS.initialCaptureDate(),
      nextFollowUpDate: nextFollowUpDate || LEAD_DEFAULTS.nextFollowUpDate(),
      currentStep: currentStep || LEAD_DEFAULTS.currentStep,
      nextStep: nextStep || LEAD_DEFAULTS.nextStep,
    });
    reset();
    onOpenChange(false);
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) reset();
    onOpenChange(next);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Lead</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="add-name">Name</Label>
              <Input id="add-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-email">Email</Label>
              <Input id="add-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@example.com" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="add-phone">Phone</Label>
              <Input id="add-phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 555-0100" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-company">Company</Label>
              <Input id="add-company" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Acme Corp" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="add-source">Source</Label>
              <Input id="add-source" value={source} onChange={(e) => setSource(e.target.value)} placeholder="Website, Referral..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-group">Group</Label>
              <Input id="add-group" value={group} onChange={(e) => setGroup(e.target.value)} placeholder="Optional" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="add-notes">Notes</Label>
            <Input id="add-notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Notes..." />
          </div>
          <div className="border-t border-gray-200 pt-4 space-y-4">
            <p className="text-sm font-medium text-gray-700">Referral</p>
            <div className="flex items-center gap-2">
              <Checkbox id="add-referral" checked={isReferral} onCheckedChange={(c) => setIsReferral(!!c)} />
              <Label htmlFor="add-referral" className="font-normal cursor-pointer">This is a referral</Label>
            </div>
            {isReferral && (
              <div className="grid grid-cols-2 gap-4 pl-6">
                <div className="space-y-2">
                  <Label htmlFor="add-referred-by">Referred by</Label>
                  <Input id="add-referred-by" value={referralSource} onChange={(e) => setReferralSource(e.target.value)} placeholder="Name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="add-ref-amount">Amount ($)</Label>
                  <Input id="add-ref-amount" type="number" min="0" step="0.01" value={referralPaymentAmount} onChange={(e) => setReferralPaymentAmount(e.target.value)} placeholder="0" />
                </div>
                <div className="flex items-center gap-2 col-span-2">
                  <Checkbox id="add-ref-paid" checked={referralPaymentMade} onCheckedChange={(c) => setReferralPaymentMade(!!c)} />
                  <Label htmlFor="add-ref-paid" className="font-normal cursor-pointer">Payment made</Label>
                </div>
              </div>
            )}
          </div>
          <div className="border-t border-gray-200 pt-4 space-y-4">
            <p className="text-sm font-medium text-gray-700">Workflow (optional)</p>
            <p className="text-xs text-gray-500">Set lead fields used by workflow triggers. Dates in YYYY-MM-DD.</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="add-initial-capture">Initial capture date</Label>
                <Input id="add-initial-capture" type="date" value={initialCaptureDate} onChange={(e) => setInitialCaptureDate(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="add-next-followup">Next follow-up date</Label>
                <Input id="add-next-followup" type="date" value={nextFollowUpDate} onChange={(e) => setNextFollowUpDate(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="add-current-step">Current step</Label>
                <Input id="add-current-step" value={currentStep} onChange={(e) => setCurrentStep(e.target.value)} placeholder="e.g. Qualify" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="add-next-step">Next step</Label>
                <Input id="add-next-step" value={nextStep} onChange={(e) => setNextStep(e.target.value)} placeholder="e.g. Schedule call" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>Cancel</Button>
            <Button type="submit">Add Lead</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function LeadsContent({
  profileJob,
  profileRole,
  profileIndustry,
  onNavigateToSection,
}: {
  profileJob: string;
  profileRole: string;
  profileIndustry: string;
  onNavigateToSection?: (section: SectionId) => void;
}) {
  const [activeLeadTab, setActiveLeadTab] = useState<LeadSubSectionId>("grid");
  const [leads, setLeads] = useState<Lead[]>(() => loadStoredLeads());
  const [addLeadOpen, setAddLeadOpen] = useState(false);
  const [leadView, setLeadView] = useState<"grid" | "grouped">("grid");
  const [groupByField, setGroupByField] = useState<string>("none");
  const [fieldConfig, setFieldConfig] = useState<LeadFieldsConfig>(() => loadLeadFieldsConfig());
  const visibleFieldConfig = visibleFieldConfigFrom(fieldConfig);
  const visibleFields = useMemo(() => visibleFieldConfig.map((f) => f.dbName), [visibleFieldConfig]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSource, setFilterSource] = useState<string>("");
  const [filterStep, setFilterStep] = useState<string>("");
  const [filterReferral, setFilterReferral] = useState<"all" | "yes" | "no">("all");
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [isDragging, setIsDragging] = useState(false);
  const [importedCount, setImportedCount] = useState<number | null>(null);
  const [importSkippedDup, setImportSkippedDup] = useState(0);
  const [importSkippedInvalid, setImportSkippedInvalid] = useState(0);
  const [importError, setImportError] = useState<string | null>(null);
  const [importMode, setImportMode] = useState<"append" | "replace">("append");
  const [importSkipDuplicates, setImportSkipDuplicates] = useState(true);
  const [importValidateEmails, setImportValidateEmails] = useState(false);
  const [lastImportHeaders, setLastImportHeaders] = useState<string[] | null>(null);
  const [leadQuantity, setLeadQuantity] = useState<number>(100);
  const [leadQuality, setLeadQuality] = useState<string>("Medium");
  const [leadVetted, setLeadVetted] = useState<string>("Vetted");
  const [leadOutputType, setLeadOutputType] = useState<string>("CSV");
  const [genGeography, setGenGeography] = useState("");
  const [genIndustryFocus, setGenIndustryFocus] = useState("");
  const [genLeadType, setGenLeadType] = useState<string>("B2B");
  const [genDataFreshness, setGenDataFreshness] = useState<string>("90");
  const [genLanguage, setGenLanguage] = useState("English");
  const [genExcludeExistingEmails, setGenExcludeExistingEmails] = useState(true);
  const [genAddToGrid, setGenAddToGrid] = useState(false);
  const [genClearBeforeAdd, setGenClearBeforeAdd] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [crmProvider, setCrmProvider] = useState<string>("");
  const [crmSyncDirection, setCrmSyncDirection] = useState<string>("push");
  const [crmConflict, setCrmConflict] = useState<string>("crm");
  const [crmScope, setCrmScope] = useState<string>("all");
  const [crmDedupe, setCrmDedupe] = useState(true);
  const [crmLastSync, setCrmLastSync] = useState<string | null>(null);
  const [crmSyncBusy, setCrmSyncBusy] = useState(false);
  const [crmSyncNote, setCrmSyncNote] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const leadsRef = useRef(leads);
  leadsRef.current = leads;

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.leads, JSON.stringify(leads));
    } catch {
      /* ignore */
    }
  }, [leads]);

  useEffect(() => {
    try {
      const t = localStorage.getItem(STORAGE_KEYS.crmLastSync);
      setCrmLastSync(t || null);
    } catch {
      setCrmLastSync(null);
    }
  }, []);

  const addLead = (lead: Omit<Lead, "id">) => {
    setLeads((prev) => [...prev, { ...lead, id: crypto.randomUUID() }]);
  };
  const removeLead = (id: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
  };

  const columnLabel = (fid: string) =>
    visibleFieldConfig.find((v) => v.dbName === fid)?.displayName ??
    LEAD_FIELDS.find((f) => f.id === fid)?.label ??
    fid;

  const uniqueSources = useMemo(() => {
    const set = new Set<string>();
    for (const l of leads) {
      if (l.source) set.add(l.source);
    }
    return Array.from(set).sort();
  }, [leads]);
  const uniqueSteps = useMemo(() => {
    const set = new Set<string>();
    for (const l of leads) {
      if (l.currentStep) set.add(l.currentStep);
    }
    return Array.from(set).sort();
  }, [leads]);

  const processedLeads = useMemo(() => {
    let list = [...leads];
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      list = list.filter((lead) =>
        [
          lead.name,
          lead.email,
          lead.phone,
          lead.company,
          lead.source,
          lead.notes,
          lead.group,
          lead.currentStep,
          lead.nextStep,
          lead.referralSource,
        ].some((v) => String(v ?? "").toLowerCase().includes(q))
      );
    }
    if (filterSource) list = list.filter((l) => l.source === filterSource);
    if (filterStep) list = list.filter((l) => (l.currentStep || "") === filterStep);
    if (filterReferral === "yes") list = list.filter((l) => l.isReferral);
    if (filterReferral === "no") list = list.filter((l) => !l.isReferral);
    if (sortKey) {
      list.sort((a, b) => {
        const av = getLeadValue(a, sortKey).replace(/—/g, "").toLowerCase();
        const bv = getLeadValue(b, sortKey).replace(/—/g, "").toLowerCase();
        const cmp = av < bv ? -1 : av > bv ? 1 : 0;
        return sortDir === "asc" ? cmp : -cmp;
      });
    }
    return list;
  }, [leads, searchQuery, filterSource, filterStep, filterReferral, sortKey, sortDir]);

  const toggleSort = (fid: string) => {
    if (sortKey === fid) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(fid);
      setSortDir("asc");
    }
  };

  const exportGridCsv = () => {
    const header = [...visibleFields, "id"];
    const esc = (s: string) => `"${String(s).replace(/"/g, '""')}"`;
    const lines = [
      header.join(","),
      ...processedLeads.map((lead) =>
        header
          .map((fid) => {
            if (fid === "id") return esc(lead.id);
            const raw = (lead as Record<string, unknown>)[fid];
            const cell =
              raw === undefined || raw === null
                ? ""
                : typeof raw === "boolean"
                  ? raw
                    ? "yes"
                    : "no"
                  : String(raw);
            return esc(cell);
          })
          .join(",")
      ),
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads_export_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleGenerateLeads = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const first = ["Alex", "Jordan", "Taylor", "Riley", "Morgan", "Casey", "Jamie", "Quinn"];
      const last = ["Chen", "Rivera", "Patel", "Nguyen", "Okafor", "Silva", "Park", "Bakker"];
      const companies = ["Northwind", "Contoso", "Fabrikam", "Adventure", "Litware", "Wide World"];
      const existingEmails = new Set(leads.map((l) => l.email.trim().toLowerCase()).filter(Boolean));
      const batch: Lead[] = [];
      let n = 0;
      let i = 0;
      while (n < leadQuantity && i < leadQuantity * 3) {
        i += 1;
        const fn = first[Math.floor(Math.random() * first.length)];
        const ln = last[Math.floor(Math.random() * last.length)];
        const co = companies[Math.floor(Math.random() * companies.length)];
        const email = `${fn.toLowerCase()}.${ln.toLowerCase()}${i}@example.com`;
        if (genExcludeExistingEmails && existingEmails.has(email.toLowerCase())) continue;
        existingEmails.add(email.toLowerCase());
        batch.push({
          id: crypto.randomUUID(),
          name: `${fn} ${ln}`,
          email,
          phone: `+1 555-${String(100 + (i % 900)).padStart(3, "0")}-${String(1000 + (i % 9000)).slice(-4)}`,
          company: `${co} ${genLeadType === "B2C" ? "Household" : "LLC"}`,
          source: `Generated · ${leadQuality} · ${leadVetted}${profileIndustry ? ` · ${profileIndustry}` : ""}`,
          notes: [
            genGeography && `Geo: ${genGeography}`,
            genIndustryFocus && `Vertical: ${genIndustryFocus}`,
            `Freshness: ${genDataFreshness}d`,
            genLanguage && `Lang: ${genLanguage}`,
            profileJob && `Job ctx: ${profileJob}`,
            profileRole && `Role: ${profileRole}`,
          ]
            .filter(Boolean)
            .join(" · "),
          initialCaptureDate: LEAD_DEFAULTS.initialCaptureDate(),
          nextFollowUpDate: LEAD_DEFAULTS.nextFollowUpDate(),
          currentStep: LEAD_DEFAULTS.currentStep,
          nextStep: LEAD_DEFAULTS.nextStep,
        });
        n += 1;
      }
      if (genAddToGrid) {
        setLeads((prev) => (genClearBeforeAdd ? batch : [...prev, ...batch]));
      }
      setIsGenerating(false);
    }, 1600);
  };

  const parseCsv = (text: string): string[][] => {
    const rows: string[][] = [];
    const lines = text.split(/\r?\n/);
    for (const line of lines) {
      const row: string[] = [];
      let current = "";
      let inQuotes = false;
      for (let i = 0; i < line.length; i++) {
        const c = line[i];
        if (c === '"') {
          inQuotes = !inQuotes;
        } else if ((c === "," && !inQuotes) || (c === "\n" && !inQuotes)) {
          row.push(current.trim());
          current = "";
        } else {
          current += c;
        }
      }
      row.push(current.trim());
      if (row.some((cell) => cell)) rows.push(row);
    }
    return rows;
  };

  const handleFile = (file: File) => {
    setImportError(null);
    setImportSkippedDup(0);
    setImportSkippedInvalid(0);
    if (!file.name.endsWith(".csv")) {
      setImportError("Please upload a CSV file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = (e.target?.result as string) || "";
        const rows = parseCsv(text);
        if (rows.length < 2) {
          setImportedCount(0);
          setLastImportHeaders(null);
          return;
        }
        const headers = rows[0].map((h) => h.toLowerCase().replace(/\s/g, "_"));
        setLastImportHeaders(headers);
        const dataRows = rows.slice(1);
        let reportDup = 0;
        let reportInv = 0;
        let reportImported = 0;
        const parseRow = (row: string[]): Lead => {
          const get = (cols: string[]) => {
            const i = cols.findIndex((c) => headers.includes(c));
            return i >= 0 ? (row[headers.indexOf(cols[i])] || "").trim() : "";
          };
          const name = get(["name"]) || get(["Name"]);
          const email = get(["email"]) || get(["Email"]);
          const phone = get(["phone"]) || get(["Phone"]);
          const company = get(["company"]) || get(["Company"]);
          const source = get(["source"]) || get(["Source"]);
          const notes = get(["notes"]) || get(["Notes"]);
          const isRefRaw = get(["is_referral", "isreferral"]);
          const isReferral = /^(1|yes|true)$/i.test(isRefRaw);
          const referralSource = get(["referred_by", "referralsource", "referral_source"]);
          const refPayRaw = get(["ref_payment_made", "refpaymentmade"]);
          const referralPaymentMade = /^(1|yes|true)$/i.test(refPayRaw);
          const refAmt = get(["ref_amount", "refamount"]);
          const referralPaymentAmount = refAmt ? parseFloat(refAmt) || undefined : undefined;
          const initialCaptureDate = get(["initial_capture_date", "initialcapturedate"]);
          const nextFollowUpDate = get(["next_follow_up_date", "nextfollowupdate"]);
          const currentStep = get(["current_step", "currentstep"]);
          const nextStep = get(["next_step", "nextstep"]);
          const groupVal = get(["group"]);
          return {
            id: crypto.randomUUID(),
            name,
            email,
            phone,
            company,
            source,
            notes,
            group: groupVal || undefined,
            isReferral: isReferral || undefined,
            referralSource: referralSource || undefined,
            referralPaymentMade: referralPaymentMade || undefined,
            referralPaymentAmount,
            initialCaptureDate: initialCaptureDate || LEAD_DEFAULTS.initialCaptureDate(),
            nextFollowUpDate: nextFollowUpDate || LEAD_DEFAULTS.nextFollowUpDate(),
            currentStep: currentStep || LEAD_DEFAULTS.currentStep,
            nextStep: nextStep || LEAD_DEFAULTS.nextStep,
          };
        };

        const prev = leadsRef.current;
        const emailSet = new Set<string>();
        if (importSkipDuplicates) {
          const pool = importMode === "replace" ? [] : prev;
          for (const l of pool) {
            const e = l.email.trim().toLowerCase();
            if (e) emailSet.add(e);
          }
        }
        const collected: Lead[] = [];
        let dup = 0;
        let inv = 0;
        for (const row of dataRows) {
          if (!row.some((c) => c)) continue;
          if (importValidateEmails) {
            const getE = (cols: string[]) => {
              const i = cols.findIndex((c) => headers.includes(c));
              return i >= 0 ? (row[headers.indexOf(cols[i])] || "").trim() : "";
            };
            const em = getE(["email"]) || getE(["Email"]);
            if (!isValidEmail(em)) {
              inv += 1;
              continue;
            }
          }
          const lead = parseRow(row);
          const ek = lead.email.trim().toLowerCase();
          if (importSkipDuplicates && ek && emailSet.has(ek)) {
            dup += 1;
            continue;
          }
          if (ek) emailSet.add(ek);
          collected.push(lead);
        }
        reportDup = dup;
        reportInv = inv;
        reportImported = collected.length;
        setImportSkippedDup(reportDup);
        setImportSkippedInvalid(reportInv);
        setImportedCount(reportImported);
        setLeads(importMode === "replace" ? collected : [...prev, ...collected]);
      } catch {
        setImportError("Could not parse CSV. Please check the file format.");
      }
    };
    reader.readAsText(file, "UTF-8");
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => setIsDragging(false);

  const downloadTemplate = () => {
    const blob = new Blob([CSV_TEMPLATE], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "leads_template.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const leadSectionMeta = leadSubSections.find((s) => s.id === activeLeadTab);

  const handleCrmSync = () => {
    if (!crmProvider) {
      setCrmSyncNote("Choose a CRM target first.");
      setTimeout(() => setCrmSyncNote(null), 5000);
      return;
    }
    setCrmSyncBusy(true);
    setCrmSyncNote(null);
    setTimeout(() => {
      const t = new Date().toISOString();
      try {
        localStorage.setItem(STORAGE_KEYS.crmLastSync, t);
      } catch {
        /* ignore */
      }
      setCrmLastSync(t);
      setCrmSyncBusy(false);
      const scopeN =
        crmScope === "filtered" ? processedLeads.length : crmScope === "newSinceLast" ? Math.min(leads.length, 12) : leads.length;
      setCrmSyncNote(
        `Demo sync recorded at ${new Date(t).toLocaleString()}: ${crmSyncDirection} · ~${scopeN} lead(s) · dedupe ${crmDedupe ? "on" : "off"} · conflict: ${crmConflict}. Connect under Integrations for production.`
      );
      setTimeout(() => setCrmSyncNote(null), 10000);
    }, 900);
  };

  const LeadsSubNav = (
    <>
      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-1 mb-2">Leads</p>
      <div className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-1 lg:pb-0 -mx-1 px-1 lg:mx-0 lg:px-0">
        {leadSubSections.map((sec) => {
          const Icon = sec.icon;
          return (
            <button
              key={sec.id}
              type="button"
              onClick={() => setActiveLeadTab(sec.id)}
              className={`flex items-center gap-2.5 w-full min-w-[max-content] lg:min-w-0 text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap lg:whitespace-normal ${
                activeLeadTab === sec.id ? "bg-sv-blue/10 text-sv-blue" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0 opacity-80" />
              <span className="lg:hidden">{sec.shortLabel}</span>
              <span className="hidden lg:inline">{sec.label}</span>
            </button>
          );
        })}
      </div>
    </>
  );

  const renderLeadsTable = (rows: Lead[], sortable: boolean) => (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <Table>
        <TableHeader>
          <TableRow>
            {visibleFields.map((fid) => (
              <TableHead key={fid}>
                {sortable ? (
                  <button
                    type="button"
                    onClick={() => toggleSort(fid)}
                    className="inline-flex items-center gap-1.5 font-medium text-left hover:text-sv-blue -mx-1 px-1 rounded"
                  >
                    {columnLabel(fid)}
                    {sortKey === fid ? (
                      <span className="text-sv-blue text-xs tabular-nums" aria-hidden>
                        {sortDir === "asc" ? "↑" : "↓"}
                      </span>
                    ) : (
                      <ArrowUpDown className="w-3.5 h-3.5 opacity-40 shrink-0" aria-hidden />
                    )}
                  </button>
                ) : (
                  <span className="font-medium">{columnLabel(fid)}</span>
                )}
              </TableHead>
            ))}
            <TableHead className="w-10" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((lead) => (
            <TableRow key={lead.id}>
              {visibleFields.map((fid) => (
                <TableCell key={fid} className="max-w-[220px] truncate" title={getLeadValue(lead, fid)}>
                  {getLeadValue(lead, fid)}
                </TableCell>
              ))}
              <TableCell>
                <button
                  type="button"
                  onClick={() => removeLead(lead.id)}
                  className="text-gray-400 hover:text-red-600 transition-colors p-1"
                  aria-label="Remove lead"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-0 lg:items-start">
      <aside className="w-full lg:w-56 shrink-0 lg:border-r lg:border-gray-200 lg:pr-5 lg:mr-6 lg:min-h-[calc(100vh-6rem)]">
        {LeadsSubNav}
      </aside>

      <div className="flex-1 min-w-0 max-w-5xl">
        <nav className="hidden sm:flex flex-wrap items-center gap-1 text-xs text-gray-400 mb-3" aria-hidden>
          <span>Leads</span>
          <ChevronRight className="w-3 h-3 shrink-0" />
          <span className="text-gray-600">{leadSectionMeta?.label}</span>
        </nav>
        <h1 className="font-[Sora] text-2xl font-bold text-gray-900 mb-2">Leads</h1>
        <p className="text-gray-600 mb-6 max-w-2xl">{leadSectionMeta?.description}</p>

        <AddLeadDialog open={addLeadOpen} onOpenChange={setAddLeadOpen} onAdd={addLead} />

        {activeLeadTab === "grid" && (
          <div className="space-y-5">
            <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:items-end">
                <div className="flex-1 min-w-[200px]">
                  <Label className="text-xs text-gray-500 mb-1.5 block">Search</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" aria-hidden />
                    <Input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Name, email, company, source, notes…"
                      className="pl-9"
                    />
                  </div>
                </div>
                <div className="w-full sm:w-[160px]">
                  <Label className="text-xs text-gray-500 mb-1.5 block">Source</Label>
                  <Select value={filterSource || "__all__"} onValueChange={(v) => setFilterSource(v === "__all__" ? "" : v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="All sources" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="__all__">All sources</SelectItem>
                      {uniqueSources.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-full sm:w-[160px]">
                  <Label className="text-xs text-gray-500 mb-1.5 block">Current step</Label>
                  <Select value={filterStep || "__all__"} onValueChange={(v) => setFilterStep(v === "__all__" ? "" : v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="All steps" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="__all__">All steps</SelectItem>
                      {uniqueSteps.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-full sm:w-[140px]">
                  <Label className="text-xs text-gray-500 mb-1.5 block">Referral</Label>
                  <Select value={filterReferral} onValueChange={(v) => setFilterReferral(v as "all" | "yes" | "no")}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="yes">Referrals only</SelectItem>
                      <SelectItem value="no">Non-referrals</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 justify-between border-t border-gray-100 pt-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Button size="sm" onClick={() => setAddLeadOpen(true)}>
                    <Plus className="w-4 h-4" />
                    Add lead
                  </Button>
                  <Button type="button" variant="outline" size="sm" onClick={exportGridCsv} disabled={processedLeads.length === 0}>
                    <Download className="w-4 h-4" />
                    Export CSV
                  </Button>
                  <div className="flex rounded-lg border border-gray-200 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setLeadView("grid")}
                      className={`px-3 py-1.5 text-sm ${leadView === "grid" ? "bg-sv-blue/10 text-sv-blue font-medium" : "text-gray-600 hover:bg-gray-50"}`}
                    >
                      <LayoutGrid className="w-4 h-4 inline mr-1.5 align-middle" />
                      Table
                    </button>
                    <button
                      type="button"
                      onClick={() => setLeadView("grouped")}
                      className={`px-3 py-1.5 text-sm border-l border-gray-200 ${leadView === "grouped" ? "bg-sv-blue/10 text-sv-blue font-medium" : "text-gray-600 hover:bg-gray-50"}`}
                    >
                      <Layers className="w-4 h-4 inline mr-1.5 align-middle" />
                      Grouped
                    </button>
                  </div>
                  {leadView === "grouped" && (
                    <Select value={groupByField} onValueChange={setGroupByField}>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Group by" />
                      </SelectTrigger>
                      <SelectContent>
                        {GROUP_BY_OPTIONS.map((opt) => (
                          <SelectItem key={opt.id} value={opt.id}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Settings2 className="w-4 h-4" />
                      Columns
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="end" className="w-56 max-h-80 overflow-y-auto">
                    <p className="text-sm font-medium mb-3">Visible columns</p>
                    <div className="space-y-2">
                      {fieldConfig.fields.map((f) => (
                        <label key={f.dbName} className="flex items-center gap-2 cursor-pointer text-sm">
                          <Checkbox
                            checked={f.visible}
                            onCheckedChange={(checked) => {
                              const next = fieldConfig.fields.map((x) =>
                                x.dbName === f.dbName ? { ...x, visible: !!checked } : x
                              );
                              setFieldConfig({ fields: next });
                              saveLeadFieldsConfig({ fields: next });
                            }}
                          />
                          {f.displayName}
                        </label>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-3 pt-2 border-t">
                      <Link href="/client-portal#leads-config" className="text-sv-blue hover:underline">
                        Configure fields & display names
                      </Link>
                    </p>
                  </PopoverContent>
                </Popover>
              </div>
              <p className="text-xs text-gray-500">
                Showing <span className="font-medium text-gray-700">{processedLeads.length}</span> of{" "}
                <span className="font-medium text-gray-700">{leads.length}</span> leads
                {searchQuery.trim() || filterSource || filterStep || filterReferral !== "all" ? " (filters active)" : ""}.
                Leads are saved in this browser.
              </p>
            </div>

            {leads.length === 0 ? (
              <p className="text-sm text-gray-500 py-6 rounded-xl border border-dashed border-gray-200 bg-white px-6">
                No leads yet. Use <strong>Import</strong> or <strong>Generate</strong>, or click <strong>Add lead</strong>.
              </p>
            ) : processedLeads.length === 0 ? (
              <p className="text-sm text-amber-800 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
                No leads match your search or filters. Clear filters or broaden your search.
              </p>
            ) : leadView === "grid" ? (
              renderLeadsTable(processedLeads, true)
            ) : (
              <div className="space-y-2">
                {(() => {
                  const groups = new Map<string, Lead[]>();
                  for (const lead of processedLeads) {
                    const key = getGroupKey(lead, groupByField);
                    if (!groups.has(key)) groups.set(key, []);
                    groups.get(key)!.push(lead);
                  }
                  const sortedG = Array.from(groups.entries()).sort(([a], [b]) => a.localeCompare(b));
                  return sortedG.map(([key, items]) => (
                    <Collapsible key={key || "blank"}>
                      <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-left text-sm font-medium hover:bg-gray-100 gap-2">
                        <span className="truncate min-w-0">{key || "(blank)"}</span>
                        <span className="text-gray-500 shrink-0">
                          {items.length} lead{items.length !== 1 ? "s" : ""}
                        </span>
                        <ChevronDown className="w-4 h-4 shrink-0 transition-transform [[data-state=open]_&]:rotate-180" />
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="mt-2">{renderLeadsTable(items, false)}</div>
                      </CollapsibleContent>
                    </Collapsible>
                  ));
                })()}
              </div>
            )}
          </div>
        )}

        {activeLeadTab === "generate" && (
          <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-5">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-sv-blue" />
              Generate leads
            </h3>
            <p className="text-sm text-gray-500">
              Tune list size and quality, then optionally add demo rows to your grid. Profile job, role, and industry improve
              targeting labels. File export ({leadOutputType}) can be wired when backend generation is connected.
            </p>
            <div className="text-sm text-gray-700 space-y-1">
              {(profileJob || profileRole || profileIndustry) && (
                <p>
                  <span className="font-medium">Profile context:</span>{" "}
                  {[profileJob, profileRole, profileIndustry].filter(Boolean).join(" · ")}
                </p>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Number of leads</label>
                <select
                  value={leadQuantity}
                  onChange={(e) => setLeadQuantity(Number(e.target.value))}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm bg-white"
                >
                  {LEAD_QUANTITY_OPTIONS.map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quality</label>
                <select
                  value={leadQuality}
                  onChange={(e) => setLeadQuality(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm bg-white"
                >
                  {LEAD_QUALITY_OPTIONS.map((q) => (
                    <option key={q} value={q}>
                      {q}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vetting</label>
                <select
                  value={leadVetted}
                  onChange={(e) => setLeadVetted(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm bg-white"
                >
                  {LEAD_VETTED_OPTIONS.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Output type</label>
                <select
                  value={leadOutputType}
                  onChange={(e) => setLeadOutputType(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm bg-white"
                >
                  {LEAD_OUTPUT_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lead type</label>
                <select
                  value={genLeadType}
                  onChange={(e) => setGenLeadType(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm bg-white"
                >
                  <option value="B2B">B2B</option>
                  <option value="B2C">B2C</option>
                  <option value="Mixed">Mixed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Data freshness (days)</label>
                <select
                  value={genDataFreshness}
                  onChange={(e) => setGenDataFreshness(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm bg-white"
                >
                  <option value="30">Last 30 days</option>
                  <option value="90">Last 90 days</option>
                  <option value="365">Last 12 months</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                <Input value={genLanguage} onChange={(e) => setGenLanguage(e.target.value)} placeholder="English" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Geography / markets</label>
                <Input
                  value={genGeography}
                  onChange={(e) => setGenGeography(e.target.value)}
                  placeholder="e.g. US Southeast, DACH, Ontario…"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Industry / vertical focus</label>
                <Input
                  value={genIndustryFocus}
                  onChange={(e) => setGenIndustryFocus(e.target.value)}
                  placeholder="Overrides profile industry when set"
                />
              </div>
            </div>
            <div className="flex flex-col gap-3 border-t border-gray-100 pt-4">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <Checkbox checked={genExcludeExistingEmails} onCheckedChange={(c) => setGenExcludeExistingEmails(!!c)} />
                <span>Exclude emails already in the grid (by generated pattern)</span>
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <Checkbox checked={genAddToGrid} onCheckedChange={(c) => setGenAddToGrid(!!c)} />
                <span>Add generated demo leads to the Grid (safe sample data)</span>
              </label>
              {genAddToGrid && (
                <label className="flex items-center gap-2 text-sm cursor-pointer pl-6">
                  <Checkbox checked={genClearBeforeAdd} onCheckedChange={(c) => setGenClearBeforeAdd(!!c)} />
                  <span>Replace all existing leads before adding (destructive)</span>
                </label>
              )}
            </div>
            <button
              type="button"
              onClick={handleGenerateLeads}
              disabled={isGenerating}
              className="flex items-center gap-2 px-5 py-2.5 text-sm sv-neo-btn sv-neo-btn--blue font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Sparkles className="w-4 h-4" />
              {isGenerating ? "Generating…" : "Generate"}
            </button>
          </div>
        )}

        {activeLeadTab === "import" && (
          <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-5">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <Upload className="w-5 h-5 text-sv-blue" />
              Import CSV
            </h3>
            <p className="text-sm text-gray-500">
              Use UTF-8 encoded CSV. Headers are matched case-insensitively; spaces become underscores (e.g.{" "}
              <code className="text-xs bg-gray-100 px-1 rounded">Initial Capture Date</code> →{" "}
              <code className="text-xs bg-gray-100 px-1 rounded">initial_capture_date</code>). See template for full column set.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <p className="font-medium text-gray-800">Import mode</p>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="importMode"
                    checked={importMode === "append"}
                    onChange={() => setImportMode("append")}
                    className="text-sv-blue"
                  />
                  Append to existing leads
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="importMode"
                    checked={importMode === "replace"}
                    onChange={() => setImportMode("replace")}
                    className="text-sv-blue"
                  />
                  Replace all leads with this file
                </label>
              </div>
              <div className="space-y-2">
                <p className="font-medium text-gray-800">Validation</p>
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox checked={importSkipDuplicates} onCheckedChange={(c) => setImportSkipDuplicates(!!c)} />
                  Skip rows with duplicate email (vs existing + within file)
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox checked={importValidateEmails} onCheckedChange={(c) => setImportValidateEmails(!!c)} />
                  Require valid email format (skip invalid rows)
                </label>
              </div>
            </div>
            {lastImportHeaders && lastImportHeaders.length > 0 && (
              <div className="rounded-lg bg-gray-50 border border-gray-100 px-4 py-3 text-xs text-gray-600">
                <p className="font-medium text-gray-800 mb-1">Last file — detected columns</p>
                <p className="break-all">{lastImportHeaders.join(", ")}</p>
              </div>
            )}
            <div
              onDrop={onDrop}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                isDragging ? "border-sv-blue bg-sv-blue/5" : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFile(file);
                  e.target.value = "";
                }}
              />
              <FileSpreadsheet className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-sm font-medium text-gray-700 mb-2">
                Drag and drop your CSV here, or{" "}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-sv-blue hover:text-sv-blue-light font-medium"
                >
                  browse to upload
                </button>
              </p>
              <p className="text-xs text-gray-500">Maximum file size: 10MB. UTF-8 recommended.</p>
            </div>
            {importError && <p className="text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg">{importError}</p>}
            {importedCount !== null && !importError && (
              <div className="text-sm text-green-800 bg-green-50 border border-green-100 px-4 py-2 rounded-lg space-y-1">
                <p>
                  Imported <strong>{importedCount}</strong> lead{importedCount !== 1 ? "s" : ""}.
                </p>
                {(importSkippedDup > 0 || importSkippedInvalid > 0) && (
                  <p className="text-green-900/90">
                    Skipped {importSkippedDup} duplicate(s), {importSkippedInvalid} invalid email row(s).
                  </p>
                )}
              </div>
            )}
            <button
              type="button"
              onClick={downloadTemplate}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-sv-blue hover:text-sv-blue-light transition-colors"
            >
              <Download className="w-4 h-4" />
              Download CSV template
            </button>
          </div>
        )}

        {activeLeadTab === "crm" && (
          <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-5">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-sv-blue" />
              CRM sync
            </h3>
            <p className="text-sm text-gray-500">
              Choose direction, scope, and conflict behavior. Field mapping usually mirrors your visible lead columns plus CRM
              standard fields (contact, company, deal). Connect the real integration under{" "}
              <strong>Integrations</strong> when available.
            </p>
            {crmLastSync && (
              <p className="text-xs text-gray-600 bg-gray-50 border border-gray-100 rounded-lg px-3 py-2">
                Last recorded sync: <span className="font-medium">{new Date(crmLastSync).toLocaleString()}</span>
              </p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">CRM</label>
                <select
                  value={crmProvider}
                  onChange={(e) => setCrmProvider(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white"
                >
                  <option value="">Select CRM…</option>
                  <option value="hubspot">HubSpot</option>
                  <option value="pipedrive">Pipedrive</option>
                  <option value="salesforce">Salesforce</option>
                  <option value="zoho">Zoho CRM</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Direction</label>
                <select
                  value={crmSyncDirection}
                  onChange={(e) => setCrmSyncDirection(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white"
                >
                  <option value="push">Push portal → CRM</option>
                  <option value="pull">Pull CRM → portal</option>
                  <option value="both">Two-way (preview)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Scope</label>
                <select
                  value={crmScope}
                  onChange={(e) => setCrmScope(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white"
                >
                  <option value="all">All leads in grid</option>
                  <option value="filtered">Current grid filters only</option>
                  <option value="newSinceLast">New / changed since last sync (demo)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">On conflict</label>
                <select
                  value={crmConflict}
                  onChange={(e) => setCrmConflict(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white"
                >
                  <option value="crm">CRM wins</option>
                  <option value="portal">Portal wins</option>
                  <option value="newest">Newest updated wins</option>
                  <option value="manual">Queue for manual review</option>
                </select>
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <Checkbox checked={crmDedupe} onCheckedChange={(c) => setCrmDedupe(!!c)} />
              <span>Deduplicate by email when pushing</span>
            </label>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                disabled={crmSyncBusy}
                onClick={handleCrmSync}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-sv-blue hover:text-sv-blue-light border border-sv-blue rounded-lg transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${crmSyncBusy ? "animate-spin" : ""}`} />
                {crmSyncBusy ? "Syncing…" : "Sync now (demo)"}
              </button>
              {onNavigateToSection && (
                <Button type="button" variant="outline" size="sm" onClick={() => onNavigateToSection("integrations")}>
                  <Plug2 className="w-4 h-4" />
                  Integrations
                </Button>
              )}
            </div>
            {crmSyncNote && <p className="text-sm text-gray-700 bg-sv-blue/5 border border-sv-blue/15 rounded-lg px-4 py-3">{crmSyncNote}</p>}
            <p className="text-xs text-gray-500">
              Tip: Align custom fields in{" "}
              <Link href="/client-portal#leads-config" className="text-sv-blue hover:underline">
                Leads field configuration
              </Link>{" "}
              before turning on production sync.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

const SOCIAL_PLATFORMS = [
  { id: "facebook", label: "Facebook", placeholder: "https://facebook.com/yourpage", iconSlug: "facebook" },
  { id: "instagram", label: "Instagram", placeholder: "https://instagram.com/yourhandle", iconSlug: "instagram" },
  { id: "linkedin", label: "LinkedIn", placeholder: "https://linkedin.com/in/yourprofile", iconSlug: "linkedin" },
  { id: "google", label: "Google Business", placeholder: "https://business.google.com/your-listing", iconSlug: "google" },
  { id: "x", label: "X (Twitter)", placeholder: "https://x.com/yourhandle", iconSlug: "x" },
  { id: "youtube", label: "YouTube", placeholder: "https://youtube.com/@yourchannel", iconSlug: "youtube" },
  { id: "tiktok", label: "TikTok", placeholder: "https://tiktok.com/@yourhandle", iconSlug: "tiktok" },
  { id: "pinterest", label: "Pinterest", placeholder: "https://pinterest.com/yourprofile", iconSlug: "pinterest" },
  { id: "threads", label: "Threads", placeholder: "https://threads.net/@yourhandle", iconSlug: "threads" },
  { id: "snapchat", label: "Snapchat", placeholder: "https://snapchat.com/add/yourhandle", iconSlug: "snapchat" },
  { id: "reddit", label: "Reddit", placeholder: "https://reddit.com/user/yourhandle", iconSlug: "reddit" },
  { id: "website", label: "Website", placeholder: "https://yoursite.com", iconSlug: "link" },
] as const;

const INDUSTRY_OPTIONS = [
  "Health Insurance",
  "Real Estate",
  "Travel Agent",
  "Life Insurance",
  "Home Financing",
  "Auto Insurance",
  "Mortgage & Lending",
  "Financial Services",
  "Wealth Management",
  "Recruitment & Staffing",
  "Consulting",
  "Legal",
  "Other",
] as const;

const JOB_OPTIONS = [
  "Insurance Agent",
  "Real Estate Agent",
  "Travel Agent",
  "Mortgage Broker",
  "Financial Advisor",
  "Wealth Advisor",
  "Recruiter",
  "Consultant",
  "Sales Representative",
  "Account Executive",
  "Business Owner",
  "Other",
] as const;

const ROLE_OPTIONS = [
  "Agent",
  "Broker",
  "Advisor",
  "Consultant",
  "Specialist",
  "Manager",
  "Team Lead",
  "Owner",
  "Account Executive",
  "Sales Rep",
  "Other",
] as const;

type SocialId = (typeof SOCIAL_PLATFORMS)[number]["id"];

type AddedProfile = { id: string; platformId: SocialId; url: string };

function SocialLogo({ platformId, className = "w-5 h-5" }: { platformId: SocialId; className?: string }) {
  const platform = SOCIAL_PLATFORMS.find((p) => p.id === platformId);
  const slug = platform?.iconSlug ?? "link";
  return (
    <img
      src={`https://cdn.simpleicons.org/${slug}`}
      alt={platform?.label ?? ""}
      className={className}
      aria-hidden
    />
  );
}

type ProfileSectionId = "personal" | "social-marketing" | "security" | "account";

const profileSections: {
  id: ProfileSectionId;
  label: string;
  shortLabel: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    id: "personal",
    label: "Personal information",
    shortLabel: "Personal",
    description: "Name, contact details, and professional role used across the portal and lead workflows.",
    icon: User,
  },
  {
    id: "social-marketing",
    label: "Social & marketing",
    shortLabel: "Social",
    description: "Linked social profiles for campaigns, automations, and client-facing touchpoints.",
    icon: Share2,
  },
  {
    id: "security",
    label: "Security",
    shortLabel: "Security",
    description: "Sign-in security, alerts, and how we protect your portal access.",
    icon: Shield,
  },
  {
    id: "account",
    label: "Account",
    shortLabel: "Account",
    description: "Notifications, language, data export, and account options.",
    icon: Settings2,
  },
];

function ProfileContent({
  industry,
  setIndustry,
  job,
  setJob,
  role,
  setRole,
}: {
  industry: string;
  setIndustry: (v: string) => void;
  job: string;
  setJob: (v: string) => void;
  role: string;
  setRole: (v: string) => void;
}) {
  const [activeProfileSection, setActiveProfileSection] = useState<ProfileSectionId>("personal");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [addedProfiles, setAddedProfiles] = useState<AddedProfile[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState<SocialId>("facebook");
  const [urlInput, setUrlInput] = useState("");
  const [savedFeedback, setSavedFeedback] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [sessionAlertEmail, setSessionAlertEmail] = useState(true);
  const [emailProductUpdates, setEmailProductUpdates] = useState(true);
  const [emailMarketing, setEmailMarketing] = useState(false);
  const [preferredLanguage, setPreferredLanguage] = useState("en-US");
  const [mergeError, setMergeError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.profile);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.fullName) setFullName(parsed.fullName);
        if (parsed.email) setEmail(parsed.email);
        if (parsed.phone) setPhone(parsed.phone);
        if (parsed.industry) setIndustry(parsed.industry);
        if (parsed.job) setJob(parsed.job);
        if (parsed.role) setRole(parsed.role);
        if (Array.isArray(parsed.socialProfiles)) setAddedProfiles(parsed.socialProfiles);
        if (typeof parsed.twoFactorEnabled === "boolean") setTwoFactorEnabled(parsed.twoFactorEnabled);
        if (typeof parsed.sessionAlertEmail === "boolean") setSessionAlertEmail(parsed.sessionAlertEmail);
        if (typeof parsed.emailProductUpdates === "boolean") setEmailProductUpdates(parsed.emailProductUpdates);
        if (typeof parsed.emailMarketing === "boolean") setEmailMarketing(parsed.emailMarketing);
        if (typeof parsed.preferredLanguage === "string") setPreferredLanguage(parsed.preferredLanguage);
      }
    } catch {}
  }, [setIndustry, setJob, setRole]);

  const isValidEmail = (v: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
  const isValidPhone = (v: string) => {
    const digits = v.replace(/\D/g, "");
    return digits.length >= 10;
  };

  const requiredFields = [
    { key: "fullName", value: fullName, label: "Full name" },
    { key: "email", value: email, label: "Email" },
    { key: "phone", value: phone, label: "Phone number" },
    { key: "industry", value: industry, label: "Industry" },
    { key: "job", value: job, label: "Job" },
    { key: "role", value: role, label: "Role" },
  ] as const;
  const missingFields = requiredFields.filter((f) => !(f.value && String(f.value).trim()));
  const formatErrors: string[] = [];
  if (fullName.trim().length > 0 && fullName.trim().length < 2) formatErrors.push("Full name must be at least 2 characters");
  if (email.trim() && !isValidEmail(email)) formatErrors.push("Email must be a valid address (e.g. you@example.com)");
  if (phone.trim() && !isValidPhone(phone)) formatErrors.push("Phone must have at least 10 digits");
  const allErrors = [
    ...missingFields.map((f) => f.label),
    ...formatErrors,
  ];
  const isComplete = missingFields.length === 0 && formatErrors.length === 0;

  const persistProfileMerge = (patch: Record<string, unknown>) => {
    try {
      setMergeError(null);
      const raw = localStorage.getItem(STORAGE_KEYS.profile);
      const prev = raw ? (JSON.parse(raw) as Record<string, unknown>) : {};
      const merged = { ...prev, ...patch };
      localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(merged));
      setSavedFeedback(true);
      setTimeout(() => setSavedFeedback(false), 2000);
    } catch {
      setMergeError("Could not save. Please try again.");
    }
  };

  const handleSaveProfile = () => {
    if (!isComplete) {
      setValidationErrors(allErrors);
      return;
    }
    setValidationErrors([]);
    setMergeError(null);
    const data = {
      fullName,
      email,
      phone,
      industry,
      job,
      role,
      socialProfiles: addedProfiles,
      twoFactorEnabled,
      sessionAlertEmail,
      emailProductUpdates,
      emailMarketing,
      preferredLanguage,
    };
    localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(data));
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 2000);
  };

  const handleSaveSocialProfiles = () => {
    setValidationErrors([]);
    persistProfileMerge({ socialProfiles: addedProfiles });
  };

  const handleSaveSecurityAccount = () => {
    setValidationErrors([]);
    persistProfileMerge({
      twoFactorEnabled,
      sessionAlertEmail,
      emailProductUpdates,
      emailMarketing,
      preferredLanguage,
    });
  };

  const addProfile = () => {
    const url = urlInput.trim();
    if (!url || addedProfiles.some((p) => p.platformId === selectedPlatform)) return;
    setAddedProfiles((prev) => [
      ...prev,
      { id: crypto.randomUUID(), platformId: selectedPlatform, url },
    ]);
    setUrlInput("");
    const nextAvailable = SOCIAL_PLATFORMS.filter(
      (p) => p.id !== selectedPlatform && !addedProfiles.some((a) => a.platformId === p.id)
    );
    setSelectedPlatform((nextAvailable[0]?.id ?? selectedPlatform) as SocialId);
  };

  const removeProfile = (id: string) => {
    setAddedProfiles((prev) => prev.filter((p) => p.id !== id));
  };

  const addedPlatformIds = new Set(addedProfiles.map((p) => p.platformId));
  const availablePlatforms = SOCIAL_PLATFORMS.filter((p) => !addedPlatformIds.has(p.id));

  const sectionMeta = profileSections.find((s) => s.id === activeProfileSection);

  const ProfileSubNav = (
    <>
      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-1 mb-2">
        Profile
      </p>
      <div className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-1 lg:pb-0 -mx-1 px-1 lg:mx-0 lg:px-0">
        {profileSections.map((sec) => {
          const Icon = sec.icon;
          return (
            <button
              key={sec.id}
              type="button"
              onClick={() => {
                setActiveProfileSection(sec.id);
                setValidationErrors([]);
                setMergeError(null);
              }}
              className={`flex items-center gap-2.5 w-full min-w-[max-content] lg:min-w-0 text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap lg:whitespace-normal ${
                activeProfileSection === sec.id
                  ? "bg-sv-blue/10 text-sv-blue"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0 opacity-80" />
              <span className="lg:hidden">{sec.shortLabel}</span>
              <span className="hidden lg:inline">{sec.label}</span>
            </button>
          );
        })}
      </div>
    </>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-0 lg:items-start">
      <aside className="w-full lg:w-56 shrink-0 lg:border-r lg:border-gray-200 lg:pr-5 lg:mr-6 lg:min-h-[calc(100vh-6rem)]">
        {ProfileSubNav}
      </aside>

      <div className="flex-1 min-w-0 max-w-3xl">
        <nav
          className="hidden sm:flex flex-wrap items-center gap-1 text-xs text-gray-400 mb-3"
          aria-label="Profile section"
        >
          <span>Profile</span>
          <ChevronRight className="w-3 h-3 shrink-0" />
          <span className="text-gray-600">{sectionMeta?.label}</span>
        </nav>

        <h1 className="font-[Sora] text-2xl font-bold text-gray-900 mb-2">Profile</h1>
        <p className="text-gray-600 mb-2">{sectionMeta?.description}</p>

        {mergeError && (
          <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-800 mb-4">
            {mergeError}
          </div>
        )}

        {activeProfileSection === "personal" && (
          <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-4 mt-4">
            <h3 className="font-semibold text-gray-900">Personal information</h3>
            {validationErrors.length > 0 && (
              <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-800">
                <span className="font-medium">
                  {missingFields.length > 0 ? "Please fill in all required fields" : "Please fix the following"}:{" "}
                </span>
                {validationErrors.join(", ")}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Your name"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  setValidationErrors([]);
                }}
                required
                className={`w-full px-4 py-2 rounded-lg border text-sm ${!fullName.trim() && validationErrors.length > 0 ? "border-red-300" : "border-gray-200"}`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setValidationErrors([]);
                }}
                required
                className={`w-full px-4 py-2 rounded-lg border text-sm ${(!email.trim() || !isValidEmail(email)) && validationErrors.length > 0 ? "border-red-300" : "border-gray-200"}`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setValidationErrors([]);
                }}
                required
                className={`w-full px-4 py-2 rounded-lg border text-sm ${(!phone.trim() || !isValidPhone(phone)) && validationErrors.length > 0 ? "border-red-300" : "border-gray-200"}`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Industry <span className="text-red-500">*</span>
              </label>
              <select
                value={industry}
                onChange={(e) => {
                  setIndustry(e.target.value);
                  setValidationErrors([]);
                }}
                required
                className={`w-full px-4 py-2 rounded-lg border text-sm bg-white ${!industry && validationErrors.length > 0 ? "border-red-300" : "border-gray-200"}`}
              >
                <option value="">Select your industry</option>
                {INDUSTRY_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job <span className="text-red-500">*</span>
              </label>
              <select
                value={job}
                onChange={(e) => {
                  setJob(e.target.value);
                  setValidationErrors([]);
                }}
                required
                className={`w-full px-4 py-2 rounded-lg border text-sm bg-white ${!job && validationErrors.length > 0 ? "border-red-300" : "border-gray-200"}`}
              >
                <option value="">Select your job</option>
                {JOB_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role <span className="text-red-500">*</span>
              </label>
              <select
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                  setValidationErrors([]);
                }}
                required
                className={`w-full px-4 py-2 rounded-lg border text-sm bg-white ${!role && validationErrors.length > 0 ? "border-red-300" : "border-gray-200"}`}
              >
                <option value="">Select your role</option>
                {ROLE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleSaveProfile}
                disabled={!isComplete}
                className="flex items-center gap-2 px-5 py-2.5 text-sm sv-neo-btn sv-neo-btn--blue font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
                Save personal info
              </button>
              {savedFeedback && activeProfileSection === "personal" && (
                <span className="flex items-center gap-1.5 text-sm text-emerald-600">
                  <CheckCircle2 className="w-4 h-4" />
                  Saved
                </span>
              )}
            </div>
          </div>
        )}

        {activeProfileSection === "social-marketing" && (
          <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-5 mt-4">
            <h3 className="font-semibold text-gray-900">Social & marketing</h3>
            <p className="text-sm text-gray-500">
              Add your social profiles to connect with clients and support your marketing and sales efforts.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 min-w-0">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Choose platform</label>
                <select
                  value={selectedPlatform}
                  onChange={(e) => setSelectedPlatform(e.target.value as SocialId)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm bg-white"
                >
                  {availablePlatforms.length > 0 ? (
                    availablePlatforms.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.label}
                      </option>
                    ))
                  ) : (
                    <option value="">All platforms added</option>
                  )}
                </select>
              </div>
              <div className="flex-1 min-w-0">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">URL</label>
                <input
                  type="url"
                  placeholder={
                    SOCIAL_PLATFORMS.find((p) => p.id === selectedPlatform)?.placeholder ?? "https://..."
                  }
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={addProfile}
              disabled={!urlInput.trim() || availablePlatforms.length === 0}
              className="flex items-center gap-2 px-5 py-2.5 text-sm sv-neo-btn sv-neo-btn--blue font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-4 h-4" />
              Add profile
            </button>

            <div className="pt-4 border-t border-gray-100">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Your profiles</h4>
              {addedProfiles.length === 0 ? (
                <p className="text-sm text-gray-500 py-4">No profiles added yet. Choose a platform and URL above.</p>
              ) : (
                <ul className="space-y-2">
                  {addedProfiles.map((profile) => {
                    const platform = SOCIAL_PLATFORMS.find((p) => p.id === profile.platformId);
                    return (
                      <li
                        key={profile.id}
                        className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100"
                      >
                        <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center shrink-0 overflow-hidden">
                          <SocialLogo platformId={profile.platformId} className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">{platform?.label ?? profile.platformId}</p>
                          <a
                            href={profile.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-sv-blue hover:underline truncate block"
                          >
                            {profile.url}
                          </a>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeProfile(profile.id)}
                          className="text-sm text-red-600 hover:text-red-700 font-medium shrink-0"
                        >
                          Remove
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
              <button
                type="button"
                onClick={handleSaveSocialProfiles}
                className="flex items-center gap-2 px-5 py-2.5 text-sm sv-neo-btn sv-neo-btn--blue font-semibold rounded-xl"
              >
                <Save className="w-4 h-4" />
                Save social profiles
              </button>
              {savedFeedback && activeProfileSection === "social-marketing" && (
                <span className="flex items-center gap-1.5 text-sm text-emerald-600">
                  <CheckCircle2 className="w-4 h-4" />
                  Saved
                </span>
              )}
            </div>
          </div>
        )}

        {activeProfileSection === "security" && (
          <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-6 mt-4">
            <h3 className="font-semibold text-gray-900">Security</h3>
            <p className="text-sm text-gray-500">
              Portal sign-in uses your email and password or a linked provider. Full password change and device
              management will connect to your auth backend when enabled.
            </p>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="grid sm:grid-cols-2 gap-3 opacity-60 pointer-events-none">
                <input
                  type="password"
                  placeholder="Current password"
                  disabled
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm bg-gray-50"
                />
                <input
                  type="password"
                  placeholder="New password"
                  disabled
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm bg-gray-50"
                />
              </div>
              <p className="text-xs text-gray-500">Password updates are disabled in bypass / mock mode.</p>
            </div>

            <div className="flex items-start gap-3 rounded-lg border border-gray-100 bg-gray-50/80 p-4">
              <Checkbox
                id="two-factor"
                checked={twoFactorEnabled}
                onCheckedChange={(c) => setTwoFactorEnabled(c === true)}
              />
              <div className="space-y-1">
                <label htmlFor="two-factor" className="text-sm font-medium text-gray-900 cursor-pointer">
                  Two-factor authentication (2FA)
                </label>
                <p className="text-xs text-gray-500">
                  Require a second step at sign-in. Preference is stored locally until your identity provider supports
                  it.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg border border-gray-100 bg-gray-50/80 p-4">
              <Checkbox
                id="session-alerts"
                checked={sessionAlertEmail}
                onCheckedChange={(c) => setSessionAlertEmail(c === true)}
              />
              <div className="space-y-1">
                <label htmlFor="session-alerts" className="text-sm font-medium text-gray-900 cursor-pointer">
                  Email me when a new device signs in
                </label>
                <p className="text-xs text-gray-500">Security alerts for unrecognized browsers or locations.</p>
              </div>
            </div>

            <div className="rounded-lg border border-dashed border-gray-200 p-4">
              <p className="text-sm font-medium text-gray-900 mb-1">Active sessions</p>
              <p className="text-xs text-gray-500">
                Session list and “Sign out everywhere” will appear here when connected to your auth service.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleSaveSecurityAccount}
                className="flex items-center gap-2 px-5 py-2.5 text-sm sv-neo-btn sv-neo-btn--blue font-semibold rounded-xl"
              >
                <Save className="w-4 h-4" />
                Save security settings
              </button>
              {savedFeedback && activeProfileSection === "security" && (
                <span className="flex items-center gap-1.5 text-sm text-emerald-600">
                  <CheckCircle2 className="w-4 h-4" />
                  Saved
                </span>
              )}
            </div>
          </div>
        )}

        {activeProfileSection === "account" && (
          <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-6 mt-4">
            <h3 className="font-semibold text-gray-900">Account</h3>
            <p className="text-sm text-gray-500">
              Control how we communicate with you and manage your account data.
            </p>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Language & region</label>
              <select
                value={preferredLanguage}
                onChange={(e) => setPreferredLanguage(e.target.value)}
                className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-200 text-sm bg-white"
              >
                <option value="en-US">English (United States)</option>
                <option value="en-GB">English (United Kingdom)</option>
                <option value="es-US">Español (US)</option>
                <option value="fr-CA">Français (Canada)</option>
              </select>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="email-product"
                  checked={emailProductUpdates}
                  onCheckedChange={(c) => setEmailProductUpdates(c === true)}
                />
                <div>
                  <label htmlFor="email-product" className="text-sm font-medium text-gray-900 cursor-pointer">
                    Product & portal updates
                  </label>
                  <p className="text-xs text-gray-500">Important changes to workflows, billing, and the client portal.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Checkbox
                  id="email-marketing"
                  checked={emailMarketing}
                  onCheckedChange={(c) => setEmailMarketing(c === true)}
                />
                <div>
                  <label htmlFor="email-marketing" className="text-sm font-medium text-gray-900 cursor-pointer">
                    Tips & marketing
                  </label>
                  <p className="text-xs text-gray-500">Best practices, feature ideas, and occasional promotional email.</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-gray-100 bg-gray-50/80 p-4 space-y-3">
              <p className="text-sm font-medium text-gray-900">Your data</p>
              <p className="text-xs text-gray-500">
                Request an export of profile, leads, and workflow settings stored for your account (subject to backend
                availability).
              </p>
              <Button type="button" variant="outline" size="sm" disabled className="text-xs">
                <Download className="w-3.5 h-3.5 mr-1.5" />
                Download my data (coming soon)
              </Button>
            </div>

            <div className="rounded-lg border border-red-100 bg-red-50/40 p-4 space-y-2">
              <p className="text-sm font-medium text-red-900">Delete account</p>
              <p className="text-xs text-red-800/80">
                Permanently remove your portal access and schedule deletion of associated data. This cannot be undone.
              </p>
              <Button type="button" variant="outline" size="sm" disabled className="text-xs border-red-200 text-red-800 hover:bg-red-50">
                Delete account (contact support)
              </Button>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleSaveSecurityAccount}
                className="flex items-center gap-2 px-5 py-2.5 text-sm sv-neo-btn sv-neo-btn--blue font-semibold rounded-xl"
              >
                <Save className="w-4 h-4" />
                Save account preferences
              </button>
              {savedFeedback && activeProfileSection === "account" && (
                <span className="flex items-center gap-1.5 text-sm text-emerald-600">
                  <CheckCircle2 className="w-4 h-4" />
                  Saved
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

type TimeSlotBlock = {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
};

function formatDateMMDDYYYY(dateStr: string): string {
  const d = new Date(dateStr + "T12:00:00");
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const y = d.getFullYear();
  return `${m}/${day}/${y}`;
}

function formatDuration(startTime: string, endTime: string): string {
  const [sh, sm] = startTime.split(":").map(Number);
  const [eh, em] = endTime.split(":").map(Number);
  let mins = eh * 60 + em - (sh * 60 + sm);
  if (mins < 0) mins += 24 * 60;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h === 0) return `${m} min`;
  if (m === 0) return `${h} hr${h !== 1 ? "s" : ""}`;
  return `${h} hr${h !== 1 ? "s" : ""} ${m} min`;
}

function formatTime(t: string): string {
  const [h, m] = t.split(":");
  const hr = parseInt(h, 10);
  const ampm = hr >= 12 ? "PM" : "AM";
  const h12 = hr % 12 || 12;
  return `${h12}:${m} ${ampm}`;
}

function dateToYYYYMMDD(d: Date): string {
  return d.toISOString().split("T")[0];
}

type BookingCalendarConfig = { sourceIds: string[]; defaultId?: string };

type BookingAppointment = {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  notes?: string;
};

type BookingSubSectionId = "calendar" | "settings" | "timeSlots" | "crmCalendars";

const bookingSubSections: {
  id: BookingSubSectionId;
  label: string;
  shortLabel: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    id: "calendar",
    label: "Calendar",
    shortLabel: "Calendar",
    description: "Month view of appointments and events; add bookings and see how they line up with your slots.",
    icon: CalendarDays,
  },
  {
    id: "settings",
    label: "Settings",
    shortLabel: "Settings",
    description: "Defaults for meeting length, buffers, and time zone — used when you share links and suggest times.",
    icon: Settings2,
  },
  {
    id: "timeSlots",
    label: "Time slots",
    shortLabel: "Slots",
    description: "Slots you’re actively seeking to fill — not passive availability.",
    icon: Clock,
  },
  {
    id: "crmCalendars",
    label: "CRM & calendars",
    shortLabel: "CRM",
    description:
      "Which calendars feed availability, scheduling links, CRM sync, and future calendar↔CRM automations.",
    icon: Database,
  },
];

function loadBookingAppointments(): BookingAppointment[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.bookingAppointments);
    if (!raw) return [];
    const list = JSON.parse(raw) as unknown;
    if (!Array.isArray(list)) return [];
    return list
      .filter((x): x is Record<string, unknown> => x !== null && typeof x === "object")
      .map((x) => ({
        id: String(x.id ?? crypto.randomUUID()),
        title: String(x.title ?? "Appointment"),
        date: String(x.date ?? ""),
        startTime: String(x.startTime ?? "09:00"),
        endTime: String(x.endTime ?? "10:00"),
        notes: x.notes ? String(x.notes) : undefined,
      }))
      .filter((a) => a.date.length > 0);
  } catch {
    return [];
  }
}

function saveBookingAppointments(next: BookingAppointment[]) {
  localStorage.setItem(STORAGE_KEYS.bookingAppointments, JSON.stringify(next));
}

function BookingsContent({ onNavigateToSection }: { onNavigateToSection?: (section: SectionId) => void }) {
  const [calendarConfig, setCalendarConfig] = useState<BookingCalendarConfig>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.bookingsCalendarConfig);
      if (raw) {
        const parsed = JSON.parse(raw);
        return {
          sourceIds: Array.isArray(parsed?.sourceIds) ? parsed.sourceIds : [],
          defaultId: typeof parsed?.defaultId === "string" ? parsed.defaultId : undefined,
        };
      }
    } catch {}
    return { sourceIds: [], defaultId: undefined };
  });
  const [connectedCalendars, setConnectedCalendars] = useState<{ id: string; label: string }[]>([]);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.integrations);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      const list = Array.isArray(parsed) ? parsed : [];
      const calendarIds = new Set<string>(CALENDAR_APPS.map((c) => c.id));
      const connected = list
        .filter((i: { integrationId: string }) => calendarIds.has(i.integrationId))
        .map((i: { integrationId: string }) => ({
          id: i.integrationId,
          label: CALENDAR_APPS.find((c) => c.id === i.integrationId)?.label ?? i.integrationId,
        }));
      setConnectedCalendars(connected);
    } catch {}
  }, []);
  const saveCalendarConfig = (next: BookingCalendarConfig) => {
    setCalendarConfig(next);
    localStorage.setItem(STORAGE_KEYS.bookingsCalendarConfig, JSON.stringify(next));
  };
  const toggleCalendarSource = (id: string) => {
    const nextIds = calendarConfig.sourceIds.includes(id)
      ? calendarConfig.sourceIds.filter((x) => x !== id)
      : [...calendarConfig.sourceIds, id];
    const nextDefault = calendarConfig.defaultId === id ? undefined : calendarConfig.defaultId;
    saveCalendarConfig({ ...calendarConfig, sourceIds: nextIds, defaultId: nextIds.includes(nextDefault ?? "") ? nextDefault : (nextIds[0] ?? undefined) });
  };
  const setDefaultCalendar = (id: string) => {
    saveCalendarConfig({ ...calendarConfig, defaultId: id });
  };
  const [blocks, setBlocks] = useState<TimeSlotBlock[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.bookings);
      if (raw) {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
      }
    } catch {}
    return [];
  });
  const [view, setView] = useState<"list" | "calendar">("list");
  const [calendarMonth, setCalendarMonth] = useState<Date>(() => new Date());
  const [form, setForm] = useState({
    date: "",
    startTime: "09:00",
    endTime: "17:00",
  });
  const [savedFeedback, setSavedFeedback] = useState(false);
  const [activeBookingTab, setActiveBookingTab] = useState<BookingSubSectionId>("calendar");
  const [appointments, setAppointments] = useState<BookingAppointment[]>(() => loadBookingAppointments());
  const [calendarMonthMain, setCalendarMonthMain] = useState<Date>(() => new Date());
  const [calendarSelectedDate, setCalendarSelectedDate] = useState<Date | undefined>(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  });
  const [apptDialogOpen, setApptDialogOpen] = useState(false);
  const [apptForm, setApptForm] = useState({
    title: "",
    date: "",
    startTime: "09:00",
    endTime: "10:00",
    notes: "",
  });
  const [defaultDurationMin, setDefaultDurationMin] = useState(60);
  const [bookingBufferMin, setBookingBufferMin] = useState(15);
  const [bookingTimezone, setBookingTimezone] = useState(
    () => Intl.DateTimeFormat().resolvedOptions().timeZone || "America/New_York"
  );

  const handleSaveAvailability = () => {
    localStorage.setItem(STORAGE_KEYS.bookings, JSON.stringify(blocks));
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 2000);
  };

  const addBlock = () => {
    if (!form.date || !form.startTime || !form.endTime) return;
    const [sh, sm] = form.startTime.split(":").map(Number);
    const [eh, em] = form.endTime.split(":").map(Number);
    const startMins = sh * 60 + sm;
    const endMins = eh * 60 + em;
    if (endMins <= startMins) return;
    setBlocks((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        date: form.date,
        startTime: form.startTime,
        endTime: form.endTime,
      },
    ]);
    setForm({ ...form, date: "" });
  };

  const removeBlock = (id: string) => {
    setBlocks((prev) => prev.filter((b) => b.id !== id));
  };

  const datesWithSlots = new Set(blocks.map((b) => b.date));
  const datesWithAppointments = new Set(appointments.map((a) => a.date));
  const selectedYmd = calendarSelectedDate ? dateToYYYYMMDD(calendarSelectedDate) : null;
  const dayAppointments = selectedYmd ? appointments.filter((a) => a.date === selectedYmd) : [];
  const daySlots = selectedYmd ? blocks.filter((b) => b.date === selectedYmd) : [];

  const openAddAppointmentDialog = (presetDate?: string) => {
    const d = presetDate ?? selectedYmd ?? "";
    setApptForm({
      title: "",
      date: d,
      startTime: "09:00",
      endTime: "10:00",
      notes: "",
    });
    setApptDialogOpen(true);
  };

  const addAppointmentSubmit = () => {
    if (!apptForm.title.trim() || !apptForm.date) return;
    const [sh, sm] = apptForm.startTime.split(":").map(Number);
    const [eh, em] = apptForm.endTime.split(":").map(Number);
    if (eh * 60 + em <= sh * 60 + sm) return;
    const next: BookingAppointment[] = [
      ...appointments,
      {
        id: crypto.randomUUID(),
        title: apptForm.title.trim(),
        date: apptForm.date,
        startTime: apptForm.startTime,
        endTime: apptForm.endTime,
        notes: apptForm.notes.trim() || undefined,
      },
    ];
    setAppointments(next);
    saveBookingAppointments(next);
    setApptDialogOpen(false);
    setApptForm({ title: "", date: "", startTime: "09:00", endTime: "10:00", notes: "" });
  };

  const removeAppointment = (id: string) => {
    const next = appointments.filter((a) => a.id !== id);
    setAppointments(next);
    saveBookingAppointments(next);
  };

  const bookingSectionMeta = bookingSubSections.find((s) => s.id === activeBookingTab);

  const BookingSubNav = (
    <>
      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-1 mb-2">
        Booking
      </p>
      <div className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-1 lg:pb-0 -mx-1 px-1 lg:mx-0 lg:px-0">
        {bookingSubSections.map((sec) => {
          const Icon = sec.icon;
          return (
            <button
              key={sec.id}
              type="button"
              onClick={() => setActiveBookingTab(sec.id)}
              className={`flex items-center gap-2.5 w-full min-w-[max-content] lg:min-w-0 text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap lg:whitespace-normal ${
                activeBookingTab === sec.id
                  ? "bg-sv-blue/10 text-sv-blue"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0 opacity-80" />
              <span className="lg:hidden">{sec.shortLabel}</span>
              <span className="hidden lg:inline">{sec.label}</span>
            </button>
          );
        })}
      </div>
    </>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-0 lg:items-start">
      <aside className="w-full lg:w-56 shrink-0 lg:border-r lg:border-gray-200 lg:pr-5 lg:mr-6 lg:min-h-[calc(100vh-6rem)]">
        {BookingSubNav}
      </aside>

      <div className="flex-1 min-w-0 max-w-4xl">
        <nav className="hidden sm:flex flex-wrap items-center gap-1 text-xs text-gray-400 mb-3" aria-hidden>
          <span>Booking</span>
          <ChevronRight className="w-3 h-3 shrink-0" />
          <span className="text-gray-600">{bookingSectionMeta?.label}</span>
        </nav>
        <h1 className="font-[Sora] text-2xl font-bold text-gray-900 mb-2">Booking</h1>
        <p className="text-gray-600 mb-6 max-w-2xl">{bookingSectionMeta?.description}</p>

        {activeBookingTab === "calendar" && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600">
              <span className="inline-flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm bg-violet-300 ring-2 ring-violet-400" aria-hidden />
                Appointment / event
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm bg-sv-blue/25 ring-2 ring-sv-blue/40" aria-hidden />
                Open time slot
              </span>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-start">
              <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
                <Calendar
                  mode="single"
                  month={calendarMonthMain}
                  onMonthChange={setCalendarMonthMain}
                  selected={calendarSelectedDate}
                  onSelect={(d) => setCalendarSelectedDate(d ?? undefined)}
                  modifiers={{
                    hasSlots: (d) => datesWithSlots.has(dateToYYYYMMDD(d)),
                    hasAppt: (d) => datesWithAppointments.has(dateToYYYYMMDD(d)),
                  }}
                  modifiersClassNames={{
                    hasSlots: "bg-sv-blue/15 text-sv-blue font-medium ring-2 ring-sv-blue/35",
                    hasAppt: "bg-violet-200/90 text-violet-900 font-semibold ring-2 ring-violet-400",
                  }}
                />
              </div>

              <div className="flex-1 min-w-0 space-y-4 w-full">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="font-semibold text-gray-900">
                    {calendarSelectedDate && selectedYmd
                      ? formatDateMMDDYYYY(selectedYmd)
                      : "Select a date"}
                  </h2>
                  <Button type="button" size="sm" onClick={() => openAddAppointmentDialog()}>
                    <Plus className="w-4 h-4 mr-1.5" />
                    Add event
                  </Button>
                </div>

                {calendarSelectedDate ? (
                  <>
                    <div>
                      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                        Appointments & events
                      </h3>
                      {dayAppointments.length === 0 ? (
                        <p className="text-sm text-gray-500 py-2">Nothing scheduled this day.</p>
                      ) : (
                        <ul className="space-y-2">
                          {dayAppointments.map((a) => (
                            <li
                              key={a.id}
                              className="flex items-start justify-between gap-3 p-3 rounded-lg border border-violet-100 bg-violet-50/50"
                            >
                              <div className="min-w-0">
                                <p className="font-medium text-gray-900 text-sm">{a.title}</p>
                                <p className="text-xs text-gray-600 mt-0.5">
                                  {formatTime(a.startTime)} – {formatTime(a.endTime)} (
                                  {formatDuration(a.startTime, a.endTime)})
                                </p>
                                {a.notes ? (
                                  <p className="text-xs text-gray-500 mt-1 whitespace-pre-wrap">{a.notes}</p>
                                ) : null}
                              </div>
                              <button
                                type="button"
                                onClick={() => removeAppointment(a.id)}
                                className="text-xs text-red-600 hover:text-red-700 font-medium shrink-0"
                              >
                                Remove
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                        Open slots (seeking bookings)
                      </h3>
                      {daySlots.length === 0 ? (
                        <p className="text-sm text-gray-500 py-2">No open slots on this day.</p>
                      ) : (
                        <ul className="space-y-2">
                          {daySlots.map((b) => (
                            <li
                              key={b.id}
                              className="p-3 rounded-lg border border-sv-blue/20 bg-sv-blue/5 text-sm text-gray-800"
                            >
                              {formatTime(b.startTime)} – {formatTime(b.endTime)} (
                              {formatDuration(b.startTime, b.endTime)})
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-gray-500">Choose a day on the calendar to see details.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {activeBookingTab === "settings" && (
          <div className="max-w-4xl space-y-6">
            <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-4">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-sv-blue" />
                Scheduling defaults
              </h3>
              <p className="text-sm text-gray-500">Used when generating links and suggested meeting lengths.</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Default meeting length</label>
                  <select
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white"
                    value={defaultDurationMin}
                    onChange={(e) => setDefaultDurationMin(Number(e.target.value))}
                  >
                    <option value={15}>15 min</option>
                    <option value={30}>30 min</option>
                    <option value={60}>60 min</option>
                    <option value={90}>90 min</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Buffer between meetings</label>
                  <select
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white"
                    value={bookingBufferMin}
                    onChange={(e) => setBookingBufferMin(Number(e.target.value))}
                  >
                    <option value={0}>None</option>
                    <option value={5}>5 min</option>
                    <option value={10}>10 min</option>
                    <option value={15}>15 min</option>
                    <option value={30}>30 min</option>
                  </select>
                </div>
                <div className="sm:col-span-2 lg:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time zone</label>
                  <Input
                    value={bookingTimezone}
                    onChange={(e) => setBookingTimezone(e.target.value)}
                    placeholder="e.g. America/New_York"
                    className="text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeBookingTab === "crmCalendars" && (
          <div className="max-w-4xl space-y-6">
            <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-5">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-sv-blue" />
                Calendar sources
              </h3>
              <p className="text-sm text-gray-500">
                Select which connected calendars feed availability and pick a default. Connect apps in Integrations
                first.
              </p>
              {connectedCalendars.length === 0 ? (
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 rounded-lg bg-gray-50 border border-gray-100">
                  <p className="text-sm text-gray-600">No calendar apps connected yet.</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onNavigateToSection?.("integrations")}
                    className="shrink-0"
                  >
                    <Plug2 className="w-4 h-4 mr-1.5" />
                    Connect calendars
                  </Button>
                </div>
              ) : (
                <ul className="space-y-3">
                  {connectedCalendars.map((cal) => {
                    const isSelected = calendarConfig.sourceIds.includes(cal.id);
                    const isDefault = calendarConfig.defaultId === cal.id;
                    return (
                      <li
                        key={cal.id}
                        className="flex items-center justify-between gap-3 p-3 rounded-lg border border-gray-200 bg-gray-50/50"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <Checkbox
                            id={`cal-crm-${cal.id}`}
                            checked={isSelected}
                            onCheckedChange={() => toggleCalendarSource(cal.id)}
                          />
                          <label
                            htmlFor={`cal-crm-${cal.id}`}
                            className="text-sm font-medium text-gray-900 cursor-pointer truncate"
                          >
                            {cal.label}
                          </label>
                          {isSelected && (
                            <Button
                              variant={isDefault ? "secondary" : "ghost"}
                              size="sm"
                              className="h-7 text-xs"
                              onClick={() => setDefaultCalendar(cal.id)}
                            >
                              {isDefault ? "Default" : "Set as default"}
                            </Button>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-4">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <Link2 className="w-5 h-5 text-sv-blue" />
                Appointment scheduling
              </h3>
              <p className="text-sm text-gray-500">
                Send scheduling links manually when needed — not an automated workflow.
              </p>
              <div className="flex flex-wrap gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Scheduling tool</label>
                  <select
                    className="px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white w-full min-w-[180px]"
                    value={calendarConfig.defaultId ?? (calendarConfig.sourceIds[0] ?? "")}
                    onChange={(e) => {
                      const id = e.target.value;
                      if (id) {
                        setDefaultCalendar(id);
                        if (!calendarConfig.sourceIds.includes(id)) toggleCalendarSource(id);
                      }
                    }}
                  >
                    <option value="">Select calendar...</option>
                    {(calendarConfig.sourceIds.length > 0
                      ? calendarConfig.sourceIds
                      : connectedCalendars.map((c) => c.id)
                    ).map((sid) => {
                      const cal =
                        connectedCalendars.find((c) => c.id === sid) ??
                        CALENDAR_APPS.find((c) => c.id === sid) ?? { id: sid, label: sid };
                      return (
                        <option key={cal.id} value={cal.id}>
                          {cal.label}
                          {calendarConfig.defaultId === cal.id ? " (default)" : ""}
                        </option>
                      );
                    })}
                  </select>
                  {connectedCalendars.length === 0 && (
                    <p className="text-xs text-gray-500 mt-1">Connect calendars in Integrations first.</p>
                  )}
                  {connectedCalendars.length > 0 && calendarConfig.sourceIds.length === 0 && (
                    <p className="text-xs text-amber-600 mt-1">Select at least one calendar source in the list above.</p>
                  )}
                </div>
              </div>
              <button
                type="button"
                className="flex items-center gap-2 px-4 py-2.5 text-sm sv-neo-btn sv-neo-btn--blue font-medium rounded-xl"
              >
                <Link2 className="w-4 h-4" />
                Open scheduling link
              </button>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-4">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-sv-blue" />
                CRM sync
              </h3>
              <p className="text-sm text-gray-500">
                Sync bookings and meetings to your CRM when integrations are connected.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <select className="px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white min-w-[160px]">
                  <option>Select CRM...</option>
                  <option>HubSpot</option>
                  <option>Pipedrive</option>
                  <option>Salesforce</option>
                </select>
                <Button type="button" variant="outline" size="sm" className="gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Sync now
                </Button>
                <Button type="button" variant="ghost" size="sm" onClick={() => onNavigateToSection?.("integrations")}>
                  Manage integrations
                </Button>
              </div>
            </div>

            <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50/50 p-6 space-y-4">
              <h3 className="font-semibold text-gray-900 text-sm">More calendar ↔ CRM (coming soon)</h3>
              <p className="text-xs text-gray-500">
                Placeholders for features we can wire when your stack is connected: push confirmed meetings as CRM
                activities, create or update contacts from invitees, and two-way busy/free sync.
              </p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="flex items-center gap-2">
                  <Checkbox disabled id="soon-activities" />
                  <label htmlFor="soon-activities" className="text-gray-500">
                    Log calendar events as CRM activities / tasks
                  </label>
                </li>
                <li className="flex items-center gap-2">
                  <Checkbox disabled id="soon-contacts" />
                  <label htmlFor="soon-contacts" className="text-gray-500">
                    Auto-create or link contacts from meeting guests
                  </label>
                </li>
                <li className="flex items-center gap-2">
                  <Checkbox disabled id="soon-bidirectional" />
                  <label htmlFor="soon-bidirectional" className="text-gray-500">
                    Bidirectional free/busy with CRM-owned holds
                  </label>
                </li>
              </ul>
            </div>
          </div>
        )}

        {activeBookingTab === "timeSlots" && (
          <div className="max-w-4xl space-y-6">
            <div className="rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-900">
              <strong>Note:</strong> These are time slots you&apos;re pursuing to fill — not passive availability.
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-5">
              <h3 className="font-semibold text-gray-900">Add time slot</h3>
              <p className="text-sm text-gray-500">
                Choose a date and start/end time for a slot you want booked.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        className={`w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-left bg-white hover:border-gray-300 transition-colors ${!form.date ? "text-gray-400" : ""}`}
                      >
                        {form.date ? formatDateMMDDYYYY(form.date) : "Pick a date"}
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={form.date ? new Date(form.date + "T12:00:00") : undefined}
                        onSelect={(d) => {
                          if (d) setForm({ ...form, date: dateToYYYYMMDD(d) });
                        }}
                        disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start time</label>
                  <input
                    type="time"
                    value={form.startTime}
                    onChange={(e) => setForm({ ...form, startTime: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End time</label>
                  <input
                    type="time"
                    value={form.endTime}
                    onChange={(e) => setForm({ ...form, endTime: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={addBlock}
                disabled={!form.date}
                className="px-5 py-2.5 text-sm sv-neo-btn sv-neo-btn--blue font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add time slot
              </button>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <h3 className="font-semibold text-gray-900">Your time slots</h3>
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={handleSaveAvailability}
                    disabled={blocks.length === 0}
                    className="flex items-center gap-1.5 px-4 py-2 text-sm sv-neo-btn sv-neo-btn--blue font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save className="w-4 h-4" />
                    Save availability
                  </button>
                  {savedFeedback && (
                    <span className="flex items-center gap-1 text-sm text-emerald-600">
                      <CheckCircle2 className="w-4 h-4" />
                      Saved
                    </span>
                  )}
                  <div className="flex rounded-lg border border-gray-200 p-0.5 bg-gray-100">
                    <button
                      type="button"
                      onClick={() => setView("list")}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                        view === "list" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      <List className="w-4 h-4" />
                      List
                    </button>
                    <button
                      type="button"
                      onClick={() => setView("calendar")}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                        view === "calendar" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      <CalendarDays className="w-4 h-4" />
                      Mini calendar
                    </button>
                  </div>
                </div>
              </div>

              {blocks.length === 0 ? (
                <p className="text-sm text-gray-500 py-8">
                  No time slots yet. Add one above to start pursuing bookings.
                </p>
              ) : view === "list" ? (
                <ul className="space-y-3">
                  {blocks.map((block) => (
                    <li
                      key={block.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-gray-50 border border-gray-100"
                    >
                      <div>
                        <p className="font-medium text-gray-900">{formatDateMMDDYYYY(block.date)}</p>
                        <p className="text-sm text-gray-600">
                          {formatTime(block.startTime)} – {formatTime(block.endTime)}
                          <span className="text-gray-500 ml-1">
                            ({formatDuration(block.startTime, block.endTime)})
                          </span>
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeBlock(block.id)}
                        className="text-sm text-red-600 hover:text-red-700 font-medium"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="pt-2">
                  <Calendar
                    mode="single"
                    month={calendarMonth}
                    onMonthChange={setCalendarMonth}
                    modifiers={{
                      hasSlots: (d) => datesWithSlots.has(dateToYYYYMMDD(d)),
                    }}
                    modifiersClassNames={{
                      hasSlots: "bg-sv-blue/20 text-sv-blue font-medium ring-2 ring-sv-blue/40",
                    }}
                  />
                  <p className="text-xs text-gray-500 mt-3">Dates with time slots are highlighted.</p>
                  <div className="mt-4 space-y-2">
                    {Array.from(datesWithSlots)
                      .sort()
                      .slice(0, 8)
                      .map((d) => (
                        <div key={d} className="text-sm text-gray-600">
                          <strong>{formatDateMMDDYYYY(d)}:</strong>{" "}
                          {blocks
                            .filter((b) => b.date === d)
                            .map((b) => `${formatTime(b.startTime)}–${formatTime(b.endTime)}`)
                            .join(", ")}
                        </div>
                      ))}
                    {datesWithSlots.size > 8 && (
                      <p className="text-xs text-gray-500">+{datesWithSlots.size - 8} more dates with slots</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <Dialog open={apptDialogOpen} onOpenChange={setApptDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add appointment or event</DialogTitle>
            </DialogHeader>
            <div className="space-y-3 py-2">
              <div>
                <Label htmlFor="appt-title">Title</Label>
                <Input
                  id="appt-title"
                  value={apptForm.title}
                  onChange={(e) => setApptForm({ ...apptForm, title: e.target.value })}
                  placeholder="e.g. Discovery call — Acme Corp"
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      className={`mt-1 w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-left bg-white hover:border-gray-300 ${!apptForm.date ? "text-gray-400" : ""}`}
                    >
                      {apptForm.date ? formatDateMMDDYYYY(apptForm.date) : "Pick a date"}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={apptForm.date ? new Date(apptForm.date + "T12:00:00") : undefined}
                      onSelect={(d) => {
                        if (d) setApptForm({ ...apptForm, date: dateToYYYYMMDD(d) });
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="appt-start">Start</Label>
                  <Input
                    id="appt-start"
                    type="time"
                    value={apptForm.startTime}
                    onChange={(e) => setApptForm({ ...apptForm, startTime: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="appt-end">End</Label>
                  <Input
                    id="appt-end"
                    type="time"
                    value={apptForm.endTime}
                    onChange={(e) => setApptForm({ ...apptForm, endTime: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="appt-notes">Notes (optional)</Label>
                <Textarea
                  id="appt-notes"
                  value={apptForm.notes}
                  onChange={(e) => setApptForm({ ...apptForm, notes: e.target.value })}
                  rows={3}
                  className="mt-1 text-sm"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setApptDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="button" onClick={addAppointmentSubmit} disabled={!apptForm.title.trim() || !apptForm.date}>
                Save event
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

/* ===== MARKETING CAMPAIGNS ===== */
const MARKETING_PLATFORMS = [
  { id: "meta", label: "Meta (Facebook & Instagram)", desc: "Ads and organic posts across Meta", icon: Share2, color: "text-blue-600" },
  { id: "linkedin", label: "LinkedIn", desc: "B2B ads and organic content", icon: Users, color: "text-blue-700" },
  { id: "twitter", label: "X (Twitter)", desc: "Tweets and promoted posts", icon: Share2, color: "text-gray-900" },
  { id: "google-ads", label: "Google Ads", desc: "Search and display advertising", icon: Target, color: "text-emerald-600" },
] as const;

type MarketingPlatformId = (typeof MARKETING_PLATFORMS)[number]["id"];

type CampaignConfig = {
  frequency?: string;
  frequencyValue?: number;
  scheduleType?: "continuous" | "scheduled";
  runDays?: string[];
  runTimeStart?: string;
  runTimeEnd?: string;
  timezone?: string;
  objective?: string;
  budgetType?: "daily" | "lifetime";
  budgetAmount?: string;
  aiGenerateCaptions?: boolean;
  aiOptimizeTiming?: boolean;
  aiAbTest?: boolean;
  // Platform-specific
  metaPlacements?: string[];
  linkedinTargeting?: string;
  twitterPostType?: string;
  googleCampaignType?: string;
};

type MarketingCampaign = {
  id: string;
  platformId: MarketingPlatformId;
  name: string;
  config: CampaignConfig;
  createdAt: string;
};

const DAYS_OF_WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const FREQUENCY_OPTIONS = ["1x/day", "2x/day", "3x/day", "1x/week", "2x/week", "3x/week", "5x/week", "Custom"];
const OBJECTIVE_OPTIONS = ["Awareness", "Engagement", "Leads", "Conversions", "Traffic"];
const META_PLACEMENTS = ["Feed", "Stories", "Reels", "Explore", "Messenger"];
const GOOGLE_TYPES = ["Search", "Display", "Performance Max", "YouTube"];

type CampaignSubSectionId = "existing" | "adding";

const campaignSubSections: {
  id: CampaignSubSectionId;
  label: string;
  shortLabel: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    id: "existing",
    label: "Existing",
    shortLabel: "Active",
    description:
      "Campaigns you've configured: review schedule, budget, AI options, save to this browser, or delete.",
    icon: Megaphone,
  },
  {
    id: "adding",
    label: "Adding",
    shortLabel: "Add",
    description:
      "Create a new campaign: pick a platform, name, schedule, budget, and automation. It appears under Existing when saved.",
    icon: Plus,
  },
];

function MarketingCampaignsContent() {
  const [activeCampaignTab, setActiveCampaignTab] = useState<CampaignSubSectionId>("existing");
  const [campaigns, setCampaigns] = useState<MarketingCampaign[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.campaigns);
      if (raw) {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
      }
    } catch {}
    return [];
  });
  const [savedFeedback, setSavedFeedback] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<MarketingPlatformId | "">("");
  const [newCampaignName, setNewCampaignName] = useState("");
  const [newCampaignConfig, setNewCampaignConfig] = useState<CampaignConfig>({});
  const [editingId, setEditingId] = useState<string | null>(null);

  const platform = MARKETING_PLATFORMS.find((p) => p.id === selectedPlatform);

  const addCampaign = () => {
    if (!selectedPlatform || !newCampaignName.trim()) return;
    setCampaigns((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        platformId: selectedPlatform,
        name: newCampaignName.trim(),
        config: { ...newCampaignConfig },
        createdAt: new Date().toISOString(),
      },
    ]);
    setSelectedPlatform("");
    setNewCampaignName("");
    setNewCampaignConfig({});
    setActiveCampaignTab("existing");
  };

  const updateCampaign = (id: string, updates: Partial<MarketingCampaign>) => {
    setCampaigns((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
  };

  const removeCampaign = (id: string) => {
    setCampaigns((prev) => prev.filter((c) => c.id !== id));
    setEditingId(null);
  };

  const toggleDay = (day: string) => {
    const current = newCampaignConfig.runDays ?? [];
    setNewCampaignConfig((prev) => ({
      ...prev,
      runDays: current.includes(day) ? current.filter((d) => d !== day) : [...current, day],
    }));
  };

  const handleSaveCampaigns = () => {
    localStorage.setItem(STORAGE_KEYS.campaigns, JSON.stringify(campaigns));
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 2000);
  };

  const campaignSectionMeta = campaignSubSections.find((s) => s.id === activeCampaignTab);

  const CampaignsSubNav = (
    <>
      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-1 mb-2">Campaigns</p>
      <div className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-1 lg:pb-0 -mx-1 px-1 lg:mx-0 lg:px-0">
        {campaignSubSections.map((sec) => {
          const Icon = sec.icon;
          return (
            <button
              key={sec.id}
              type="button"
              onClick={() => setActiveCampaignTab(sec.id)}
              className={`flex items-center gap-2.5 w-full min-w-[max-content] lg:min-w-0 text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap lg:whitespace-normal ${
                activeCampaignTab === sec.id ? "bg-sv-blue/10 text-sv-blue" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0 opacity-80" />
              <span className="lg:hidden">{sec.shortLabel}</span>
              <span className="hidden lg:inline">{sec.label}</span>
            </button>
          );
        })}
      </div>
    </>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-0 lg:items-start">
      <aside className="w-full lg:w-56 shrink-0 lg:border-r lg:border-gray-200 lg:pr-5 lg:mr-6 lg:min-h-[calc(100vh-6rem)]">
        {CampaignsSubNav}
      </aside>

      <div className="flex-1 min-w-0 max-w-5xl">
        <nav className="hidden sm:flex flex-wrap items-center gap-1 text-xs text-gray-400 mb-3" aria-hidden>
          <span>Campaigns</span>
          <ChevronRight className="w-3 h-3 shrink-0" />
          <span className="text-gray-600">{campaignSectionMeta?.label}</span>
        </nav>
        <h1 className="font-[Sora] text-2xl font-bold text-gray-900 mb-2">Campaigns</h1>
        <p className="text-gray-600 mb-6 max-w-2xl">{campaignSectionMeta?.description}</p>

        {activeCampaignTab === "adding" && (
          <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-6 mb-6">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-sv-blue" />
              New marketing campaign
            </h3>

            <div>
              <Label className="text-sm font-medium text-gray-700">Platform</Label>
              <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2">
                {MARKETING_PLATFORMS.map((p) => {
                  const Icon = p.icon;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelectedPlatform(p.id)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                        selectedPlatform === p.id
                          ? "border-sv-blue bg-sv-blue/5"
                          : "border-gray-200 hover:border-gray-300 bg-white"
                      }`}
                    >
                      <Icon className={`w-6 h-6 ${selectedPlatform === p.id ? "text-sv-blue" : "text-gray-400"}`} />
                      <span className="text-xs font-medium text-gray-900 text-center">{p.label.split(" ")[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {selectedPlatform && (
              <>
                <div>
                  <Label className="text-sm font-medium text-gray-700">Campaign name</Label>
                  <Input
                    value={newCampaignName}
                    onChange={(e) => setNewCampaignName(e.target.value)}
                    placeholder="e.g., Q1 Lead Gen - Meta"
                    className="mt-2"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Posting frequency</Label>
                    <Select
                      value={newCampaignConfig.frequency ?? ""}
                      onValueChange={(v) => setNewCampaignConfig((prev) => ({ ...prev, frequency: v }))}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        {FREQUENCY_OPTIONS.map((opt) => (
                          <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Schedule type</Label>
                    <Select
                      value={newCampaignConfig.scheduleType ?? "continuous"}
                      onValueChange={(v) => setNewCampaignConfig((prev) => ({ ...prev, scheduleType: v as "continuous" | "scheduled" }))}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="continuous">Run continuously</SelectItem>
                        <SelectItem value="scheduled">Specific days & times</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {newCampaignConfig.scheduleType === "scheduled" && (
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-gray-700">Run on days</Label>
                    <div className="flex flex-wrap gap-2">
                      {DAYS_OF_WEEK.map((day) => (
                        <button
                          key={day}
                          type="button"
                          onClick={() => toggleDay(day)}
                          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                            (newCampaignConfig.runDays ?? []).includes(day)
                              ? "bg-sv-blue text-white"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                        >
                          {day}
                        </button>
                      ))}
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs text-gray-500">Start time</Label>
                        <Input
                          type="time"
                          value={newCampaignConfig.runTimeStart ?? "09:00"}
                          onChange={(e) => setNewCampaignConfig((prev) => ({ ...prev, runTimeStart: e.target.value }))}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-gray-500">End time</Label>
                        <Input
                          type="time"
                          value={newCampaignConfig.runTimeEnd ?? "17:00"}
                          onChange={(e) => setNewCampaignConfig((prev) => ({ ...prev, runTimeEnd: e.target.value }))}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <Label className="text-sm font-medium text-gray-700">Timezone</Label>
                  <Select
                    value={newCampaignConfig.timezone ?? "America/New_York"}
                    onValueChange={(v) => setNewCampaignConfig((prev) => ({ ...prev, timezone: v }))}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">Eastern (EST)</SelectItem>
                      <SelectItem value="America/Chicago">Central (CST)</SelectItem>
                      <SelectItem value="America/Denver">Mountain (MST)</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific (PST)</SelectItem>
                      <SelectItem value="UTC">UTC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Campaign objective</Label>
                    <Select
                      value={newCampaignConfig.objective ?? ""}
                      onValueChange={(v) => setNewCampaignConfig((prev) => ({ ...prev, objective: v }))}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select objective" />
                      </SelectTrigger>
                      <SelectContent>
                        {OBJECTIVE_OPTIONS.map((opt) => (
                          <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Budget type</Label>
                    <Select
                      value={newCampaignConfig.budgetType ?? "daily"}
                      onValueChange={(v) => setNewCampaignConfig((prev) => ({ ...prev, budgetType: v as "daily" | "lifetime" }))}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily budget</SelectItem>
                        <SelectItem value="lifetime">Lifetime budget</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">Budget amount ($)</Label>
                  <Input
                    type="number"
                    min="0"
                    step="1"
                    placeholder="e.g., 50"
                    value={newCampaignConfig.budgetAmount ?? ""}
                    onChange={(e) => setNewCampaignConfig((prev) => ({ ...prev, budgetAmount: e.target.value }))}
                    className="mt-2 max-w-[200px]"
                  />
                </div>

                <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-4 space-y-3">
                  <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    AI automation options
                  </h4>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <Checkbox
                        checked={newCampaignConfig.aiGenerateCaptions ?? false}
                        onCheckedChange={(v) => setNewCampaignConfig((prev) => ({ ...prev, aiGenerateCaptions: !!v }))}
                      />
                      <span className="text-sm">AI-generated captions</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <Checkbox
                        checked={newCampaignConfig.aiOptimizeTiming ?? false}
                        onCheckedChange={(v) => setNewCampaignConfig((prev) => ({ ...prev, aiOptimizeTiming: !!v }))}
                      />
                      <span className="text-sm">AI-optimized posting times</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <Checkbox
                        checked={newCampaignConfig.aiAbTest ?? false}
                        onCheckedChange={(v) => setNewCampaignConfig((prev) => ({ ...prev, aiAbTest: !!v }))}
                      />
                      <span className="text-sm">AI A/B test creatives</span>
                    </label>
                  </div>
                </div>

                {selectedPlatform === "meta" && (
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Placements</Label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {META_PLACEMENTS.map((pl) => {
                        const selected = (newCampaignConfig.metaPlacements ?? []).includes(pl);
                        return (
                          <button
                            key={pl}
                            type="button"
                            onClick={() =>
                              setNewCampaignConfig((prev) => ({
                                ...prev,
                                metaPlacements: selected
                                  ? (prev.metaPlacements ?? []).filter((x) => x !== pl)
                                  : [...(prev.metaPlacements ?? []), pl],
                              }))
                            }
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                              selected ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                          >
                            {pl}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {selectedPlatform === "linkedin" && (
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Targeting focus</Label>
                    <Select
                      value={newCampaignConfig.linkedinTargeting ?? ""}
                      onValueChange={(v) => setNewCampaignConfig((prev) => ({ ...prev, linkedinTargeting: v }))}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select targeting" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="job-titles">Job titles & seniority</SelectItem>
                        <SelectItem value="industries">Industries</SelectItem>
                        <SelectItem value="company-size">Company size</SelectItem>
                        <SelectItem value="all">Auto-targeting (AI)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {selectedPlatform === "google-ads" && (
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Campaign type</Label>
                    <Select
                      value={newCampaignConfig.googleCampaignType ?? ""}
                      onValueChange={(v) => setNewCampaignConfig((prev) => ({ ...prev, googleCampaignType: v }))}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {GOOGLE_TYPES.map((t) => (
                          <SelectItem key={t} value={t}>{t}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={addCampaign}
                    disabled={!newCampaignName.trim()}
                    className="sv-neo-btn sv-neo-btn--blue px-5 py-2.5 text-sm font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Create campaign
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveCampaignTab("existing");
                      setSelectedPlatform("");
                      setNewCampaignName("");
                      setNewCampaignConfig({});
                    }}
                    className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
            {campaigns.length > 0 && (
              <button
                type="button"
                onClick={() => setActiveCampaignTab("existing")}
                className="text-sm font-medium text-sv-blue hover:text-sv-blue-light"
              >
                View {campaigns.length} campaign{campaigns.length !== 1 ? "s" : ""} in Existing →
              </button>
            )}
          </div>
        )}

        {activeCampaignTab === "existing" && (
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            {campaigns.length > 0 && (
              <div className="flex flex-wrap gap-2 text-xs text-gray-600 mb-4 pb-4 border-b border-gray-100">
                <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-sv-blue/5 text-sv-blue border border-sv-blue/15">
                  {campaigns.length} campaign{campaigns.length !== 1 ? "s" : ""}
                </span>
              </div>
            )}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <Target className="w-5 h-5 text-gray-500" />
                Your campaigns
              </h3>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setActiveCampaignTab("adding")}
                  className="sv-neo-btn sv-neo-btn--blue flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl"
                >
                  <Plus className="w-4 h-4" />
                  New campaign
                </button>
                <button
                  type="button"
                  onClick={handleSaveCampaigns}
                  disabled={campaigns.length === 0}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm sv-neo-btn sv-neo-btn--blue font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="w-4 h-4" />
                  Save
                </button>
                {savedFeedback && (
                  <span className="flex items-center gap-1 text-sm text-emerald-600">
                    <CheckCircle2 className="w-4 h-4" />
                    Saved
                  </span>
                )}
              </div>
            </div>
          {campaigns.length === 0 ? (
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 py-10 px-4 rounded-lg bg-gray-50 border border-dashed border-gray-200">
              <Megaphone className="w-12 h-12 text-gray-300 shrink-0 mx-auto sm:mx-0" />
              <div className="min-w-0 flex-1 text-center sm:text-left">
                <p className="text-sm text-gray-600">No campaigns yet.</p>
                <p className="text-xs text-gray-500 mt-1">Create one under Adding, then manage it here.</p>
              </div>
              <Button type="button" variant="outline" size="sm" className="shrink-0 mx-auto sm:mx-0" onClick={() => setActiveCampaignTab("adding")}>
                <Plus className="w-4 h-4" />
                Go to Adding
              </Button>
            </div>
          ) : (
            <ul className="space-y-3">
              {campaigns.map((campaign) => {
                const plat = MARKETING_PLATFORMS.find((p) => p.id === campaign.platformId);
                const Icon = plat?.icon ?? Megaphone;
                const isEditing = editingId === campaign.id;
                return (
                  <li key={campaign.id}>
                    <Collapsible open={isEditing} onOpenChange={(open) => setEditingId(open ? campaign.id : null)}>
                      <div className="rounded-lg border border-gray-200 overflow-hidden">
                        <CollapsibleTrigger asChild>
                          <button
                            type="button"
                            className="flex w-full items-center justify-between gap-3 p-4 text-left hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-10 h-10 rounded-lg bg-sv-blue/10 flex items-center justify-center shrink-0">
                                <Icon className="w-5 h-5 text-sv-blue" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">{campaign.name}</p>
                                <p className="text-xs text-gray-500">{plat?.label ?? campaign.platformId}</p>
                                <p className="text-xs text-gray-400 mt-0.5">
                                  {campaign.config.frequency ?? "—"} · {campaign.config.objective ?? "—"} · {campaign.config.budgetAmount ? `$${campaign.config.budgetAmount}/${campaign.config.budgetType ?? "day"}` : "No budget"}
                                </p>
                              </div>
                            </div>
                            <ChevronDown className="w-4 h-4 text-gray-400 shrink-0 transition-transform [[data-state=open]_&]:rotate-180" />
                          </button>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className="border-t border-gray-200 bg-gray-50/50 p-4 space-y-3 text-sm">
                            <div className="grid sm:grid-cols-2 gap-2">
                              <p><span className="text-gray-500">Frequency:</span> {campaign.config.frequency ?? "—"}</p>
                              <p><span className="text-gray-500">Schedule:</span> {campaign.config.scheduleType === "scheduled" ? (campaign.config.runDays ?? []).join(", ") || "—" : "Continuous"}</p>
                              <p><span className="text-gray-500">Objective:</span> {campaign.config.objective ?? "—"}</p>
                              <p><span className="text-gray-500">Budget:</span> {campaign.config.budgetAmount ? `$${campaign.config.budgetAmount} (${campaign.config.budgetType})` : "—"}</p>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                              {campaign.config.aiGenerateCaptions && <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800">AI captions</span>}
                              {campaign.config.aiOptimizeTiming && <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800">AI timing</span>}
                              {campaign.config.aiAbTest && <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800">A/B test</span>}
                            </div>
                            <div className="flex justify-end pt-2">
                              <button
                                type="button"
                                onClick={() => removeCampaign(campaign.id)}
                                className="text-sm text-red-600 hover:text-red-700 font-medium"
                              >
                                Delete campaign
                              </button>
                            </div>
                          </div>
                        </CollapsibleContent>
                      </div>
                    </Collapsible>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        )}
      </div>
    </div>
  );
}

const INTEGRATION_OPTIONS = [
  { id: "google-calendar", label: "Google Calendar", desc: "Sync bookings and availability", iconSlug: "googlecalendar", category: "calendar" as const },
  { id: "calendly", label: "Calendly", desc: "Appointment scheduling", iconSlug: "calendly", category: "calendar" as const },
  { id: "pipedrive", label: "Pipedrive", desc: "CRM and pipeline management", iconSlug: "pipedrive", category: "crm" as const },
  { id: "hubspot", label: "HubSpot", desc: "CRM, marketing, and sales", iconSlug: "hubspot", category: "crm" as const },
  { id: "salesforce", label: "Salesforce", desc: "CRM and customer data", iconSlug: "salesforce", category: "crm" as const },
  { id: "outlook-calendar", label: "Outlook Calendar", desc: "Microsoft 365 calendar sync", iconSlug: "microsoftoutlook", category: "calendar" as const },
  { id: "zoom", label: "Zoom", desc: "Meetings and webinars", iconSlug: "zoom", category: "meetings" as const },
  { id: "zapier", label: "Zapier", desc: "Connect 6,000+ apps", iconSlug: "zapier", category: "automation" as const },
  { id: "stripe", label: "Stripe", desc: "Payments and subscriptions", iconSlug: "stripe", category: "payments" as const },
  { id: "slack", label: "Slack", desc: "Notifications and alerts", iconSlug: "slack", category: "communication" as const },
] as const;

/** Assignable actions per integration category. Based on typical API capabilities of CRM, calendar, comms, etc. */
const INTEGRATION_ACTIONS: Record<string, { id: string; label: string; desc: string }[]> = {
  crm: [
    { id: "sync-leads", label: "Sync new leads to CRM", desc: "Push web form and inbound leads into contacts" },
    { id: "update-contact", label: "Update contact on qualification", desc: "Update lead/contact when AI scores or qualifies" },
    { id: "create-deal", label: "Create deal on qualification", desc: "Auto-create opportunity when lead reaches threshold" },
    { id: "update-deal-stage", label: "Update deal stage", desc: "Move deals between pipeline stages from triggers" },
    { id: "log-activities", label: "Log activities (calls, meetings)", desc: "Record calls, meetings, and tasks to CRM" },
    { id: "sync-notes", label: "Sync notes and comments", desc: "Keep notes in sync across systems" },
    { id: "create-tasks", label: "Create tasks from workflows", desc: "Auto-create follow-up tasks for reps" },
  ],
  calendar: [
    { id: "sync-availability", label: "Sync availability for bookings", desc: "Block time and show real-time availability" },
    { id: "create-events", label: "Create events on booking", desc: "Add calendar events when appointments are booked" },
    { id: "booking-confirmation", label: "Send booking confirmation", desc: "Email confirmation and add-to-calendar" },
    { id: "sync-to-crm", label: "Sync meetings to CRM", desc: "Log scheduled meetings as CRM activities" },
    { id: "remind-before", label: "Send reminder before meeting", desc: "Email or SMS reminder (e.g., 15 min before)" },
  ],
  meetings: [
    { id: "create-meeting-link", label: "Create meeting link for bookings", desc: "Generate Zoom link when booking is made" },
    { id: "join-link-email", label: "Include join link in confirmation", desc: "Add video link to booking confirmations" },
    { id: "record-meetings", label: "Record meetings (if enabled)", desc: "Store recordings for later review" },
  ],
  communication: [
    { id: "notify-new-lead", label: "Notify on new lead", desc: "Post to Slack channel when lead comes in" },
    { id: "notify-deal-stage", label: "Notify on deal stage change", desc: "Alert when deal moves to next stage" },
    { id: "notify-booking", label: "Notify on new booking", desc: "DM or channel post for new appointments" },
    { id: "daily-digest", label: "Daily activity digest", desc: "Summary of leads, deals, bookings" },
  ],
  automation: [
    { id: "trigger-new-lead", label: "Trigger workflow on new lead", desc: "Fire webhook when new lead is captured" },
    { id: "trigger-booking", label: "Trigger on booking created", desc: "Webhook when appointment is booked" },
    { id: "trigger-deal-stage", label: "Trigger on deal stage change", desc: "Webhook when pipeline stage changes" },
    { id: "trigger-qualified", label: "Trigger when lead qualified", desc: "Webhook when lead meets qualification score" },
    { id: "send-to-zap", label: "Send data to Zapier", desc: "Push payload to your Zap for custom automation" },
  ],
  payments: [
    { id: "process-subscription", label: "Process subscription payments", desc: "Charge membership or plan fees" },
    { id: "charge-credits", label: "Charge for credit packs", desc: "One-time charges for add-on credits" },
    { id: "generate-invoice", label: "Generate invoices", desc: "Create and send invoices" },
    { id: "refund-handling", label: "Handle refunds", desc: "Process refunds when requested" },
  ],
};

/** OAuth scopes/permissions each integration requests. Used for auth flow and permission display. */
const INTEGRATION_PERMISSIONS: Record<string, { scope: string; label: string; type: "read" | "write" }[]> = {
  "google-calendar": [
    { scope: "calendar.readonly", label: "Read calendar events", type: "read" },
    { scope: "calendar.events", label: "Create and edit events", type: "write" },
    { scope: "calendar.freebusy", label: "View availability", type: "read" },
  ],
  calendly: [
    { scope: "event_types:read", label: "Read event types", type: "read" },
    { scope: "invitees:read", label: "Read bookings", type: "read" },
    { scope: "invitees:write", label: "Create bookings", type: "write" },
  ],
  pipedrive: [
    { scope: "deals:read", label: "Read deals and pipeline", type: "read" },
    { scope: "deals:write", label: "Create and update deals", type: "write" },
    { scope: "persons:read", label: "Read contacts", type: "read" },
    { scope: "persons:write", label: "Create and update contacts", type: "write" },
    { scope: "activities:read", label: "Read activities", type: "read" },
    { scope: "activities:write", label: "Log activities", type: "write" },
  ],
  hubspot: [
    { scope: "crm.objects.contacts.read", label: "Read contacts", type: "read" },
    { scope: "crm.objects.contacts.write", label: "Create and update contacts", type: "write" },
    { scope: "crm.objects.deals.read", label: "Read deals", type: "read" },
    { scope: "crm.objects.deals.write", label: "Create and update deals", type: "write" },
    { scope: "crm.objects.companies.read", label: "Read companies", type: "read" },
  ],
  salesforce: [
    { scope: "api", label: "Access Salesforce data", type: "read" },
    { scope: "refresh_token", label: "Maintain session", type: "read" },
    { scope: "full", label: "Read and write records", type: "write" },
  ],
  "outlook-calendar": [
    { scope: "Calendars.Read", label: "Read calendar", type: "read" },
    { scope: "Calendars.ReadWrite", label: "Create and edit events", type: "write" },
  ],
  zoom: [
    { scope: "meeting:read", label: "Read meetings", type: "read" },
    { scope: "meeting:write", label: "Create meetings", type: "write" },
  ],
  zapier: [
    { scope: "webhook:receive", label: "Receive webhook triggers", type: "read" },
    { scope: "webhook:send", label: "Send data to Zaps", type: "write" },
  ],
  stripe: [
    { scope: "read_only", label: "Read payment data", type: "read" },
    { scope: "charges:write", label: "Process charges", type: "write" },
    { scope: "customers:write", label: "Manage customers", type: "write" },
  ],
  slack: [
    { scope: "channels:read", label: "Read channel list", type: "read" },
    { scope: "chat:write", label: "Send messages", type: "write" },
    { scope: "users:read", label: "Read user info", type: "read" },
  ],
};

type IntegrationId = (typeof INTEGRATION_OPTIONS)[number]["id"];
type IntegrationCategory = (typeof INTEGRATION_OPTIONS)[number]["category"];

type AddedIntegration = {
  id: string;
  integrationId: IntegrationId;
  connectedAt: string;
  assignedActions: string[];
  connectionStatus: "pending_auth" | "connected";
  connectedAccount?: string; // email or account name after auth
};

type IntegrationSubSectionId = "existing" | "adding";

const integrationSubSections: {
  id: IntegrationSubSectionId;
  label: string;
  shortLabel: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    id: "existing",
    label: "Existing",
    shortLabel: "Active",
    description:
      "Connected integrations: sign in, permissions, which actions each tool handles, save changes, or disconnect.",
    icon: Plug2,
  },
  {
    id: "adding",
    label: "Adding",
    shortLabel: "Add",
    description: "Browse the catalog and add a new integration. It appears under Existing for setup and authorization.",
    icon: Plus,
  },
];

function IntegrationsContent() {
  const [activeIntegrationTab, setActiveIntegrationTab] = useState<IntegrationSubSectionId>("existing");
  const [addedIntegrations, setAddedIntegrations] = useState<AddedIntegration[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.integrations);
      if (raw) {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
      }
    } catch {}
    return [];
  });
  const [selectedIntegration, setSelectedIntegration] = useState<IntegrationId | "">("");
  const [authDialogItem, setAuthDialogItem] = useState<AddedIntegration | null>(null);
  const [savedFeedback, setSavedFeedback] = useState(false);

  const handleSaveIntegrations = () => {
    localStorage.setItem(STORAGE_KEYS.integrations, JSON.stringify(addedIntegrations));
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 2000);
  };

  const addIntegration = () => {
    if (!selectedIntegration) return;
    if (addedIntegrations.some((i) => i.integrationId === selectedIntegration)) return;
    setAddedIntegrations((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        integrationId: selectedIntegration,
        connectedAt: new Date().toISOString(),
        assignedActions: [],
        connectionStatus: "pending_auth" as const,
      },
    ]);
    setSelectedIntegration("");
    setActiveIntegrationTab("existing");
  };

  const setConnectionStatus = (itemId: string, status: "pending_auth" | "connected", account?: string) => {
    setAddedIntegrations((prev) =>
      prev.map((i) =>
        i.id === itemId ? { ...i, connectionStatus: status, connectedAccount: account } : i
      )
    );
  };

  const removeIntegration = (id: string) => {
    setAddedIntegrations((prev) => prev.filter((i) => i.id !== id));
  };

  const addedIds = new Set(addedIntegrations.map((i) => i.integrationId));
  const availableOptions = INTEGRATION_OPTIONS.filter((o) => !addedIds.has(o.id));

  const integrationSectionMeta = integrationSubSections.find((s) => s.id === activeIntegrationTab);
  const connectedCount = addedIntegrations.filter((i) => i.connectionStatus === "connected").length;
  const pendingAuthCount = addedIntegrations.filter((i) => i.connectionStatus === "pending_auth").length;

  const IntegrationsSubNav = (
    <>
      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-1 mb-2">Integrations</p>
      <div className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-1 lg:pb-0 -mx-1 px-1 lg:mx-0 lg:px-0">
        {integrationSubSections.map((sec) => {
          const Icon = sec.icon;
          return (
            <button
              key={sec.id}
              type="button"
              onClick={() => setActiveIntegrationTab(sec.id)}
              className={`flex items-center gap-2.5 w-full min-w-[max-content] lg:min-w-0 text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap lg:whitespace-normal ${
                activeIntegrationTab === sec.id ? "bg-sv-blue/10 text-sv-blue" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0 opacity-80" />
              <span className="lg:hidden">{sec.shortLabel}</span>
              <span className="hidden lg:inline">{sec.label}</span>
            </button>
          );
        })}
      </div>
    </>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-0 lg:items-start">
      <aside className="w-full lg:w-56 shrink-0 lg:border-r lg:border-gray-200 lg:pr-5 lg:mr-6 lg:min-h-[calc(100vh-6rem)]">
        {IntegrationsSubNav}
      </aside>

      <div className="flex-1 min-w-0 max-w-5xl">
        <nav className="hidden sm:flex flex-wrap items-center gap-1 text-xs text-gray-400 mb-3" aria-hidden>
          <span>Integrations</span>
          <ChevronRight className="w-3 h-3 shrink-0" />
          <span className="text-gray-600">{integrationSectionMeta?.label}</span>
        </nav>
        <h1 className="font-[Sora] text-2xl font-bold text-gray-900 mb-2">Integrations</h1>
        <p className="text-gray-600 mb-6 max-w-2xl">{integrationSectionMeta?.description}</p>

        {activeIntegrationTab === "adding" && (
          <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-5 mb-6">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <Plus className="w-5 h-5 text-sv-blue" />
              Add integration
            </h3>
            <p className="text-sm text-gray-500">
              Choose a tool from the catalog. After you add it, open <strong>Existing</strong> to authorize and assign actions.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 min-w-0">
                <label className="block text-sm font-medium text-gray-700 mb-2">Select integration</label>
                <select
                  value={selectedIntegration}
                  onChange={(e) => setSelectedIntegration(e.target.value as IntegrationId | "")}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm bg-white"
                >
                  <option value="">Choose an integration...</option>
                  {availableOptions.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.label} — {opt.desc}
                    </option>
                  ))}
                  {availableOptions.length === 0 && <option value="">All integrations added</option>}
                </select>
              </div>
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={addIntegration}
                  disabled={!selectedIntegration}
                  className="flex items-center gap-2 px-5 py-2.5 text-sm sv-neo-btn sv-neo-btn--blue font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>
            </div>
            {availableOptions.length === 0 && addedIntegrations.length > 0 && (
              <p className="text-sm text-gray-600 bg-gray-50 border border-gray-100 rounded-lg px-4 py-3">
                Every catalog integration is on your account. Manage them under <strong>Existing</strong>, or remove one there to
                free a slot for a different tool.
              </p>
            )}
            {addedIntegrations.length > 0 && (
              <button
                type="button"
                onClick={() => setActiveIntegrationTab("existing")}
                className="text-sm font-medium text-sv-blue hover:text-sv-blue-light"
              >
                View {addedIntegrations.length} integration{addedIntegrations.length !== 1 ? "s" : ""} in Existing →
              </button>
            )}
          </div>
        )}

        {activeIntegrationTab === "existing" && (
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            {addedIntegrations.length > 0 && (
              <div className="flex flex-wrap gap-2 text-xs text-gray-600 mb-4 pb-4 border-b border-gray-100">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-green-50 text-green-800 border border-green-100">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {connectedCount} connected
                </span>
                {pendingAuthCount > 0 && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-900 border border-amber-100">
                    {pendingAuthCount} need authorization
                  </span>
                )}
                <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-gray-50 border border-gray-100">
                  {addedIntegrations.length} total
                </span>
              </div>
            )}
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <Plug2 className="w-5 h-5 text-gray-500" />
                Connected integrations
              </h3>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleSaveIntegrations}
                disabled={addedIntegrations.length === 0}
                className="flex items-center gap-1.5 px-4 py-2 text-sm sv-neo-btn sv-neo-btn--blue font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
                Save
              </button>
              {savedFeedback && (
                <span className="flex items-center gap-1 text-sm text-emerald-600">
                  <CheckCircle2 className="w-4 h-4" />
                  Saved
                </span>
              )}
            </div>
          </div>
          {addedIntegrations.length === 0 ? (
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-lg bg-gray-50 border border-gray-100">
              <Plug2 className="w-5 h-5 text-gray-400 shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-sm text-gray-600">No integrations yet.</p>
                <p className="text-xs text-gray-500 mt-1">Add a tool from the catalog, then return here to authorize and assign actions.</p>
              </div>
              <Button type="button" variant="outline" size="sm" className="shrink-0" onClick={() => setActiveIntegrationTab("adding")}>
                <Plus className="w-4 h-4" />
                Go to Adding
              </Button>
            </div>
          ) : (
            <ul className="space-y-3">
              {addedIntegrations.map((item) => {
                const opt = INTEGRATION_OPTIONS.find((o) => o.id === item.integrationId);
                const category = opt?.category ?? "crm";
                const actions = INTEGRATION_ACTIONS[category] ?? [];
                const assignedSet = new Set(item.assignedActions ?? []);

                const toggleAction = (actionId: string) => {
                  setAddedIntegrations((prev) =>
                    prev.map((i) =>
                      i.id === item.id
                        ? {
                            ...i,
                            assignedActions: assignedSet.has(actionId)
                              ? (i.assignedActions ?? []).filter((a) => a !== actionId)
                              : [...(i.assignedActions ?? []), actionId],
                          }
                        : i
                    )
                  );
                };

                return (
                  <li key={item.id}>
                    <Collapsible>
                      <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
                        <CollapsibleTrigger asChild>
                          <button
                            type="button"
                            className="flex w-full items-center justify-between gap-3 p-4 text-left hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-10 h-10 rounded-lg bg-sv-blue/10 border border-sv-blue/20 flex items-center justify-center shrink-0">
                                <Plug2 className="w-5 h-5 text-sv-blue" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-medium text-gray-900">{opt?.label ?? item.integrationId}</p>
                                <p className="text-xs text-gray-500 truncate">{opt?.desc ?? ""}</p>
                                <p className="text-xs text-gray-400 mt-0.5">
                                  Added {new Date(item.connectedAt).toLocaleDateString()}
                                  {(item.assignedActions ?? []).length > 0 && (
                                    <span className="ml-2 text-sv-blue font-medium">
                                      · {(item.assignedActions ?? []).length} action(s) assigned
                                    </span>
                                  )}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              {item.connectionStatus === "connected" ? (
                                <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700 font-medium">
                                  Connected
                                </span>
                              ) : (
                                <span className="text-xs px-2 py-1 rounded bg-amber-100 text-amber-700 font-medium">
                                  Needs auth
                                </span>
                              )}
                              <ChevronDown className="w-4 h-4 text-gray-400 transition-transform [[data-state=open]_&]:rotate-180" />
                            </div>
                          </button>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className="border-t border-gray-200 bg-gray-50/80 p-4 space-y-4">
                            {/* Authentication section */}
                            <div className="rounded-lg border border-gray-200 bg-white p-4 space-y-3">
                              <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                                <Lock className="w-4 h-4 text-gray-500" />
                                Authentication & permissions
                              </h4>
                              {item.connectionStatus === "connected" ? (
                                <div>
                                  <p className="text-sm text-gray-600 mb-2">
                                    Connected as <span className="font-medium text-gray-900">{item.connectedAccount ?? "your account"}</span>
                                  </p>
                                  <p className="text-xs text-gray-500 mb-2">Granted permissions:</p>
                                  <ul className="space-y-1">
                                    {(INTEGRATION_PERMISSIONS[item.integrationId] ?? []).map((perm) => (
                                      <li key={perm.scope} className="text-xs flex items-center gap-2">
                                        <span className={`w-1.5 h-1.5 rounded-full ${perm.type === "read" ? "bg-blue-500" : "bg-emerald-500"}`} />
                                        {perm.label} <span className="text-gray-400">({perm.type})</span>
                                      </li>
                                    ))}
                                  </ul>
                                  <button
                                    type="button"
                                    onClick={() => setAuthDialogItem(item)}
                                    className="mt-2 text-xs text-sv-blue hover:text-sv-blue-light font-medium"
                                  >
                                    Reconnect or change account
                                  </button>
                                </div>
                              ) : (
                                <div>
                                  <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-3">
                                    Sign in and grant permissions to sync data with this integration.
                                  </p>
                                  <p className="text-xs text-gray-500 mb-2">This integration will request:</p>
                                  <ul className="space-y-1 mb-4">
                                    {(INTEGRATION_PERMISSIONS[item.integrationId] ?? []).map((perm) => (
                                      <li key={perm.scope} className="text-xs flex items-center gap-2">
                                        <span className={`w-1.5 h-1.5 rounded-full ${perm.type === "read" ? "bg-blue-500" : "bg-emerald-500"}`} />
                                        {perm.label} <span className="text-gray-400">({perm.type})</span>
                                      </li>
                                    ))}
                                  </ul>
                                  <button
                                    type="button"
                                    onClick={() => setAuthDialogItem(item)}
                                    className="sv-neo-btn sv-neo-btn--blue flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl"
                                  >
                                    <LogIn className="w-4 h-4" />
                                    Connect & authorize
                                  </button>
                                </div>
                              )}
                            </div>

                            <div>
                              <h4 className="text-sm font-semibold text-gray-900 mb-2">Assign actions</h4>
                              <p className="text-xs text-gray-500 mb-3">
                                Choose which actions this integration will handle. Check the boxes below to enable each capability.
                              </p>
                              {actions.length === 0 ? (
                                <p className="text-xs text-gray-500 italic">No assignable actions for this integration type.</p>
                              ) : (
                                <div className="grid sm:grid-cols-2 gap-2">
                                  {actions.map((action) => (
                                    <label
                                      key={action.id}
                                      className="flex items-start gap-3 p-3 rounded-lg bg-white border border-gray-200 hover:border-sv-blue/30 cursor-pointer transition-colors"
                                    >
                                      <Checkbox
                                        checked={assignedSet.has(action.id)}
                                        onCheckedChange={() => toggleAction(action.id)}
                                      />
                                      <div className="min-w-0">
                                        <span className="text-sm font-medium text-gray-900">{action.label}</span>
                                        <p className="text-xs text-gray-500 mt-0.5">{action.desc}</p>
                                      </div>
                                    </label>
                                  ))}
                                </div>
                              )}
                            </div>
                            <div className="flex justify-end">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeIntegration(item.id);
                                }}
                                className="text-sm text-red-600 hover:text-red-700 font-medium"
                              >
                                Disconnect
                              </button>
                            </div>
                          </div>
                        </CollapsibleContent>
                      </div>
                    </Collapsible>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        )}

      {/* Auth / OAuth connection dialog */}
      <Dialog open={!!authDialogItem} onOpenChange={(open) => !open && setAuthDialogItem(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Connect to {authDialogItem && INTEGRATION_OPTIONS.find((o) => o.id === authDialogItem.integrationId)?.label}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              You'll be redirected to sign in with your account and grant permissions. This allows us to read and write data as needed for your workflows.
            </p>
            {authDialogItem && (
              <>
                <div>
                  <p className="text-xs font-medium text-gray-700 mb-2">Permissions requested:</p>
                  <ul className="space-y-1">
                    {(INTEGRATION_PERMISSIONS[authDialogItem.integrationId] ?? []).map((perm) => (
                      <li key={perm.scope} className="text-xs flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${perm.type === "read" ? "bg-blue-500" : "bg-emerald-500"}`} />
                        {perm.label} <span className="text-gray-400">({perm.type})</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-xs text-gray-500">
                  In production, clicking Authorize would redirect you to the provider's sign-in page. After you approve, we'd receive an access token to sync your data.
                </p>
              </>
            )}
          </div>
          <DialogFooter>
            <button
              type="button"
              onClick={() => setAuthDialogItem(null)}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                if (authDialogItem) {
                  setConnectionStatus(authDialogItem.id, "connected", "your-account@example.com");
                  setAuthDialogItem(null);
                }
              }}
              className="sv-neo-btn sv-neo-btn--blue px-4 py-2 text-sm font-semibold rounded-xl"
            >
              Authorize (simulate)
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      </div>
    </div>
  );
}

const MEMBERSHIP_PLANS = [
  {
    id: "pay-as-you-go",
    name: "Pay as you go",
    workflows: "1 workflow",
    credits: "Pay per use",
    features: ["1 workflow", "Pay only for what you use", "Add credits anytime", "No monthly commitment"],
  },
  {
    id: "starter",
    name: "Starter",
    workflows: "2 workflows",
    credits: "Add credits as needed",
    features: ["2 workflows", "Add credits as needed", "Basic support"],
  },
  {
    id: "pro",
    name: "Pro",
    workflows: "4 workflows",
    credits: "200 credits/month",
    features: ["4 workflows", "200 credits per month", "Priority support"],
  },
  {
    id: "power",
    name: "Power User",
    workflows: "Unlimited workflows",
    credits: "500 credits/month",
    features: ["Unlimited workflows", "500 credits per month", "Dedicated support"],
  },
] as const;

type MembershipPlanId = (typeof MEMBERSHIP_PLANS)[number]["id"];

type AccountSubSectionId = "payment" | "membership";

const accountSubSections: {
  id: AccountSubSectionId;
  label: string;
  shortLabel: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    id: "payment",
    label: "Payment methods",
    shortLabel: "Pay",
    description: "Cards and saved payment methods for subscriptions, credits, and one-time purchases.",
    icon: CreditCard,
  },
  {
    id: "membership",
    label: "Membership",
    shortLabel: "Plan",
    description: "Current plan, upgrade paths, workflows, and included credits.",
    icon: Crown,
  },
];

function AccountContent() {
  const [activeAccountTab, setActiveAccountTab] = useState<AccountSubSectionId>("payment");
  const [currentPlanId, setCurrentPlanId] = useState<MembershipPlanId>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.membership);
      if (raw) {
        const parsed = JSON.parse(raw);
        const id = parsed?.planId;
        if (id && MEMBERSHIP_PLANS.some((p) => p.id === id)) return id as MembershipPlanId;
      }
    } catch {}
    return "pay-as-you-go";
  });

  const accountSectionMeta = accountSubSections.find((s) => s.id === activeAccountTab);
  const currentPlan = MEMBERSHIP_PLANS.find((p) => p.id === currentPlanId);

  const handleUpgrade = (planId: MembershipPlanId) => {
    setCurrentPlanId(planId);
    localStorage.setItem(STORAGE_KEYS.membership, JSON.stringify({ planId }));
  };

  const AccountSubNav = (
    <>
      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-1 mb-2">Account</p>
      <div className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-1 lg:pb-0 -mx-1 px-1 lg:mx-0 lg:px-0">
        {accountSubSections.map((sec) => {
          const Icon = sec.icon;
          return (
            <button
              key={sec.id}
              type="button"
              onClick={() => setActiveAccountTab(sec.id)}
              className={`flex items-center gap-2.5 w-full min-w-[max-content] lg:min-w-0 text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap lg:whitespace-normal ${
                activeAccountTab === sec.id ? "bg-sv-blue/10 text-sv-blue" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0 opacity-80" />
              <span className="lg:hidden">{sec.shortLabel}</span>
              <span className="hidden lg:inline">{sec.label}</span>
            </button>
          );
        })}
      </div>
    </>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-0 lg:items-start">
      <aside className="w-full lg:w-56 shrink-0 lg:border-r lg:border-gray-200 lg:pr-5 lg:mr-6 lg:min-h-[calc(100vh-6rem)]">
        {AccountSubNav}
      </aside>

      <div className="flex-1 min-w-0 max-w-5xl">
        <nav className="hidden sm:flex flex-wrap items-center gap-1 text-xs text-gray-400 mb-3" aria-hidden>
          <span>Account</span>
          <ChevronRight className="w-3 h-3 shrink-0" />
          <span className="text-gray-600">{accountSectionMeta?.label}</span>
        </nav>
        <h1 className="font-[Sora] text-2xl font-bold text-gray-900 mb-2">Account</h1>
        <p className="text-gray-600 mb-6 max-w-2xl">{accountSectionMeta?.description}</p>

        {activeAccountTab === "payment" && (
          <div className="space-y-6">
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Saved payment methods</h3>
              <div className="flex flex-col items-center justify-center py-8 rounded-lg bg-gray-50 border border-dashed border-gray-200">
                <CreditCard className="w-10 h-10 text-gray-300 mb-3" />
                <p className="text-sm text-gray-500">No payment methods added</p>
                <button
                  type="button"
                  className="mt-4 px-4 py-2 text-sm font-medium text-sv-blue hover:text-sv-blue-light transition-colors"
                >
                  Add payment method
                </button>
              </div>
            </div>
            <p className="text-xs text-gray-500">
              Subscription charges for your{" "}
              <button
                type="button"
                onClick={() => setActiveAccountTab("membership")}
                className="text-sv-blue hover:text-sv-blue-light font-medium"
              >
                membership plan
              </button>{" "}
              can use a default card once you add one.
            </p>
          </div>
        )}

        {activeAccountTab === "membership" && (
          <div className="space-y-6">
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Crown className="w-5 h-5 text-sv-blue" />
                Current plan: {currentPlan?.name ?? "Pay as you go"}
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                {currentPlan?.id === "pay-as-you-go"
                  ? "You're on the default pay-as-you-go plan. Pay only for what you use with no monthly commitment."
                  : `You're on the ${currentPlan?.name} plan with ${currentPlan?.workflows} and ${currentPlan?.credits}.`}
              </p>
              {(currentPlan?.id === "pay-as-you-go" || currentPlan?.id === "starter") && (
                <button
                  type="button"
                  className="text-sm font-medium text-sv-blue hover:text-sv-blue-light transition-colors"
                >
                  Add credits
                </button>
              )}
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h3 className="font-semibold text-gray-900 mb-4">All plans</h3>
              <p className="text-sm text-gray-500 mb-4">
                Pay as you go is the default. Upgrade to a plan with more workflows and included credits.
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {MEMBERSHIP_PLANS.map((plan) => {
                  const isCurrent = plan.id === currentPlanId;
                  return (
                    <div
                      key={plan.id}
                      className={`rounded-xl border p-5 ${
                        isCurrent
                          ? "border-sv-blue bg-sv-blue/5 ring-2 ring-sv-blue/20"
                          : "border-gray-200 bg-gray-50/50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-gray-900">{plan.name}</h4>
                        {isCurrent && (
                          <span className="text-xs px-2 py-1 rounded bg-sv-blue/20 text-sv-blue font-medium">
                            Current
                          </span>
                        )}
                      </div>
                      <ul className="space-y-2 text-sm text-gray-600 mb-4">
                        <li>{plan.workflows}</li>
                        <li>{plan.credits}</li>
                      </ul>
                      {!isCurrent && (
                        <button
                          type="button"
                          onClick={() => handleUpgrade(plan.id)}
                          className="w-full py-2 text-sm sv-neo-btn sv-neo-btn--blue font-medium rounded-xl"
                        >
                          {plan.id === "pay-as-you-go"
                            ? "Switch to Pay as you go"
                            : `Upgrade to ${plan.name}`}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
