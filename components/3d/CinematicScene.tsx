'use client';

import React, { useRef, useMemo, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment, Sparkles, PerspectiveCamera, Points, PointMaterial, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { MotionValue } from 'framer-motion';

// --- Particle Field ---
function ParticleGrid({ progress }: { progress: React.MutableRefObject<number> }) {
  const count = 3000;
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 40;
      p[i * 3 + 1] = (Math.random() - 0.5) * 40;
      p[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    return p;
  }, [count]);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    const p = progress.current;

    // Rotate slowly over time, map scroll progress to z-translation and fast rotation
    pointsRef.current.rotation.y = time * 0.05 + p * Math.PI * 2;
    pointsRef.current.rotation.x = time * 0.02;

    // Pull particles forward as we scroll
    pointsRef.current.position.z = p * 20;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#00ff88" size={0.06} sizeAttenuation={true} depthWrite={false} opacity={0.4} />
    </Points>
  );
}

// --- Hacker Syndicate Emblem (Cyber Skull) ---
// --- 1. Hexagonal Pattern (VinUSXtech origin) ---
// --- 1. Hexagonal Pattern (VinUSXtech origin) ---
function HexagonPattern({ weightRef }: { weightRef: React.MutableRefObject<any> }) {
  const groupRef = useRef<THREE.Group>(null);
  const m1 = useRef<THREE.MeshBasicMaterial>(null);
  const m2 = useRef<THREE.MeshBasicMaterial>(null);
  const m3 = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((state) => {
    if (!groupRef.current || !m1.current || !m2.current || !m3.current) return;
    const time = state.clock.getElapsedTime();
    const w = weightRef.current.hex;
    
    groupRef.current.rotation.z = time * 0.2;
    groupRef.current.rotation.x = Math.sin(time * 0.5) * 0.2;
    groupRef.current.rotation.y = time * 0.1;

    // Apply scale and opacity natively
    const s = w > 0 ? 0.5 + w * 0.5 : 0.001;
    groupRef.current.scale.set(s, s, s);
    groupRef.current.visible = w > 0.01;

    m1.current.opacity = w * 0.9;
    m2.current.opacity = w * 0.5;
    m3.current.opacity = w * 0.8;
  });

  return (
    <group ref={groupRef}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.8, 0.05, 3, 6]} />
        <meshBasicMaterial ref={m1} color="#00d4ff" transparent blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.2, 0.08, 3, 6]} />
        <meshBasicMaterial ref={m2} color="#00d4ff" transparent blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial ref={m3} color="#00d4ff" transparent blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

