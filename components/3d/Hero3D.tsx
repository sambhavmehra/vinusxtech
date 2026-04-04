'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// ── Brand palette pulled from VinUSXtech logo ──────────────────────────────
const BRAND = {
  blue:       '#0088ff',   // electric blue (honeycomb glow)
  purple:     '#aa33ff',   // vivid violet  (outer hexagons)
  blueDark:   '#0044bb',   // deep blue
  purpleDark: '#660099',   // deep purple
  lightning:  '#ccddff',   // near-white lightning streak
};

// ── Central distorted sphere ───────────────────────────────────────────────
function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = clock.elapsedTime * 0.2;
    meshRef.current.rotation.y = clock.elapsedTime * 0.3;
  });

  return (
    <Sphere ref={meshRef} args={[1, 100, 100]} scale={2.5}>
      <MeshDistortMaterial
        color={BRAND.blue}
        attach="material"
        distort={0.45}
        speed={2.5}
        roughness={0.15}
        metalness={0.9}
        emissive={BRAND.blue}
        emissiveIntensity={0.6}
      />
    </Sphere>
  );
}

// ── Floating particle cloud ────────────────────────────────────────────────
function Particles() {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr: number[] = [];
    for (let i = 0; i < 2400; i++) {
      arr.push(
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50,
      );
    }
    return new Float32Array(arr);
  }, []);

  // Two-color particle layers: blue + purple
  const colors = useMemo(() => {
    const col: number[] = [];
    const blue   = new THREE.Color(BRAND.blue);
    const purple = new THREE.Color(BRAND.purple);
    for (let i = 0; i < 2400; i++) {
      const c = Math.random() > 0.45 ? blue : purple;
      col.push(c.r, c.g, c.b);
    }
    return new Float32Array(col);
  }, []);

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    g.setAttribute('color',    new THREE.BufferAttribute(colors,    3));
    return g;
  }, [positions, colors]);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.elapsedTime * 0.04;
      ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.1) * 0.05;
    }
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}

// ── Honeycomb-inspired wireframe grid ─────────────────────────────────────
function NetworkGrid() {
  const ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.25) * 0.15;
    ref.current.rotation.y = clock.elapsedTime * 0.08;
  });

  return (
    <group ref={ref}>
      {/* Horizontal hex-tiled grid */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.5, 0]}>
        <planeGeometry args={[60, 60, 60, 60]} />
        <meshBasicMaterial
          color={BRAND.blue}
          wireframe
          transparent
          opacity={0.07}
        />
      </mesh>
      {/* Vertical back plane — purple tint */}
      <mesh rotation={[0, 0, 0]} position={[0, 0, -8]}>
        <planeGeometry args={[60, 40, 30, 20]} />
        <meshBasicMaterial
          color={BRAND.purple}
          wireframe
          transparent
          opacity={0.05}
        />
      </mesh>
    </group>
  );
}

// ── Lightning arc approximation using a Line ──────────────────────────────
function LightningArc({
  start,
  end,
  segments = 12,
  jitter = 0.5,
}: {
  start: [number, number, number];
  end:   [number, number, number];
  segments?: number;
  jitter?: number;
}) {
  const ref = useRef<THREE.Line>(null);

  const geo = useMemo(() => {
    const s = new THREE.Vector3(...start);
    const e = new THREE.Vector3(...end);
    const points: THREE.Vector3[] = [];
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const p = s.clone().lerp(e, t);
      if (i > 0 && i < segments) {
        p.x += (Math.random() - 0.5) * jitter;
        p.y += (Math.random() - 0.5) * jitter;
        p.z += (Math.random() - 0.5) * jitter * 0.5;
      }
      points.push(p);
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      // flicker: fast opacity oscillation
      const mat = ref.current.material as THREE.LineBasicMaterial;
      mat.opacity = 0.3 + Math.abs(Math.sin(clock.elapsedTime * 8 + Math.random())) * 0.7;
    }
  });

  return (
    // @ts-expect-error r3f primitive
    <line ref={ref} geometry={geo}>
      <lineBasicMaterial
        color={BRAND.lightning}
        transparent
        opacity={0.8}
        linewidth={1}
      />
    </line>
  );
}

// ── Outer hexagonal halo ring ─────────────────────────────────────────────
function HexRing() {
  const ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.z = clock.elapsedTime * 0.12;
  });

  const count  = 7;
  const radius = 3.8;

  return (
    <group ref={ref}>
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const color = i % 2 === 0 ? BRAND.blue : BRAND.purple;
        return (
          <mesh key={i} position={[x, y, 0]} rotation={[0, 0, angle]}>
            <cylinderGeometry args={[0.55, 0.55, 0.12, 6]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={1.2}
              roughness={0.1}
              metalness={1}
              transparent
              opacity={0.75}
              wireframe
            />
          </mesh>
        );
      })}
    </group>
  );
}

// ── Scene root ─────────────────────────────────────────────────────────────
export default function Hero3D() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 72 }}
        gl={{ alpha: true, antialias: true }}
      >
        {/* Lighting — blue key + purple fill, like the logo */}
        <ambientLight intensity={0.3} />
        <pointLight position={[8,  8,  8]}  color={BRAND.blue}   intensity={2.5} />
        <pointLight position={[-8, -6, -6]} color={BRAND.purple} intensity={1.8} />
        <pointLight position={[0,  4,  2]}  color={BRAND.lightning} intensity={0.6} />

        <AnimatedSphere />
        <Particles />
        <NetworkGrid />
        <HexRing />

        {/* Lightning arcs between ring and core */}
        <LightningArc start={[ 3.8,  0,   0]} end={[ 1.2,  0.3,  0.2]} />
        <LightningArc start={[-1.9,  3.3, 0]} end={[-0.8,  1.1,  0.1]} jitter={0.4} />
        <LightningArc start={[-1.9, -3.3, 0]} end={[-0.5, -1.2, -0.1]} jitter={0.6} />
        <LightningArc start={[ 1.9,  3.3, 0]} end={[ 0.6,  1.0,  0.2]} segments={10} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.6}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
}