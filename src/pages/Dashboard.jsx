import { motion } from 'framer-motion';
import SummaryCards from '../components/dashboard/SummaryCards';
import LiveCharts from '../components/dashboard/LiveCharts';
import PredictionCard from '../components/dashboard/PredictionCard';
import RecognitionTable from '../components/dashboard/RecognitionTable';
import DuplicateDetection from '../components/dashboard/DuplicateDetection';
import CameraStatus from '../components/dashboard/CameraStatus';
import AIInsights from '../components/dashboard/AIInsights';

export default function Dashboard() {
  const now = new Date().toLocaleDateString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-xl font-extrabold" style={{ color: 'var(--text-primary)' }}>Admin Dashboard</h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>{now}</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl"
          style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}>
          <span className="live-dot" />
          <span className="text-xs font-bold" style={{ color: 'var(--accent-green)' }}>Live Updates</span>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <SummaryCards />

      {/* Live Charts */}
      <section>
        <h2 className="text-sm font-bold mb-3" style={{ color: 'var(--text-secondary)' }}>Live Analytics</h2>
        <LiveCharts />
      </section>

      {/* Prediction */}
      <section>
        <h2 className="text-sm font-bold mb-3" style={{ color: 'var(--text-secondary)' }}>AI Predictions</h2>
        <PredictionCard />
      </section>

      {/* Recognition Table */}
      <section>
        <h2 className="text-sm font-bold mb-3" style={{ color: 'var(--text-secondary)' }}>Face Recognition</h2>
        <RecognitionTable />
      </section>

      {/* Duplicate Detection */}
      <section>
        <h2 className="text-sm font-bold mb-3" style={{ color: 'var(--text-secondary)' }}>Duplicate Detection</h2>
        <DuplicateDetection />
      </section>

      {/* Camera Status */}
      <section>
        <h2 className="text-sm font-bold mb-3" style={{ color: 'var(--text-secondary)' }}>Camera Status</h2>
        <CameraStatus />
      </section>

      {/* AI Insights & Activities */}
      <section>
        <h2 className="text-sm font-bold mb-3" style={{ color: 'var(--text-secondary)' }}>AI Insights & Activities</h2>
        <AIInsights />
      </section>
    </div>
  );
}
