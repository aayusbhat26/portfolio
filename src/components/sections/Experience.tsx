"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Code2, Cloud, Database, Network, Sparkles, Layers, Box, Webhook, HardDrive, Terminal, Zap, CloudLightning, Activity, Flame } from "lucide-react";

const experiences = [
  {
    id: "nagarro",
    company: "Nagarro",
    role: "Associate Software Engineer",
    date: "Jan 2026 — Present",
    location: "Gurugram, India",
    logo: "/images/Nagarro_logo.svg.svg",
    technologies: [
      { name: "Python", icon: <Terminal className="w-3 h-3" /> },
      { name: "FastAPI", icon: <Zap className="w-3 h-3" /> },
      { name: "Kafka", icon: <Activity className="w-3 h-3" /> },
      { name: "Docker", icon: <Box className="w-3 h-3" /> },
      { name: "Azure", icon: <Cloud className="w-3 h-3" /> },
    ],
    highlights: [
      "Built incremental, watermark-based ETL pipelines processing high-volume stream telemetry.",
      "Designed production-grade Medallion architecture with Z-Ordering on Delta Lake.",
      "Engineered an SLA-driven framework handling millions of events/day with real-time fault alerts.",
    ],
  },
  {
    id: "mca",
    company: "USICT",
    role: "Master of Computer Applications",
    date: "2024 — 2026",
    location: "Delhi, India",
    logo: null,
    logoText: "U",
    cgpa: "8.99",
    technologies: [],
    highlights: [
      "Specialized in Software Engineering and scalable system design.",
    ],
  },
  {
    id: "bca",
    company: "Integrated Institute of Technology, Dwarka",
    role: "Bachelor of Computer Applications",
    date: "2020 — 2023",
    location: "Delhi, India",
    logo: null,
    logoText: "I",
    cgpa: "9.01",
    technologies: [],
    highlights: [
      "Graduated with distinction. Built strong foundations in core computer science.",
    ],
  }
];

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      id="experience" 
      ref={containerRef} 
      className="relative w-full min-h-screen py-32 flex flex-col items-center bg-transparent overflow-hidden"
    >

      <div className="w-full max-w-5xl mx-auto px-6 z-10">
        {/* Section Title */}
        <div className="mb-24 pl-0 md:pl-12">
          <h2 className="text-sm font-mono tracking-[0.2em] text-blue-500 mb-4 uppercase">Experience</h2>
          <h3 className="text-4xl md:text-5xl lg:text-[56px] font-bold text-white tracking-tight leading-tight">
            Building systems that scale. <br className="hidden md:block" />
            <span className="text-white/40">Not just features.</span>
          </h3>
        </div>

        {/* Timeline Layout */}
        <div className="relative pl-8 md:pl-0">
          
          {/* Main Vertical Timeline Line */}
          <div className="absolute left-0 md:left-[50px] top-4 bottom-0 w-[2px] bg-gradient-to-b from-[#2B2B2B] via-[#2B2B2B] to-transparent z-0" />

          <div className="flex flex-col gap-y-20 md:gap-y-32" style={{ 
            gap: experiences.map((_, i) => i === 0 ? '5rem' : i === 1 ? '8rem' : '6.5rem').join(' ')
          }}>
            {experiences.map((exp, index) => {
              // Breaking mathematical perfection - varied spacing and styling
              const isNagarro = index === 0;
              const cardPaddings = ['p-10 md:p-12', 'p-8 md:p-9', 'p-7 md:p-8'];
              const delays = [0, 0.15, 0.25];
              
              return (
              <div key={exp.id} className="relative flex flex-col md:flex-row md:items-start group">
                
                {/* Timeline Dot (Linear Style) */}
                <div className="absolute left-[-31px] md:left-[51px] md:-translate-x-1/2 top-[40px] md:top-[40px] z-10 flex items-center justify-center">
                  {/* Outer Glow */}
                  <motion.div 
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                    className="absolute w-8 h-8 rounded-full bg-blue-500/20 blur-sm"
                  />
                  {/* Inner Ring */}
                  <div className="w-4 h-4 rounded-full bg-[#121212] border-2 border-[#6B7280] group-hover:border-blue-500 transition-colors duration-300 flex items-center justify-center">
                    {/* Core */}
                    <div className="w-1.5 h-1.5 rounded-full bg-[#6B7280] group-hover:bg-blue-400 transition-colors duration-300" />
                  </div>
                </div>

                {/* Card Container */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: delays[index] }}
                  className="w-full max-w-[720px] md:ml-[120px]"
                >
                  <div className={`relative ${isNagarro ? 'bg-gradient-to-br from-[#1a1a1a] to-[#121212]' : 'bg-[#121212]'} border ${isNagarro ? 'border-white/[0.12]' : 'border-white/[0.08]'} rounded-3xl ${cardPaddings[index]} shadow-2xl backdrop-blur-xl overflow-hidden group-hover:border-white/[0.15] transition-all duration-500 ${isNagarro ? 'hover:shadow-blue-500/5' : ''}`}>
                    
                    {/* Nagarro gets special treatment - glow effect */}
                    {isNagarro && (
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
                    )}
                    
                    {/* Inner Border for Depth */}
                    <div className="absolute inset-0 border border-white/[0.02] rounded-3xl pointer-events-none" />

                    {/* Header: Logo + Title */}
                    <div className="flex items-start gap-6 mb-8">
                      {/* 72x72 Logo */}
                      <div className="w-[72px] h-[72px] shrink-0 bg-white/5 border border-white/10 rounded-[18px] flex items-center justify-center p-3 backdrop-blur-md">
                        {exp.logo ? (
                          <Image src={exp.logo} alt={exp.company} width={48} height={48} className="object-contain" />
                        ) : (
                          <span className="text-2xl font-bold text-white/50">{exp.logoText}</span>
                        )}
                      </div>
                      
                      <div className="flex-1 pt-1">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-1">
                          <h4 className="text-2xl font-bold text-white tracking-tight">{exp.company}</h4>
                          <span className="text-sm font-mono text-white/40">{exp.date}</span>
                        </div>
                        <p className="text-lg text-white/70 font-medium">{exp.role}</p>
                        <p className="text-sm text-white/40 mt-1 flex items-center gap-2">
                          {exp.location} 
                          {exp.cgpa && (
                            <>
                              <span>•</span>
                              <span className="text-white/60">CGPA: {exp.cgpa}</span>
                            </>
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Technologies (Tech Chips) */}
                    {exp.technologies.length > 0 && (
                      <>
                        <div className="w-full h-px bg-white/[0.05] my-6" />
                        <div className="flex flex-wrap gap-[10px] mb-6">
                          {exp.technologies.map((tech) => (
                            <span 
                              key={tech.name} 
                              className="flex items-center gap-2 h-[30px] px-[14px] bg-white/[0.03] border border-white/[0.08] rounded-full text-[13px] text-white/70 hover:bg-white/[0.08] hover:text-white hover:-translate-y-[2px] hover:shadow-[0_4px_12px_rgba(255,255,255,0.05)] transition-all duration-300 cursor-default"
                            >
                              {tech.icon}
                              {tech.name}
                            </span>
                          ))}
                        </div>
                      </>
                    )}

                    {/* Highlights */}
                    <div className="w-full h-px bg-white/[0.05] my-6" />
                    <ul className="space-y-3">
                      {exp.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start gap-3 text-white/60 leading-relaxed text-sm md:text-base">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500/50 shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>

                  </div>
                </motion.div>
              </div>
            );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
