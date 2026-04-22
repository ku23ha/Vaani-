"use client";

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, Environment, Sparkles } from '@react-three/drei';
import { useRef } from 'react';

function AnimatedSphere({ color, scale, speed, distort, position, floatIntensity }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.3;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={1.5} floatIntensity={floatIntensity} floatingRange={[-0.2, 0.2]}>
      <Sphere ref={meshRef} args={[1, 64, 64]} position={position} scale={scale}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={distort}
          speed={speed * 2}
          roughness={0.2}
          metalness={0.8}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </Sphere>
    </Float>
  );
}

export function Hero3D() {
  return (
    <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#212191" />

        {/* Abstract voice/tech representations using spheres */}
        <AnimatedSphere
          color="#212191"
          scale={0.8}
          speed={1.5}
          distort={0.4}
          position={[-2.5, 1, -2]}
          floatIntensity={2}
        />
        <AnimatedSphere
          color="#E8845A"
          scale={0.6}
          speed={2}
          distort={0.5}
          position={[2.5, -0.5, -1]}
          floatIntensity={3}
        />
        <AnimatedSphere
          color="#9B99E8"
          scale={0.4}
          speed={1}
          distort={0.3}
          position={[-1.5, -1.5, -1.5]}
          floatIntensity={1.5}
        />
        <AnimatedSphere
          color="#D4956B"
          scale={0.5}
          speed={1.8}
          distort={0.6}
          position={[1.5, 1.5, -2.5]}
          floatIntensity={2.5}
        />

        {/* Floating particles representing data points */}
        <Sparkles count={100} scale={10} size={2} speed={0.4} opacity={0.5} color="#212191" />

        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
