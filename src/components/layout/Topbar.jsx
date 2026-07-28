import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MdSearch, MdNotifications, MdLogout, MdSettings,
  MdMenu, MdRestaurant, MdClose,
} from 'react-icons/md';
import { HiSun, HiMoon } from 'react-icons/hi';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { recentActivities } from '../../data/mockData';

const notifDot = { alert: '#ef4444', warn: '#f59e0b', success: '#10b981', info: '#3b82f6' };

const topbarNavItems = [
  { path: '/dashboard',         label: 'Dashboard'   },
  { path: '/analytics',         label: 'Analytics'   },
  { path: '/food-distribution', label: 'Distribution'},
  { path: '/reports',           label: 'Reports'     },
];

export default function Topbar({ setSidebarCollapsed }) {
  const { user, logout } = useAuth();
  const { dark, setDark } = useTheme();
  const navigate = useNavigate();
  const [showNotif,    setShowNotif]   = useState(false);
  const [showProfile,  setShowProfile] = useState(false);
  const [showSearch,   setShowSearch]  = useState(false);
  const [search,       setSearch]      = useState('');

  const unread = recentActivities.filter(a => a.type === 'alert').length;
  const closeAll = () => { setShowNotif(false); setShowProfile(false); };

  return (
    <header style={{
      height: 56,
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 12px',
      backgroundColor: 'var(--topbar-bg)',
      backdropFilter: 'blur(20px) saturate(160%)',
      WebkitBackdropFilter: 'blur(20px) saturate(160%)',
      borderBottom: '1px solid var(--border)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      gap: 8,
    }}>

      {/* ── LEFT ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
        {/* Desktop sidebar toggle */}
        <button
          onClick={() => setSidebarCollapsed(p => !p)}
          className="topbar-collapse-btn"
          style={{
            width: 34, height: 34, borderRadius: 9,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '1px solid var(--border)', background: 'var(--bg-surface2)',
            cursor: 'pointer', color: 'var(--text-secondary)', flexShrink: 0,
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--bg-surface2)'}
        >
          <MdMenu size={19} />
        </button>

        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <div style={{
            width: 30, height: 30, borderRadius: 9,
            background: 'linear-gradient(135deg,#3b82f6,#1d4ed8)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <MdRestaurant style={{ color: '#fff', fontSize: 16 }} />
          </div>
          <span className="topbar-brand-text" style={{
            fontSize: 13, fontWeight: 800,
            color: 'var(--text-primary)', whiteSpace: 'nowrap',
          }}>
            Smart Canteen
          </span>
        </div>

        {/* Desktop search */}
        <div className="topbar-search-desktop" style={{ position: 'relative', marginLeft: 4 }}>
          <MdSearch size={14} style={{
            position: 'absolute', left: 10, top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-muted)', pointerEvents: 'none',
          }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search person, ID..."
            className="sc-input"
            style={{ paddingLeft: 30, paddingRight: 12, paddingTop: 7, paddingBottom: 7, borderRadius: 9, fontSize: 12, width: 200 }}
          />
        </div>
      </div>

      {/* ── RIGHT ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>

        {/* Nav links — desktop only */}
        <nav className="topbar-nav" style={{ display: 'flex', alignItems: 'center', gap: 2, marginRight: 6 }}>
          {topbarNavItems.map(({ path, label }) => (
            <NavLink key={path} to={path} style={{ textDecoration: 'none' }}>
              {({ isActive }) => (
                <span
                  style={{
                    display: 'inline-block', padding: '5px 10px', borderRadius: 8,
                    fontSize: 12, fontWeight: 600, cursor: 'pointer',
                    color: isActive ? 'var(--accent-blue)' : 'var(--text-secondary)',
                    background: isActive ? 'rgba(59,130,246,0.1)' : 'transparent',
                  }}
                  onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = 'var(--bg-hover)'; e.currentTarget.style.color = 'var(--text-primary)'; }}}
                  onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; }}}
                >
                  {label}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Live badge — tablet+ */}
        <div className="topbar-live" style={{
          display: 'flex', alignItems: 'center', gap: 5,
          padding: '4px 9px', borderRadius: 20, marginRight: 2,
          background: 'rgba(34,197,94,0.08)',
          border: '1px solid rgba(34,197,94,0.2)',
        }}>
          <span className="live-dot" style={{ width: 6, height: 6 }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent-green)' }}>Live</span>
        </div>

        {/* Mobile search toggle */}
        <button
          className="topbar-search-mobile-btn"
          onClick={() => setShowSearch(p => !p)}
          style={{
            width: 34, height: 34, borderRadius: 9,
            display: 'none', alignItems: 'center', justifyContent: 'center',
            border: '1px solid var(--border)', background: 'var(--bg-surface2)',
            cursor: 'pointer', color: 'var(--text-secondary)',
          }}
        >
          {showSearch ? <MdClose size={17} /> : <MdSearch size={17} />}
        </button>

        {/* Dark mode */}
        <button
          className="theme-toggle-btn"
          onClick={() => setDark(p => !p)}
          aria-label="Toggle dark mode"
        >
          <HiSun size={15} className="icon-sun" />
          <HiMoon size={15} className="icon-moon" />
        </button>

        {/* Notifications */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => { setShowNotif(p => !p); setShowProfile(false); }}
            style={{
              position: 'relative', width: 34, height: 34,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              borderRadius: 9, border: '1px solid var(--border)',
              background: 'var(--bg-surface2)', cursor: 'pointer',
              color: 'var(--text-secondary)',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--bg-surface2)'}
          >
            <MdNotifications size={18} />
            {unread > 0 && (
              <span style={{
                position: 'absolute', top: 3, right: 3,
                width: 14, height: 14, borderRadius: '50%',
                background: '#ef4444', color: '#fff',
                fontSize: 8, fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '1.5px solid var(--topbar-bg)',
              }}>
                {unread}
              </span>
            )}
          </button>

          <AnimatePresence>
            {showNotif && (
              <>
                <div style={{ position: 'fixed', inset: 0, zIndex: 40 }} onClick={closeAll} />
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="notif-dropdown"
                  style={{
                    position: 'absolute', right: 0, top: '100%', marginTop: 8,
                    borderRadius: 14, zIndex: 50, overflow: 'hidden',
                    background: 'var(--card-bg)',
                    border: '1px solid var(--border)',
                    boxShadow: 'var(--shadow-md)',
                  }}
                >
                  <div style={{ padding: '11px 14px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>Notifications</p>
                    <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 99, background: 'rgba(239,68,68,0.1)', color: 'var(--accent-red)', border: '1px solid rgba(239,68,68,0.2)' }}>
                      {unread} new
                    </span>
                  </div>
                  <div style={{ maxHeight: 260, overflowY: 'auto' }} className="scrollbar-hide">
                    {recentActivities.map((a, i) => (
                      <div key={i} style={{
                        display: 'flex', alignItems: 'flex-start', gap: 10,
                        padding: '9px 14px', borderBottom: '1px solid var(--border-subtle)', cursor: 'pointer',
                      }}
                        onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                      >
                        <span style={{ width: 7, height: 7, borderRadius: '50%', flexShrink: 0, marginTop: 4, background: notifDot[a.type] || '#3b82f6' }} />
                        <div>
                          <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{a.event}</p>
                          <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2, fontFamily: 'monospace' }}>{a.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ padding: '9px 14px', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
                    <button style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent-blue)', background: 'none', border: 'none', cursor: 'pointer' }}>
                      View all
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Profile */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => { setShowProfile(p => !p); setShowNotif(false); }}
            style={{
              display: 'flex', alignItems: 'center', gap: 7,
              padding: '3px 8px 3px 3px', borderRadius: 11,
              border: '1px solid var(--border)', background: 'var(--bg-surface2)',
              cursor: 'pointer',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--bg-surface2)'}
          >
            <div style={{
              width: 26, height: 26, borderRadius: '50%',
              background: 'linear-gradient(135deg,#3b82f6,#1d4ed8)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontSize: 11, fontWeight: 700, flexShrink: 0,
            }}>
              {user?.name?.[0] || 'A'}
            </div>
            <span className="topbar-profile-name" style={{
              fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', whiteSpace: 'nowrap',
            }}>
              {user?.name}
            </span>
          </button>

          <AnimatePresence>
            {showProfile && (
              <>
                <div style={{ position: 'fixed', inset: 0, zIndex: 40 }} onClick={closeAll} />
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  style={{
                    position: 'absolute', right: 0, top: '100%', marginTop: 8,
                    width: 196, borderRadius: 14, zIndex: 50, overflow: 'hidden',
                    background: 'var(--card-bg)',
                    border: '1px solid var(--border)',
                    boxShadow: 'var(--shadow-md)',
                  }}
                >
                  <div style={{ padding: '11px 14px', borderBottom: '1px solid var(--border)' }}>
                    <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{user?.name}</p>
                    <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{user?.role} · {user?.email}</p>
                  </div>
                  <div style={{ padding: 6 }}>
                    {[
                      { label: 'Settings', icon: MdSettings, action: () => { navigate('/settings'); closeAll(); }, color: 'var(--text-secondary)', hover: 'var(--bg-hover)' },
                      { label: 'Logout',   icon: MdLogout,   action: () => { logout(); navigate('/login'); },      color: 'var(--accent-red)',     hover: 'rgba(239,68,68,0.08)' },
                    ].map(item => (
                      <button
                        key={item.label}
                        onClick={item.action}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 8,
                          width: '100%', padding: '8px 10px', borderRadius: 9,
                          border: 'none', cursor: 'pointer', background: 'transparent',
                          color: item.color, fontSize: 13, fontWeight: 600,
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = item.hover}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                      >
                        <item.icon size={14} /> {item.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile search overlay bar */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="mobile-search-bar"
            style={{
              position: 'absolute', top: '100%', left: 0, right: 0,
              padding: '10px 12px',
              background: 'var(--topbar-bg)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid var(--border)',
              zIndex: 49,
            }}
          >
            <div style={{ position: 'relative' }}>
              <MdSearch size={15} style={{
                position: 'absolute', left: 10, top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)', pointerEvents: 'none',
              }} />
              <input
                autoFocus
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search person, ID..."
                className="sc-input"
                style={{ paddingLeft: 30, paddingRight: 12, paddingTop: 9, paddingBottom: 9, borderRadius: 10, fontSize: 13, width: '100%' }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
