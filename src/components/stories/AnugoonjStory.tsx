import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { QrCode, Ticket, Cloud, Server, Users, Zap, ShieldAlert, BarChart, Database } from "lucide-react";

export default function AnugoonjStory() {
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
      "rgba(249,115,22,0.05)", // Dashboard (Orange)
      "rgba(59,130,246,0.08)", // Infrastructure (Blue)
      "rgba(16,185,129,0.05)", // Packets (Emerald)
      "rgba(0,0,0,0)" // Finale
    ]
  );

  // --- GLOBAL CAMERA CONTROLS ---
  const cameraScale = useTransform(scrollYProgress, 
    [0, 0.35, 0.45, 0.75, 0.85, 0.9], 
    [1, 1, 15, 15, 1, 1] // Zoom into the QR Code
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
    ["0deg", "8deg", "8deg", "0deg", "0deg", "0deg"]
  );

  // --- CHAPTER 1: THE HUMAN PROBLEM (0-15%) ---
  const prob1Opacity = useSafeOpacity([0, 0.04, 0.08, 0.1], [0, 1, 1, 0]);
  const prob2Opacity = useSafeOpacity([0.09, 0.12, 0.15, 0.18], [0, 1, 1, 0]);
  const probScale = useTransform(scrollYProgress, [0, 0.18], [0.95, 1.05]);

  // --- CHAPTER 2: THE PRODUCT EXPERIENCE (15-35%) ---
  const dashboardOpacity = useSafeOpacity([0.16, 0.2, 0.85, 0.9], [0, 1, 1, 0]);
  const dashboardBlur = useTransform(scrollYProgress, [0.35, 0.45, 0.75, 0.85], ["0px", "20px", "20px", "0px"]);

  // Interaction: Register for event
  const cursor1X = useTransform(scrollYProgress, [0.18, 0.24], ["500px", "180px"]);
  const cursor1Y = useTransform(scrollYProgress, [0.18, 0.24], ["300px", "220px"]);
  const cursor1Scale = useTransform(scrollYProgress, [0.24, 0.25, 0.26], [1, 0.8, 1]); // Click animation
  
  const loadOpacity = useSafeOpacity([0.26, 0.27, 0.28], [0, 1, 0]);
  const qrOpacity = useSafeOpacity([0.28, 0.29], [0, 1]);
  const qrScale = useTransform(scrollYProgress, [0.28, 0.3], [0.8, 1]);
  const qrIconOpacity = useSafeOpacity([0.28, 0.43, 0.45], [0, 1, 0]);

  // --- CHAPTER 3: THE CLIMAX DIVE (35-55%) ---
  const nodeIconOpacity = useSafeOpacity([0.45, 0.47, 0.9, 0.92], [0, 1, 1, 0]);
  const archOpacity = useSafeOpacity([0.47, 0.52, 0.9, 0.92], [0, 1, 1, 0]);

  // --- CHAPTER 4: CAUSE & EFFECT (55-75%) ---
  const packet1Path = useTransform(scrollYProgress, [0.55, 0.6], [0, 1]); // Vercel -> Load Balancer
  const packet1Op = useSafeOpacity([0.55, 0.56, 0.6], [0, 1, 0]);
  
  const packet2Path = useTransform(scrollYProgress, [0.6, 0.65], [0, 1]); // Load Balancer -> Instance
  const packet2Op = useSafeOpacity([0.6, 0.61, 0.65], [0, 1, 0]);

  const packet3Path = useTransform(scrollYProgress, [0.65, 0.7], [0, 1]); // Instance -> DB
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
         <div className="font-bold text-white text-sm tracking-widest uppercase">Anugoonj '24</div>
         <div className="hidden md:flex gap-6 text-xs font-medium text-white/50">
            <button onClick={() => scrollTo(0)} className="hover:text-white transition-colors">Overview</button>
            <button onClick={() => scrollTo(0.18)} className="hover:text-white transition-colors">Product</button>
            <button onClick={() => scrollTo(0.4)} className="hover:text-white transition-colors">Architecture</button>
            <button onClick={() => scrollTo(0.7)} className="hover:text-white transition-colors">Scale</button>
            <button onClick={() => scrollTo(0.95)} className="hover:text-white transition-colors">Results</button>
         </div>
      </div>

      <div className="sticky top-0 w-full h-screen overflow-hidden [perspective:2000px] -mt-[53px]">
        
        {/* ================= CHAPTER 1: THE HUMAN PROBLEM ================= */}
        <motion.div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-50" style={{ scale: probScale }}>
          <motion.h2 className="absolute text-3xl md:text-5xl font-light text-white/70 tracking-wide text-center" style={{ opacity: prob1Opacity }}>
            College festivals <span className="text-white font-medium">crash under load.</span>
          </motion.h2>
          <motion.h2 className="absolute text-4xl md:text-6xl font-bold text-white tracking-tighter text-center" style={{ opacity: prob2Opacity }}>
            Anugoonj <span className="text-orange-500">scales effortlessly.</span>
          </motion.h2>
        </motion.div>

        {/* ================= GLOBAL 3D CAMERA ================= */}
        <motion.div className="w-full h-full flex items-center justify-center origin-center [transform-style:preserve-3d]" style={{ scale: cameraScale, x: cameraX, y: cameraY, rotateX: cameraRotateX }}>

          {/* ================= CHAPTER 2: THE PRODUCT EXPERIENCE ================= */}
          <motion.div className="absolute w-[80vw] max-w-6xl aspect-[16/10] bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden flex shadow-2xl" style={{ opacity: dashboardOpacity, filter: `blur(${dashboardBlur})` }}>
            <div className="flex-1 p-10 relative flex flex-col items-center justify-center bg-gradient-to-b from-orange-900/10 to-transparent">
               
               <div className="absolute top-10 flex items-center justify-between w-[80%]">
                  <div className="text-xl font-bold text-white tracking-widest uppercase">Anugoonj '24</div>
                  <div className="flex gap-4">
                     <div className="text-white/50 text-sm">Events</div>
                     <div className="text-white/50 text-sm">Schedule</div>
                     <div className="text-orange-500 text-sm font-bold">Register</div>
                  </div>
               </div>

               {/* Event Card */}
               <div className="w-96 p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
                  <div className="w-full h-40 bg-orange-900/20 rounded-lg mb-4 flex items-center justify-center">
                     <Users className="w-12 h-12 text-orange-500/50" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">EDM Night</h3>
                  <p className="text-white/50 text-sm mb-6">Join 5,000+ students for the biggest night of the year.</p>
                  
                  {/* Register Button */}
                  <div className="w-full h-10 bg-orange-500 text-white font-bold rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.3)]">
                     Register Now
                  </div>
               </div>

               {/* Mock Cursor */}
               <motion.div className="absolute z-50 flex items-center gap-2 drop-shadow-xl" style={{ x: cursor1X, y: cursor1Y, scale: cursor1Scale }}>
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="black" strokeWidth="1"><path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/></svg>
               </motion.div>

               {/* Loading Spinner */}
               <motion.div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center" style={{ opacity: loadOpacity }}>
                  <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
               </motion.div>

               {/* THE TARGET TICKET (Zoom Target) */}
               <motion.div 
                 className="absolute inset-0 flex items-center justify-center"
                 style={{ opacity: qrOpacity, scale: qrScale }}
               >
                  <div className="w-64 bg-white rounded-2xl overflow-hidden shadow-2xl transform-gpu">
                     <div className="bg-orange-500 p-4 text-center">
                        <div className="text-white font-black tracking-widest text-lg">VIP PASS</div>
                     </div>
                     <div className="p-6 flex flex-col items-center">
                        <motion.div style={{ opacity: qrIconOpacity }} className="w-32 h-32 bg-black flex items-center justify-center mb-4">
                           <QrCode className="w-24 h-24 text-white" />
                        </motion.div>
                        
                        <div className="w-full h-px bg-black/10 border-t border-dashed border-black/30 my-2" />
                        
                        <div className="w-full text-center mt-2 text-black">
                           <div className="text-xs uppercase font-bold text-black/50">Admit One</div>
                        </div>
                     </div>
                     
                     {/* Backend Node Icon (Appears on zoom) */}
                     <motion.div style={{ opacity: nodeIconOpacity }} className="absolute inset-0 bg-[#0a0a0a] flex flex-col items-center justify-center pointer-events-none">
                        <Cloud className="w-12 h-12 text-blue-400 drop-shadow-[0_0_20px_rgba(59,130,246,0.8)]" />
                        <span className="mt-2 text-[8px] text-blue-300 font-mono uppercase font-bold">AWS ECS Cloud</span>
                     </motion.div>
                  </div>
               </motion.div>

            </div>
          </motion.div>

          {/* ================= CHAPTER 3: THE CLIMAX ARCHITECTURE ================= */}
          <motion.div className="absolute inset-0 pointer-events-none" style={{ opacity: archOpacity }}>
             
             {/* Load Balancer */}
             <div className="absolute top-[20%] left-[20%] w-40 h-40 bg-blue-900/30 border border-blue-500/50 rounded-3xl backdrop-blur-sm flex flex-col items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                <ShieldAlert className="w-12 h-12 text-blue-400 mb-4" />
                <span className="text-xs text-blue-300 font-mono">Load Balancer</span>
             </div>

             {/* EC2 Instance 1 */}
             <div className="absolute top-[50%] left-[20%] w-32 h-32 bg-blue-900/30 border border-blue-500/50 rounded-3xl backdrop-blur-sm flex flex-col items-center justify-center">
                <Server className="w-8 h-8 text-blue-400 mb-2" />
                <span className="text-[10px] text-blue-300 font-mono">Node Instance</span>
             </div>

             {/* Supabase DB */}
             <div className="absolute top-[50%] left-[60%] w-48 h-48 bg-emerald-900/30 border border-emerald-500/50 rounded-3xl backdrop-blur-sm flex flex-col items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.2)]">
                <Database className="w-16 h-16 text-emerald-400 mb-4" />
                <span className="text-xs text-emerald-300 font-mono">Supabase PostgreSQL</span>
                
                {/* Metric! */}
                <motion.div className="absolute -right-24 top-1/2 -translate-y-1/2 text-emerald-400 font-mono text-xs" style={{ opacity: metricEmbedOpacity }}>
                   <div className="text-2xl font-bold bg-black/50 px-2 py-1 rounded-lg backdrop-blur-md border border-emerald-500/30">10k+</div>
                   <div className="uppercase tracking-widest text-[8px] opacity-70 mt-1 ml-2">Requests/Min</div>
                </motion.div>
             </div>
          </motion.div>

          {/* ================= CHAPTER 4: CAUSE & EFFECT (PACKETS) ================= */}
          <motion.svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: archOpacity }}>
            <defs>
              <linearGradient id="glowAnu" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
            
            <path d="M 25% 15% L 25% 25%" stroke="rgba(255,255,255,0.05)" strokeWidth="0.2" fill="none" />
            <path d="M 25% 35% L 25% 55%" stroke="rgba(255,255,255,0.05)" strokeWidth="0.2" fill="none" />
            <path d="M 30% 60% L 65% 60%" stroke="rgba(255,255,255,0.05)" strokeWidth="0.2" fill="none" />

            <motion.path d="M 25% 15% L 25% 25%" stroke="url(#glowAnu)" strokeWidth="0.4" fill="none" strokeLinecap="round" strokeDasharray="1 10" style={{ pathLength: packet1Path, opacity: packet1Op }} />
            <motion.path d="M 25% 35% L 25% 55%" stroke="#3b82f6" strokeWidth="0.4" fill="none" strokeLinecap="round" strokeDasharray="1 10" style={{ pathLength: packet2Path, opacity: packet2Op }} />
            <motion.path d="M 30% 60% L 65% 60%" stroke="#10b981" strokeWidth="0.4" fill="none" strokeLinecap="round" strokeDasharray="1 10" style={{ pathLength: packet3Path, opacity: packet3Op }} />
          </motion.svg>
        </motion.div>

        {/* ================= CHAPTER 6: FINALE ================= */}
        <motion.div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none bg-[#020202]/80 backdrop-blur-xl" style={{ opacity: finaleOpacity }}>
           <motion.div style={{ y: finaleY }} className="text-center">
             <h2 className="text-3xl md:text-5xl font-light text-white/50 tracking-widest uppercase mb-12">ANUGOONJ '24</h2>
             <div className="flex flex-col items-center justify-center gap-4 md:gap-6 text-2xl md:text-5xl font-bold text-white tracking-tighter">
               <span>10,000+ Students.</span>
               <span className="text-orange-500">10k+ Requests/min.</span>
               <span className="text-emerald-500">Zero downtime.</span>
             </div>
           </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
