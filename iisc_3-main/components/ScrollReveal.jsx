'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * ScrollReveal — A reusable wrapper that animates children into view
 * using Intersection Observer with configurable animation variants.
 *
 * Variants:
 *  - fadeUp (default): fade in + slide up
 *  - fadeDown: fade in + slide down
 *  - fadeLeft: fade in + slide from left
 *  - fadeRight: fade in + slide from right
 *  - scaleUp: fade in + scale from 0.85
 *  - blur: fade in from blurred state
 */
const variantStyles = {
  fadeUp: {
    hidden: { opacity: 0, transform: 'translateY(60px)' },
    visible: { opacity: 1, transform: 'translateY(0)' },
  },
  fadeDown: {
    hidden: { opacity: 0, transform: 'translateY(-40px)' },
    visible: { opacity: 1, transform: 'translateY(0)' },
  },
  fadeLeft: {
    hidden: { opacity: 0, transform: 'translateX(-80px)' },
    visible: { opacity: 1, transform: 'translateX(0)' },
  },
  fadeRight: {
    hidden: { opacity: 0, transform: 'translateX(80px)' },
    visible: { opacity: 1, transform: 'translateX(0)' },
  },
  scaleUp: {
    hidden: { opacity: 0, transform: 'scale(0.85)' },
    visible: { opacity: 1, transform: 'scale(1)' },
  },
  blur: {
    hidden: { opacity: 0, filter: 'blur(12px)', transform: 'translateY(30px)' },
    visible: { opacity: 1, filter: 'blur(0px)', transform: 'translateY(0)' },
  },
  /* ─── NEW PREMIUM VARIANTS ─── */
  clipUp: {
    hidden: { opacity: 0, clipPath: 'inset(100% 0 0 0)', transform: 'translateY(40px)' },
    visible: { opacity: 1, clipPath: 'inset(0 0 0 0)', transform: 'translateY(0)' },
  },
  splitFade: {
    hidden: { opacity: 0, transform: 'translateY(50px) scale(0.95) rotate(-1deg)' },
    visible: { opacity: 1, transform: 'translateY(0) scale(1) rotate(0deg)' },
  },
  parallaxUp: {
    hidden: { opacity: 0, transform: 'translateY(100px)' },
    visible: { opacity: 1, transform: 'translateY(0)' },
  },
  typewriter: {
    hidden: { opacity: 0, clipPath: 'inset(0 100% 0 0)', transform: 'translateX(-20px)' },
    visible: { opacity: 1, clipPath: 'inset(0 0 0 0)', transform: 'translateX(0)' },
  },
};

export default function ScrollReveal({
  children,
  variant = 'fadeUp',
  delay = 0,
  duration = 0.8,
  threshold = 0.15,
  className = '',
  style = {},
  once = true,
  as: Tag = 'div',
  staggerChildren = false,
  staggerDelay = 0.1,
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(element);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, once]);

  const v = variantStyles[variant] || variantStyles.fadeUp;
  const currentStyle = isVisible ? v.visible : v.hidden;

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        ...style,
        ...currentStyle,
        transition: `opacity ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, filter ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, clip-path ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        willChange: 'opacity, transform, filter, clip-path',
      }}
    >
      {staggerChildren
        ? Array.isArray(children)
          ? children.map((child, i) => (
              <div
                key={i}
                style={{
                  ...(isVisible ? variantStyles.fadeUp.visible : variantStyles.fadeUp.hidden),
                  transition: `opacity ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay + i * staggerDelay}s, transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay + i * staggerDelay}s`,
                }}
              >
                {child}
              </div>
            ))
          : children
        : children}
    </Tag>
  );
}
