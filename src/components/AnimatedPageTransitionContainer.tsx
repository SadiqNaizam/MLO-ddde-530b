import React from 'react';
import { motion, Variants } from 'framer-motion';

interface AnimatedPageTransitionContainerProps {
  children: React.ReactNode;
}

const pageTransitionVariants: Variants = {
  initial: {
    opacity: 0,
    x: "30vw", // Start slightly off-screen to the right
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7, // A slightly longer duration for a "cinematic" feel
      ease: [0.6, -0.05, 0.01, 0.99], // Custom cubic bezier for a smooth, high-end feel
    },
  },
  exit: {
    opacity: 0,
    x: "-30vw", // Exit slightly off-screen to the left
    transition: {
      duration: 0.5, // Slightly faster exit
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

const AnimatedPageTransitionContainer: React.FC<AnimatedPageTransitionContainerProps> = ({ children }) => {
  console.log('AnimatedPageTransitionContainer loaded');

  return (
    <motion.div
      variants={pageTransitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ position: 'relative' }} // Ensures proper stacking context for transitions if needed
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPageTransitionContainer;