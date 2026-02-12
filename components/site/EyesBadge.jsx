"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const PUPIL_MOVEMENT_COEFF = 0.03;

function Eye({ label, size, pupilSize, side }) {
  const eyeRef = useRef(null);
  const pupilRef = useRef(null);
  const highlightRef = useRef(null);

  useEffect(() => {
    const eye = eyeRef.current;
    const pupil = pupilRef.current;
    if (!eye || !pupil) {
      return undefined;
    }

    const moveX = gsap.quickTo(pupil, "x", {
      duration: 0.3,
      ease: "power3.out"
    });
    const moveY = gsap.quickTo(pupil, "y", {
      duration: 0.3,
      ease: "power3.out"
    });

    const animate = (x, y) => {
      const rect = eye.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = x - centerX;
      const dy = y - centerY;
      const angle = Math.atan2(x - centerX, -(y - centerY)) * (180 / Math.PI);

      moveX(dx * PUPIL_MOVEMENT_COEFF);
      moveY(dy * PUPIL_MOVEMENT_COEFF);
      gsap.set(pupil, { rotate: angle, transformOrigin: "center" });
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
      gsap.set(pupil, { rotate: 0, transformOrigin: "center" });
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
      </div>
      {label ? (
        <span className="eye-label leading-none uppercase text-[#f4f4f4]">
          {label}
        </span>
      ) : null}
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
