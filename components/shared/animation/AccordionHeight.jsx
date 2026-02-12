"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { OCHI_EASE } from "@/components/shared/animation/motionConfig";

export default function AccordionHeight({ open, children, className = "" }) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return open ? <div className={className}>{children}</div> : null;
  }

  return (
    <AnimatePresence initial={false}>
      {open ? (
        <motion.div
          className={className}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{
            height: { duration: 0.5, ease: OCHI_EASE },
            opacity: { duration: 0.28, ease: OCHI_EASE }
          }}
        >
          {children}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
