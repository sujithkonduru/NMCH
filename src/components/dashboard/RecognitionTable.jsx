import { useState } from 'react';
import { motion } from 'framer-motion';
import { MdFaceRetouchingNatural, MdSearch } from 'react-icons/md';
import { recognizedPersons } from '../../data/mockData';

const statusConfig = {
  served:    { label: 'Food Distributed', dotColor: '#10b981', bg: 'rgba(16,185,129,0.1)',  color: 'var(--accent-green)'  },
  duplicate: { label: 'Already Served',   dotColor: '#f59e0b', bg: 'rgba(245,158,11,0.1)',  color: 'var(--accent-amber)'  },
  unknown:   { label: 'Unknown Person',   dotColor: '#ef4444', bg: 'rgba(239,68,68,0.1)',   color: 'var(--accent-red)'    },
};

const mealStyle = {
  Breakfast: { bg: 'rgba(245,158,11,0.1)',   color: 'var(--accent-amber)'  },
  Lunch:     { bg: 'rgba(59,130,246,0.1)',   color: 'var(--accent-blue)'   },
  Dinner:    { bg: 'rgba(139,92,246,0.1)',   color: 'var(--accent-purple)' },
};

const filterLabels = { all: 'All', served: 'Served', duplicate: 'Duplicate', unknown: 'Unknown' };

export default function RecognitionTable() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = recognizedPersons.filter(p => {
    const matchF = filter === 'all' || p.status === filter;
    const matchS = p.name.toLowerCase().includes(search.toLowerCase()) ||
                   p.id.toLowerCase().includes(search.toLowerCase());
    return matchF && matchS;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: 'var(--card-bg)', border: '1px solid var(--border)',
        borderRadius: 16, boxShadow: 'var(--shadow-sm)', overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div style={{
        padding: '16px 20px',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <MdFaceRetouchingNatural size={19} style={{ color: 'var(--accent-blue)', flexShrink: 0 }} />
            <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>Latest Recognized Persons</h3>
          </div>
          <span style={{
            fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 99,
            background: 'rgba(59,130,246,0.1)', color: 'var(--accent-blue)',
            border: '1px solid rgba(59,130,246,0.2)',
          }}>
            {filtered.length} records
          </span>
        </div>

        {/* Search + filters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: '1 1 160px', minWidth: 0 }}>
            <MdSearch size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search person or ID..."
              style={{
                width: '100%', paddingLeft: 30, paddingRight: 12,
                paddingTop: 7, paddingBottom: 7,
                fontSize: 12, borderRadius: 10,
                background: 'var(--input-bg)',
                border: '1px solid var(--border)',
                color: 'var(--text-primary)',
                outline: 'none',
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
            {Object.keys(filterLabels).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: '5px 12px', borderRadius: 8, fontSize: 11, fontWeight: 700,
                  cursor: 'pointer', whiteSpace: 'nowrap',
                  background: filter === f ? 'var(--accent-blue)' : 'var(--bg-surface2)',
                  color:      filter === f ? '#fff'               : 'var(--text-secondary)',
                  border:     `1px solid ${filter === f ? 'var(--accent-blue)' : 'var(--border)'}`,
                }}
              >
                {filterLabels[f]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 560 }}>
          <thead>
            <tr style={{ background: 'var(--bg-surface2)' }}>
              {['Person', 'Time', 'Meal', 'Confidence', 'Status'].map(h => (
                <th key={h} style={{
                  textAlign: 'left', padding: '10px 16px',
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.06em',
                  textTransform: 'uppercase', color: 'var(--text-muted)',
                  whiteSpace: 'nowrap',
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, i) => {
              const st = statusConfig[p.status];
              const ml = mealStyle[p.meal] || { bg: 'var(--bg-surface2)', color: 'var(--text-secondary)' };
              const confNum = parseFloat(p.confidence);

              return (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  style={{ borderBottom: '1px solid var(--border-subtle)' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  {/* Person */}
                  <td style={{ padding: '11px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                        background: 'linear-gradient(135deg,#3b82f6,#6366f1)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#fff', fontSize: 12, fontWeight: 700,
                      }}>
                        {p.name === 'Unknown' ? '?' : p.name[0]}
                      </div>
                      <div>
                        <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>{p.name}</p>
                        <p style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'monospace' }}>{p.id}</p>
                      </div>
                    </div>
                  </td>

                  {/* Time */}
                  <td style={{ padding: '11px 16px', fontSize: 12, color: 'var(--text-secondary)', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>
                    {p.time}
                  </td>

                  {/* Meal */}
                  <td style={{ padding: '11px 16px' }}>
                    <span style={{
                      fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 6,
                      background: ml.bg, color: ml.color,
                    }}>
                      {p.meal}
                    </span>
                  </td>

                  {/* Confidence */}
                  <td style={{ padding: '11px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 60, height: 5, borderRadius: 99, background: 'var(--border)', flexShrink: 0 }}>
                        <div style={{
                          height: 5, borderRadius: 99,
                          width: `${confNum}%`,
                          background: confNum > 90 ? '#10b981' : confNum > 70 ? '#f59e0b' : '#ef4444',
                        }} />
                      </div>
                      <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
                        {p.confidence}
                      </span>
                    </div>
                  </td>

                  {/* Status */}
                  <td style={{ padding: '11px 16px' }}>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: 5,
                      fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 99,
                      background: st.bg, color: st.color,
                      whiteSpace: 'nowrap',
                    }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: st.dotColor, flexShrink: 0 }} />
                      {st.label}
                    </span>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
