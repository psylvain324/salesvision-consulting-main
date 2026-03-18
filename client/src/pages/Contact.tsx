/*
 * CONTACT PAGE: Clean contact form with business information.
 * Light theme, blue & orange accents — matches Home, Services, etc.
 */
import { useState } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import { toast } from "sonner";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
} from "lucide-react";

const contactIconColors: Record<string, { bg: string; text: string }> = {
  blue: { bg: "bg-sv-blue/10", text: "text-sv-blue" },
  emerald: { bg: "bg-emerald-500/15", text: "text-emerald-600" },
  orange: { bg: "bg-tv-orange/15", text: "text-tv-orange" },
  violet: { bg: "bg-violet-500/15", text: "text-violet-600" },
};

const contactInfo = [
  {
    icon: Mail,
    color: "blue" as const,
    label: "Email",
    value: "info@salesvision-consulting.com",
    href: "mailto:info@salesvision-consulting.com",
  },
  {
    icon: Phone,
    color: "emerald" as const,
    label: "Phone",
    value: "(555) 123-4567",
    href: "tel:+15551234567",
  },
  {
    icon: MapPin,
    color: "orange" as const,
    label: "Location",
    value: "United States",
    href: "#",
  },
  {
    icon: Clock,
    color: "violet" as const,
    label: "Business Hours",
    value: "Mon - Fri: 9AM - 6PM EST",
    href: "#",
  },
];

const inquiryTypes = [
  "General Inquiry",
  "SalesVision Services",
  "TravelVision Services",
  "Technology Consulting",
  "AI Automation",
  "Web Design & Development",
  "Custom Development",
  "Partnership Opportunity",
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    inquiryType: "",
    message: "",
  });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // Simulate form submission
    setTimeout(() => {
      setSending(false);
      toast.success("Message sent successfully! We'll get back to you within 24 hours.");
      setFormData({ name: "", email: "", company: "", inquiryType: "", message: "" });
    }, 1500);
  };

  return (
    <div className="min-h-screen">
      {/* ===== HERO ===== */}
      <section id="section-hero" className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sv-blue/[0.03] via-transparent to-tv-orange/[0.03]" />
        <motion.div
          className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full bg-sv-blue/5 blur-3xl"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container relative">
          <div className="max-w-2xl">
            <motion.span
              className="section-label text-sv-blue mb-6 inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Get In Touch
            </motion.span>
            <motion.h1
              className="font-[Sora] text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Let's Start a
              <br />
              <span className="gradient-text-blue">Conversation</span>
            </motion.h1>
            <motion.p
              className="mt-6 text-lg text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Ready to transform your business with AI-powered solutions? We'd love
              to hear about your project and explore how we can help.
            </motion.p>
          </div>
        </div>
      </section>

      <hr className="section-divider section-divider-lg w-11/12 sm:w-3/4" aria-hidden />
      {/* ===== CONTACT FORM + INFO ===== */}
      <section id="section-form" className="pb-24 lg:pb-32 scroll-mt-24">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 lg:items-center">
            {/* Form */}
            <div className="lg:col-span-3">
              <AnimatedSection>
                <form onSubmit={handleSubmit} className="rounded-2xl glass-card p-8 lg:p-10">
                  <h2 className="font-[Sora] text-xl font-semibold text-foreground mb-8">
                    Send Us a Message
                  </h2>

                  <div className="grid sm:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2 font-medium">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:border-sv-blue/50 focus:ring-2 focus:ring-sv-blue/20 transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2 font-medium">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:border-sv-blue/50 focus:ring-2 focus:ring-sv-blue/20 transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2 font-medium">Company</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:border-sv-blue/50 focus:ring-2 focus:ring-sv-blue/20 transition-all"
                        placeholder="Your Company"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2 font-medium">Inquiry Type *</label>
                      <select
                        required
                        value={formData.inquiryType}
                        onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:border-sv-blue/50 focus:ring-2 focus:ring-sv-blue/20 transition-all appearance-none"
                      >
                        <option value="">Select an option</option>
                        {inquiryTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm text-muted-foreground mb-2 font-medium">Message *</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:border-sv-blue/50 focus:ring-2 focus:ring-sv-blue/20 transition-all resize-none"
                      placeholder="Tell us about your project or inquiry..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-white bg-sv-blue hover:bg-sv-blue-light rounded-xl transition-all duration-200 shadow-lg shadow-sv-blue/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {sending ? (
                      <>Sending...</>
                    ) : (
                      <>
                        Send Message <Send size={16} />
                      </>
                    )}
                  </button>
                </form>
              </AnimatedSection>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2">
              <AnimatedSection delay={0.2}>
                <div className="space-y-5">
                  {contactInfo.map((info) => (
                    <a
                      key={info.label}
                      href={info.href}
                      className="flex items-start gap-4 p-5 rounded-2xl glass-card glass-card-hover transition-all duration-300"
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${contactIconColors[info.color].bg}`}>
                        <info.icon className={`w-5 h-5 ${contactIconColors[info.color].text}`} />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">
                          {info.label}
                        </div>
                        <div className="text-sm text-muted-foreground">{info.value}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
