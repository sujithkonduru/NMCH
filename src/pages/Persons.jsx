import { motion } from 'framer-motion';
import { MdPersonAdd, MdSearch, MdFilterList } from 'react-icons/md';

const persons = [
  { id: 'EMP001', name: 'Rahul Sharma', dept: 'Engineering', meals: 45, status: 'active'   },
  { id: 'EMP002', name: 'Priya Singh',  dept: 'Marketing',   meals: 42, status: 'active'   },
  { id: 'EMP003', name: 'Amit Kumar',   dept: 'Finance',     meals: 38, status: 'active'   },
  { id: 'EMP004', name: 'Sneha Patel',  dept: 'HR',          meals: 50, status: 'active'   },
  { id: 'EMP005', name: 'Vikram Nair',  dept: 'Engineering', meals: 30, status: 'active'   },
  { id: 'EMP006', name: 'Anita Rao',    dept: 'Operations',  meals: 44, status: 'active'   },
  { id: 'EMP007', name: 'Ravi Verma',   dept: 'Logistics',   meals: 35, status: 'inactive' },
  { id: 'EMP008', name: 'Meera Joshi',  dept: 'Engineering', meals: 48, status: 'active'   },
];

export default function Persons() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}
      >
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>Persons</h1>
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Manage registered personnel</p>
        </div>
        <button
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '10px 18px', borderRadius: 12, border: 'none', cursor: 'pointer',
            background: 'linear-gradient(135deg,#3b82f6,#1d4ed8)',
            color: '#fff', fontSize: 13, fontWeight: 700,
            boxShadow: '0 4px 14px rgba(59,130,246,0.35)',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          <MdPersonAdd size={18} /> Add Person
        </button>
      </motion.div>

      {/* Table card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: 'var(--card-bg)', border: '1px solid var(--border)',
          borderRadius: 16, boxShadow: 'var(--shadow-sm)', overflow: 'hidden',
        }}
      >
        {/* Toolbar */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, padding: '14px 20px',
          borderBottom: '1px solid var(--border)', flexWrap: 'wrap',
        }}>
          <div style={{ position: 'relative', flex: '1 1 200px', maxWidth: 320 }}>
            <MdSearch size={15} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
            <input
              placeholder="Search by name or ID..."
              style={{
                width: '100%', paddingLeft: 30, paddingRight: 12,
                paddingTop: 8, paddingBottom: 8, borderRadius: 10,
                fontSize: 13, background: 'var(--input-bg)',
                border: '1px solid var(--border)', color: 'var(--text-primary)', outline: 'none',
              }}
            />
          </div>
          <button
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '8px 14px', borderRadius: 10, cursor: 'pointer',
              background: 'var(--bg-surface2)', border: '1px solid var(--border)',
              color: 'var(--text-secondary)', fontSize: 12, fontWeight: 600,
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--bg-surface2)'}
          >
            <MdFilterList size={15} /> Filter
          </button>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 560 }}>
            <thead>
              <tr style={{ background: 'var(--bg-surface2)' }}>
                {['Person', 'ID', 'Department', 'Meals This Month', 'Status', 'Actions'].map(h => (
                  <th key={h} style={{
                    textAlign: 'left', padding: '10px 16px',
                    fontSize: 10, fontWeight: 700, letterSpacing: '0.06em',
                    textTransform: 'uppercase', color: 'var(--text-muted)', whiteSpace: 'nowrap',
                  }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {persons.map((p, i) => (
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
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{
                        width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
                        background: 'linear-gradient(135deg,#3b82f6,#6366f1)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#fff', fontSize: 12, fontWeight: 700,
                      }}>
                        {p.name[0]}
                      </div>
                      <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{p.name}</p>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 12, color: 'var(--text-muted)', fontFamily: 'monospace' }}>{p.id}</td>
                  <td style={{ padding: '12px 16px', fontSize: 12, color: 'var(--text-secondary)' }}>{p.dept}</td>
                  <td style={{ padding: '12px 16px', fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{p.meals}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{
                      fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 99,
                      background: p.status === 'active' ? 'rgba(16,185,129,0.1)' : 'var(--bg-surface2)',
                      color:      p.status === 'active' ? 'var(--accent-green)'   : 'var(--text-muted)',
                      border:     p.status === 'active' ? '1px solid rgba(16,185,129,0.2)' : '1px solid var(--border)',
                      textTransform: 'capitalize',
                    }}>
                      {p.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <button style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent-blue)', background: 'none', border: 'none', cursor: 'pointer' }}>Edit</button>
                      <button style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent-red)',  background: 'none', border: 'none', cursor: 'pointer' }}>Delete</button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
