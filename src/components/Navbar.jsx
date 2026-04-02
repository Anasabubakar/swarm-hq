import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const links = [
    { to: '/', label: 'Overview' },
    { to: '/feed', label: 'Live Feed' },
  ];

  return (
    <nav
      className="sticky top-0 z-40 px-6 py-3"
      style={{
        background: 'rgba(250, 250, 250, 0.9)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-color)',
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2.5 no-underline">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
            style={{ background: 'var(--text-primary)', color: '#fff' }}
          >
            AS
          </div>
          <div>
            <h1 className="text-sm font-semibold leading-tight" style={{ color: 'var(--text-primary)' }}>
              Agent Swarm HQ
            </h1>
            <p className="text-[10px] tracking-wide" style={{ color: 'var(--text-muted)' }}>
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
                `px-3 py-1.5 rounded-md text-[13px] font-medium no-underline transition-colors ${
                  isActive ? '' : 'hover:bg-gray-100'
                }`
              }
              style={({ isActive }) => ({
                background: isActive ? 'var(--bg-secondary)' : 'transparent',
                color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
              })}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Live indicator */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-md" style={{ background: 'var(--bg-secondary)' }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--status-active)' }} />
          <span className="text-[11px] font-medium" style={{ color: 'var(--text-secondary)' }}>Live</span>
        </div>
      </div>
    </nav>
  );
}
