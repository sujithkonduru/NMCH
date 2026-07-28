import { motion } from 'framer-motion';
import PredictionCard from '../components/dashboard/PredictionCard';
import AIInsights from '../components/dashboard/AIInsights';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const forecastData = [
  { day: 'Mon', predicted: 920,  actual: 892  },
  { day: 'Tue', predicted: 950,  actual: 940  },
  { day: 'Wed', predicted: 930,  actual: 918  },
  { day: 'Thu', predicted: 970,  actual: 965  },
  { day: 'Fri', predicted: 1050, actual: null },
  { day: 'Sat', predicted: 720,  actual: null },
  { day: 'Sun', predicted: 680,  actual: null },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'var(--card-bg)', border: '1px solid var(--border)',
      borderRadius: 10, padding: '10px 14px', boxShadow: 'var(--shadow-md)',
    }}>
      <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ fontSize: 12, fontWeight: 600, color: p.color }}>{p.name}: {p.value ?? '—'}</p>
      ))}
    </div>
  );
};

export default function Predictions() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>AI Predictions</h1>
        <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Machine learning powered forecasts</p>
      </motion.div>

      <PredictionCard />

      {/* Forecast chart */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: 'var(--card-bg)', border: '1px solid var(--border)',
          borderRadius: 16, padding: 20, boxShadow: 'var(--shadow-sm)',
        }}
      >
        <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16 }}>
          Weekly Forecast vs Actual
        </p>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={forecastData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="predGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#8b5cf6" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="actGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend formatter={v => <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{v}</span>} />
            <Area type="monotone" dataKey="predicted" stroke="#8b5cf6" strokeWidth={2} fill="url(#predGrad)" name="Predicted" strokeDasharray="5 5" />
            <Area type="monotone" dataKey="actual"    stroke="#3b82f6" strokeWidth={2.5} fill="url(#actGrad)" name="Actual" connectNulls={false} />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      <AIInsights />
    </div>
  );
}
