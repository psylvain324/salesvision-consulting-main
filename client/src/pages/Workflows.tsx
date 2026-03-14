/*
 * DESIGN: Meridian — Refined Dark Luxury
 * WORKFLOWS PAGE: Pre-built AI workflows for individual sales agents and small teams.
 * Three target industries: Insurance, Travel Agents, Real Estate.
 */
import { Link } from "wouter";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import {
  ArrowRight,
  Shield,
  Plane,
  Home,
  Workflow,
  Zap,
  Target,
} from "lucide-react";

const WORKFLOWS_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663397693691/kUiTSqrNT343A8hDu8MEPH/services-bg-dU46apvAdVMG8nCCTSLxrX.webp";

const industries = [
  {
    id: "insurance",
    icon: Shield,
    title: "Insurance",
    tagline: "Health, life, and property & casualty",
    desc: "Pre-built workflows that automate lead qualification, client follow-ups, policy renewals, and appointment scheduling. Built for individual agents and small agencies who want to close more deals without the overhead.",
    workflows: [
      "Lead scoring & qualification automation",
      "Renewal reminder sequences",
      "Appointment booking & reminders",
      "Client nurture campaigns",
    ],
    iconBg: "bg-sv-blue/10",
    iconColor: "text-sv-blue",
    labelColor: "text-sv-blue/60",
  },
  {
    id: "travel",
    icon: Plane,
    title: "Travel Agents",
    tagline: "Cruises, tours, and custom itineraries",
    desc: "AI workflows designed for travel professionals — automate inquiry responses, itinerary follow-ups, booking confirmations, and re-engagement for past travelers. Scale your book of business without hiring more staff.",
    workflows: [
      "Inquiry response & qualification",
      "Post-booking follow-ups",
      "Re-engagement for past clients",
      "Package & promotion campaigns",
    ],
    iconBg: "bg-tv-orange/10",
    iconColor: "text-tv-orange",
    labelColor: "text-tv-orange/60",
  },
  {
    id: "real-estate",
    icon: Home,
    title: "Real Estate",
    tagline: "Agents, teams, and small brokerages",
    desc: "Workflows that handle lead intake, drip campaigns, open house follow-ups, and transaction check-ins. Whether you're a solo agent or a small team, stay top of mind without manual outreach.",
    workflows: [
      "Lead intake & routing",
      "Listing & market update drips",
      "Open house follow-up sequences",
      "Transaction milestone check-ins",
    ],
    iconBg: "bg-sv-blue/10",
    iconColor: "text-sv-blue",
    labelColor: "text-sv-blue/60",
  },
];

const stats = [
  { value: "3", label: "Industry Workflows" },
  { value: "50+", label: "Workflows Deployed" },
  { value: "24/7", label: "Automated Operations" },
];

