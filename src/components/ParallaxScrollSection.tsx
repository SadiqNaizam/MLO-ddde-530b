import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxScrollSectionProps {
  /** Source URL for the background image. */
  imageUrl: string;
  /**
   * Strength of the parallax effect.
   * A value of 0 means no parallax. Higher values increase the movement difference.
   * This value multiplies a base pixel movement range. E.g., strength 0.2 with base 100px results in +/-20px movement.
   * Recommended range: 0.1 to 0.5.
   * Default: 0.2
   */
  strength?: number;
  /**
   * Minimum height of the section. Can be any valid CSS height string (e.g., '500px', '70vh', '100vh').
   * Default: '70vh'
   */
  minHeight?: string;
  /** Content to be displayed within the parallax section. */
  children?: React.ReactNode;
  /** Additional CSS classes for the main section wrapper. */
  className?: string;
  /** Additional CSS classes for the background image div. */
  bgClassName?: string;
  /** Additional CSS classes for the content container div. */
  contentClassName?: string;
}

const ParallaxScrollSection: React.FC<ParallaxScrollSectionProps> = ({
  imageUrl,
  strength = 0.2,
  minHeight = '70vh',
  children,
  className = '',
  bgClassName = '',
  contentClassName = '',
}) => {
  console.log('ParallaxScrollSection loaded');
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"], // Animation tracks from when section top enters viewport bottom, to when section bottom leaves viewport top
  });

  // Calculate y-offset for the background image.
  // As scrollYProgress (0 to 1) occurs:
  // yOffset moves from (strength * 100)px (background shifted down)
  // to -(strength * 100)px (background shifted up).
  // This creates the parallax effect: background moves less/slower than foreground content.
  // Total vertical travel for background: (strength * 200)px.
  const yOffset = useTransform(scrollYProgress, [0, 1], [`${strength * 100}px`, `-${strength * 100}px`]);

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden ${className}`}
      style={{ minHeight }}
    >
      <motion.div
        className={`absolute w-full h-[140%] -top-[20%] bg-cover bg-center ${bgClassName}`}
        // Background div is 140% height of section, positioned with -20% top.
        // This provides an extra 20% of section height at top and bottom for image movement.
        // Max yOffset movement (strength * 100px) should be <= 20% of section height to avoid showing edges.
        // E.g., if section height is 300px, 20% is 60px. If strength is 0.5, yOffset is 50px (within 60px limit).
        // If strength is 1, yOffset is 100px. This might exceed the 60px for a 300px tall section.
        // Consider this interaction for very short sections or very high strength values.
        style={{
          backgroundImage: `url(${imageUrl})`,
          y: yOffset,
          willChange: 'transform', // Performance hint for GPU acceleration
        }}
        aria-hidden="true" // Decorative background image
      />
      <div
        className={`relative z-10 flex flex-col items-center justify-center w-full ${contentClassName}`}
        style={{ minHeight }} // Ensure content container also respects minHeight for layout consistency
      >
        {children}
      </div>
    </section>
  );
};

export default ParallaxScrollSection;