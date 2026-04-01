import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const statusColors = {
  active: '#00ff88',
  idle: '#ffcc00',
  busy: '#ff4444',
  offline: '#555570',
};

const statusLabels = {
  active: 'Active',
  idle: 'Idle',
  busy: 'Busy',
  offline: 'Offline',
};

export default function AgentCard({ agent, onClick, compact = false }) {
  const navigate = useNavigate();
  const glowColor = statusColors[agent.status];

  const handleClick = () => {
    if (onClick) onClick(agent);
    else navigate(`/agent/${agent.id}`);
  };

  if (compact) {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05, y: -4 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleClick}
        className="cursor-pointer rounded-xl p-3 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-secondary) 100%)',
          border: `1px solid ${glowColor}22`,
          boxShadow: `0 0 20px ${glowColor}11`,
        }}
      >
        <div className="flex items-center gap-3">
          <div className="text-2xl relative">
            {agent.avatar}
            <span
              className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2"
              style={{
                backgroundColor: glowColor,
                borderColor: 'var(--bg-card)',
                boxShadow: `0 0 8px ${glowColor}`,
              }}
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold truncate" style={{ color: 'var(--text-primary)' }}>
              {agent.name}
            </p>
            <p className="text-xs truncate" style={{ color: 'var(--text-secondary)' }}>
              {agent.task}
            </p>
          </div>
        </div>
        {agent.status !== 'offline' && (
          <div className="mt-2">
            <div className="h-1 rounded-full overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${agent.progress}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${glowColor}88, ${glowColor})` }}
              />
            </div>
          </div>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03, y: -6 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      className="cursor-pointer rounded-2xl p-5 relative overflow-hidden group"
      style={{
        background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-secondary) 100%)',
        border: `1px solid ${glowColor}22`,
        boxShadow: `0 0 30px ${glowColor}11`,
      }}
    >
      {/* Animated glow background */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${glowColor}08, transparent 70%)`,
        }}
      />

      {/* Status bar top */}
      <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: glowColor, opacity: 0.6 }} />

      <div className="relative z-10">
        {/* Avatar & Status */}
        <div className="flex items-start justify-between mb-3">
          <motion.div
            className="text-4xl"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            {agent.avatar}
          </motion.div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
            style={{
              background: `${glowColor}15`,
              color: glowColor,
              border: `1px solid ${glowColor}33`,
            }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor: glowColor,
                boxShadow: `0 0 6px ${glowColor}`,
                animation: agent.status === 'active' ? 'pulse-glow 2s infinite' : 'none',
              }}
            />
            {statusLabels[agent.status]}
          </div>
        </div>

        {/* Name */}
        <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
          {agent.name}
        </h3>

        {/* Department badge */}
        <div
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs mb-3"
          style={{
            background: `${agent.departmentMeta.color}15`,
            color: agent.departmentMeta.color,
          }}
        >
          {agent.departmentMeta.emoji} {agent.departmentMeta.label}
        </div>

        {/* Current Task */}
        <p className="text-sm mb-3 line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
          {agent.task}
        </p>

        {/* Progress Bar */}
        {agent.status !== 'offline' && (
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span style={{ color: 'var(--text-muted)' }}>Progress</span>
              <span style={{ color: glowColor }}>{agent.progress}%</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${agent.progress}%` }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${glowColor}66, ${glowColor})`,
                  boxShadow: `0 0 10px ${glowColor}44`,
                }}
              />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
