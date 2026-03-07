/*
 * DESIGN: Meridian — Refined Dark Luxury with Kinetic Depth
 * HOME PAGE: Umbrella brand. Hero, sister company cards (link externally), services overview, stats.
 * Color: Rich dark #0c0e14 foundation, blue + orange accents for both divisions.
 * Typography: Sora display, Inter body.
 */
import { Link } from "wouter";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import {
  Brain,
  Globe,
  Code,
  BarChart3,
  Zap,
  ArrowRight,
  TrendingUp,
  Users,
  Target,
  Shield,
  ExternalLink,
} from "lucide-react";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663397693691/kUiTSqrNT343A8hDu8MEPH/hero-main-9pZG7rzQ25Ptgp9RFeC2bY.webp";

/* These will be updated once the standalone sites are published */
const SALESVISION_URL = "#salesvision";
const TRAVELVISION_URL = "#travelvision";

const stats = [
  { value: "500+", label: "Leads Generated Monthly", icon: TrendingUp },
  { value: "98%", label: "Client Satisfaction", icon: Users },
  { value: "50+", label: "AI Workflows Deployed", icon: Target },
  { value: "24/7", label: "Automated Operations", icon: Shield },
];

const coreServices = [
  {
    icon: Brain,
    title: "AI Automation",
    desc: "Intelligent workflows that automate lead generation, sales processes, and client engagement at scale.",
  },
  {
    icon: Globe,
    title: "Digital Marketing",
    desc: "Data-driven campaigns that reach the right audience with precision targeting and measurable ROI.",
  },
  {
    icon: Code,
    title: "Web Design & Development",
    desc: "Modern, responsive websites and web applications built with cutting-edge technology stacks.",
  },
  {
    icon: BarChart3,
    title: "Technology Consulting",
    desc: "Strategic guidance on digital transformation, system architecture, and technology adoption.",
  },
  {
    icon: Zap,
    title: "Custom Software",
    desc: "Bespoke applications tailored to your unique business requirements and growth objectives.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={HERO_BG}
            alt=""
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-darker/60 via-brand-darker/40 to-brand-darker" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-darker/80 via-transparent to-transparent" />
        </div>

        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-sv-blue/5 blur-3xl"
          animate={{ y: [0, -30, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/3 w-72 h-72 rounded-full bg-tv-orange/5 blur-3xl"
          animate={{ y: [0, 20, 0], scale: [1, 0.95, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative container pt-32 pb-20 lg:pt-40 lg:pb-32">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="section-label text-sv-blue mb-6 inline-block">
                SalesVision-Consulting
              </span>
            </motion.div>

            <motion.h1
              className="font-[Sora] text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-[1.08] tracking-tight"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              Powering Business
              <br />
              Through{" "}
              <span className="gradient-text-blue">AI</span> &{" "}
              <span className="gradient-text-orange">Innovation</span>
            </motion.h1>

            <motion.p
              className="mt-6 text-lg sm:text-xl text-white/50 leading-relaxed max-w-xl"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              We combine artificial intelligence with proven marketing strategies
              to deliver automated lead generation, sales workflows, and custom
              technology solutions that drive measurable growth.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href="/services">
                <span className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white bg-sv-blue hover:bg-sv-blue-light rounded-xl transition-all duration-200 shadow-lg shadow-sv-blue/20">
                  Explore Our Services
                  <ArrowRight size={16} />
                </span>
              </Link>
              <Link href="/contact">
                <span className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white/80 hover:text-white glass-card rounded-xl transition-all duration-200">
                  Schedule a Consultation
                </span>
              </Link>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-5 h-8 rounded-full border-2 border-white/20 flex items-start justify-center p-1">
            <motion.div
              className="w-1 h-2 rounded-full bg-white/40"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* ===== SISTER COMPANIES ===== */}
      <section className="py-24 lg:py-32 relative">
        <div className="container">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="section-label text-white/30 mb-4 inline-block">Our Divisions</span>
              <h2 className="font-[Sora] text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Two Visions, One Mission
              </h2>
              <p className="mt-4 text-white/40 max-w-2xl mx-auto text-lg">
                Specialized AI-powered solutions for two distinct industries, united under one innovative technology company.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {/* SalesVision Card */}
            <AnimatedSection delay={0.1} direction="left">
              <a href={SALESVISION_URL} target="_blank" rel="noopener noreferrer">
                <div className="group relative overflow-hidden rounded-2xl glass-card glass-card-hover p-8 lg:p-10 transition-all duration-500 h-full">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-tv-orange to-tv-gold opacity-60 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-tv-orange/5 blur-3xl group-hover:bg-tv-orange/10 transition-colors duration-500" />
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-tv-orange/10 flex items-center justify-center mb-6">
                      <BarChart3 className="w-6 h-6 text-tv-orange" />
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="font-[Sora] text-2xl font-bold text-white">
                        Sales<span className="text-tv-orange">Vision</span>
                      </h3>
                      <ExternalLink className="w-4 h-4 text-white/30 group-hover:text-tv-orange transition-colors" />
                    </div>
                    <p className="text-white/40 leading-relaxed mb-6">
                      AI-powered digital marketing agency specializing in the health insurance industry. We deliver automated lead generation, intelligent sales workflows, and recruitment services that transform how agencies acquire and convert clients.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {["Lead Generation", "Sales Automation", "Health Insurance", "Recruitment"].map((tag) => (
                        <span key={tag} className="px-3 py-1 text-xs font-medium text-tv-orange/80 bg-tv-orange/8 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-tv-orange group-hover:gap-3 transition-all">
                      Visit SalesVision <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </a>
            </AnimatedSection>

            {/* TravelVision Card */}
            <AnimatedSection delay={0.2} direction="right">
              <a href={TRAVELVISION_URL} target="_blank" rel="noopener noreferrer">
                <div className="group relative overflow-hidden rounded-2xl glass-card glass-card-hover p-8 lg:p-10 transition-all duration-500 h-full">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sv-blue to-sv-blue-light opacity-60 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-sv-blue/5 blur-3xl group-hover:bg-sv-blue/10 transition-colors duration-500" />
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-sv-blue/10 flex items-center justify-center mb-6">
                      <Globe className="w-6 h-6 text-sv-blue" />
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="font-[Sora] text-2xl font-bold text-white">
                        Travel<span className="text-sv-blue">Vision</span>
                      </h3>
                      <ExternalLink className="w-4 h-4 text-white/30 group-hover:text-sv-blue transition-colors" />
                    </div>
                    <p className="text-white/40 leading-relaxed mb-6">
                      AI-powered travel agency leveraging automation for lead generation, sales workflows, and direct booking of cruises, tours, and travel packages. We connect travelers with their dream destinations through intelligent technology.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {["Cruises", "Tours", "Flights & Hotels", "P2P Booking"].map((tag) => (
                        <span key={tag} className="px-3 py-1 text-xs font-medium text-sv-blue/80 bg-sv-blue/8 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-sv-blue group-hover:gap-3 transition-all">
                      Visit TravelVision <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </a>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ===== CORE SERVICES ===== */}
      <section className="py-24 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sv-blue/[0.02] to-transparent" />
        <div className="container relative">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="section-label text-sv-blue/60 mb-4 inline-block">What We Do</span>
              <h2 className="font-[Sora] text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Comprehensive Technology Services
              </h2>
              <p className="mt-4 text-white/40 max-w-2xl mx-auto text-lg">
                From strategy to execution, we provide end-to-end technology solutions that accelerate your business.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {coreServices.map((service, i) => (
              <AnimatedSection key={service.title} delay={i * 0.08}>
                <div className="group relative rounded-2xl glass-card glass-card-hover p-7 transition-all duration-300 h-full">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sv-blue/15 to-sv-blue/5 flex items-center justify-center mb-5">
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

          <AnimatedSection delay={0.4}>
            <div className="mt-12 text-center">
              <Link href="/services">
                <span className="inline-flex items-center gap-2 text-sm font-medium text-sv-blue hover:text-sv-blue-light transition-colors">
                  View All Services <ArrowRight size={14} />
                </span>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="py-24 lg:py-32 relative">
        <div className="container">
          <AnimatedSection>
            <div className="rounded-2xl glass-card p-10 lg:p-16">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                  >
                    <stat.icon className="w-6 h-6 text-sv-blue mx-auto mb-3 opacity-60" />
                    <div className="font-[Sora] text-3xl sm:text-4xl font-bold text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-white/40">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sv-blue/5 via-transparent to-tv-orange/5" />
        <div className="container relative">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-[Sora] text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Ready to Transform Your Business?
              </h2>
              <p className="mt-5 text-white/40 text-lg">
                Let us show you how AI-powered automation can revolutionize your lead generation, streamline your sales process, and accelerate growth.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link href="/contact">
                  <span className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold text-white bg-sv-blue hover:bg-sv-blue-light rounded-xl transition-all duration-200 shadow-lg shadow-sv-blue/20">
                    Start Your Journey
                    <ArrowRight size={16} />
                  </span>
                </Link>
                <Link href="/about">
                  <span className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold text-white/70 hover:text-white glass-card rounded-xl transition-all duration-200">
                    Meet Our Team
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
