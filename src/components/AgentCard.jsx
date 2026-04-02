import { useNavigate } from 'react-router-dom';

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

export default function AgentCard({ agent, onClick, compact = false }) {
  const navigate = useNavigate();
  const color = statusColors[agent.status];

  const handleClick = () => {
    if (onClick) onClick(agent);
    else navigate(`/agent/${agent.id}`);
  };

  if (compact) {
    return (
      <div
        onClick={handleClick}
        className="cursor-pointer rounded-lg p-3 hover:bg-gray-50 transition-colors"
        style={{ border: '1px solid var(--border-color)', background: 'var(--bg-card)' }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-semibold"
            style={{ background: agent.departmentMeta.color + '15', color: agent.departmentMeta.color }}
          >
            {agent.name.charAt(0)}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>
              {agent.name}
            </p>
            <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>
              {agent.task}
            </p>
          </div>
          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer rounded-lg p-4 hover:border-gray-300 transition-colors"
      style={{ border: '1px solid var(--border-color)', background: 'var(--bg-card)' }}
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold"
          style={{ background: agent.departmentMeta.color + '15', color: agent.departmentMeta.color }}
        >
          {agent.name.charAt(0)}
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full" style={{ background: color }} />
          <span className="text-[11px] font-medium" style={{ color: 'var(--text-muted)' }}>
            {statusLabels[agent.status]}
          </span>
        </div>
      </div>

      <h3 className="text-sm font-semibold mb-0.5" style={{ color: 'var(--text-primary)' }}>
        {agent.name}
      </h3>

      <div className="text-[11px] mb-2" style={{ color: agent.departmentMeta.color }}>
        {agent.departmentMeta.label}
      </div>

      <p className="text-xs mb-3 line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
        {agent.task}
      </p>

      {agent.status !== 'offline' && (
        <div>
          <div className="flex justify-between text-[10px] mb-1">
            <span style={{ color: 'var(--text-muted)' }}>Progress</span>
            <span style={{ color: 'var(--text-muted)' }}>{agent.progress}%</span>
          </div>
          <div className="h-1 rounded-full overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${agent.progress}%`, background: color }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
