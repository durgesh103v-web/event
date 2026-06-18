import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getErrorMessage } from '../api/client';
import StatusMessage from '../components/StatusMessage';
import { useAuth } from '../context/AuthContext';
import { StyleSheet } from '../styles/StyleSheet';

const AuthPage = ({ mode }) => {
  const isRegister = mode === 'register';
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register } = useAuth();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isRegister) {
        await register(form);
      } else {
        await login({ email: form.email, password: form.password });
      }

      navigate(location.state?.from?.pathname || '/');
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={styles.page}>
      <div style={styles.panel}>
        <h1 style={styles.title}>{isRegister ? 'Create your account' : 'Welcome back'}</h1>
        <p style={styles.subtitle}>{isRegister ? 'Register to create events and reserve seats.' : 'Login to manage or join events.'}</p>

        <StatusMessage type="error">{error}</StatusMessage>

        <form style={styles.formGrid} onSubmit={handleSubmit}>
          {isRegister && (
            <label style={styles.label}>
              Full name
              <input name="name" onChange={handleChange} required style={styles.input} type="text" value={form.name} />
            </label>
          )}

          <label style={styles.label}>
            Email
            <input name="email" onChange={handleChange} required style={styles.input} type="email" value={form.email} />
          </label>
          <label style={styles.label}>
            Password
            <input
              minLength={6}
              name="password"
              onChange={handleChange}
              required
              style={styles.input}
              type="password"
              value={form.password}
            />
          </label>

          <button disabled={loading} style={styles.primaryButton} type="submit">
            {loading ? 'Please wait...' : isRegister ? 'Register' : 'Login'}
          </button>
        </form>

        <p style={styles.switchAuth}>
          {isRegister ? 'Already have an account?' : 'New here?'}{' '}
          <Link style={styles.switchLink} to={isRegister ? '/login' : '/register'}>{isRegister ? 'Login' : 'Create account'}</Link>
        </p>
      </div>
    </section>
  );
};

const styles = StyleSheet.create({
  page: {
    display: 'grid',
    placeItems: 'start center'
  },
  panel: {
    background: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: 12,
    boxShadow: '0 10px 30px rgba(15, 23, 42, 0.05)',
    maxWidth: 520,
    padding: 30,
    width: '100%'
  },
  title: {
    color: '#0f172a',
    fontSize: '1.8rem',
    margin: '0 0 8px'
  },
  subtitle: {
    color: '#64748b',
    marginBottom: 24
  },
  formGrid: {
    display: 'grid',
    gap: 16
  },
  label: {
    color: '#0f172a',
    display: 'grid',
    fontWeight: 600,
    gap: 7
  },
  input: {
    background: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: 8,
    color: '#0f172a',
    minHeight: 44,
    outlineColor: '#ea580c',
    padding: '10px 12px',
    width: '100%'
  },
  primaryButton: {
    alignItems: 'center',
    background: '#f97316',
    border: 0,
    borderRadius: 8,
    color: '#ffffff',
    display: 'inline-flex',
    fontWeight: 700,
    justifyContent: 'center',
    minHeight: 42,
    padding: '10px 16px'
  },
  switchAuth: {
    marginTop: 20,
    textAlign: 'center'
  },
  switchLink: {
    color: '#ea580c',
    fontWeight: 600,
    textDecoration: 'none'
  }
});

export default AuthPage;
