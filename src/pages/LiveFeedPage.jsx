import { useState } from 'react';
import { motion } from 'framer-motion';
import LiveFeed from '../components/LiveFeed';
import { departmentMeta } from '../data/agents';

export default function LiveFeedPage() {
  const [filter, setFilter] = useState(null);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h2 className="text-3xl font-black mb-2" style={{ color: 'var(--text-primary)' }}>
          📡 Live Activity Feed
        </h2>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          Real-time agent activity across all departments. Hover to pause.
        </p>
      </motion.div>

      {/* Department Filter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <div className="flex flex-wrap gap-2">
          <FilterButton
            label="All Departments"
            emoji="🌐"
            isActive={!filter}
            onClick={() => setFilter(null)}
            color="#3b82f6"
          />
          {Object.entries(departmentMeta).map(([key, meta]) => (
            <FilterButton
              key={key}
              label={meta.label}
              emoji={meta.emoji}
              isActive={filter === key}
              onClick={() => setFilter(filter === key ? null : key)}
              color={meta.color}
            />
          ))}
        </div>
      </motion.div>

      {/* Feed */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <LiveFeed filterDept={filter} maxHeight="calc(100vh - 280px)" />
      </motion.div>
    </div>
  );
}

function FilterButton({ label, emoji, isActive, onClick, color }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
      style={{
        background: isActive ? `${color}22` : 'var(--bg-card)',
        border: `1px solid ${isActive ? color + '44' : 'var(--border-color)'}`,
        color: isActive ? color : 'var(--text-muted)',
      }}
    >
      <span className="mr-1">{emoji}</span>
      {label}
    </motion.button>
  );
}
