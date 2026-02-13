"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function useViewportHeight() {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const update = () => setHeight(window.innerHeight || 0);
    update();
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("resize", update);
    };
  }, []);

  return height;
}

export default function ScrollProgressShift({
  className = "",
  children,
  multiplier = 1,
  offset = ["end end", "end start"]
}) {
  const targetRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const viewportHeight = useViewportHeight();

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, viewportHeight * multiplier]);

  return (
    <div ref={targetRef} className={className}>
      <motion.div className="h-full w-full" style={{ y: reduceMotion ? 0 : y }}>
        {children}
      </motion.div>
    </div>
  );
}
