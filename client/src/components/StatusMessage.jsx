import { StyleSheet } from '../styles/StyleSheet';

const StatusMessage = ({ type = 'info', children }) => {
  if (!children) return null;
  return <div style={{ ...styles.message, ...(styles[type] || styles.info) }}>{children}</div>;
};

const styles = StyleSheet.create({
  message: {
    borderRadius: 8,
    margin: '0 3vw 20px',
    padding: '12px 14px'
  },
  error: {
    background: '#fff1f1',
    border: '1px solid #fecaca',
    color: '#991b1b'
  },
  success: {
    background: '#f0fdf4',
    border: '1px solid #bbf7d0',
    color: '#166534'
  },
  info: {
    background: '#fff7ed',
    border: '1px solid #fed7aa',
    color: '#9a3412'
  }
});

export default StatusMessage;
