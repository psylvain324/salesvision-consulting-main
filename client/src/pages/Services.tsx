/*
 * SERVICES HUB: Entry point to specialty service pages (no duplicate long-form overview).
 */
import { Link } from "wouter";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import {
  ArrowRight,
  Brain,
  LineChart,
  Code,
  Plug2,
  Target,
  Globe,
  Database,
  MessageSquare,
  Mic2,
} from "lucide-react";

const SERVICES_BG = "/Images/Background_Futuristic_1.jpeg";

const hubLinks = [
  {
    href: "/workflows",
    title: "AI Workflows",
    desc: "Pre-built and custom automation for agents and small teams — lead pipelines, follow-ups, and integrations.",
    icon: Brain,
    color: "text-violet-600",
    bg: "bg-violet-500/15",
  },
  {
    href: "/marketing-media",
    title: "Marketing & Media",
    desc: "Digital campaigns, social, video and audio production, and creative — strategy through execution.",
    icon: LineChart,
    color: "text-tv-orange",
    bg: "bg-tv-orange/15",
  },
  {
    href: "/custom-development",
    title: "Custom Development",
    desc: "Web applications, APIs, data architecture, and bespoke tools when off-the-shelf is not enough.",
    icon: Code,
    color: "text-indigo-600",
    bg: "bg-indigo-500/15",
  },
  {
    href: "/integrations",
    title: "Integrations & Stack",
    desc: "CRM, automation, AI voice, scheduling, and marketing tools — how we connect your stack to workflows.",
    icon: Plug2,
    color: "text-sv-blue",
    bg: "bg-sv-blue/10",
  },
] as const;

const stats = [
  { value: "500+", label: "Leads Generated Monthly" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "50+", label: "AI Workflows Deployed" },
  { value: "24/7", label: "Automated Operations" },
];

const industriesWeServe = [
  "Health Insurance",
  "Real Estate",
  "Travel & Hospitality",
  "Life Insurance",
  "Mortgage & Home Financing",
  "Financial Services",
  "Consulting & Professional Services",
];

const focusAreas = [
  { icon: Database, label: "Data Engineering", color: "text-sv-blue" },
  { icon: Globe, label: "Web Platforms", color: "text-emerald-600" },
  { icon: MessageSquare, label: "Chatbots", color: "text-violet-600" },
  { icon: Mic2, label: "AI & Voice", color: "text-tv-orange" },
];

export default function Services() {
  return (
    <div className="min-h-screen">
      <section id="section-hero" className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={SERVICES_BG} alt="" className="absolute inset-0 w-full h-full object-cover object-center opacity-40 hero-bg-drift" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/50 to-white/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-transparent to-transparent" />
        </div>

        <div className="relative container pt-32 pb-16">
          <div className="max-w-3xl">
            <motion.span
              className="section-label text-sv-blue/80 mb-6 inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Services
            </motion.span>
            <motion.h1
              className="font-[Sora] text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              How We Help
              <br />
              <span className="gradient-text-purple">Your Business Grow</span>
            </motion.h1>
            <motion.p
              className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              We work with SMBs and contract into larger projects where we fit. Explore each area below —
              workflows, marketing & media, custom builds, and the tools we integrate.
            </motion.p>
          </div>
        </div>
      </section>

      <section id="section-stats" className="py-16 lg:py-20 border-y border-border">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, i) => (
              <AnimatedSection key={stat.label} delay={i * 0.08}>
                <div className="text-center">
                  <p className="font-[Sora] text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <hr className="section-divider section-divider-lg w-11/12 sm:w-3/4" aria-hidden />
      <section id="section-areas" className="py-24 lg:py-32">
        <div className="container">
          <AnimatedSection>
            <div className="text-center mb-14">
              <span className="section-label text-sv-blue/60 mb-4 inline-block">Choose a focus</span>
              <h2 className="font-[Sora] text-3xl sm:text-4xl font-bold uppercase tracking-tight gradient-text-logo">
                Service areas
              </h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                Deep-dive content lives on each page — no duplicated long reads here.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
            {hubLinks.map((item, i) => (
              <AnimatedSection key={item.href} delay={i * 0.06}>
                <Link href={item.href} className="block group h-full">
                  <div className="rounded-2xl glass-card glass-card-hover p-8 h-full border border-transparent hover:border-sv-blue/15 transition-all duration-300">
                    <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center mb-5`}>
                      <item.icon className={`w-6 h-6 ${item.color}`} />
                    </div>
                    <h3 className="font-[Sora] text-xl font-semibold text-foreground mb-3 group-hover:text-sv-blue transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">{item.desc}</p>
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-sv-blue group-hover:gap-3 transition-all">
                      Open page <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <hr className="section-divider section-divider-lg w-11/12 sm:w-3/4" aria-hidden />
      <section id="section-focus" className="py-24 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sv-blue/[0.02] to-transparent" />
        <div className="container relative">
          <AnimatedSection>
            <div className="text-center mb-14">
              <span className="section-label text-muted-foreground mb-4 inline-block">Expertise</span>
              <h2 className="font-[Sora] text-3xl sm:text-4xl font-bold uppercase tracking-tight gradient-text-logo">
                What we work on
              </h2>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {focusAreas.map((item, i) => (
              <AnimatedSection key={item.label} delay={i * 0.06}>
                <div className="rounded-2xl glass-card glass-card-hover p-6 text-center h-full">
                  <item.icon className={`w-8 h-8 mx-auto mb-3 opacity-80 ${item.color}`} />
                  <span className="text-sm font-medium text-muted-foreground">{item.label}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <hr className="section-divider section-divider-lg w-11/12 sm:w-3/4" aria-hidden />
      <section id="section-industries" className="py-24 lg:py-32">
        <div className="container">
          <AnimatedSection>
            <div className="text-center mb-14">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Target className="w-5 h-5 text-sv-blue" />
                <span className="section-label text-muted-foreground">Industries we serve</span>
              </div>
              <h2 className="font-[Sora] text-3xl sm:text-4xl font-bold uppercase tracking-tight gradient-text-logo">
                Trusted across sectors
              </h2>
              <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
                Health, real estate, travel, finance, and professional services.
              </p>
            </div>
          </AnimatedSection>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {industriesWeServe.map((industry, i) => (
              <AnimatedSection key={industry} delay={i * 0.04}>
                <span className="inline-flex items-center px-5 py-2.5 rounded-xl glass-card text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors">
                  {industry}
                </span>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <hr className="section-divider section-divider-lg w-11/12 sm:w-3/4" aria-hidden />
      <section id="section-cta" className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sv-blue/5 via-transparent to-tv-orange/5" />
        <div className="container relative">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-[Sora] text-3xl sm:text-4xl font-bold uppercase tracking-tight gradient-text-logo">
                Not sure where to start?
              </h2>
              <p className="mt-5 text-muted-foreground text-lg">
                Tell us your goals — we'll point you to the right offering or combine a few.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link href="/contact">
                  <span className="sv-neo-btn sv-neo-btn--blue inline-flex items-center gap-2 px-8 py-4 text-sm rounded-xl">
                    Contact us <ArrowRight size={16} />
                  </span>
                </Link>
                <Link href="/integrations">
                  <span className="sv-neo-btn-outline inline-flex items-center gap-2 px-8 py-4 text-sm rounded-xl">
                    See integrations <ArrowRight size={16} />
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
