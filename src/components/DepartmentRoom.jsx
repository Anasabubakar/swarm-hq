import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function DepartmentRoom({ dept, stats, index }) {
  const navigate = useNavigate();
  const color = stats.color;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{ scale: 1.03, y: -8 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => navigate(`/department/${dept}`)}
      className="cursor-pointer rounded-2xl p-6 relative overflow-hidden group"
      style={{
        background: `linear-gradient(135deg, ${color}08 0%, var(--bg-card) 50%, var(--bg-secondary) 100%)`,
        border: `1px solid ${color}22`,
      }}
    >
      {/* Animated background glow */}
      <motion.div
        className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-20 blur-3xl"
        style={{ background: color }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Floor number badge */}
      <div
        className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
        style={{ background: `${color}22`, color }}
      >
        Floor {String(index + 1).padStart(2, '0')}
      </div>

      <div className="relative z-10">
        {/* Emoji + Name */}
        <div className="text-4xl mb-3">{stats.emoji}</div>
        <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
          {stats.label}
        </h3>
        <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
          {stats.total} agent{stats.total !== 1 ? 's' : ''}
        </p>

        {/* Status breakdown */}
        <div className="flex gap-3">
          <StatusPill label="Active" count={stats.active} color="#00ff88" />
          <StatusPill label="Idle" count={stats.idle} color="#ffcc00" />
          <StatusPill label="Busy" count={stats.busy} color="#ff4444" />
          <StatusPill label="Off" count={stats.offline} color="#555570" />
        </div>

        {/* Bar visualization */}
        <div className="mt-4 h-2 rounded-full overflow-hidden flex" style={{ background: 'var(--bg-primary)' }}>
          {stats.active > 0 && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(stats.active / stats.total) * 100}%` }}
              transition={{ duration: 1, delay: index * 0.05 }}
              className="h-full"
              style={{ background: '#00ff88' }}
            />
          )}
          {stats.idle > 0 && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(stats.idle / stats.total) * 100}%` }}
              transition={{ duration: 1, delay: index * 0.05 + 0.1 }}
              className="h-full"
              style={{ background: '#ffcc00' }}
            />
          )}
          {stats.busy > 0 && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(stats.busy / stats.total) * 100}%` }}
              transition={{ duration: 1, delay: index * 0.05 + 0.2 }}
              className="h-full"
              style={{ background: '#ff4444' }}
            />
          )}
          {stats.offline > 0 && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(stats.offline / stats.total) * 100}%` }}
              transition={{ duration: 1, delay: index * 0.05 + 0.3 }}
              className="h-full"
              style={{ background: '#555570' }}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
}

function StatusPill({ label, count, color }) {
  return (
    <div className="flex items-center gap-1">
      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color, boxShadow: `0 0 4px ${color}` }} />
      <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
        {count}
      </span>
    </div>
  );
}
