"use client";

import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";

function EyeSvg({
  side,
  groupRef,
  withStroke = false,
  strokeColor = "rgba(0, 0, 0, 0.2)",
  label = ""
}) {
  return (
    <svg
      className="h-auto w-full flex-grow overflow-visible"
      data-eye={side}
      width="200"
      height="201"
      viewBox="0 0 200 201"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="100" cy="100" r="100" fill="#F4F4F4" stroke={withStroke ? strokeColor : "none"} />
      <g ref={groupRef} className="eyes-svg__group origin-center">
        <circle cx="100" cy="100" r="60" fill="#212121" />
        <circle cx="100" cy="50" r="8" fill="#F4F4F4" />
      </g>
      {label ? (
        <text className="uppercase" x="100" y="105" textAnchor="middle" fill="#F4F4F4">
          {label}
        </text>
      ) : null}
    </svg>
  );
}

export default function MouseReactiveEyesSvg({
  className = "",
  movementCoeff = 0.03,
  maxTravelRatio = 0.18,
  withStroke = false,
  strokeColor = "rgba(0, 0, 0, 0.2)",
  label = ""
}) {
  const holderRef = useRef(null);
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);
  const leftGroupRef = useRef(null);
  const rightGroupRef = useRef(null);

  const eyes = useMemo(
    () => [
      { eyeRef: leftEyeRef, groupRef: leftGroupRef },
      { eyeRef: rightEyeRef, groupRef: rightGroupRef }
    ],
    []
  );

  useEffect(() => {
    if (!holderRef.current || !leftGroupRef.current || !rightGroupRef.current) {
      return undefined;
    }

    const animateEye = (x, y, eyeRef, groupRef) => {
      const eye = eyeRef.current;
      const group = groupRef.current;
      if (!eye || !group) {
        return;
      }

      const bounds = eye.getBoundingClientRect();
      const centerX = bounds.left + bounds.width / 2;
      const centerY = bounds.top + bounds.height / 2;

      const angle = Math.atan2(x - centerX, -(y - centerY)) * (180 / Math.PI);
      const movement = withStroke ? Math.min(movementCoeff, 0.024) : movementCoeff;
      const maxRatio = withStroke ? Math.min(maxTravelRatio, 0.14) : maxTravelRatio;
      let offsetX = (x - centerX) * movement;
      let offsetY = (y - centerY) * movement;
      const maxTravel = Math.min(bounds.width, bounds.height) * maxRatio;
      const travelDistance = Math.hypot(offsetX, offsetY);

      if (travelDistance > maxTravel && travelDistance > 0) {
        const clampedScale = maxTravel / travelDistance;
        offsetX *= clampedScale;
        offsetY *= clampedScale;
      }

      gsap.set(group, { rotate: angle, transformOrigin: "center" });
      gsap.to(group, {
        duration: 0.3,
        x: offsetX,
        y: offsetY,
        overwrite: "auto"
      });
    };

    const onPointerMove = (event) => {
      const { clientX, clientY } = event;
      eyes.forEach(({ eyeRef, groupRef }) => {
        animateEye(clientX, clientY, eyeRef, groupRef);
      });
    };

    const onReset = () => {
      eyes.forEach(({ groupRef }) => {
        if (!groupRef.current) {
          return;
        }
        gsap.to(groupRef.current, {
          duration: 0.3,
          x: 0,
          y: 0,
          rotate: 0,
          overwrite: "auto"
        });
      });
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("mousemove", onPointerMove, { passive: true });
    window.addEventListener("blur", onReset);
    window.addEventListener("mouseleave", onReset);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("blur", onReset);
      window.removeEventListener("mouseleave", onReset);
      eyes.forEach(({ groupRef }) => {
        if (groupRef.current) {
          gsap.killTweensOf(groupRef.current);
        }
      });
    };
  }, [eyes, maxTravelRatio, movementCoeff, withStroke]);

  return (
    <div
      ref={holderRef}
      className={`grid w-full grid-cols-2 items-center justify-center gap-[8.333333%] ${className}`}
    >
      <div ref={leftEyeRef}>
        <EyeSvg
          side="left"
          groupRef={leftGroupRef}
          withStroke={withStroke}
          strokeColor={strokeColor}
          label={label}
        />
      </div>
      <div ref={rightEyeRef}>
        <EyeSvg
          side="right"
          groupRef={rightGroupRef}
          withStroke={withStroke}
          strokeColor={strokeColor}
          label={label}
        />
      </div>
    </div>
  );
}
