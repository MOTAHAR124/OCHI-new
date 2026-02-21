"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import MouseReactiveEyesSvg from "@/components/shared/animation/MouseReactiveEyesSvg";
import ArrowUpRightIcon from "@/components/site/ArrowUpRightIcon";
import ScrollProgressShift from "@/components/shared/animation/ScrollProgressShift";

function useViewportHeight() {
  const [height, setHeight] = useState(() => (typeof window === "undefined" ? 0 : window.innerHeight || 0));

  useEffect(() => {
    const update = () => setHeight(window.innerHeight || 0);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("resize", update);
    };
  }, []);

  return height;
}

function SmoothEyesParallax({ className = "", sectionRef, multiplier = 0, children }) {
  const reduceMotion = useReducedMotion();
  const viewportHeight = useViewportHeight();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, viewportHeight * multiplier]);
  const smoothY = useSpring(y, { stiffness: 85, damping: 24, mass: 0.45 });

  return (
    <div className={className}>
      <motion.div className="h-full w-full" style={{ y: reduceMotion ? 0 : smoothY }}>
        {children}
      </motion.div>
    </div>
  );
}

export default function ReadyToStartSection({
  withParallax = false,
  startProjectHref = "#contact",
  contentMultiplier = 1,
  eyesMultiplier = 0.4
}) {
  const sectionRef = useRef(null);
  const shellPadding = "py-[7rem] md:py-[8.5rem] xl:py-[14rem]";
  const desktopEyesLayerClass =
    "pointer-events-none hidden w-full will-change-transform xl:absolute xl:left-0 xl:top-0 xl:z-[2] xl:block xl:h-[100vh]";
  const mobileEyesLayerClass = "pointer-events-none mb-[4rem] w-full xl:hidden";

  return (
    <section ref={sectionRef} className="rounded-section relative bg-ochi-lime">
      <div className="relative h-full w-full overflow-hidden">
        <SmoothEyesParallax
          className={desktopEyesLayerClass}
          sectionRef={sectionRef}
          multiplier={withParallax ? eyesMultiplier : 0}
        >
          <div className="flex h-full w-full items-center justify-center px-[8rem] xl:p-[3rem]">
            <div className="w-full max-w-[36rem]">
              <MouseReactiveEyesSvg />
            </div>
          </div>
        </SmoothEyesParallax>

        <ScrollProgressShift className={`section-shell relative ${shellPadding}`} multiplier={contentMultiplier}>
          <div className="w-full text-center">
            <h2 className="heading-large leading-negative mb-[4rem] uppercase">
              Ready
              <br />
              to start
              <br />
              the project?
            </h2>
          </div>

          <div className={mobileEyesLayerClass}>
            <div className="flex h-full w-full items-center justify-center px-[8rem] xl:p-[3rem]">
              <div className="w-full max-w-[36rem]">
                <MouseReactiveEyesSvg />
              </div>
            </div>
          </div>

          <div className="grid items-center justify-center gap-y-[1.2rem] text-center">
            <div>
              <a href={startProjectHref} className="btn btn--primary">
                <span className="btn__text">Start the project</span>
                <span className="btn__icon btn__icon--append" aria-hidden="true">
                  <ArrowUpRightIcon />
                </span>
              </a>
            </div>
            <span>OR</span>
            <div>
              <a href="mailto:hello@ochi.design" className="btn btn--default">
                <span className="btn__text">hello@ochi.design</span>
                <span className="btn__icon btn__icon--append" aria-hidden="true">
                  <ArrowUpRightIcon />
                </span>
              </a>
            </div>
          </div>
        </ScrollProgressShift>
      </div>
    </section>
  );
}
