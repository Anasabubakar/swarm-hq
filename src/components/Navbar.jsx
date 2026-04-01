import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Navbar() {
  const links = [
    { to: '/', label: 'HQ Overview', icon: '🏢' },
    { to: '/feed', label: 'Live Feed', icon: '📡' },
  ];

  return (
    <motion.nav
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      className="sticky top-0 z-40 px-4 py-3"
      style={{
        background: 'rgba(10, 10, 15, 0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border-color)',
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3 group">
          <motion.div
            className="text-2xl"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            🐝
          </motion.div>
          <div>
            <h1 className="text-lg font-black leading-tight" style={{ color: 'var(--text-primary)' }}>
              Agent Swarm <span style={{ color: '#3b82f6' }}>HQ</span>
            </h1>
            <p className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
              Virtual Company Dashboard
            </p>
          </div>
        </NavLink>

        {/* Nav Links */}
        <div className="flex items-center gap-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive ? 'text-white' : ''
                }`
              }
              style={({ isActive }) => ({
                background: isActive ? 'var(--bg-card)' : 'transparent',
                color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                border: isActive ? '1px solid var(--border-color)' : '1px solid transparent',
              })}
            >
              <span className="mr-1.5">{link.icon}</span>
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Live indicator */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
          <motion.div
            className="w-2 h-2 rounded-full"
            style={{ background: '#00ff88', boxShadow: '0 0 8px #00ff88' }}
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="text-xs font-medium" style={{ color: '#00ff88' }}>LIVE</span>
        </div>
      </div>
    </motion.nav>
  );
}
