import { useMotionValue, useAnimationFrame } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

/**
 * A highly optimized custom hook for creating infinite horizontal marquees using Framer Motion.
 * Uses Framer Motion's useAnimationFrame to animate a motion value 'x' smoothly.
 * Calculates frame deltas manually using performance.now() to avoid version compatibility issues.
 * Supports smooth hardware-accelerated dragging, auto-pause on hover, and seamless loop wrapping.
 *
 * @param {Object} options
 * @param {number} options.speed - Speed in pixels per frame (approx 60fps)
 * @param {number} options.direction - 1 for leftward movement (x decreases), -1 for rightward movement (x increases)
 * @param {boolean} options.pauseOnHover - Whether to pause the animation on hover
 * @param {any} options.dependency - A state or variable that, when changed, triggers re-evaluation of the DOM element
 */
export const useInfiniteMarquee = ({
  speed = 0.8,
  direction = 1,
  pauseOnHover = true,
  dependency = null,
} = {}) => {
  const x = useMotionValue(0);
  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const isHovered = useRef(false);
  const lastInteractionTime = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const [halfWidth, setHalfWidth] = useState(0);

  const RESUME_DELAY = 1500; // ms to wait before resuming auto scroll after manual interaction

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateWidth = () => {
      // The track is the first child of the container
      const track = container.firstElementChild;
      if (track) {
        // Calculate the half width of the duplicated content
        const calculatedHalfWidth = track.scrollWidth / 2;
        setHalfWidth(calculatedHalfWidth);

        // If scrolling rightward, start offset at -halfWidth to allow moving to 0
        if (direction === -1 && x.get() === 0 && calculatedHalfWidth > 0) {
          x.set(-calculatedHalfWidth);
        }
      }
    };

    updateWidth();

    // Listen for resize and periodic checks to handle dynamic loading (like images)
    window.addEventListener('resize', updateWidth);
    const interval = setInterval(updateWidth, 200);

    return () => {
      window.removeEventListener('resize', updateWidth);
      clearInterval(interval);
    };
  }, [direction, x, dependency]);

  useAnimationFrame(() => {
    const now = performance.now();
    const delta = now - lastTimeRef.current;
    lastTimeRef.current = now;

    if (halfWidth <= 0 || isDragging.current) return;

    const timeSinceInteraction = now - lastInteractionTime.current;

    // Pause animation if hovered or recently interacted
    if (timeSinceInteraction < RESUME_DELAY || isHovered.current) {
      return;
    }

    // Clamp delta to avoid huge jumps on tab switching/focus
    const clampedDelta = Math.min(delta, 100);
    const step = speed * (clampedDelta / 16.67);

    const currentX = x.get();
    if (direction === 1) {
      let nextX = currentX - step;
      if (nextX <= -halfWidth) {
        nextX += halfWidth;
      }
      x.set(nextX);
    } else {
      let nextX = currentX + step;
      if (nextX >= 0) {
        nextX -= halfWidth;
      }
      x.set(nextX);
    }
  });

  const handleDragStart = () => {
    isDragging.current = true;
  };

  const handleDragEnd = () => {
    isDragging.current = false;
    lastInteractionTime.current = performance.now();

    if (halfWidth > 0) {
      const currentX = x.get();
      // Wrap to range [-halfWidth, 0] seamlessly
      const remainder = currentX % halfWidth;
      const wrappedX = remainder > 0 ? remainder - halfWidth : remainder;
      x.set(wrappedX);
    }
  };

  const handleMouseEnter = () => {
    if (pauseOnHover) {
      isHovered.current = true;
    }
  };

  const handleMouseLeave = () => {
    isHovered.current = false;
    lastInteractionTime.current = performance.now();
  };

  return {
    containerRef,
    x,
    halfWidth, // State value
    dragHandlers: {
      onDragStart: handleDragStart,
      onDragEnd: handleDragEnd,
    },
    hoverHandlers: {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    }
  };
};
