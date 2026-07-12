"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const story = [
  "I build software.",
  "I solve scale.",
  "I love distributed systems.",
  "I engineer for the future.",
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLHeadingElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=250%", // Adjusted for fewer sentences
          scrub: 1,
          pin: true,
        },
      });

      textRefs.current.forEach((text, i) => {
        if (!text) return;
        
        // At the start, all text is hidden and slightly translated
        gsap.set(text, { opacity: 0, y: 50, scale: 0.95 });

        // Fade in
        tl.to(text, { opacity: 1, y: 0, scale: 1, duration: 1 }, `+=${i * 0.5}`)
          // Hold for a moment if not the last sentence
          .to(
            text,
            { opacity: i === story.length - 1 ? 1 : 0, y: i === story.length - 1 ? 0 : -50, scale: i === story.length - 1 ? 1 : 1.05, duration: 1 },
            `+=${0.5}`
          );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center">
      <div className="relative w-full max-w-5xl mx-auto px-6 h-full flex items-center justify-center">
        {story.map((text, i) => (
          <h2
            key={i}
            ref={(el) => {
              textRefs.current[i] = el;
            }}
            className="absolute text-center text-3xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white px-4"
          >
            {text}
          </h2>
        ))}
      </div>
    </section>
  );
}
