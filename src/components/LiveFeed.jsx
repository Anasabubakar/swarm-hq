import { useState, useEffect, useRef } from 'react';
import { agents, departmentMeta } from '../data/agents';

const ACTION_VERBS = [
  'completed task on', 'started working on', 'updated progress on',
  'submitted review for', 'optimized', 'deployed', 'tested',
  'refactored', 'documented', 'analyzed', 'configured', 'validated',
  'benchmarked', 'architected', 'designed', 'prototyped', 'resolved',
];

const TIMESTAMP_WORDS = ['just now', '1m ago', '2m ago', '3m ago', '5m ago', '8m ago', '12m ago', '15m ago', '20m ago', '30m ago'];

function generateFeedItem() {
  const agent = agents[Math.floor(Math.random() * agents.length)];
  const verb = ACTION_VERBS[Math.floor(Math.random() * ACTION_VERBS.length)];
  const time = TIMESTAMP_WORDS[Math.floor(Math.random() * TIMESTAMP_WORDS.length)];
  return {
    id: Math.random().toString(36).substr(2, 9),
    agent,
    verb,
    time,
    timestamp: Date.now(),
  };
}

export default function LiveFeed({ filterDept = null, maxHeight = '400px' }) {
  const [items, setItems] = useState(() => Array.from({ length: 20 }, generateFeedItem));
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setItems(prev => {
        const newItem = generateFeedItem();
        const filtered = filterDept ? newItem.agent.department === filterDept : true;
        if (!filtered) return prev;
        return [newItem, ...prev].slice(0, 50);
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [isPaused, filterDept]);

  const filteredItems = filterDept
    ? items.filter(item => item.agent.department === filterDept)
    : items;

  return (
    <div
      className="rounded-lg overflow-hidden"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: '1px solid var(--border-color)' }}>
        <div className="flex items-center gap-2">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: isPaused ? 'var(--status-idle)' : 'var(--status-active)' }}
          />
          <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
            Live Activity Feed
          </span>
          {isPaused && (
            <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)' }}>
              Paused
            </span>
          )}
        </div>
        <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
          {filteredItems.length} events
        </span>
      </div>

      {/* Feed */}
      <div className="overflow-y-auto p-3 space-y-1" style={{ maxHeight }}>
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors"
          >
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-semibold"
              style={{ background: item.agent.departmentMeta.color + '15', color: item.agent.departmentMeta.color }}
            >
              {item.agent.name.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs truncate" style={{ color: 'var(--text-primary)' }}>
                <span className="font-medium">{item.agent.name}</span>
                <span style={{ color: 'var(--text-muted)' }}> {item.verb} </span>
                <span style={{ color: 'var(--text-secondary)' }}>
                  {item.agent.task.length > 40 ? item.agent.task.slice(0, 40) + '...' : item.agent.task}
                </span>
              </p>
            </div>
            <span className="text-[10px] flex-shrink-0" style={{ color: 'var(--text-muted)' }}>
              {item.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
