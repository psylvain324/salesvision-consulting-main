/*
 * Scroll Down Button — CodePen nxworld/OyRrGy style #3
 * Circular outline with chevron and pulsating ring animation.
 */
import { useCallback } from "react";

type ScrollDownButtonProps = {
  /** Target section ID (e.g. "section-services") */
  to: string;
  /** Use light/white styling for dark backgrounds (hero) */
  light?: boolean;
  className?: string;
};

export default function ScrollDownButton({
  to,
  light = false,
  className = "",
}: ScrollDownButtonProps) {
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      const el = document.getElementById(to);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    [to]
  );

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Scroll to next section"
      className={`scroll-down-btn-03 ${light ? "scroll-down-btn-03--light" : ""} ${className}`.trim()}
      data-to={to}
    >
      <span className="scroll-down-btn-03-icon" aria-hidden />
      <span>Scroll</span>
    </button>
  );
}
