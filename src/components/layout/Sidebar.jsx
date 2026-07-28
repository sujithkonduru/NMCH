import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MdDashboard, MdPeople, MdFoodBank, MdAnalytics,
  MdAutoAwesome, MdAssessment, MdVideocam, MdSettings,
  MdLogout, MdRestaurant, MdChevronLeft, MdChevronRight
} from 'react-icons/md';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { path: '/dashboard',        icon: MdDashboard,  label: 'Dashboard' },
  { path: '/persons',          icon: MdPeople,     label: 'Persons' },
  { path: '/food-distribution',icon: MdFoodBank,   label: 'Food Distribution' },
  { path: '/analytics',        icon: MdAnalytics,  label: 'Analytics' },
  { path: '/predictions',      icon: MdAutoAwesome,label: 'Predictions' },
  { path: '/reports',          icon: MdAssessment, label: 'Reports' },
  { path: '/cameras',          icon: MdVideocam,   label: 'Cameras' },
  { path: '/settings',         icon: MdSettings,   label: 'Settings' },
];

export default function Sidebar({ collapsed, setCollapsed }) {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <motion.aside
      animate={{ width: collapsed ? 64 : 228 }}
      transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        overflow: 'hidden',
        position: 'relative',
        zIndex: 30,
        backgroundColor: 'var(--sidebar-bg)',
        borderRight: '1px solid var(--border)',
      }}
    >
      {/* ── Logo ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: collapsed ? 'center' : 'space-between',
        padding: collapsed ? '16px 0' : '16px 12px',
        borderBottom: '1px solid var(--border)',
        height: 64,
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, overflow: 'hidden' }}>
          <div style={{
            width: 32, height: 32, borderRadius: 10, flexShrink: 0,
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <MdRestaurant style={{ color: '#fff', fontSize: 17 }} />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.18 }}
                style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}
              >
                <p style={{ fontSize: 13, fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.2 }}>Smart Canteen</p>
                <p style={{ fontSize: 10, color: 'var(--text-muted)', lineHeight: 1.2 }}>Admin Panel</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {!collapsed && (
          <button
            onClick={() => setCollapsed(true)}
            style={{
              padding: 4, borderRadius: 8, border: 'none', cursor: 'pointer',
              background: 'transparent', color: 'var(--text-muted)', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <MdChevronLeft size={18} />
          </button>
        )}
      </div>

      {/* Expand strip when collapsed */}
      {collapsed && (
        <button
          onClick={() => setCollapsed(false)}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '6px 0', border: 'none', background: 'transparent',
            cursor: 'pointer', color: 'var(--text-muted)',
            borderBottom: '1px solid var(--border)', flexShrink: 0,
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <MdChevronRight size={17} />
        </button>
      )}

      {/* ── Nav items ── */}
      <nav style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: '10px 8px' }}>
        {navItems.map(({ path, icon: Icon, label }) => (
          <NavLink key={path} to={path} style={{ display: 'block', textDecoration: 'none', marginBottom: 2 }}>
            {({ isActive }) => (
              <div
                className={isActive ? 'nav-active-item' : ''}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: collapsed ? '10px 0' : '9px 10px',
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  borderRadius: 12,
                  cursor: 'pointer',
                  position: 'relative',
                  color: isActive ? 'var(--accent-blue)' : 'var(--text-muted)',
                  background: isActive ? 'var(--bg-hover)' : 'transparent',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  transition: 'background 0.15s, color 0.15s',
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'var(--bg-hover)'; e.currentTarget.style.color = isActive ? 'var(--accent-blue)' : 'var(--text-secondary)'; }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = isActive ? 'var(--accent-blue)' : 'var(--text-muted)'; }}
              >
                {isActive && (
                  <span style={{
                    position: 'absolute', left: 0, top: '18%', bottom: '18%',
                    width: 3, background: 'var(--accent-blue)', borderRadius: '0 3px 3px 0',
                  }} />
                )}
                <Icon size={19} style={{ flexShrink: 0 }} />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      style={{ fontSize: 13, fontWeight: 600 }}
                    >
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Tooltip when collapsed */}
                {collapsed && (
                  <div
                    className="sidebar-tooltip"
                    style={{
                      position: 'absolute',
                      left: '100%',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      marginLeft: 10,
                      padding: '5px 10px',
                      borderRadius: 8,
                      fontSize: 12,
                      fontWeight: 600,
                      whiteSpace: 'nowrap',
                      background: 'var(--card-bg)',
                      border: '1px solid var(--border)',
                      boxShadow: 'var(--shadow-md)',
                      color: 'var(--text-primary)',
                      opacity: 0,
                      pointerEvents: 'none',
                      transition: 'opacity 0.15s',
                      zIndex: 99,
                    }}
                  >
                    {label}
                  </div>
                )}
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* ── Footer ── */}
      <div style={{ padding: 8, borderTop: '1px solid var(--border)', flexShrink: 0 }}>
        {!collapsed && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '8px 10px', borderRadius: 12, marginBottom: 4,
            background: 'var(--bg-surface2)',
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontSize: 12, fontWeight: 700,
            }}>
              {user?.name?.[0] || 'A'}
            </div>
            <div style={{ overflow: 'hidden', flex: 1 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.name}</p>
              <p style={{ fontSize: 10, color: 'var(--text-muted)' }}>{user?.role}</p>
            </div>
          </div>
        )}

        {collapsed && (
          <div style={{
            display: 'flex', justifyContent: 'center', marginBottom: 4,
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontSize: 12, fontWeight: 700,
            }}>
              {user?.name?.[0] || 'A'}
            </div>
          </div>
        )}

        <button
          onClick={handleLogout}
          style={{
            display: 'flex', alignItems: 'center',
            gap: collapsed ? 0 : 10,
            justifyContent: collapsed ? 'center' : 'flex-start',
            width: '100%', padding: collapsed ? '10px 0' : '9px 10px',
            borderRadius: 12, border: 'none', cursor: 'pointer',
            background: 'transparent', color: 'var(--accent-red)',
            fontSize: 13, fontWeight: 600,
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.08)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <MdLogout size={18} style={{ flexShrink: 0 }} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </motion.aside>
  );
}
