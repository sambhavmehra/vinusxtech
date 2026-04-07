'use client';

import { useState, useRef, useEffect, FormEvent } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const initialFaqs = [
  "Tell me about your services",
  "What is VAPT?",
  "How do I start a project?",
  "What is SOC?"
];

import { usePathname } from 'next/navigation';

export default function Chatbot() {
  const pathname = usePathname();
  const [suggestedFaqs, setSuggestedFaqs] = useState<string[]>(initialFaqs);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-show tooltip after 2 seconds of visiting
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen && !hasGreeted) {
        setShowTooltip(true);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [isOpen, hasGreeted]);

  // Hide tooltip and trigger live greeting when opened for the first time
  useEffect(() => {
    if (isOpen) {
      setShowTooltip(false);
      if (messages.length === 0 && !hasGreeted) {
        setHasGreeted(true);
        triggerLiveGreeting();
      }
    }
  }, [isOpen, messages.length, hasGreeted]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  async function triggerLiveGreeting() {
    setIsLoading(true);
    const assistantMessage: Message = { id: crypto.randomUUID(), role: 'assistant', content: '' };
    setMessages([assistantMessage]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: 'Generate a short, enthusiastic, and welcoming greeting for a new user visiting the VinusXTech website (maximum 2 sentences). Ask how you can help them today. Do not mention that you are generating this.' }]
        }),
      });

      if (!res.ok) throw new Error('Failed to fetch');

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) throw new Error('No reader available');

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = decoder.decode(value, { stream: true });
        assistantMessage.content += text;

        let displayContent = assistantMessage.content;
        if (displayContent.includes('___FAQ:')) {
          const parts = displayContent.split('___FAQ:');
          displayContent = parts[0].trim();
          const faqsText = parts[1];
          const newFaqs = faqsText.split('|').map((f) => f.trim().replace(/^\d+\.\s*/, '')).filter((f) => f.length > 0);
          if (newFaqs.length > 0) setSuggestedFaqs(newFaqs);
        }

        setMessages([{ ...assistantMessage, content: displayContent }]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    await sendMessage(input.trim());
  }

  async function sendMessage(text: string) {
    if (!text || isLoading) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: text,
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    const assistantMessage: Message = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: '',
    };

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!res.ok) throw new Error('Failed to fetch');

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) throw new Error('No reader available');

      setMessages((prev) => [...prev, assistantMessage]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = decoder.decode(value, { stream: true });
        assistantMessage.content += text;

        let displayContent = assistantMessage.content;
        if (displayContent.includes('___FAQ:')) {
          const parts = displayContent.split('___FAQ:');
          displayContent = parts[0].trim();
          const faqsText = parts[1];
          const newFaqs = faqsText.split('|').map((f) => f.trim().replace(/^\d+\.\s*/, '')).filter((f) => f.length > 0);
          if (newFaqs.length > 0) {
            setSuggestedFaqs(newFaqs);
          }
        }

        // Trigger a state update to re-render with new content
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMessage.id
              ? { ...m, content: displayContent }
              : m
          )
        );
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        ...(prev.find((m) => m.id === assistantMessage.id)
          ? []
          : [assistantMessage]),
      ]);
      // Update the assistant message with an error note
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMessage.id
            ? { ...m, content: 'Sorry, something went wrong. Please try again.' }
            : m
        )
      );
    } finally {
      setIsLoading(false);
    }
  }

  if (pathname === '/s-admin') return null;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-[calc(100vw-3rem)] sm:w-[400px] h-[70vh] sm:h-[650px] shadow-2xl flex flex-col overflow-hidden z-50 origin-bottom-right"
            style={{
              background: 'rgba(5, 5, 10, 0.85)',
              backdropFilter: 'blur(30px)',
              borderRadius: '28px',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5), 0 0 40px rgba(0,255,136,0.1) inset'
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/5 bg-gradient-to-r from-[#00ff88]/10 via-[#00d4ff]/5 to-transparent relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#00d4ff] opacity-[0.15] blur-[50px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#00ff88] opacity-[0.15] blur-[50px] pointer-events-none" />

              <div className="flex items-center space-x-4 relative z-10">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#00ff88] rounded-full blur-[10px] opacity-40 animate-pulse" />
                  <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00ff88]/20 to-[#00d4ff]/20 border border-[#00ff88]/30 flex items-center justify-center p-2">
                    <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-[#00ff88] rounded-full border-2 border-[#05050a]" />
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-base tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">NexBot AI</h3>
                  <p className="text-xs font-semibold tracking-wider uppercase text-[#00ff88] mt-0.5">Online & Ready</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="relative z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5 custom-scrollbar relative">
              {/* No more hardcoded HTML greeting since we automatically generate and stream it */}
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] text-[13px] leading-relaxed rounded-2xl px-5 py-3.5 shadow-lg ${message.role === 'user'
                        ? 'bg-gradient-to-br from-[#00ff88] to-[#00d4ff] text-black rounded-br-[4px] font-medium'
                        : 'bg-white/[0.05] text-gray-200 rounded-bl-[4px] border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.02)]'
                      }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
                <div className="flex justify-start">
                  <div className="rounded-2xl px-5 py-4 bg-white/[0.05] border border-white/10 rounded-bl-[4px] flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-[#00ff88] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-[#00ff88] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-[#00ff88] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input Form & FAQs */}
            <div className="p-4 border-t border-white/[0.08] bg-black/60 backdrop-blur-md flex flex-col gap-3">
              {/* FAQs */}
              {messages.length > 0 && suggestedFaqs.length > 0 && (
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide pt-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  {suggestedFaqs.map((faq, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => sendMessage(faq)}
                      className="whitespace-nowrap px-4 py-2 text-[11px] font-semibold tracking-wide rounded-full border border-[#00ff88]/30 bg-[#00ff88]/10 text-[#00ff88] hover:bg-[#00ff88]/20 hover:scale-105 transition-all"
                    >
                      {faq}
                    </button>
                  ))}
                </div>
              )}

              <form onSubmit={handleSubmit} className="relative flex items-center">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="w-full bg-white/[0.03] border border-white/10 rounded-full pl-5 pr-14 py-3.5 focus:outline-none focus:border-[#00ff88]/50 focus:bg-white/[0.06] transition-all text-white text-[13px] shadow-inner font-light"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input?.trim()}
                  className="absolute right-1.5 w-10 h-10 bg-gradient-to-br from-[#00ff88] to-[#00d4ff] text-black font-bold rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform shadow-[0_0_15px_rgba(0,255,136,0.3)]"
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </form>
              <div className="text-center pb-1">
                <span className="text-[9px] font-mono tracking-widest text-gray-500 uppercase">Neural AI Engine Active</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-6 right-6 z-50 flex items-center">
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
                y: [0, -5, 0] // Gentle floating animation
              }}
              exit={{ opacity: 0, x: 10, scale: 0.9 }}
              transition={{
                y: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              className="mr-4 px-4 py-2.5 bg-white text-black text-[13px] font-bold rounded-2xl rounded-tr-none shadow-[0_0_20px_rgba(0,255,136,0.3)] whitespace-nowrap cursor-pointer relative"
              onClick={() => setIsOpen(true)}
            >
              Welcome to VinusXTech! ✨
              {/* Tooltip triangle pointer */}
              <div className="absolute right-[-6px] top-2 border-[6px] border-transparent border-l-white" />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.05, y: 0 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-16 h-16 bg-gradient-to-br from-[#00ff88] to-[#00d4ff] rounded-full flex items-center justify-center text-black shadow-[0_0_30px_rgba(0,255,136,0.4)] hover:shadow-[0_0_40px_rgba(0,255,136,0.6)] transition-all"
        >
          {/* Subtle pulse behind the button */}
          <div className="absolute inset-0 rounded-full border border-[#00ff88] animate-ping opacity-50" style={{ animationDuration: '3s' }} />
          {isOpen ? (
            <X className="w-7 h-7" />
          ) : (
            <motion.div
              animate={{
                y: [0, -8, 2, -2, 0],
                scale: [1, 1.1, 0.9, 1.05, 1],
                rotate: [0, -10, 10, -5, 0]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatDelay: 4,
                ease: "easeInOut"
              }}
            >
              <Bot className="w-7 h-7" />
            </motion.div>
          )}
        </motion.button>
      </div>
    </>
  );
}
