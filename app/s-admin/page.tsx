"use client";

import { useState, useEffect } from 'react';
import { Shield, Lock, Send, KeyRound, LogOut, Check, X, Trash2, Star, Clock, Mail, MessageSquare, LayoutDashboard, Terminal, Activity, Menu, Settings, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminPage() {
  const [status, setStatus] = useState<'loading' | 'unauth' | 'otp' | 'auth'>('loading');
  const [username, setUsername] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [reviews, setReviews] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'reviews' | 'messages' | 'bot'>('dashboard');
  const [systemPrompt, setSystemPrompt] = useState('');
  const [savingPrompt, setSavingPrompt] = useState(false);
  const [fetchingData, setFetchingData] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/admin/me');
      if (res.ok) {
        setStatus('auth');
        loadAllData();
      } else {
        setStatus('unauth');
      }
    } catch {
      setStatus('unauth');
    }
  };

  const loadAllData = async () => {
    setFetchingData(true);
    try {
      const [revRes, msgRes, promptRes] = await Promise.all([
        fetch('/api/admin/reviews'),
        fetch('/api/admin/messages'),
        fetch('/api/admin/prompt')
      ]);
      
      if (revRes.ok) {
        setReviews(await revRes.json());
      }
      if (msgRes.ok) {
        setMessages(await msgRes.json());
      }
      if (promptRes.ok) {
        const data = await promptRes.json();
        setSystemPrompt(data.systemPrompt || '');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setFetchingData(false);
    }
  };

  const requestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username !== 'sambhav') {
      setError('Unauthorized access detected. Security incident logged.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('otp');
      } else {
        setError(data.error || 'Failed to send communication');
      }
    } catch {
      setError('Network connection unsecured');
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, otp })
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('auth');
        loadAllData();
      } else {
        setError(data.error || 'Invalid cryptographic sequence');
      }
    } catch {
      setError('Network connection unsecured');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    setStatus('unauth');
    setUsername('');
    setOtp('');
    setReviews([]);
    setMessages([]);
  };

  const handleReviewAction = async (id: string, action: 'approve' | 'delete' | 'unapprove') => {
    if (action === 'delete' && !window.confirm('Purge this record?')) return;

    try {
      const res = await fetch('/api/admin/reviews/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action })
      });
      if (res.ok) {
        loadAllData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const saveSystemPrompt = async () => {
    setSavingPrompt(true);
    try {
      await fetch('/api/admin/prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ systemPrompt })
      });
    } catch (err) {
      console.error(err);
    } finally {
      setSavingPrompt(false);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!window.confirm('Purge this message permanently?')) return;

    try {
      const res = await fetch('/api/admin/messages/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action: 'delete' })
      });
      if (res.ok) {
        loadAllData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#050508] flex items-center justify-center font-mono">
        <div className="flex flex-col items-center">
          <Shield className="w-12 h-12 text-[#00ff88] animate-pulse mb-6" />
          <div className="text-[#00ff88] tracking-[0.2em] uppercase text-sm border-r-2 border-[#00ff88] pr-1 animate-[pulse_1s_infinite]">Initializing Secure Connection...</div>
        </div>
      </div>
    );
  }

  if (status === 'unauth' || status === 'otp') {
    return (
      <div className="min-h-screen bg-[#050508] flex items-center justify-center p-4 relative overflow-hidden font-mono text-[#00ff88]">
        {/* Terminal background effect */}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 pointer-events-none mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#00ff88]/5 to-transparent opacity-30 pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#00ff88]/10 blur-[150px] rounded-full pointer-events-none"></div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-lg bg-black/80 border border-[#00ff88]/20 p-8 rounded-xl backdrop-blur-md shrink-0 z-10 shadow-[0_0_50px_rgba(0,255,136,0.1)] relative overflow-hidden"
        >
          {/* Decorative scanline */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-[#00ff88]/50 blur-[2px] opacity-50 animate-[scanline_3s_linear_infinite]" />

          <div className="flex flex-col items-center mb-10">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-[#00ff88] blur-xl opacity-20 rounded-full animate-pulse" />
              <div className="w-20 h-20 bg-black border-2 border-[#00ff88]/50 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,255,136,0.2)]">
                {status === 'unauth' ? <Terminal className="w-10 h-10 text-[#00ff88]" /> : <Lock className="w-10 h-10 text-[#00ff88]" />}
              </div>
            </div>
            <h1 className="text-2xl font-bold tracking-widest uppercase text-white">Console<span className="text-[#00ff88]">Access</span></h1>
            <p className="text-[#00ff88]/60 text-center text-xs mt-2 uppercase tracking-[0.2em] font-bold">
              {status === 'unauth' ? 'Level 5 Clearance Required' : 'Awaiting Cryptographic Sequence'}
            </p>
          </div>

          {error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 p-4 bg-red-500/10 border border-red-500/50 text-red-500 rounded text-sm text-center uppercase tracking-wider font-bold">
              [SYSTEM WARNING] {error}
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {status === 'unauth' ? (
              <motion.form key="login" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} onSubmit={requestOtp}>
                <div className="mb-6">
                  <label className="block text-xs font-bold tracking-[0.2em] text-[#00ff88]/70 mb-3 uppercase">Enter Root Identity</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#00ff88]/50 font-bold">{'>'}</span>
                    <input
                      type="text"
                      className="w-full bg-black/50 border border-[#00ff88]/30 rounded px-10 py-4 text-[#00ff88] placeholder-[#00ff88]/20 outline-none focus:border-[#00ff88] focus:bg-black transition-all font-mono"
                      placeholder="identity..."
                      value={username}
                      onChange={(e) => setUsername(e.target.value.toLowerCase())}
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading || !username}
                  className="w-full bg-[#00ff88]/10 border border-[#00ff88]/50 hover:bg-[#00ff88] hover:text-black hover:shadow-[0_0_30px_rgba(0,255,136,0.4)] text-[#00ff88] font-bold tracking-widest uppercase py-4 rounded flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {loading ? 'Transmitting...' : <span className="flex items-center gap-2">Initiate Handshake <Shield className="w-5 h-5 group-hover:scale-110 transition-transform" /></span>}
                </button>
              </motion.form>
            ) : (
              <motion.form key="otp" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} onSubmit={verifyOtp}>
                <div className="mb-8">
                  <label className="block text-xs font-bold tracking-[0.2em] text-[#00ff88]/70 mb-3 uppercase text-center">Auth Token Sent to Root Secure Comm</label>
                  <div className="relative flex justify-center">
                    <input
                      type="text"
                      className="w-[80%] bg-black/50 border border-[#00ff88]/30 rounded px-4 py-4 text-[#00ff88] placeholder-[#00ff88]/20 outline-none focus:border-[#00ff88] focus:ring-1 focus:ring-[#00ff88] transition-all text-center tracking-[0.75em] font-mono text-2xl uppercase"
                      placeholder="XXXXXX"
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading || otp.length < 6}
                  className="w-full bg-[#00ff88]/10 border border-[#00ff88]/50 hover:bg-[#00ff88] hover:text-black hover:shadow-[0_0_30px_rgba(0,255,136,0.4)] text-[#00ff88] font-bold tracking-widest uppercase py-4 rounded flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {loading ? 'Decrypting...' : <span className="flex items-center gap-2">Establish Uplink <KeyRound className="w-5 h-5 group-hover:scale-110 transition-transform" /></span>}
                </button>
                <button
                  type="button"
                  onClick={() => setStatus('unauth')}
                  className="w-full mt-6 text-[#00ff88]/40 hover:text-[#00ff88] text-xs font-bold tracking-widest uppercase transition-colors"
                >
                  [ Abort Process ]
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    );
  }

  // Dashboard View
  const pendingReviews = reviews.filter(r => !r.approved);
  const approvedReviews = reviews.filter(r => r.approved);

  return (
    <div className="min-h-screen bg-[#050508] text-white flex flex-col md:flex-row selection:bg-[#00ff88]/30 selection:text-white">
      {/* Mobile Header overlay */}
      <div className="md:hidden sticky top-0 bg-black/80 backdrop-blur-xl border-b border-white/[0.05] z-50 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-[#00ff88]" />
          <span className="font-bold tracking-widest">VINUSXTECH</span>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 bg-white/[0.05] rounded-xl flex items-center justify-center">
          {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <AnimatePresence>
        <motion.aside
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className={`
            fixed md:sticky top-0 left-0 h-screen w-full md:w-64 bg-[#0a0a0f] border-r border-white/[0.05] flex flex-col z-40 transition-transform duration-300 shadow-[0_0_50px_rgba(0,0,0,0.5)] md:translate-x-0
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          `}
        >
          <div className="p-6 md:p-8 flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-[#00ff88]/20 to-[#00d4ff]/20 border border-[#00ff88]/30 rounded-xl">
              <Shield className="w-6 h-6 text-[#00ff88]" />
            </div>
            <div>
              <h1 className="font-bold text-lg tracking-wide uppercase">Admin</h1>
              <p className="text-[10px] text-[#00ff88] uppercase tracking-widest font-mono">Secure Node</p>
            </div>
          </div>

          <div className="flex-1 px-4 py-2 space-y-2 overflow-y-auto">
            <button
              onClick={() => { setActiveTab('dashboard'); setIsSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === 'dashboard' 
                  ? 'bg-gradient-to-r from-[#00ff88]/10 to-transparent text-[#00ff88] border-l-2 border-[#00ff88] font-bold' 
                  : 'text-gray-400 hover:bg-white/[0.02] hover:text-white border-l-2 border-transparent font-medium'
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Overview</span>
            </button>
            <button
              onClick={() => { setActiveTab('reviews'); setIsSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                activeTab === 'reviews' 
                  ? 'bg-gradient-to-r from-purple-500/10 to-transparent text-purple-400 border-l-2 border-purple-500 font-bold' 
                  : 'text-gray-400 hover:bg-white/[0.02] hover:text-white border-l-2 border-transparent font-medium'
              }`}
            >
              <div className="flex items-center gap-3">
                <Star className="w-5 h-5" />
                <span>Reviews</span>
              </div>
              {pendingReviews.length > 0 && (
                <span className="bg-purple-500/20 text-purple-400 text-[10px] px-2 py-0.5 rounded-full font-bold">{pendingReviews.length}</span>
              )}
            </button>
            <button
              onClick={() => { setActiveTab('messages'); setIsSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                activeTab === 'messages' 
                  ? 'bg-gradient-to-r from-[#00d4ff]/10 to-transparent text-[#00d4ff] border-l-2 border-[#00d4ff] font-bold' 
                  : 'text-gray-400 hover:bg-white/[0.02] hover:text-white border-l-2 border-transparent font-medium'
              }`}
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5" />
                <span>Messages</span>
              </div>
              {messages.length > 0 && (
                <span className="bg-[#00d4ff]/20 text-[#00d4ff] text-[10px] px-2 py-0.5 rounded-full font-bold">{messages.length}</span>
              )}
            </button>
            <button
              onClick={() => { setActiveTab('bot'); setIsSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                activeTab === 'bot' 
                  ? 'bg-gradient-to-r from-orange-500/10 to-transparent text-orange-400 border-l-2 border-orange-500 font-bold' 
                  : 'text-gray-400 hover:bg-white/[0.02] hover:text-white border-l-2 border-transparent font-medium'
              }`}
            >
              <div className="flex items-center gap-3">
                <Bot className="w-5 h-5" />
                <span>Chatbot Config</span>
              </div>
            </button>
          </div>

          <div className="p-6 border-t border-white/[0.05]">
            <div className="flex items-center gap-3 mb-6 bg-white/[0.02] p-3 rounded-xl border border-white/[0.05]">
              <div className="w-10 h-10 rounded-full bg-[#00ff88]/10 flex items-center justify-center border border-[#00ff88]/30">
                <Terminal className="w-5 h-5 text-[#00ff88]" />
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-medium text-white truncate">Sambhav Mehra</p>
                <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">Root Admin</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-all font-bold text-sm tracking-wide"
            >
              <LogOut className="w-4 h-4" /> Terminate Session
            </button>
          </div>
        </motion.aside>
      </AnimatePresence>

      <main className="flex-1 max-h-screen overflow-y-auto bg-gradient-to-br from-[#0a0a0f] to-[#050508] relative">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00ff88]/5 blur-[150px] pointer-events-none rounded-full" />
        
        <div className="p-6 md:p-12 relative z-10 max-w-7xl mx-auto">
          {fetchingData && !isSidebarOpen ? (
            <div className="flex flex-col items-center justify-center h-[60vh]">
              <Activity className="w-10 h-10 text-[#00ff88] animate-pulse mb-4" />
              <p className="text-gray-500 font-mono text-sm tracking-widest uppercase">Synchronizing Data...</p>
            </div>
          ) : (
            <>
              {/* Dashboard Content */}
              {activeTab === 'dashboard' && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                  <div className="flex items-end justify-between flex-wrap gap-4">
                    <div>
                      <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-2">Systems <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff88] to-[#00d4ff]">Overview</span></h2>
                      <p className="text-gray-400 border-l-2 border-[#00ff88]/50 pl-3">Real-time metrics and administration controls.</p>
                    </div>
                    <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-2 flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
                       <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">Network Secure</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <motion.div whileHover={{ y: -5 }} className="bg-gradient-to-br from-white/[0.05] to-transparent p-[1px] rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                      <div className="bg-[#0a0a0f] p-8 rounded-2xl h-full border border-white/[0.02] relative group">
                        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                          <MessageSquare className="w-20 h-20 text-[#00d4ff]" />
                        </div>
                        <h3 className="text-gray-500 text-xs font-mono uppercase tracking-[0.2em] mb-2 font-bold">Total Inquiries</h3>
                        <p className="text-5xl font-extrabold text-white mb-4">{messages.length}</p>
                        <button onClick={() => setActiveTab('messages')} className="flex items-center gap-2 text-[#00d4ff] text-sm font-bold uppercase tracking-wide group-hover:gap-3 transition-all">
                          View Inbox <ArrowRightIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>

                    <motion.div whileHover={{ y: -5 }} className="bg-gradient-to-br from-white/[0.05] to-transparent p-[1px] rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                      <div className="bg-[#0a0a0f] p-8 rounded-2xl h-full border border-white/[0.02] relative group">
                        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                          <Clock className="w-20 h-20 text-purple-500" />
                        </div>
                        <h3 className="text-gray-500 text-xs font-mono uppercase tracking-[0.2em] mb-2 font-bold">Pending Reviews</h3>
                        <p className="text-5xl font-extrabold text-white mb-4">{pendingReviews.length}</p>
                        <button onClick={() => setActiveTab('reviews')} className="flex items-center gap-2 text-purple-400 text-sm font-bold uppercase tracking-wide group-hover:gap-3 transition-all">
                          Manage Now <ArrowRightIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>

                    <motion.div whileHover={{ y: -5 }} className="bg-gradient-to-br from-white/[0.05] to-transparent p-[1px] rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                      <div className="bg-[#0a0a0f] p-8 rounded-2xl h-full border border-white/[0.02] relative group">
                        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                          <Check className="w-20 h-20 text-[#00ff88]" />
                        </div>
                        <h3 className="text-gray-500 text-xs font-mono uppercase tracking-[0.2em] mb-2 font-bold">Published Reviews</h3>
                        <p className="text-5xl font-extrabold text-[#00ff88] mb-4">{approvedReviews.length}</p>
                        <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
                          Active on Live Site
                        </div>
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Quick Activity Section */}
                  <div className="mt-8">
                     <h3 className="text-lg font-bold items-center flex gap-2 mb-4 text-gray-300">
                        <Activity className="w-5 h-5 text-gray-500"/> Recent Activity Log
                     </h3>
                     <div className="bg-[#0a0a0f] border border-white/[0.05] rounded-2xl p-6 shadow-xl">
                        {messages.length === 0 && reviews.length === 0 ? (
                           <p className="text-gray-500 italic">No recent activity detected.</p>
                        ) : (
                           <div className="space-y-4">
                              {messages.slice(0,3).map(m => (
                                 <div key={m.id} className="flex items-center gap-4 border-b border-white/[0.05] pb-4 last:border-0 last:pb-0">
                                    <div className="p-2 bg-[#00d4ff]/10 text-[#00d4ff] rounded-lg shrink-0">
                                      <Mail className="w-4 h-4" />
                                    </div>
                                    <div>
                                       <p className="text-sm font-medium"><span className="text-white">{m.name}</span> sent a new inquiry.</p>
                                       <p className="text-xs text-gray-500 mt-0.5">{new Date(m.timestamp).toLocaleString()}</p>
                                    </div>
                                 </div>
                              ))}
                              {pendingReviews.slice(0,2).map(r => (
                                 <div key={r.id} className="flex items-center gap-4 border-b border-white/[0.05] pb-4 last:border-0 last:pb-0">
                                    <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg shrink-0">
                                      <Star className="w-4 h-4" />
                                    </div>
                                    <div>
                                       <p className="text-sm font-medium"><span className="text-white">{r.name}</span> submitted a review awaiting approval.</p>
                                    </div>
                                 </div>
                              ))}
                           </div>
                        )}
                     </div>
                  </div>

                </motion.div>
              )}

              {/* Reviews Content */}
              {activeTab === 'reviews' && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                  <div className="flex items-end justify-between flex-wrap gap-4">
                    <div>
                      <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-2">Review <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Moderation</span></h2>
                      <p className="text-gray-400 border-l-2 border-purple-500/50 pl-3">Approve or reject client testimonials before they go live.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h3 className="text-sm font-bold flex items-center gap-2 text-white bg-purple-500/20 px-4 py-2 rounded-xl w-fit">
                        <Clock className="w-4 h-4 text-purple-400" /> Pending Approval ({pendingReviews.length})
                      </h3>
                      {pendingReviews.length === 0 ? (
                        <div className="bg-[#0a0a0f] border border-white/[0.05] border-dashed rounded-2xl p-10 flex flex-col items-center justify-center text-gray-500">
                          <Check className="w-10 h-10 text-gray-600 mb-2 opacity-50" />
                          <p>All caught up!</p>
                        </div>
                      ) : (
                        pendingReviews.map(review => (
                          <ReviewCard key={review.id} review={review} onAction={handleReviewAction} />
                        ))
                      )}
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-sm font-bold flex items-center gap-2 text-white bg-[#00ff88]/20 px-4 py-2 rounded-xl w-fit">
                        <Check className="w-4 h-4 text-[#00ff88]" /> Currently Published ({approvedReviews.length})
                      </h3>
                      {approvedReviews.length === 0 ? (
                        <div className="bg-[#0a0a0f] border border-white/[0.05] border-dashed rounded-2xl p-10 flex flex-col items-center justify-center text-gray-500">
                          <p>No published reviews yet.</p>
                        </div>
                      ) : (
                        approvedReviews.map(review => (
                          <ReviewCard key={review.id} review={review} onAction={handleReviewAction} />
                        ))
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Messages Content */}
              {activeTab === 'messages' && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                  <div className="flex items-end justify-between flex-wrap gap-4">
                    <div>
                      <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-2">Secure <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-blue-500">Inbox</span></h2>
                      <p className="text-gray-400 border-l-2 border-[#00d4ff]/50 pl-3">Direct communications submitted via the platform.</p>
                    </div>
                  </div>

                  {messages.length === 0 ? (
                    <div className="bg-[#0a0a0f] border border-white/[0.05] border-dashed rounded-3xl p-20 flex flex-col items-center justify-center text-gray-500 col-span-full shadow-lg">
                      <Mail className="w-16 h-16 text-gray-600 mb-4 opacity-30" />
                      <p className="text-lg">Inbox is empty.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {messages.map((msg) => (
                        <motion.div
                          key={msg.id}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-[#0a0a0f] border border-white/[0.05] hover:border-[#00d4ff]/30 rounded-2xl overflow-hidden transition-all duration-300 shadow-lg group flex flex-col"
                        >
                          <div className="p-6 border-b border-white/[0.05] bg-gradient-to-br from-white/[0.02] to-transparent">
                            <div className="flex justify-between items-start gap-4">
                              <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 rounded-full bg-[#00d4ff]/10 flex items-center justify-center shrink-0 border border-[#00d4ff]/20">
                                  <span className="text-lg font-bold text-[#00d4ff]">{msg.name.charAt(0).toUpperCase()}</span>
                                </div>
                                <div>
                                  <h4 className="font-bold text-white text-lg">{msg.name}</h4>
                                  <a href={`mailto:${msg.email}`} className="text-sm text-[#00d4ff] hover:underline font-mono">{msg.email}</a>
                                </div>
                              </div>
                              <span className="text-xs font-mono text-gray-500 whitespace-nowrap bg-black/50 px-2 py-1 rounded">
                                {new Date(msg.timestamp).toLocaleDateString()}
                              </span>
                            </div>
                            
                            {(msg.company || msg.service) && (
                              <div className="mt-4 flex flex-wrap gap-2">
                                {msg.company && (
                                  <span className="text-xs bg-white/[0.05] text-gray-300 px-3 py-1 rounded-full font-medium border border-white/10 uppercase tracking-widest">
                                    Org: {msg.company}
                                  </span>
                                )}
                                {msg.service && (
                                  <span className="text-xs bg-[#00ff88]/10 text-[#00ff88] px-3 py-1 rounded-full font-medium border border-[#00ff88]/20 uppercase tracking-widest">
                                    Need: {msg.service}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                          
                          <div className="p-6 flex-1 bg-black/20">
                            <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                          </div>
                          
                          <div className="p-4 border-t border-white/[0.05] bg-[#0a0a0f] flex justify-end">
                            <button
                              onClick={() => handleDeleteMessage(msg.id)}
                              className="text-gray-500 hover:text-red-500 flex items-center gap-2 text-sm font-bold uppercase tracking-wider transition-colors px-3 py-1.5 rounded-lg hover:bg-red-500/10"
                            >
                              <Trash2 className="w-4 h-4" /> Purge
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* Bot Config Content */}
              {activeTab === 'bot' && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                  <div className="flex items-end justify-between flex-wrap gap-4">
                    <div>
                      <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-2">NexBot <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Configuration</span></h2>
                      <p className="text-gray-400 border-l-2 border-orange-500/50 pl-3">Adjust the AI system prompt to guide responses.</p>
                    </div>
                  </div>

                  <div className="bg-[#0a0a0f] border border-white/[0.05] rounded-3xl p-6 md:p-8 shadow-lg">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 bg-orange-500/10 text-orange-400 rounded-xl">
                        <Settings className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">System Prompt Logic</h3>
                        <p className="text-sm text-gray-500 font-mono mt-1">Defines AI behavior and restrictions.</p>
                      </div>
                    </div>
                    
                    <textarea 
                      value={systemPrompt}
                      onChange={(e) => setSystemPrompt(e.target.value)}
                      rows={10}
                      className="w-full bg-black/50 border border-white/[0.1] focus:border-orange-500/50 rounded-xl p-4 text-gray-300 font-mono text-sm outline-none transition-all resize-y custom-scrollbar shadow-inner"
                      placeholder="Enter the system prompt here..."
                    />
                    
                    <div className="mt-6 flex justify-end">
                      <button 
                        onClick={saveSystemPrompt}
                        disabled={savingPrompt}
                        className="bg-gradient-to-br from-orange-500 to-red-600 text-white font-bold px-8 py-3 rounded-xl hover:scale-[1.02] shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-all disabled:opacity-50 flex items-center justify-center min-w-[150px]"
                      >
                        {savingPrompt ? (
                           <Activity className="w-5 h-5 animate-pulse" />
                        ) : (
                           <>Save Logic <Check className="w-5 h-5 ml-2" /></>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}

function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  );
}

function ReviewCard({ review, onAction }: { review: any, onAction: (id: string, action: 'approve' | 'unapprove' | 'delete') => void }) {
  return (
    <div className="bg-[#0a0a0f] border border-white/[0.05] rounded-2xl overflow-hidden transition-all hover:border-white/[0.1] shadow-lg flex flex-col">
      <div className="p-6 border-b border-white/[0.05]">
        <div className="flex justify-between items-start gap-4 mb-4">
          <div>
            <h4 className="font-bold text-lg text-white">{review.name}</h4>
            <p className="text-xs text-gray-500 font-mono mt-0.5">{review.email}</p>
            {(review.role || review.company) && (
              <p className="text-xs text-purple-400 mt-2 font-bold uppercase tracking-widest bg-purple-500/10 inline-block px-2 py-1 rounded">
                {review.role} {review.role && review.company && 'at'} {review.company}
              </p>
            )}
          </div>
          <div className="flex bg-yellow-500/10 border border-yellow-500/20 px-3 py-1.5 rounded-xl items-center gap-1.5 shrink-0 shadow-inner">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-bold text-yellow-500">{review.rating}</span>
          </div>
        </div>

        <div className="text-gray-300 text-sm leading-relaxed p-4 bg-black/40 rounded-xl relative italic border-l-2 border-purple-500/30">
           <span className="absolute top-2 left-2 text-2xl text-purple-500/20 leading-none">"</span>
           <span className="pl-4 block">{review.message}</span>
        </div>
      </div>

      <div className="flex bg-[#0a0a0f] p-2">
        {!review.approved ? (
          <button
            onClick={() => onAction(review.id, 'approve')}
            className="flex-1 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-black py-3 rounded-lg flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest transition-all"
          >
            <Check className="w-4 h-4" /> Publish
          </button>
        ) : (
          <button
            onClick={() => onAction(review.id, 'unapprove')}
            className="flex-1 bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500 hover:text-black py-3 rounded-lg flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest transition-all"
          >
            <X className="w-4 h-4" /> Revoke
          </button>
        )}
        <div className="w-[1px] bg-white/[0.05] mx-2 my-1" />
        <button
          onClick={() => onAction(review.id, 'delete')}
          className="flex-none w-14 bg-red-500/5 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all flex items-center justify-center"
          title="Delete Record"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
