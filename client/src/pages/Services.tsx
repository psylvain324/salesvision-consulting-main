/*
 * DESIGN: Meridian — Refined Dark Luxury
 * SERVICES PAGE: Purple accent for umbrella brand. All technology services.
 */
import { Link } from "wouter";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import ScrollDownButton from "@/components/ScrollDownButton";
import {
  ArrowRight,
  Brain,
  Globe,
  Code,
  BarChart3,
  Palette,
  Database,
  LineChart,
  MessageSquare,
  Film,
  Target,
} from "lucide-react";

const SERVICES_BG = "/Images/Background_Futuristic_1.jpeg";

const serviceIconColors: Record<string, { bg: string; text: string; dot: string }> = {
  blue: { bg: "bg-sv-blue/10", text: "text-sv-blue", dot: "bg-sv-blue" },
  violet: { bg: "bg-violet-500/15", text: "text-violet-600", dot: "bg-violet-600" },
  emerald: { bg: "bg-emerald-500/15", text: "text-emerald-600", dot: "bg-emerald-600" },
  orange: { bg: "bg-tv-orange/15", text: "text-tv-orange", dot: "bg-tv-orange" },
  indigo: { bg: "bg-indigo-500/15", text: "text-indigo-600", dot: "bg-indigo-600" },
  rose: { bg: "bg-rose-500/15", text: "text-rose-600", dot: "bg-rose-600" },
};

const techIconColors = ["text-sv-blue", "text-tv-orange", "text-violet-600", "text-emerald-600"];

const serviceCategories = [
  {
    id: "consulting",
    icon: BarChart3,
    color: "blue" as const,
    title: "Technology Consulting",
    tagline: "Strategic guidance for digital transformation",
    desc: "We help businesses navigate the complex technology landscape with expert consulting services. From system architecture reviews to digital transformation roadmaps, our team provides actionable strategies that align technology investments with business objectives.",
    features: [
      "Digital Transformation Strategy",
      "Process Optimization",
      "Vendor Selection & Management",
      "IT Infrastructure Planning",
    ],
  },
  {
    id: "ai",
    icon: Brain,
    color: "violet" as const,
    title: "AI Automation Solutions",
    tagline: "Intelligent systems that work while you sleep",
    desc: "Our AI automation solutions transform manual processes into intelligent, self-optimizing workflows. We design, build, and deploy custom AI systems that handle lead generation, customer engagement, data analysis, and operational tasks with unprecedented efficiency.",
    features: [
      "Custom AI Workflow Design",
      "Lead Generation Automation",
      "Chatbot & Virtual Assistants",
      "Predictive Analytics",
    ],
  },
  {
    id: "web",
    icon: Palette,
    color: "emerald" as const,
    title: "Web Design & Development",
    tagline: "Beautiful, functional digital experiences",
    desc: "We create modern, responsive websites and web applications that combine stunning visual design with robust technical architecture. Every project is built with performance, accessibility, and conversion optimization at its core.",
    features: [
      "Websites & Landing Pages",
      "Responsive Design & UX",
      "E-Commerce Solutions",
      "CMS Integration",
    ],
  },
  {
    id: "marketing",
    icon: LineChart,
    color: "orange" as const,
    title: "Digital Marketing",
    tagline: "Data-driven campaigns that deliver results",
    desc: "Our digital marketing services combine creative strategy with data analytics to reach your target audience effectively. We specialize in performance marketing, content strategy, and multi-channel campaigns that drive measurable business growth.",
    features: [
      "SEO, Content Strategy & Conversion Rate Optimization",
      "Email Marketing Automation",
      "Social Media Automation",
      "Marketing Analytics & Reporting",
    ],
  },
  {
    id: "software",
    icon: Code,
    color: "indigo" as const,
    title: "Custom Development Applications",
    tagline: "Bespoke solutions for unique challenges",
    desc: "When off-the-shelf solutions fall short, we build custom development solutions tailored to your exact requirements. From mobile apps to enterprise platforms, our development team delivers scalable, secure, and maintainable solutions.",
    features: [
      "Full-Stack Web Applications",
      "Custom Reporting & Tools",
      "API Design & Integration",
      "Database Architecture",
    ],
  },
  {
    id: "video",
    icon: Film,
    color: "rose" as const,
    title: "Video & Audio Editing",
    tagline: "Professional content for social and marketing",
    desc: "Create engaging video and audio content for social media, ads, and marketing campaigns. From short-form reels to long-form explainers, we produce content that stands out and drives engagement.",
    features: [
      "Social Media Video & Reels",
      "Ads & Promotional Content",
      "Podcast & Audio Editing",
      "Motion Graphics & B-Roll",
    ],
  },
];

const techStack = [
  { icon: Database, label: "Data Engineering" },
  { icon: Globe, label: "Web Platforms" },
  { icon: MessageSquare, label: "Chatbots" },
  { icon: Brain, label: "AI & Automation" },
];

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

