"use client";

import { useState, useEffect } from "react";

/**
 * Custom hook to increment a number from 0 to n within a given duration
 * @param target - The target number to increment to.
 * @param duration - The duration in seconds for the increment to complete.
 * @returns The current number.
 */
export const useIncrementingCount = (
  target: number,
  duration: number
): number => {
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    if (target <= 0 || duration <= 0) return;

    const totalSteps = Math.round(duration * 60); // Assuming 60fps for smooth transitions
    const incrementValue = target / totalSteps;
    const interval = (duration * 1000) / totalSteps;

    let step = 0;

    const intervalId = setInterval(() => {
      step++;
      setCurrent((prev) => {
        const nextValue = prev + incrementValue;
        if (step >= totalSteps) {
          clearInterval(intervalId);
          return target; // Ensure it ends exactly at `target`
        }
        return nextValue;
      });
    }, interval);

    return () => clearInterval(intervalId); // Cleanup on unmount or dependency change
  }, [target, duration]);

  return current;
};
