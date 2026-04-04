'use client';

/**
 * CinematicScene — Hexagonal Honeycomb Evolution
 * Moves based on scroll progress through 6 sections.
 * Enhanced with smoother interpolation and cinematic easing.
 */

import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { MotionValue } from 'framer-motion';

const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));

// Quintic smoothstep for ultra-smooth transitions (stronger easing at edges)
const smooth = (v: number, lo: number, hi: number) => {
  const t = clamp((v - lo) / (hi - lo));
  return t * t * t * (t * (t * 6 - 15) + 10); // Perlin smootherstep
};

const L = THREE.MathUtils.lerp;

// Damped lerp — time-independent smooth interpolation
const damp = (current: number, target: number, lambda: number, dt: number) => {
  return THREE.MathUtils.lerp(current, target, 1 - Math.exp(-lambda * dt));
};

// Sections mapping (0 to 1)
const S = {
  hero: [0.0, 0.16] as [number, number],
  about: [0.16, 0.33] as [number, number],
  services: [0.33, 0.50] as [number, number],
  tech: [0.50, 0.66] as [number, number],
  why: [0.66, 0.83] as [number, number],
  cta: [0.83, 1.0] as [number, number],
};

function sectionPeak(p: number, lo: number, hi: number, peak = 0.5) {
  const mid = lo + (hi - lo) * peak;
  if (p < mid) return smooth(p, lo, mid);
  return 1 - smooth(p, mid, hi);
}

const COLORS = {
  hero: '#00d4ff',
  ai: '#a855f7',
  dev: '#00ff88',
  auto: '#ff00ff',
};

// ── The Camera ─────────────────────────────────────────────────────────────────
function HexCamera({ progress }: { progress: React.MutableRefObject<number> }) {
  // Store smooth mouse values for damped interpolation
  const smoothMouse = useRef({ x: 0, y: 0 });
  const smoothLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(({ camera, mouse, clock }, delta) => {
    const p = progress.current;
    const t = clock.getElapsedTime();
    const dt = Math.min(delta, 0.05); // Cap delta to prevent jumps

    // Smooth mouse with damping (much smoother than raw mouse)
    smoothMouse.current.x = damp(smoothMouse.current.x, mouse.x * 0.4, 3, dt);
    smoothMouse.current.y = damp(smoothMouse.current.y, mouse.y * 0.3, 3, dt);
    const mx = smoothMouse.current.x;
    const my = smoothMouse.current.y;

    // Gentle floating motion
    const fx = Math.sin(t * 0.2) * 0.12;
    const fy = Math.cos(t * 0.15) * 0.1;

    // Section-based camera offset
    let secX = L(0, -3.5, smooth(p, S.services[0], S.services[0] + 0.1)) 
             - L(0, -3.5, smooth(p, S.services[1] - 0.1, S.services[1]));

    let tz = 15;
    tz = L(tz, 10, smooth(p, S.about[0], S.about[0] + 0.1));
    tz = L(tz, 18, smooth(p, S.services[0], S.services[1]));
    tz = L(tz, 9, smooth(p, S.tech[0], S.tech[1]));
    tz = L(tz, 20, smooth(p, S.cta[0], S.cta[1]));

    let ty = L(0, 2, smooth(p, S.why[0], S.why[1]));

    // Damped camera movement (time-independent, frame-rate stable)
    camera.position.x = damp(camera.position.x, mx + fx + secX, 2.5, dt);
    camera.position.y = damp(camera.position.y, my + fy + ty, 2.5, dt);
    camera.position.z = damp(camera.position.z, tz, 2.5, dt);

    // Smooth lookAt target
    const targetLook = new THREE.Vector3(secX * 0.2, ty * 0.5, 0);
    smoothLookAt.current.x = damp(smoothLookAt.current.x, targetLook.x, 3, dt);
    smoothLookAt.current.y = damp(smoothLookAt.current.y, targetLook.y, 3, dt);
    smoothLookAt.current.z = damp(smoothLookAt.current.z, targetLook.z, 3, dt);
    camera.lookAt(smoothLookAt.current);
  });
  return <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={45} />;
}

// ── The Honeycomb Instance Mesh ────────────────────────────────────────────────
const HEX_COUNT_X = 9;
const HEX_COUNT_Y = 9;
const TOTAL_HEX = HEX_COUNT_X * HEX_COUNT_Y;

