"use client";

import { motion } from "framer-motion";
import { Users, Server, HardDrive, CreditCard, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";

export default function AnugoonjDiagram() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="relative w-full h-full min-h-[400px] flex items-center justify-center">
      
      {/* Background elements representing high traffic load */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ delay: 2, duration: 2 }}
      >
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {Array.from({ length: 40 }).map((_, i) => (
            <motion.path
              key={`traffic-${i}`}
              d={`M ${Math.random() * 10} ${Math.random() * 100} Q 25 50, 50 50`}
              stroke="#fb923c"
              strokeWidth="0.1"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5 + Math.random(), repeat: Infinity, ease: "linear", delay: Math.random() * 2 }}
            />
          ))}
        </svg>
      </motion.div>

      {/* Main SVG Connections */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-50 z-0" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        {[
          { from: [10, 50], to: [30, 50] }, // Users -> ALB
          { from: [30, 50], to: [50, 30] }, // ALB -> EC2 (Frontend)
          { from: [30, 50], to: [50, 70] }, // ALB -> EC2 (Backend)
          { from: [50, 70], to: [70, 70] }, // EC2 -> RDS
          { from: [50, 70], to: [85, 50] }, // EC2 -> Payment
        ].map((edge, i) => {
          const [x1, y1] = edge.from;
          const [x2, y2] = edge.to;
          const d = `M ${x1} ${y1} C ${x1 + (x2 - x1) / 2} ${y1}, ${x1 + (x2 - x1) / 2} ${y2}, ${x2} ${y2}`;
          return (
            <motion.path
              key={i}
              d={d}
              stroke="#fb923c" // orange-400
              strokeWidth="0.5"
              fill="none"
              strokeDasharray="2 2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, ease: "easeInOut", delay: i * 0.2 }}
            />
          );
        })}

        {/* Load balancer distributing packets */}
        <circle r="1" fill="#f97316">
          <animateMotion dur="0.8s" repeatCount="indefinite" path="M 10 50 L 30 50" />
        </circle>
        
        <circle r="1" fill="#f97316">
          <animateMotion dur="0.8s" repeatCount="indefinite" path="M 30 50 C 40 50, 40 30, 50 30" begin="0.8s" />
        </circle>
        <circle r="1" fill="#f97316">
          <animateMotion dur="0.8s" repeatCount="indefinite" path="M 30 50 C 40 50, 40 70, 50 70" begin="0.4s" />
        </circle>
        
        <circle r="1" fill="#f97316">
          <animateMotion dur="1s" repeatCount="indefinite" path="M 50 70 L 70 70" begin="1.2s" />
        </circle>
        <circle r="1.5" fill="#facc15">
          <animateMotion dur="1.5s" repeatCount="indefinite" path="M 50 70 C 60 70, 60 50, 85 50" begin="1.5s" />
        </circle>
      </svg>

      {/* Nodes */}
      <div className="absolute inset-0 w-full h-full z-10 pointer-events-none">
        {[
          { id: 'users', icon: Users, label: '15k+ Users', x: 10, y: 50, color: 'text-white' },
          { id: 'alb', icon: ShieldCheck, label: 'AWS ALB', x: 30, y: 50, color: 'text-orange-400', pulse: true },
          { id: 'ec2_front', icon: Server, label: 'S3 / CloudFront', x: 50, y: 30, color: 'text-orange-300' },
          { id: 'ec2_back', icon: Server, label: 'EC2 Node.js', x: 50, y: 70, color: 'text-orange-500' },
          { id: 'rds', icon: HardDrive, label: 'AWS RDS', x: 70, y: 70, color: 'text-blue-400' },
          { id: 'payment', icon: CreditCard, label: 'Payment Gateway', x: 85, y: 50, color: 'text-yellow-400' },
        ].map((node, i) => (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.2 + 0.5 }}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-auto group"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
          >
            <div className="relative p-3 bg-black/80 border border-orange-500/30 rounded-xl backdrop-blur-xl shadow-2xl group-hover:bg-orange-500/10 transition-colors">
              <node.icon className={`w-5 h-5 ${node.color}`} />
              {node.pulse && (
                <div className="absolute inset-0 rounded-xl border border-orange-400/30 animate-ping" />
              )}
            </div>
            <span className="mt-2 text-[10px] font-semibold text-white/80 text-center w-24">
              {node.label}
            </span>
            {node.id === 'users' && (
              <span className="absolute -top-6 text-[9px] text-orange-400 font-mono opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Spike: 5k req/s
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
