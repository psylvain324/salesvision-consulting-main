/*
 * CUSTOM DEVELOPMENT PAGE: Bespoke software and applications.
 * Light theme, blue & indigo accents — matches other service pages.
 */
import { Link } from "wouter";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import ScrollDownButton from "@/components/ScrollDownButton";
import {
  ArrowRight,
  Code,
  Database,
  Layers,
  Cpu,
  Globe,
  Shield,
  Palette,
} from "lucide-react";

const CUSTOM_BG = "/Images/Background_Futuristic_1.jpeg";

const serviceIconColors: Record<string, { bg: string; text: string; dot: string; hover: string }> = {
  indigo: { bg: "bg-indigo-500/15", text: "text-indigo-600", dot: "bg-indigo-600", hover: "hover:border-indigo-500/40 hover:shadow-lg hover:shadow-indigo-500/10" },
  blue: { bg: "bg-sv-blue/10", text: "text-sv-blue", dot: "bg-sv-blue", hover: "hover:border-sv-blue/40 hover:shadow-lg hover:shadow-sv-blue/10" },
  violet: { bg: "bg-violet-500/15", text: "text-violet-600", dot: "bg-violet-600", hover: "hover:border-violet-500/40 hover:shadow-lg hover:shadow-violet-500/10" },
  emerald: { bg: "bg-emerald-500/15", text: "text-emerald-600", dot: "bg-emerald-600", hover: "hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/10" },
  orange: { bg: "bg-tv-orange/15", text: "text-tv-orange", dot: "bg-tv-orange", hover: "hover:border-tv-orange/40 hover:shadow-lg hover:shadow-tv-orange/10" },
  rose: { bg: "bg-rose-500/15", text: "text-rose-600", dot: "bg-rose-600", hover: "hover:border-rose-500/40 hover:shadow-lg hover:shadow-rose-500/10" },
};

const serviceAreas = [
  {
    id: "web-design",
    icon: Palette,
    color: "blue" as const,
    title: "Web Design & Front-End",
    desc: "Brand-led, conversion-focused sites and product UI — responsive layouts, design systems, accessibility, and performance so your first impression matches your offer. Ideal when you need marketing sites, landing pages, or a polished shell on top of custom backends.",
    features: ["UX & visual design", "Responsive / mobile-first", "Core Web Vitals & SEO-friendly structure", "Design-to-code handoff"],
  },
  {
    id: "web-apps",
    icon: Globe,
    color: "indigo" as const,
    title: "Web Applications",
    desc: "Full-stack web applications built for scale. From SaaS platforms to internal tools, we deliver modern, responsive solutions with clean architecture and maintainable code.",
    features: ["React, Next.js & Node.js", "Real-time Features", "Cloud Deployment", "Performance Optimization"],
  },
  {
    id: "apis",
    icon: Layers,
    color: "blue" as const,
    title: "API Design & Integration",
    desc: "Custom APIs that connect your systems and enable third-party integrations. RESTful and GraphQL APIs designed for reliability, security, and developer experience.",
    features: ["REST & GraphQL APIs", "Third-Party Integrations", "Authentication & Security", "API Documentation"],
  },
  {
    id: "database",
    icon: Database,
    color: "violet" as const,
    title: "Database & Data Architecture",
    desc: "Data models and database solutions tuned for your workload. We design schemas, optimize queries, and build ETL pipelines that scale with your business.",
    features: ["PostgreSQL, MongoDB", "Data Modeling", "Query Optimization", "ETL & Pipelines"],
  },
  {
    id: "automation",
    icon: Cpu,
    color: "emerald" as const,
    title: "Automation & Scripting",
    desc: "Internal tools and automation scripts that eliminate manual work. From report generators to workflow engines, we build solutions that save time and reduce errors.",
    features: ["Custom Scripts & Tools", "Workflow Automation", "Reporting & Dashboards", "Scheduled Jobs"],
  },
  {
    id: "security",
    icon: Shield,
    color: "orange" as const,
    title: "Security & Compliance",
    desc: "Security-first development practices. Authentication, authorization, encryption, and compliance considerations built into every project from day one.",
    features: ["Auth & Access Control", "Data Encryption", "Audit Logging", "Compliance Ready"],
  },
];

