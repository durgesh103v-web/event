import { CalendarDays, LogOut, Plus, UserRound, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AppNavbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinkStyle = ({ isActive }) => ({
    ...s.navLink,
    ...(isActive ? s.navLinkActive : {})
  });

  return (
    <header style={s.navbar}>
      <div style={s.inner}>
        {/* Brand */}
        <Link style={s.brand} to="/">
          <span style={s.brandIcon}>
            <CalendarDays size={18} />
          </span>
          <span style={s.brandText}>EventHub</span>
        </Link>

        {/* Desktop nav */}
        <nav className="nav-links" style={s.links}>
          <NavLink style={navLinkStyle} to="/">Events</NavLink>
          {isAuthenticated && (
            <NavLink style={navLinkStyle} to="/my-registrations">My Events</NavLink>
          )}
          {user?.role === 'admin' && (
            <NavLink style={navLinkStyle} to="/events/new">
              <Plus size={14} strokeWidth={2.5} />
              <span>Create</span>
            </NavLink>
          )}
        </nav>

        {/* Desktop actions */}
        <div className="nav-actions" style={s.actions}>
          {isAuthenticated ? (
            <>
              <div style={s.userChip}>
                <div style={s.avatar}>
                  {user?.name?.[0]?.toUpperCase() || <UserRound size={14} />}
                </div>
                <span style={s.userName}>{user?.name}</span>
              </div>
              <button onClick={logout} style={s.logoutBtn} type="button">
                <LogOut size={15} />
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink style={({ isActive }) => ({ ...s.loginLink, ...(isActive ? s.loginLinkActive : {}) })} to="/login">
                Sign in
              </NavLink>
              <NavLink style={s.registerBtn} to="/register">Get started</NavLink>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="mobile-toggle"
          style={s.mobileToggle}
          onClick={() => setMobileOpen(o => !o)}
          type="button"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div style={s.mobileMenu}>
          <NavLink style={s.mobileLink} to="/" onClick={() => setMobileOpen(false)}>Events</NavLink>
          {isAuthenticated && (
            <NavLink style={s.mobileLink} to="/my-registrations" onClick={() => setMobileOpen(false)}>My Events</NavLink>
          )}
          {user?.role === 'admin' && (
            <NavLink style={s.mobileLink} to="/events/new" onClick={() => setMobileOpen(false)}>+ Create Event</NavLink>
          )}
          <div style={s.mobileDivider} />
          {isAuthenticated ? (
            <button onClick={() => { logout(); setMobileOpen(false); }} style={s.mobileLogout} type="button">
              <LogOut size={16} /> Logout
            </button>
          ) : (
            <div style={s.mobileAuthRow}>
              <Link style={s.mobileLoginLink} to="/login" onClick={() => setMobileOpen(false)}>Sign in</Link>
              <Link style={s.mobileRegisterBtn} to="/register" onClick={() => setMobileOpen(false)}>Get started</Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

const s = {
  navbar: {
    background: 'rgba(7,11,20,0.92)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderBottom: '1px solid #1e293b',
    boxShadow: '0 1px 8px rgba(0,0,0,0.3)',
    position: 'sticky',
    top: 0,
    width: '100%',
    zIndex: 100,
  },
  inner: {
    alignItems: 'center',
    display: 'flex',
    gap: 12,
    justifyContent: 'space-between',
    margin: '0 auto',
    maxWidth: 1400,
    minHeight: 60,
    padding: '0 clamp(16px,2.5vw,36px)',
    width: '100%',
  },
  brand: {
    alignItems: 'center',
    color: '#f8fafc',
    display: 'inline-flex',
    flex: '0 0 auto',
    gap: 9,
    textDecoration: 'none',
  },
  brandIcon: {
    alignItems: 'center',
    background: 'linear-gradient(135deg, #f97316, #ea580c)',
    borderRadius: 9,
    boxShadow: '0 2px 8px rgba(234,88,12,0.35)',
    color: '#fff',
    display: 'inline-flex',
    flex: '0 0 auto',
    height: 34,
    justifyContent: 'center',
    width: 34,
  },
  brandText: {
    fontSize: '1.05rem',
    fontWeight: 800,
    letterSpacing: '-0.02em',
    whiteSpace: 'nowrap',
  },
  links: {
    alignItems: 'center',
    display: 'flex',
    flex: '1 1 auto',
    gap: 4,
    justifyContent: 'center',
    '@media(maxWidth:768px)': { display: 'none' },
  },
  navLink: {
    alignItems: 'center',
    borderBottom: '2px solid transparent',
    color: '#64748b',
    display: 'inline-flex',
    fontSize: '0.9rem',
    fontWeight: 500,
    gap: 5,
    padding: '8px 12px 6px',
    textDecoration: 'none',
    transition: 'color 0.15s, background 0.15s',
    whiteSpace: 'nowrap',
  },
  navLinkActive: {
    borderBottomColor: '#f97316',
    color: '#ea580c',
    fontWeight: 600,
  },
  actions: {
    alignItems: 'center',
    display: 'flex',
    flex: '0 0 auto',
    gap: 10,
  },
  userChip: {
    alignItems: 'center',
    background: '#111827',
    border: '1px solid #273449',
    borderRadius: 999,
    display: 'flex',
    gap: 8,
    padding: '4px 12px 4px 4px',
  },
  avatar: {
    alignItems: 'center',
    background: 'linear-gradient(135deg, #f97316, #ea580c)',
    borderRadius: '50%',
    color: '#fff',
    display: 'flex',
    fontSize: '0.75rem',
    fontWeight: 700,
    height: 26,
    justifyContent: 'center',
    width: 26,
  },
  userName: {
    color: '#f1f5f9',
    fontSize: '0.875rem',
    fontWeight: 600,
    maxWidth: 120,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  logoutBtn: {
    alignItems: 'center',
    background: 'rgba(127,29,29,0.22)',
    border: '1px solid rgba(248,113,113,0.28)',
    borderRadius: 8,
    color: '#f87171',
    display: 'inline-flex',
    fontSize: '0.875rem',
    fontWeight: 600,
    gap: 6,
    padding: '7px 14px',
  },
  loginLink: {
    color: '#64748b',
    fontSize: '0.9rem',
    fontWeight: 500,
    padding: '7px 12px',
    textDecoration: 'none',
  },
  loginLinkActive: { color: '#ea580c' },
  registerBtn: {
    background: 'linear-gradient(135deg, #f97316, #ea580c)',
    borderRadius: 8,
    boxShadow: '0 2px 8px rgba(234,88,12,0.3)',
    color: '#fff',
    fontSize: '0.9rem',
    fontWeight: 600,
    padding: '8px 16px',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
  },
  mobileToggle: {
    alignItems: 'center',
    background: 'transparent',
    border: 0,
    borderRadius: 8,
    color: '#475569',
    display: 'none',
    height: 36,
    justifyContent: 'center',
    padding: 0,
    width: 36,
  },
  mobileMenu: {
    background: '#0f172a',
    borderTop: '1px solid #1e293b',
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    padding: '12px 16px 16px',
  },
  mobileLink: {
    borderRadius: 8,
    color: '#cbd5e1',
    fontSize: '0.95rem',
    fontWeight: 500,
    padding: '10px 14px',
    textDecoration: 'none',
  },
  mobileDivider: {
    background: '#1e293b',
    height: 1,
    margin: '8px 0',
  },
  mobileLogout: {
    alignItems: 'center',
    background: 'rgba(127,29,29,0.22)',
    border: 0,
    borderRadius: 8,
    color: '#f87171',
    display: 'flex',
    fontSize: '0.9rem',
    fontWeight: 600,
    gap: 8,
    padding: '10px 14px',
  },
  mobileAuthRow: {
    display: 'flex',
    gap: 8,
    marginTop: 4,
  },
  mobileLoginLink: {
    border: '1px solid #334155',
    borderRadius: 8,
    color: '#cbd5e1',
    flex: 1,
    fontSize: '0.9rem',
    fontWeight: 600,
    padding: '10px 0',
    textAlign: 'center',
  },
  mobileRegisterBtn: {
    background: 'linear-gradient(135deg, #f97316, #ea580c)',
    borderRadius: 8,
    color: '#fff',
    flex: 1,
    fontSize: '0.9rem',
    fontWeight: 600,
    padding: '10px 0',
    textAlign: 'center',
  },
};

export default AppNavbar;
