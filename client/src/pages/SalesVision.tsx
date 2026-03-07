/*
 * DESIGN: Meridian — Refined Dark Luxury
 * SALESVISION PAGE: Blue color temperature. AI-powered digital marketing for health insurance.
 * Accent: Electric blue gradient (#3b82f6 → #60a5fa)
 */
import { Link } from "wouter";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import {
  ArrowRight,
  Brain,
  Target,
  Users,
  Workflow,
  BarChart3,
  Shield,
  HeartPulse,
  Megaphone,
  UserPlus,
} from "lucide-react";

const SV_HERO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663397693691/kUiTSqrNT343A8hDu8MEPH/salesvision-hero-WBCaH6QcGMY6Umd2bjAm5S.webp";

const services = [
  {
    icon: Target,
    title: "AI Lead Generation",
    desc: "Our proprietary AI algorithms identify and qualify high-intent prospects in the health insurance market, delivering warm leads directly to your sales team with detailed prospect profiles and engagement scores.",
  },
  {
    icon: Workflow,
    title: "Automated Sales Workflows",
    desc: "End-to-end sales automation that nurtures leads through personalized email sequences, SMS follow-ups, and intelligent scheduling — converting prospects into clients while you focus on closing deals.",
  },
  {
    icon: UserPlus,
    title: "Recruitment Services",
    desc: "AI-driven recruitment solutions that identify, screen, and engage top talent for health insurance agencies. We automate the hiring pipeline so you can scale your team efficiently.",
  },
  {
    icon: Megaphone,
    title: "Digital Marketing Campaigns",
    desc: "Data-driven marketing campaigns across social media, search engines, and display networks, specifically optimized for the health insurance vertical with compliance-aware messaging.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Reporting",
    desc: "Real-time dashboards and comprehensive reporting that track every touchpoint in your sales funnel, providing actionable insights to optimize conversion rates and ROI.",
  },
  {
    icon: Shield,
    title: "Compliance & Security",
    desc: "All our solutions are built with HIPAA compliance and data security at the core, ensuring your client data and marketing practices meet the highest regulatory standards.",
  },
];

const process = [
  {
    step: "01",
    title: "Discovery & Strategy",
    desc: "We analyze your current sales process, target market, and growth objectives to build a customized AI automation strategy.",
  },
  {
    step: "02",
    title: "System Integration",
    desc: "Our team integrates AI-powered tools into your existing CRM and sales infrastructure with minimal disruption.",
  },
  {
    step: "03",
    title: "Launch & Optimize",
    desc: "We deploy automated workflows and continuously optimize based on real-time performance data and conversion metrics.",
  },
  {
    step: "04",
    title: "Scale & Grow",
    desc: "As results compound, we scale successful campaigns and expand automation across your entire sales operation.",
  },
];

export default function SalesVision() {
  return (
    <div className="min-h-screen">
      {/* ===== HERO ===== */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={SV_HERO} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-darker/70 via-brand-darker/50 to-brand-darker" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-darker/90 via-brand-darker/40 to-transparent" />
        </div>

        <div className="relative container pt-32 pb-20">
          <div className="max-w-3xl">
            <motion.span
              className="section-label text-sv-blue mb-6 inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              SalesVision Division
            </motion.span>
            <motion.h1
              className="font-[Sora] text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              AI-Powered Marketing
              <br />
              for <span className="gradient-text-blue">Health Insurance</span>
            </motion.h1>
            <motion.p
              className="mt-6 text-lg text-white/50 leading-relaxed max-w-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              We leverage artificial intelligence to deliver automated lead generation,
              intelligent sales workflows, and recruitment services specifically designed
              for the health insurance industry.
            </motion.p>
            <motion.div
              className="mt-10 flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <Link href="/contact">
                <span className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white bg-sv-blue hover:bg-sv-blue-light rounded-xl transition-all duration-200 shadow-lg shadow-sv-blue/20">
                  Get Started <ArrowRight size={16} />
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== INDUSTRY FOCUS ===== */}
      <section className="py-24 lg:py-32">
        <div className="container">
          <AnimatedSection>
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <span className="section-label text-sv-blue/60 mb-4 inline-block">Industry Focus</span>
                <h2 className="font-[Sora] text-3xl sm:text-4xl font-bold text-white tracking-tight">
                  Built for the Health Insurance Market
                </h2>
                <p className="mt-5 text-white/40 leading-relaxed text-lg">
                  The health insurance industry demands precision, compliance, and trust.
                  Our AI-powered solutions are specifically engineered for this vertical,
                  understanding the unique challenges of ACA enrollment periods, Medicare
                  supplements, and group health plans.
                </p>
                <div className="mt-8 grid grid-cols-2 gap-4">
                  {[
                    { icon: HeartPulse, label: "ACA & Medicare" },
                    { icon: Shield, label: "HIPAA Compliant" },
                    { icon: Users, label: "Agent Recruitment" },
                    { icon: Brain, label: "AI-Driven Insights" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03]">
                      <item.icon className="w-5 h-5 text-sv-blue flex-shrink-0" />
                      <span className="text-sm text-white/60 font-medium">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="rounded-2xl glass-card p-8 lg:p-10">
                  <div className="space-y-6">
                    {[
                      { metric: "3x", label: "Average increase in qualified leads" },
                      { metric: "67%", label: "Reduction in cost per acquisition" },
                      { metric: "85%", label: "Lead response time improvement" },
                      { metric: "40%", label: "Higher conversion rates" },
                    ].map((item, i) => (
                      <div key={item.label} className="flex items-center gap-5">
                        <motion.div
                          className="font-[Sora] text-2xl font-bold text-sv-blue w-16 text-right"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                        >
                          {item.metric}
                        </motion.div>
                        <div className="flex-1 text-sm text-white/50">{item.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== SERVICES GRID ===== */}
      <section className="py-24 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sv-blue/[0.02] to-transparent" />
        <div className="container relative">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="section-label text-sv-blue/60 mb-4 inline-block">Our Services</span>
              <h2 className="font-[Sora] text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                What We Deliver
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, i) => (
              <AnimatedSection key={service.title} delay={i * 0.08}>
                <div className="group rounded-2xl glass-card glass-card-hover p-7 transition-all duration-300 h-full">
                  <div className="w-11 h-11 rounded-xl bg-sv-blue/10 flex items-center justify-center mb-5 group-hover:bg-sv-blue/15 transition-colors">
                    <service.icon className="w-5 h-5 text-sv-blue" />
                  </div>
                  <h3 className="font-[Sora] text-lg font-semibold text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-white/40 leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROCESS ===== */}
      <section className="py-24 lg:py-32">
        <div className="container">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="section-label text-sv-blue/60 mb-4 inline-block">Our Process</span>
              <h2 className="font-[Sora] text-3xl sm:text-4xl font-bold text-white tracking-tight">
                How We Work
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((item, i) => (
              <AnimatedSection key={item.step} delay={i * 0.1}>
                <div className="relative p-7 rounded-2xl glass-card h-full">
                  <span className="font-[Sora] text-4xl font-bold text-sv-blue/15">
                    {item.step}
                  </span>
                  <h3 className="font-[Sora] text-lg font-semibold text-white mt-3 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/40 leading-relaxed">
                    {item.desc}
                  </p>
                  {i < process.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-white/10" />
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sv-blue/8 via-transparent to-transparent" />
        <div className="container relative">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-[Sora] text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Ready to Supercharge Your Sales Pipeline?
              </h2>
              <p className="mt-5 text-white/40 text-lg">
                Join health insurance agencies that have transformed their lead generation
                and sales processes with our AI-powered solutions.
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
