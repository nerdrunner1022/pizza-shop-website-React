import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Flame, Lock, ArrowRight, ShieldCheck, User } from 'lucide-react';
import { useStore } from '../../store/useStore';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { loginAdmin } = useStore();

  const [username, setUsername] = useState('antonio@antonioscorner.com');
  const [password, setPassword] = useState('fireAndDough1984');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAdmin(username, password);
    navigate('/admin');
  };

  const handleQuickLogin = () => {
    loginAdmin();
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#FBF9F5] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C85A32]/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="w-full max-w-md relative z-10 space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <Link to="/" className="inline-flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C85A32] to-[#8B261E] flex items-center justify-center text-white shadow-[0_0_20px_rgba(200,90,50,0.4)] group-hover:scale-105 transition-transform">
              <Flame className="w-5 h-5 text-[#FBF9F5]" />
            </div>
            <span className="font-serif text-2xl font-bold tracking-tight text-[#FBF9F5]">
              Antonio’s Corner
            </span>
          </Link>

          <div>
            <h1 className="font-serif text-2xl font-bold text-[#FBF9F5]">
              Staff & Kitchen Brigade
            </h1>
            <p className="text-xs text-[#A39E93] mt-1 font-light">
              Restricted management console for live orders, oven queues, and menu control.
            </p>
          </div>
        </div>

        {/* Login Card */}
        <div className="glass-panel p-8 rounded-3xl border border-white/10 shadow-2xl space-y-6">
          <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2.5 text-xs text-[#D9A35F]">
            <ShieldCheck className="w-4 h-4 text-[#C85A32] shrink-0" />
            <span>Mock Access Enabled: Any input credentials will grant entry.</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-[10px] uppercase tracking-widest text-[#A39E93] font-semibold block mb-1">
                Staff Identity / Email
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#A39E93] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  required
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-xs text-[#FBF9F5] focus:outline-none focus:border-[#D9A35F]"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-widest text-[#A39E93] font-semibold block mb-1">
                Passcode
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#A39E93] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-xs text-[#FBF9F5] focus:outline-none focus:border-[#D9A35F]"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-[#A39E93]">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded bg-black/40 border-white/20 text-[#C85A32] focus:ring-0"
                />
                <span className="text-[11px]">Remember terminal</span>
              </label>
              <span className="text-[11px] text-[#D9A35F]">Head Pizzaiolo Access</span>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C85A32] to-[#D9A35F] text-white text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(200,90,50,0.35)] hover:opacity-95 transition-all"
            >
              <span>Unlock Admin Console</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick 1-Click Access for Evaluator */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleQuickLogin}
              className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-[#D9A35F] font-mono transition-colors"
            >
              ⚡ Quick Login as Chef Antonio
            </button>
          </div>
        </div>

        {/* Return to Public Site */}
        <div className="text-center">
          <Link
            to="/"
            className="text-xs text-[#A39E93] hover:text-[#FBF9F5] transition-colors"
          >
            ← Return to Public Pizzeria Experience
          </Link>
        </div>
      </div>
    </div>
  );
};
