import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import AgentCard from '../components/AgentCard';
import AgentModal from '../components/AgentModal';
import { getAgentsByDept, departmentMeta } from '../data/agents';

export default function DepartmentPage() {
  const { dept } = useParams();
  const navigate = useNavigate();
  const [selectedAgent, setSelectedAgent] = useState(null);
  const agents = getAgentsByDept(dept);
  const meta = departmentMeta[dept];

  if (!meta) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <div className="text-6xl mb-4">🤷</div>
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Department Not Found</h2>
        <button onClick={() => navigate('/')} className="mt-4 px-6 py-2 rounded-xl text-sm font-semibold" style={{ background: '#3b82f6', color: '#fff' }}>
          Back to HQ
        </button>
      </div>
    );
  }

  const activeCount = agents.filter(a => a.status === 'active').length;
  const idleCount = agents.filter(a => a.status === 'idle').length;
  const busyCount = agents.filter(a => a.status === 'busy').length;
  const offlineCount = agents.filter(a => a.status === 'offline').length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Back button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate('/')}
        className="flex items-center gap-2 mb-6 text-sm font-medium hover:opacity-80 transition-opacity"
        style={{ color: 'var(--text-muted)' }}
      >
        ← Back to Office
      </motion.button>

      {/* Department Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 relative rounded-2xl p-6 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${meta.color}11 0%, var(--bg-card) 50%, var(--bg-secondary) 100%)`,
          border: `1px solid ${meta.color}22`,
        }}
      >
        <motion.div
          className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-20"
          style={{ background: meta.color }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-3">
            <span className="text-5xl">{meta.emoji}</span>
            <div>
              <h2 className="text-3xl font-black" style={{ color: 'var(--text-primary)' }}>
                {meta.label}
              </h2>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                {agents.length} agents on this floor
              </p>
            </div>
          </div>
          {/* Mini stats */}
          <div className="flex gap-4 mt-4">
            <MiniStat label="Active" count={activeCount} color="#00ff88" />
            <MiniStat label="Idle" count={idleCount} color="#ffcc00" />
            <MiniStat label="Busy" count={busyCount} color="#ff4444" />
            <MiniStat label="Offline" count={offlineCount} color="#555570" />
          </div>
        </div>
      </motion.div>

      {/* Agent Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {agents.map((agent, i) => (
          <motion.div
            key={agent.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
          >
            <AgentCard agent={agent} onClick={() => setSelectedAgent(agent)} />
          </motion.div>
        ))}
      </div>

      {/* Agent Modal */}
      <AgentModal
        agent={selectedAgent}
        isOpen={!!selectedAgent}
        onClose={() => setSelectedAgent(null)}
      />
    </div>
  );
}

function MiniStat({ label, count, color }) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: `${color}11`, border: `1px solid ${color}22` }}>
      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}` }} />
      <span className="text-xs font-semibold" style={{ color }}>{count}</span>
      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{label}</span>
    </div>
  );
}
