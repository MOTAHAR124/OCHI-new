"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const PUPIL_TRAVEL_FACTOR = 0.56;
const DEFAULT_HIGHLIGHT_X = -14;
const DEFAULT_HIGHLIGHT_Y = -14;

function Eye({ label, size, pupilSize, side }) {
  const eyeRef = useRef(null);
  const pupilRef = useRef(null);
  const highlightRef = useRef(null);

  useEffect(() => {
    const eye = eyeRef.current;
    const pupil = pupilRef.current;
    const highlight = highlightRef.current;
    if (!eye || !pupil || !highlight) {
      return undefined;
    }

    const moveX = gsap.quickTo(pupil, "x", {
      duration: 0.2,
      ease: "power3.out"
    });
    const moveY = gsap.quickTo(pupil, "y", {
      duration: 0.2,
      ease: "power3.out"
    });
    const moveHighlightX = gsap.quickTo(highlight, "x", {
      duration: 0.18,
      ease: "power3.out"
    });
    const moveHighlightY = gsap.quickTo(highlight, "y", {
      duration: 0.18,
      ease: "power3.out"
    });

    const animate = (x, y) => {
      const rect = eye.getBoundingClientRect();
      const pupilRect = pupil.getBoundingClientRect();
      const highlightRect = highlight.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = x - centerX;
      const dy = y - centerY;
      const distance = Math.hypot(dx, dy);
      const angle = Math.atan2(dy, dx);
      const maxPupilTravel = Math.max((rect.width - pupilRect.width) * 0.5, 0);
      const pupilDistance = Math.min(distance, maxPupilTravel * PUPIL_TRAVEL_FACTOR);
      const maxHighlightTravel = Math.max((pupilRect.width - highlightRect.width) * 0.5 - 2, 0);

      moveX(Math.cos(angle) * pupilDistance);
      moveY(Math.sin(angle) * pupilDistance);
      moveHighlightX(Math.cos(angle) * maxHighlightTravel);
      moveHighlightY(Math.sin(angle) * maxHighlightTravel);
    };

    const onPointerMove = (event) => {
      animate(event.clientX, event.clientY);
    };

    const onMouseMove = (event) => {
      animate(event.clientX, event.clientY);
    };

    const resetPupil = () => {
      moveX(0);
      moveY(0);
      moveHighlightX(DEFAULT_HIGHLIGHT_X);
      moveHighlightY(DEFAULT_HIGHLIGHT_Y);
    };

    resetPupil();

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("pointerleave", resetPupil);
    window.addEventListener("mouseleave", resetPupil);
    window.addEventListener("blur", resetPupil);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("pointerleave", resetPupil);
      window.removeEventListener("mouseleave", resetPupil);
      window.removeEventListener("blur", resetPupil);
      gsap.killTweensOf(pupil);
      gsap.killTweensOf(highlight);
    };
  }, []);

  return (
    <div
      ref={eyeRef}
      data-eye={side}
      style={{ width: size, height: size }}
      className="eye-ball relative grid place-items-center rounded-full bg-[#f4f4f4]"
    >
      <div
        ref={pupilRef}
        style={{ width: pupilSize, height: pupilSize }}
        className="eye-pupil relative grid place-items-center rounded-full bg-[#212121]"
      >
        <span ref={highlightRef} className="eye-pupil__highlight" />
        {label ? (
          <span className="eye-label leading-none uppercase text-[#f4f4f4]">
            {label}
          </span>
        ) : null}
      </div>
    </div>
  );
}

export default function EyesBadge({
  className = "",
  label = "",
  size = "clamp(6rem, 10vw, 12.5rem)",
  pupilSize = "clamp(3rem, 5.2vw, 7.5rem)"
}) {
  return (
    <div className={`flex items-center justify-center gap-[clamp(1.2rem,4vw,3.6rem)] ${className}`}>
      <Eye side="left" label={label} size={size} pupilSize={pupilSize} />
      <Eye side="right" label={label} size={size} pupilSize={pupilSize} />
    </div>
  );
}
