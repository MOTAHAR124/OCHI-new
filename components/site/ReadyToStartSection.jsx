"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import MouseReactiveEyesSvg from "@/components/shared/animation/MouseReactiveEyesSvg";
import ScrollProgressShift from "@/components/shared/animation/ScrollProgressShift";
import ArrowUpRightIcon from "@/components/site/ArrowUpRightIcon";
import EyesBadge from "@/components/site/EyesBadge";

export default function ReadyToStartSection({ withParallax = false, withScrollShift = false }) {
  const sectionRef = useRef(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const eyesY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const shellPadding = "py-[7rem] md:py-[8.5rem] lg:py-[14rem]";

  return (
    <section ref={sectionRef} className="rounded-section relative bg-ochi-lime">
      <div className="h-full w-full overflow-hidden">
        {withScrollShift ? (
          <ScrollProgressShift className={`section-shell relative ${shellPadding}`} multiplier={1}>
            <div className="text-center">
              <h2 className="heading-large leading-negative mb-[4rem] uppercase">
                Ready
                <br />
                to start
                <br />
                the project?
              </h2>
            </div>

            {withParallax ? (
              <motion.div
                className="pointer-events-none mb-[4rem] flex w-full items-center justify-center px-[8rem] lg:absolute lg:left-0 lg:top-0 lg:z-[2] lg:mb-0 lg:h-[calc(100vh+1.5rem)] lg:px-[3rem]"
                style={{ y: reducedMotion ? 0 : eyesY }}
              >
                <div className="w-full max-w-[36rem]">
                  <MouseReactiveEyesSvg />
                </div>
              </motion.div>
            ) : (
              <div className="pointer-events-none absolute left-1/2 top-1/2 hidden w-full max-w-[36rem] -translate-x-1/2 -translate-y-1/2 lg:block">
                <EyesBadge size="clamp(8rem, 11vw, 20rem)" pupilSize="clamp(4.5rem, 6.6vw, 12rem)" />
              </div>
            )}

            <div className="grid justify-center gap-y-[1.2rem] text-center">
              <div>
                <a href="#contact" className="btn btn--primary">
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
        ) : (
          <div className={`section-shell relative ${shellPadding}`}>
            <div className="text-center">
              <h2 className="heading-large leading-negative mb-[4rem] uppercase">
                Ready
                <br />
                to start
                <br />
                the project?
              </h2>
            </div>

            {withParallax ? (
              <motion.div
                className="pointer-events-none mb-[4rem] flex w-full items-center justify-center px-[8rem] lg:absolute lg:left-0 lg:top-0 lg:z-[2] lg:mb-0 lg:h-[calc(100vh+1.5rem)] lg:px-[3rem]"
                style={{ y: reducedMotion ? 0 : eyesY }}
              >
                <div className="w-full max-w-[36rem]">
                  <MouseReactiveEyesSvg />
                </div>
              </motion.div>
            ) : (
              <div className="pointer-events-none absolute left-1/2 top-1/2 hidden w-full max-w-[36rem] -translate-x-1/2 -translate-y-1/2 lg:block">
                <EyesBadge size="clamp(8rem, 11vw, 20rem)" pupilSize="clamp(4.5rem, 6.6vw, 12rem)" />
              </div>
            )}

            <div className="grid justify-center gap-y-[1.2rem] text-center">
              <div>
                <a href="#contact" className="btn btn--primary">
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
          </div>
        )}
      </div>
    </section>
  );
}
