import { motion } from 'framer-motion';
import { MdFoodBank } from 'react-icons/md';
import RecognitionTable from '../components/dashboard/RecognitionTable';
import DuplicateDetection from '../components/dashboard/DuplicateDetection';

const mealStatus = [
  { meal: 'Breakfast', time: '7:00 AM – 9:30 AM', served: 312, total: 330, status: 'completed' },
  { meal: 'Lunch',     time: '12:00 PM – 2:30 PM', served: 415, total: 500, status: 'ongoing'   },
  { meal: 'Dinner',    time: '7:00 PM – 9:00 PM',  served: 0,   total: 350, status: 'upcoming'  },
];

const statusMap = {
  completed: { bg: 'rgba(16,185,129,0.1)',  color: 'var(--accent-green)',  bar: '#10b981' },
  ongoing:   { bg: 'rgba(59,130,246,0.1)',  color: 'var(--accent-blue)',   bar: '#3b82f6' },
  upcoming:  { bg: 'var(--bg-surface2)',    color: 'var(--text-muted)',     bar: 'var(--border)' },
};

export default function FoodDistribution() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>Food Distribution</h1>
        <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Real-time distribution monitoring</p>
      </motion.div>

      {/* Meal status cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }} className="dist-grid">
        {mealStatus.map((m, i) => {
          const st = statusMap[m.status];
          const pct = m.total > 0 ? Math.round((m.served / m.total) * 100) : 0;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              style={{
                background: 'var(--card-bg)', border: '1px solid var(--border)',
                borderRadius: 16, padding: 20, boxShadow: 'var(--shadow-sm)',
              }}
            >
              {/* Title row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <MdFoodBank size={20} style={{ color: 'var(--accent-blue)', flexShrink: 0 }} />
                  <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{m.meal}</p>
                </div>
                <span style={{
                  fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 99,
                  background: st.bg, color: st.color, textTransform: 'capitalize',
                }}>
                  {m.status}
                </span>
              </div>

              <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 12 }}>{m.time}</p>

              {/* Count */}
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ fontSize: 28, fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>{m.served}</span>
                <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>/ {m.total}</span>
              </div>

              {/* Progress bar */}
              <div style={{ height: 6, borderRadius: 99, background: 'var(--border)', overflow: 'hidden', marginBottom: 6 }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 1, delay: i * 0.1 + 0.3, ease: [0.16,1,0.3,1] }}
                  style={{ height: '100%', borderRadius: 99, background: st.bar }}
                />
              </div>
              <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>{pct}% served</p>
            </motion.div>
          );
        })}
      </div>

      <RecognitionTable />
      <DuplicateDetection />
    </div>
  );
}
