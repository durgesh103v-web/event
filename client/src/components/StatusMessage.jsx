import { AlertCircle, CheckCircle2, Info } from 'lucide-react';

const icons = { error: AlertCircle, success: CheckCircle2, info: Info };

const StatusMessage = ({ type = 'info', children }) => {
  if (!children) return null;
  const Icon = icons[type] || Info;
  const style = styles[type] || styles.info;
  return (
    <div style={{ ...s.base, ...style }}>
      <Icon size={16} style={{ flexShrink: 0 }} />
      <span>{children}</span>
    </div>
  );
};

const s = {
  base: {
    alignItems: 'center',
    borderRadius: 10,
    display: 'flex',
    fontSize: '0.875rem',
    fontWeight: 500,
    gap: 9,
    margin: '0 0 4px',
    padding: '12px 16px',
  },
};

const styles = {
  error: { background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626' },
  success: { background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#15803d' },
  info: { background: '#fff7ed', border: '1px solid #fed7aa', color: '#9a3412' },
};

export default StatusMessage;
