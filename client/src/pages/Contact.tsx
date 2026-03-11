/*
 * DESIGN: Meridian — Refined Dark Luxury
 * CONTACT PAGE: Clean contact form with business information.
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

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "info@salesvision-consulting.com",
    href: "mailto:info@salesvision-consulting.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "(555) 123-4567",
    href: "tel:+15551234567",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "United States",
    href: "#",
  },
  {
    icon: Clock,
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
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sv-blue/5 via-transparent to-tv-orange/3" />
        <motion.div
          className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full bg-sv-blue/3 blur-3xl"
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
              className="font-[Sora] text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Let's Start a
              <br />
              <span className="gradient-text-blue">Conversation</span>
            </motion.h1>
            <motion.p
              className="mt-6 text-lg text-white/50 leading-relaxed"
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

      {/* ===== CONTACT FORM + INFO ===== */}
      <section className="pb-24 lg:pb-32">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 lg:items-center">
            {/* Form */}
            <div className="lg:col-span-3">
              <AnimatedSection>
                <form onSubmit={handleSubmit} className="rounded-2xl glass-card p-8 lg:p-10">
                  <h2 className="font-[Sora] text-xl font-semibold text-white mb-8">
                    Send Us a Message
                  </h2>

                  <div className="grid sm:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className="block text-sm text-white/40 mb-2 font-medium">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/8 text-white placeholder-white/20 text-sm focus:outline-none focus:border-sv-blue/50 focus:bg-white/[0.07] transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-white/40 mb-2 font-medium">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/8 text-white placeholder-white/20 text-sm focus:outline-none focus:border-sv-blue/50 focus:bg-white/[0.07] transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className="block text-sm text-white/40 mb-2 font-medium">Company</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/8 text-white placeholder-white/20 text-sm focus:outline-none focus:border-sv-blue/50 focus:bg-white/[0.07] transition-all"
                        placeholder="Your Company"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-white/40 mb-2 font-medium">Inquiry Type *</label>
                      <select
                        required
                        value={formData.inquiryType}
                        onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/8 text-white text-sm focus:outline-none focus:border-sv-blue/50 focus:bg-white/[0.07] transition-all appearance-none"
                      >
                        <option value="" className="bg-[#1a1c2e] text-white/40">Select an option</option>
                        {inquiryTypes.map((type) => (
                          <option key={type} value={type} className="bg-[#1a1c2e] text-white">
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm text-white/40 mb-2 font-medium">Message *</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/8 text-white placeholder-white/20 text-sm focus:outline-none focus:border-sv-blue/50 focus:bg-white/[0.07] transition-all resize-none"
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
                      <div className="w-10 h-10 rounded-xl bg-sv-blue/10 flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-5 h-5 text-sv-blue" />
                      </div>
                      <div>
                        <div className="text-xs text-white/30 font-medium uppercase tracking-wider mb-1">
                          {info.label}
                        </div>
                        <div className="text-sm text-white/70">{info.value}</div>
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
