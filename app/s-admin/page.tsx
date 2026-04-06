"use client";

import { useState, useEffect } from 'react';
import { Shield, Lock, Send, KeyRound, LogOut, Check, X, Trash2, Star, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminPage() {
  const [status, setStatus] = useState<'loading' | 'unauth' | 'otp' | 'auth'>('loading');
  const [username, setUsername] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [reviews, setReviews] = useState<any[]>([]);
  const [fetchingReviews, setFetchingReviews] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/admin/me');
      if (res.ok) {
        setStatus('auth');
        loadReviews();
      } else {
        setStatus('unauth');
      }
    } catch {
      setStatus('unauth');
    }
  };

  const loadReviews = async () => {
    setFetchingReviews(true);
    try {
      const res = await fetch('/api/admin/reviews');
      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setFetchingReviews(false);
    }
  };

  const requestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username !== 'sambhav') {
      setError('Invalid username');
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
        setError(data.error || 'Failed to send OTP');
      }
    } catch {
      setError('Network error');
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
        loadReviews();
      } else {
        setError(data.error || 'Invalid OTP');
      }
    } catch {
      setError('Network error');
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
  };

  const handleReviewAction = async (id: string, action: 'approve' | 'delete' | 'unapprove') => {
    if (action === 'delete' && !window.confirm('Are you sure you want to delete this review?')) return;
    
    try {
      const res = await fetch('/api/admin/reviews/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action })
      });
      if (res.ok) {
        loadReviews();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (status === 'unauth' || status === 'otp') {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-600/20 blur-[120px] rounded-full pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white/[0.03] border border-white/[0.05] p-8 rounded-2xl backdrop-blur-xl shrink-0 z-10"
        >
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-white/[0.05] rounded-2xl flex items-center justify-center border border-white/[0.1] mb-6 shadow-[0_0_40px_rgba(168,85,247,0.2)]">
              {status === 'unauth' ? <Shield className="w-8 h-8 text-purple-400" /> : <Lock className="w-8 h-8 text-cyan-400" />}
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Restricted Access</h1>
            <p className="text-gray-400 text-center text-sm">
              {status === 'unauth' ? 'Enter your admin credentials to proceed.' : 'Check your email for the authentication code.'}
            </p>
          </div>

          {error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm text-center">
              {error}
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {status === 'unauth' ? (
              <motion.form key="login" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} onSubmit={requestOtp}>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-400 mb-2">Username</label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full bg-white/[0.03] border border-white/[0.1] rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all font-mono"
                      placeholder="Enter username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading || !username}
                  className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-medium py-3 rounded-xl flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed group shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:shadow-[0_0_40px_rgba(168,85,247,0.5)]"
                >
                  {loading ? 'Requesting...' : <span className="flex items-center gap-2">Send OTP <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>}
                </button>
              </motion.form>
            ) : (
              <motion.form key="otp" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} onSubmit={verifyOtp}>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-400 mb-2">One-Time Password</label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full bg-white/[0.03] border border-white/[0.1] rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all text-center tracking-[0.5em] font-mono text-xl"
                      placeholder="••••••"
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
                  className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-medium py-3 rounded-xl flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed group shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:shadow-[0_0_40px_rgba(6,182,212,0.5)]"
                >
                  {loading ? 'Verifying...' : <span className="flex items-center gap-2">Unlock Dashboard <KeyRound className="w-4 h-4 group-hover:scale-110 transition-transform" /></span>}
                </button>
                <button
                  type="button"
                  onClick={() => setStatus('unauth')}
                  className="w-full mt-4 text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Back to login
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
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Navbar */}
      <header className="border-b border-white/[0.05] bg-white/[0.02] backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-purple-400" />
            <h1 className="font-bold text-lg tracking-wide hidden sm:block">Admin<span className="text-purple-400">Panel</span></h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">Logged in as <strong className="text-white">Sambhav</strong></span>
            <button
              onClick={handleLogout}
              className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-10">
        <div className="mb-10 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-3xl font-bold mb-2">Review Management</h2>
            <p className="text-gray-400">Manage client reviews pending approval for your portfolio.</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-white/[0.03] border border-white/[0.05] px-4 py-2 rounded-xl flex items-center gap-3">
              <Clock className="w-5 h-5 text-yellow-500" />
              <div>
                <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Pending</div>
                <div className="font-bold text-xl">{pendingReviews.length}</div>
              </div>
            </div>
            <div className="bg-white/[0.03] border border-white/[0.05] px-4 py-2 rounded-xl flex items-center gap-3">
              <Check className="w-5 h-5 text-emerald-500" />
              <div>
                <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Approved</div>
                <div className="font-bold text-xl">{approvedReviews.length}</div>
              </div>
            </div>
          </div>
        </div>

        {fetchingReviews ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-3 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Pending Reviews */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2 text-yellow-500 mb-6">
                <Clock className="w-5 h-5" /> Pending Actions
              </h3>
              {pendingReviews.length === 0 ? (
                <div className="p-8 text-center bg-white/[0.02] border border-white/[0.05] rounded-2xl text-gray-500 border-dashed">
                  No pending reviews to approve.
                </div>
              ) : (
                pendingReviews.map(review => (
                  <ReviewCard key={review.id} review={review} onAction={handleReviewAction} />
                ))
              )}
            </div>

            {/* Approved Reviews */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2 text-emerald-500 mb-6">
                <Check className="w-5 h-5" /> Currently Published
              </h3>
              {approvedReviews.length === 0 ? (
                <div className="p-8 text-center bg-white/[0.02] border border-white/[0.05] rounded-2xl text-gray-500 border-dashed">
                  No published reviews yet.
                </div>
              ) : (
                approvedReviews.map(review => (
                  <ReviewCard key={review.id} review={review} onAction={handleReviewAction} />
                ))
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function ReviewCard({ review, onAction }: { review: any, onAction: (id: string, action: 'approve'|'unapprove'|'delete') => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white/[0.03] border border-white/[0.05] rounded-2xl p-6 transition-all hover:bg-white/[0.04]"
    >
      <div className="flex justify-between items-start mb-4 gap-4">
        <div>
          <h4 className="font-bold text-lg text-white group-hover:text-purple-400 transition-colors">{review.name}</h4>
          <p className="text-sm text-gray-400">{review.email}</p>
          {(review.role || review.company) && (
            <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider font-medium">
              {review.role} {review.role && review.company && 'at'} {review.company}
            </p>
          )}
        </div>
        <div className="flex bg-white/[0.05] px-3 py-1 rounded-full items-center gap-1 shrink-0">
          <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
          <span className="text-sm font-bold">{review.rating}</span>
        </div>
      </div>
      
      <p className="text-gray-300 text-sm leading-relaxed mb-6 bg-black/20 p-4 rounded-xl italic">
        "{review.message}"
      </p>

      <div className="flex items-center gap-3 pt-4 border-t border-white/[0.05]">
        {!review.approved ? (
          <button
            onClick={() => onAction(review.id, 'approve')}
            className="flex-1 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 py-2 rounded-xl flex items-center justify-center gap-2 text-sm font-bold transition-colors"
          >
            <Check className="w-4 h-4" /> Approve
          </button>
        ) : (
          <button
            onClick={() => onAction(review.id, 'unapprove')}
            className="flex-1 bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 py-2 rounded-xl flex items-center justify-center gap-2 text-sm font-bold transition-colors"
          >
            <X className="w-4 h-4" /> Unpublish
          </button>
        )}
        <button
          onClick={() => onAction(review.id, 'delete')}
          className="flex-none aspect-square p-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 hover:text-red-400 rounded-xl transition-colors shrink-0 flex items-center justify-center"
          title="Delete Review"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
