import { motion } from 'framer-motion';
import { MdSettings, MdSave, MdNotifications, MdSecurity, MdCameraAlt } from 'react-icons/md';
import { useAuth } from '../context/AuthContext';

const panelStyle = {
  background: 'var(--card-bg)', border: '1px solid var(--border)',
  borderRadius: 16, padding: 20, boxShadow: 'var(--shadow-sm)',
};

const labelStyle = {
  display: 'block', fontSize: 12, fontWeight: 700,
  color: 'var(--text-secondary)', marginBottom: 6,
};

const inputStyle = {
  width: '100%', padding: '10px 12px', borderRadius: 10,
  fontSize: 13, background: 'var(--input-bg)',
  border: '1px solid var(--border)', color: 'var(--text-primary)', outline: 'none',
};

const PanelTitle = ({ icon: Icon, label }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
    <Icon size={18} style={{ color: 'var(--accent-blue)', flexShrink: 0 }} />
    <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{label}</h3>
  </div>
);

const SaveBtn = ({ icon: Icon, label, color = 'blue' }) => {
  const bg = color === 'green'
    ? 'linear-gradient(135deg,#10b981,#059669)'
    : color === 'dark'
    ? '#1e293b'
    : 'linear-gradient(135deg,#3b82f6,#1d4ed8)';
  return (
    <button
      style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '10px 18px', borderRadius: 10, border: 'none', cursor: 'pointer',
        background: bg, color: '#fff', fontSize: 13, fontWeight: 700, marginTop: 8,
      }}
      onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
      onMouseLeave={e => e.currentTarget.style.opacity = '1'}
    >
      <Icon size={16} /> {label}
    </button>
  );
};

export default function Settings() {
  const { user } = useAuth();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>Settings</h1>
        <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>System configuration and preferences</p>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="settings-grid">

        {/* Profile */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }} style={panelStyle}>
          <PanelTitle icon={MdSettings} label="Profile Settings" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { label: 'Full Name', value: user?.name  || 'Admin User',         type: 'text' },
              { label: 'Email',     value: user?.email || 'admin@canteen.com',   type: 'email' },
              { label: 'Role',      value: user?.role  || 'Admin',               type: 'text' },
            ].map((f, i) => (
              <div key={i}>
                <label style={labelStyle}>{f.label}</label>
                <input type={f.type} defaultValue={f.value} style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'var(--accent-blue)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
              </div>
            ))}
            <SaveBtn icon={MdSave} label="Save Changes" color="blue" />
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.07 }} style={panelStyle}>
          <PanelTitle icon={MdNotifications} label="Notifications" />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {[
              { label: 'Duplicate detection alerts',    checked: true  },
              { label: 'Unknown person alerts',         checked: true  },
              { label: 'Camera offline alerts',         checked: true  },
              { label: 'Daily summary reports',         checked: false },
              { label: 'Prediction confidence alerts',  checked: true  },
            ].map((item, i, arr) => (
              <div
                key={i}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '11px 0',
                  borderBottom: i < arr.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                }}
              >
                <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{item.label}</span>
                {/* Custom toggle */}
                <label style={{ position: 'relative', display: 'inline-block', width: 38, height: 22, cursor: 'pointer', flexShrink: 0 }}>
                  <input
                    type="checkbox"
                    defaultChecked={item.checked}
                    style={{ opacity: 0, width: 0, height: 0, position: 'absolute' }}
                    onChange={e => {
                      const track = e.target.nextSibling;
                      track.style.background = e.target.checked ? 'var(--accent-blue)' : 'var(--border)';
                      track.children[0].style.transform = e.target.checked ? 'translateX(16px)' : 'translateX(0)';
                    }}
                  />
                  <span style={{
                    position: 'absolute', inset: 0, borderRadius: 99,
                    background: item.checked ? 'var(--accent-blue)' : 'var(--border)',
                    transition: 'background 0.2s',
                  }}>
                    <span style={{
                      position: 'absolute', top: 3, left: 3,
                      width: 16, height: 16, borderRadius: '50%',
                      background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                      transition: 'transform 0.2s',
                      transform: item.checked ? 'translateX(16px)' : 'translateX(0)',
                    }} />
                  </span>
                </label>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Security */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} style={panelStyle}>
          <PanelTitle icon={MdSecurity} label="Security" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {['Current Password', 'New Password', 'Confirm New Password'].map((lbl, i) => (
              <div key={i}>
                <label style={labelStyle}>{lbl}</label>
                <input type="password" placeholder="••••••••" style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'var(--accent-blue)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
              </div>
            ))}
            <SaveBtn icon={MdSecurity} label="Update Password" color="dark" />
          </div>
        </motion.div>

        {/* Camera & Recognition */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }} style={panelStyle}>
          <PanelTitle icon={MdCameraAlt} label="Camera & Recognition" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { label: 'Recognition Confidence Threshold (%)', type: 'number', value: 85,  min: 50,  max: 100 },
              { label: 'Duplicate Detection Interval (min)',   type: 'number', value: 30,  min: 1    },
              { label: 'Max Recognition Attempts',            type: 'number', value: 3,   min: 1    },
            ].map((f, i) => (
              <div key={i}>
                <label style={labelStyle}>{f.label}</label>
                <input
                  type={f.type}
                  defaultValue={f.value}
                  min={f.min}
                  max={f.max}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'var(--accent-blue)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
              </div>
            ))}
            <SaveBtn icon={MdSave} label="Save Config" color="green" />
          </div>
        </motion.div>

      </div>
    </div>
  );
}
