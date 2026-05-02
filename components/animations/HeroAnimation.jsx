'use client';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef, useState, useCallback } from 'react';
const COLORS = {
    emerald: '#00ff88',
    cyan: '#00d4ff',
    violet: '#a855f7',
    rose: '#ff4d8f',
    amber: '#ffb347',
};
const COLOR_ARRAY = Object.values(COLORS);
export default function HeroAnimation() {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const animFrameRef = useRef(0);
    const [particles, setParticles] = useState([]);
    const [stars, setStars] = useState([]);
    // Mouse tracking with spring physics
    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);
    const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });
    // Parallax orb transforms
    const orb1X = useTransform(springX, [0, 1], [-60, 60]);
    const orb1Y = useTransform(springY, [0, 1], [-40, 40]);
    const orb2X = useTransform(springX, [0, 1], [40, -40]);
    const orb2Y = useTransform(springY, [0, 1], [30, -30]);
    const orb3X = useTransform(springX, [0, 1], [-30, 30]);
    const orb3Y = useTransform(springY, [0, 1], [-50, 50]);
    const handleMouseMove = useCallback((e) => {
        if (!containerRef.current)
            return;
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width);
        mouseY.set((e.clientY - rect.top) / rect.height);
    }, [mouseX, mouseY]);
    // Canvas constellation network
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas)
            return;
        const ctx = canvas.getContext('2d');
        if (!ctx)
            return;
        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resize();
        window.addEventListener('resize', resize);
        const nodes = Array.from({ length: 28 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            color: COLOR_ARRAY[Math.floor(Math.random() * COLOR_ARRAY.length)],
        }));
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // Update & bounce nodes
            nodes.forEach((n) => {
                n.x += n.vx;
                n.y += n.vy;
                if (n.x < 0 || n.x > canvas.width)
                    n.vx *= -1;
                if (n.y < 0 || n.y > canvas.height)
                    n.vy *= -1;
            });
            // Draw edges
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 180) {
                        const alpha = (1 - dist / 180) * 0.18;
                        const grad = ctx.createLinearGradient(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
                        grad.addColorStop(0, nodes[i].color + Math.round(alpha * 255).toString(16).padStart(2, '0'));
                        grad.addColorStop(1, nodes[j].color + Math.round(alpha * 255).toString(16).padStart(2, '0'));
                        ctx.beginPath();
                        ctx.strokeStyle = grad;
                        ctx.lineWidth = 0.8;
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.stroke();
                    }
                }
            }
            // Draw nodes
            nodes.forEach((n) => {
                const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 4);
                grd.addColorStop(0, n.color + 'cc');
                grd.addColorStop(1, n.color + '00');
                ctx.beginPath();
                ctx.fillStyle = grd;
                ctx.arc(n.x, n.y, 4, 0, Math.PI * 2);
                ctx.fill();
            });
            animFrameRef.current = requestAnimationFrame(draw);
        };
        draw();
        return () => {
            cancelAnimationFrame(animFrameRef.current);
            window.removeEventListener('resize', resize);
        };
    }, []);
    useEffect(() => {
        const generated = Array.from({ length: 50 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 3.5 + 1,
            color: COLOR_ARRAY[Math.floor(Math.random() * COLOR_ARRAY.length)],
            duration: Math.random() * 12 + 10,
            delay: Math.random() * 8,
            orbitRadius: Math.random() * 40 + 10,
            orbitSpeed: Math.random() * 8 + 6,
            orbitOffset: Math.random() * 360,
        }));
        setParticles(generated);
        const generatedStars = Array.from({ length: 80 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 1.5 + 0.5,
            opacity: Math.random() * 0.4 + 0.1,
        }));
        setStars(generatedStars);
    }, []);
    useEffect(() => {
        const el = containerRef.current;
        if (!el)
            return;
        el.addEventListener('mousemove', handleMouseMove);
        return () => el.removeEventListener('mousemove', handleMouseMove);
    }, [handleMouseMove]);
    return (<div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none" style={{ background: 'transparent' }}>
      {/* Static star field */}
      {stars.map((s) => (<div key={s.id} className="absolute rounded-full" style={{
                left: `${s.x}%`,
                top: `${s.y}%`,
                width: `${s.size}px`,
                height: `${s.size}px`,
                background: '#ffffff',
                opacity: s.opacity,
            }}/>))}

      {/* Constellation canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-70"/>

      {/* Aurora wave layers */}
      {[
            { color: '#00ff88', top: '20%', dur: 14, delay: 0, blur: 80 },
            { color: '#a855f7', top: '55%', dur: 18, delay: -5, blur: 100 },
            { color: '#00d4ff', top: '75%', dur: 12, delay: -3, blur: 70 },
        ].map((wave, i) => (<motion.div key={i} className="absolute w-full" style={{
                top: wave.top,
                height: '180px',
                background: `radial-gradient(ellipse 80% 50% at 50% 50%, ${wave.color}18, transparent)`,
                filter: `blur(${wave.blur}px)`,
                originX: '50%',
            }} animate={{
                scaleX: [1, 1.3, 0.85, 1],
                scaleY: [1, 0.7, 1.2, 1],
                x: ['-5%', '5%', '-3%', '0%'],
                opacity: [0.4, 0.8, 0.5, 0.4],
            }} transition={{
                duration: wave.dur,
                delay: wave.delay,
                repeat: Infinity,
                ease: 'easeInOut',
            }}/>))}

      {/* Mouse-parallax deep orbs */}
      <motion.div className="absolute rounded-full" style={{
            width: '700px',
            height: '700px',
            top: '50%',
            left: '50%',
            marginLeft: '-350px',
            marginTop: '-350px',
            background: 'radial-gradient(circle, #00ff8818 0%, transparent 65%)',
            filter: 'blur(60px)',
            x: orb1X,
            y: orb1Y,
        }} animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}/>
      <motion.div className="absolute rounded-full" style={{
            width: '500px',
            height: '500px',
            top: '25%',
            left: '15%',
            background: 'radial-gradient(circle, #a855f722 0%, transparent 65%)',
            filter: 'blur(80px)',
            x: orb2X,
            y: orb2Y,
        }} animate={{ scale: [1.1, 1, 1.1], opacity: [0.5, 0.9, 0.5] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}/>
      <motion.div className="absolute rounded-full" style={{
            width: '450px',
            height: '450px',
            top: '40%',
            right: '8%',
            background: 'radial-gradient(circle, #00d4ff1a 0%, transparent 65%)',
            filter: 'blur(70px)',
            x: orb3X,
            y: orb3Y,
        }} animate={{ scale: [1, 1.35, 1], opacity: [0.4, 0.75, 0.4] }} transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}/>

      {/* Subtle grid */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#00ff88" strokeWidth="0.4"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)"/>
      </svg>

      {/* Layered concentric rings with travelling dots */}
      {[
            { r: 210, speed: 25, color: '#00ff88', dotColor: '#00ff88', dotSize: 6, reverse: false },
            { r: 310, speed: 38, color: '#a855f7', dotColor: '#a855f7', dotSize: 8, reverse: true },
            { r: 420, speed: 55, color: '#00d4ff', dotColor: '#00d4ff', dotSize: 7, reverse: false },
            { r: 530, speed: 70, color: '#ff4d8f', dotColor: '#ff4d8f', dotSize: 5, reverse: true },
        ].map((ring, i) => (<motion.div key={i} className="absolute" style={{
                top: '50%',
                left: '50%',
                width: `${ring.r * 2}px`,
                height: `${ring.r * 2}px`,
                marginLeft: `-${ring.r}px`,
                marginTop: `-${ring.r}px`,
            }} animate={{ rotate: ring.reverse ? -360 : 360 }} transition={{ duration: ring.speed, repeat: Infinity, ease: 'linear' }}>
          {/* Ring border */}
          <div style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                border: `1px solid ${ring.color}18`,
            }}/>
          {/* Travelling dot */}
          <motion.div style={{
                position: 'absolute',
                top: '-4px',
                left: '50%',
                marginLeft: `-${ring.dotSize / 2}px`,
                width: `${ring.dotSize}px`,
                height: `${ring.dotSize}px`,
                borderRadius: '50%',
                background: ring.dotColor,
                boxShadow: `0 0 ${ring.dotSize * 3}px ${ring.dotColor}, 0 0 ${ring.dotSize * 6}px ${ring.dotColor}44`,
            }} animate={{ opacity: [0.6, 1, 0.6], scale: [0.9, 1.2, 0.9] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}/>
          {/* Second dot opposite side */}
          {i % 2 === 0 && (<motion.div style={{
                    position: 'absolute',
                    bottom: '-4px',
                    left: '50%',
                    marginLeft: `-${ring.dotSize / 2}px`,
                    width: `${ring.dotSize}px`,
                    height: `${ring.dotSize}px`,
                    borderRadius: '50%',
                    background: ring.dotColor,
                    boxShadow: `0 0 ${ring.dotSize * 2}px ${ring.dotColor}`,
                    opacity: 0.4,
                }}/>)}
        </motion.div>))}

      {/* Central pulsing core — layered */}
      <div className="absolute" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        {/* Outer pulse ring */}
        <motion.div style={{
            position: 'absolute',
            inset: '-60px',
            borderRadius: '50%',
            border: '1px solid #00ff8830',
        }} animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeOut' }}/>
        <motion.div style={{
            position: 'absolute',
            inset: '-60px',
            borderRadius: '50%',
            border: '1px solid #00ff8830',
        }} animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeOut', delay: 2 }}/>
        {/* Core glow */}
        <motion.div style={{
            width: '90px',
            height: '90px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, #00ff88 0%, #00ff8830 60%, transparent 100%)',
            boxShadow: '0 0 80px #00ff8888, 0 0 160px #00ff8844',
        }} animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}/>
        {/* Inner bright dot */}
        <motion.div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            background: '#ffffff',
            boxShadow: '0 0 20px #00ff88',
        }} animate={{ scale: [1, 1.5, 1], opacity: [0.8, 1, 0.8] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}/>
      </div>

      {/* Floating ambient particles */}
      {particles.map((p) => (<motion.div key={p.id} className="absolute rounded-full" style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                background: p.color,
                boxShadow: `0 0 ${p.size * 4}px ${p.color}, 0 0 ${p.size * 8}px ${p.color}44`,
            }} animate={{
                y: [0, -40, 0],
                x: [0, p.orbitRadius * 0.3, 0],
                opacity: [0, 0.9, 0],
                scale: [0.5, 1, 0.5],
            }} transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: 'easeInOut',
            }}/>))}

      {/* Scanline vignette overlay */}
      <div className="absolute inset-0" style={{
            background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)',
            pointerEvents: 'none',
        }}/>
    </div>);
}
