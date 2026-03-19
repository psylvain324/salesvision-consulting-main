/*
 * CLIENT PORTAL: Dashboard-style layout with left sidebar navigation.
 * Sections: Workflows (with config), Settings (profile, bookings), Payment Methods, Membership.
 * Placeholder structure for future integration.
 */
import { useState, useRef, useEffect } from "react";
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

type SectionId = "workflows" | "profile" | "bookings" | "leads" | "integrations" | "marketing" | "payment" | "membership";

const sidebarSections: { id: SectionId; label: string; icon: typeof Workflow }[] = [
  { id: "workflows", label: "Workflows", icon: Workflow },
  { id: "profile", label: "Profile", icon: User },
  { id: "bookings", label: "Booking Availability", icon: CalendarIcon },
  { id: "leads", label: "Leads", icon: Users },
  { id: "integrations", label: "Integrations", icon: Plug2 },
  { id: "marketing", label: "Marketing Campaigns", icon: Megaphone },
  { id: "payment", label: "Payment Methods", icon: CreditCard },
  { id: "membership", label: "Membership", icon: Crown },
];

const workflowTemplates = [
  { id: "lead-capture", name: "Lead Capture & Qualification", desc: "Gathers web form data, AI-scores leads by behavior, and routes high-value prospects to reps.", icon: UserPlus, iconBg: "bg-emerald-500/10 text-emerald-600" },
  { id: "basic-qualification-screening", name: "Basic Qualification Screening", desc: "Use website form data or initial import to determine eligibility, follow up unqualified with other options and remove lead, or take pre-configured next step.", icon: CheckCircle2, iconBg: "bg-indigo-500/10 text-indigo-600" },
  { id: "follow-up", name: "Automated Follow-Up Sequence", desc: "Sends tailored emails or alerts based on interactions or inactivity (e.g., remind to call when prospect opens email twice).", icon: Mail, iconBg: "bg-blue-500/10 text-blue-600" },
  { id: "pipeline", name: "Pipeline Management Automation", desc: "Auto-updates CRM deal stages from triggers (e.g., contract sent → deal moves to Proposal stage).", icon: GitBranch, iconBg: "bg-violet-500/10 text-violet-600" },
  { id: "meeting-scheduling", name: "Meeting Scheduling & Prep", desc: "Sends scheduling links to prospects, adds meetings to calendars, and creates agendas automatically.", icon: CalendarDays, iconBg: "bg-amber-500/10 text-amber-600" },
  { id: "proposal-rfp", name: "Proposal/RFP Generation", desc: "Creates drafted proposals or RFPs from templates pre-filled with customer data.", icon: FileText, iconBg: "bg-slate-500/10 text-slate-600" },
  { id: "onboarding", name: "Customer Onboarding", desc: "Triggered on deal close; sends welcome messages and initial onboarding steps to new clients.", icon: Handshake, iconBg: "bg-teal-500/10 text-teal-600" },
  { id: "cold-outreach", name: "Cold Outreach Campaign", desc: "Prospecting sequences; adds leads to cadence and updates based on engagement.", icon: Megaphone, iconBg: "bg-orange-500/10 text-orange-600" },
];

