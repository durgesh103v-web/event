import { CalendarDays, LogOut, Plus, UserRound } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { StyleSheet } from '../styles/StyleSheet';

const AppNavbar = () => {
  const { isAuthenticated, logout, user } = useAuth();

  const getInitials = (name = '') =>
    name
      .split(' ')
      .map((item) => item[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

  const navLinkStyle = ({ isActive }) => ({
    ...styles.navLink,
    ...(isActive ? styles.navLinkActive : null)
  });

  const authLinkStyle = ({ isActive }) => ({
    ...styles.loginLink,
    ...(isActive ? styles.loginLinkActive : null)
  });

  return (
    <header style={styles.navbar}>
      <div style={styles.inner}>
        <Link style={styles.brand} to="/">
          <span style={styles.brandIcon}>
            <CalendarDays size={20} />
          </span>
          <span style={styles.brandText}>EventHub</span>
        </Link>

        <nav aria-label="Primary navigation" style={styles.links}>
          <NavLink style={navLinkStyle} to="/">
            Events
          </NavLink>

          {isAuthenticated && (
            <NavLink style={navLinkStyle} to="/my-registrations">
              My Events
            </NavLink>
          )}

          {user?.role === 'admin' && (
            <NavLink style={navLinkStyle} to="/events/new">
              <Plus size={15} />
              <span>Create</span>
            </NavLink>
          )}
        </nav>

        <div style={styles.actions}>
          {isAuthenticated ? (
            <>
              <div style={styles.userNavInfo}>
                <UserRound size={16} color="#ea580c" />
                <span>Hi, <strong style={{color: '#0f172a'}}>{user?.name}</strong></span>
              </div>

              <button onClick={logout} style={styles.logoutButton} type="button">
                <LogOut size={15} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <NavLink style={authLinkStyle} to="/login">
                Login
              </NavLink>
              <NavLink style={styles.registerLink} to="/register">
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

const styles = StyleSheet.create({
  navbar: {
    background: '#ffffff',
    borderBottom: '1px solid #e2e8f0',
    boxSizing: 'border-box',
    position: 'sticky',
    top: 0,
    width: '100%',
    zIndex: 60
  },
  inner: {
    alignItems: 'center',
    boxSizing: 'border-box',
    display: 'flex',
    gap: 18,
    justifyContent: 'space-between',
    minHeight: 64,
    padding: '0 clamp(16px, 3vw, 48px)',
    width: '100%',
    maxWidth: 1200,
    margin: '0 auto'
  },
  brand: {
    alignItems: 'center',
    color: '#0f172a',
    display: 'inline-flex',
    flex: '0 0 auto',
    gap: 10,
    minWidth: 0,
    textDecoration: 'none'
  },
  brandIcon: {
    alignItems: 'center',
    background: '#ea580c',
    borderRadius: 8,
    color: '#ffffff',
    display: 'inline-flex',
    flex: '0 0 auto',
    height: 36,
    justifyContent: 'center',
    width: 36
  },
  brandText: {
    color: '#0f172a',
    fontSize: '1.25rem',
    fontWeight: 700,
    whiteSpace: 'nowrap'
  },
  links: {
    alignItems: 'center',
    display: 'flex',
    flex: '1 1 auto',
    gap: 24,
    justifyContent: 'center',
    minWidth: 0,
    overflowX: 'auto',
    scrollbarWidth: 'none'
  },
  navLink: {
    alignItems: 'center',
    color: '#64748b',
    display: 'inline-flex',
    flex: '0 0 auto',
    fontSize: '0.95rem',
    fontWeight: 500,
    gap: 6,
    minHeight: 36,
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    transition: 'color 0.2s ease'
  },
  navLinkActive: {
    color: '#ea580c',
    fontWeight: 600
  },
  actions: {
    alignItems: 'center',
    display: 'flex',
    flex: '0 1 auto',
    gap: 16,
    justifyContent: 'flex-end',
    minWidth: 0
  },
  loginLink: {
    alignItems: 'center',
    color: '#64748b',
    display: 'inline-flex',
    flex: '0 0 auto',
    fontSize: '0.95rem',
    fontWeight: 500,
    minHeight: 36,
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    transition: 'color 0.2s ease'
  },
  loginLinkActive: {
    color: '#ea580c'
  },
  registerLink: {
    alignItems: 'center',
    background: '#ea580c',
    borderRadius: 6,
    color: '#ffffff',
    display: 'inline-flex',
    flex: '0 0 auto',
    fontSize: '0.95rem',
    fontWeight: 500,
    minHeight: 36,
    padding: '0 16px',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    transition: 'background-color 0.2s ease'
  },
  userNavInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginRight: 8,
    paddingRight: 16,
    borderRight: '1px solid #e2e8f0',
    color: '#64748b',
    fontSize: '0.9rem'
  },
  logoutButton: {
    alignItems: 'center',
    background: '#ea580c',
    border: 0,
    borderRadius: 6,
    color: '#ffffff',
    cursor: 'pointer',
    display: 'inline-flex',
    flex: '0 0 auto',
    fontSize: '0.95rem',
    fontWeight: 500,
    gap: 7,
    minHeight: 36,
    padding: '0 16px',
    whiteSpace: 'nowrap',
    transition: 'background-color 0.2s ease'
  }
});

export default AppNavbar;