// --- 2. AI Inspired Neural Structure ---
function AiNeuralCore({ weightRef }: { weightRef: React.MutableRefObject<any> }) {
  const groupRef = useRef<THREE.Group>(null);
  const m1 = useRef<any>(null);
  const m2 = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((state) => {
    if (!groupRef.current || !m1.current || !m2.current) return;
    const time = state.clock.getElapsedTime();
    const w = weightRef.current.ai;

    groupRef.current.rotation.y = time * 0.5;
    groupRef.current.rotation.x = time * 0.3;

    const s = w > 0 ? 0.5 + w * 0.5 : 0.001;
    groupRef.current.scale.set(s, s, s);
    groupRef.current.visible = w > 0.01;

    m1.current.opacity = w;
    m1.current.emissiveIntensity = w * 1.5;
    m2.current.opacity = w * 0.6;
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <icosahedronGeometry args={[1.4, 16]} />
        <MeshDistortMaterial
          ref={m1}
          color="#0A0A0F"
          emissive="#a855f7"
          wireframe={true}
          speed={4}
          distort={0.4}
          transparent
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[1.0, 4]} />
        <meshBasicMaterial ref={m2} color="#ff0088" wireframe transparent blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

// --- 3. Shield Structure (Security & Strength) ---
function ShieldStructure({ weightRef }: { weightRef: React.MutableRefObject<any> }) {
  const groupRef = useRef<THREE.Group>(null);
  const m1 = useRef<THREE.MeshStandardMaterial>(null);
  const m2 = useRef<THREE.MeshBasicMaterial>(null);
  
  useFrame((state) => {
    if (!groupRef.current || !m1.current || !m2.current) return;
    const time = state.clock.getElapsedTime();
    const w = weightRef.current.shield;

    groupRef.current.rotation.y = Math.sin(time) * 0.5; 
    
    const s = w > 0 ? 0.25 + w * 0.35 : 0.001;
    groupRef.current.scale.set(s, s, s);
    groupRef.current.visible = w > 0.01;

    m1.current.opacity = w * 0.9;
    m1.current.emissiveIntensity = w * 0.8;
    m2.current.opacity = w * 0.3;
  });

  return (
    <group ref={groupRef}>
      <mesh rotation={[Math.PI, 0, 0]}>
        <octahedronGeometry args={[1.8, 0]} />
        <meshStandardMaterial ref={m1} color="#0A0A0F" emissive="#00ff88" transparent wireframe />
      </mesh>
      <mesh rotation={[Math.PI, 0, 0]}>
        <octahedronGeometry args={[2.0, 0]} />
        <meshBasicMaterial ref={m2} color="#00d4ff" transparent wireframe blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

// --- 4. VinUSXtech Animated Logo Final Phase ---
function FinalLogo({ weightRef }: { weightRef: React.MutableRefObject<any> }) {
  const texture = useTexture('/logo.png');
  const groupRef = useRef<THREE.Group>(null);
  const m1 = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((state) => {
    if (!groupRef.current || !m1.current) return;
    const w = weightRef.current.logo;

    const s = w > 0 ? 0.25 + w * 0.25 : 0.001;
    groupRef.current.scale.set(s, s, s);
    groupRef.current.visible = w > 0.01;

    m1.current.opacity = w;
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <planeGeometry args={[4, 4]} />
        <meshBasicMaterial 
          ref={m1}
          map={texture} 
          transparent 
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

// --- Master Dynamic Morphing Narrative Sequence ---
function DynamicMorphSequence({ progress }: { progress: React.MutableRefObject<number> }) {
  const globalGroupRef = useRef<THREE.Group>(null);
  const wRef = useRef({ hex: 1, ai: 0, shield: 0, logo: 0 });

  useFrame((state) => {
    if (!globalGroupRef.current) return;
    const p = progress.current;
    const time = state.clock.getElapsedTime();

    // 1. Calculate morph weights seamlessly
    let wHex = 0, wAi = 0, wShield = 0, wLogo = 0;
    if (p < 0.2) {
      wHex = 1 - (p / 0.2); wAi = (p / 0.2);
    } else if (p < 0.5) {
      wAi = 1;
    } else if (p < 0.7) {
      wAi = 1 - ((p - 0.5) / 0.2); wShield = ((p - 0.5) / 0.2);
    } else if (p < 0.85) {
      wShield = 1;
    } else {
      wShield = 1 - ((p - 0.85) / 0.15); wLogo = ((p - 0.85) / 0.15);
    }
    wRef.current = { hex: wHex, ai: wAi, shield: wShield, logo: wLogo };

    // 2. Continuous downward arc positioning, but rests above center at the end
    let targetPosX = 0;
    
    // Follow a multi-curve for Y so it stays dynamically positioned:
    // Starts high (2.0)
    // Dips to center-low (-0.5) during mid sections
    // Rises gently to stop perfectly above the CTA text at the end (0.8)
    let targetPosY = 2.0;
    if (p < 0.3) {
      targetPosY = THREE.MathUtils.lerp(2.0, 0, p / 0.3);
    } else if (p < 0.7) {
      targetPosY = 0;
    } else {
      targetPosY = THREE.MathUtils.lerp(0, 1.2, (p - 0.7) / 0.3); // Moves up to sit above CTA text
    }

    // Pull object to the right during the middle sections to not block UI
    if (p >= 0.15) {
      if (p < 0.80) {
        // Keeps distance from 'Absolute Digital Defense' by staying at x=4.0
        targetPosX = THREE.MathUtils.lerp(0, 4.0, Math.min((p - 0.15) / 0.15, 1)); 
      } else {
        // Rapidly return to center exactly for the static Finale CTA
        targetPosX = THREE.MathUtils.lerp(4.0, 0, Math.min((p - 0.80) / 0.15, 1));
      }
    }

    globalGroupRef.current.position.lerp(new THREE.Vector3(targetPosX, targetPosY, 0), 0.05);
    
    // Stop the floating animation when it reaches the logo structure so it's perfectly fixed
    const floatAmount = (1 - wLogo) * 0.05;
    globalGroupRef.current.position.y += Math.sin(time) * floatAmount; 
  });
  
  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={globalGroupRef}>
        <HexagonPattern weightRef={wRef} />
        <AiNeuralCore weightRef={wRef} />
        <ShieldStructure weightRef={wRef} />
        <React.Suspense fallback={null}>
          <FinalLogo weightRef={wRef} />
        </React.Suspense>
      </group>
    </Float>
  );
}

// --- Wireframe Tunnel / Grid (Displays during Security / Project Phase) ---
function CyberGrid({ progress }: { progress: React.MutableRefObject<number> }) {
  const gridRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!gridRef.current) return;
    const p = progress.current;

    // Only bring it up after scroll phase > 0.4
    const opacityTarget = p > 0.4 ? (p < 0.9 ? 1 : 0) : 0;
    const currentY = gridRef.current.position.y;
    // Rise up from below
    gridRef.current.position.y = THREE.MathUtils.lerp(currentY, opacityTarget > 0 ? -2 : -10, 0.05);

    gridRef.current.position.z = (state.clock.elapsedTime * 2) % 2; // Moving grid effect

    // Tilt the grid based on scroll
    gridRef.current.rotation.x = THREE.MathUtils.lerp(-Math.PI / 2, -Math.PI / 2 + (p - 0.5) * 0.5, 0.1);
  });

  return (
    <group ref={gridRef} visible={true}>
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[100, 100, 50, 50]} />
        <meshBasicMaterial color="#a855f7" wireframe transparent opacity={0.15} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

// --- Camera Controller mapping Scroll to Viewport ---
function SceneController({ progress }: { progress: React.MutableRefObject<number> }) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  useFrame((state) => {
    if (!cameraRef.current) return;
    const p = progress.current;
    const currentCamera = state.camera as THREE.PerspectiveCamera;

    // Subtle mouse parallax
    const mouseX = (state.mouse.x * Math.PI) / 10;
    const mouseY = (state.mouse.y * Math.PI) / 10;

    // Base camera position changes based on scroll
    // Phase 1 (0): center
    // Phase 2 (0.25): move left (looking at objects right)
    // Phase 4 (0.75): deep dive in z
    // Phase 5 (1.0): intense focus

    let targetX = 0;
    let targetY = 0;
    let targetZ = 10;

    if (p > 0.1 && p < 0.4) {
      targetX = -2;
    } else if (p >= 0.6 && p < 0.9) {
      targetX = 2; // Security section on left, so look right
      targetZ = 6;
      targetY = 1;
    } else if (p >= 0.9) {
      targetZ = 4; // CTA zoom in
    }

    // Apply parallax
    targetX += mouseX;
    targetY += mouseY;

    currentCamera.position.x = THREE.MathUtils.lerp(currentCamera.position.x, targetX, 0.05);
    currentCamera.position.y = THREE.MathUtils.lerp(currentCamera.position.y, targetY, 0.05);
    currentCamera.position.z = THREE.MathUtils.lerp(currentCamera.position.z, targetZ, 0.05);

    currentCamera.lookAt(0, 0, 0);
  });

  return <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 10]} fov={50} />;
}


interface Props {
  scrollYProgress: MotionValue<number>;
}

export default function CinematicScene({ scrollYProgress }: Props) {
  // Sync framer-motion scroll value to a mutable ref for useFrame (avoids re-renders)
  const progress = useRef(0);

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      progress.current = v;
    });
    return () => unsub();
  }, [scrollYProgress]);

  return (
    <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
      <SceneController progress={progress} />

      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#00ff88" />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#a855f7" />

      <DynamicMorphSequence progress={progress} />

      <Environment preset="city" />

      {/* Optional fog for depth */}
      <fog attach="fog" args={['#05050A', 5, 25]} />
    </Canvas>
  );
}
