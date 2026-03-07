/*
 * DESIGN: Meridian — Refined Dark Luxury
 * SERVICES PAGE: Purple accent for umbrella brand. All technology services.
 */
import { Link } from "wouter";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import {
  ArrowRight,
  Brain,
  Globe,
  Code,
  BarChart3,
  Zap,
  Palette,
  Server,
  Smartphone,
  Database,
  LineChart,
  Settings,
  MessageSquare,
} from "lucide-react";

const SERVICES_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663397693691/kUiTSqrNT343A8hDu8MEPH/services-bg-dU46apvAdVMG8nCCTSLxrX.webp";

const serviceCategories = [
  {
    id: "consulting",
    icon: BarChart3,
    title: "Technology Consulting",
    tagline: "Strategic guidance for digital transformation",
    desc: "We help businesses navigate the complex technology landscape with expert consulting services. From system architecture reviews to digital transformation roadmaps, our team provides actionable strategies that align technology investments with business objectives.",
    features: [
      "Digital Transformation Strategy",
      "System Architecture Review",
      "Technology Stack Assessment",
      "Process Optimization",
      "Vendor Selection & Management",
      "IT Infrastructure Planning",
    ],
  },
  {
    id: "ai",
    icon: Brain,
    title: "AI Automation Solutions",
    tagline: "Intelligent systems that work while you sleep",
    desc: "Our AI automation solutions transform manual processes into intelligent, self-optimizing workflows. We design, build, and deploy custom AI systems that handle lead generation, customer engagement, data analysis, and operational tasks with unprecedented efficiency.",
    features: [
      "Custom AI Workflow Design",
      "Lead Generation Automation",
      "Chatbot & Virtual Assistants",
      "Predictive Analytics",
      "Natural Language Processing",
      "Machine Learning Integration",
    ],
  },
  {
    id: "web",
    icon: Palette,
    title: "Web Design & Development",
    tagline: "Beautiful, functional digital experiences",
    desc: "We create modern, responsive websites and web applications that combine stunning visual design with robust technical architecture. Every project is built with performance, accessibility, and conversion optimization at its core.",
    features: [
      "Custom Website Design",
      "Responsive Web Development",
      "E-Commerce Solutions",
      "UI/UX Design",
      "Landing Page Optimization",
      "CMS Integration",
    ],
  },
  {
    id: "marketing",
    icon: LineChart,
    title: "Digital Marketing",
    tagline: "Data-driven campaigns that deliver results",
    desc: "Our digital marketing services combine creative strategy with data analytics to reach your target audience effectively. We specialize in performance marketing, content strategy, and multi-channel campaigns that drive measurable business growth.",
    features: [
      "SEO & Content Strategy",
      "Paid Advertising (PPC/Social)",
      "Email Marketing Automation",
      "Social Media Management",
      "Conversion Rate Optimization",
      "Marketing Analytics & Reporting",
    ],
  },
  {
    id: "software",
    icon: Code,
    title: "Custom Software Applications",
    tagline: "Bespoke solutions for unique challenges",
    desc: "When off-the-shelf solutions fall short, we build custom software applications tailored to your exact requirements. From mobile apps to enterprise platforms, our development team delivers scalable, secure, and maintainable solutions.",
    features: [
      "Full-Stack Web Applications",
      "Mobile App Development",
      "API Design & Integration",
      "Database Architecture",
      "Cloud Infrastructure",
      "DevOps & CI/CD Pipelines",
    ],
  },
];

const techStack = [
  { icon: Server, label: "Cloud Infrastructure" },
  { icon: Database, label: "Data Engineering" },
  { icon: Smartphone, label: "Mobile Development" },
  { icon: Globe, label: "Web Platforms" },
  { icon: Brain, label: "Machine Learning" },
  { icon: Zap, label: "Real-Time Systems" },
  { icon: Settings, label: "DevOps" },
  { icon: MessageSquare, label: "NLP & Chatbots" },
];

export default function Services() {
  return (
    <div className="min-h-screen">
      {/* ===== HERO ===== */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={SERVICES_BG} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-darker/80 via-brand-darker/60 to-brand-darker" />
        </div>

        <div className="relative container pt-32 pb-20">
          <div className="max-w-3xl">
            <motion.span
              className="section-label text-white/40 mb-6 inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Our Services
            </motion.span>
            <motion.h1
              className="font-[Sora] text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              End-to-End
              <br />
              <span className="gradient-text-purple">Technology Solutions</span>
            </motion.h1>
            <motion.p
              className="mt-6 text-lg text-white/50 leading-relaxed max-w-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              From strategic consulting to custom software development, we provide
              comprehensive technology services that help businesses innovate, automate,
              and grow.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ===== SERVICE CATEGORIES ===== */}
      <section className="py-24 lg:py-32">
        <div className="container">
          <div className="space-y-20">
            {serviceCategories.map((category, i) => (
              <AnimatedSection key={category.id} delay={0.1}>
                <div className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-start ${i % 2 === 1 ? "lg:direction-rtl" : ""}`}>
                  <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-sv-blue/10 flex items-center justify-center">
                        <category.icon className="w-5 h-5 text-sv-blue" />
                      </div>
                      <span className="section-label text-sv-blue/60">{category.tagline}</span>
                    </div>
                    <h2 className="font-[Sora] text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
                      {category.title}
                    </h2>
                    <p className="text-white/40 leading-relaxed text-base">
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
                      <h4 className="font-[Sora] text-sm font-semibold text-white/60 mb-5 uppercase tracking-wider">
                        Capabilities
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {category.features.map((feature) => (
                          <div
                            key={feature}
                            className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] transition-colors"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-sv-blue flex-shrink-0" />
                            <span className="text-sm text-white/60">{feature}</span>
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

      {/* ===== TECH STACK ===== */}
      <section className="py-24 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sv-blue/[0.02] to-transparent" />
        <div className="container relative">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="section-label text-white/30 mb-4 inline-block">Our Expertise</span>
              <h2 className="font-[Sora] text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Technology We Master
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {techStack.map((tech, i) => (
              <AnimatedSection key={tech.label} delay={i * 0.06}>
                <div className="group rounded-2xl glass-card glass-card-hover p-6 text-center transition-all duration-300">
                  <tech.icon className="w-8 h-8 text-sv-blue mx-auto mb-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                  <span className="text-sm font-medium text-white/60 group-hover:text-white/80 transition-colors">
                    {tech.label}
                  </span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sv-blue/5 via-transparent to-tv-orange/5" />
        <div className="container relative">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-[Sora] text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Let's Build Something Extraordinary
              </h2>
              <p className="mt-5 text-white/40 text-lg">
                Every great project starts with a conversation. Tell us about your
                vision and we'll show you how technology can make it a reality.
              </p>
              <div className="mt-10">
                <Link href="/contact">
                  <span className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold text-white bg-sv-blue hover:bg-sv-blue-light rounded-xl transition-all duration-200 shadow-lg shadow-sv-blue/20">
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
