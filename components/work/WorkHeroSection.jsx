"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import MouseReactiveEyesSvg from "@/components/shared/animation/MouseReactiveEyesSvg";
import ScrollProgressShift from "@/components/shared/animation/ScrollProgressShift";
import RoundedSection from "@/components/shared/layout/RoundedSection";
import { workHero } from "@/data/workPageData";

export default function WorkHeroSection() {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const layerOneY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 160]), {
    stiffness: 120,
    damping: 28,
    mass: 0.35
  });
  const layerTwoY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 190]), {
    stiffness: 120,
    damping: 28,
    mass: 0.35
  });
  const eyesY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 72]), {
    stiffness: 120,
    damping: 28,
    mass: 0.35
  });

  return (
    <RoundedSection className="bg-ochi-lime">
      <div ref={sectionRef} className="h-full w-full overflow-hidden">
        <ScrollProgressShift className="section-shell pt-[9rem] lg:pt-[14rem]" multiplier={-0.1} offset={["start start", "end start"]}>
          <h1 className="mb-[1rem] uppercase leading-negative md:mb-[4rem]">
            {workHero.title}{" "}
            <sup className="font-primary relative ml-[0.12em] inline-flex align-top translate-y-[0.9em] text-[0.16em] font-thin leading-none">
              <span>({workHero.count})</span>
            </sup>
          </h1>

          <div className="relative flex justify-center px-[3rem]">
            <motion.div
              className="w-full max-w-[65rem] translate-y-[30%] md:translate-y-[10%]"
              style={{ y: reduceMotion ? 0 : eyesY }}
            >
              <MouseReactiveEyesSvg />
            </motion.div>

            <div className="pointer-events-none absolute bottom-0 left-0 right-0">
              <motion.span
                className="absolute left-0 right-0 top-full mx-auto -mt-[3.5rem] h-[10rem] w-5/6 rounded bg-[#bfda62] md:-mt-[9.5rem]"
                style={{ y: reduceMotion ? 0 : layerOneY }}
              />
              <motion.span
                className="absolute left-0 right-0 top-full mx-auto -mt-[2.5rem] h-[10rem] w-full rounded bg-[#b8d25e] md:-mt-[5.5rem]"
                style={{ y: reduceMotion ? 0 : layerTwoY }}
              />
            </div>
          </div>
        </ScrollProgressShift>
      </div>
    </RoundedSection>
  );
}
