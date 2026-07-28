import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MdAssessment, MdFileDownload, MdTableChart,
  MdCalendarToday, MdGridOn, MdCheckCircle,
} from 'react-icons/md';
import { exportExcel, exportPDF } from '../utils/exportUtils';

const reports = [
  {
    key: 'daily',
    title: 'Daily Report',
    desc: "Today's complete distribution summary",
    date: 'July 28, 2026',
    records: 892,
    sheets: ['Distribution', 'Duplicates', 'Summary'],
  },
  {
    key: 'weekly',
    title: 'Weekly Report',
    desc: "This week's meal distribution",
    date: 'July 21–28, 2026',
    records: 6230,
    sheets: ['Daily Trend', 'Duplicates', 'Summary'],
  },
  {
    key: 'monthly',
    title: 'Monthly Report',
    desc: 'Full month analytics & metrics',
    date: 'July 2026',
    records: 27450,
    sheets: ['Monthly Metrics', 'Duplicates', 'Summary'],
  },
];

const historyRows = [
  { name: 'Daily Report – Jul 28',  gen: '28 Jul 2026  09:00 AM', period: '28 Jul 2026', records: 892,   key: 'daily'   },
  { name: 'Weekly Report – Wk 30',  gen: '27 Jul 2026  11:00 PM', period: 'Jul 21–27',   records: 5890,  key: 'weekly'  },
  { name: 'Monthly Report – Jun',   gen: '01 Jul 2026  01:00 AM', period: 'June 2026',    records: 25340, key: 'monthly' },
];

const cardStyle = {
  background: 'var(--card-bg)',
  border: '1px solid var(--border)',
  borderRadius: 16,
  padding: 20,
  boxShadow: 'var(--shadow-sm)',
};

