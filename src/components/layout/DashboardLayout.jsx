import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import MobileNav from './MobileNav';

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      overflow: 'hidden',
      position: 'relative',
      backgroundColor: 'var(--bg-base)',
    }}>
      {/* Ambient orbs */}
      <div className="orb orb-1" aria-hidden="true" />
      <div className="orb orb-2" aria-hidden="true" />
      <div className="orb orb-3" aria-hidden="true" />

      {/* Desktop sidebar — hidden on mobile via CSS */}
      <div className="desktop-sidebar">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>

      {/* Main column */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        overflow: 'hidden',
        position: 'relative',
        zIndex: 10,
        minWidth: 0,
      }}>
        <Topbar setSidebarCollapsed={setCollapsed} />

        {/* Mobile top nav strip — visible only on mobile */}
        <MobileNav />

        <main style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px 16px',
          /* bottom padding so content isn't hidden behind mobile bottom bar */
          paddingBottom: 'calc(20px + env(safe-area-inset-bottom, 0px))',
        }} className="main-content">
          <div style={{ maxWidth: 1400, margin: '0 auto' }}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
