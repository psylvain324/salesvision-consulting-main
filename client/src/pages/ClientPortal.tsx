/*
 * CLIENT PORTAL: Dashboard-style layout with left sidebar navigation.
 * Sections: Workflows (with config), Settings (profile, bookings), Payment Methods, Membership.
 * Placeholder structure for future integration.
 */
import { useState, useRef } from "react";
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
} from "lucide-react";

type SectionId = "workflows" | "profile" | "bookings" | "leads" | "integrations" | "payment" | "membership";

const sidebarSections: { id: SectionId; label: string; icon: typeof Workflow }[] = [
  { id: "workflows", label: "Workflows", icon: Workflow },
  { id: "profile", label: "Profile", icon: User },
  { id: "bookings", label: "Booking Availability", icon: CalendarIcon },
  { id: "leads", label: "Leads", icon: Users },
  { id: "integrations", label: "Integrations", icon: Plug2 },
  { id: "payment", label: "Payment Methods", icon: CreditCard },
  { id: "membership", label: "Membership", icon: Crown },
];

const workflowTemplates = [
  { id: "lead-capture", name: "Lead Capture & Qualification", desc: "Gathers web form data, AI-scores leads by behavior, and routes high-value prospects to reps.", icon: UserPlus, iconBg: "bg-emerald-500/10 text-emerald-600" },
  { id: "follow-up", name: "Automated Follow-Up Sequence", desc: "Sends tailored emails or alerts based on interactions or inactivity (e.g., remind to call when prospect opens email twice).", icon: Mail, iconBg: "bg-blue-500/10 text-blue-600" },
  { id: "pipeline", name: "Pipeline Management Automation", desc: "Auto-updates CRM deal stages from triggers (e.g., contract sent → deal moves to Proposal stage).", icon: GitBranch, iconBg: "bg-violet-500/10 text-violet-600" },
  { id: "meeting-scheduling", name: "Meeting Scheduling & Prep", desc: "Sends scheduling links to prospects, adds meetings to calendars, and creates agendas automatically.", icon: CalendarDays, iconBg: "bg-amber-500/10 text-amber-600" },
  { id: "proposal-rfp", name: "Proposal/RFP Generation", desc: "Creates drafted proposals or RFPs from templates pre-filled with customer data.", icon: FileText, iconBg: "bg-slate-500/10 text-slate-600" },
  { id: "onboarding", name: "Customer Onboarding", desc: "Triggered on deal close; sends welcome messages and initial onboarding steps to new clients.", icon: Handshake, iconBg: "bg-teal-500/10 text-teal-600" },
  { id: "cold-outreach", name: "Cold Outreach Campaign", desc: "Prospecting sequences; adds leads to cadence and updates based on engagement.", icon: Megaphone, iconBg: "bg-orange-500/10 text-orange-600" },
];

