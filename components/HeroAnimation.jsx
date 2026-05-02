'use client';
import { motion } from 'framer-motion';
const hexagons = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    size: [80, 60, 100, 70, 90, 55, 75, 65][i],
    x: [10, 85, 15, 90, 5, 78, 45, 92][i],
    y: [15, 25, 75, 60, 50, 80, 10, 45][i],
    duration: [12, 15, 10, 18, 14, 11, 16, 13][i],
    delay: [0, 2, 4, 1, 3, 5, 2.5, 1.5][i],
    color: ['#00ff88', '#00d4ff', '#a855f7'][i % 3],
}));
function HexShape({ size, color }) {
    return (<svg width={size} height={size} viewBox="0 0 100 100">
      <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" fill="none" stroke={color} strokeWidth="3" opacity="0.4"/>
      <polygon points="50,20 80,35 80,65 50,80 20,65 20,35" fill={`${color}10`} stroke={color} strokeWidth="1.5" opacity="0.3"/>
    </svg>);
}
export default function HeroAnimation() {
    return (<div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      {/* Floating hexagons */}
      {hexagons.map((hex) => (<motion.div key={hex.id} className="absolute" style={{ left: `${hex.x}%`, top: `${hex.y}%` }} animate={{
                y: [0, -30, 0],
                rotate: [0, 360],
                opacity: [0.3, 0.7, 0.3],
            }} transition={{
                duration: hex.duration,
                repeat: Infinity,
                delay: hex.delay,
                ease: 'easeInOut',
            }}>
          <HexShape size={hex.size} color={hex.color}/>
        </motion.div>))}

      {/* Central pulsing ring */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[1, 2, 3].map((ring) => (<motion.div key={ring} className="absolute rounded-full border border-[#00ff88]" style={{ opacity: 0.1 / ring }} animate={{
                width: [200 * ring, 220 * ring, 200 * ring],
                height: [200 * ring, 220 * ring, 200 * ring],
                opacity: [0.08 / ring, 0.15 / ring, 0.08 / ring],
            }} transition={{
                duration: 4 + ring,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: ring * 0.5,
            }}/>))}

        {/* Center glow */}
        <motion.div className="absolute w-64 h-64 rounded-full blur-[80px]" style={{ background: 'radial-gradient(circle, #00ff8830, transparent)' }} animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}/>
      </div>

      {/* Connecting lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10">
        <motion.line x1="15%" y1="20%" x2="50%" y2="50%" stroke="#00ff88" strokeWidth="1" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 4, repeat: Infinity, delay: 0 }}/>
        <motion.line x1="85%" y1="30%" x2="50%" y2="50%" stroke="#00d4ff" strokeWidth="1" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 4, repeat: Infinity, delay: 1.5 }}/>
        <motion.line x1="20%" y1="75%" x2="50%" y2="50%" stroke="#a855f7" strokeWidth="1" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 4, repeat: Infinity, delay: 3 }}/>
        <motion.line x1="90%" y1="65%" x2="50%" y2="50%" stroke="#00ff88" strokeWidth="1" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 4, repeat: Infinity, delay: 2 }}/>
      </svg>
    </div>);
}
