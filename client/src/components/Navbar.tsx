/*
 * Navbar: VanRein-inspired light header. White/light background, blue & orange accents.
 * Fixed at top; subtle shadow/backdrop animation on scroll (no moving or shrinking).
 */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ExternalLink, LayoutDashboard, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const PORTFOLIO_URL = "https://portfolio.salesvision-consulting.com";

const mainNavLinks = [
  { href: "/", label: "Home" },
  {
    label: "Services",
    href: "/services",
    subItems: [
      { href: "/workflows", label: "Workflows" },
      { href: "/integrations", label: "Integrations" },
      { href: "/marketing-media", label: "Marketing/Media" },
      { href: "/custom-development", label: "Custom Development" },
    ],
  },
  { href: "/learn", label: "Learn" },
  { href: "/contact", label: "Contact" },
];

const externalLinks = [
  { href: PORTFOLIO_URL, label: "About Me", color: "text-sv-blue" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();
  const isClientPortal = location === "/client-portal";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  if (isClientPortal) return null;

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 rounded-b-lg"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className={`transition-all duration-500 rounded-b-lg border-b border-gray-100 ${
            scrolled
              ? "bg-white/98 backdrop-blur-xl shadow-xl shadow-black/15"
              : "bg-white/95 backdrop-blur-md shadow-lg shadow-black/10"
          }`}
        >
          <div className="flex items-center justify-between h-16 px-4 sm:px-8 lg:px-12">
            {/* Logo */}
            <Link href="/" className="border-0 outline-none flex items-center">
              <img
                src="/Images/SalesVision_HeaderLogo.png"
                alt="SalesVision"
                className="h-8 w-auto"
              />
            </Link>

            {/* Desktop Nav — hidden on Client Portal */}
            {!isClientPortal && (
              <nav className="hidden lg:flex items-center gap-1">
                {mainNavLinks.map((link) =>
                  "subItems" in link ? (
                    <DropdownMenu key={link.label}>
                      <DropdownMenuTrigger asChild>
                        <span
                          className={`relative flex cursor-pointer items-center gap-1 px-3.5 py-2 text-sm font-medium transition-colors duration-200 rounded-lg ${
                            location === link.href ||
                            link.subItems.some((s) => location === s.href)
                              ? "text-sv-blue"
                              : "text-gray-600 hover:text-gray-900"
                          }`}
                        >
                          {link.label}
                          <ChevronDown className="w-4 h-4 opacity-70" />
                          {(location === link.href ||
                            link.subItems.some((s) => location === s.href)) && (
                            <motion.div
                              layoutId="nav-indicator"
                              className="absolute inset-0 rounded-lg bg-sv-blue/10"
                              transition={{ type: "spring", stiffness: 350, damping: 30 }}
                            />
                          )}
                        </span>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="min-w-[10rem] rounded-[3px]">
                        <Link href={link.href}>
                          <DropdownMenuItem
                            className={location === link.href ? "text-sv-blue bg-sv-blue/5" : ""}
                          >
                            Overview
                          </DropdownMenuItem>
                        </Link>
                        {link.subItems.map((sub) => (
                          <Link key={sub.href} href={sub.href}>
                            <DropdownMenuItem
                              className={location === sub.href ? "text-sv-blue bg-sv-blue/5" : ""}
                            >
                              {sub.label}
                            </DropdownMenuItem>
                          </Link>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Link key={link.href} href={link.href}>
                      <span
                        className={`relative px-3.5 py-2 text-sm font-medium transition-colors duration-200 rounded-lg ${
                          location === link.href
                            ? "text-sv-blue"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        {link.label}
                        {location === link.href && (
                          <motion.div
                            layoutId="nav-indicator"
                            className="absolute inset-0 rounded-lg bg-sv-blue/10"
                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                          />
                        )}
                      </span>
                    </Link>
                  )
                )}
                {externalLinks.length > 0 && (
                  <>
                    <div className="w-px h-5 bg-gray-200 mx-2" />
                    {externalLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-gray-600 hover:${link.color} transition-colors duration-200 rounded-lg`}
                      >
                        {link.label}
                        <ExternalLink size={12} className="opacity-50" />
                      </a>
                    ))}
                  </>
                )}
              </nav>
            )}

            {/* CTA + Mobile Toggle — Client Portal opens in new tab, hidden when already on Client Portal */}
            <div className="flex items-center gap-3">
              {!isClientPortal && (
                <a
                  href="/client-portal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-2 px-6 py-2.5 text-base font-semibold text-white bg-sv-blue hover:bg-sv-blue-light rounded-lg transition-all duration-200 shadow-sm shadow-sv-blue/20"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Client Portal
                </a>
              )}
              {!isClientPortal && (
                <button
                  onClick={() => setMobileOpen(!mobileOpen)}
                  className="lg:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
                  aria-label="Toggle menu"
                >
                  {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu — only when not on Client Portal */}
      {!isClientPortal && (
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 pt-20 bg-white/98 backdrop-blur-xl lg:hidden border-t border-gray-100"
            >
              <nav className="flex flex-col items-start w-full max-w-sm mx-auto gap-2 p-6">
                {mainNavLinks.map((link, i) => (
                  <motion.div
                    key={"subItems" in link ? link.label : link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="w-full"
                  >
                    {"subItems" in link ? (
                      <div className="flex flex-col gap-1">
                        <Link href={link.href}>
                          <span
                            className={`block px-6 py-3 text-lg font-medium rounded-xl transition-colors ${
                              location === link.href
                                ? "text-sv-blue bg-sv-blue/10"
                                : "text-gray-600 hover:text-gray-900"
                            }`}
                          >
                            {link.label}
                          </span>
                        </Link>
                        <div className="flex flex-col pl-8 gap-1">
                          {link.subItems.map((sub) => (
                            <Link key={sub.href} href={sub.href}>
                              <span
                                className={`block px-4 py-2 text-base font-medium rounded-lg transition-colors ${
                                  location === sub.href
                                    ? "text-sv-blue bg-sv-blue/10"
                                    : "text-gray-600 hover:text-gray-900"
                                }`}
                              >
                                {sub.label}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link href={link.href}>
                        <span
                          className={`block px-6 py-3 text-lg font-medium rounded-xl transition-colors ${
                            location === link.href
                              ? "text-sv-blue bg-sv-blue/10"
                              : "text-gray-600 hover:text-gray-900"
                          }`}
                        >
                          {link.label}
                        </span>
                      </Link>
                    )}
                  </motion.div>
                ))}
                {externalLinks.length > 0 && (
                  <>
                    <div className="w-16 h-px bg-gray-200 my-2" />
                    {externalLinks.map((link, i) => (
                      <motion.div
                        key={link.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: (mainNavLinks.length + i) * 0.05 }}
                      >
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-6 py-3 text-lg font-medium text-gray-600 hover:text-sv-blue rounded-xl transition-colors"
                        >
                          {link.label}
                          <ExternalLink size={14} className="opacity-50" />
                        </a>
                      </motion.div>
                    ))}
                  </>
                )}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="mt-4"
                >
                  <a
                    href="/client-portal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-10 py-3.5 text-lg font-semibold text-white bg-sv-blue hover:bg-sv-blue-light rounded-xl shadow-sm shadow-sv-blue/20 transition-all duration-200"
                  >
                    <LayoutDashboard className="w-5 h-5" />
                    Client Portal
                  </a>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </>
  );
}
