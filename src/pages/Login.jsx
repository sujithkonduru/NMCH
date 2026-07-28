import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MdEmail, MdLock, MdRestaurant, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { HiSparkles } from 'react-icons/hi';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: 'admin@canteen.com', password: 'admin123', remember: false });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) { setError('Please fill in all fields.'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    const ok = login(form.email, form.password, form.remember);
    if (ok) navigate('/dashboard');
    else { setError('Invalid credentials.'); setLoading(false); }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex' }}>

      {/* ── Left — Illustration ── */}
      <div className="login-left" style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 45%, #0ea5e9 100%)' }}>
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.07)',
                width:  [260, 180, 320, 140, 220][i],
                height: [260, 180, 320, 140, 220][i],
                left: `${[5, 55, 25, 70, 10][i]}%`,
                top:  `${[5, 5, 45, 25, 65][i]}%`,
              }}
              animate={{ y: [0, -18, 0], x: [0, 8, 0] }}
              transition={{ duration: 5 + i * 1.2, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
          {/* Grid overlay */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.04 }}>
            <defs>
              <pattern id="g" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#g)" />
          </svg>
        </div>

        <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', padding: '48px 40px', color: '#fff' }}>
          {/* Face scan */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={{ marginBottom: 32 }}
          >
            <div style={{ position: 'relative', width: 180, height: 180, margin: '0 auto' }}>
              <div style={{
                position: 'absolute', inset: 0, borderRadius: '50%',
                border: '2px solid rgba(255,255,255,0.25)',
                background: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(4px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                overflow: 'hidden',
              }}>
                <svg viewBox="0 0 100 100" style={{ width: 90, height: 90 }} fill="none" stroke="white" strokeWidth="2">
                  <circle cx="50" cy="35" r="18" strokeOpacity="0.9"/>
                  <path d="M20 85 C20 65 80 65 80 85" strokeOpacity="0.9"/>
                  <line x1="10" y1="18" x2="24" y2="18" strokeWidth="3" strokeLinecap="round"/>
                  <line x1="10" y1="18" x2="10" y2="32" strokeWidth="3" strokeLinecap="round"/>
                  <line x1="76" y1="18" x2="90" y2="18" strokeWidth="3" strokeLinecap="round"/>
                  <line x1="90" y1="18" x2="90" y2="32" strokeWidth="3" strokeLinecap="round"/>
                  <line x1="10" y1="68" x2="10" y2="82" strokeWidth="3" strokeLinecap="round"/>
                  <line x1="10" y1="82" x2="24" y2="82" strokeWidth="3" strokeLinecap="round"/>
                  <line x1="90" y1="68" x2="90" y2="82" strokeWidth="3" strokeLinecap="round"/>
                  <line x1="76" y1="82" x2="90" y2="82" strokeWidth="3" strokeLinecap="round"/>
                  <circle cx="42" cy="33" r="3" fill="white" stroke="none"/>
                  <circle cx="58" cy="33" r="3" fill="white" stroke="none"/>
                  <path d="M44 42 Q50 47 56 42" strokeLinecap="round"/>
                </svg>
                {/* Scan line */}
                <div className="scan-line" />
              </div>
              <motion.div
                style={{ position: 'absolute', inset: -8, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.2)' }}
                animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.1, 0.4] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{ textAlign: 'center', maxWidth: 340 }}
          >
            <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 10 }}>AI Face Recognition</h1>
            <p style={{ color: 'rgba(186,214,255,0.85)', fontSize: 14, lineHeight: 1.6 }}>
              Smart biometric identification for secure and efficient canteen food distribution.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 32 }}>
              {[
                { label: '98.4%', sub: 'Accuracy' },
                { label: '< 0.3s', sub: 'Speed' },
                { label: '1,248', sub: 'Enrolled' },
                { label: '6', sub: 'Cameras' },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: 14, padding: '14px 10px', textAlign: 'center',
                  }}
                >
                  <p style={{ fontSize: 22, fontWeight: 800 }}>{s.label}</p>
                  <p style={{ fontSize: 11, color: 'rgba(186,214,255,0.8)', marginTop: 2 }}>{s.sub}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Right — Form ── */}
      <div className="login-right">
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          style={{ width: '100%', maxWidth: 380, padding: '32px 24px' }}
        >
          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div style={{
              width: 60, height: 60, borderRadius: 18, margin: '0 auto 14px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(59,130,246,0.35)',
            }}>
              <MdRestaurant style={{ color: '#fff', fontSize: 28 }} />
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>
              Smart Canteen
            </h2>
            <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Food Distribution System</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, marginTop: 6 }}>
              <HiSparkles style={{ color: 'var(--accent-blue)', fontSize: 13 }} />
              <span style={{ fontSize: 12, color: 'var(--accent-blue)', fontWeight: 600 }}>AI-Powered Platform</span>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  background: 'rgba(239,68,68,0.08)',
                  border: '1px solid rgba(239,68,68,0.25)',
                  color: 'var(--accent-red)',
                  fontSize: 13,
                  borderRadius: 12,
                  padding: '10px 14px',
                  marginBottom: 14,
                }}
              >
                {error}
              </motion.div>
            )}

            {/* Email */}
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 6 }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <MdEmail size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  placeholder="admin@canteen.com"
                  className="sc-input"
                  style={{ paddingLeft: 38, paddingRight: 14, paddingTop: 11, paddingBottom: 11, borderRadius: 12, fontSize: 13 }}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 6 }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <MdLock size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                  placeholder="••••••••"
                  className="sc-input"
                  style={{ paddingLeft: 38, paddingRight: 40, paddingTop: 11, paddingBottom: 11, borderRadius: 12, fontSize: 13 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(p => !p)}
                  style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
                >
                  {showPass ? <MdVisibilityOff size={17} /> : <MdVisibility size={17} />}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 7, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={form.remember}
                  onChange={e => setForm(p => ({ ...p, remember: e.target.checked }))}
                  style={{ width: 15, height: 15, accentColor: 'var(--accent-blue)' }}
                />
                <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Remember me</span>
              </label>
              <button type="button" style={{ fontSize: 12, color: 'var(--accent-blue)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>
                Forgot password?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: '13px 0',
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                color: '#fff', fontSize: 14, fontWeight: 700,
                borderRadius: 12, border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.75 : 1,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                boxShadow: '0 4px 16px rgba(59,130,246,0.35)',
              }}
            >
              {loading ? (
                <>
                  <svg style={{ animation: 'spin 0.7s linear infinite', width: 16, height: 16 }} viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3"/>
                    <path d="M4 12a8 8 0 018-8" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                  Authenticating...
                </>
              ) : 'Sign In'}
            </button>
          </form>

          {/* Quick fill */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 18 }}>
            {[
              { label: 'Admin', email: 'admin@canteen.com', color: 'var(--accent-blue)', bg: 'rgba(59,130,246,0.06)', border: 'rgba(59,130,246,0.2)' },
              { label: 'Operator', email: 'operator@canteen.com', color: 'var(--accent-green)', bg: 'rgba(16,185,129,0.06)', border: 'rgba(16,185,129,0.2)' },
            ].map(item => (
              <button
                key={item.label}
                onClick={() => setForm(p => ({ ...p, email: item.email, password: 'admin123' }))}
                style={{
                  padding: '9px 8px', borderRadius: 10, border: `1px solid ${item.border}`,
                  background: item.bg, cursor: 'pointer', textAlign: 'center',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 6, background: item.bg, color: item.color, border: `1px solid ${item.border}`, marginBottom: 3 }}>
                  {item.label}
                </span>
                <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>{item.email}</p>
              </button>
            ))}
          </div>

          <p style={{ textAlign: 'center', fontSize: 11, color: 'var(--text-muted)', marginTop: 20 }}>
            Smart Canteen v2.0 · AI-Powered Distribution System
          </p>
        </motion.div>
      </div>
    </div>
  );
}