const AUTH_STORAGE_KEY = "client-portal-auth";
const STORAGE_KEYS = {
  profile: "client-portal-profile",
  bookings: "client-portal-bookings",
  bookingsCalendarConfig: "client-portal-bookings-calendar-config",
  workflow: (id: string) => `client-portal-workflow-${id}`,
  campaigns: "client-portal-campaigns",
  integrations: "client-portal-integrations",
  membership: "client-portal-membership",
  leadFieldsConfig: "client-portal-lead-fields-config",
  importMappings: "client-portal-import-mappings",
} as const;

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
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-500 text-sm">Loading...</div>
      </div>
    );
  }
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-500 text-sm">Loading...</div>
      </div>
    );
  }

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-500 text-sm">Loading...</div>
      </div>
    );
  }

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <span className="text-sm text-gray-500">Loading...</span>
      </div>
    );
  }
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-500 text-sm">Loading...</div>
      </div>
    );
  }
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    );
  }
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <span className="text-gray-500">Loading...</span>
      </div>
    );
  }
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    );
  }
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <span className="text-sm text-gray-500">Loading...</span>
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
        <aside className="w-full lg:w-64 shrink-0 border-b lg:border-b-0 lg:border-r border-gray-200 bg-white">
          <nav className="p-4 space-y-1">
            {sidebarSections.map((section) => (
              <button
                key={section.id}
                type="button"
                onClick={() => {
                  setActiveSection(section.id);
                  if (section.id !== "workflows") setSelectedWorkflow(null);
                }}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left text-sm font-medium transition-colors ${
                  activeSection === section.id
                    ? "bg-sv-blue/10 text-sv-blue"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <section.icon className="w-5 h-5 shrink-0" />
                {section.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
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
            <LeadsContent profileJob={profileJob} profileRole={profileRole} />
          )}
          {activeSection === "integrations" && <IntegrationsContent />}
          {activeSection === "marketing" && <MarketingCampaignsContent />}
          {activeSection === "payment" && <PaymentContent />}
          {activeSection === "membership" && <MembershipContent />}
        </main>
      </div>
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
  if (selectedWorkflow) {
    const workflow = workflowTemplates.find((w) => w.id === selectedWorkflow);
    return (
      <WorkflowConfig
        workflow={workflow}
        onBack={onBack}
      />
    );
  }

  return (
    <div>
      <h1 className="font-[Sora] text-2xl font-bold text-gray-900 mb-2">Workflows</h1>
      <p className="text-gray-600 mb-8">
        Select a workflow to configure. Each workflow can be customized to your needs.
      </p>

      <div className="grid sm:grid-cols-2 gap-5 max-w-6xl">
        {workflowTemplates.map((workflow) => {
          const IconComponent = workflow.icon;
          return (
            <button
              key={workflow.id}
              type="button"
              onClick={() => onSelectWorkflow(workflow.id)}
              className="flex items-start gap-4 p-6 rounded-xl border border-gray-200 bg-white text-left hover:border-sv-blue/40 hover:shadow-lg hover:shadow-sv-blue/5 transition-all duration-200 group"
            >
              <div
                className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${workflow.iconBg} transition-transform group-hover:scale-105`}
              >
                <IconComponent className="w-6 h-6" strokeWidth={2} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 group-hover:text-sv-blue transition-colors text-base leading-tight">
                  {workflow.name}
                </h3>
                <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                  {workflow.desc}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-sv-blue shrink-0 mt-1 transition-colors" />
            </button>
          );
        })}
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
  workflow: (typeof workflowTemplates)[number] | undefined;
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
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-sv-blue hover:bg-sv-blue-light rounded-lg transition-colors"
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
            <Button type="submit" className="bg-sv-blue hover:bg-sv-blue-light">Add Lead</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function LeadsContent({ profileJob, profileRole }: { profileJob: string; profileRole: string }) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [addLeadOpen, setAddLeadOpen] = useState(false);
  const [leadView, setLeadView] = useState<"grid" | "grouped">("grid");
  const [groupByField, setGroupByField] = useState<string>("none");
  const [fieldConfig, setFieldConfig] = useState<LeadFieldsConfig>(() => loadLeadFieldsConfig());
  const visibleFieldConfig = visibleFieldConfigFrom(fieldConfig);
  const [isDragging, setIsDragging] = useState(false);
  const [importedCount, setImportedCount] = useState<number | null>(null);
  const [importError, setImportError] = useState<string | null>(null);
  const [leadQuantity, setLeadQuantity] = useState<number>(100);
  const [leadQuality, setLeadQuality] = useState<string>("Medium");
  const [leadVetted, setLeadVetted] = useState<string>("Vetted");
  const [leadOutputType, setLeadOutputType] = useState<string>("CSV");
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const addLead = (lead: Omit<Lead, "id">) => {
    setLeads((prev) => [...prev, { ...lead, id: crypto.randomUUID() }]);
  };
  const removeLead = (id: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
  };

  const handleGenerateLeads = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 2000);
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
          return;
        }
        const headers = rows[0].map((h) => h.toLowerCase().replace(/\s/g, "_"));
        const dataRows = rows.slice(1);
        const newLeads: Lead[] = dataRows
          .filter((row) => row.some((c) => c))
          .map((row) => {
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
            return {
              id: crypto.randomUUID(),
              name,
              email,
              phone,
              company,
              source,
              notes,
              isReferral: isReferral || undefined,
              referralSource: referralSource || undefined,
              referralPaymentMade: referralPaymentMade || undefined,
              referralPaymentAmount,
              initialCaptureDate: initialCaptureDate || LEAD_DEFAULTS.initialCaptureDate(),
              nextFollowUpDate: nextFollowUpDate || LEAD_DEFAULTS.nextFollowUpDate(),
              currentStep: currentStep || LEAD_DEFAULTS.currentStep,
              nextStep: nextStep || LEAD_DEFAULTS.nextStep,
            };
          });
        setLeads((prev) => [...prev, ...newLeads]);
        setImportedCount(newLeads.length);
      } catch {
        setImportError("Could not parse CSV. Please check the file format.");
      }
    };
    reader.readAsText(file);
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

  return (
    <div>
      <h1 className="font-[Sora] text-2xl font-bold text-gray-900 mb-2">Leads</h1>
      <p className="text-gray-600 mb-8">
        Import leads from a CSV file. Imported leads will be added to your workflows and available for follow-up.
      </p>

      <div className="max-w-4xl space-y-6">
        <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-5">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-sv-blue" />
            Generate Fresh Leads
          </h3>
          <p className="text-sm text-gray-500">
            Generate leads based on your Job and Role from Profile. Set them in Profile for better targeting. Results will download as a file.
          </p>
          {(profileJob || profileRole) && (
            <p className="text-sm text-gray-700">
              Targeting:{" "}
              <span className="font-medium">{profileJob || "—"}</span>
              {profileRole && ` · ${profileRole}`}
            </p>
          )}
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
          </div>
          <button
            type="button"
            onClick={handleGenerateLeads}
            disabled={isGenerating}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-sv-blue hover:bg-sv-blue-light rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Sparkles className="w-4 h-4" />
            {isGenerating ? "Generating..." : "Generate leads"}
          </button>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-5">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <Upload className="w-5 h-5 text-sv-blue" />
            Import leads
          </h3>
          <p className="text-sm text-gray-500">
            Upload a CSV file with columns: name, email, phone, company, source, notes. Use our template to get started.
          </p>

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
            <p className="text-xs text-gray-500">Maximum file size: 10MB. Supports .csv files only.</p>
          </div>

          {importError && (
            <p className="text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg">{importError}</p>
          )}
          {importedCount !== null && !importError && (
            <p className="text-sm text-green-700 bg-green-50 px-4 py-2 rounded-lg">
              Imported {importedCount} lead{importedCount !== 1 ? "s" : ""} from file.
            </p>
          )}

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={downloadTemplate}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-sv-blue hover:text-sv-blue-light transition-colors"
            >
              <Download className="w-4 h-4" />
              Download CSV template
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-gray-500" />
              Your leads
            </h3>
            <div className="flex flex-wrap items-center gap-2">
              <Button size="sm" onClick={() => setAddLeadOpen(true)} className="bg-sv-blue hover:bg-sv-blue-light">
                <Plus className="w-4 h-4" />
                Add Lead
              </Button>
              <div className="flex rounded-lg border border-gray-200 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setLeadView("grid")}
                  className={`px-3 py-1.5 text-sm ${leadView === "grid" ? "bg-sv-blue/10 text-sv-blue font-medium" : "text-gray-600 hover:bg-gray-50"}`}
                >
                  <LayoutGrid className="w-4 h-4 inline mr-1.5 align-middle" />
                  Grid
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
                  <SelectTrigger className="w-[140px]">
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
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Settings2 className="w-4 h-4" />
                    Fields
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
          </div>

          {leads.length === 0 ? (
            <p className="text-sm text-gray-500 py-6">
              No leads yet. Add leads manually or import from a CSV file above.
            </p>
          ) : leadView === "grid" ? (
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <Table>
                <TableHeader>
                  <TableRow>
                    {visibleFields.map((fid) => (
                      <TableHead key={fid}>{LEAD_FIELDS.find((f) => f.id === fid)?.label ?? fid}</TableHead>
                    ))}
                    <TableHead className="w-10" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads.map((lead) => (
                    <TableRow key={lead.id}>
                      {visibleFields.map((fid) => (
                        <TableCell key={fid}>{getLeadValue(lead, fid)}</TableCell>
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
          ) : (
            <div className="space-y-2">
              {(() => {
                const groups = new Map<string, Lead[]>();
                for (const lead of leads) {
                  const key = getGroupKey(lead, groupByField);
                  if (!groups.has(key)) groups.set(key, []);
                  groups.get(key)!.push(lead);
                }
                const sorted = Array.from(groups.entries()).sort(([a], [b]) => a.localeCompare(b));
                return sorted.map(([key, items]) => (
                  <Collapsible key={key || "blank"}>
                    <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-left text-sm font-medium hover:bg-gray-100">
                      <span>{key || "(blank)"}</span>
                      <span className="text-gray-500">
                        {items.length} lead{items.length !== 1 ? "s" : ""}
                      </span>
                      <ChevronDown className="w-4 h-4 transition-transform [[data-state=open]_&]:rotate-180" />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="mt-2 rounded-lg border border-gray-200 overflow-hidden">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              {visibleFields.map((fid) => (
                                <TableHead key={fid}>{LEAD_FIELDS.find((f) => f.id === fid)?.label ?? fid}</TableHead>
                              ))}
                              <TableHead className="w-10" />
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {items.map((lead) => (
                              <TableRow key={lead.id}>
                                {visibleFields.map((fid) => (
                                  <TableCell key={fid}>{getLeadValue(lead, fid)}</TableCell>
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
                    </CollapsibleContent>
                  </Collapsible>
                ));
              })()}
            </div>
          )}
        </div>

        <AddLeadDialog open={addLeadOpen} onOpenChange={setAddLeadOpen} onAdd={addLead} />

        {/* CRM Sync — contextual to leads */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-4">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-sv-blue" />
            CRM Sync
          </h3>
          <p className="text-sm text-gray-500">
            Sync imported and generated leads to your connected CRM. Keep contacts and activities in sync.
          </p>
          <div className="flex items-center gap-3">
            <select className="px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white">
              <option>Select CRM...</option>
              <option>HubSpot</option>
              <option>Pipedrive</option>
              <option>Salesforce</option>
            </select>
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-sv-blue hover:text-sv-blue-light border border-sv-blue rounded-lg transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Sync now
            </button>
          </div>
        </div>
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
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [addedProfiles, setAddedProfiles] = useState<AddedProfile[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState<SocialId>("facebook");
  const [urlInput, setUrlInput] = useState("");
  const [savedFeedback, setSavedFeedback] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

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
  const emailInvalid = email.trim() !== "" && !isValidEmail(email);
  const phoneInvalid = phone.trim() !== "" && !isValidPhone(phone);

  const handleSaveProfile = () => {
    if (!isComplete) {
      setValidationErrors(allErrors);
      return;
    }
    setValidationErrors([]);
    const data = {
      fullName,
      email,
      phone,
      industry,
      job,
      role,
      socialProfiles: addedProfiles,
    };
    localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(data));
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 2000);
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

  return (
    <div>
      <h1 className="font-[Sora] text-2xl font-bold text-gray-900 mb-2">Profile</h1>
      <p className="text-gray-600 mb-8">
        Manage your personal information and social accounts for marketing and sales.
      </p>

      <div className="max-w-5xl space-y-6">
        <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-4">
          <h3 className="font-semibold text-gray-900">Personal information</h3>
          {validationErrors.length > 0 && (
            <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-800">
              <span className="font-medium">{missingFields.length > 0 ? "Please fill in all required fields" : "Please fix the following"}: </span>
              {validationErrors.join(", ")}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full name <span className="text-red-500">*</span></label>
            <input
              type="text"
              placeholder="Your name"
              value={fullName}
              onChange={(e) => { setFullName(e.target.value); setValidationErrors([]); }}
              required
              className={`w-full px-4 py-2 rounded-lg border text-sm ${!fullName.trim() && validationErrors.length > 0 ? "border-red-300" : "border-gray-200"}`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email <span className="text-red-500">*</span></label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setValidationErrors([]); }}
              required
              className={`w-full px-4 py-2 rounded-lg border text-sm ${(!email.trim() || !isValidEmail(email)) && validationErrors.length > 0 ? "border-red-300" : "border-gray-200"}`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone number <span className="text-red-500">*</span></label>
            <input
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={phone}
              onChange={(e) => { setPhone(e.target.value); setValidationErrors([]); }}
              required
              className={`w-full px-4 py-2 rounded-lg border text-sm ${(!phone.trim() || !isValidPhone(phone)) && validationErrors.length > 0 ? "border-red-300" : "border-gray-200"}`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Industry <span className="text-red-500">*</span></label>
            <select
              value={industry}
              onChange={(e) => { setIndustry(e.target.value); setValidationErrors([]); }}
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Job <span className="text-red-500">*</span></label>
            <select
              value={job}
              onChange={(e) => { setJob(e.target.value); setValidationErrors([]); }}
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Role <span className="text-red-500">*</span></label>
            <select
              value={role}
              onChange={(e) => { setRole(e.target.value); setValidationErrors([]); }}
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
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-5">
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
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-sv-blue hover:bg-sv-blue-light rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={handleSaveProfile}
            disabled={!isComplete}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-sv-blue hover:bg-sv-blue-light rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4" />
            Save profile
          </button>
          {savedFeedback && (
            <span className="flex items-center gap-1.5 text-sm text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
              Saved
            </span>
          )}
        </div>
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

  return (
    <div>
      <h1 className="font-[Sora] text-2xl font-bold text-gray-900 mb-2">Time slots</h1>
      <p className="text-gray-600 mb-4">
        Add time slots you're actively seeking to fill with appointments — these are slots you want booked, not general availability.
      </p>
      <div className="rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 mb-8 text-sm text-amber-900">
        <strong>Note:</strong> These are time slots being pursued to be filled with bookings, not passive availability.
      </div>

      <div className="max-w-4xl space-y-6">
        {/* Calendar sources — use connected calendar apps for availability */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-5">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-sv-blue" />
            Calendar sources
          </h3>
          <p className="text-sm text-gray-500">
            Use connected calendar apps for availability. Select which calendars to use and set a default. Connect calendars in Integrations first.
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
                        id={`cal-${cal.id}`}
                        checked={isSelected}
                        onCheckedChange={() => toggleCalendarSource(cal.id)}
                      />
                      <label htmlFor={`cal-${cal.id}`} className="text-sm font-medium text-gray-900 cursor-pointer truncate">
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

        {/* Add time slot form */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-5">
          <h3 className="font-semibold text-gray-900">Add time slot</h3>
          <p className="text-sm text-gray-500">
            Choose a date (MM/DD/YYYY) and start/end time for a slot you want to fill.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date (MM/DD/YYYY)</label>
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className={`w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-left bg-white hover:border-gray-300 transition-colors ${!form.date ? "text-gray-400" : ""}`}
                  >
                    {form.date ? formatDateMMDDYYYY(form.date) : "MM/DD/YYYY"}
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
              {form.date && (
                <p className="text-xs text-gray-500 mt-1">Selected: {formatDateMMDDYYYY(form.date)}</p>
              )}
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
            className="px-5 py-2.5 text-sm font-semibold text-white bg-sv-blue hover:bg-sv-blue-light rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add time slot
          </button>
        </div>

        {/* View toggle & slots section */}
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <h3 className="font-semibold text-gray-900">Your time slots</h3>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSaveAvailability}
                disabled={blocks.length === 0}
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-sv-blue hover:bg-sv-blue-light rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
            </div>
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
                Calendar
              </button>
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
                  .slice(0, 5)
                  .map((d) => (
                    <div key={d} className="text-sm text-gray-600">
                      <strong>{formatDateMMDDYYYY(d)}:</strong>{" "}
                      {blocks
                        .filter((b) => b.date === d)
                        .map((b) => `${formatTime(b.startTime)}–${formatTime(b.endTime)}`)
                        .join(", ")}
                    </div>
                  ))}
                {datesWithSlots.size > 5 && (
                  <p className="text-xs text-gray-500">+{datesWithSlots.size - 5} more dates with slots</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Appointment Scheduling — manual tool, not a workflow */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-4">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <Link2 className="w-5 h-5 text-sv-blue" />
            Appointment Scheduling
          </h3>
          <p className="text-sm text-gray-500">
            Send scheduling links to prospects and add meetings to calendars. Run manually when needed — not an automated workflow.
          </p>
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Default duration</label>
              <select className="px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white">
                <option>15 min</option>
                <option>30 min</option>
                <option selected>60 min</option>
              </select>
            </div>
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
                {(calendarConfig.sourceIds.length > 0 ? calendarConfig.sourceIds : connectedCalendars.map((c) => c.id)).map((sid) => {
                  const cal = connectedCalendars.find((c) => c.id === sid) ?? CALENDAR_APPS.find((c) => c.id === sid) ?? { id: sid, label: sid };
                  return (
                    <option key={cal.id} value={cal.id}>
                      {cal.label}{calendarConfig.defaultId === cal.id ? " (default)" : ""}
                    </option>
                  );
                })}
              </select>
              {connectedCalendars.length === 0 && (
                <p className="text-xs text-gray-500 mt-1">
                  Connect calendars in Integrations first.
                </p>
              )}
              {connectedCalendars.length > 0 && calendarConfig.sourceIds.length === 0 && (
                <p className="text-xs text-amber-600 mt-1">
                  Select a calendar above, or configure sources in the section above.
                </p>
              )}
            </div>
          </div>
          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-sv-blue hover:bg-sv-blue-light rounded-lg transition-colors"
          >
            <Link2 className="w-4 h-4" />
            Open scheduling link
          </button>
        </div>

        {/* CRM Sync — contextual to bookings */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-4">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-sv-blue" />
            CRM Sync
          </h3>
          <p className="text-sm text-gray-500">
            Sync bookings and meetings to your connected CRM. Keep deal stages and activities in sync.
          </p>
          <div className="flex items-center gap-3">
            <select className="px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white">
              <option>Select CRM...</option>
              <option>HubSpot</option>
              <option>Pipedrive</option>
              <option>Salesforce</option>
            </select>
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-sv-blue hover:text-sv-blue-light border border-sv-blue rounded-lg transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Sync now
            </button>
          </div>
        </div>
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

function MarketingCampaignsContent() {
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
  const [showAddForm, setShowAddForm] = useState(false);
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
    setShowAddForm(false);
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

  return (
    <div>
      <h1 className="font-[Sora] text-2xl font-bold text-gray-900 mb-2">Marketing Campaigns</h1>
      <p className="text-gray-600 mb-8">
        Create and manage AI-powered social media and ad campaigns. Configure frequency, schedule, budgets, and automation for each platform.
      </p>

      <div className="max-w-5xl space-y-6">
        {!showAddForm ? (
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <button
              type="button"
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-sv-blue hover:bg-sv-blue-light rounded-xl transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add campaign
            </button>
            <p className="mt-3 text-xs text-gray-500">
              Choose a platform, set your schedule and budget, and let AI optimize your campaign.
            </p>
          </div>
        ) : (
          <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-6">
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
                    className="px-5 py-2.5 text-sm font-semibold text-white bg-sv-blue hover:bg-sv-blue-light rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Create campaign
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddForm(false);
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
          </div>
        )}

        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <Target className="w-5 h-5 text-gray-500" />
              Your campaigns
            </h3>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleSaveCampaigns}
                disabled={campaigns.length === 0}
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-sv-blue hover:bg-sv-blue-light rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
            <div className="flex flex-col items-center justify-center py-12 rounded-lg bg-gray-50 border border-dashed border-gray-200">
              <Megaphone className="w-12 h-12 text-gray-300 mb-3" />
              <p className="text-sm text-gray-500">No campaigns yet</p>
              <p className="text-xs text-gray-400 mt-1">Add a campaign above to get started</p>
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

function IntegrationsContent() {
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
  };

  const setConnectionStatus = (itemId: string, status: "pending_auth" | "connected", account?: string) => {
    setAddedIntegrations((prev) =>
      prev.map((i) =>
        i.id === itemId ? { ...i, connectionStatus: status, connectedAccount: account } : i
      )
    );
  };

  const toggleAction = (itemId: string, actionId: string) => {
    setAddedIntegrations((prev) =>
      prev.map((i) =>
        i.id === itemId
          ? {
              ...i,
              assignedActions: i.assignedActions.includes(actionId)
                ? i.assignedActions.filter((a) => a !== actionId)
                : [...i.assignedActions, actionId],
            }
          : i
      )
    );
  };

  const removeIntegration = (id: string) => {
    setAddedIntegrations((prev) => prev.filter((i) => i.id !== id));
  };

  const addedIds = new Set(addedIntegrations.map((i) => i.integrationId));
  const availableOptions = INTEGRATION_OPTIONS.filter((o) => !addedIds.has(o.id));

  return (
    <div>
      <h1 className="font-[Sora] text-2xl font-bold text-gray-900 mb-2">Integrations</h1>
      <p className="text-gray-600 mb-8">
        Connect your tools and platforms. Data will sync across your workflows.
      </p>

      <div className="max-w-5xl space-y-6">
        <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-5">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <Plus className="w-5 h-5 text-sv-blue" />
            Add integration
          </h3>
          <p className="text-sm text-gray-500">
            Choose an integration to connect. Connected tools will sync with your workflows, leads, and bookings.
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
                {availableOptions.length === 0 && (
                  <option value="">All integrations added</option>
                )}
              </select>
            </div>
            <div className="flex items-end">
              <button
                type="button"
                onClick={addIntegration}
                disabled={!selectedIntegration}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-sv-blue hover:bg-sv-blue-light rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6">
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
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-sv-blue hover:bg-sv-blue-light rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
            <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 border border-gray-100">
              <Plug2 className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-500">No integrations connected yet. Add one above.</span>
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
                                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-sv-blue hover:bg-sv-blue-light rounded-xl transition-colors"
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
      </div>

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
              className="px-4 py-2 text-sm font-semibold text-white bg-sv-blue hover:bg-sv-blue-light rounded-lg"
            >
              Authorize (simulate)
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function PaymentContent() {
  return (
    <div>
      <h1 className="font-[Sora] text-2xl font-bold text-gray-900 mb-2">Payment methods</h1>
      <p className="text-gray-600 mb-8">
        Manage your payment methods for subscriptions and one-time purchases.
      </p>

      <div className="max-w-5xl space-y-6">
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

function MembershipContent() {
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

  const currentPlan = MEMBERSHIP_PLANS.find((p) => p.id === currentPlanId);

  const handleUpgrade = (planId: MembershipPlanId) => {
    setCurrentPlanId(planId);
    localStorage.setItem(STORAGE_KEYS.membership, JSON.stringify({ planId }));
  };

  return (
    <div>
      <h1 className="font-[Sora] text-2xl font-bold text-gray-900 mb-2">Membership</h1>
      <p className="text-gray-600 mb-8">
        Start with pay as you go and upgrade when you’re ready. View your current plan and manage your subscription.
      </p>

      <div className="max-w-5xl space-y-6">
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Crown className="w-5 h-5 text-sv-blue" />
            Current plan: {currentPlan?.name ?? "Pay as you go"}
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            {currentPlan?.id === "pay-as-you-go"
              ? "You’re on the default pay-as-you-go plan. Pay only for what you use with no monthly commitment."
              : `You’re on the ${currentPlan?.name} plan with ${currentPlan?.workflows} and ${currentPlan?.credits}.`}
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
                      className="w-full py-2 text-sm font-medium text-white bg-sv-blue hover:bg-sv-blue-light rounded-lg transition-colors"
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
    </div>
  );
}
