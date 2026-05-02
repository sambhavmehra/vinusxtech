'use client';
import { useState, useEffect, useCallback } from 'react';
import { X, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CertificateViewer({ isOpen, onClose }) {
  const [loaded, setLoaded] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);

  // Block keyboard shortcuts (Ctrl+S, Ctrl+P, PrintScreen, etc.)
  const handleKeyDown = useCallback((e) => {
    if (
      (e.ctrlKey && (e.key === 's' || e.key === 'p' || e.key === 'c' || e.key === 'u')) ||
      e.key === 'PrintScreen' ||
      e.key === 'F12'
    ) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, []);

  // Block right-click
  const handleContextMenu = useCallback((e) => {
    e.preventDefault();
  }, []);

  // Blur on window unfocus to deter Snipping Tool
  const handleWindowBlur = useCallback(() => setIsBlurred(true), []);
  const handleWindowFocus = useCallback(() => setIsBlurred(false), []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('keyup', handleKeyDown);
      document.addEventListener('contextmenu', handleContextMenu);
      window.addEventListener('blur', handleWindowBlur);
      window.addEventListener('focus', handleWindowFocus);
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) setIsBlurred(true);
        else setIsBlurred(false);
      });
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyDown);
      document.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown, handleContextMenu, handleWindowBlur, handleWindowFocus]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
          onContextMenu={(e) => e.preventDefault()}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose} />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`relative z-10 w-[95vw] max-w-4xl h-[85vh] rounded-3xl overflow-hidden border border-white/10 bg-[#0a0a12] shadow-[0_0_80px_rgba(0,0,0,0.8)] transition-all duration-75 ${isBlurred ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}
            style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0a0a12]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#00ff88]/10 border border-[#00ff88]/20 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-[#00ff88]" />
                </div>
                <div>
                  <h3 className="text-white text-sm font-bold tracking-tight">Udyam Registration Certificate</h3>
                  <p className="text-gray-400 text-[10px] font-mono uppercase tracking-widest">Protected Document • View Only</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            {/* PDF Viewer with protections */}
            <div
              className="relative w-full h-[calc(85vh-65px)] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10"
              style={{
                userSelect: 'none',
                WebkitUserSelect: 'none',
                pointerEvents: 'auto',
              }}
            >
              {/* Loading state */}
              {!loaded && (
                <div className="hidden sm:flex absolute inset-0 items-center justify-center bg-[#0a0a12] z-30">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-2 border-[#00d4ff]/30 border-t-[#00d4ff] rounded-full animate-spin" />
                    <p className="text-gray-400 text-xs font-mono">Loading document...</p>
                  </div>
                </div>
              )}

              {/* Mobile Fallback Message */}
              <div className="sm:hidden absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-40 bg-[#0a0a12]">
                <div className="w-16 h-16 rounded-full bg-[#00ff88]/10 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-8 h-8 text-[#00ff88]" />
                </div>
                <h4 className="text-white font-bold text-lg mb-2">Secure Mobile View</h4>
                <p className="text-gray-400 text-sm mb-6 max-w-xs leading-relaxed">
                  Mobile browsers restrict inline secure documents. Please open the document directly.
                </p>
                <a 
                  href="/udyam-certificate.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl font-bold text-black bg-gradient-to-r from-[#00ff88] to-[#00d4ff] hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                  Open Certificate <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>

              {/* PDF via iframe for desktop */}
              <iframe
                src="/udyam-certificate.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH"
                className="hidden sm:block w-full h-[2850px] border-0"
                style={{
                  pointerEvents: 'none',
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                }}
                onLoad={() => setLoaded(true)}
                title="Udyam Registration Certificate"
              />

              {/* Transparent overlay covers the iframe on desktop */}
              <div
                className="hidden sm:block absolute top-0 left-0 w-full h-[2850px] z-10"
                style={{
                  background: 'transparent',
                  cursor: 'default',
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  pointerEvents: 'auto',
                }}
                onContextMenu={(e) => { e.preventDefault(); e.stopPropagation(); return false; }}
                onDragStart={(e) => e.preventDefault()}
              />
            </div>
          </motion.div>

          {/* Watermark overlay for screenshot protection */}
          <div
            className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center"
            style={{
              background: 'repeating-linear-gradient(45deg, transparent, transparent 200px, rgba(255,255,255,0.01) 200px, rgba(255,255,255,0.01) 400px)',
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]">
              <p className="text-white text-[8vw] font-black tracking-widest rotate-[-30deg] whitespace-nowrap select-none">
                VINUSXTECH
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
