import StatsBar from '../components/StatsBar';
import DepartmentRoom from '../components/DepartmentRoom';
import LiveFeed from '../components/LiveFeed';
import { getDepartmentStats } from '../data/agents';

const deptStats = getDepartmentStats();

export default function OverviewPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
          Overview
        </h2>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          Your AI workforce at a glance
        </p>
      </div>

      {/* Stats Bar */}
      <StatsBar />

      {/* Department Rooms */}
      <div className="mb-10">
        <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
          Departments
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {Object.entries(deptStats).map(([key, stats], index) => (
            <DepartmentRoom key={key} dept={key} stats={stats} index={index} />
          ))}
        </div>
      </div>

      {/* Live Activity Feed */}
      <div>
        <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
          Live Activity
        </h3>
        <LiveFeed maxHeight="350px" />
      </div>
    </div>
  );
}
