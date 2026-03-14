/*
 * Footer: VanRein-inspired light footer. Clean layout, blue & orange accents.
 */
export default function Footer() {
  return (
    <footer className="relative border-t border-sv-blue/20 bg-sv-blue text-white">
      <div className="container py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/70">
            &copy; {new Date().getFullYear()} SalesVision-Consulting. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-white/70 hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="text-xs text-white/70 hover:text-white cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
