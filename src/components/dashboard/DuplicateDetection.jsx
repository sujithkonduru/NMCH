import { motion } from 'framer-motion';
import { MdBlock, MdTimer } from 'react-icons/md';
import { duplicateAttempts } from '../../data/mockData';

export default function DuplicateDetection() {
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
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 20px', borderBottom: '1px solid var(--border)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <MdBlock size={19} style={{ color: 'var(--accent-red)', flexShrink: 0 }} />
          <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>Duplicate Attempts Detected</h3>
        </div>
        <span style={{
          fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 99,
          background: 'rgba(239,68,68,0.1)', color: 'var(--accent-red)',
          border: '1px solid rgba(239,68,68,0.2)',
        }}>
          {duplicateAttempts.length} Today
        </span>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 520 }}>
          <thead>
            <tr style={{ background: 'var(--bg-surface2)' }}>
              {['Person', 'Previous Visit', 'Current Attempt', 'Time Diff', 'Status'].map(h => (
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
            {duplicateAttempts.map((d, i) => (
              <motion.tr
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.04 }}
                style={{ borderBottom: '1px solid var(--border-subtle)' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                {/* Person */}
                <td style={{ padding: '11px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                      background: 'rgba(239,68,68,0.12)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'var(--accent-red)', fontSize: 13, fontWeight: 700,
                    }}>
                      {d.person[0]}
                    </div>
                    <div>
                      <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>{d.person}</p>
                      <p style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'monospace' }}>{d.id}</p>
                    </div>
                  </div>
                </td>

                <td style={{ padding: '11px 16px', fontSize: 12, color: 'var(--text-secondary)', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>
                  {d.prevVisit}
                </td>
                <td style={{ padding: '11px 16px', fontSize: 12, color: 'var(--text-secondary)', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>
                  {d.currVisit}
                </td>

                <td style={{ padding: '11px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--accent-amber)', fontSize: 12, fontWeight: 700 }}>
                    <MdTimer size={14} />
                    {d.diff}
                  </div>
                </td>

                <td style={{ padding: '11px 16px' }}>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: 5,
                    fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 99,
                    background: 'rgba(239,68,68,0.1)', color: 'var(--accent-red)',
                  }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ef4444', flexShrink: 0 }} />
                    {d.status}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
