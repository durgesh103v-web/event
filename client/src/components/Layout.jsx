import { Outlet } from 'react-router-dom';
import AppNavbar from './AppNavbar';

const Layout = () => (
  <div style={s.shell}>
    <AppNavbar />
    <main style={s.main}>
      <Outlet />
    </main>
  </div>
);

const s = {
  shell: {
    background: '#070b14',
    boxSizing: 'border-box',
    color: '#e2e8f0',
    fontFamily: "'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif",
    minHeight: '100vh',
    overflowX: 'hidden',
    width: '100%',
  },
  main: {
    boxSizing: 'border-box',
    margin: '0 auto',
    maxWidth: 1400,
    padding: '20px clamp(16px,2.5vw,36px) 0',
    width: '100%',
  },
};

export default Layout;
