/*
 * DESIGN: VanRein-inspired light theme with blue & orange accents
 * HOME PAGE: Umbrella brand. Hero, sister company cards, services overview, stats.
 * Clean layout, light backgrounds, blue + orange accents.
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
  Workflow,
  Film,
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
    title: "Custom Development",
    desc: "Bespoke applications tailored to your unique business requirements and growth objectives.",
  },
  {
    icon: Film,
    title: "Video/Audio Editing",
    desc: "Professional video and audio editing for social media — create engaging content that stands out on your channels.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          {/* Animated gradient background — blue/purple with yellow accents */}
          <div className="hero-animated-bg absolute inset-0" aria-hidden />
          <img
            src={HERO_BG}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/50 to-white/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-transparent to-transparent" />
        </div>

        {/* Floating morph blobs */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-[32rem] h-[32rem] rounded-full bg-sv-blue/30 blur-[100px]"
          animate={{
            x: [0, 80, 0],
            y: [0, -40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-[28rem] h-[28rem] rounded-full bg-purple-500/25 blur-[80px]"
          animate={{
            x: [0, -60, 0],
            y: [0, 30, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 right-1/3 w-72 h-72 rounded-full bg-amber-400/20 blur-[60px]"
          animate={{
            x: [0, 40, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative container pt-24 pb-16 lg:pt-28 lg:pb-24 min-h-[80vh] flex flex-col items-center justify-center text-center">
          <div className="w-full max-w-3xl mx-auto flex flex-col items-center gap-6 sm:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="section-label text-[0.65rem] text-sv-blue">
                SalesVision-Consulting
              </span>
            </motion.div>

            <motion.h1
              className="font-[Sora] hero-masked-text leading-[1.08] tracking-tight"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              Powering Business
              <br />
              Through AI & Innovation
            </motion.h1>

            <motion.p
              className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              We combine artificial intelligence with proven marketing strategies
              to deliver automated lead generation, sales workflows, and custom
              technology solutions that drive measurable growth.
            </motion.p>

            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href="/services">
                <span className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold text-white bg-sv-blue hover:bg-sv-blue-light rounded-xl transition-all duration-200 shadow-lg shadow-sv-blue/20">
                  Explore Our Services
                  <ArrowRight size={14} />
                </span>
              </Link>
              <Link href="/contact">
                <span className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold text-foreground/80 hover:text-foreground border border-border rounded-xl transition-all duration-200 hover:bg-muted/50">
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
          <div className="w-5 h-8 rounded-full border-2 border-foreground/30 flex items-start justify-center p-1">
            <motion.div
              className="w-1 h-2 rounded-full bg-foreground/50"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* ===== CORE SERVICES ===== */}
      <hr className="section-divider w-11/12 sm:w-3/4" aria-hidden />
      <section className="py-24 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sv-blue/[0.02] to-transparent" />
        <div className="container relative">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="section-accent mx-auto mb-4" />
              <span className="section-label text-sv-blue/60 mb-4 inline-block">What We Do</span>
              <h2 className="font-[Sora] text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
                Technology Assistance Where You Need It
              </h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
                We help small and medium-sized businesses innovate and grow. We also contract into larger projects where our specializations align.
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
                  <h3 className="font-[Sora] text-lg font-semibold text-foreground mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
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

      <hr className="section-divider w-11/12 sm:w-3/4" aria-hidden />
      {/* ===== PRE-BUILT WORKFLOWS ===== */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sv-blue/5 via-transparent to-tv-orange/5" />
        <div className="container relative">
          <Link href="/workflows">
            <AnimatedSection>
              <div className="group rounded-2xl glass-card glass-card-hover p-8 lg:p-10 transition-all duration-500">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-xl bg-sv-blue/10 flex items-center justify-center flex-shrink-0">
                      <Workflow className="w-7 h-7 text-sv-blue" />
                    </div>
                    <div>
                      <span className="section-label text-sv-blue/60 mb-2 inline-block">Pre-Built for Sales Teams</span>
                      <h2 className="font-[Sora] text-2xl sm:text-3xl font-bold text-foreground tracking-tight mb-3">
                        AI Workflows for Individual Agents & Small Teams
                      </h2>
                      <p className="text-muted-foreground max-w-2xl">
                        Ready-to-use automation workflows for Insurance, Travel Agents, and Real Estate. Get started quickly — no enterprise setup required.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 lg:flex-shrink-0">
                    {["Insurance", "Travel Agents", "Real Estate"].map((industry) => (
                      <span key={industry} className="px-4 py-2 rounded-lg bg-muted/80 text-sm text-muted-foreground border border-border">
                        {industry}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-border flex items-center gap-2 text-sm font-medium text-sv-blue group-hover:gap-3 transition-all">
                  Explore Workflows <ArrowRight size={14} />
                </div>
              </div>
            </AnimatedSection>
          </Link>
        </div>
      </section>

      <hr className="section-divider w-11/12 sm:w-3/4" aria-hidden />
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
                    <div className="font-[Sora] text-3xl sm:text-4xl font-bold text-foreground mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <hr className="section-divider w-11/12 sm:w-3/4" aria-hidden />
      {/* ===== CTA SECTION ===== */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sv-blue/5 via-transparent to-tv-orange/5" />
        <div className="container relative">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-[Sora] text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
                Ready to Transform Your Business?
              </h2>
              <p className="mt-5 text-muted-foreground text-lg">
                Let us show you how AI-powered automation can revolutionize your lead generation, streamline your sales process, and accelerate growth.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link href="/contact">
                  <span className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold text-white bg-sv-blue hover:bg-sv-blue-light rounded-xl transition-all duration-200 shadow-lg shadow-sv-blue/20">
                    Start Your Journey
                    <ArrowRight size={16} />
                  </span>
                </Link>
                <a
                  href="https://portfolio.salesvision-consulting.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold text-foreground/80 hover:text-foreground border border-border rounded-xl transition-all duration-200 hover:bg-muted/50">
                    About
                  </span>
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <hr className="section-divider w-11/12 sm:w-3/4" aria-hidden />
      {/* ===== OUR DIVISIONS ===== */}
      <section className="py-24 lg:py-32 relative">
        <div className="container">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="section-accent mx-auto mb-4" />
              <span className="section-label text-muted-foreground mb-4 inline-block">Our Divisions</span>
              <h2 className="font-[Sora] text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
                Two Visions, One Mission
              </h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
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
                      <h3 className="font-[Sora] text-2xl font-bold text-foreground">
                        Sales<span className="text-tv-orange">Vision</span>
                      </h3>
                      <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-tv-orange transition-colors" />
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      AI-powered digital marketing agency specializing in health insurance and real estate. We deliver automated lead generation, intelligent sales workflows, and recruitment services that transform how agencies acquire and convert clients.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {["Lead Generation", "Sales Automation", "Health Insurance", "Real Estate", "Recruitment"].map((tag) => (
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
                      <h3 className="font-[Sora] text-2xl font-bold text-foreground">
                        Travel<span className="text-sv-blue">Vision</span>
                      </h3>
                      <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-sv-blue transition-colors" />
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-6">
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
    </div>
  );
}
