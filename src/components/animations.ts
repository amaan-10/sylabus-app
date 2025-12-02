import { easeOut } from "framer-motion"

export const parentStagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,   // each element appears one after another
    },
  },
}

export const fadeUp = {
  hidden: {
    opacity: 0,
    y: -20, // comes from top
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOut,
    },
  },
}

export const fadeUpFromBottom = {
  hidden: {
    opacity: 0,
    y: 30, // start slightly below
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOut,
    },
  },
};

// /components/animations.ts
export const wordParent = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06, // tweak speed between words
    },
  },
};

export const wordChild = {
  hidden: {
    opacity: 0,
    y: 18,             // starts slightly below (down -> up)
    filter: "blur(6px)" // start blurred
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: easeOut,
    },
  },
};