export default function Services() {
  return (
    <div className="min-h-screen">
      {/* ===== HERO ===== */}
      <section id="section-hero" className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={SERVICES_BG} alt="" className="absolute inset-0 w-full h-full object-cover object-center opacity-40 hero-bg-drift" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/50 to-white/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-transparent to-transparent" />
        </div>

        <div className="relative container pt-32 pb-20">
          <div className="max-w-3xl">
            <motion.span
              className="section-label text-sv-blue/80 mb-6 inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Our Services
            </motion.span>
            <motion.h1
              className="font-[Sora] text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Areas We Provide
              <br />
              <span className="gradient-text-purple">Assistance In</span>
            </motion.h1>
            <motion.p
              className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              We help small and medium-sized businesses innovate, automate, and grow.
              We also contract into larger projects where our specializations align —
              from strategic consulting to custom development.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
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
        <div className="relative pb-8">
          <ScrollDownButton to="section-categories" className="!relative !bottom-0 py-4" />
        </div>
      </section>

      <hr className="section-divider section-divider-lg w-11/12 sm:w-3/4" aria-hidden />
      {/* ===== SERVICE CATEGORIES ===== */}
      <section id="section-categories" className="py-24 lg:py-32">
        <div className="container">
          <div className="space-y-20">
            {serviceCategories.map((category, i) => (
              <AnimatedSection key={category.id} delay={0.1}>
                {i > 0 && <hr className="section-divider section-divider-sm w-full max-w-2xl mx-auto" aria-hidden />}
                <div id={category.id} className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-start scroll-mt-24 ${i % 2 === 1 ? "lg:direction-rtl" : ""}`}>
                  <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${serviceIconColors[category.color].bg}`}>
                        <category.icon className={`w-5 h-5 ${serviceIconColors[category.color].text}`} />
                      </div>
                      <span className="section-label text-sv-blue/60">{category.tagline}</span>
                    </div>
                    <h2 className="font-[Sora] text-2xl sm:text-3xl font-bold text-foreground tracking-tight mb-4">
                      {category.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed text-base">
                      {category.desc}
                    </p>
                    <div className="mt-8">
                      <Link href="/contact">
                        <span className="inline-flex items-center gap-2 text-sm font-medium text-sv-blue hover:text-sv-blue-light transition-colors">
                          Discuss This Service <ArrowRight size={14} />
                        </span>
                      </Link>
                    </div>
                  </div>
                  <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                    <div className="rounded-2xl glass-card p-7">
                      <h4 className="font-[Sora] text-sm font-semibold text-foreground mb-5 uppercase tracking-wider">
                        Capabilities
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-[1fr_1fr] gap-3 min-h-[11rem]">
                        {category.features.map((feature) => (
                          <div
                            key={feature}
                            className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors h-full min-h-0"
                          >
                            <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${serviceIconColors[category.color].dot}`} />
                            <span className="text-sm text-foreground">{feature}</span>
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
        <div className="relative pb-8">
          <ScrollDownButton to="section-expertise" className="!relative !bottom-0 py-4" />
        </div>
      </section>

      <hr className="section-divider section-divider-lg w-11/12 sm:w-3/4" aria-hidden />
      {/* ===== AREAS WE PROVIDE ASSISTANCE IN ===== */}
      <section id="section-expertise" className="py-24 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sv-blue/[0.02] to-transparent" />
        <div className="container relative">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="section-label text-muted-foreground mb-4 inline-block">Our Expertise</span>
              <h2 className="font-[Sora] text-3xl sm:text-4xl font-bold uppercase tracking-tight gradient-text-logo">
                Areas We Provide Assistance In
              </h2>
              <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
                We specialize in helping small and medium-sized businesses, and we contract into larger projects where our expertise is a fit.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-2 grid-rows-[1fr_1fr] gap-6 min-h-[280px]">
            {techStack.map((tech, i) => (
              <AnimatedSection key={tech.label} delay={i * 0.06} className="h-full min-h-0">
                <div className="group rounded-2xl glass-card glass-card-hover p-8 h-full min-h-0 flex flex-col items-center justify-center text-center transition-all duration-300">
                  <tech.icon className={`w-8 h-8 mb-3 opacity-60 group-hover:opacity-100 transition-opacity ${techIconColors[i % techIconColors.length]}`} />
                  <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    {tech.label}
                  </span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
        <div className="relative pb-8">
          <ScrollDownButton to="section-industries" className="!relative !bottom-0 py-4" />
        </div>
      </section>

      <hr className="section-divider section-divider-lg w-11/12 sm:w-3/4" aria-hidden />
      {/* ===== INDUSTRIES WE SERVE ===== */}
      <section id="section-industries" className="py-24 lg:py-32 relative">
        <div className="container">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Target className="w-5 h-5 text-sv-blue" />
                <span className="section-label text-muted-foreground">Industries We Serve</span>
              </div>
              <h2 className="font-[Sora] text-3xl sm:text-4xl font-bold uppercase tracking-tight gradient-text-logo">
                Trusted Across Multiple Sectors
              </h2>
              <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
                We bring proven technology and automation solutions to businesses in health, real estate, finance, and beyond.
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
        <div className="relative pb-8">
          <ScrollDownButton to="section-cta" className="!relative !bottom-0 py-4" />
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
                Let's Build Something Extraordinary
              </h2>
              <p className="mt-5 text-muted-foreground text-lg">
                Whether you're a small business or need to scale a larger project —
                tell us your vision and we'll show you how we can help.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link href="/contact">
                  <span className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold text-white bg-sv-blue hover:bg-sv-blue-light rounded-xl transition-all duration-200 shadow-lg shadow-sv-blue/20">
                    Start a Project <ArrowRight size={16} />
                  </span>
                </Link>
                <Link href="/integrations">
                  <span className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold text-foreground/80 hover:text-foreground border border-border rounded-xl transition-all duration-200 hover:bg-muted/50">
                    See Our Integrations <ArrowRight size={16} />
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
