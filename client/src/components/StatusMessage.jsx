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
  error: { background: 'rgba(127,29,29,0.24)', border: '1px solid rgba(248,113,113,0.3)', color: '#fca5a5' },
  success: { background: 'rgba(20,83,45,0.28)', border: '1px solid rgba(74,222,128,0.3)', color: '#86efac' },
  info: { background: 'rgba(154,52,18,0.24)', border: '1px solid rgba(251,146,60,0.3)', color: '#fdba74' },
};

export default StatusMessage;
