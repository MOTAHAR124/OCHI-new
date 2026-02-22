"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function AboutCustomCursor() {
  const holderRef = useRef(null);

  useEffect(() => {
    const holder = holderRef.current;
    if (!holder) {
      return undefined;
    }

    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) {
      return undefined;
    }

    const html = document.documentElement;
    let hoverTarget = null;

    const updateHoverState = (event) => {
      const nextTarget = event.target instanceof Element ? event.target.closest("[data-cursor]") : null;
      if (nextTarget === hoverTarget) {
        return;
      }

      if (hoverTarget) {
        const previousType = hoverTarget.getAttribute("data-cursor");
        if (previousType) {
          holder.classList.remove(`cursor--is-hover--${previousType}`);
        }
      }

      hoverTarget = nextTarget;
      if (hoverTarget) {
        const nextType = hoverTarget.getAttribute("data-cursor");
        if (nextType) {
          holder.classList.add(`cursor--is-hover--${nextType}`);
        }
      }
    };

    const onMove = (event) => {
      html.classList.remove("cursor--is-hidden");
      gsap.to(holder, {
        duration: 0.1,
        x: event.clientX,
        y: event.clientY,
        overwrite: "auto"
      });
      updateHoverState(event);
    };

    const onDown = () => {
      holder.classList.add("cursor--pressed");
    };

    const onUp = () => {
      holder.classList.remove("cursor--pressed");
    };

    const onLeaveViewport = () => {
      html.classList.add("cursor--is-hidden");
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("blur", onLeaveViewport);
    document.addEventListener("mouseleave", onLeaveViewport);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("blur", onLeaveViewport);
      document.removeEventListener("mouseleave", onLeaveViewport);
      holder.classList.remove("cursor--pressed", "cursor--is-hover--drag", "cursor--is-hover--next");
      html.classList.add("cursor--is-hidden");
      gsap.killTweensOf(holder);
    };
  }, []);

  return (
    <span
      ref={holderRef}
      className="custom-cursor pointer-events-none fixed left-0 top-0 z-[1000] invisible hidden xl:visible xl:block"
      data-page-cursor=""
    >
      <span className="custom-cursor__inner" />
    </span>
  );
}
