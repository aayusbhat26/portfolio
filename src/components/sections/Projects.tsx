"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, LayoutGrid, Layers } from "lucide-react";
import TaskFlowStory from "@/components/stories/TaskFlowStory";
import LegalAssistStory from "@/components/stories/LegalAssistStory";
import DrawTogetherStory from "@/components/stories/DrawTogetherStory";
import AnugoonjStory from "@/components/stories/AnugoonjStory";

const projectsData = [
  { id: "taskflow", title: "TaskFlow", subtitle: "Microservices Architecture", problem: "Enterprise project tools are bloated and slow.", solution: "Microservices backend with Redis-backed realtime sync.", metric: "50ms Latency" },
  { id: "legalassist", title: "Legal Assist", subtitle: "AI Document Analysis", problem: "Legal research takes hours of manual reading.", solution: "Automated RAG pipeline with semantic vector search.", metric: "1536d Vectors" },
  { id: "drawtogether", title: "Draw Together", subtitle: "Distributed Websockets", problem: "Remote whiteboarding suffers from sync lag.", solution: "Node.js Socket server scaled via Redis Pub/Sub.", metric: "2ms Broadcast" },
  { id: "anugoonj", title: "Anugoonj '24", subtitle: "High-Traffic Infrastructure", problem: "Festival registration portals crash under load.", solution: "Load-balanced AWS ECS architecture with Supabase.", metric: "10k+ Req/min" }
];

export default function Projects() {
  const [viewMode, setViewMode] = useState<'quick' | 'deep'>('quick');

  return (
    <section id="projects" className="w-full bg-black relative z-10 min-h-screen py-24">
       
       {/* Toggle UI */}
       <div className="w-full max-w-6xl mx-auto px-6 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
              <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
                Engineering Stories
              </span>
            </h2>
            <p className="text-white/50 tracking-widest uppercase text-sm">Products built for scale.</p>
          </div>

          <div className="flex bg-white/5 p-1 rounded-full border border-white/10 w-max">
             <button 
               onClick={() => setViewMode('quick')}
               className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-semibold transition-all ${viewMode === 'quick' ? 'bg-white text-black' : 'text-white/50 hover:text-white'}`}
             >
               <LayoutGrid className="w-4 h-4"/> Quick View
             </button>
             <button 
               onClick={() => setViewMode('deep')}
               className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-semibold transition-all ${viewMode === 'deep' ? 'bg-white text-black' : 'text-white/50 hover:text-white'}`}
             >
               <Layers className="w-4 h-4"/> Deep Dive
             </button>
          </div>
       </div>

       {viewMode === 'quick' ? (
          <div className="w-full max-w-6xl mx-auto px-6">
             {/* FLAGSHIP PROJECT - TaskFlow takes full width, larger, more prominent */}
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="mb-8"
             >
                <div className="group relative p-12 md:p-16 rounded-[32px] bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 hover:border-emerald-500/30 hover:bg-white/[0.06] transition-all duration-500 flex flex-col md:flex-row gap-12 shadow-2xl hover:shadow-emerald-500/10">
                   {/* Glow effect for flagship */}
                   <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 rounded-[32px] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
                   
                   <div className="flex-1">
                      <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono uppercase tracking-widest mb-6">
                         Flagship Project
                      </div>
                      <div className="flex justify-between items-start mb-8">
                         <div>
                           <h3 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">{projectsData[0].title}</h3>
                           <p className="text-emerald-400 text-sm font-mono uppercase tracking-wider">{projectsData[0].subtitle}</p>
                         </div>
                         <div className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-sm font-bold px-4 py-2 rounded-full backdrop-blur-md shadow-lg">
                            {projectsData[0].metric}
                         </div>
                      </div>

                      <div className="space-y-6 mb-10">
                         <div>
                           <div className="text-[11px] uppercase tracking-widest text-white/40 mb-2 font-medium">The Problem</div>
                           <p className="text-white/80 text-base leading-relaxed">{projectsData[0].problem}</p>
                         </div>
                         <div>
                           <div className="text-[11px] uppercase tracking-widest text-white/40 mb-2 font-medium">The Architecture</div>
                           <p className="text-white text-base leading-relaxed font-medium">{projectsData[0].solution}</p>
                         </div>
                      </div>

                      <button 
                        onClick={() => {
                           setViewMode('deep');
                           setTimeout(() => {
                              document.getElementById(projectsData[0].id)?.scrollIntoView({ behavior: 'smooth' });
                           }, 100);
                        }}
                        className="group/btn flex items-center gap-3 text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 px-6 py-3 rounded-full transition-all text-sm font-semibold cursor-pointer hover:shadow-lg hover:shadow-white/5"
                      >
                         Explore Technical Deep Dive 
                         <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                   </div>
                </div>
             </motion.div>

             {/* OTHER PROJECTS - Asymmetric grid with varied spacing */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-7">
                {projectsData.slice(1).map((project, i) => {
                  // Varied card styling - breaking the pattern
                  const delays = [0.1, 0.15, 0.25];
                  const paddings = ['p-7', 'p-9', 'p-8'];
                  const hoverColors = ['hover:border-blue-500/20', 'hover:border-purple-500/20', 'hover:border-orange-500/20'];
                  const metricBgs = ['bg-blue-500/10 text-blue-300', 'bg-purple-500/10 text-purple-300', 'bg-orange-500/10 text-orange-300'];
                  
                  return (
                     <motion.div 
                       key={project.id}
                       initial={{ opacity: 0, y: 30 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ delay: delays[i], duration: 0.6 }}
                       className={`group relative ${paddings[i]} rounded-2xl bg-white/[0.02] border border-white/5 ${hoverColors[i]} hover:bg-white/[0.04] transition-all duration-300 flex flex-col hover:shadow-lg`}
                     >
                        <div className="flex justify-between items-start mb-8">
                           <div>
                             <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{project.title}</h3>
                             <p className="text-white/50 text-xs font-mono uppercase tracking-wider">{project.subtitle}</p>
                           </div>
                           <div className={`${metricBgs[i]} text-[11px] font-bold px-3 py-1.5 rounded-full backdrop-blur-md`}>
                              {project.metric}
                           </div>
                        </div>

                        <div className="space-y-5 mb-10 flex-1">
                           <div>
                             <div className="text-[10px] uppercase tracking-widest text-white/30 mb-1.5">Problem</div>
                             <p className="text-white/70 text-sm leading-relaxed">{project.problem}</p>
                           </div>
                           <div>
                             <div className="text-[10px] uppercase tracking-widest text-white/30 mb-1.5">Solution</div>
                             <p className="text-white text-sm leading-relaxed">{project.solution}</p>
                           </div>
                        </div>

                        <button 
                          onClick={() => {
                             setViewMode('deep');
                             setTimeout(() => {
                                document.getElementById(project.id)?.scrollIntoView({ behavior: 'smooth' });
                             }, 100);
                          }}
                          className="flex items-center gap-2 text-white/40 group-hover:text-white transition-colors text-sm font-semibold w-max cursor-pointer"
                        >
                           Deep Dive <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                     </motion.div>
                  );
                })}
             </div>
          </div>
       ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full"
          >
             <div id="taskflow"><TaskFlowStory /></div>
             <div id="legalassist"><LegalAssistStory /></div>
             <div id="drawtogether"><DrawTogetherStory /></div>
             <div id="anugoonj"><AnugoonjStory /></div>
          </motion.div>
       )}
    </section>
  );
}
