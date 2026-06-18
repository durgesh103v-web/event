import { Outlet } from 'react-router-dom';
import AppNavbar from './AppNavbar';
import { StyleSheet } from '../styles/StyleSheet';

const Layout = () => (
  <div style={styles.appShell}>
    <AppNavbar />

    <main style={styles.mainContent}>
      <Outlet />
    </main>
  </div>
);

const styles = StyleSheet.create({
  appShell: {
    background: '#f8fafc',
    boxSizing: 'border-box',
    color: '#1e293b',
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, sans-serif",
    minHeight: '100vh',
    overflowX: 'hidden',
    width: '100%'
  },
  mainContent: {
    boxSizing: 'border-box',
    margin: '0 auto',
    maxWidth: 1200,
    padding: '20px clamp(16px, 2.4vw, 32px)',
    width: '100%'
  }
});

export default Layout;
