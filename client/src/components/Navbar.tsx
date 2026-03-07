/*
 * DESIGN: Meridian — Refined Dark Luxury
 * Navbar: Slim top bar that transforms into floating pill on scroll.
 * Uses Sora for brand, Inter for nav links.
 * Frosted glass effect with subtle border.
 * UMBRELLA SITE: Internal links + external division links.
 */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ExternalLink } from "lucide-react";

/* These will be updated once the standalone sites are published */
const SALESVISION_URL = "#salesvision";
const TRAVELVISION_URL = "#travelvision";

const internalLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const externalLinks = [
  { href: SALESVISION_URL, label: "SalesVision", color: "text-tv-orange" },
  { href: TRAVELVISION_URL, label: "TravelVision", color: "text-sv-blue" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "top-4 mx-4 sm:mx-8 lg:mx-auto lg:max-w-5xl rounded-2xl"
            : ""
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className={`transition-all duration-500 ${
            scrolled
              ? "glass-card rounded-2xl shadow-2xl shadow-black/20"
              : "bg-brand-darker/80 backdrop-blur-md border-b border-white/5"
          }`}
        >
          <div className={`flex items-center justify-between h-16 ${scrolled ? "px-6" : "px-4 sm:px-8 lg:px-12"}`}>
            {/* Logo */}
            <Link href="/">
              <span className="font-[Sora] font-bold text-lg tracking-tight text-white">
                Sales<span className="gradient-text-blue">Vision</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {internalLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span
                    className={`relative px-3.5 py-2 text-sm font-medium transition-colors duration-200 rounded-lg ${
                      location === link.href
                        ? "text-white"
                        : "text-white/50 hover:text-white/80"
                    }`}
                  >
                    {link.label}
                    {location === link.href && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute inset-0 rounded-lg bg-white/8"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                  </span>
                </Link>
              ))}
              <div className="w-px h-5 bg-white/10 mx-2" />
              {externalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-white/50 hover:${link.color} transition-colors duration-200 rounded-lg`}
                >
                  {link.label}
                  <ExternalLink size={12} className="opacity-50" />
                </a>
              ))}
            </nav>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <Link href="/contact">
                <span className="hidden sm:inline-flex px-5 py-2 text-sm font-semibold text-white bg-sv-blue hover:bg-sv-blue-light rounded-lg transition-colors duration-200">
                  Get Started
                </span>
              </Link>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 text-white/70 hover:text-white transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 pt-20 bg-brand-darker/95 backdrop-blur-xl lg:hidden"
          >
            <nav className="flex flex-col items-center gap-2 p-6">
              {internalLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link href={link.href}>
                    <span
                      className={`block px-6 py-3 text-lg font-medium rounded-xl transition-colors ${
                        location === link.href
                          ? "text-white bg-white/8"
                          : "text-white/60 hover:text-white"
                      }`}
                    >
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
              <div className="w-16 h-px bg-white/10 my-2" />
              {externalLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (internalLinks.length + i) * 0.05 }}
                >
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 text-lg font-medium text-white/60 hover:text-white rounded-xl transition-colors"
                  >
                    {link.label}
                    <ExternalLink size={14} className="opacity-50" />
                  </a>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mt-4"
              >
                <Link href="/contact">
                  <span className="px-8 py-3 text-base font-semibold text-white bg-sv-blue rounded-xl">
                    Get Started
                  </span>
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
