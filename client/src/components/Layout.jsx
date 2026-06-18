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
    background: '#f1f5f9',
    boxSizing: 'border-box',
    color: '#1e293b',
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
