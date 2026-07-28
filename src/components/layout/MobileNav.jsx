import { NavLink } from 'react-router-dom';
import {
  MdDashboard, MdPeople, MdFoodBank, MdAnalytics,
  MdAutoAwesome, MdAssessment, MdVideocam, MdSettings,
} from 'react-icons/md';

const navItems = [
  { path: '/dashboard',         icon: MdDashboard,   label: 'Dashboard'   },
  { path: '/persons',           icon: MdPeople,      label: 'Persons'     },
  { path: '/food-distribution', icon: MdFoodBank,    label: 'Distribution'},
  { path: '/analytics',         icon: MdAnalytics,   label: 'Analytics'   },
  { path: '/predictions',       icon: MdAutoAwesome, label: 'Predictions' },
  { path: '/reports',           icon: MdAssessment,  label: 'Reports'     },
  { path: '/cameras',           icon: MdVideocam,    label: 'Cameras'     },
  { path: '/settings',          icon: MdSettings,    label: 'Settings'    },
];

export default function MobileNav() {
  return (
    <nav
      className="mobile-nav-strip"
      aria-label="Mobile navigation"
    >
      <div className="mobile-nav-scroll">
        {navItems.map(({ path, icon: Icon, label }) => (
          <NavLink
            key={path}
            to={path}
            style={{ textDecoration: 'none', flexShrink: 0 }}
          >
            {({ isActive }) => (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 4,
                  padding: '8px 14px',
                  borderRadius: 12,
                  cursor: 'pointer',
                  background: isActive ? 'rgba(59,130,246,0.12)' : 'transparent',
                  border: isActive ? '1px solid rgba(59,130,246,0.2)' : '1px solid transparent',
                  color: isActive ? 'var(--accent-blue)' : 'var(--text-muted)',
                  minWidth: 64,
                  transition: 'all 0.15s',
                }}
              >
                <Icon size={20} />
                <span style={{
                  fontSize: 10,
                  fontWeight: isActive ? 700 : 500,
                  whiteSpace: 'nowrap',
                  color: isActive ? 'var(--accent-blue)' : 'var(--text-muted)',
                }}>
                  {label}
                </span>
              </div>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
