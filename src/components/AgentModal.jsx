import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

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

export default function AgentModal({ agent, isOpen, onClose }) {
  const [showAssign, setShowAssign] = useState(false);
  const navigate = useNavigate();
  const glowColor = statusColors[agent?.status] || '#555570';

  if (!agent) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50"
            style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-lg z-50 rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-secondary) 100%)',
              border: `1px solid ${glowColor}33`,
              boxShadow: `0 0 60px ${glowColor}22`,
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
          >
            {/* Header glow */}
            <div className="absolute top-0 left-0 right-0 h-1" style={{ background: glowColor }} />

            <div className="p-6">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-sm"
                style={{ background: 'var(--bg-primary)', color: 'var(--text-muted)' }}
              >
                ✕
              </button>

              {/* Avatar */}
              <div className="text-center mb-4">
                <motion.div
                  className="text-7xl mb-3 inline-block"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  {agent.avatar}
                </motion.div>
                <h2 className="text-2xl font-black" style={{ color: 'var(--text-primary)' }}>
                  {agent.name}
                </h2>
                <button
                  onClick={() => { onClose(); navigate(`/department/${agent.department}`); }}
                  className="mt-1 text-sm hover:underline"
                  style={{ color: agent.departmentMeta.color }}
                >
                  {agent.departmentMeta.emoji} {agent.departmentMeta.label} Department
                </button>
              </div>

              {/* Status */}
              <div className="flex justify-center mb-5">
                <div
                  className="flex items-center gap-2 px-4 py-2 rounded-full"
                  style={{
                    background: `${glowColor}15`,
                    border: `1px solid ${glowColor}33`,
                  }}
                >
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: glowColor,
                      boxShadow: `0 0 10px ${glowColor}`,
                      animation: agent.status === 'active' ? 'pulse-glow 2s infinite' : 'none',
                    }}
                  />
                  <span className="text-sm font-semibold" style={{ color: glowColor }}>
                    {statusLabels[agent.status]}
                  </span>
                </div>
              </div>

              {/* Current Task */}
              <div className="rounded-xl p-4 mb-4" style={{ background: 'var(--bg-primary)' }}>
                <div className="text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                  Current Task
                </div>
                <p className="text-sm mb-3" style={{ color: 'var(--text-primary)' }}>
                  {agent.task}
                </p>
                {agent.status !== 'offline' && (
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span style={{ color: 'var(--text-muted)' }}>Progress</span>
                      <span style={{ color: glowColor }}>{agent.progress}%</span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
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

              {/* Task History */}
              <div className="rounded-xl p-4 mb-4" style={{ background: 'var(--bg-primary)' }}>
                <div className="text-xs font-semibold mb-3 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                  Recent Task History
                </div>
                <div className="space-y-2">
                  {agent.taskHistory.map((h, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="mt-0.5 text-xs">
                        {h.completed ? '✅' : '⏳'}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm truncate" style={{ color: 'var(--text-primary)' }}>
                          {h.task}
                        </p>
                        <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
                          {h.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Timeline */}
              <div className="rounded-xl p-4 mb-4" style={{ background: 'var(--bg-primary)' }}>
                <div className="text-xs font-semibold mb-3 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                  Agent Info
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-xs block" style={{ color: 'var(--text-muted)' }}>Joined</span>
                    <span style={{ color: 'var(--text-primary)' }}>{agent.joinedDate}</span>
                  </div>
                  <div>
                    <span className="text-xs block" style={{ color: 'var(--text-muted)' }}>Agent ID</span>
                    <span style={{ color: 'var(--text-primary)' }} className="font-mono text-xs">{agent.id}</span>
                  </div>
                </div>
              </div>

              {/* Assign Task Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowAssign(!showAssign)}
                className="w-full py-3 rounded-xl font-semibold text-sm"
                style={{
                  background: `linear-gradient(135deg, ${agent.departmentMeta.color}33, ${agent.departmentMeta.color}11)`,
                  border: `1px solid ${agent.departmentMeta.color}44`,
                  color: agent.departmentMeta.color,
                }}
              >
                📋 Assign New Task
              </motion.button>

              <AnimatePresence>
                {showAssign && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 rounded-xl p-4"
                    style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}
                  >
                    <p className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>
                      Task assignment (demo UI)
                    </p>
                    <input
                      type="text"
                      placeholder="Describe the task..."
                      className="w-full rounded-lg px-3 py-2 text-sm mb-2 outline-none"
                      style={{
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border-color)',
                        color: 'var(--text-primary)',
                      }}
                    />
                    <div className="flex gap-2">
                      <select
                        className="flex-1 rounded-lg px-3 py-2 text-sm outline-none"
                        style={{
                          background: 'var(--bg-secondary)',
                          border: '1px solid var(--border-color)',
                          color: 'var(--text-primary)',
                        }}
                      >
                        <option>Low Priority</option>
                        <option>Medium Priority</option>
                        <option>High Priority</option>
                        <option>Critical</option>
                      </select>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 rounded-lg text-sm font-semibold"
                        style={{
                          background: agent.departmentMeta.color,
                          color: '#fff',
                        }}
                      >
                        Assign
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
