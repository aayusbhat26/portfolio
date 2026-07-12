"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Network, Database, Zap, Layers, MessageSquare, ListTodo, Plus, Bell, Key, Code2, Timer, Trophy, Users } from "lucide-react";

export default function TaskFlowStory() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Force scroll recalc after mount
    window.dispatchEvent(new Event('resize'));
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const useSafeOpacity = (inputs: number[], outputs: number[]) =>
    useTransform(scrollYProgress, inputs, outputs);

  // AMBIENT LIGHTING
  const ambientBgColor = useTransform(
    scrollYProgress,
    [0, 0.15, 0.45, 0.7, 1],
    ["rgba(0,0,0,0)", "rgba(30,58,138,0.05)", "rgba(147,51,234,0.08)", "rgba(16,185,129,0.05)", "rgba(0,0,0,0)"]
  );

  // CHAPTER 1: PROBLEM (0-10%)
  const prob1Opacity = useSafeOpacity([0, 0.03, 0.06, 0.08], [0, 1, 1, 0]);
  const prob2Opacity = useSafeOpacity([0.05, 0.08, 0.12, 0.14], [0, 1, 1, 0]);

  // CHAPTER 2: DASHBOARD (10-28%)
  const dashboardOpacity = useSafeOpacity([0.1, 0.13, 0.26, 0.30], [0, 1, 1, 0]);
  const cursor1X = useTransform(scrollYProgress, [0.13, 0.16], ["0px", "200px"]);
  const cursor1Y = useTransform(scrollYProgress, [0.13, 0.16], ["300px", "50px"]);
  const createdTaskOpacity = useSafeOpacity([0.17, 0.18], [0, 1]);
  const cursor2X = useTransform(scrollYProgress, [0.19, 0.22], ["500px", "240px"]);
  const cursor2Y = useTransform(scrollYProgress, [0.19, 0.22], ["400px", "80px"]);
  const typeIndicatorOpacity = useSafeOpacity([0.22, 0.23, 0.28], [0, 1, 1]);
  const notifOpacity = useSafeOpacity([0.24, 0.26, 0.28, 0.30], [0, 1, 1, 0]);
  const notifY = useTransform(scrollYProgress, [0.24, 0.26], ["20px", "0px"]);
  const taskTextOpacity = useSafeOpacity([0.26, 0.30], [1, 0]);
  const dashboardBlur = useTransform(scrollYProgress, [0.24, 0.30], ["0px", "6px"]);

  // CHAPTER 3: ARCHITECTURE (30-65%) - all nodes stay WITHIN viewport bounds
  const nextjsOp = useSafeOpacity([0.30, 0.33, 0.88, 0.92], [0, 1, 1, 0]);
  const nextjsScale = useTransform(scrollYProgress, [0.30, 0.33], [0.8, 1]);
  const authOp = useSafeOpacity([0.34, 0.37, 0.88, 0.92], [0, 1, 1, 0]);
  const authScale = useTransform(scrollYProgress, [0.34, 0.37], [0.8, 1]);
  const socketOp = useSafeOpacity([0.38, 0.41, 0.88, 0.92], [0, 1, 1, 0]);
  const socketScale = useTransform(scrollYProgress, [0.38, 0.41], [0.8, 1]);
  const pgOp = useSafeOpacity([0.42, 0.45, 0.88, 0.92], [0, 1, 1, 0]);
  const pgScale = useTransform(scrollYProgress, [0.42, 0.45], [0.8, 1]);
  const redisOp = useSafeOpacity([0.46, 0.49, 0.88, 0.92], [0, 1, 1, 0]);
  const redisScale = useTransform(scrollYProgress, [0.46, 0.49], [0.8, 1]);
  const linesOp = useSafeOpacity([0.30, 0.33, 0.88, 0.92], [0, 1, 1, 0]);

  // CHAPTER 4: PACKETS (49-70%)
  const p1Path = useTransform(scrollYProgress, [0.49, 0.54], [0, 1]);
  const p1Op = useSafeOpacity([0.49, 0.50, 0.54], [0, 1, 0]);
  const p2Path = useTransform(scrollYProgress, [0.54, 0.59], [0, 1]);
  const p2Op = useSafeOpacity([0.54, 0.55, 0.59], [0, 1, 0]);
  const p3Path = useTransform(scrollYProgress, [0.59, 0.66], [0, 1]);
  const p3Op = useSafeOpacity([0.59, 0.60, 0.66], [0, 1, 0]);
  const metricOp = useSafeOpacity([0.64, 0.66, 0.88, 0.92], [0, 1, 1, 0]);
  const metricY = useTransform(scrollYProgress, [0.64, 0.66], ["20px", "0px"]);

  // CHAPTER 5: FINALE (90-100%)
  const finaleOp = useSafeOpacity([0.90, 0.95, 1], [0, 1, 1]);
  const finaleY = useTransform(scrollYProgress, [0.90, 0.95], ["30px", "0px"]);

  const scrollTo = (progress: number) => {
    if (!containerRef.current) return;
    const top = containerRef.current.offsetTop;
    const height = containerRef.current.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + height * progress, behavior: 'smooth' });
  };

  return (
    // Use a fixed large pixel height — NOT vh units — to avoid viewport scaling bugs
    <section ref={containerRef} className="relative w-full bg-[#020202]" style={{ height: '7000px' }}>

      {/* Ambient background - fixed, pointer-events-none */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        style={{ backgroundColor: ambientBgColor }}
      />

      {/* STICKY NAV */}
      <div className="sticky top-0 z-50 w-full bg-black/60 backdrop-blur-md border-b border-white/10 flex flex-col">
        <div className="py-3 px-6 flex justify-between items-center">
          <div className="font-bold text-white text-sm tracking-widest uppercase">TaskFlow</div>
          <div className="hidden md:flex gap-6 text-xs font-medium text-white/50">
            <button onClick={() => scrollTo(0)} className="hover:text-white transition-colors">Overview</button>
            <button onClick={() => scrollTo(0.12)} className="hover:text-white transition-colors">Product</button>
            <button onClick={() => scrollTo(0.32)} className="hover:text-white transition-colors">Architecture</button>
            <button onClick={() => scrollTo(0.52)} className="hover:text-white transition-colors">Performance</button>
            <button onClick={() => scrollTo(0.9)} className="hover:text-white transition-colors">Results</button>
          </div>
          <motion.div className="text-white/30 text-xs font-mono">
            {useTransform(scrollYProgress, (v) => `${Math.round(v * 100)}%`)}
          </motion.div>
        </div>
        <div className="w-full h-[2px] bg-white/10">
          <motion.div className="h-full bg-blue-500" style={{ width: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }} />
        </div>
      </div>

      {/* STICKY VIEWPORT - overflow:hidden clips everything to screen, no overflow blocking scroll */}
      <div className="sticky top-0 w-full overflow-hidden -mt-[53px]" style={{ height: '100dvh' }}>

        {/* CHAPTER 1: PROBLEM */}
        <motion.div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-40">
          <motion.h2
            className="absolute text-3xl md:text-5xl font-light text-white/70 tracking-wide text-center px-8"
            style={{ opacity: prob1Opacity }}
          >
            Teams struggle to stay <span className="text-white font-medium">aligned.</span>
          </motion.h2>
          <motion.h2
            className="absolute text-4xl md:text-6xl font-bold text-white tracking-tighter text-center px-8"
            style={{ opacity: prob2Opacity }}
          >
            TaskFlow keeps everyone <span className="text-blue-500">synchronized.</span>
          </motion.h2>
        </motion.div>

        {/* CHAPTER 2: DASHBOARD */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
          style={{ opacity: dashboardOpacity, filter: `blur(${dashboardBlur})` }}
        >
          <div className="w-[85vw] max-w-4xl bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden flex shadow-2xl" style={{ height: 'min(55vh, 500px)' }}>
            {/* Sidebar */}
            <div className="w-1/5 h-full border-r border-white/5 p-4 flex flex-col gap-4 bg-white/[0.02] shrink-0">
              <div className="w-1/2 h-3 bg-white/20 rounded-full" />
              <div className="space-y-2 mt-4">
                <div className="flex items-center gap-2 text-white text-xs"><ListTodo className="w-3 h-3 text-blue-400 shrink-0"/> Tasks</div>
                <div className="flex items-center gap-2 text-white/40 text-xs"><Network className="w-3 h-3 shrink-0"/> Mind Maps</div>
                <div className="flex items-center gap-2 text-white/40 text-xs"><Code2 className="w-3 h-3 shrink-0"/> DSA</div>
                <div className="flex items-center gap-2 text-white/40 text-xs"><MessageSquare className="w-3 h-3 shrink-0"/> Chat</div>
                <div className="flex items-center gap-2 text-white/40 text-xs"><Timer className="w-3 h-3 shrink-0"/> Pomodoro</div>
                <div className="flex items-center gap-2 text-white/40 text-xs"><Trophy className="w-3 h-3 shrink-0"/> Leaderboard</div>
                <div className="flex items-center gap-2 text-white/40 text-xs"><Users className="w-3 h-3 shrink-0"/> RBAC</div>
              </div>
            </div>
            {/* Main area */}
            <div className="flex-1 p-6 relative overflow-hidden">
              <div className="absolute top-5 right-6 flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium">
                <Plus className="w-3 h-3"/> Create Task
              </div>
              {/* Cursor 1 */}
              <motion.div className="absolute z-50 flex items-center gap-2" style={{ x: cursor1X, y: cursor1Y }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white" stroke="black" strokeWidth="1"><path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/></svg>
                <span className="bg-black/80 text-white text-[9px] px-1.5 py-0.5 rounded-full border border-white/10">You</span>
              </motion.div>
              {/* Cursor 2 */}
              <motion.div className="absolute z-50 flex items-center gap-2" style={{ x: cursor2X, y: cursor2Y }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#3b82f6" stroke="white" strokeWidth="1"><path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/></svg>
                <span className="bg-blue-500 text-white text-[9px] px-1.5 py-0.5 rounded-full">Alex</span>
              </motion.div>
              {/* Task card */}
              <motion.div
                className="absolute top-[18%] left-[18%] w-48 h-24 bg-white/5 border border-white/20 rounded-xl p-3 shadow-xl"
                style={{ opacity: createdTaskOpacity }}
              >
                <motion.div style={{ opacity: taskTextOpacity }} className="h-full flex flex-col justify-between">
                  <div className="w-1/3 h-1.5 bg-blue-400/80 rounded-full" />
                  <div className="w-full h-1.5 bg-white/40 rounded-full flex items-center">
                    <motion.div style={{ opacity: typeIndicatorOpacity }} className="w-0.5 h-2.5 bg-blue-400 ml-1" />
                  </div>
                  <div className="w-2/3 h-1.5 bg-white/40 rounded-full" />
                </motion.div>
              </motion.div>
              {/* Notification */}
              <motion.div
                className="absolute bottom-6 right-6 bg-white/10 backdrop-blur-xl border border-white/20 p-3 rounded-xl shadow-xl flex items-center gap-3"
                style={{ opacity: notifOpacity, y: notifY }}
              >
                <div className="w-7 h-7 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 shrink-0">
                  <Bell className="w-3 h-3"/>
                </div>
                <div>
                  <h4 className="text-white text-xs font-semibold">CRDT Sync Complete</h4>
                  <p className="text-white/50 text-[10px]">Alex resolved the conflict.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* CHAPTER 3: ARCHITECTURE NODES - All positioned WITHIN safe bounds (5%-80% height) */}
        <div className="absolute inset-0 pointer-events-none z-30">

          {/* Next.js — top center */}
          <motion.div
            style={{ opacity: nextjsOp, scale: nextjsScale, position: 'absolute', top: '5%', left: '50%', transform: 'translateX(-50%)' }}
            className="flex flex-col items-center"
          >
            <div className="flex flex-wrap justify-center gap-1 mb-2 max-w-xs">
              {['Tasks','Mind Maps','DSA','Pomodoro','Chat','RBAC'].map((f, i) => (
                <span key={f} className={`px-1.5 py-0.5 rounded-full text-[9px] font-mono border ${
                  ['bg-blue-500/20 border-blue-500/40 text-blue-300','bg-purple-500/20 border-purple-500/40 text-purple-300','bg-green-500/20 border-green-500/40 text-green-300','bg-amber-500/20 border-amber-500/40 text-amber-300','bg-pink-500/20 border-pink-500/40 text-pink-300','bg-cyan-500/20 border-cyan-500/40 text-cyan-300'][i]
                }`}>{f}</span>
              ))}
            </div>
            <div className="w-32 h-32 bg-blue-900/60 border-2 border-blue-500 rounded-2xl flex flex-col items-center justify-center shadow-[0_0_60px_rgba(59,130,246,0.5)]">
              <Layers className="w-9 h-9 text-blue-300 mb-1" />
              <span className="text-xs text-blue-200 font-mono font-bold">Next.js 14</span>
              <span className="text-[9px] text-blue-300 font-mono">:3000</span>
            </div>
          </motion.div>

          {/* Auth Service — left middle */}
          <motion.div
            style={{ opacity: authOp, scale: authScale, position: 'absolute', top: '42%', left: '6%' }}
            className="w-28 h-28 bg-amber-900/60 border-2 border-amber-500 rounded-2xl flex flex-col items-center justify-center shadow-[0_0_40px_rgba(245,158,11,0.4)]"
          >
            <Key className="w-8 h-8 text-amber-300 mb-1" />
            <span className="text-[10px] text-amber-200 font-mono font-bold text-center">Auth Service</span>
            <span className="text-[8px] text-amber-300 font-mono">:3003</span>
          </motion.div>

          {/* Socket Server — center middle */}
          <motion.div
            style={{ opacity: socketOp, scale: socketScale, position: 'absolute', top: '42%', left: '50%', x: '-50%' }}
            className="w-28 h-28 bg-purple-900/60 border-2 border-purple-500 rounded-2xl flex flex-col items-center justify-center shadow-[0_0_40px_rgba(168,85,247,0.4)]"
          >
            <Network className="w-8 h-8 text-purple-300 mb-1" />
            <span className="text-[10px] text-purple-200 font-mono font-bold text-center">Socket Server</span>
            <span className="text-[8px] text-purple-300 font-mono">:3002</span>
          </motion.div>

          {/* PostgreSQL — bottom left */}
          <motion.div
            style={{ opacity: pgOp, scale: pgScale, position: 'absolute', top: '68%', left: '20%' }}
            className="w-28 h-28 bg-sky-900/60 border-2 border-sky-500 rounded-2xl flex flex-col items-center justify-center shadow-[0_0_40px_rgba(14,165,233,0.4)]"
          >
            <Database className="w-8 h-8 text-sky-300 mb-1" />
            <span className="text-[10px] text-sky-200 font-mono font-bold">PostgreSQL</span>
            <span className="text-[8px] text-sky-300 font-mono">Prisma ORM</span>
          </motion.div>

          {/* Redis — bottom right */}
          <motion.div
            style={{ opacity: redisOp, scale: redisScale, position: 'absolute', top: '68%', right: '12%' }}
            className="group w-28 h-28 bg-red-900/60 border-2 border-red-500 rounded-2xl flex flex-col items-center justify-center shadow-[0_0_40px_rgba(239,68,68,0.4)] pointer-events-auto cursor-crosshair"
          >
            <Zap className="w-8 h-8 text-red-400 mb-1" />
            <span className="text-[10px] text-red-300 font-mono font-bold">Redis</span>
            <span className="text-[8px] text-red-300 font-mono">Cache</span>
            <motion.div
              className="absolute -right-16 top-1/2 -translate-y-1/2 text-red-400 font-mono"
              style={{ opacity: metricOp, y: metricY }}
            >
              <div className="text-lg font-bold bg-black/50 px-2 py-1 rounded-lg border border-red-500/30">12ms</div>
              <div className="text-[7px] uppercase tracking-widest opacity-70 text-center">Cache Hit</div>
            </motion.div>
          </motion.div>
        </div>

        {/* SVG CONNECTION LINES */}
        <motion.svg
          className="absolute inset-0 w-full h-full pointer-events-none z-20"
          style={{ opacity: linesOp }}
        >
          <defs>
            <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>
          {/* 
            Node centers (approximate):
            Next.js:    left=50%,  top=5%  → center at 50%, ~18%  (node is 128px tall + labels ~40px)
            Auth:       left=6%,   top=42% → center at ~9%,  ~48%
            Socket:     left=50%,  top=42% → center at 50%,  ~48%
            PostgreSQL: left=20%,  top=68% → center at ~23%, ~74%
            Redis:      right=12%, top=68% → center at ~82%, ~74%
          */}
          {/* Static base lines */}
          <line x1="50%" y1="20%" x2="9%"  y2="48%" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
          <line x1="50%" y1="20%" x2="50%" y2="48%" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
          <line x1="50%" y1="20%" x2="82%" y2="74%" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
          <line x1="9%"  y1="48%" x2="23%" y2="74%" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
          <line x1="50%" y1="48%" x2="23%" y2="74%" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
          {/* Animated packets */}
          <motion.line x1="50%" y1="20%" x2="9%"  y2="48%" stroke="url(#g1)" strokeWidth="2" strokeLinecap="round" style={{ pathLength: p1Path, opacity: p1Op }}/>
          <motion.line x1="50%" y1="20%" x2="50%" y2="48%" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" style={{ pathLength: p2Path, opacity: p2Op }}/>
          <motion.line x1="50%" y1="20%" x2="82%" y2="74%" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" style={{ pathLength: p3Path, opacity: p3Op }}/>
        </motion.svg>

        {/* FINALE */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none bg-[#020202]/80 backdrop-blur-xl z-40"
          style={{ opacity: finaleOp }}
        >
          <motion.div style={{ y: finaleY }} className="text-center px-8">
            <h2 className="text-2xl md:text-4xl font-light text-white/50 tracking-widest uppercase mb-8">TASKFLOW</h2>
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-8 text-xl md:text-4xl font-bold text-white tracking-tighter">
              <span>From Idea.</span>
              <span className="text-blue-500">To Architecture.</span>
              <span className="text-emerald-500">To Production.</span>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
