import { motion } from 'framer-motion';
import { MdAutoAwesome, MdFreeBreakfast, MdLunchDining, MdDinnerDining, MdVerified } from 'react-icons/md';
import { predictions } from '../../data/mockData';

const MealPrediction = ({ icon: Icon, title, data, accent, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    style={{
      borderRadius: 14, padding: 16,
      background: `${accent}10`,
      border: `1px solid ${accent}28`,
      display: 'flex', flexDirection: 'column', gap: 10,
    }}
  >
    {/* Title row */}
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{
        width: 34, height: 34, borderRadius: 10, flexShrink: 0,
        background: accent,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon size={17} style={{ color: '#fff' }} />
      </div>
      <div>
        <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>{title}</p>
        <p style={{ fontSize: 11, fontWeight: 600, color: accent }}>{data.persons} expected</p>
      </div>
    </div>

    {/* Quantities */}
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
      {Object.entries(data).filter(([k]) => k !== 'persons').map(([key, val]) => (
        <div key={key} style={{
          borderRadius: 10, padding: '8px 10px',
          background: 'var(--bg-surface2)',
          border: '1px solid var(--border-subtle)',
        }}>
          <p style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'capitalize', marginBottom: 2 }}>{key}</p>
          <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{val} kg</p>
        </div>
      ))}
    </div>
  </motion.div>
);

export default function PredictionCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: 'var(--card-bg)', border: '1px solid var(--border)',
        borderRadius: 16, padding: 20, boxShadow: 'var(--shadow-sm)',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 12, flexShrink: 0,
            background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <MdAutoAwesome style={{ color: '#fff', fontSize: 20 }} />
          </div>
          <div>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>Food Requirement Prediction</h3>
            <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>AI-powered forecast for tomorrow</p>
          </div>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 5,
          padding: '5px 12px', borderRadius: 99,
          background: 'rgba(16,185,129,0.1)',
          border: '1px solid rgba(16,185,129,0.25)',
          color: 'var(--accent-green)',
          flexShrink: 0,
        }}>
          <MdVerified size={13} />
          <span style={{ fontSize: 12, fontWeight: 700 }}>{predictions.confidence}% Confidence</span>
        </div>
      </div>

      {/* Expected visitors banner */}
      <div style={{
        borderRadius: 14, padding: '14px 18px', marginBottom: 16,
        background: 'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(99,102,241,0.06))',
        border: '1px solid rgba(59,130,246,0.18)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8,
      }}>
        <div>
          <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--accent-blue)', marginBottom: 4 }}>
            Tomorrow's Expected Visitors
          </p>
          <p style={{
            fontSize: 32, fontWeight: 800, lineHeight: 1,
            background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-indigo))',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            {predictions.expectedVisitors.toLocaleString()}
          </p>
        </div>
        <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>Across all meal types</p>
      </div>

      {/* Meal cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }} className="prediction-grid">
        <MealPrediction icon={MdFreeBreakfast} title="Breakfast" data={predictions.breakfast} accent="#f59e0b" delay={0.1} />
        <MealPrediction icon={MdLunchDining}   title="Lunch"     data={predictions.lunch}      accent="#3b82f6" delay={0.2} />
        <MealPrediction icon={MdDinnerDining}  title="Dinner"    data={predictions.dinner}     accent="#8b5cf6" delay={0.3} />
      </div>
    </motion.div>
  );
}
