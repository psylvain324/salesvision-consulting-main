import { useEffect } from "react";
import { useLocation } from "wouter";

/** After route change: scroll to #hash target if present, else top (SPA-safe). */
export default function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    const id = window.setTimeout(() => {
      const hash = window.location.hash.replace(/^#/, "");
      if (hash) {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
      }
      window.scrollTo({ top: 0, behavior: "instant" });
    }, 0);
    return () => clearTimeout(id);
  }, [location]);

  return null;
}
