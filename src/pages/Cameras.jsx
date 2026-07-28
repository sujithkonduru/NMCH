import { motion } from 'framer-motion';
import CameraStatus from '../components/dashboard/CameraStatus';

export default function Cameras() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>Camera Management</h1>
        <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Monitor all face recognition cameras</p>
      </motion.div>
      <CameraStatus />
    </div>
  );
}
