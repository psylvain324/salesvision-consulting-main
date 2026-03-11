/*
 * DESIGN: Meridian — Refined Dark Luxury
 * Footer: Clean, structured footer with brand identity and links.
 * UMBRELLA SITE: External links to sister company sites.
 */
import { Link } from "wouter";

/* These will be updated once the standalone sites are published */
const TRAVELVISION_URL = "#travelvision";
const PORTFOLIO_URL = "https://portfolio.salesvision-consulting.com";

const footerLinks = {
  company: [
    { href: PORTFOLIO_URL, label: "About", external: true },
    { href: "/services", label: "Services", external: false },
    { href: "/workflows", label: "Workflows", external: false },
    { href: "/integrations", label: "Integrations", external: false },
    { href: "/contact", label: "Contact", external: false },
  ],
  services: [
    { href: "/services", label: "AI Automation", external: false },
    { href: "/services", label: "Web Design", external: false },
    { href: "/services", label: "Consulting", external: false },
    { href: "/services", label: "Custom Development", external: false },
  ],
};

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-brand-darker">
      <div className="container py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 lg:max-w-4xl">
          {/* Brand Column */}
          <div>
            <Link href="/">
              <span className="font-[Sora] font-bold text-xl tracking-tight text-white">
                Sales<span className="gradient-text-blue">Vision</span>
              </span>
            </Link>
            <p className="mt-3 text-sm text-white/40 leading-relaxed max-w-xs">
              Powering business growth through AI automation, digital marketing, and innovative technology solutions.
            </p>
            <a
              href={TRAVELVISION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm text-white/50 hover:text-white transition-colors duration-200"
            >
              TravelVision ↗
            </a>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="section-label text-white/30 mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white/50 hover:text-white transition-colors duration-200"
                    >
                      {link.label} ↗
                    </a>
                  ) : (
                    <Link href={link.href}>
                      <span className="text-sm text-white/50 hover:text-white transition-colors duration-200">
                        {link.label}
                      </span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="section-label text-white/30 mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>
                    <span className="text-sm text-white/50 hover:text-white transition-colors duration-200">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} SalesVision-Consulting. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-white/30">Privacy Policy</span>
            <span className="text-xs text-white/30">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