const stats = [
  { value: "15+", label: "Projects Delivered" },
  { value: "99.9%", label: "Uptime Target" },
  { value: "48hr", label: "Avg. Response Time" },
];

export default function CustomDevelopment() {
  return (
    <div className="min-h-screen">
      {/* ===== HERO ===== */}
      <section id="section-hero" className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={CUSTOM_BG} alt="" className="w-full h-full object-cover object-center opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/50 to-white/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-transparent to-transparent" />
        </div>

        <div className="relative container pt-32 pb-20">
          <div className="max-w-3xl">
            <motion.span
              className="section-label text-sv-blue/60 mb-6 inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Custom Development
            </motion.span>
            <motion.h1
              className="font-[Sora] text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Bespoke Solutions for
              <br />
              <span className="gradient-text-blue">Unique Challenges</span>
            </motion.h1>
            <motion.p
              className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              When off-the-shelf software falls short, we build custom applications tailored to your exact requirements. Scalable, secure, and built to grow with you.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section id="section-stats" className="py-16 lg:py-20 border-y border-border">
        <div className="container">
          <div className="grid grid-cols-3 gap-8 lg:gap-12">
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
        <div className="relative pb-8">
          <ScrollDownButton to="section-services" className="!relative !bottom-0 py-4" />
        </div>
      </section>

      <hr className="section-divider section-divider-lg w-11/12 sm:w-3/4" aria-hidden />
      {/* ===== SERVICE AREAS ===== */}
      <section id="section-services" className="py-24 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sv-blue/[0.02] to-transparent" />
        <div className="container relative">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="section-label text-sv-blue/60 mb-4 inline-block">What We Build</span>
              <h2 className="font-[Sora] text-3xl sm:text-4xl font-bold uppercase tracking-tight gradient-text-logo">
                Full-Spectrum Development
              </h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
                From web apps and APIs to data pipelines and automation — we deliver solutions that fit your workflow.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceAreas.map((area, i) => {
              const colors = serviceIconColors[area.color];
              return (
              <AnimatedSection key={area.id} delay={i * 0.05}>
                <div
                  id={area.id}
                  className={`rounded-2xl glass-card glass-card-hover p-7 h-full flex flex-col transition-all duration-300 border border-transparent scroll-mt-24 ${colors.hover}`}
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${serviceIconColors[area.color].bg}`}>
                    <area.icon className={`w-5 h-5 ${serviceIconColors[area.color].text}`} />
                  </div>
                  <h3 className="font-[Sora] text-lg font-semibold text-foreground mb-2">
                    {area.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
                    {area.desc}
                  </p>
                  <ul className="space-y-1.5">
                    {area.features.map((feature) => (
                      <li key={feature} className="text-xs text-muted-foreground flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${serviceIconColors[area.color].dot}`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            );
          })}
          </div>

          <AnimatedSection delay={0.3}>
            <div className="mt-16 text-center">
              <Link href="/contact">
                <span className="inline-flex items-center gap-2 text-sm font-medium text-sv-blue hover:text-sv-blue-light transition-colors">
                  Discuss Your Project <ArrowRight size={14} />
                </span>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <hr className="section-divider section-divider-lg w-11/12 sm:w-3/4" aria-hidden />
      {/* ===== CTA ===== */}
      <section id="section-cta" className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sv-blue/5 via-transparent to-tv-orange/5" />
        <div className="container relative">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-[Sora] text-3xl sm:text-4xl font-bold uppercase tracking-tight gradient-text-logo">
                Ready to Build Something Custom?
              </h2>
              <p className="mt-5 text-muted-foreground text-lg">
                Tell us about your project. We'll scope it, design a solution, and deliver code that works.
              </p>
              <div className="mt-10">
                <Link href="/contact">
                  <span className="sv-neo-btn sv-neo-btn--blue inline-flex items-center gap-2 px-8 py-4 text-sm rounded-xl">
                    Start a Project <ArrowRight size={16} />
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
