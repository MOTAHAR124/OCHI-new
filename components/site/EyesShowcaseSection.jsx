"use client";

import { motion } from "framer-motion";
import EyesBadge from "@/components/site/EyesBadge";
import { eyesBackdrop } from "@/data/siteData";

export default function EyesShowcaseSection() {
  return (
    <section className="section-shell pb-[8rem] pt-[4rem] md:pb-[11rem] md:pt-[5rem]">
      <div className="relative overflow-hidden rounded-[1rem]">
        <motion.img
          initial={{ scale: 1.08 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 1 }}
          src={eyesBackdrop}
          alt="Eyes section backdrop"
          className="h-[46rem] w-full object-cover sm:h-[60rem] md:h-[72rem]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/8" />

        <div className="absolute inset-0 z-[2] flex items-center justify-center px-[3rem] sm:px-[5rem]">
          <div className="w-full max-w-[45rem]">
            <EyesBadge label="play" size="min(20rem, 35vw)" pupilSize="min(12rem, 20vw)" />
          </div>
        </div>
      </div>
    </section>
  );
}
