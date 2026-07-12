import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PenTool, MousePointer2, Network, Server, Users, Zap, Layers, Share2 } from "lucide-react";

export default function DrawTogetherStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const useSafeOpacity = (inputs: number[], outputs: number[]) => {
    return useTransform(scrollYProgress, inputs, outputs.map(String));
  };

  // --- DYNAMIC LIGHTING ---
  const ambientBgColor = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.7, 0.9],
    [
      "rgba(0,0,0,0)", 
      "rgba(244,63,94,0.05)", // Dashboard (Rose)
      "rgba(168,85,247,0.08)", // Infrastructure (Purple)
      "rgba(14,165,233,0.05)", // Packets (Sky)
      "rgba(0,0,0,0)" // Finale
    ]
  );

  // --- GLOBAL CAMERA CONTROLS ---
  const cameraScale = useTransform(scrollYProgress, 
    [0, 0.35, 0.45, 0.75, 0.85, 0.9], 
    [1, 1, 15, 15, 1, 1] // Zoom into the drawn line
  );
  
  const cameraX = useTransform(scrollYProgress, 
    [0.35, 0.45, 0.75, 0.85], 
    ["0vw", "-20vw", "-20vw", "0vw"]
  );
  
  const cameraY = useTransform(scrollYProgress, 
    [0.35, 0.45, 0.75, 0.85], 
    ["0vh", "-10vh", "-10vh", "0vh"]
  );

  const cameraRotateX = useTransform(scrollYProgress,
    [0.1, 0.2, 0.35, 0.45, 0.75, 0.85],
    ["0deg", "12deg", "12deg", "0deg", "0deg", "0deg"]
  );

  // --- CHAPTER 1: THE HUMAN PROBLEM (0-15%) ---
  const prob1Opacity = useSafeOpacity([0, 0.04, 0.08, 0.1], [0, 1, 1, 0]);
  const prob2Opacity = useSafeOpacity([0.09, 0.12, 0.15, 0.18], [0, 1, 1, 0]);
  const probScale = useTransform(scrollYProgress, [0, 0.18], [0.95, 1.05]);

  // --- CHAPTER 2: THE PRODUCT EXPERIENCE (15-35%) ---
  const dashboardOpacity = useSafeOpacity([0.16, 0.2, 0.85, 0.9], [0, 1, 1, 0]);
  const dashboardBlur = useTransform(scrollYProgress, [0.35, 0.45, 0.75, 0.85], ["0px", "20px", "20px", "0px"]);

  // Interaction: Drawing a line
  const cursor1X = useTransform(scrollYProgress, [0.18, 0.24], ["100px", "300px"]);
  const cursor1Y = useTransform(scrollYProgress, [0.18, 0.24], ["100px", "150px"]);
  
  const drawProgress = useTransform(scrollYProgress, [0.18, 0.24], [0, 1]);
  
  const cursor2X = useTransform(scrollYProgress, [0.24, 0.28], ["400px", "450px"]);
  const cursor2Y = useTransform(scrollYProgress, [0.24, 0.28], ["200px", "250px"]);
  
  const drawProgress2 = useTransform(scrollYProgress, [0.24, 0.28], [0, 1]);
  
  // Realtime notification
  const syncOpacity = useSafeOpacity([0.28, 0.3, 0.85, 0.9], [0, 1, 1, 0]);

  // --- CHAPTER 3: THE CLIMAX DIVE (35-55%) ---
  const nodeIconOpacity = useSafeOpacity([0.45, 0.47, 0.9, 0.92], [0, 1, 1, 0]);
  const archOpacity = useSafeOpacity([0.47, 0.52, 0.9, 0.92], [0, 1, 1, 0]);

  // --- CHAPTER 4: CAUSE & EFFECT (55-75%) ---
  const packet1Path = useTransform(scrollYProgress, [0.55, 0.6], [0, 1]); // Client A -> Server
  const packet1Op = useSafeOpacity([0.55, 0.56, 0.6], [0, 1, 0]);
  
  const packet2Path = useTransform(scrollYProgress, [0.6, 0.65], [0, 1]); // Server -> Redis
  const packet2Op = useSafeOpacity([0.6, 0.61, 0.65], [0, 1, 0]);

  const packet3Path = useTransform(scrollYProgress, [0.65, 0.7], [0, 1]); // Server -> Client B
  const packet3Op = useSafeOpacity([0.65, 0.66, 0.7], [0, 1, 0]);

  const metricEmbedOpacity = useSafeOpacity([0.69, 0.7, 0.9, 0.92], [0, 1, 1, 0]);

  // --- CHAPTER 6: FINALE (90-100%) ---
  const finaleOpacity = useSafeOpacity([0.94, 0.96, 1], [0, 1, 1]);
  const finaleY = useTransform(scrollYProgress, [0.94, 0.98], ["30px", "0px"]);

  const scrollTo = (progress: number) => {
    if (containerRef.current) {
       const top = containerRef.current.offsetTop;
       const height = containerRef.current.offsetHeight - window.innerHeight;
       window.scrollTo({ top: top + (height * progress), behavior: 'smooth' });
    }
  };

  return (
    <section ref={containerRef} className="relative w-full h-[450vh] bg-[#020202]">
      <motion.div className="fixed inset-0 pointer-events-none transition-colors duration-1000" style={{ backgroundColor: ambientBgColor }}/>

      {/* APPLE-STYLE STICKY NAVIGATION */}
      <div className="sticky top-0 z-50 w-full bg-black/50 backdrop-blur-md border-b border-white/10 py-3 px-6 flex justify-between items-center">
         <div className="font-bold text-white text-sm tracking-widest uppercase">Draw Together</div>
         <div className="hidden md:flex gap-6 text-xs font-medium text-white/50">
            <button onClick={() => scrollTo(0)} className="hover:text-white transition-colors">Overview</button>
            <button onClick={() => scrollTo(0.18)} className="hover:text-white transition-colors">Product</button>
            <button onClick={() => scrollTo(0.4)} className="hover:text-white transition-colors">Architecture</button>
            <button onClick={() => scrollTo(0.7)} className="hover:text-white transition-colors">Realtime</button>
            <button onClick={() => scrollTo(0.95)} className="hover:text-white transition-colors">Results</button>
         </div>
      </div>

      <div className="sticky top-0 w-full h-screen overflow-hidden [perspective:2000px] -mt-[53px]">
        
        {/* ================= CHAPTER 1: THE HUMAN PROBLEM ================= */}
        <motion.div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-50" style={{ scale: probScale }}>
          <motion.h2 className="absolute text-3xl md:text-5xl font-light text-white/70 tracking-wide text-center" style={{ opacity: prob1Opacity }}>
            Remote whiteboarding is <span className="text-white font-medium">laggy.</span>
          </motion.h2>
          <motion.h2 className="absolute text-4xl md:text-6xl font-bold text-white tracking-tighter text-center" style={{ opacity: prob2Opacity }}>
            Draw Together is <span className="text-rose-500">instant.</span>
          </motion.h2>
        </motion.div>

        {/* ================= GLOBAL 3D CAMERA ================= */}
        <motion.div className="w-full h-full flex items-center justify-center origin-center [transform-style:preserve-3d]" style={{ scale: cameraScale, x: cameraX, y: cameraY, rotateX: cameraRotateX }}>

          {/* ================= CHAPTER 2: THE PRODUCT EXPERIENCE ================= */}
          <motion.div className="absolute w-[80vw] max-w-6xl aspect-[16/10] bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden flex shadow-2xl" style={{ opacity: dashboardOpacity, filter: `blur(${dashboardBlur})` }}>
            <div className="w-16 h-full border-r border-white/5 bg-white/[0.02] flex flex-col items-center py-6 gap-6">
               <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white"><MousePointer2 className="w-5 h-5"/></div>
               <div className="w-10 h-10 bg-rose-500/20 rounded-xl flex items-center justify-center text-rose-400 border border-rose-500/50"><PenTool className="w-5 h-5"/></div>
            </div>

            <div className="flex-1 relative overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-[length:40px] opacity-80">
               
               {/* THE TARGET DRAWING (Zoom Target) */}
               <div className="absolute inset-0">
                  <svg className="w-full h-full pointer-events-none">
                     <motion.path 
                       d="M 120 120 Q 200 80, 320 170" 
                       stroke="#f43f5e" strokeWidth="4" fill="none" strokeLinecap="round"
                       style={{ pathLength: drawProgress }}
                     />
                     <motion.path 
                       d="M 420 220 Q 450 200, 470 270" 
                       stroke="#3b82f6" strokeWidth="4" fill="none" strokeLinecap="round"
                       style={{ pathLength: drawProgress2 }}
                     />
                  </svg>
                  
                  {/* Cursor 1 */}
                  <motion.div className="absolute z-50 flex flex-col drop-shadow-xl" style={{ x: cursor1X, y: cursor1Y }}>
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="#f43f5e" stroke="white" strokeWidth="1"><path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/></svg>
                     <span className="bg-rose-500 text-white text-[10px] px-2 py-0.5 rounded-full shadow-lg w-max mt-1">You</span>
                  </motion.div>
                  
                  {/* Cursor 2 */}
                  <motion.div className="absolute z-50 flex flex-col drop-shadow-xl" style={{ x: cursor2X, y: cursor2Y }}>
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="#3b82f6" stroke="white" strokeWidth="1"><path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/></svg>
                     <span className="bg-blue-500 text-white text-[10px] px-2 py-0.5 rounded-full shadow-lg w-max mt-1">Sarah</span>
                  </motion.div>
                  
                  {/* Backend Node Icon (Appears on zoom) */}
                  <motion.div style={{ opacity: nodeIconOpacity }} className="absolute top-[120px] left-[200px] flex flex-col items-center justify-center pointer-events-none">
                     <Network className="w-12 h-12 text-rose-400 drop-shadow-[0_0_20px_rgba(244,63,94,0.8)]" />
                     <span className="mt-2 text-[8px] text-rose-300 font-mono uppercase font-bold">Socket Stream</span>
                  </motion.div>
               </div>

               {/* Sync Badge */}
               <motion.div 
                 className="absolute top-6 right-6 bg-rose-900/40 backdrop-blur-xl border border-rose-500/30 px-4 py-2 rounded-full shadow-2xl flex items-center gap-2"
                 style={{ opacity: syncOpacity }}
               >
                  <div className="w-2 h-2 bg-rose-400 rounded-full animate-pulse" />
                  <span className="text-rose-100 text-xs font-medium uppercase tracking-widest">Live Sync</span>
               </motion.div>
            </div>
          </motion.div>

          {/* ================= CHAPTER 3: THE CLIMAX ARCHITECTURE ================= */}
          <motion.div className="absolute inset-0 pointer-events-none" style={{ opacity: archOpacity }}>
             
             {/* Client A */}
             <div className="absolute top-[20%] left-[10%] w-32 h-32 bg-white/5 border border-white/20 rounded-3xl backdrop-blur-sm flex flex-col items-center justify-center">
                <Users className="w-8 h-8 text-white/50 mb-2" />
                <span className="text-[10px] text-white/50 font-mono">Client A</span>
             </div>

             {/* Node.js Socket Server */}
             <div className="absolute top-[40%] left-[40%] w-48 h-48 bg-rose-900/30 border border-rose-500/50 rounded-3xl backdrop-blur-sm flex flex-col items-center justify-center shadow-[0_0_50px_rgba(244,63,94,0.2)]">
                <Server className="w-16 h-16 text-rose-400 mb-4" />
                <span className="text-xs text-rose-300 font-mono">Node.js Server</span>
             </div>

             {/* Client B */}
             <div className="absolute top-[60%] left-[10%] w-32 h-32 bg-white/5 border border-white/20 rounded-3xl backdrop-blur-sm flex flex-col items-center justify-center">
                <Users className="w-8 h-8 text-white/50 mb-2" />
                <span className="text-[10px] text-white/50 font-mono">Client B</span>
                
                {/* Metric! */}
                <motion.div className="absolute -right-20 top-1/2 -translate-y-1/2 text-sky-400 font-mono text-xs" style={{ opacity: metricEmbedOpacity }}>
                   <div className="text-xl font-bold bg-black/50 px-2 py-1 rounded-lg backdrop-blur-md border border-sky-500/30">2ms</div>
                   <div className="uppercase tracking-widest text-[8px] opacity-70 mt-1 ml-2">Broadcast</div>
                </motion.div>
             </div>

             {/* Redis Pub/Sub */}
             <div className="absolute top-[40%] left-[70%] w-40 h-40 bg-purple-900/30 border border-purple-500/50 rounded-3xl backdrop-blur-sm flex flex-col items-center justify-center">
                <Share2 className="w-12 h-12 text-purple-400 mb-4" />
                <span className="text-xs text-purple-300 font-mono">Redis Pub/Sub</span>
             </div>
          </motion.div>

          {/* ================= CHAPTER 4: CAUSE & EFFECT (PACKETS) ================= */}
          <motion.svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: archOpacity }}>
            <defs>
              <linearGradient id="glowDraw" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#f43f5e" />
              </linearGradient>
            </defs>
            
            <path d="M 15% 25% L 45% 45%" stroke="rgba(255,255,255,0.05)" strokeWidth="0.2" fill="none" />
            <path d="M 45% 45% L 75% 45%" stroke="rgba(255,255,255,0.05)" strokeWidth="0.2" fill="none" />
            <path d="M 45% 45% L 15% 65%" stroke="rgba(255,255,255,0.05)" strokeWidth="0.2" fill="none" />

            <motion.path d="M 15% 25% L 45% 45%" stroke="url(#glowDraw)" strokeWidth="0.4" fill="none" strokeLinecap="round" strokeDasharray="1 10" style={{ pathLength: packet1Path, opacity: packet1Op }} />
            <motion.path d="M 45% 45% L 75% 45%" stroke="#a855f7" strokeWidth="0.4" fill="none" strokeLinecap="round" strokeDasharray="1 10" style={{ pathLength: packet2Path, opacity: packet2Op }} />
            <motion.path d="M 45% 45% L 15% 65%" stroke="#0ea5e9" strokeWidth="0.4" fill="none" strokeLinecap="round" strokeDasharray="1 10" style={{ pathLength: packet3Path, opacity: packet3Op }} />
          </motion.svg>
        </motion.div>

        {/* ================= CHAPTER 6: FINALE ================= */}
        <motion.div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none bg-[#020202]/80 backdrop-blur-xl" style={{ opacity: finaleOpacity }}>
           <motion.div style={{ y: finaleY }} className="text-center">
             <h2 className="text-3xl md:text-5xl font-light text-white/50 tracking-widest uppercase mb-12">DRAW TOGETHER</h2>
             <div className="flex flex-col items-center justify-center gap-4 md:gap-6 text-2xl md:text-5xl font-bold text-white tracking-tighter">
               <span>Zero latency.</span>
               <span className="text-rose-500">Distributed architecture.</span>
               <span className="text-sky-500">Pure collaboration.</span>
             </div>
           </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