export default function Reports() {
  // Track loading state per report+format: e.g. { 'daily-pdf': true }
  const [loading, setLoading] = useState({});
  const [done, setDone] = useState({});

  const handleExport = async (key, format) => {
    const id = `${key}-${format}`;
    setLoading(p => ({ ...p, [id]: true }));
    setDone(p => ({ ...p, [id]: false }));
    try {
      // Let React paint the loading state before the sync export runs
      await new Promise(r => setTimeout(r, 80));
      if (format === 'excel') exportExcel(key);
      else exportPDF(key);
      setDone(p => ({ ...p, [id]: true }));
      setTimeout(() => setDone(p => ({ ...p, [id]: false })), 3000);
    } catch (err) {
      console.error('Export error:', err);
      alert(`Export failed: ${err.message}`);
    } finally {
      setLoading(p => ({ ...p, [id]: false }));
    }
  };

  const ExportBtn = ({ reportKey, format, label, icon: Icon, bg, color, border, hoverBg }) => {
    const id = `${reportKey}-${format}`;
    const isLoading = loading[id];
    const isDone    = done[id];
    return (
      <button
        onClick={() => handleExport(reportKey, format)}
        disabled={isLoading}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          padding: '9px 0', borderRadius: 10, cursor: isLoading ? 'wait' : 'pointer',
          fontSize: 12, fontWeight: 700, border,
          background: isDone ? 'rgba(16,185,129,0.12)' : bg,
          color: isDone ? 'var(--accent-green)' : color,
          opacity: isLoading ? 0.7 : 1,
          transition: 'background 0.2s, color 0.2s',
        }}
        onMouseEnter={e => { if (!isLoading && !isDone) e.currentTarget.style.background = hoverBg; }}
        onMouseLeave={e => { if (!isLoading && !isDone) e.currentTarget.style.background = isDone ? 'rgba(16,185,129,0.12)' : bg; }}
      >
        {isLoading ? (
          <>
            <svg style={{ animation: 'spin 0.7s linear infinite', width: 14, height: 14, flexShrink: 0 }} viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3"/>
              <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
            </svg>
            Exporting…
          </>
        ) : isDone ? (
          <><MdCheckCircle size={15} /> Downloaded!</>
        ) : (
          <><Icon size={15} /> {label}</>
        )}
      </button>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* Page header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>Reports</h1>
        <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
          Generate and download distribution reports as PDF or Excel (.xlsx)
        </p>
      </motion.div>

      {/* Report cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }} className="reports-grid">
        {reports.map((r, i) => (
          <motion.div
            key={r.key}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            style={cardStyle}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                background: 'linear-gradient(135deg,#3b82f6,#1d4ed8)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <MdAssessment style={{ color: '#fff', fontSize: 20 }} />
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{r.title}</p>
                <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>{r.desc}</p>
              </div>
            </div>

            {/* Meta chips */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
              {[
                { icon: MdCalendarToday, label: 'Period',  value: r.date },
                { icon: MdTableChart,    label: 'Records', value: r.records.toLocaleString() },
              ].map((m, j) => (
                <div key={j} style={{
                  borderRadius: 10, padding: '9px 12px',
                  background: 'var(--bg-surface2)', border: '1px solid var(--border-subtle)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 3 }}>
                    <m.icon size={10} style={{ color: 'var(--text-muted)' }} />
                    <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{m.label}</span>
                  </div>
                  <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>{m.value}</p>
                </div>
              ))}
            </div>

            {/* Sheets included */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 14 }}>
              {r.sheets.map(s => (
                <span key={s} style={{
                  fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 6,
                  background: 'rgba(59,130,246,0.08)', color: 'var(--accent-blue)',
                  border: '1px solid rgba(59,130,246,0.18)',
                }}>
                  {s}
                </span>
              ))}
            </div>

            {/* Export buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <ExportBtn
                reportKey={r.key} format="pdf" label="Export PDF"
                icon={MdFileDownload}
                bg="rgba(239,68,68,0.08)" color="var(--accent-red)"
                border="1px solid rgba(239,68,68,0.2)"
                hoverBg="rgba(239,68,68,0.14)"
              />
              <ExportBtn
                reportKey={r.key} format="excel" label="Export Excel"
                icon={MdGridOn}
                bg="rgba(16,185,129,0.08)" color="var(--accent-green)"
                border="1px solid rgba(16,185,129,0.2)"
                hoverBg="rgba(16,185,129,0.14)"
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* History table */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ ...cardStyle, padding: 0, overflow: 'hidden' }}
      >
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 20px', borderBottom: '1px solid var(--border)',
        }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>Report History</h3>
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Click PDF or Excel to re-download</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 580 }}>
            <thead>
              <tr style={{ background: 'var(--bg-surface2)' }}>
                {['Report Name', 'Generated On', 'Period', 'Records', 'Status', 'Download'].map(h => (
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
              {historyRows.map((row, i) => (
                <tr
                  key={i}
                  style={{ borderBottom: '1px solid var(--border-subtle)' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={{ padding: '12px 16px', fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>{row.name}</td>
                  <td style={{ padding: '12px 16px', fontSize: 12, color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{row.gen}</td>
                  <td style={{ padding: '12px 16px', fontSize: 12, color: 'var(--text-secondary)' }}>{row.period}</td>
                  <td style={{ padding: '12px 16px', fontSize: 12, color: 'var(--text-secondary)', fontFamily: 'monospace' }}>
                    {row.records.toLocaleString()}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{
                      fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 99,
                      background: 'rgba(16,185,129,0.1)', color: 'var(--accent-green)',
                      border: '1px solid rgba(16,185,129,0.2)',
                    }}>
                      Ready
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <button
                        onClick={() => handleExport(row.key, 'pdf')}
                        disabled={loading[`${row.key}-pdf`]}
                        style={{
                          fontSize: 12, fontWeight: 700, color: 'var(--accent-red)',
                          background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                          opacity: loading[`${row.key}-pdf`] ? 0.5 : 1,
                        }}
                      >
                        {loading[`${row.key}-pdf`] ? '…' : done[`${row.key}-pdf`] ? '✓ PDF' : 'PDF'}
                      </button>
                      <button
                        onClick={() => handleExport(row.key, 'excel')}
                        disabled={loading[`${row.key}-excel`]}
                        style={{
                          fontSize: 12, fontWeight: 700, color: 'var(--accent-green)',
                          background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                          opacity: loading[`${row.key}-excel`] ? 0.5 : 1,
                        }}
                      >
                        {loading[`${row.key}-excel`] ? '…' : done[`${row.key}-excel`] ? '✓ Excel' : 'Excel'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
