import { motion } from 'framer-motion';
import { getOverallStats } from '../data/agents';

const stats = getOverallStats();

export default function StatsBar() {
  const items = [
    { label: 'Total Agents', value: stats.total, icon: '🤖', color: '#3b82f6' },
    { label: 'Active', value: stats.active, icon: '🟢', color: '#00ff88' },
    { label: 'Idle', value: stats.idle, icon: '🟡', color: '#ffcc00' },
    { label: 'Busy', value: stats.busy, icon: '🔴', color: '#ff4444' },
    { label: 'Offline', value: stats.offline, icon: '⚫', color: '#555570' },
    { label: 'Departments', value: stats.departments, icon: '🏢', color: '#a855f7' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
      {items.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          className="rounded-xl p-4 text-center relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-secondary) 100%)',
            border: `1px solid ${item.color}22`,
          }}
        >
          <motion.div
            className="absolute -top-4 -right-4 w-16 h-16 rounded-full blur-2xl opacity-20"
            style={{ background: item.color }}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="relative z-10">
            <div className="text-2xl mb-1">{item.icon}</div>
            <motion.div
              className="text-3xl font-black"
              style={{ color: item.color }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.08 + 0.2, type: 'spring', stiffness: 200 }}
            >
              {item.value}
            </motion.div>
            <div className="text-xs font-medium mt-1" style={{ color: 'var(--text-muted)' }}>
              {item.label}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
