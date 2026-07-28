import { motion } from 'framer-motion';
import { MdVideocam, MdVideocamOff } from 'react-icons/md';
import { cameras } from '../../data/mockData';

export default function CameraStatus() {
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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <MdVideocam size={19} style={{ color: 'var(--accent-blue)', flexShrink: 0 }} />
          <h3 style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>Camera Status</h3>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 600, color: 'var(--accent-green)' }}>
            <span className="live-dot" style={{ width: 7, height: 7 }} />
            {cameras.filter(c => c.status === 'online').length} Online
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 600, color: 'var(--accent-red)' }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#ef4444', display: 'inline-block' }} />
            {cameras.filter(c => c.status === 'offline').length} Offline
          </span>
        </div>
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }} className="camera-grid">
        {cameras.map((cam, i) => {
          const on = cam.status === 'online';
          return (
            <motion.div
              key={cam.id}
              initial={{ opacity: 0, scale: 0.93 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06 }}
              style={{
                borderRadius: 14, padding: 12,
                background: on ? 'rgba(16,185,129,0.06)' : 'rgba(239,68,68,0.05)',
                border: `1px solid ${on ? 'rgba(16,185,129,0.18)' : 'rgba(239,68,68,0.18)'}`,
              }}
            >
              {/* Preview placeholder */}
              <div style={{
                width: '100%', aspectRatio: '16/9',
                borderRadius: 10, marginBottom: 10,
                background: on ? '#060c1a' : 'var(--bg-surface2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative', overflow: 'hidden',
              }}>
                {on ? (
                  <>
                    {/* grid overlay */}
                    <div style={{
                      position: 'absolute', inset: 0, opacity: 0.08,
                      backgroundImage: 'linear-gradient(rgba(96,165,250,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,0.8) 1px, transparent 1px)',
                      backgroundSize: '18px 18px',
                    }} />
                    <div style={{ position: 'relative' }}>
                      <MdVideocam size={24} style={{ color: '#60a5fa' }} />
                      <motion.div
                        style={{ position: 'absolute', top: -3, right: -3, width: 10, height: 10, borderRadius: '50%', background: '#4ade80' }}
                        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1.4, repeat: Infinity }}
                      />
                    </div>
                    <div className="scan-line" />
                  </>
                ) : (
                  <MdVideocamOff size={24} style={{ color: 'var(--text-muted)' }} />
                )}
              </div>

              <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: 2 }}>
                {cam.name}
              </p>
              <p style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 8 }}>{cam.location}</p>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, fontWeight: 700, color: on ? 'var(--accent-green)' : 'var(--accent-red)' }}>
                  {on
                    ? <span className="live-dot" style={{ width: 6, height: 6 }} />
                    : <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ef4444', display: 'inline-block' }} />
                  }
                  {on ? 'Online' : 'Offline'}
                </span>
                {on && (
                  <span style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'monospace' }}>{cam.fps} fps</span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
