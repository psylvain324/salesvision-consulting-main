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
  Film,
  Megaphone,
  Plug2,
} from "lucide-react";
import ScrollDownButton from "@/components/ScrollDownButton";

const HERO_BG = "/Images/Background_Futuristic_2.webp";

/* These will be updated once the standalone sites are published */
const SALESVISION_URL = "#salesvision";
const TRAVELVISION_URL = "#travelvision";

const statIconColors = ["text-emerald-600", "text-violet-600", "text-sv-blue", "text-amber-600"];

const stats = [
  { value: "500+", label: "Leads Generated Monthly", icon: TrendingUp },
  { value: "98%", label: "Client Satisfaction", icon: Users },
  { value: "50+", label: "AI Workflows Deployed", icon: Target },
  { value: "24/7", label: "Automated Operations", icon: Shield },
];

const serviceIconColors: Record<string, { bg: string; text: string }> = {
  violet: { bg: "bg-violet-500/15", text: "text-violet-600" },
  orange: { bg: "bg-tv-orange/15", text: "text-tv-orange" },
  emerald: { bg: "bg-emerald-500/15", text: "text-emerald-600" },
  blue: { bg: "bg-sv-blue/15", text: "text-sv-blue" },
  indigo: { bg: "bg-indigo-500/15", text: "text-indigo-600" },
  rose: { bg: "bg-rose-500/15", text: "text-rose-600" },
};

/** Iridescent neumorphic CTA tone — matches `sv-neo-btn--*` in index.css */
const svNeoToneClass: Record<string, string> = {
  violet: "sv-neo-btn--violet",
  orange: "sv-neo-btn--orange",
  emerald: "sv-neo-btn--emerald",
  blue: "sv-neo-btn--blue",
  indigo: "sv-neo-btn--indigo",
  rose: "sv-neo-btn--rose",
};

