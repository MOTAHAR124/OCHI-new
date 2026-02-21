"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import OchiLogo from "@/components/site/OchiLogo";

let hasPlayedInRuntime = false;

const padProgress = (value) => String(Math.max(0, Math.min(100, Math.round(value)))).padStart(2, "0");

export default function HomeEntryIntroGate({ children }) {
  const reducedMotion = useReducedMotion();
  const [phase, setPhase] = useState(() => (hasPlayedInRuntime ? "done" : "checking"));
  const [layoutReady, setLayoutReady] = useState(() => hasPlayedInRuntime);
  const holderRef = useRef(null);
  const contentRef = useRef(null);
  const leftSideRef = useRef(null);
  const rightSideRef = useRef(null);
  const textRef = useRef(null);
  const progressValueRef = useRef(null);

  useEffect(() => {
    if (phase !== "checking") {
      return undefined;
    }

    const frameId = window.requestAnimationFrame(() => {
      setPhase("intro");
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "intro") {
      return undefined;
    }

    const holder = holderRef.current;
    const content = contentRef.current;
    const leftSide = leftSideRef.current;
    const rightSide = rightSideRef.current;
    const text = textRef.current;
    const progressValue = progressValueRef.current;

    if (!holder || !content || !leftSide || !rightSide || !text || !progressValue) {
      const frameId = window.requestAnimationFrame(() => {
        hasPlayedInRuntime = true;
        setPhase("done");
      });
      return () => {
        window.cancelAnimationFrame(frameId);
      };
    }

    let cancelled = false;
    let outroTimeline;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const finishIntro = () => {
      if (cancelled) {
        return;
      }
      hasPlayedInRuntime = true;
      setPhase("done");
    };

    progressValue.textContent = "00";

    if (reducedMotion) {
      const timeoutId = window.setTimeout(() => {
        progressValue.textContent = "100";
        setLayoutReady(true);
        finishIntro();
      }, 120);

      return () => {
        cancelled = true;
        window.clearTimeout(timeoutId);
        document.body.style.overflow = previousOverflow;
      };
    }

    const introTimeline = gsap.timeline({
      paused: true,
      onUpdate: () => {
        progressValue.textContent = padProgress(introTimeline.progress() * 100);
      },
      onComplete: () => {
        setLayoutReady(true);

        outroTimeline = gsap.timeline({
          onComplete: finishIntro
        });

        outroTimeline
          .to(content, {
            scale: 1,
            duration: 0.75,
            ease: "power2.inOut"
          })
          .to(
            text,
            {
              autoAlpha: 0,
              duration: 0.5
            },
            "<"
          )
          .to(holder, {
            autoAlpha: 0,
            duration: 0.5
          });
      }
    });

    introTimeline
      .fromTo(
        content,
        { y: window.innerHeight / 4, opacity: 0, scale: 0.75 },
        { opacity: 1, duration: 0.5, y: 0 }
      )
      .fromTo(
        leftSide,
        { opacity: 0, xPercent: -150 },
        { x: 25, opacity: 1, duration: 1.25, ease: "power3.out" }
      )
      .fromTo(
        rightSide,
        { opacity: 0, xPercent: 150 },
        { x: 45, opacity: 1, duration: 1.25, ease: "power3.out" },
        "<"
      )
      .delay(0.5)
      .play();

    return () => {
      cancelled = true;
      introTimeline.kill();
      outroTimeline?.kill();
      gsap.killTweensOf([holder, content, leftSide, rightSide, text, progressValue]);
      document.body.style.overflow = previousOverflow;
    };
  }, [phase, reducedMotion]);

  const showIntro = phase !== "done";

  return (
    <>
      {showIntro ? (
        <div ref={holderRef} className="fixed left-0 top-0 z-[500] h-screen w-full bg-ochi-gray900">
          <div ref={contentRef} className="relative h-full w-full scale-[0.75] opacity-0">
            <span ref={rightSideRef} className="absolute inset-0 block opacity-0">
              <span className="flex h-full w-full origin-right scale-[0.8] rounded-[0.8rem] bg-ochi-gray400 lg:rounded-[1rem]" />
            </span>

            <span ref={leftSideRef} className="absolute inset-0 block opacity-0">
              <span className="flex h-full w-full origin-right scale-[0.9] rounded-[0.8rem] bg-ochi-gray300 lg:rounded-[1rem]" />
            </span>

            <div className="relative z-[2] flex h-full flex-col px-[2rem] pb-[3rem] pt-[10rem] lg:pb-[4.5rem] lg:pt-[14rem] xl:px-[5rem]">
              <span className="pointer-events-none absolute inset-[-0.5rem] -z-[1] rounded-[0.8rem] bg-ochi-gray100 lg:rounded-[1rem]" />

              <div className="absolute left-0 top-0 w-full px-[2rem] py-[1.5rem] text-ochi-ink xl:px-[5rem]">
                <OchiLogo className="h-auto w-[7.2rem]" />
              </div>

              <h1 className="mb-0 uppercase leading-negative text-ochi-ink">
                <span className="block">We create</span>
                <span className="block">eye-opening</span>
                <span className="block">presentations</span>
              </h1>

              <div ref={textRef} className="mt-auto flex items-end justify-between text-ochi-ink">
                <div className="flex items-baseline leading-none">
                  <span>Loading:</span>
                </div>
                <p className="display-copy mb-0 text-[6.4rem] uppercase leading-negative md:text-[9rem] lg:text-[10rem] xl:text-[13rem]">
                  <span ref={progressValueRef}>00</span>
                  <span>%</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div data-page-layout className={layoutReady ? "home-intro-ready" : ""}>
        {children}
      </div>
    </>
  );
}
