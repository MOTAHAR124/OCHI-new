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
    const updateDynamicVh = () => {
      document.documentElement.style.setProperty("--vh-dynamic", `${window.innerHeight}px`);
    };
    const setStaticVh = () => {
      document.documentElement.style.setProperty("--vh-static", `${window.innerHeight}px`);
    };

    setStaticVh();
    updateDynamicVh();
    window.addEventListener("resize", updateDynamicVh);
    window.addEventListener("orientationchange", updateDynamicVh);

    const reducedMotionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
    const shouldUseSmoothScroll = window.innerWidth >= 1200;
    if (reducedMotionMedia.matches || !shouldUseSmoothScroll) {
      document.documentElement.dataset.smoothScroll = "native";
      return () => {
        window.removeEventListener("resize", updateDynamicVh);
        window.removeEventListener("orientationchange", updateDynamicVh);
      };
    }

    const viewportScale = Math.max(1, window.innerWidth / 1440);
    const lenis = new Lenis({
      autoRaf: false,
      smoothWheel: true,
      lerp: 0.15,
      wheelMultiplier: 0.6 * viewportScale,
      syncTouch: false,
      touchMultiplier: 2,
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
      window.removeEventListener("resize", updateDynamicVh);
      window.removeEventListener("orientationchange", updateDynamicVh);
    };
  }, []);

  return children;
}
