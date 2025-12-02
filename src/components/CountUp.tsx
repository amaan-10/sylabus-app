"use client";

import React, { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useInView,
} from "framer-motion";

type CountUpProps = {
  from?: number;
  to?: number;
  duration?: number;
  className?: string;
  // how much of the element should be visible before triggering (0-1)
  threshold?: number;
  // if true, animate only once; if false, animate every time it enters view
  once?: boolean;
};

export default function CountUp({
  from = 0,
  to = 54,
  duration = 2,
  className = "",
  threshold = 0.5,
  once = false,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once, amount: threshold });

  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.floor(latest));

  const [display, setDisplay] = React.useState(from);

  // subscribe to motion value changes to update displayed number
  useEffect(() => {
    const unsubscribe = rounded.on("change", (v) => setDisplay(v));
    return () => unsubscribe();
  }, [rounded]);

  // animate when inView becomes true; reset when out of view if once === false
  useEffect(() => {
    let controls: { stop: () => void } | null = null;

    if (inView) {
      // start animation from current value (or from `from` if you prefer)
      controls = animate(count, to, {
        duration,
        ease: "easeOut",
      });
    } else if (!once) {
      // reset to initial state so it can animate again next time it enters view
      // set both motion value and displayed state
      count.set(from);
      setDisplay(from);
    }

    return () => {
      if (controls) controls.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, to, duration, once, from]);

  return (
    <motion.span
      ref={ref}
      className={className}
      aria-hidden="true"
      // will-change hint for smooth animation
      style={{ willChange: "transform, opacity" } as React.CSSProperties}
    >
      {display}
      {"+"}
    </motion.span>
  );
}
