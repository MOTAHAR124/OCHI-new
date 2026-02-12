"use client";

import { motion, useReducedMotion } from "framer-motion";
import { OCHI_EASE } from "@/components/shared/animation/motionConfig";

export default function RevealInView({
  children,
  className,
  delay = 0,
  offset = 30,
  once = true,
  amount = 0.3
}) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: offset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 0.8, ease: OCHI_EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
