import { motion } from 'framer-motion';
import {
  MdPeople, MdFaceRetouchingNatural, MdFreeBreakfast,
  MdLunchDining, MdDinnerDining, MdBlock, MdVideocam, MdAutoGraph
} from 'react-icons/md';
import { HiTrendingUp, HiTrendingDown } from 'react-icons/hi';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { summaryCards } from '../../data/mockData';

const icons = {
  persons:   MdPeople,
  served:    MdFaceRetouchingNatural,
  breakfast: MdFreeBreakfast,
  lunch:     MdLunchDining,
  dinner:    MdDinnerDining,
  duplicate: MdBlock,
  camera:    MdVideocam,
  accuracy:  MdAutoGraph,
};

const colorMap = {
  blue:   { stroke: '#3b82f6', iconBg: 'rgba(59,130,246,0.12)',  iconColor: '#3b82f6'  },
  green:  { stroke: '#10b981', iconBg: 'rgba(16,185,129,0.12)',  iconColor: '#10b981'  },
  orange: { stroke: '#f59e0b', iconBg: 'rgba(245,158,11,0.12)',  iconColor: '#f59e0b'  },
  teal:   { stroke: '#14b8a6', iconBg: 'rgba(20,184,166,0.12)',  iconColor: '#14b8a6'  },
  purple: { stroke: '#8b5cf6', iconBg: 'rgba(139,92,246,0.12)',  iconColor: '#8b5cf6'  },
  red:    { stroke: '#ef4444', iconBg: 'rgba(239,68,68,0.12)',   iconColor: '#ef4444'  },
};

const sparks = [
  [{v:1100},{v:1150},{v:1180},{v:1200},{v:1220},{v:1248}],
  [{v:720}, {v:780}, {v:810}, {v:850}, {v:870}, {v:892}],
  [{v:260}, {v:280}, {v:295}, {v:305}, {v:308}, {v:312}],
  [{v:380}, {v:395}, {v:400}, {v:408}, {v:412}, {v:415}],
  [{v:190}, {v:180}, {v:175}, {v:170}, {v:167}, {v:165}],
  [{v:55},  {v:48},  {v:44},  {v:41},  {v:39},  {v:37}],
  [{v:4},   {v:5},   {v:5},   {v:5},   {v:5},   {v:5}],
  [{v:97.1},{v:97.5},{v:97.8},{v:98.0},{v:98.2},{v:98.4}],
];

export default function SummaryCards() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: 16,
    }} className="summary-grid-responsive">
      {summaryCards.map((card, i) => {
        const Icon = icons[card.icon];
        const c    = colorMap[card.color];
        const isPos     = card.change > 0;
        const isNeutral = card.change === 0;

        return (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--border)',
              borderRadius: 16,
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: 0,
              boxShadow: 'var(--shadow-sm)',
              cursor: 'default',
              minWidth: 0,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Top row: icon + badge */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 12,
                background: c.iconBg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Icon size={20} style={{ color: c.iconColor }} />
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 3,
                padding: '3px 8px', borderRadius: 99, fontSize: 11, fontWeight: 700,
                background: isNeutral
                  ? 'var(--bg-surface2)'
                  : isPos
                  ? 'rgba(16,185,129,0.1)'
                  : 'rgba(239,68,68,0.1)',
                color: isNeutral
                  ? 'var(--text-muted)'
                  : isPos
                  ? 'var(--accent-green)'
                  : 'var(--accent-red)',
              }}>
                {!isNeutral && (isPos
                  ? <HiTrendingUp size={11} />
                  : <HiTrendingDown size={11} />
                )}
                <span>{isNeutral ? '—' : `${isPos ? '+' : ''}${card.change}%`}</span>
              </div>
            </div>

            {/* Value */}
            <p style={{
              fontSize: 26, fontWeight: 800, lineHeight: 1,
              color: 'var(--text-primary)', marginBottom: 4,
            }}>
              {card.value}
            </p>
            <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)', marginBottom: 10 }}>
              {card.label}
            </p>

            {/* Sparkline */}
            <div style={{ height: 36 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sparks[i]}>
                  <Line type="monotone" dataKey="v" stroke={c.stroke} strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Bottom accent line on hover */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: 2,
              background: `linear-gradient(90deg, ${c.stroke}, transparent)`,
              opacity: 0.5,
            }} />
          </motion.div>
        );
      })}
    </div>
  );
}
