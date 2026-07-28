import { motion } from 'framer-motion';
import { MdAutoAwesome, MdTrendingUp, MdTrendingDown, MdInfo, MdLightbulb } from 'react-icons/md';
import { aiInsights, recentActivities } from '../../data/mockData';

const insightConfig = {
  up:   { icon: MdTrendingUp,   bg: 'rgba(16,185,129,0.08)',  border: 'rgba(16,185,129,0.2)',  iconColor: 'var(--accent-green)'  },
  down: { icon: MdTrendingDown, bg: 'rgba(239,68,68,0.07)',   border: 'rgba(239,68,68,0.18)',  iconColor: 'var(--accent-red)'    },
  info: { icon: MdInfo,         bg: 'rgba(59,130,246,0.08)',  border: 'rgba(59,130,246,0.2)',  iconColor: 'var(--accent-blue)'   },
  warn: { icon: MdLightbulb,    bg: 'rgba(245,158,11,0.08)',  border: 'rgba(245,158,11,0.2)',  iconColor: 'var(--accent-amber)'  },
};

const actDot = {
  success: '#10b981', alert: '#ef4444', warn: '#f59e0b', info: '#3b82f6',
};

export default function AIInsights() {
  const panelStyle = {
    background: 'var(--card-bg)', border: '1px solid var(--border)',
    borderRadius: 16, padding: 20, boxShadow: 'var(--shadow-sm)',
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="insights-grid">

      {/* AI Insights panel */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={panelStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 11, flexShrink: 0,
            background: 'linear-gradient(135deg,#8b5cf6,#6d28d9)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <MdAutoAwesome style={{ color: '#fff', fontSize: 17 }} />
          </div>
          <div>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>AI Insights</h3>
            <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>Auto-generated analysis</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          {aiInsights.map((insight, i) => {
            const cfg = insightConfig[insight.type];
            const Icon = cfg.icon;
            return (
              <div
                key={i}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: 10,
                  padding: '9px 12px', borderRadius: 10,
                  background: cfg.bg, border: `1px solid ${cfg.border}`,
                }}
              >
                <Icon size={14} style={{ color: cfg.iconColor, flexShrink: 0, marginTop: 1 }} />
                <p style={{ fontSize: 12, lineHeight: 1.55, color: 'var(--text-primary)' }}>{insight.text}</p>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Recent Activities panel */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 }} style={panelStyle}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>Recent Activities</h3>
          <button style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent-blue)', background: 'none', border: 'none', cursor: 'pointer' }}>
            View all
          </button>
        </div>

        <div>
          {recentActivities.map((a, i) => (
            <div
              key={i}
              style={{
                display: 'flex', alignItems: 'flex-start', gap: 12,
                padding: '10px 0',
                borderBottom: i < recentActivities.length - 1
                  ? '1px solid var(--border-subtle)' : 'none',
              }}
            >
              <span style={{
                width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
                marginTop: 4, background: actDot[a.type] || '#3b82f6',
              }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{a.event}</p>
                <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2, fontFamily: 'monospace' }}>{a.time}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

    </div>
  );
}
