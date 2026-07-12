"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";

const clusters = [
  {
    id: "backend",
    name: "Backend",
    color: "#3b82f6", // Blue
    position: [0, 0, 0] as [number, number, number],
    orbitSpeed: 0.2,
    planets: [
      { name: "Python", size: 0.6, distance: 2, angle: 0 },
      { name: "FastAPI", size: 0.5, distance: 3.2, angle: Math.PI / 2 },
      { name: "Node.js", size: 0.4, distance: 4.5, angle: Math.PI },
      { name: "Express", size: 0.3, distance: 5.5, angle: Math.PI * 1.5 },
    ],
  },
  {
    id: "data",
    name: "Data",
    color: "#a855f7", // Purple
    position: [-8, 4, -4] as [number, number, number],
    orbitSpeed: 0.15,
    planets: [
      { name: "Kafka", size: 0.5, distance: 1.8, angle: 0 },
      { name: "PostgreSQL", size: 0.45, distance: 2.8, angle: Math.PI / 1.5 },
      { name: "PySpark", size: 0.35, distance: 3.8, angle: Math.PI * 1.2 },
      { name: "Redis", size: 0.3, distance: 4.5, angle: Math.PI * 1.8 },
    ],
  },
  {
    id: "infra",
    name: "Infrastructure",
    color: "#10b981", // Green
    position: [8, -3, -6] as [number, number, number],
    orbitSpeed: 0.1,
    planets: [
      { name: "AWS", size: 0.45, distance: 1.8, angle: 0 },
      { name: "Docker", size: 0.4, distance: 3.0, angle: Math.PI },
      { name: "Terraform", size: 0.3, distance: 4.2, angle: Math.PI / 2 },
      { name: "Kubernetes", size: 0.3, distance: 5.2, angle: Math.PI * 1.5 },
    ],
  },
  {
    id: "frontend",
    name: "Frontend",
    color: "#f59e0b", // Orange
    position: [-5, -6, 2] as [number, number, number],
    orbitSpeed: 0.25,
    planets: [
      { name: "React", size: 0.5, distance: 1.5, angle: 0 },
      { name: "Next.js", size: 0.4, distance: 2.5, angle: Math.PI },
      { name: "Tailwind", size: 0.35, distance: 3.5, angle: Math.PI / 2 },
      { name: "Framer Motion", size: 0.3, distance: 4.5, angle: Math.PI * 1.5 },
    ],
  },
];

function Planet({ planet, color }: { planet: any; color: string }) {
  const [hovered, setHovered] = useState(false);
  
  const x = Math.cos(planet.angle) * planet.distance;
  const z = Math.sin(planet.angle) * planet.distance;

  return (
    <group position={[x, 0, z]}>
      {/* Orbit Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-x, 0, -z]}>
        <ringGeometry args={[planet.distance - 0.02, planet.distance + 0.02, 64]} />
        <meshBasicMaterial color={color} transparent opacity={0.05} side={THREE.DoubleSide} />
      </mesh>

      <mesh
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
      >
        <sphereGeometry args={[planet.size, 32, 32]} />
        <meshBasicMaterial color={hovered ? "#ffffff" : color} transparent opacity={hovered ? 1 : 0.8} />
        
        <Html center zIndexRange={[100, 0]} className="pointer-events-none mt-4">
          <div
            className={`px-2 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-all duration-300 ${
              hovered
                ? "bg-white text-black scale-110 shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                : "bg-black/50 text-white/70 backdrop-blur-md border border-white/10"
            }`}
          >
            {planet.name}
          </div>
        </Html>
      </mesh>
    </group>
  );
}

function Cluster({ cluster }: { cluster: any }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * cluster.orbitSpeed;
    }
  });

  return (
    <group position={cluster.position}>
      {/* Central Star (Cluster Name) */}
      <mesh>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshBasicMaterial color={cluster.color} transparent opacity={0.2} />
        <Html center className="pointer-events-none">
          <div className="px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-sm font-bold text-white/90 whitespace-nowrap">
            {cluster.name}
          </div>
        </Html>
      </mesh>

      {/* Orbiting Planets */}
      <group ref={groupRef}>
        {cluster.planets.map((planet: any) => (
          <Planet key={planet.name} planet={planet} color={cluster.color} />
        ))}
      </group>
    </group>
  );
}

export default function TechStack() {
  return (
    <section id="skills" className="relative w-full h-[120vh] bg-transparent overflow-hidden flex flex-col items-center pt-32">
      
      <div className="absolute top-32 z-10 text-left w-full max-w-4xl px-6 md:px-12 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-sm font-mono tracking-[0.2em] text-blue-500 mb-4 uppercase">
            Tech Constellations
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
              Tools are just tools.
            </span>
            <br className="hidden md:block" />
            <span className="text-white/40">Here is what I use to build.</span>
          </h3>
        </motion.div>
      </div>

      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 5, 15], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={Math.PI / 3}
          />
          {clusters.map(cluster => (
            <Cluster key={cluster.id} cluster={cluster} />
          ))}
          
          {/* Subtle background stars */}
          <group>
            {Array.from({ length: 200 }).map((_, i) => {
              const x = (Math.random() - 0.5) * 60;
              const y = (Math.random() - 0.5) * 60;
              const z = (Math.random() - 0.5) * 60;
              if (Math.abs(x) < 10 && Math.abs(y) < 10 && Math.abs(z) < 10) return null;
              
              return (
                <mesh key={i} position={[x, y, z]}>
                  <sphereGeometry args={[Math.random() * 0.05, 8, 8]} />
                  <meshBasicMaterial color="#ffffff" transparent opacity={Math.random() * 0.5 + 0.1} />
                </mesh>
              );
            })}
          </group>
        </Canvas>
      </div>

      <div className="absolute bottom-10 z-10 text-center pointer-events-none">
        <p className="text-xs text-white/30 uppercase tracking-widest">Interactive • Drag to explore</p>
      </div>
    </section>
  );
}
