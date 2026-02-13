"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import EyesBadge from "@/components/site/EyesBadge";
import { eyesBackdrop } from "@/data/siteData";

export default function EyesShowcaseSection() {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const mediaY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const eyesY = useTransform(scrollYProgress, [0, 1], [0, 70]);

  return (
    <section ref={sectionRef} className="relative -z-[1] overflow-hidden bg-ochi-gray100">
      <div className="relative min-h-[30rem] overflow-hidden md:min-h-[62rem] lg:min-h-[72rem]">
        <motion.img
          initial={{ scale: 1.12 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 1 }}
          style={{ y: reduceMotion ? 0 : mediaY }}
          src={eyesBackdrop}
          alt="Eyes section backdrop"
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/10" />

        <motion.div
          className="absolute inset-0 z-[2] flex items-center justify-center px-[3rem] sm:px-[6rem]"
          style={{ y: reduceMotion ? 0 : eyesY }}
        >
          <div className="w-full max-w-[45rem]">
            <EyesBadge label="play" size="min(20rem, 35vw)" pupilSize="min(12rem, 20vw)" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
