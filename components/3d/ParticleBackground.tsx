'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Particles() {
  const particlesRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const positions = [];
    const colors = [];
    const colorChoices = [
      new THREE.Color('#00ff88'),
      new THREE.Color('#00d4ff'),
      new THREE.Color('#a855f7'),
    ];

    for (let i = 0; i < 1500; i++) {
      const x = (Math.random() - 0.5) * 50;
      const y = (Math.random() - 0.5) * 50;
      const z = (Math.random() - 0.5) * 50;
      positions.push(x, y, z);

      const color = colorChoices[Math.floor(Math.random() * colorChoices.length)];
      colors.push(color.r, color.g, color.b);
    }

    return {
      positions: new Float32Array(positions),
      colors: new Float32Array(colors),
    };
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [positions, colors]);

  return (
    <points ref={particlesRef} geometry={geometry}>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export default function ParticleBackground() {
  return (
    <div className="fixed inset-0 w-full h-full -z-10">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 75 }}
        gl={{ alpha: true, antialias: true }}
      >
        <Particles />
      </Canvas>
    </div>
  );
}
