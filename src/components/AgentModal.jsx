import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const statusColors = {
  active: 'var(--status-active)',
  idle: 'var(--status-idle)',
  busy: 'var(--status-busy)',
  offline: 'var(--status-offline)',
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

  if (!agent || !isOpen) return null;

  const color = statusColors[agent.status];

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-50"
        style={{ background: 'rgba(0,0,0,0.3)' }}
      />

      {/* Modal */}
      <div
        className="fixed inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-md z-50 rounded-xl overflow-hidden"
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
        }}
      >
        <div className="p-6">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-7 h-7 rounded-md flex items-center justify-center text-sm hover:bg-gray-100 transition-colors"
            style={{ color: 'var(--text-muted)' }}
          >
            ✕
          </button>

          {/* Avatar & Name */}
          <div className="text-center mb-5">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-semibold mx-auto mb-3"
              style={{ background: agent.departmentMeta.color + '15', color: agent.departmentMeta.color }}
            >
              {agent.name.charAt(0)}
            </div>
            <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
              {agent.name}
            </h2>
            <button
              onClick={() => { onClose(); navigate(`/department/${agent.department}`); }}
              className="mt-1 text-xs hover:underline"
              style={{ color: agent.departmentMeta.color, background: 'none', border: 'none', cursor: 'pointer' }}
            >
              {agent.departmentMeta.label} Department
            </button>
          </div>

          {/* Status */}
          <div className="flex justify-center mb-5">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-md" style={{ background: 'var(--bg-secondary)' }}>
              <span className="w-2 h-2 rounded-full" style={{ background: color }} />
              <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                {statusLabels[agent.status]}
              </span>
            </div>
          </div>

          {/* Current Task */}
          <div className="rounded-lg p-4 mb-4" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
            <div className="text-[10px] font-semibold mb-2 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
              Current Task
            </div>
            <p className="text-sm mb-3" style={{ color: 'var(--text-primary)' }}>
              {agent.task}
            </p>
            {agent.status !== 'offline' && (
              <div>
                <div className="flex justify-between text-[10px] mb-1">
                  <span style={{ color: 'var(--text-muted)' }}>Progress</span>
                  <span style={{ color: 'var(--text-muted)' }}>{agent.progress}%</span>
                </div>
                <div className="h-1 rounded-full overflow-hidden" style={{ background: 'var(--border-color)' }}>
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${agent.progress}%`, background: color }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Task History */}
          <div className="rounded-lg p-4 mb-4" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
            <div className="text-[10px] font-semibold mb-3 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
              Recent Task History
            </div>
            <div className="space-y-2.5">
              {agent.taskHistory.map((h, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span
                    className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: h.completed ? 'var(--status-active)' : 'var(--status-idle)' }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs truncate" style={{ color: 'var(--text-primary)' }}>
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

          {/* Agent Info */}
          <div className="rounded-lg p-4 mb-4" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
            <div className="text-[10px] font-semibold mb-3 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
              Agent Info
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-[10px] block" style={{ color: 'var(--text-muted)' }}>Joined</span>
                <span className="text-xs" style={{ color: 'var(--text-primary)' }}>{agent.joinedDate}</span>
              </div>
              <div>
                <span className="text-[10px] block" style={{ color: 'var(--text-muted)' }}>Agent ID</span>
                <span className="text-xs font-mono" style={{ color: 'var(--text-primary)' }}>{agent.id}</span>
              </div>
            </div>
          </div>

          {/* Assign Task Button */}
          <button
            onClick={() => setShowAssign(!showAssign)}
            className="w-full py-2.5 rounded-lg font-medium text-sm hover:opacity-80 transition-opacity"
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
            }}
          >
            Assign New Task
          </button>

          {showAssign && (
            <div
              className="mt-3 rounded-lg p-4"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
            >
              <p className="text-[11px] mb-2" style={{ color: 'var(--text-muted)' }}>
                Task assignment (demo UI)
              </p>
              <input
                type="text"
                placeholder="Describe the task..."
                className="w-full rounded-md px-3 py-2 text-sm mb-2 outline-none"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                }}
              />
              <div className="flex gap-2">
                <select
                  className="flex-1 rounded-md px-3 py-2 text-sm outline-none"
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                  }}
                >
                  <option>Low Priority</option>
                  <option>Medium Priority</option>
                  <option>High Priority</option>
                  <option>Critical</option>
                </select>
                <button
                  className="px-4 py-2 rounded-md text-sm font-medium text-white"
                  style={{ background: 'var(--text-primary)', border: 'none', cursor: 'pointer' }}
                >
                  Assign
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
