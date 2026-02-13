"use client";

import Lenis from "lenis";
import { useEffect } from "react";

const OCHI_SCROLL_EVENT = "ochi:scroll-frame";
const OCHI_SCROLL_EASING = (t) => 1 - (1 - t) ** 3.4;

function getHeaderOffset() {
  const header = document.querySelector("[data-component='header']");
  return header instanceof HTMLElement ? header.offsetHeight : 0;
}

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

export default function SmoothScrollProvider({ children }) {
  useEffect(() => {
    const reducedMotionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotionMedia.matches) {
      document.documentElement.dataset.smoothScroll = "native";
      return undefined;
    }

    const lenis = new Lenis({
      autoRaf: false,
      smoothWheel: true,
      lerp: 0.085,
      wheelMultiplier: 0.92,
      syncTouch: true,
      syncTouchLerp: 0.075,
      touchInertiaExponent: 1.45,
      touchMultiplier: 1.04,
      overscroll: false,
      stopInertiaOnNavigate: true,
      prevent: (node) => node?.hasAttribute?.("data-lenis-prevent") ?? false
    });

    let rafId = 0;
    const onLenisScroll = (instance) => {
      window.dispatchEvent(
        new CustomEvent(OCHI_SCROLL_EVENT, {
          detail: {
            scroll: instance.scroll,
            progress: instance.progress,
            velocity: instance.velocity,
            direction: instance.direction
          }
        })
      );
    };

    const onDocumentClick = (event) => {
      if (!isUnmodifiedLeftClick(event)) {
        return;
      }

      const link = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!(link instanceof HTMLAnchorElement) || link.target === "_blank") {
        return;
      }

      const href = link.getAttribute("href");
      if (!href || href === "#") {
        return;
      }

      const destination = new URL(href, window.location.href);
      if (destination.origin !== window.location.origin || !destination.hash) {
        return;
      }

      if (destination.pathname !== window.location.pathname) {
        return;
      }

      const target = document.querySelector(destination.hash);
      if (!(target instanceof HTMLElement)) {
        return;
      }

      event.preventDefault();

      lenis.scrollTo(target, {
        offset: -getHeaderOffset(),
        duration: 1.05,
        easing: OCHI_SCROLL_EASING,
        lock: false
      });

      if (destination.hash !== window.location.hash) {
        window.history.pushState({}, "", `${destination.pathname}${destination.hash}`);
      }
    };

    const raf = (time) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };

    document.documentElement.dataset.smoothScroll = "lenis";
    window.__ochiLenis = lenis;
    lenis.on("scroll", onLenisScroll);
    window.requestAnimationFrame(() => {
      lenis.scrollTo(window.scrollY, { immediate: true, force: true });
    });
    document.addEventListener("click", onDocumentClick);
    rafId = window.requestAnimationFrame(raf);

    return () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
      document.removeEventListener("click", onDocumentClick);
      lenis.off("scroll", onLenisScroll);
      lenis.destroy();
      if (window.__ochiLenis === lenis) {
        delete window.__ochiLenis;
      }
      document.documentElement.dataset.smoothScroll = "native";
    };
  }, []);

  return children;
}
