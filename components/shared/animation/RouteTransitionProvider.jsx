"use client";

import { usePathname, useRouter } from "next/navigation";
import { useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef } from "react";
import gsap from "gsap";
import MouseReactiveEyesSvg from "@/components/shared/animation/MouseReactiveEyesSvg";

const CLIP_START = "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)";
const CLIP_MID = "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)";
const CLIP_END = "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)";

function isUnmodifiedLeftClick(event) {
  return (
    event.button === 0 &&
    !event.defaultPrevented &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.altKey
  );
}

function stopLenis() {
  const lenis = window.__ochiLenis;
  if (lenis?.stop) {
    lenis.stop();
  }
}

function startLenis() {
  const lenis = window.__ochiLenis;
  if (lenis?.start) {
    lenis.start();
  }
}

function normalizeInternalHref(url) {
  return `${url.pathname}${url.search}${url.hash}`;
}

function getTransitionLabel(pathname) {
  const normalized = pathname === "/" ? "/" : pathname.replace(/\/+$/, "");
  if (normalized === "/") return "OCHI";
  if (normalized === "/services") return "Services";
  if (normalized === "/work") return "Our work";
  if (normalized === "/about") return "About us";
  if (normalized === "/insights") return "Insights";
  if (normalized === "/contact") return "Contact us";
  return normalized.replace(/\//g, " ").trim() || "OCHI";
}

export default function RouteTransitionProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const overlayRef = useRef(null);
  const titleRef = useRef(null);
  const eyesRef = useRef(null);
  const pageRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const showTimelineRef = useRef(null);
  const hideTimelineRef = useRef(null);
  const isAnimatingRef = useRef(false);
  const waitingForRouteRef = useRef(false);

  const resetOverlayEyes = useCallback(() => {
    const eyes = eyesRef.current;
    if (!eyes) {
      return;
    }
    const groups = eyes.querySelectorAll(".eyes-svg__group");
    groups.forEach((group) => {
      gsap.set(group, { x: 0, y: 0, rotate: 0, transformOrigin: "center" });
    });
  }, []);

  const syncEyesToPointer = useCallback(() => {
    const { x, y } = pointerRef.current;
    const event = new MouseEvent("mousemove", {
      clientX: x,
      clientY: y,
      bubbles: true,
      cancelable: false
    });
    window.dispatchEvent(event);
  }, []);

  const cleanupAnimation = useCallback(() => {
    const overlay = overlayRef.current;
    const eyes = eyesRef.current;

    isAnimatingRef.current = false;
    waitingForRouteRef.current = false;
    document.documentElement.classList.remove("is-animating");

    if (eyes) {
      gsap.set(eyes, { opacity: 0 });
    }
    resetOverlayEyes();

    if (overlay) {
      overlay.classList.remove("is-shown");
      overlay.classList.remove("is-hidden");
      gsap.set(overlay, {
        position: "fixed",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        zIndex: 500,
        pointerEvents: "none",
        backgroundColor: "#212121",
        clipPath: CLIP_END,
        webkitClipPath: CLIP_END
      });
    }

    startLenis();
  }, [resetOverlayEyes]);

  const revealRoute = useCallback(() => {
    const overlay = overlayRef.current;
    const eyes = eyesRef.current;
    const page = pageRef.current;
    if (!overlay || !page) {
      cleanupAnimation();
      return;
    }

    hideTimelineRef.current?.kill();
    hideTimelineRef.current = gsap.timeline({
      delay: 0.35,
      onComplete: cleanupAnimation
    });

    hideTimelineRef.current
      .add(() => {
        // Make route content visible before opening the overlay so pages do not look blank.
        gsap.fromTo(
          page,
          { opacity: 0.86 },
          {
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
            clearProps: "opacity",
            overwrite: true
          }
        );
      }, 0)
      .fromTo(
        overlay,
        {
          clipPath: CLIP_MID,
          webkitClipPath: CLIP_MID
        },
        {
          duration: 1,
          ease: "power3.out",
          clipPath: CLIP_END,
          webkitClipPath: CLIP_END
        }
      )
      .add(() => {
        overlay.classList.remove("is-shown");
        overlay.classList.add("is-hidden");
        if (eyes) {
          gsap.to(eyes, { opacity: 0, duration: 0.15, overwrite: true });
        }
      }, 0.4);
  }, [cleanupAnimation]);

  const beginTransition = useCallback(
    (destinationHref) => {
      if (isAnimatingRef.current) {
        return true;
      }

      const overlay = overlayRef.current;
      const eyes = eyesRef.current;
      const title = titleRef.current;
      const page = pageRef.current;
      if (!overlay || !page) {
        router.push(destinationHref);
        return true;
      }

      isAnimatingRef.current = true;
      waitingForRouteRef.current = true;
      document.documentElement.classList.add("is-animating");
      stopLenis();

      showTimelineRef.current?.kill();
      hideTimelineRef.current?.kill();
      gsap.killTweensOf([overlay, page]);

      overlay.classList.remove("is-hidden");
      overlay.classList.remove("is-shown");
      gsap.set(overlay, {
        position: "fixed",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        zIndex: 500,
        pointerEvents: "none",
        backgroundColor: "#212121"
      });

      if (title) {
        const destinationPath = new URL(destinationHref, window.location.origin).pathname;
        title.textContent = getTransitionLabel(destinationPath);
      }

      if (eyes) {
        gsap.set(eyes, { opacity: 0 });
      }
      resetOverlayEyes();

      showTimelineRef.current = gsap.timeline({
        onComplete: () => {
          gsap.set(page, { opacity: 0 });
          window.scrollTo({ top: 0, left: 0, behavior: "auto" });
          if (window.__ochiLenis?.scrollTo) {
            window.__ochiLenis.scrollTo(0, { immediate: true, force: true });
          }
          router.push(destinationHref);
        }
      });

      showTimelineRef.current
        .fromTo(
          overlay,
          {
            clipPath: CLIP_START,
            webkitClipPath: CLIP_START
          },
          {
            duration: 1,
            ease: "power3.in",
            clipPath: CLIP_MID,
            webkitClipPath: CLIP_MID
          }
        )
        .add(() => {
          overlay.classList.add("is-shown");
          if (eyes) {
            gsap.to(eyes, { opacity: 1, duration: 0.2, overwrite: true });
            syncEyesToPointer();
          }
        }, 0.5);

      return true;
    },
    [resetOverlayEyes, router, syncEyesToPointer]
  );

  useEffect(() => {
    const updatePointer = (event) => {
      pointerRef.current = { x: event.clientX, y: event.clientY };
    };

    window.addEventListener("pointermove", updatePointer, { passive: true });
    window.addEventListener("mousemove", updatePointer, { passive: true });

    return () => {
      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("mousemove", updatePointer);
    };
  }, []);

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (reducedMotion || !isUnmodifiedLeftClick(event)) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const link = target.closest("a[href]");
      if (!(link instanceof HTMLAnchorElement)) {
        return;
      }

      if (link.target === "_blank" || link.hasAttribute("download") || link.hasAttribute("data-transition-ignore")) {
        return;
      }

      const rawHref = link.getAttribute("href");
      if (!rawHref || rawHref.startsWith("#")) {
        return;
      }

      let destination;
      try {
        destination = new URL(link.href, window.location.href);
      } catch {
        return;
      }

      if (destination.origin !== window.location.origin) {
        return;
      }

      const current = new URL(window.location.href);
      const samePathAndSearch = destination.pathname === current.pathname && destination.search === current.search;
      const hashOnlyNavigation = samePathAndSearch && destination.hash && destination.hash !== current.hash;
      const exactSameLocation = samePathAndSearch && destination.hash === current.hash;

      if (hashOnlyNavigation || exactSameLocation) {
        return;
      }

      event.preventDefault();
      beginTransition(normalizeInternalHref(destination));
    };

    document.addEventListener("click", handleDocumentClick, true);
    return () => {
      document.removeEventListener("click", handleDocumentClick, true);
    };
  }, [beginTransition, reducedMotion]);

  useEffect(() => {
    if (reducedMotion || !waitingForRouteRef.current) {
      return;
    }
    waitingForRouteRef.current = false;
    let rafOne = 0;
    let rafTwo = 0;

    // Wait for the new route to paint at least one frame before starting reveal.
    rafOne = window.requestAnimationFrame(() => {
      rafTwo = window.requestAnimationFrame(() => {
        revealRoute();
      });
    });

    return () => {
      if (rafOne) {
        window.cancelAnimationFrame(rafOne);
      }
      if (rafTwo) {
        window.cancelAnimationFrame(rafTwo);
      }
    };
  }, [pathname, reducedMotion, revealRoute]);

  useEffect(() => {
    const overlay = overlayRef.current;
    const page = pageRef.current;

    return () => {
      showTimelineRef.current?.kill();
      hideTimelineRef.current?.kill();
      gsap.killTweensOf([overlay, page]);
      cleanupAnimation();
    };
  }, [cleanupAnimation]);

  return (
    <>
      <div ref={pageRef}>{children}</div>
      <div
        ref={overlayRef}
        data-component="transitions-overlay"
        className="route-transition-overlay"
        aria-hidden="true"
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          zIndex: 500,
          pointerEvents: "none",
          backgroundColor: "#212121",
          clipPath: CLIP_END,
          WebkitClipPath: CLIP_END
        }}
      >
        <span
          ref={titleRef}
          data-transition-title
          className="route-transition-overlay__title h1 leading-negative mb-0 uppercase"
          style={{
            position: "absolute",
            left: "2rem",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 1,
            color: "#f1f1f1"
          }}
        >
          OCHI
        </span>
        <div
          ref={eyesRef}
          className="route-transition-overlay__eyes"
          style={{
            position: "absolute",
            right: "3.4rem",
            bottom: "3.4rem",
            width: "11rem",
            opacity: 0
          }}
        >
          <MouseReactiveEyesSvg />
        </div>
      </div>
    </>
  );
}
