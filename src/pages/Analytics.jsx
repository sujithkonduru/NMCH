import { motion } from 'framer-motion';
import LiveCharts from '../components/dashboard/LiveCharts';

const stats = [
  { label: 'Avg Daily Visitors', value: '892',   sub: 'Last 7 days'   },
  { label: 'Peak Hour',          value: '12–1 PM', sub: 'Lunch time'  },
  { label: 'Busiest Day',        value: 'Friday', sub: '330 breakfast' },
  { label: 'Efficiency Rate',    value: '97.2%',  sub: 'Distribution'  },
];

const pageCard = {
  background: 'var(--card-bg)',
  border: '1px solid var(--border)',
  borderRadius: 16,
  boxShadow: 'var(--shadow-sm)',
};

export default function Analytics() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* Page header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>Analytics</h1>
        <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Detailed meal distribution analytics and trends</p>
      </motion.div>

      {/* Quick stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 16 }} className="summary-grid-responsive">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            style={{ ...pageCard, padding: 20 }}
          >
            <p style={{ fontSize: 26, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>{s.value}</p>
            <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 2 }}>{s.label}</p>
            <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>{s.sub}</p>
          </motion.div>
        ))}
      </div>

      <LiveCharts />
    </div>
  );
}
