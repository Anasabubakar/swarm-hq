import { getOverallStats } from '../data/agents';

const stats = getOverallStats();

export default function StatsBar() {
  const items = [
    { label: 'Total Agents', value: stats.total, color: 'var(--text-primary)' },
    { label: 'Active', value: stats.active, color: 'var(--status-active)' },
    { label: 'Idle', value: stats.idle, color: 'var(--status-idle)' },
    { label: 'Busy', value: stats.busy, color: 'var(--status-busy)' },
    { label: 'Offline', value: stats.offline, color: 'var(--status-offline)' },
    { label: 'Departments', value: stats.departments, color: 'var(--text-secondary)' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-lg p-4 text-center"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
          }}
        >
          <div className="text-2xl font-semibold" style={{ color: item.color }}>
            {item.value}
          </div>
          <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}