const coreServices = [
  {
    icon: Brain,
    label: "AUTOMATION",
    title: "AI Automation",
    desc: "Intelligent workflows that automate lead generation, sales processes, and client engagement at scale. From follow-up sequences to lead scoring and CRM integration—we build automation that saves time and boosts conversions.",
    color: "violet" as const,
    href: "/workflows",
    imageSrc: "/Images/Logos/Dev2.png",
  },
  {
    icon: Globe,
    label: "CAMPAIGNS",
    title: "Digital Marketing",
    desc: "Data-driven campaigns that reach the right audience with precision targeting and measurable ROI. We run SEO, paid ads, social media, and email campaigns—with clear reporting so you see exactly what’s working.",
    color: "orange" as const,
    href: "/marketing-media",
    imageSrc: "/Images/Logos/Marketing_Logo_4.png",
  },
  {
    icon: Code,
    label: "WEBSITES",
    title: "Web Design & Development",
    desc: "Modern, responsive websites and web applications built with cutting-edge technology stacks. Fast loading, mobile-first, and designed to convert—whether you need a simple landing page or a full e‑commerce site.",
    color: "emerald" as const,
    href: "/custom-development#web-design",
    imageSrc: "/Images/Logos/Dev1.png",
  },
  {
    icon: BarChart3,
    label: "STRATEGY",
    title: "Technology Consulting",
    desc: "Strategic guidance on digital transformation, system architecture, and technology adoption. We help you choose the right tools, streamline workflows, and scale your operations without the guesswork.",
    color: "blue" as const,
    href: "/integrations#section-consulting",
    imageSrc: "/Images/Logos/Marketing_Logo_5.png",
  },
  {
    icon: Zap,
    label: "BESPOKE",
    title: "Custom Development",
    desc: "Bespoke applications tailored to your unique business requirements and growth objectives. Web apps, APIs, databases, and automation tools—built to fit your workflow and scale as you grow.",
    color: "indigo" as const,
    href: "/custom-development",
    imageSrc: "/Images/Logos/CustomDev_Logo_2.png",
  },
  {
    icon: Film,
    label: "CONTENT",
    title: "Video/Audio Editing",
    desc: "Professional video and audio editing for social media—create engaging content that stands out on your channels. Reels, ads, podcasts, and branded content designed to stop the scroll and drive engagement.",
    color: "rose" as const,
    href: "/marketing-media#video-production",
    imageSrc: "/Images/Logos/Audio2.png",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* ===== HERO SECTION ===== */}
      <section id="section-hero" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          {/* Animated gradient background — blue/purple with yellow accents */}
          <div className="hero-animated-bg absolute inset-0" aria-hidden />
          <img
            src={HERO_BG}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center opacity-40 hero-bg-drift"
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
            </motion.div>

            <motion.h1
              className="font-[Sora] hero-masked-text hero-masked-text--home leading-[1.08] tracking-tight"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              Powering Business
              <br />
              Through AI & Innovation
            </motion.h1>

            <motion.div
              className="mx-auto max-w-2xl"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-center text-lg sm:text-xl text-white font-light leading-relaxed tracking-tight [text-shadow:0_1px_3px_rgba(0,0,0,0.4),0_2px_8px_rgba(0,0,0,0.3)]">
                We combine artificial intelligence with proven marketing strategies
                to deliver automated lead generation, sales workflows, and custom
                technology solutions that drive measurable growth.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href="/services"
                className="sv-neo-btn sv-neo-btn--blue inline-flex items-center gap-2 px-7 py-3.5 text-sm rounded-xl"
              >
                Explore Our Services
                <ArrowRight size={15} />
              </Link>
              <Link
                href="/workflows"
                className="sv-neo-btn sv-neo-btn--purple inline-flex items-center gap-2 px-7 py-3.5 text-sm rounded-xl"
              >
                Explore Workflows
                <ArrowRight size={15} />
              </Link>
            </motion.div>
          </div>
        </div>

        <ScrollDownButton to="section-services" light className="bottom-8" />
      </section>

      {/* ===== CORE SERVICES — Treppy-style alternating layout ===== */}
      <section id="section-services" className="py-24 lg:py-32 relative overflow-hidden">
        {/* Subtle gradient in the middle — similar to Treppy */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sv-blue/[0.03] via-purple-500/[0.02] to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-sv-blue/[0.02] to-transparent" />

        <div className="w-full max-w-[min(92rem,calc(100vw-1rem))] mx-auto px-3 sm:px-4 lg:px-4 xl:px-5 relative">
          <AnimatedSection>
            <div className="text-center mb-16 lg:mb-20">
              <span className="section-label text-sv-blue/85 mb-4 inline-block text-base [text-shadow:0_1px_3px_rgba(0,0,0,0.12)]">What We Do</span>
              <h2 className="font-[Sora] text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight">
                <span className="gradient-text-blend-dark">Technology Assistance Where</span>{" "}
                <span className="gradient-text-blend">You Need it</span>
              </h2>
              <p className="mt-4 text-muted-foreground max-w-[min(52rem,calc(100%-1rem))] mx-auto text-lg lg:text-[1.125rem]">
                We help small and medium-sized businesses innovate and grow. We also contract into larger projects where our specializations align.
              </p>
            </div>
          </AnimatedSection>

          <div className="space-y-10 lg:space-y-14 w-full max-w-[74rem] mx-auto lg:px-0">
            {coreServices.map((service, i) => {
              const isEven = i % 2 === 1;
              const IconComponent = service.icon;
              const colors = serviceIconColors[service.color];
              return (
                <AnimatedSection key={service.title} delay={i * 0.06} className="w-full">
                  <div className="w-full">
                    <div
                      className={`flex flex-col gap-10 items-center w-full justify-center max-w-[69rem] mx-auto lg:gap-24 xl:gap-28 ${
                        isEven ? "lg:flex-row-reverse" : "lg:flex-row"
                      }`}
                    >
                      {/* Content block — shared max width so label, title, body, CTA align; mirrored for R/L rows */}
                      <div
                        className={`flex-1 min-w-0 w-full max-w-2xl flex flex-col order-2 lg:order-none text-center ${
                          isEven
                            ? "lg:text-right lg:items-end"
                            : "lg:text-left lg:items-start"
                        }`}
                      >
                        <span
                          className={`inline-block text-[0.8125rem] font-semibold uppercase tracking-widest mb-3 ${colors.text} opacity-90`}
                        >
                          {service.label}
                        </span>
                        <h3 className="font-[Sora] text-[2rem] font-semibold text-foreground mb-3 w-full leading-tight">
                          {service.title}
                        </h3>
                        <p className="text-muted-foreground text-base lg:text-[1.0625rem] leading-relaxed w-full">
                          {service.desc}
                        </p>
                        <Link
                          href={service.href}
                          className={`mt-5 inline-flex w-fit mx-auto ${isEven ? "lg:ml-auto lg:mr-0" : "lg:mx-0"}`}
                        >
                          <span
                            className={`sv-neo-btn inline-flex items-center gap-2 px-7 py-3.5 text-sm rounded-xl ${svNeoToneClass[service.color]}`}
                          >
                            Learn more <ArrowRight size={14} />
                          </span>
                        </Link>
                      </div>

                      {/* Large icon/image block — partial gradient border on aligned side */}
                      <div className="flex-shrink-0 order-1 lg:order-none">
                        <div className={`service-image-gradient-border ${isEven ? "service-image-gradient-border--left" : "service-image-gradient-border--right"} flex items-center justify-center`}>
                        <motion.div
                          className="relative w-64 h-64 sm:w-[17.5rem] sm:h-[17.5rem] lg:w-[23.5rem] lg:h-[23.5rem] flex items-center justify-center hover:scale-[1.03] transition-transform duration-300"
                          whileInView={{ opacity: 1, scale: 1 }}
                          initial={{ opacity: 0.7, scale: 0.95 }}
                          viewport={{ once: true, margin: "-50px" }}
                          transition={{ duration: 0.5 }}
                        >
                          <motion.div
                            animate={{ y: [0, -4, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="w-full h-full flex items-center justify-center"
                          >
                            {"imageSrc" in service && service.imageSrc ? (
                              <img src={service.imageSrc} alt="" className="w-full h-full object-contain" />
                            ) : (
                              <IconComponent
                                className={`w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 ${colors.text}`}
                                strokeWidth={1.5}
                              />
                            )}
                          </motion.div>
                        </motion.div>
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
        <div className="relative pb-8">
          <ScrollDownButton to="section-workflows" className="!relative !bottom-0 py-4" />
        </div>
      </section>

      <section id="section-workflows" className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sv-blue/5 via-transparent to-tv-orange/5" />
        <div className="container relative flex flex-col gap-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <span className="section-label text-sv-blue/85 mb-4 inline-block text-base [text-shadow:0_1px_3px_rgba(0,0,0,0.12)]">Where we focus</span>
              <h2 className="font-[Sora] text-2xl sm:text-3xl font-bold uppercase tracking-tight">
                <span className="gradient-text-blend-dark">Industries And Expertise</span>{" "}
                <span className="gradient-text-blend">We Specialize In</span>
              </h2>
              <p className="mt-3 text-muted-foreground text-sm max-w-md mx-auto">
                Workflows, marketing, integrations, or custom development for small to medium sized businesses.
              </p>
            </div>
          </AnimatedSection>

          {/* Workflows */}
          <Link href="/workflows">
            <AnimatedSection>
              <div className="group rounded-2xl glass-card glass-card-hover p-8 lg:p-10 transition-all duration-500 border border-transparent hover:border-sv-blue/20">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-xl bg-sv-blue/10 flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden p-1.5">
                      <img src="/Images/Logos/AIAutomation_Logo_1.png" alt="" className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <span className="section-label text-sv-blue/60 mb-2 inline-block">Pre-Built for Sales Teams</span>
                      <h2 className="font-[Sora] text-2xl sm:text-3xl font-bold uppercase tracking-tight mb-3 gradient-text-logo">
                        AI Workflows for Individual Agents & Small Teams
                      </h2>
                      <p className="text-muted-foreground max-w-2xl text-base">
                        Ready-to-use automation workflows for Insurance Agents, Travel Agents, and Real Estate Agents. Get started quickly — no enterprise setup required, but our services scale and can provide enterprise-like value.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 lg:flex-shrink-0">
                    {["Insurance", "Travel Agents", "Real Estate"].map((industry) => (
                      <span key={industry} className="px-4 py-2 rounded-lg bg-sv-blue/5 text-sm font-medium text-sv-blue border border-sv-blue/20">
                        {industry}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-border flex justify-start">
                  <span className="sv-neo-btn sv-neo-btn--blue inline-flex items-center gap-2 px-7 py-3.5 text-sm rounded-xl">
                    Explore Workflows <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </AnimatedSection>
          </Link>

          {/* Marketing/Media */}
          <Link href="/marketing-media">
            <AnimatedSection delay={0.05}>
              <div className="group rounded-2xl glass-card glass-card-hover p-8 lg:p-10 transition-all duration-500 border border-transparent hover:border-tv-orange/20">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-xl bg-tv-orange/10 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Megaphone className="w-7 h-7 text-tv-orange" />
                    </div>
                    <div>
                      <span className="section-label text-tv-orange/60 mb-2 inline-block">Content & Campaigns</span>
                      <h2 className="font-[Sora] text-2xl sm:text-3xl font-bold uppercase tracking-tight mb-3 gradient-text-logo">
                        Marketing & Media at Scale
                      </h2>
                      <p className="text-muted-foreground max-w-2xl text-base">
                        Digital marketing, social media, video production, and creative design. We create content and campaigns that reach your audience and drive conversions.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 lg:flex-shrink-0">
                    {["SEO & Ads", "Social Media", "Video & Reels", "Creative Design"].map((tag) => (
                      <span key={tag} className="px-4 py-2 rounded-lg bg-tv-orange/5 text-sm font-medium text-tv-orange border border-tv-orange/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-border flex justify-start">
                  <span className="sv-neo-btn sv-neo-btn--orange inline-flex items-center gap-2 px-7 py-3.5 text-sm rounded-xl">
                    Explore Marketing & Media <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </AnimatedSection>
          </Link>

          {/* Integrations */}
          <Link href="/integrations">
            <AnimatedSection delay={0.1}>
              <div className="group rounded-2xl glass-card glass-card-hover p-8 lg:p-10 transition-all duration-500 border border-transparent hover:border-violet-500/20">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-xl bg-violet-500/10 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <Plug2 className="w-7 h-7 text-violet-600" />
                    </div>
                    <div>
                      <span className="section-label text-violet-600/60 mb-2 inline-block">Connect Your Stack</span>
                      <h2 className="font-[Sora] text-2xl sm:text-3xl font-bold uppercase tracking-tight mb-3 gradient-text-logo">
                        Integrations & Tools We Use
                      </h2>
                      <p className="text-muted-foreground max-w-2xl text-base">
                        CRM, automation, AI voice, scheduling, and marketing tools. We integrate with 25+ platforms so your workflows stay synced and running smoothly.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 lg:flex-shrink-0">
                    {["CRM", "Zapier", "AI Voice", "Google Workspace"].map((tag) => (
                      <span key={tag} className="px-4 py-2 rounded-lg bg-violet-500/5 text-sm font-medium text-violet-600 border border-violet-500/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-border flex justify-start">
                  <span className="sv-neo-btn sv-neo-btn--violet inline-flex items-center gap-2 px-7 py-3.5 text-sm rounded-xl">
                    View Our Stack <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </AnimatedSection>
          </Link>

          {/* Custom Development */}
          <Link href="/custom-development">
            <AnimatedSection delay={0.15}>
              <div className="group rounded-2xl glass-card glass-card-hover p-8 lg:p-10 transition-all duration-500 border border-transparent hover:border-indigo-500/20">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-xl bg-indigo-500/10 flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden p-1.5">
                      <img src="/Images/Logos/CustomDevelopment_Logo2.png" alt="" className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <span className="section-label text-indigo-600/60 mb-2 inline-block">Bespoke Solutions</span>
                      <h2 className="font-[Sora] text-2xl sm:text-3xl font-bold uppercase tracking-tight mb-3 gradient-text-logo">
                        Custom Development & Applications
                      </h2>
                      <p className="text-muted-foreground max-w-2xl text-base">
                        When off-the-shelf falls short, we build web apps, APIs, and automation tools tailored to your workflow. Scalable, secure, and built to grow with you.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 lg:flex-shrink-0">
                    {["Web Apps", "APIs", "Databases", "Automation"].map((tag) => (
                      <span key={tag} className="px-4 py-2 rounded-lg bg-indigo-500/5 text-sm font-medium text-indigo-600 border border-indigo-500/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-border flex justify-start">
                  <span className="sv-neo-btn sv-neo-btn--indigo inline-flex items-center gap-2 px-7 py-3.5 text-sm rounded-xl">
                    Explore Custom Development <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </AnimatedSection>
          </Link>

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
                    <stat.icon className={`w-6 h-6 mx-auto mb-3 opacity-60 ${statIconColors[i % statIconColors.length]}`} />
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

        <div className="relative pb-8">
          <ScrollDownButton to="section-cta" className="!relative !bottom-0 py-4" />
        </div>
      </section>

      <hr className="section-divider section-divider-lg w-11/12 sm:w-3/4" aria-hidden />
      {/* ===== CTA SECTION — Treppy-style ===== */}
      <section id="section-cta" className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sv-blue/8 via-transparent to-tv-orange/8" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent" />
        <div className="container relative">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-[Sora] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight gradient-text-logo">
                Elevate your business with SalesVision-Consulting
              </h2>
              <p className="mt-4 text-lg font-medium text-foreground">
                AI-powered growth, stress-free
              </p>
              <Link
                href="/services"
                className="sv-neo-btn sv-neo-btn--blue mt-8 inline-flex items-center gap-2 px-7 py-3.5 text-sm rounded-xl"
              >
                Explore our services
                <ArrowRight size={16} />
              </Link>
              <p className="mt-6 text-muted-foreground text-sm">
                Scale leads, workflows, and growth with intelligent automation
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <hr className="section-divider section-divider-lg w-11/12 sm:w-3/4" aria-hidden />
      {/* ===== OUR DIVISIONS ===== */}
      <section id="section-divisions" className="py-24 lg:py-32 relative">
        <div className="container">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="section-label text-muted-foreground mb-4 inline-block">Our Divisions</span>
              <h2 className="font-[Sora] text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight gradient-text-logo">
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
                    <span className="sv-neo-btn sv-neo-btn--orange inline-flex items-center gap-2 px-7 py-3.5 text-sm rounded-xl">
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
                    <span className="sv-neo-btn sv-neo-btn--blue inline-flex items-center gap-2 px-7 py-3.5 text-sm rounded-xl">
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
