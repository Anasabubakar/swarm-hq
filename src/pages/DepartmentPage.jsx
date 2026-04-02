import { useParams, useNavigate } from 'react-router-dom';
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
      <div className="max-w-7xl mx-auto px-6 py-12 text-center">
        <h2 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Department Not Found</h2>
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-4 py-2 rounded-md text-sm font-medium text-white"
          style={{ background: 'var(--text-primary)', border: 'none', cursor: 'pointer' }}
        >
          Back to Overview
        </button>
      </div>
    );
  }

  const activeCount = agents.filter(a => a.status === 'active').length;
  const idleCount = agents.filter(a => a.status === 'idle').length;
  const busyCount = agents.filter(a => a.status === 'busy').length;
  const offlineCount = agents.filter(a => a.status === 'offline').length;

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Back button */}
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-1 mb-6 text-sm hover:opacity-60 transition-opacity"
        style={{ color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}
      >
        ← Back
      </button>

      {/* Department Header */}
      <div className="mb-8 rounded-lg p-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
        <div className="flex items-center gap-4 mb-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold"
            style={{ background: meta.color + '15', color: meta.color }}
          >
            {meta.label.charAt(0)}
          </div>
          <div>
            <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
              {meta.label}
            </h2>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              {agents.length} agents
            </p>
          </div>
        </div>
        {/* Mini stats */}
        <div className="flex gap-4">
          <MiniStat label="Active" count={activeCount} color="var(--status-active)" />
          <MiniStat label="Idle" count={idleCount} color="var(--status-idle)" />
          <MiniStat label="Busy" count={busyCount} color="var(--status-busy)" />
          <MiniStat label="Offline" count={offlineCount} color="var(--status-offline)" />
        </div>
      </div>

      {/* Agent Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {agents.map((agent) => (
          <AgentCard key={agent.id} agent={agent} onClick={() => setSelectedAgent(agent)} />
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
    <div className="flex items-center gap-1.5">
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
      <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>{count}</span>
      <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{label}</span>
    </div>
  );
}
