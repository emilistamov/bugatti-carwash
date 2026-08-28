"use client";

import { useEffect } from "react";

const visibleClass = "motion-visible";

export function MotionController() {
  useEffect(() => {
    const root = document.documentElement;
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-motion]"));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    root.classList.add("motion-ready");

    if (reducedMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add(visibleClass));
      return () => root.classList.remove("motion-ready");
    }

    const cleanupTimers: number[] = [];
    const reveal = (element: HTMLElement) => {
      element.classList.add(visibleClass);
      cleanupTimers.push(
        window.setTimeout(() => {
          element.removeAttribute("data-motion");
          element.classList.remove(visibleClass);
        }, 1800),
      );
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          reveal(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -9%", threshold: 0.08 },
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      cleanupTimers.forEach((timer) => window.clearTimeout(timer));
      root.classList.remove("motion-ready");
    };
  }, []);

  return null;
}
