"use client";

import { motion } from "framer-motion";
import EyesBadge from "@/components/site/EyesBadge";
import { eyesBackdrop } from "@/data/siteData";

export default function EyesShowcaseSection() {
  return (
    <section className="relative -z-[1] bg-ochi-gray100">
      <div className="relative min-h-[30rem] overflow-hidden md:min-h-[62rem] lg:min-h-[72rem]">
        <motion.img
          initial={{ scale: 1.12 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 1 }}
          src={eyesBackdrop}
          alt="Eyes section backdrop"
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/10" />

        <div className="absolute inset-0 z-[2] flex items-center justify-center px-[3rem] sm:px-[6rem]">
          <div className="w-full max-w-[45rem]">
            <EyesBadge label="play" size="min(20rem, 35vw)" pupilSize="min(12rem, 20vw)" />
          </div>
        </div>
      </div>
    </section>
  );
}
