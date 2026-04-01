import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const scrollRef = useRef(null);

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
      className="rounded-2xl overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-secondary) 100%)',
        border: '1px solid var(--border-color)',
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: '1px solid var(--border-color)' }}>
        <div className="flex items-center gap-2">
          <motion.div
            className="w-2 h-2 rounded-full"
            style={{ background: isPaused ? '#ffcc00' : '#00ff88', boxShadow: `0 0 8px ${isPaused ? '#ffcc00' : '#00ff88'}` }}
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
            Live Activity Feed
          </span>
          {isPaused && (
            <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: '#ffcc0022', color: '#ffcc00' }}>
              PAUSED
            </span>
          )}
        </div>
        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
          {filteredItems.length} events
        </span>
      </div>

      {/* Feed */}
      <div
        ref={scrollRef}
        className="overflow-y-auto p-3 space-y-2"
        style={{ maxHeight }}
      >
        <AnimatePresence initial={false}>
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20, height: 0 }}
              animate={{ opacity: 1, x: 0, height: 'auto' }}
              exit={{ opacity: 0, x: 20, height: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-3 px-3 py-2 rounded-xl"
              style={{
                background: 'var(--bg-primary)',
                border: '1px solid transparent',
              }}
            >
              <span className="text-lg flex-shrink-0">{item.agent.avatar}</span>
              <div className="min-w-0 flex-1">
                <p className="text-sm truncate" style={{ color: 'var(--text-primary)' }}>
                  <span className="font-semibold">{item.agent.name}</span>
                  <span style={{ color: 'var(--text-secondary)' }}> {item.verb} </span>
                  <span style={{ color: item.agent.departmentMeta.color }}>
                    {item.agent.task.length > 40 ? item.agent.task.slice(0, 40) + '...' : item.agent.task}
                  </span>
                </p>
              </div>
              <span className="text-[10px] flex-shrink-0" style={{ color: 'var(--text-muted)' }}>
                {item.time}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
