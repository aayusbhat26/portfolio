import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Scale, FileText, Cpu, Search, Database, Fingerprint, UploadCloud, FileCheck2, Bot } from "lucide-react";

export default function LegalAssistStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 3000vh for a fluid cinematic journey
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
      "rgba(16,185,129,0.05)", // Dashboard (Emerald)
      "rgba(59,130,246,0.08)", // AI Pipeline (Blue)
      "rgba(147,51,234,0.05)", // Vector DB (Purple)
      "rgba(0,0,0,0)" // Finale
    ]
  );

  // --- GLOBAL CAMERA CONTROLS ---
  const cameraScale = useTransform(scrollYProgress, 
    [0, 0.35, 0.45, 0.75, 0.85, 0.9], 
    [1, 1, 15, 15, 1, 1] // Massively zoom into the uploaded document
  );
  
  const cameraX = useTransform(scrollYProgress, 
    [0.35, 0.45, 0.75, 0.85], 
    ["0vw", "-30vw", "-30vw", "0vw"]
  );
  
  const cameraY = useTransform(scrollYProgress, 
    [0.35, 0.45, 0.75, 0.85], 
    ["0vh", "10vh", "10vh", "0vh"]
  );

  const cameraRotateX = useTransform(scrollYProgress,
    [0.1, 0.2, 0.35, 0.45, 0.75, 0.85],
    ["0deg", "10deg", "10deg", "0deg", "0deg", "0deg"]
  );

  // --- CHAPTER 1: THE HUMAN PROBLEM (0-15%) ---
  const prob1Opacity = useSafeOpacity([0, 0.04, 0.08, 0.1], [0, 1, 1, 0]);
  const prob2Opacity = useSafeOpacity([0.09, 0.12, 0.15, 0.18], [0, 1, 1, 0]);
  const probScale = useTransform(scrollYProgress, [0, 0.18], [0.95, 1.05]);

  // --- CHAPTER 2: THE PRODUCT EXPERIENCE (15-35%) ---
  const dashboardOpacity = useSafeOpacity([0.16, 0.2, 0.85, 0.9], [0, 1, 1, 0]);
  const dashboardBlur = useTransform(scrollYProgress, [0.35, 0.45, 0.75, 0.85], ["0px", "20px", "20px", "0px"]);

  // Interaction: Upload Document
  const docUploadY = useTransform(scrollYProgress, [0.18, 0.22], ["100px", "0px"]);
  const docUploadOpacity = useSafeOpacity([0.18, 0.22], [0, 1]);
  const taskTextOpacity = useSafeOpacity([0.22, 0.43, 0.45], [0, 1, 0]);
  
  // Progress Bar
  const progressWidth = useTransform(scrollYProgress, [0.24, 0.28], ["0%", "100%"]);
  
  // AI Summary pops up
  const summaryOpacity = useSafeOpacity([0.28, 0.3, 0.85, 0.9], [0, 1, 1, 0]);
  const summaryY = useTransform(scrollYProgress, [0.28, 0.3], ["20px", "0px"]);

  // --- CHAPTER 3: THE CLIMAX DIVE (35-55%) ---
  const nodeIconOpacity = useSafeOpacity([0.45, 0.47, 0.9, 0.92], [0, 1, 1, 0]);
  const archOpacity = useSafeOpacity([0.47, 0.52, 0.9, 0.92], [0, 1, 1, 0]);

  // --- CHAPTER 4: CAUSE & EFFECT (55-75%) ---
  const packet1Path = useTransform(scrollYProgress, [0.55, 0.6], [0, 1]); // API -> Embedder
  const packet1Op = useSafeOpacity([0.55, 0.56, 0.6], [0, 1, 0]);
  
  const packet2Path = useTransform(scrollYProgress, [0.6, 0.65], [0, 1]); // Embedder -> Vector DB
  const packet2Op = useSafeOpacity([0.6, 0.61, 0.65], [0, 1, 0]);

  const packet3Path = useTransform(scrollYProgress, [0.65, 0.7], [0, 1]); // DB -> LLM
  const packet3Op = useSafeOpacity([0.65, 0.66, 0.7], [0, 1, 0]);

  const metricEmbedOpacity = useSafeOpacity([0.64, 0.65, 0.9, 0.92], [0, 1, 1, 0]);

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
         <div className="font-bold text-white text-sm tracking-widest uppercase">Legal Assist</div>
         <div className="hidden md:flex gap-6 text-xs font-medium text-white/50">
            <button onClick={() => scrollTo(0)} className="hover:text-white transition-colors">Overview</button>
            <button onClick={() => scrollTo(0.18)} className="hover:text-white transition-colors">Product</button>
            <button onClick={() => scrollTo(0.4)} className="hover:text-white transition-colors">Pipeline</button>
            <button onClick={() => scrollTo(0.7)} className="hover:text-white transition-colors">Database</button>
            <button onClick={() => scrollTo(0.95)} className="hover:text-white transition-colors">Results</button>
         </div>
      </div>

      <div className="sticky top-0 w-full h-screen overflow-hidden [perspective:2000px] -mt-[53px]">
        
        {/* ================= CHAPTER 1: THE HUMAN PROBLEM ================= */}
        <motion.div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-50" style={{ scale: probScale }}>
          <motion.h2 className="absolute text-3xl md:text-5xl font-light text-white/70 tracking-wide text-center" style={{ opacity: prob1Opacity }}>
            Legal research takes <span className="text-white font-medium">hours of reading.</span>
          </motion.h2>
          <motion.h2 className="absolute text-4xl md:text-6xl font-bold text-white tracking-tighter text-center" style={{ opacity: prob2Opacity }}>
            Legal Assist <span className="text-emerald-500">automates the pipeline.</span>
          </motion.h2>
        </motion.div>

        {/* ================= GLOBAL 3D CAMERA ================= */}
        <motion.div className="w-full h-full flex items-center justify-center origin-center [transform-style:preserve-3d]" style={{ scale: cameraScale, x: cameraX, y: cameraY, rotateX: cameraRotateX }}>

          {/* ================= CHAPTER 2: THE PRODUCT EXPERIENCE ================= */}
          <motion.div className="absolute w-[80vw] max-w-6xl aspect-[16/10] bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden flex shadow-2xl" style={{ opacity: dashboardOpacity, filter: `blur(${dashboardBlur})` }}>
            <div className="w-1/4 h-full border-r border-white/5 p-6 bg-white/[0.02]">
               <div className="w-1/2 h-4 bg-white/20 rounded-full" />
               <div className="space-y-4 mt-8">
                  <div className="flex items-center gap-4 text-emerald-400"><Scale className="w-5 h-5"/> Case Analyzer</div>
                  <div className="flex items-center gap-4 text-white/40"><Search className="w-5 h-5"/> Semantic Search</div>
               </div>
            </div>

            <div className="flex-1 p-10 relative flex flex-col items-center justify-center">
               
               {/* THE TARGET DOCUMENT (Zoom Target) */}
               <motion.div 
                 className="absolute top-[20%] left-[60%] w-48 h-64 bg-white/5 border border-white/20 rounded-lg p-4 shadow-2xl backdrop-blur-md"
                 style={{ opacity: docUploadOpacity, y: docUploadY }}
               >
                  <motion.div style={{ opacity: taskTextOpacity }} className="h-full flex flex-col">
                    <div className="w-full h-2 bg-emerald-400/80 rounded-full mb-4" />
                    <div className="w-full h-2 bg-white/40 rounded-full mb-2" />
                    <div className="w-2/3 h-2 bg-white/40 rounded-full mb-2" />
                    <div className="w-3/4 h-2 bg-white/40 rounded-full" />
                    
                    <div className="mt-auto">
                       <div className="text-[10px] text-white/50 mb-1">Analyzing...</div>
                       <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                          <motion.div className="h-full bg-emerald-500" style={{ width: progressWidth }} />
                       </div>
                    </div>
                  </motion.div>
                  
                  {/* Backend Node Icon */}
                  <motion.div style={{ opacity: nodeIconOpacity }} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                     <FileText className="w-12 h-12 text-emerald-400 drop-shadow-[0_0_20px_rgba(16,185,129,0.8)]" />
                     <span className="mt-2 text-[8px] text-emerald-300 font-mono uppercase font-bold">FastAPI Parser</span>
                  </motion.div>
               </motion.div>

               {/* AI Summary Popup */}
               <motion.div 
                 className="absolute bottom-[20%] left-[10%] w-[40%] bg-emerald-900/20 backdrop-blur-xl border border-emerald-500/30 p-6 rounded-2xl shadow-2xl"
                 style={{ opacity: summaryOpacity, y: summaryY }}
               >
                  <div className="flex items-center gap-3 mb-4 text-emerald-400">
                    <Bot className="w-6 h-6"/>
                    <h4 className="text-sm font-semibold uppercase tracking-widest">AI Synopsis</h4>
                  </div>
                  <div className="space-y-2">
                     <div className="w-full h-2 bg-emerald-400/30 rounded-full" />
                     <div className="w-5/6 h-2 bg-emerald-400/30 rounded-full" />
                     <div className="w-4/6 h-2 bg-emerald-400/30 rounded-full" />
                  </div>
               </motion.div>
            </div>
          </motion.div>

          {/* ================= CHAPTER 3: THE CLIMAX ARCHITECTURE ================= */}
          <motion.div className="absolute inset-0 pointer-events-none" style={{ opacity: archOpacity }}>
             
             {/* Text Splitter */}
             <div className="absolute top-[20%] left-[30%] w-48 h-48 bg-blue-900/30 border border-blue-500/50 rounded-3xl backdrop-blur-sm flex flex-col items-center justify-center">
                <FileCheck2 className="w-16 h-16 text-blue-400 mb-4" />
                <span className="text-xs text-blue-300 font-mono">Semantic Splitter</span>
             </div>

             {/* Vector DB */}
             <div className="absolute top-[60%] left-[30%] w-48 h-48 bg-purple-900/30 border border-purple-500/50 rounded-3xl backdrop-blur-sm flex flex-col items-center justify-center">
                <Database className="w-16 h-16 text-purple-400 mb-4" />
                <span className="text-xs text-purple-300 font-mono">Pinecone Vector DB</span>
                
                <motion.div className="absolute -right-28 top-1/2 -translate-y-1/2 text-purple-400 font-mono text-xs" style={{ opacity: metricEmbedOpacity }}>
                   <div className="text-2xl font-bold bg-black/50 px-2 py-1 rounded-lg backdrop-blur-md border border-purple-500/30">1536d</div>
                   <div className="uppercase tracking-widest text-[8px] opacity-70 mt-1 ml-2">Embeddings</div>
                </motion.div>
             </div>

             {/* LLM */}
             <div className="absolute top-[40%] left-[0%] w-48 h-48 bg-emerald-900/30 border border-emerald-500/50 rounded-3xl backdrop-blur-sm flex flex-col items-center justify-center">
                <Cpu className="w-16 h-16 text-emerald-400 mb-4" />
                <span className="text-xs text-emerald-300 font-mono">Gemini Pro API</span>
             </div>
          </motion.div>

          {/* ================= CHAPTER 4: CAUSE & EFFECT (PACKETS) ================= */}
          <motion.svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: archOpacity }}>
            <defs>
              <linearGradient id="glowLegal" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
            
            <path d="M 65% 25% L 40% 30%" stroke="rgba(255,255,255,0.05)" strokeWidth="0.2" fill="none" />
            <path d="M 35% 35% L 35% 65%" stroke="rgba(255,255,255,0.05)" strokeWidth="0.2" fill="none" />
            <path d="M 30% 65% L 10% 50%" stroke="rgba(255,255,255,0.05)" strokeWidth="0.2" fill="none" />

            <motion.path d="M 65% 25% L 40% 30%" stroke="url(#glowLegal)" strokeWidth="0.4" fill="none" strokeLinecap="round" strokeDasharray="1 10" style={{ pathLength: packet1Path, opacity: packet1Op }} />
            <motion.path d="M 35% 35% L 35% 65%" stroke="#3b82f6" strokeWidth="0.4" fill="none" strokeLinecap="round" strokeDasharray="1 10" style={{ pathLength: packet2Path, opacity: packet2Op }} />
            <motion.path d="M 30% 65% L 10% 50%" stroke="#a855f7" strokeWidth="0.4" fill="none" strokeLinecap="round" strokeDasharray="1 10" style={{ pathLength: packet3Path, opacity: packet3Op }} />
          </motion.svg>
        </motion.div>

        {/* ================= CHAPTER 6: FINALE ================= */}
        <motion.div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none bg-[#020202]/80 backdrop-blur-xl" style={{ opacity: finaleOpacity }}>
           <motion.div style={{ y: finaleY }} className="text-center">
             <h2 className="text-3xl md:text-5xl font-light text-white/50 tracking-widest uppercase mb-12">LEGAL ASSIST</h2>
             <div className="flex flex-col items-center justify-center gap-4 md:gap-6 text-2xl md:text-5xl font-bold text-white tracking-tighter">
               <span>From hours of reading.</span>
               <span className="text-emerald-500">To semantic understanding.</span>
               <span className="text-blue-500">To instant answers.</span>
             </div>
           </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
