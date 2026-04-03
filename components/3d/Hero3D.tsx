'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 100, 100]} scale={2.5}>
      <MeshDistortMaterial
        color="#00ff88"
        attach="material"
        distort={0.5}
        speed={2}
        roughness={0.2}
        metalness={0.8}
        emissive="#00ff88"
        emissiveIntensity={0.5}
      />
    </Sphere>
  );
}

function Particles() {
  const particlesRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 2000; i++) {
      const x = (Math.random() - 0.5) * 50;
      const y = (Math.random() - 0.5) * 50;
      const z = (Math.random() - 0.5) * 50;
      temp.push(x, y, z);
    }
    return new Float32Array(temp);
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(particles, 3));
    return geo;
  }, [particles]);

  return (
    <points ref={particlesRef} geometry={geometry}>
      <pointsMaterial
        size={0.05}
        color="#00d4ff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function NetworkGrid() {
  const gridRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      gridRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={gridRef}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
        <planeGeometry args={[50, 50, 50, 50]} />
        <meshBasicMaterial
          color="#00ff88"
          wireframe
          transparent
          opacity={0.1}
        />
      </mesh>
    </group>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} color="#a855f7" intensity={0.5} />

        <AnimatedSphere />
        <Particles />
        <NetworkGrid />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}