export default function ClientPortal() {
  const [activeSection, setActiveSection] = useState<SectionId>("workflows");
  const [selectedWorkflow, setSelectedWorkflow] = useState<string | null>(null);
  const [profileIndustry, setProfileIndustry] = useState("");
  const [profileJob, setProfileJob] = useState("");
  const [profileRole, setProfileRole] = useState("");

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
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-sv-blue/10 flex items-center justify-center">
              <LayoutDashboard className="w-4 h-4 text-sv-blue" strokeWidth={2} />
            </div>
            <span className="font-[Sora] font-semibold text-sm tracking-wide text-gray-700 uppercase">
              Client Portal
            </span>
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
          {activeSection === "bookings" && <BookingsContent />}
          {activeSection === "leads" && (
            <LeadsContent profileJob={profileJob} profileRole={profileRole} />
          )}
          {activeSection === "integrations" && <IntegrationsContent />}
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

      <div className="grid sm:grid-cols-2 gap-5 max-w-4xl">
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
  const [enabled, setEnabled] = useState(true);
  const [runType, setRunType] = useState<"schedule" | "lead">("lead");
  const [scheduleInterval, setScheduleInterval] = useState<string | number>(60);
  const [scheduleTime, setScheduleTime] = useState("09:00");
  const [scheduleDays, setScheduleDays] = useState<string>("1,2,3,4,5");
  const [leadDelayValue, setLeadDelayValue] = useState(3);
  const [leadDelayUnit, setLeadDelayUnit] = useState<"minutes" | "hours" | "days">("days");

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

      <div className="space-y-6 max-w-2xl">
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
            <input
              type="text"
              placeholder="e.g. Lead status is new, Source is website..."
              className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm"
            />
          </div>
          <div className="pt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Actions</label>
            <input
              type="text"
              placeholder="Configure actions..."
              className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const CSV_TEMPLATE = "name,email,phone,company,source,notes\nJohn Doe,john@example.com,+1 555-0100,Acme Corp,Website,Interested in quote\nJane Smith,jane@example.com,+1 555-0101,Beta Inc,Referral,Follow up next week";

const LEAD_QUANTITY_OPTIONS = [50, 100, 250, 500] as const;
const LEAD_QUALITY_OPTIONS = ["Low", "Medium", "High"] as const;
const LEAD_VETTED_OPTIONS = ["Vetted", "Non-Vetted"] as const;
const LEAD_OUTPUT_OPTIONS = ["CSV", "Excel (.xlsx)"] as const;

function LeadsContent({ profileJob, profileRole }: { profileJob: string; profileRole: string }) {
  const [isDragging, setIsDragging] = useState(false);
  const [importedCount, setImportedCount] = useState<number | null>(null);
  const [importError, setImportError] = useState<string | null>(null);
  const [leadQuantity, setLeadQuantity] = useState<number>(100);
  const [leadQuality, setLeadQuality] = useState<string>("Medium");
  const [leadVetted, setLeadVetted] = useState<string>("Vetted");
  const [leadOutputType, setLeadOutputType] = useState<string>("CSV");
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
        const dataRows = rows.length > 1 ? rows.length - 1 : 0;
        setImportedCount(dataRows);
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

      <div className="max-w-2xl space-y-6">
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
              Found {importedCount} lead{importedCount !== 1 ? "s" : ""} in file. Backend integration coming soon to save leads.
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

        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-gray-500" />
            Your leads
          </h3>
          <p className="text-sm text-gray-500">
            Imported leads will appear here. Integration with CRM and workflows coming soon.
          </p>
        </div>

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
  const [addedProfiles, setAddedProfiles] = useState<AddedProfile[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState<SocialId>("facebook");
  const [urlInput, setUrlInput] = useState("");

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

      <div className="max-w-xl space-y-6">
        <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-4">
          <h3 className="font-semibold text-gray-900">Personal information</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full name</label>
            <input
              type="text"
              placeholder="Your name"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone number</label>
            <input
              type="tel"
              placeholder="+1 (555) 000-0000"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm bg-white"
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Job</label>
            <select
              value={job}
              onChange={(e) => setJob(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm bg-white"
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm bg-white"
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

function BookingsContent() {
  const [blocks, setBlocks] = useState<TimeSlotBlock[]>([]);
  const [view, setView] = useState<"list" | "calendar">("list");
  const [calendarMonth, setCalendarMonth] = useState<Date>(() => new Date());
  const [form, setForm] = useState({
    date: "",
    startTime: "09:00",
    endTime: "17:00",
  });

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

      <div className="max-w-2xl space-y-6">
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
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Your time slots</h3>
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
              <select className="px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white">
                <option>Calendly</option>
                <option>Cal.com</option>
                <option>Google Calendar</option>
              </select>
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

const INTEGRATION_OPTIONS = [
  { id: "google-calendar", label: "Google Calendar", desc: "Sync bookings and availability", iconSlug: "googlecalendar" },
  { id: "calendly", label: "Calendly", desc: "Appointment scheduling", iconSlug: "calendly" },
  { id: "pipedrive", label: "Pipedrive", desc: "CRM and pipeline management", iconSlug: "pipedrive" },
  { id: "hubspot", label: "HubSpot", desc: "CRM, marketing, and sales", iconSlug: "hubspot" },
  { id: "salesforce", label: "Salesforce", desc: "CRM and customer data", iconSlug: "salesforce" },
  { id: "outlook-calendar", label: "Outlook Calendar", desc: "Microsoft 365 calendar sync", iconSlug: "microsoftoutlook" },
  { id: "zoom", label: "Zoom", desc: "Meetings and webinars", iconSlug: "zoom" },
  { id: "zapier", label: "Zapier", desc: "Connect 6,000+ apps", iconSlug: "zapier" },
  { id: "stripe", label: "Stripe", desc: "Payments and subscriptions", iconSlug: "stripe" },
  { id: "slack", label: "Slack", desc: "Notifications and alerts", iconSlug: "slack" },
] as const;

type IntegrationId = (typeof INTEGRATION_OPTIONS)[number]["id"];

type AddedIntegration = { id: string; integrationId: IntegrationId; connectedAt: string };

function IntegrationsContent() {
  const [addedIntegrations, setAddedIntegrations] = useState<AddedIntegration[]>([]);
  const [selectedIntegration, setSelectedIntegration] = useState<IntegrationId | "">("");

  const addIntegration = () => {
    if (!selectedIntegration) return;
    if (addedIntegrations.some((i) => i.integrationId === selectedIntegration)) return;
    setAddedIntegrations((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        integrationId: selectedIntegration,
        connectedAt: new Date().toISOString(),
      },
    ]);
    setSelectedIntegration("");
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

      <div className="max-w-xl space-y-6">
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
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Plug2 className="w-5 h-5 text-gray-500" />
            Connected integrations
          </h3>
          {addedIntegrations.length === 0 ? (
            <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 border border-gray-100">
              <Plug2 className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-500">No integrations connected yet. Add one above.</span>
            </div>
          ) : (
            <ul className="space-y-2">
              {addedIntegrations.map((item) => {
                const opt = INTEGRATION_OPTIONS.find((o) => o.id === item.integrationId);
                return (
                  <li
                    key={item.id}
                    className="flex items-center justify-between gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center shrink-0">
                        <Plug2 className="w-5 h-5 text-sv-blue" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900">{opt?.label ?? item.integrationId}</p>
                        <p className="text-xs text-gray-500 truncate">{opt?.desc ?? ""}</p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          Added {new Date(item.connectedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700 font-medium">
                        Connected
                      </span>
                      <button
                        type="button"
                        onClick={() => removeIntegration(item.id)}
                        className="text-sm text-red-600 hover:text-red-700 font-medium"
                      >
                        Disconnect
                      </button>
                    </div>
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

function PaymentContent() {
  return (
    <div>
      <h1 className="font-[Sora] text-2xl font-bold text-gray-900 mb-2">Payment methods</h1>
      <p className="text-gray-600 mb-8">
        Manage your payment methods for subscriptions and one-time purchases.
      </p>

      <div className="max-w-xl space-y-6">
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

function MembershipContent() {
  const currentPlanId = "starter";

  return (
    <div>
      <h1 className="font-[Sora] text-2xl font-bold text-gray-900 mb-2">Membership</h1>
      <p className="text-gray-600 mb-8">
        View your current plan and manage your subscription.
      </p>

      <div className="max-w-3xl space-y-6">
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Crown className="w-5 h-5 text-sv-blue" />
            Current plan: Starter
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            You’re on the Starter plan with 2 workflows and the ability to add credits.
          </p>
          <button
            type="button"
            className="text-sm font-medium text-sv-blue hover:text-sv-blue-light transition-colors"
          >
            Add credits
          </button>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h3 className="font-semibold text-gray-900 mb-4">All plans</h3>
          <div className="grid sm:grid-cols-3 gap-4">
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
                      className="w-full py-2 text-sm font-medium text-white bg-sv-blue hover:bg-sv-blue-light rounded-lg transition-colors"
                    >
                      Upgrade to {plan.name}
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
