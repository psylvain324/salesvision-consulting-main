/* Animated section waves — adapted from https://codepen.io/cmdw/pen/vQqzyB (CMDW) */
import { useId } from "react";

type SectionWaveDividerProps = {
  /** Rotate 180° so crests face the other section */
  flip?: boolean;
  className?: string;
};

export default function SectionWaveDivider({ flip, className = "" }: SectionWaveDividerProps) {
  const uid = useId().replace(/:/g, "");
  const pathId = `section-wave-path-${uid}`;

  return (
    <div
      className={`relative w-full overflow-hidden leading-[0] pointer-events-none select-none ${
        flip ? "[transform:rotate(180deg)]" : ""
      } ${className}`.trim()}
      aria-hidden
    >
      <svg
        className="section-wave-editorial block w-full h-[60px] max-h-[60px] min-w-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        shapeRendering="auto"
      >
        <defs>
          <path
            id={pathId}
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
        </defs>
        <g className="section-wave-parallax1">
          <use href={`#${pathId}`} x={48} y={0} className="section-wave-fill-1" />
        </g>
        <g className="section-wave-parallax2">
          <use href={`#${pathId}`} x={48} y={3} className="section-wave-fill-2" />
        </g>
        <g className="section-wave-parallax3">
          <use href={`#${pathId}`} x={48} y={6} className="section-wave-fill-3" />
        </g>
        <g className="section-wave-parallax4">
          <use href={`#${pathId}`} x={48} y={9} className="section-wave-fill-4" />
        </g>
      </svg>
    </div>
  );
}
