import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CalendarDays, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { getErrorMessage } from '../api/client';
import StatusMessage from '../components/StatusMessage';
import { useAuth } from '../context/AuthContext';

const AuthPage = ({ mode }) => {
  const isRegister = mode === 'register';
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const handleChange = (e) => setForm(c => ({ ...c, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      isRegister ? await register(form) : await login({ email: form.email, password: form.password });
      navigate(location.state?.from?.pathname || '/');
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page" style={s.page}>
      {/* Left decorative panel */}
      <div className="auth-left" style={s.leftPanel}>
        <div style={s.leftInner}>
          <div style={s.logoMark}>
            <CalendarDays size={28} color="#fff" />
          </div>
          <h2 style={s.leftTitle}>Discover events that move you.</h2>
          <p style={s.leftSub}>Join thousands of attendees discovering workshops, meetups, and conferences every week.</p>
          <div style={s.pillList}>
            {['🎤 Tech Talks', '🎨 Design Workshops', '☁️ Cloud Summits', '💼 Business Mixers'].map(t => (
              <span key={t} style={s.pill}>{t}</span>
            ))}
          </div>
        </div>
        <div style={s.leftGlow} />
      </div>

      {/* Right form panel */}
      <div style={s.rightPanel}>
        <div style={s.formCard}>
          <div style={s.formHeader}>
            <h1 style={s.formTitle}>{isRegister ? 'Create account' : 'Welcome back'}</h1>
            <p style={s.formSub}>{isRegister ? 'Start discovering and joining events.' : 'Sign in to manage your registrations.'}</p>
          </div>

          {error && <StatusMessage type="error">{error}</StatusMessage>}

          <form style={s.form} onSubmit={handleSubmit}>
            {isRegister && (
              <div style={s.fieldWrap}>
                <label style={s.label}>Full name</label>
                <div style={s.inputWrap}>
                  <User size={16} style={s.inputIcon} />
                  <input name="name" onChange={handleChange} placeholder="Jane Smith" required style={s.input} type="text" value={form.name} />
                </div>
              </div>
            )}

            <div style={s.fieldWrap}>
              <label style={s.label}>Email address</label>
              <div style={s.inputWrap}>
                <Mail size={16} style={s.inputIcon} />
                <input name="email" onChange={handleChange} placeholder="you@example.com" required style={s.input} type="email" value={form.email} />
              </div>
            </div>

            <div style={s.fieldWrap}>
              <label style={s.label}>Password</label>
              <div style={s.inputWrap}>
                <Lock size={16} style={s.inputIcon} />
                <input
                  minLength={6}
                  name="password"
                  onChange={handleChange}
                  placeholder="At least 6 characters"
                  required
                  style={{ ...s.input, paddingRight: 42 }}
                  type={showPw ? 'text' : 'password'}
                  value={form.password}
                />
                <button onClick={() => setShowPw(p => !p)} style={s.eyeBtn} type="button" tabIndex={-1}>
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button disabled={loading} style={{ ...s.submitBtn, ...(loading ? s.submitBtnLoading : {}) }} type="submit">
              {loading ? (
                <span style={s.spinner} />
              ) : null}
              {loading ? 'Please wait…' : isRegister ? 'Create account' : 'Sign in'}
            </button>
          </form>

          <p style={s.switchText}>
            {isRegister ? 'Already have an account? ' : 'New to EventHub? '}
            <Link style={s.switchLink} to={isRegister ? '/login' : '/register'}>
              {isRegister ? 'Sign in' : 'Create account'}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

const s = {
  page: {
    background: '#fff',
    border: '1px solid rgba(203,213,225,0.9)',
    borderRadius: 28,
    boxShadow: '0 20px 55px rgba(15,23,42,0.12)',
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
    marginBottom: 28,
    minHeight: 'calc(100vh - 140px)',
    overflow: 'hidden',
  },
  leftPanel: {
    background: 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    padding: 'clamp(32px,5vw,64px)',
    position: 'relative',
  },
  leftGlow: {
    background: 'radial-gradient(circle at 20% 80%, rgba(249,115,22,0.25) 0%, transparent 60%)',
    bottom: 0,
    left: 0,
    pointerEvents: 'none',
    position: 'absolute',
    right: 0,
    top: 0,
  },
  leftInner: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    gap: 24,
    justifyContent: 'center',
    maxWidth: 420,
    position: 'relative',
    zIndex: 2,
  },
  logoMark: {
    alignItems: 'center',
    background: 'linear-gradient(135deg, #f97316, #ea580c)',
    borderRadius: 12,
    boxShadow: '0 4px 16px rgba(249,115,22,0.4)',
    display: 'inline-flex',
    height: 52,
    justifyContent: 'center',
    width: 52,
  },
  leftTitle: {
    color: '#f8fafc',
    fontSize: 'clamp(1.6rem,2.5vw,2.2rem)',
    fontWeight: 800,
    letterSpacing: '-0.03em',
    lineHeight: 1.15,
    margin: 0,
  },
  leftSub: {
    color: '#94a3b8',
    fontSize: '0.97rem',
    lineHeight: 1.6,
    margin: 0,
  },
  pillList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  pill: {
    background: 'rgba(255,255,255,0.07)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 999,
    color: '#cbd5e1',
    fontSize: '0.8rem',
    fontWeight: 500,
    padding: '6px 12px',
  },
  rightPanel: {
    alignItems: 'center',
    background: '#f8fafc',
    display: 'flex',
    justifyContent: 'center',
    padding: 'clamp(24px,4vw,48px)',
  },
  formCard: {
    background: '#fff',
    border: '1px solid #e2e8f0',
    borderRadius: 20,
    boxShadow: '0 4px 24px rgba(15,23,42,0.07)',
    maxWidth: 440,
    padding: 'clamp(24px,4vw,40px)',
    width: '100%',
  },
  formHeader: {
    marginBottom: 28,
  },
  formTitle: {
    color: '#0f172a',
    fontSize: '1.75rem',
    fontWeight: 800,
    letterSpacing: '-0.03em',
    margin: '0 0 6px',
  },
  formSub: {
    color: '#64748b',
    fontSize: '0.9rem',
    margin: 0,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 18,
  },
  fieldWrap: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  label: {
    color: '#374151',
    fontSize: '0.85rem',
    fontWeight: 600,
  },
  inputWrap: {
    alignItems: 'center',
    background: '#f8fafc',
    border: '1.5px solid #e2e8f0',
    borderRadius: 10,
    display: 'flex',
    gap: 8,
    padding: '0 12px',
    transition: 'border-color 0.15s',
  },
  inputIcon: {
    color: '#94a3b8',
    flex: '0 0 auto',
  },
  input: {
    background: 'transparent',
    border: 0,
    color: '#0f172a',
    flex: 1,
    fontSize: '0.95rem',
    minHeight: 44,
    outline: 'none',
    padding: '0',
    width: '100%',
  },
  eyeBtn: {
    background: 'transparent',
    border: 0,
    color: '#94a3b8',
    cursor: 'pointer',
    display: 'flex',
    padding: 4,
  },
  submitBtn: {
    alignItems: 'center',
    background: 'linear-gradient(135deg, #f97316, #ea580c)',
    border: 0,
    borderRadius: 10,
    boxShadow: '0 4px 14px rgba(234,88,12,0.35)',
    color: '#fff',
    cursor: 'pointer',
    display: 'flex',
    fontSize: '0.95rem',
    fontWeight: 700,
    gap: 8,
    justifyContent: 'center',
    marginTop: 4,
    minHeight: 48,
    transition: 'opacity 0.15s, transform 0.15s',
  },
  submitBtnLoading: {
    opacity: 0.7,
    pointerEvents: 'none',
  },
  spinner: {
    animation: 'spin 0.8s linear infinite',
    border: '2px solid rgba(255,255,255,0.3)',
    borderRadius: '50%',
    borderTopColor: '#fff',
    display: 'inline-block',
    height: 16,
    width: 16,
  },
  switchText: {
    color: '#64748b',
    fontSize: '0.875rem',
    marginTop: 20,
    textAlign: 'center',
  },
  switchLink: {
    color: '#ea580c',
    fontWeight: 700,
    textDecoration: 'none',
  },
};

export default AuthPage;
