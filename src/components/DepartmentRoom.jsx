import { useNavigate } from 'react-router-dom';

export default function DepartmentRoom({ dept, stats, index }) {
  const navigate = useNavigate();
  const color = stats.color;

  return (
    <div
      onClick={() => navigate(`/department/${dept}`)}
      className="cursor-pointer rounded-lg p-5 hover:border-gray-300 transition-colors"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <div
            className="w-8 h-8 rounded-md flex items-center justify-center text-xs font-bold mb-2"
            style={{ background: color + '15', color }}
          >
            {stats.label.charAt(0)}
          </div>
          <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
            {stats.label}
          </h3>
        </div>
        <span className="text-[10px] font-medium" style={{ color: 'var(--text-muted)' }}>
          {stats.total} agents
        </span>
      </div>

      {/* Status breakdown */}
      <div className="flex gap-3 mb-3">
        <StatusDot label="Active" count={stats.active} color="var(--status-active)" />
        <StatusDot label="Idle" count={stats.idle} color="var(--status-idle)" />
        <StatusDot label="Busy" count={stats.busy} color="var(--status-busy)" />
        <StatusDot label="Off" count={stats.offline} color="var(--status-offline)" />
      </div>

      {/* Bar visualization */}
      <div className="h-1 rounded-full overflow-hidden flex" style={{ background: 'var(--bg-secondary)' }}>
        {stats.active > 0 && (
          <div className="h-full" style={{ width: `${(stats.active / stats.total) * 100}%`, background: 'var(--status-active)' }} />
        )}
        {stats.idle > 0 && (
          <div className="h-full" style={{ width: `${(stats.idle / stats.total) * 100}%`, background: 'var(--status-idle)' }} />
        )}
        {stats.busy > 0 && (
          <div className="h-full" style={{ width: `${(stats.busy / stats.total) * 100}%`, background: 'var(--status-busy)' }} />
        )}
        {stats.offline > 0 && (
          <div className="h-full" style={{ width: `${(stats.offline / stats.total) * 100}%`, background: 'var(--status-offline)' }} />
        )}
      </div>
    </div>
  );
}

function StatusDot({ label, count, color }) {
  return (
    <div className="flex items-center gap-1">
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
      <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
        {count}
      </span>
    </div>
  );
}