export default function Workflows() {
  return (
    <div className="min-h-screen bg-brand-darker dark">
      {/* ===== HERO ===== */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={WORKFLOWS_BG} alt="" className="w-full h-full object-cover" />
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
              Pre-Built Workflows
            </motion.span>
            <motion.h1
              className="font-[Sora] text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              AI Workflows for
              <br />
              <span className="gradient-text-blue">Sales Agents & Small Teams</span>
            </motion.h1>
            <motion.p
              className="mt-6 text-lg text-white/90 leading-relaxed max-w-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Ready-to-use automation workflows tailored for individual sales professionals and small teams. No enterprise setup required — get started quickly in Insurance, Travel, or Real Estate.
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

      {/* ===== STATS ===== */}
      <section className="py-16 lg:py-20 border-y border-white/10">
        <div className="container">
          <div className="grid grid-cols-3 gap-8 lg:gap-12">
            {stats.map((stat, i) => (
              <div key={stat.label} className="text-center">
                <p className="font-[Sora] text-3xl sm:text-4xl font-bold text-white tracking-tight">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-white/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="section-divider w-11/12 sm:w-3/4" aria-hidden />
      {/* ===== INDUSTRIES ===== */}
      <section className="py-24 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sv-blue/[0.02] to-transparent" />
        <div className="container relative">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="section-accent mx-auto mb-4" />
              <span className="section-label text-white/80 mb-4 inline-block">Target Industries</span>
              <h2 className="font-[Sora] text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Workflows by Industry
              </h2>
              <p className="mt-4 text-white/85 max-w-2xl mx-auto text-lg">
                Our pre-built workflows are designed for the unique sales cycles and compliance needs of each industry.
              </p>
            </div>
          </AnimatedSection>

          <div className="space-y-16">
            {industries.map((industry, i) => (
              <AnimatedSection key={industry.id} delay={0.1}>
                {i > 0 && <hr className="section-divider w-full max-w-2xl mx-auto my-12 opacity-60" aria-hidden />}
                <div className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-start ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                  <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 rounded-xl ${industry.iconBg} flex items-center justify-center`}>
                        <industry.icon className={`w-6 h-6 ${industry.iconColor}`} />
                      </div>
                      <span className={`section-label ${industry.labelColor}`}>{industry.tagline}</span>
                    </div>
                    <h2 className="font-[Sora] text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
                      {industry.title}
                    </h2>
                    <p className="text-white/85 leading-relaxed text-base mb-6">
                      {industry.desc}
                    </p>
                    <Link href="/contact">
                      <span className="inline-flex items-center gap-2 text-sm font-medium text-sv-blue hover:text-sv-blue-light transition-colors">
                        Get Started <ArrowRight size={14} />
                      </span>
                    </Link>
                  </div>
                  <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                    <div className="rounded-2xl glass-card p-7">
                      <h4 className="font-[Sora] text-sm font-semibold text-white/90 mb-5 uppercase tracking-wider">
                        Included Workflows
                      </h4>
                      <div className="space-y-3">
                        {industry.workflows.map((workflow) => (
                          <div
                            key={workflow}
                            className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] transition-colors"
                          >
                            <Workflow className="w-5 h-5 text-sv-blue flex-shrink-0" />
                            <span className="text-sm text-white/90">{workflow}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <hr className="section-divider w-11/12 sm:w-3/4" aria-hidden />
      {/* ===== WHY CHOOSE ===== */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sv-blue/5 via-transparent to-tv-orange/5" />
        <div className="container relative">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="section-accent mx-auto mb-4" />
              <span className="section-label text-sv-blue/60 mb-4 inline-block">Built for You</span>
              <h2 className="font-[Sora] text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Why Our Workflows
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <AnimatedSection delay={0.1}>
              <div className="rounded-2xl glass-card p-6 text-center">
                <Zap className="w-10 h-10 text-sv-blue mx-auto mb-4" />
                <h3 className="font-[Sora] text-lg font-semibold text-white mb-2">Ready to Go</h3>
                <p className="text-sm text-white/85">Pre-built and configurable. No long custom build-outs — launch in days, not months.</p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <div className="rounded-2xl glass-card p-6 text-center">
                <Target className="w-10 h-10 text-sv-blue mx-auto mb-4" />
                <h3 className="font-[Sora] text-lg font-semibold text-white mb-2">Industry-Specific</h3>
                <p className="text-sm text-white/85">Designed for your industry's sales cycle, compliance needs, and common objections.</p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="rounded-2xl glass-card p-6 text-center">
                <Workflow className="w-10 h-10 text-sv-blue mx-auto mb-4" />
                <h3 className="font-[Sora] text-lg font-semibold text-white mb-2">Scalable</h3>
                <p className="text-sm text-white/85">Start as a solo agent and grow. Add more workflows or team seats as you scale.</p>
              </div>
            </AnimatedSection>
          </div>
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
                Ready to Automate Your Sales?
              </h2>
              <p className="mt-5 text-white/85 text-lg">
                Tell us which industry you're in and we'll show you how our workflows can help you close more deals.
              </p>
              <div className="mt-10">
                <Link href="/contact">
                  <span className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold text-white bg-sv-blue hover:bg-sv-blue-light rounded-xl transition-all duration-200 shadow-lg shadow-sv-blue/20">
                    Schedule a Demo <ArrowRight size={16} />
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
