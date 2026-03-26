/*
 * MARKETING/MEDIA PAGE: Digital marketing and media services.
 * Light theme, blue & orange accents — matches other service pages.
 */
import { Link } from "wouter";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import ScrollDownButton from "@/components/ScrollDownButton";
import SectionWaveDivider from "@/components/SectionWaveDivider";
import {
  ArrowRight,
  Megaphone,
  Share2,
  Video,
  BarChart3,
  Image,
  Target,
} from "lucide-react";

const MARKETING_BG = "/Images/Background_Futuristic_1.jpeg";

const serviceIconColors: Record<string, { bg: string; text: string }> = {
  blue: { bg: "bg-sv-blue/10", text: "text-sv-blue" },
  violet: { bg: "bg-violet-500/15", text: "text-violet-600" },
  emerald: { bg: "bg-emerald-500/15", text: "text-emerald-600" },
  orange: { bg: "bg-tv-orange/15", text: "text-tv-orange" },
  indigo: { bg: "bg-indigo-500/15", text: "text-indigo-600" },
  rose: { bg: "bg-rose-500/15", text: "text-rose-600" },
};

const serviceAreas = [
  {
    id: "digital-marketing",
    icon: Megaphone,
    color: "orange" as const,
    title: "Digital Marketing",
    desc: "Data-driven campaigns that reach the right audience. From SEO and content strategy to paid ads and conversion optimization, we help you grow your digital presence.",
    features: ["SEO & Content Strategy", "Paid Advertising", "Conversion Optimization", "Analytics & Reporting"],
  },
  {
    id: "social-media",
    icon: Share2,
    color: "violet" as const,
    title: "Social Media Marketing",
    desc: "Build your brand and engage your audience across social platforms. We create content, run campaigns, and automate posting to keep your channels active and growing.",
    features: ["Content Creation", "Ad Campaigns", "Community Management", "Social Automation"],
  },
  {
    id: "video-production",
    icon: Video,
    color: "rose" as const,
    title: "Video & Audio Production",
    desc: "Professional video and audio content for social media, ads, and marketing. From short-form reels to long-form explainers, we produce content that drives engagement.",
    features: ["Social Media Reels", "Ads & Promos", "Podcast Editing", "Motion Graphics"],
  },
  {
    id: "creative-design",
    icon: Image,
    color: "emerald" as const,
    title: "Creative & Design",
    desc: "Visual content that stands out. Graphics, banners, and branded assets for campaigns, social profiles, and marketing materials.",
    features: ["Brand Assets", "Ad Creatives", "Infographics", "Email Graphics"],
  },
  {
    id: "analytics",
    icon: BarChart3,
    color: "blue" as const,
    title: "Marketing Analytics",
    desc: "Measure what matters. We track performance across channels, identify opportunities, and provide actionable insights to optimize your marketing ROI.",
    features: ["Campaign Tracking", "Funnel Analysis", "Attribution", "Custom Dashboards"],
  },
  {
    id: "targeting",
    icon: Target,
    color: "indigo" as const,
    title: "Audience & Targeting",
    desc: "Reach the right people at the right time. We help you define audiences, build lookalikes, and refine targeting for maximum impact.",
    features: ["Audience Strategy", "Lookalike Audiences", "Retargeting", "A/B Testing"],
  },
];

const stats = [
  { value: "6+", label: "Service Areas" },
  { value: "50+", label: "Campaigns Managed" },
  { value: "3x", label: "Avg. ROI Improvement" },
];

export default function MarketingMedia() {
  return (
    <div className="min-h-screen">
      {/* ===== HERO ===== */}
      <section id="section-hero" className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={MARKETING_BG} alt="" className="w-full h-full object-cover object-center opacity-40" />
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
              Marketing & Media
            </motion.span>
            <motion.h1
              className="font-[Sora] text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Reach Your Audience
              <br />
              <span className="gradient-text-blue">At Scale</span>
            </motion.h1>
            <motion.p
              className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              From digital marketing and social media to video production and creative design — we help you create content and campaigns that convert.
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

      <SectionWaveDivider />
      {/* ===== SERVICE AREAS ===== */}
      <section id="section-services" className="py-24 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sv-blue/[0.02] to-transparent" />
        <div className="container relative">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="section-label text-sv-blue/60 mb-4 inline-block">What We Offer</span>
              <h2 className="font-[Sora] text-3xl sm:text-4xl font-bold uppercase tracking-tight gradient-text-logo">
                Marketing & Media Services
              </h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
                Full-spectrum marketing and media services — from strategy and creative to execution and optimization.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceAreas.map((area, i) => (
              <AnimatedSection key={area.id} delay={i * 0.05}>
                <div id={area.id} className="rounded-2xl glass-card glass-card-hover p-7 h-full flex flex-col transition-all duration-300 scroll-mt-24">
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
                        <span className="w-1.5 h-1.5 rounded-full bg-sv-blue/60" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.3}>
            <div className="mt-16 text-center">
              <Link href="/contact">
                <span className="inline-flex items-center gap-2 text-sm font-medium text-sv-blue hover:text-sv-blue-light transition-colors">
                  Discuss Your Marketing Needs <ArrowRight size={14} />
                </span>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <SectionWaveDivider flip />
      {/* ===== CTA ===== */}
      <section id="section-cta" className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sv-blue/5 via-transparent to-tv-orange/5" />
        <div className="container relative">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-[Sora] text-3xl sm:text-4xl font-bold uppercase tracking-tight gradient-text-logo">
                Ready to Amplify Your Marketing?
              </h2>
              <p className="mt-5 text-muted-foreground text-lg">
                Let's talk about your goals and build a strategy that drives real results.
              </p>
              <div className="mt-10">
                <Link href="/contact">
                  <span className="sv-neo-btn sv-neo-btn--blue inline-flex items-center gap-2 px-8 py-4 text-sm rounded-xl">
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