function HexagonalSwarm({ progress }: { progress: React.MutableRefObject<number> }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const colorArray = useMemo(() => new Float32Array(TOTAL_HEX * 3), []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Store current positions for smooth interpolation
  const currentPositions = useRef(
    Array.from({ length: TOTAL_HEX }, () => ({ x: 0, y: 0, z: 0, rx: 0, ry: 0, rz: Math.PI / 6, s: 1 }))
  );
  const currentColors = useRef(
    Array.from({ length: TOTAL_HEX }, () => ({ r: 1, g: 1, b: 1 }))
  );

  const hexData = useMemo(() => {
    const data = [];
    for (let iy = 0; iy < HEX_COUNT_Y; iy++) {
      for (let ix = 0; ix < HEX_COUNT_X; ix++) {
        const radius = 0.6;
        const w = Math.sqrt(3) * radius;
        const h = 2 * radius;
        const xOffset = w * (ix - HEX_COUNT_X / 2.0 + (iy % 2 === 0 ? 0 : 0.5));
        const yOffset = h * 0.75 * (iy - HEX_COUNT_Y / 2.0);

        data.push({
          x: xOffset,
          y: yOffset,
          ox: xOffset,
          oy: yOffset,
          id: ix + iy * HEX_COUNT_X,
          phase: Math.random() * Math.PI * 2,
        });
      }
    }
    return data;
  }, []);

  const baseColors = useMemo(() => {
    return [
      new THREE.Color(COLORS.hero),
      new THREE.Color(COLORS.ai),
      new THREE.Color(COLORS.dev),
      new THREE.Color(COLORS.auto),
    ];
  }, []);

  useFrame(({ clock }, delta) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    const p = progress.current;
    const dt = Math.min(delta, 0.05); // Cap delta

    const isHero = smooth(p, S.hero[0], S.hero[1] - 0.05);
    const isAbout = smooth(p, S.about[0] - 0.05, S.about[1]);
    const isServices = smooth(p, S.services[0], S.services[1]);
    const isTech = smooth(p, S.tech[0], S.tech[1]);
    const isWhy = smooth(p, S.why[0], S.why[1]);
    const isCta = smooth(p, S.cta[0], S.cta[1]);

    // Smoothing lambda — higher = snappier, lower = more buttery
    const posLambda = 4.0;
    const rotLambda = 3.5;
    const scaleLambda = 5.0;
    const colorLambda = 3.0;

    hexData.forEach((hex, i) => {
      const dotX = -2.5; 
      const dotY = 5.0; 
      const dotZ = 2.0;
      
      const distFromCenter = Math.sqrt(hex.ox * hex.ox + hex.oy * hex.oy);
      
      // Target Pos
      let tx = hex.ox;
      let ty = hex.oy;
      let tz = 0;

      // Hero -> converge to dot
      tx = L(tx, dotX + Math.sin(t * 1.5 + hex.phase) * 0.08, 1 - isAbout);
      ty = L(ty, dotY + Math.cos(t * 1.5 + hex.phase) * 0.08, 1 - isAbout);
      tz = L(tz, dotZ + Math.sin(t * 2 + hex.phase) * 0.08, 1 - isAbout);

      // Services -> Float apart and cluster
      if (isServices > 0) {
        tz += Math.sin(hex.ox * 0.5 + t * 0.8) * 2.0 * isServices;
      }

      // Tech -> Break apart, rotate
      if (isTech > 0) {
        tx += Math.cos(hex.phase + t * 0.4) * 4 * isTech;
        ty += Math.sin(hex.phase + t * 0.4) * 4 * isTech;
        tz += Math.cos(distFromCenter * 0.5 + t * 0.8) * 3 * isTech;
      }

      // Why -> Shield Wall
      if (isWhy > 0) {
        const angle = Math.atan2(hex.oy, hex.ox);
        tx = L(tx, Math.cos(angle) * (3 + distFromCenter * 0.2), isWhy);
        ty = L(ty, Math.sin(angle) * (3 + distFromCenter * 0.2), isWhy);
        tz = L(tz, -distFromCenter * 0.5 + 2, isWhy);
      }

      // CTA -> Converge
      if (isCta > 0) {
        tx = L(tx, Math.sin(t * 0.8 + hex.phase) * distFromCenter * 0.2, isCta);
        ty = L(ty, Math.cos(t * 0.8 + hex.phase) * distFromCenter * 0.2, isCta);
        tz = L(tz, Math.sin(t * 1.5 + hex.phase) * 2 - 5, isCta);
      }

      // Target Rotations
      let trx = 0;
      let trY = 0;
      let trz = Math.PI / 6;

      if (1 - isAbout > 0.5) {
        trx = t * 0.8 + hex.phase;
        trY = t * 1.2 + hex.phase;
      }
      
      if (isTech > 0) {
        trx += t * 0.6 * isTech * (hex.id % 2 === 0 ? 1 : -1);
        trY += t * 0.6 * isTech * (hex.id % 3 === 0 ? 1 : -1);
      }

      // Target Scale
      let targetScale = 1.0;
      if (1 - isAbout > 0.8) {
        targetScale = 0.15;
      } else {
        targetScale = 0.95 + Math.sin(t * 1.5 + hex.phase) * 0.08;
      }
      if (isCta > 0) {
        targetScale = L(targetScale, 0.4 + Math.sin(t * 6 + hex.phase) * 0.15, isCta);
      }

      // ─── DAMPED INTERPOLATION (the magic for smoothness) ───
      const cur = currentPositions.current[i];
      cur.x = damp(cur.x, tx, posLambda, dt);
      cur.y = damp(cur.y, ty, posLambda, dt);
      cur.z = damp(cur.z, tz, posLambda, dt);
      cur.rx = damp(cur.rx, trx, rotLambda, dt);
      cur.ry = damp(cur.ry, trY, rotLambda, dt);
      cur.rz = damp(cur.rz, trz, rotLambda, dt);
      cur.s = damp(cur.s, targetScale, scaleLambda, dt);

      dummy.position.set(cur.x, cur.y, cur.z);
      dummy.rotation.set(cur.rx, cur.ry, cur.rz);
      dummy.scale.setScalar(cur.s);

      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);

      // Colors — also smoothly interpolated
      let colorTarget = baseColors[0];
      if (isServices > 0.1) colorTarget = baseColors[hex.id % 4];
      if (isTech > 0.5) colorTarget = baseColors[(hex.id + 1) % 4];
      if (isWhy > 0.5) colorTarget = baseColors[2];
      if (isCta > 0.5) colorTarget = baseColors[1];

      const isHeroDot = (1 - isAbout);
      const tr = L(colorTarget.r, 1.0, isHeroDot);
      const tg = L(colorTarget.g, 1.0, isHeroDot);
      const tb = L(colorTarget.b, 1.0, isHeroDot);

      // Damp colors
      const cc = currentColors.current[i];
      cc.r = damp(cc.r, tr, colorLambda, dt);
      cc.g = damp(cc.g, tg, colorLambda, dt);
      cc.b = damp(cc.b, tb, colorLambda, dt);

      colorArray[i * 3 + 0] = cc.r;
      colorArray[i * 3 + 1] = cc.g;
      colorArray[i * 3 + 2] = cc.b;
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, TOTAL_HEX]}>
      <cylinderGeometry args={[0.55, 0.55, 0.2, 6]} />
      <meshStandardMaterial 
        roughness={0.1}
        metalness={0.9}
        transparent
        opacity={0.85}
      />
      <instancedBufferAttribute attach="instanceColor" args={[colorArray, 3]} />
    </instancedMesh>
  );
}

