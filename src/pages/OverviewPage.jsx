import { motion } from 'framer-motion';
import StatsBar from '../components/StatsBar';
import DepartmentRoom from '../components/DepartmentRoom';
import LiveFeed from '../components/LiveFeed';
import { getDepartmentStats } from '../data/agents';

const deptStats = getDepartmentStats();

export default function OverviewPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-black mb-2" style={{ color: 'var(--text-primary)' }}>
          🏢 Office Overview
        </h2>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          Welcome to Agent Swarm HQ — your AI workforce at a glance
        </p>
      </motion.div>

      {/* Stats Bar */}
      <StatsBar />

      {/* Department Rooms */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
          <span>🏢</span> Department Floors
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
          {Object.entries(deptStats).map(([key, stats], index) => (
            <DepartmentRoom key={key} dept={key} stats={stats} index={index} />
          ))}
        </div>
      </motion.div>

      {/* Live Activity Feed */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
          <span>📡</span> Live Activity
        </h3>
        <LiveFeed maxHeight="350px" />
      </motion.div>
    </div>
  );
}
