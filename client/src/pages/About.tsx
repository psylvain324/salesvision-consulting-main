/*
 * DESIGN: Meridian — Refined Dark Luxury
 * ABOUT PAGE: Personal portfolio for Phillip Sylvain, CEO & Software Developer.
 * Mixed blue/purple accents for the umbrella brand identity.
 */
import { Link } from "wouter";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import {
  ArrowRight,
  Code,
  Brain,
  Globe,
  Briefcase,
  GraduationCap,
  Lightbulb,
  Rocket,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";

const CEO_PORTRAIT = "https://d2xsxph8kpxj0f.cloudfront.net/310519663397693691/kUiTSqrNT343A8hDu8MEPH/portrait-ceo-E7aijcqEFdG7VdEzs2cqVR.webp";

const skills = [
  { category: "Languages", items: ["JavaScript/TypeScript", "Python", "Java", "SQL", "HTML/CSS"] },
  { category: "Frameworks", items: ["React", "Node.js", "Next.js", "FastAPI", "Express"] },
  { category: "AI & Automation", items: ["OpenAI API", "LangChain", "Chatbots", "Workflow Automation"] },
  { category: "Data & Platforms", items: ["PostgreSQL", "MongoDB", "API Design", "Web Platforms"] },
];

const timeline = [
  {
    icon: Rocket,
    title: "Founded SalesVision-Consulting",
    desc: "Established the technology company to bridge the gap between AI innovation and practical business solutions.",
    period: "Present",
  },
  {
    icon: Brain,
    title: "AI Automation Specialist",
    desc: "Developed proprietary AI workflows for lead generation and sales automation in the health insurance industry.",
    period: "Ongoing",
  },
  {
    icon: Globe,
    title: "Launched TravelVision",
    desc: "Expanded the company's reach into the travel industry with AI-powered booking and marketing solutions.",
    period: "Ongoing",
  },
  {
    icon: Code,
    title: "Software Development Career",
    desc: "Years of experience building full-stack applications, enterprise software, and custom technology solutions.",
    period: "Career",
  },
];

const values = [
  {
    icon: Lightbulb,
    title: "Innovation First",
    desc: "Constantly exploring emerging technologies to deliver cutting-edge solutions that give our clients a competitive edge.",
  },
  {
    icon: Briefcase,
    title: "Results-Driven",
    desc: "Every project is measured by its impact on business outcomes — leads generated, revenue increased, efficiency gained.",
  },
  {
    icon: GraduationCap,
    title: "Continuous Learning",
    desc: "The technology landscape evolves rapidly. We stay ahead by investing in continuous education and experimentation.",
  },
];

export default function About() {
  return (
    <div className="min-h-screen">
      {/* ===== HERO ===== */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sv-blue/5 via-transparent to-brand-darker" />
        <motion.div
          className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-sv-blue/3 blur-3xl"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <motion.span
                className="section-label text-sv-blue mb-6 inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Meet the Founder
              </motion.span>
              <motion.h1
                className="font-[Sora] text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                Phillip Sylvain
              </motion.h1>
              <motion.p
                className="mt-2 text-xl text-sv-blue font-[Sora] font-medium"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
              >
                CEO & Software Developer
              </motion.p>
              <motion.p
                className="mt-6 text-lg text-white/50 leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                A passionate software developer and entrepreneur dedicated to harnessing
                the power of artificial intelligence and modern technology to solve
                real-world business challenges. As the founder and CEO of SalesVision-Consulting,
                I lead a mission to democratize AI-powered automation for businesses of all sizes.
              </motion.p>
              <motion.div
                className="mt-8 flex items-center gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                <a
                  href="#"
                  className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
                  aria-label="GitHub"
                >
                  <Github size={18} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
                  aria-label="Email"
                >
                  <Mail size={18} />
                </a>
              </motion.div>
            </div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[3/4] max-w-md mx-auto lg:mx-0 lg:ml-auto">
                <img
                  src={CEO_PORTRAIT}
                  alt="Phillip Sylvain - CEO & Software Developer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-darker/60 via-transparent to-transparent" />
              </div>
              {/* Floating badge */}
              <motion.div
                className="absolute -bottom-4 -left-4 lg:left-auto lg:-right-4 glass-card rounded-xl p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-sv-blue/15 flex items-center justify-center">
                    <Code className="w-5 h-5 text-sv-blue" />
                  </div>
                  <div>
                    <div className="text-xs text-white/40">Founder & CEO</div>
                    <div className="text-sm font-semibold text-white">SalesVision-Consulting</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== JOURNEY TIMELINE ===== */}
      <section className="py-24 lg:py-32">
        <div className="container">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="section-label text-white/30 mb-4 inline-block">The Journey</span>
              <h2 className="font-[Sora] text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Building the Vision
              </h2>
            </div>
          </AnimatedSection>

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-6 top-0 bottom-0 w-px bg-white/8" />

              <div className="space-y-8">
                {timeline.map((item, i) => (
                  <AnimatedSection key={item.title} delay={i * 0.1} direction="left">
                    <div className="relative flex gap-6 pl-2">
                      <div className="relative z-10 w-10 h-10 rounded-xl bg-sv-blue/10 flex items-center justify-center flex-shrink-0 border border-sv-blue/20">
                        <item.icon className="w-5 h-5 text-sv-blue" />
                      </div>
                      <div className="flex-1 pb-8">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-[Sora] text-lg font-semibold text-white">{item.title}</h3>
                          <span className="text-xs text-sv-blue/60 font-medium">{item.period}</span>
                        </div>
                        <p className="text-sm text-white/40 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SKILLS ===== */}
      <section className="py-24 lg:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sv-blue/[0.02] to-transparent" />
        <div className="container relative">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="section-label text-sv-blue/60 mb-4 inline-block">Technical Expertise</span>
              <h2 className="font-[Sora] text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Skills & Technologies
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {skills.map((group, i) => (
              <AnimatedSection key={group.category} delay={i * 0.1}>
                <div className="rounded-2xl glass-card p-6 h-full">
                  <h3 className="font-[Sora] text-sm font-semibold text-sv-blue mb-4 uppercase tracking-wider">
                    {group.category}
                  </h3>
                  <div className="space-y-2.5">
                    {group.items.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2.5 text-sm text-white/50"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-sv-blue/40" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== VALUES ===== */}
      <section className="py-24 lg:py-32">
        <div className="container">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="section-label text-white/30 mb-4 inline-block">Philosophy</span>
              <h2 className="font-[Sora] text-3xl sm:text-4xl font-bold text-white tracking-tight">
                What Drives Us
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid sm:grid-cols-3 gap-6">
            {values.map((value, i) => (
              <AnimatedSection key={value.title} delay={i * 0.1}>
                <div className="rounded-2xl glass-card p-8 h-full text-center">
                  <div className="w-14 h-14 rounded-2xl bg-sv-blue/10 flex items-center justify-center mx-auto mb-5">
                    <value.icon className="w-7 h-7 text-sv-blue" />
                  </div>
                  <h3 className="font-[Sora] text-lg font-semibold text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-sm text-white/40 leading-relaxed">
                    {value.desc}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== OTHER VENTURES ===== */}
      <section className="py-12 lg:py-16 relative">
        <div className="container">
          <AnimatedSection>
            <div className="rounded-2xl glass-card p-6 text-center max-w-2xl mx-auto border border-white/5">
              <p className="text-sm text-white/40">
                We also operate <a href="#travelvision" target="_blank" rel="noopener noreferrer" className="text-sv-blue hover:text-sv-blue-light transition-colors underline underline-offset-2">TravelVision</a>, our travel-focused division — a separate site with its own focus on AI-powered travel booking and marketing.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sv-blue/5 via-transparent to-transparent" />
        <div className="container relative">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-[Sora] text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Let's Work Together
              </h2>
              <p className="mt-5 text-white/40 text-lg">
                Whether you need a technology partner, a custom development solution,
                or AI-powered automation, I'd love to hear about your project.
              </p>
              <div className="mt-10">
                <Link href="/contact">
                  <span className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold text-white bg-sv-blue hover:bg-sv-blue-light rounded-xl transition-all duration-200 shadow-lg shadow-sv-blue/20">
                    Get In Touch <ArrowRight size={16} />
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
