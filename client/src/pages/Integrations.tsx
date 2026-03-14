/*
 * DESIGN: Meridian — Refined Dark Luxury
 * INTEGRATIONS PAGE: Tools and platforms we use and integrate with.
 */
import { Link } from "wouter";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import {
  ArrowRight,
  Plug2,
  Database,
  Zap,
  Mic2,
  Calendar,
  MessageSquare,
  Megaphone,
  BarChart3,
} from "lucide-react";

const INTEGRATIONS_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663397693691/kUiTSqrNT343A8hDu8MEPH/services-bg-dU46apvAdVMG8nCCTSLxrX.webp";

const integrationCategories = [
  {
    id: "crm",
    icon: Database,
    title: "CRM & Sales",
    desc: "Connect your pipelines and close more deals with intelligent automation across your CRM.",
    tools: ["Pipedrive", "Salesforce", "HubSpot", "Apollo"],
  },
  {
    id: "automation",
    icon: Zap,
    title: "Automation & Workflow",
    desc: "Orchestrate workflows and connect your entire stack without writing code.",
    tools: ["Zapier", "Manus"],
  },
  {
    id: "ai",
    icon: Mic2,
    title: "AI & Voice",
    desc: "Add natural voice and AI capabilities to your workflows and customer touchpoints.",
    tools: ["ElevenLabs"],
  },
  {
    id: "scheduling",
    icon: Calendar,
    title: "Scheduling & Calendar",
    desc: "Automate booking, reminders, and meeting coordination.",
    tools: ["Cal.com", "Google Calendar", "Google Meet"],
  },
  {
    id: "communication",
    icon: MessageSquare,
    title: "Communication & Collaboration",
    desc: "Stay connected with your team and prospects across channels.",
    tools: ["Slack", "Telegram", "Google Chat"],
  },
  {
    id: "marketing",
    icon: Megaphone,
    title: "Marketing & Advertising",
    desc: "Run and optimize campaigns across paid and organic channels.",
    tools: ["Meta Business Suite", "Instagram Ads", "LinkedIn Ads"],
  },
  {
    id: "workspace",
    icon: BarChart3,
    title: "Google Workspace & Analytics",
    desc: "Leverage the full Google ecosystem for productivity, collaboration, and insights.",
    tools: ["Google Workspace", "Google Calendar", "Google Meet", "Google Chat", "Google Analytics"],
  },
];

const stats = [
  { value: "7+", label: "Integration Categories" },
  { value: "25+", label: "Tools Supported" },
  { value: "24/7", label: "Synced Workflows" },
];

export default function Integrations() {
  return (
    <div className="min-h-screen bg-brand-darker dark">
      {/* ===== HERO ===== */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={INTEGRATIONS_BG} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-darker/80 via-brand-darker/60 to-brand-darker" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-darker/90 via-transparent to-transparent" />
        </div>

        <div className="relative container pt-32 pb-20">
          <div className="max-w-3xl">
            <motion.span
              className="section-label text-white/85 mb-6 inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Our Stack
            </motion.span>
            <motion.h1
              className="font-[Sora] text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Tools We Use &
              <br />
              <span className="gradient-text-blue">Integrate With</span>
            </motion.h1>
            <motion.p
              className="mt-6 text-lg text-white/90 leading-relaxed max-w-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              We build on top of the tools you already use. Our workflows connect CRM, communication, marketing, and scheduling platforms so your automation fits your existing stack.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="py-16 lg:py-20 border-y border-white/10">
        <div className="container">
          <div className="grid grid-cols-3 gap-8 lg:gap-12">
            {stats.map((stat, i) => (
              <AnimatedSection key={stat.label} delay={i * 0.08}>
                <div className="text-center">
                  <p className="font-[Sora] text-3xl sm:text-4xl font-bold text-white tracking-tight">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-white/80">{stat.label}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <hr className="section-divider w-11/12 sm:w-3/4" aria-hidden />
      {/* ===== INTEGRATION CATEGORIES ===== */}
      <section className="py-24 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sv-blue/[0.02] to-transparent" />
        <div className="container relative">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="section-accent mx-auto mb-4" />
              <span className="section-label text-white/80 mb-4 inline-block">By Category</span>
              <h2 className="font-[Sora] text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Integrations at a Glance
              </h2>
              <p className="mt-4 text-white/85 max-w-2xl mx-auto text-lg">
                From CRM and automation to scheduling and marketing — we connect the tools that power your business.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {integrationCategories.map((category, i) => (
              <AnimatedSection key={category.id} delay={i * 0.05}>
                <div className="rounded-2xl glass-card glass-card-hover p-7 h-full flex flex-col transition-all duration-300">
                  <div className="w-11 h-11 rounded-xl bg-sv-blue/10 flex items-center justify-center mb-5">
                    <category.icon className="w-5 h-5 text-sv-blue" />
                  </div>
                  <h3 className="font-[Sora] text-lg font-semibold text-white mb-2">
                    {category.title}
                  </h3>
                  <p className="text-sm text-white/85 leading-relaxed mb-5 flex-1">
                    {category.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {category.tools.map((tool) => (
                      <span
                        key={tool}
                        className="px-3 py-1.5 rounded-lg bg-white/5 text-xs text-white/90 border border-white/5"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.3}>
            <div className="mt-16 rounded-2xl glass-card p-8 lg:p-10 border border-white/5">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-sv-blue/10 flex items-center justify-center flex-shrink-0">
                    <Plug2 className="w-6 h-6 text-sv-blue" />
                  </div>
                  <div>
                    <h3 className="font-[Sora] text-xl font-semibold text-white mb-2">
                      Not seeing your tools?
                    </h3>
                    <p className="text-white/85 text-sm">
                      We integrate with many more platforms via Zapier, custom APIs, and webhooks. If you use a tool we haven't listed, ask us — we can likely connect it.
                    </p>
                  </div>
                </div>
                <Link href="/contact">
                  <span className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-sv-blue hover:bg-sv-blue-light rounded-xl transition-all duration-200">
                    Ask About Your Stack <ArrowRight size={14} />
                  </span>
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <hr className="section-divider w-11/12 sm:w-3/4" aria-hidden />
      {/* ===== CTA ===== */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sv-blue/5 via-transparent to-tv-orange/5" />
        <div className="container relative">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-[Sora] text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Ready to Connect Your Tools?
              </h2>
              <p className="mt-5 text-white/85 text-lg">
                Tell us what you're using and we'll show you how our workflows can plug in.
              </p>
              <div className="mt-10">
                <Link href="/contact">
                  <span className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold text-white bg-sv-blue hover:bg-sv-blue-light rounded-xl transition-all duration-200 shadow-lg shadow-sv-blue/20">
                    Get in Touch <ArrowRight size={16} />
                  </span>
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
