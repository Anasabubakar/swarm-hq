import { useState } from 'react';
import LiveFeed from '../components/LiveFeed';
import { departmentMeta } from '../data/agents';

export default function LiveFeedPage() {
  const [filter, setFilter] = useState(null);

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
          Live Activity Feed
        </h2>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          Real-time agent activity across all departments. Hover to pause.
        </p>
      </div>

      {/* Department Filter */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-1.5">
          <FilterButton
            label="All"
            isActive={!filter}
            onClick={() => setFilter(null)}
          />
          {Object.entries(departmentMeta).map(([key, meta]) => (
            <FilterButton
              key={key}
              label={meta.label}
              isActive={filter === key}
              onClick={() => setFilter(filter === key ? null : key)}
              color={meta.color}
            />
          ))}
        </div>
      </div>

      {/* Feed */}
      <LiveFeed filterDept={filter} maxHeight="calc(100vh - 280px)" />
    </div>
  );
}

function FilterButton({ label, isActive, onClick, color }) {
  return (
    <button
      onClick={onClick}
      className="px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors"
      style={{
        background: isActive ? (color ? color + '10' : 'var(--bg-secondary)') : 'transparent',
        border: `1px solid ${isActive ? (color || 'var(--border-hover)') : 'var(--border-color)'}`,
        color: isActive ? (color || 'var(--text-primary)') : 'var(--text-muted)',
        cursor: 'pointer',
      }}
    >
      {label}
    </button>
  );
}
