'use client';
import { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, Rocket, User, Mail, Phone, Building2, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
const initialFaqs = [
    "What does VinusXTech do?",
    "Tell me about AI solutions",
    "Why trust VinusXTech?",
    "How to start a project"
];

const TypewriterText = ({ content, isTyping }) => {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    if (!isTyping) {
      setDisplayed(content);
      return;
    }
    
    if (content.length > displayed.length) {
      const timeout = setTimeout(() => {
        setDisplayed(content.slice(0, displayed.length + 1));
      }, 80);
      return () => clearTimeout(timeout);
    }
  }, [content, displayed, isTyping]);

  return <>{displayed}</>;
};

import { usePathname } from 'next/navigation';
export default function Chatbot() {
    const pathname = usePathname();
    const [suggestedFaqs, setSuggestedFaqs] = useState(initialFaqs);
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [hasGreeted, setHasGreeted] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipText, setTooltipText] = useState('Welcome to VinusXTech 🚀');
    const bottomRef = useRef(null);

    // Lead capture form state
    const [showLeadForm, setShowLeadForm] = useState(false);
    const [hasSubmittedLead, setHasSubmittedLead] = useState(false);
    const [hasDismissedLead, setHasDismissedLead] = useState(false);
    const [isSubmittingLead, setIsSubmittingLead] = useState(false);
    const [leadForm, setLeadForm] = useState({ name: '', email: '', phone: '', company: '' });
    const [leadError, setLeadError] = useState('');
    const [leadSuccess, setLeadSuccess] = useState(false);

    // Count user messages and auto-trigger lead form after 7
    const userMessageCount = messages.filter((m) => m.role === 'user').length;
    useEffect(() => {
        if (userMessageCount >= 7 && !hasSubmittedLead && !hasDismissedLead && !showLeadForm && !isLoading) {
            setShowLeadForm(true);
        }
    }, [userMessageCount, hasSubmittedLead, hasDismissedLead, showLeadForm, isLoading]);

    // Lead form submission
    async function handleLeadSubmit(e) {
        e.preventDefault();
        setLeadError('');
        if (!leadForm.name.trim() || !leadForm.email.trim() || !leadForm.phone.trim()) {
            setLeadError('Please fill in Name, Email, and Phone.');
            return;
        }
        setIsSubmittingLead(true);
        try {
            const res = await fetch('/api/lead', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...leadForm,
                    chatHistory: messages.map((m) => ({ role: m.role, content: m.content })),
                }),
            });
            if (!res.ok) throw new Error('Failed');
            setHasSubmittedLead(true);
            setLeadSuccess(true);
            setTimeout(() => {
                setShowLeadForm(false);
                setLeadSuccess(false);
            }, 2000);
        } catch (err) {
            setLeadError('Something went wrong. Please try again.');
        } finally {
            setIsSubmittingLead(false);
        }
    }
    // Auto-show tooltip after 2 seconds of visiting
    useEffect(() => {
        let hideTimer;
        let showAgainTimer;
        const timer = setTimeout(() => {
            if (!isOpen && !hasGreeted) {
                setTooltipText('Welcome to VinusXTech 🚀');
                setShowTooltip(true);
                
                hideTimer = setTimeout(() => {
                    setShowTooltip(false);
                    
                    showAgainTimer = setTimeout(() => {
                        setTooltipText("Hi! I'm Nextbot ✨");
                        setShowTooltip(true);
                    }, 500);
                }, 3000);
            }
        }, 2000);
        return () => {
            clearTimeout(timer);
            if (hideTimer) clearTimeout(hideTimer);
            if (showAgainTimer) clearTimeout(showAgainTimer);
        };
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
        const assistantMessage = { id: crypto.randomUUID(), role: 'assistant', content: '' };
        setMessages([assistantMessage]);
        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [{ role: 'user', content: 'Generate a short, enthusiastic, and welcoming greeting for a new user visiting the VinusXTech website. Introduce yourself as Nextbot. (maximum 2 sentences). Ask how you can help them today. Do not mention that you are generating this.' }]
                }),
            });
            if (!res.ok)
                throw new Error('Failed to fetch');
            const reader = res.body?.getReader();
            const decoder = new TextDecoder();
            if (!reader)
                throw new Error('No reader available');
            while (true) {
                const { done, value } = await reader.read();
                if (done)
                    break;
                const text = decoder.decode(value, { stream: true });
                assistantMessage.content += text;
                let displayContent = assistantMessage.content;
                if (displayContent.includes('___FAQ:')) {
                    const parts = displayContent.split('___FAQ:');
                    displayContent = parts[0].trim();
                    const faqsText = parts[1];
                    const newFaqs = faqsText.split('|').map((f) => f.trim().replace(/^\d+\.\s*/, '')).filter((f) => f.length > 0);
                    if (newFaqs.length > 0)
                        setSuggestedFaqs(newFaqs);
                }
                setMessages([{ ...assistantMessage, content: displayContent }]);
            }
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setIsLoading(false);
        }
    }
    async function handleSubmit(e) {
        e.preventDefault();
        if (!input.trim() || isLoading)
            return;
        await sendMessage(input.trim());
    }
    async function sendMessage(text) {
        if (!text || isLoading)
            return;
        const userMessage = {
            id: crypto.randomUUID(),
            role: 'user',
            content: text,
        };
        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        setInput('');
        setIsLoading(true);
        const assistantMessage = {
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
            if (!res.ok)
                throw new Error('Failed to fetch');
            const reader = res.body?.getReader();
            const decoder = new TextDecoder();
            if (!reader)
                throw new Error('No reader available');
            setMessages((prev) => [...prev, assistantMessage]);
            while (true) {
                const { done, value } = await reader.read();
                if (done)
                    break;
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
                setMessages((prev) => prev.map((m) => m.id === assistantMessage.id
                    ? { ...m, content: displayContent }
                    : m));
            }
        }
        catch (error) {
            console.error('Chat error:', error);
            setMessages((prev) => [
                ...prev,
                ...(prev.find((m) => m.id === assistantMessage.id)
                    ? []
                    : [assistantMessage]),
            ]);
            // Update the assistant message with an error note
            setMessages((prev) => prev.map((m) => m.id === assistantMessage.id
                ? { ...m, content: 'Sorry, something went wrong. Please try again.' }
                : m));
        }
        finally {
            setIsLoading(false);
        }
    }
    if (pathname === '/s-admin')
        return null;
    return (<>
      <AnimatePresence>
        {isOpen && (<motion.div initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.9 }} className="fixed bottom-28 md:bottom-28 right-4 md:right-6 w-[calc(100vw-2rem)] sm:w-[400px] h-[75vh] sm:h-[650px] shadow-2xl flex flex-col overflow-hidden z-50 origin-bottom-right" style={{
                background: 'rgba(5, 5, 10, 0.85)',
                backdropFilter: 'blur(30px)',
                borderRadius: '28px',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5), 0 0 40px rgba(0,255,136,0.1) inset'
            }}>
            {/* Header */}
            <div className="shrink-0 flex items-center justify-between p-5 border-b border-white/5 bg-gradient-to-r from-[#00ff88]/10 via-[#00d4ff]/5 to-transparent relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#00d4ff] opacity-[0.15] blur-[50px] pointer-events-none"/>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#00ff88] opacity-[0.15] blur-[50px] pointer-events-none"/>

              <div className="flex items-center space-x-4 relative z-10">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#00ff88] rounded-full blur-[10px] opacity-40 animate-pulse"/>
                  <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00ff88]/20 to-[#00d4ff]/20 border border-[#00ff88]/30 flex items-center justify-center p-2">
                    <img src="/logo.png" alt="VinusXTech AI solutions Logo" width="48" height="48" className="w-full h-full object-contain"/>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-[#00ff88] rounded-full border-2 border-[#05050a]"/>
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-base tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">NexBot AI</h3>
                  <p className="text-xs font-semibold tracking-wider uppercase text-[#00ff88] mt-0.5">Online & Ready</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowLeadForm(true)}
                  className="relative z-10 px-3 py-1.5 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#00ff88]/20 to-[#00d4ff]/20 border border-[#00ff88]/30 text-[#00ff88] text-[10px] font-bold tracking-wider uppercase hover:from-[#00ff88]/30 hover:to-[#00d4ff]/30 transition-all"
                >
                  <Rocket className="w-3 h-3" />
                  Start Project
                </button>
                <button onClick={() => setIsOpen(false)} className="relative z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-300">
                  <X className="w-4 h-4"/>
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5 custom-scrollbar relative">
              {/* No more hardcoded HTML greeting since we automatically generate and stream it */}
              {messages.map((message, index) => (<div key={message.id} className="space-y-3">
                <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] text-[13px] leading-relaxed rounded-2xl px-5 py-3.5 shadow-lg ${message.role === 'user'
                    ? 'bg-gradient-to-br from-[#00ff88] to-[#00d4ff] text-black rounded-br-[4px] font-medium'
                    : 'bg-white/[0.05] text-gray-200 rounded-bl-[4px] border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.02)]'}`}>
                    <TypewriterText 
                      content={message.content} 
                      isTyping={isLoading && index === messages.length - 1 && message.role === 'assistant'} 
                    />
                    {isLoading && index === messages.length - 1 && message.role === 'assistant' && (
                      <span className="inline-block w-1.5 h-3.5 ml-1 align-middle bg-[#00d4ff] animate-pulse" />
                    )}
                  </div>
                </div>
                {/* FAQs shown just below the assistant's message */}
                {index === messages.length - 1 && message.role === 'assistant' && suggestedFaqs.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1 pl-1">
                    {suggestedFaqs.map((faq, idx) => (
                      <button key={idx} type="button" onClick={() => sendMessage(faq)} className="whitespace-nowrap px-4 py-2 text-[11px] font-semibold tracking-wide rounded-full border border-[#00ff88]/30 bg-[#00ff88]/10 text-[#00ff88] hover:bg-[#00ff88]/20 hover:scale-105 transition-all">
                        {faq}
                      </button>
                    ))}
                  </div>
                )}
              </div>))}
              {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (<div className="flex justify-start">
                  <div className="rounded-2xl px-5 py-4 bg-white/[0.05] border border-white/10 rounded-bl-[4px] flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 bg-[#00ff88] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}/>
                    <span className="w-1.5 h-1.5 bg-[#00ff88] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}/>
                    <span className="w-1.5 h-1.5 bg-[#00ff88] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}/>
                  </div>
                </div>)}
              <div ref={bottomRef}/>
            </div>

            {/* Lead Capture Form Overlay */}
            <AnimatePresence>
              {showLeadForm && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute inset-0 z-40 bg-[#050508]/95 backdrop-blur-xl flex flex-col items-center justify-center p-6"
                >
                  {leadSuccess ? (
                    <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#00ff88]/20 flex items-center justify-center">
                        <Rocket className="w-8 h-8 text-[#00ff88]" />
                      </div>
                      <h3 className="text-lg font-bold text-white">Thank you!</h3>
                      <p className="text-gray-400 text-sm mt-2">We'll reach out to you shortly.</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleLeadSubmit} className="w-full max-w-sm space-y-4">
                      <div className="text-center mb-4">
                        <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-[#00ff88]/20 to-[#00d4ff]/20 flex items-center justify-center border border-[#00ff88]/20">
                          <Rocket className="w-6 h-6 text-[#00ff88]" />
                        </div>
                        <h3 className="text-lg font-bold text-white">{userMessageCount >= 7 ? 'Continue Chatting' : 'Start Your Project'}</h3>
                        <p className="text-gray-500 text-xs mt-1">{userMessageCount >= 7 ? 'Please share your details to continue' : 'Share your details and we\'ll get back to you'}</p>
                      </div>

                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input type="text" placeholder="Full Name *" value={leadForm.name} onChange={(e) => setLeadForm((p) => ({ ...p, name: e.target.value }))} className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white text-[13px] placeholder:text-gray-600 focus:outline-none focus:border-[#00ff88]/50 transition-all" />
                      </div>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input type="email" placeholder="Email Address *" value={leadForm.email} onChange={(e) => setLeadForm((p) => ({ ...p, email: e.target.value }))} className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white text-[13px] placeholder:text-gray-600 focus:outline-none focus:border-[#00ff88]/50 transition-all" />
                      </div>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input type="tel" placeholder="Phone Number *" value={leadForm.phone} onChange={(e) => setLeadForm((p) => ({ ...p, phone: e.target.value }))} className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white text-[13px] placeholder:text-gray-600 focus:outline-none focus:border-[#00ff88]/50 transition-all" />
                      </div>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input type="text" placeholder="Company (Optional)" value={leadForm.company} onChange={(e) => setLeadForm((p) => ({ ...p, company: e.target.value }))} className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white text-[13px] placeholder:text-gray-600 focus:outline-none focus:border-[#00ff88]/50 transition-all" />
                      </div>

                      {leadError && <p className="text-red-400 text-xs text-center">{leadError}</p>}

                      <button type="submit" disabled={isSubmittingLead} className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00ff88] to-[#00d4ff] text-black font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50">
                        {isSubmittingLead ? <Loader2 className="w-4 h-4 animate-spin" /> : <Rocket className="w-4 h-4" />}
                        {isSubmittingLead ? 'Sending...' : 'Submit Details'}
                      </button>

                      <button 
                        type="button" 
                        onClick={() => {
                          setShowLeadForm(false);
                          setHasDismissedLead(true);
                        }} 
                        className="w-full text-center text-gray-500 text-xs hover:text-gray-300 transition-colors"
                      >
                        {userMessageCount >= 7 ? 'Cancel and continue chatting' : 'Maybe later'}
                      </button>
                    </form>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input Form */}
            <div className="shrink-0 p-4 border-t border-white/[0.08] bg-black/60 backdrop-blur-md flex flex-col gap-3">

              <form onSubmit={handleSubmit} className="relative flex items-center">
                <input value={input} onChange={(e) => setInput(e.target.value)} placeholder={showLeadForm ? 'Submit your details to continue...' : 'Type a message...'} disabled={showLeadForm} className="w-full bg-white/[0.03] border border-white/10 rounded-full pl-5 pr-14 py-3.5 focus:outline-none focus:border-[#00ff88]/50 focus:bg-white/[0.06] transition-all text-white text-[13px] shadow-inner font-light disabled:opacity-30 disabled:cursor-not-allowed"/>
                <button type="submit" disabled={isLoading || !input?.trim() || showLeadForm} className="absolute right-1.5 w-10 h-10 bg-gradient-to-br from-[#00ff88] to-[#00d4ff] text-black font-bold rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform shadow-[0_0_15px_rgba(0,255,136,0.3)]">
                  <Send className="w-4 h-4 ml-0.5"/>
                </button>
              </form>
              <div className="text-center pb-1">
                <span className="text-[9px] font-mono tracking-widest text-gray-500 uppercase">Vinusxtech</span>
              </div>
            </div>
          </motion.div>)}
      </AnimatePresence>

      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center">
          <AnimatePresence>
            {showTooltip && (<motion.div initial={{ opacity: 0, x: 20, scale: 0.9 }} animate={{
                  opacity: 1,
                  x: 0,
                  scale: 1,
                  y: [0, -5, 0] // Gentle floating animation
              }} exit={{ opacity: 0, x: 10, scale: 0.9 }} transition={{
                  y: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                  }
              }} className="mr-4 px-4 py-2.5 bg-white text-black text-[13px] font-bold rounded-2xl rounded-tr-none shadow-[0_0_20px_rgba(0,255,136,0.3)] whitespace-nowrap cursor-pointer relative" onClick={() => setIsOpen(true)}>
                {tooltipText}
                {/* Tooltip triangle pointer */}
                <div className="absolute right-[-6px] top-2 border-[6px] border-transparent border-l-white"/>
              </motion.div>)}
          </AnimatePresence>

          <motion.button onClick={() => setIsOpen(!isOpen)} animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} whileHover={{ scale: 1.05, y: 0 }} whileTap={{ scale: 0.95 }} className="relative w-16 h-16 bg-gradient-to-br from-[#00ff88] to-[#00d4ff] rounded-full flex items-center justify-center text-black shadow-[0_0_30px_rgba(0,255,136,0.4)] hover:shadow-[0_0_40px_rgba(0,255,136,0.6)] transition-all">
            {/* Subtle pulse behind the button */}
            <div className="absolute inset-0 rounded-full border border-[#00ff88] animate-ping opacity-50" style={{ animationDuration: '3s' }}/>
            <motion.div animate={{
                  y: [0, -8, 2, -2, 0],
                  scale: [1, 1.1, 0.9, 1.05, 1],
                  rotate: [0, -10, 10, -5, 0]
              }} transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatDelay: 4,
                  ease: "easeInOut"
              }}>
                <Bot className="w-7 h-7"/>
              </motion.div>
          </motion.button>
        </div>
      )}
    </>);
}