// ── Environment ──────────────────────────────────────────────────────────────
function Atmosphere({ progress }: { progress: React.MutableRefObject<number> }) {
  const pLight = useRef<THREE.PointLight>(null);
  const smoothColor = useRef(new THREE.Color(COLORS.hero));
  
  useFrame(({ clock }, delta) => {
    if (!pLight.current) return;
     const t = clock.getElapsedTime();
     const p = progress.current;
     const dt = Math.min(delta, 0.05);
     
     // Target color based on section
     let targetColor = new THREE.Color(COLORS.hero);
     if (p >= S.about[1] && p < S.services[1]) targetColor = new THREE.Color(COLORS.dev);
     else if (p >= S.services[1] && p < S.tech[1]) targetColor = new THREE.Color(COLORS.ai);
     else if (p >= S.tech[1] && p < S.why[1]) targetColor = new THREE.Color(COLORS.auto);
     else if (p >= S.why[1]) targetColor = new THREE.Color(COLORS.hero);

     // Smooth color transition
     smoothColor.current.r = damp(smoothColor.current.r, targetColor.r, 2, dt);
     smoothColor.current.g = damp(smoothColor.current.g, targetColor.g, 2, dt);
     smoothColor.current.b = damp(smoothColor.current.b, targetColor.b, 2, dt);
     pLight.current.color.copy(smoothColor.current);

     pLight.current.intensity = 15 + Math.sin(t * 1.5) * 4;
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight ref={pLight} position={[0, 0, 5]} distance={30} intensity={15} />
      <directionalLight position={[10, 10, 10]} intensity={1.5} color={COLORS.hero} />
      <directionalLight position={[-10, -10, -10]} intensity={1.0} color={COLORS.ai} />
    </>
  );
}

// ── Main Scene ────────────────────────────────────────────────────────────────
export default function CinematicScene({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const progress = useRef(0);
  const targetProgress = useRef(0);

  useEffect(() => {
    targetProgress.current = scrollYProgress.get();
    progress.current = targetProgress.current;
    const unsub = scrollYProgress.on('change', v => { targetProgress.current = v; });
    return unsub;
  }, [scrollYProgress]);

  // Smooth the scroll progress in a rAF loop for buttery interpolation
  useEffect(() => {
    let raf: number;
    let lastTime = performance.now();
    
    const tick = () => {
      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      
      // Smooth scroll progress with damping
      progress.current = damp(progress.current, targetProgress.current, 6, dt);
      raf = requestAnimationFrame(tick);
    };
    
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <Canvas
      dpr={[1, 1.8]}
      gl={{
        antialias: true,
        alpha: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2,
        powerPreference: 'high-performance',
      }}
      frameloop="always"
    >
      <HexCamera progress={progress} />
      <Atmosphere progress={progress} />
      <HexagonalSwarm progress={progress} />
    </Canvas>
  );
}