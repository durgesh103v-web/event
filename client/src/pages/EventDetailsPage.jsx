import { format } from 'date-fns';
import { Calendar, Edit, MapPin, Trash2, Users, ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api, { getErrorMessage } from '../api/client';
import StatusMessage from '../components/StatusMessage';
import { useAuth } from '../context/AuthContext';
import useMediaQuery from '../hooks/useMediaQuery';

const EventDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const attendeeCount = event?.attendees?.length || 0;
  const isRegistered = useMemo(() => event?.attendees?.some(a => a.user?._id === user?.id), [event, user]);
  const canManage = event && user?.role === 'admin';
  const fillPct = event ? Math.min(100, Math.round((attendeeCount / event.capacity) * 100)) : 0;

  const loadEvent = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await api.get(`/events/${id}`);
      setEvent(data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadEvent(); }, [id]);

  const handleRegistration = async () => {
    setError(''); setMessage('');
    try {
      const ep = `/events/${id}/register`;
      const { data } = isRegistered ? await api.delete(ep) : await api.post(ep);
      setMessage(data.message);
      await loadEvent();
    } catch (err) { setError(getErrorMessage(err)); }
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this event permanently?')) return;
    try {
      await api.delete(`/events/${id}`);
      navigate('/');
    } catch (err) { setError(getErrorMessage(err)); }
  };

  if (loading) return (
    <div style={s.loadingWrap}>
      <div style={s.loadingSpinner} />
      <p style={{ color: '#64748b', marginTop: 12 }}>Loading event...</p>
    </div>
  );

  if (!event) return (
    <section>
      <StatusMessage type="error">{error || 'Event not found'}</StatusMessage>
    </section>
  );

  return (
    <section style={s.page}>
      {/* Back */}
      <Link to="/" style={s.backLink}>
        <ArrowLeft size={16} /> Back to events
      </Link>

      <StatusMessage type="error">{error}</StatusMessage>
      <StatusMessage type="success">{message}</StatusMessage>

      {/* Hero layout */}
      <div style={{ ...s.hero, ...(isMobile ? s.heroMobile : {}) }}>
        {/* Image */}
        <div style={s.imgCol}>
          {event.imageUrl ? (
            <img alt={event.title} src={event.imageUrl} style={s.img} />
          ) : (
            <div style={s.imgPlaceholder}>
              <span style={s.imgPlaceholderText}>{event.category}</span>
            </div>
          )}
          {/* Capacity bar */}
          <div style={s.capBox}>
            <div style={s.capHeader}>
              <span style={s.capLabel}><Users size={14} /> Capacity</span>
              <span style={s.capCount}>{attendeeCount} / {event.capacity} seats</span>
            </div>
            <div style={s.capBar}>
              <div style={{ ...s.capFill, width: `${fillPct}%`, background: fillPct >= 90 ? '#ef4444' : '#f97316' }} />
            </div>
            <span style={s.capPct}>{fillPct}% full</span>
          </div>
        </div>

        {/* Content */}
        <div style={s.contentCol}>
          <span style={s.eyebrow}>{event.category}</span>
          <h1 style={s.title}>{event.title}</h1>
          <p style={s.desc}>{event.description}</p>

          <div style={{ ...s.factsGrid, ...(isMobile ? s.factsGridMobile : {}) }}>
            <div style={s.factCard}>
              <Calendar size={18} color="#f97316" />
              <div>
                <div style={s.factLabel}>Date & Time</div>
                <div style={s.factValue}>{format(new Date(event.startsAt), 'dd MMM yyyy, h:mm a')}</div>
              </div>
            </div>
            <div style={s.factCard}>
              <MapPin size={18} color="#f97316" />
              <div>
                <div style={s.factLabel}>Location</div>
                <div style={s.factValue}>{event.location}</div>
              </div>
            </div>
          </div>

          {/* CTA buttons */}
          <div style={s.btnRow}>
            {isAuthenticated ? (
              <button
                disabled={attendeeCount >= event.capacity && !isRegistered}
                onClick={handleRegistration}
                style={isRegistered ? s.cancelBtn : s.registerBtn}
                type="button"
              >
                {isRegistered ? <><XCircle size={18} /> Cancel registration</> : <><CheckCircle2 size={18} /> Register for event</>}
              </button>
            ) : (
              <Link style={s.registerBtn} to="/login">Sign in to register</Link>
            )}

            {canManage && (
              <>
                <Link style={s.editBtn} to={`/events/${event._id}/edit`}>
                  <Edit size={16} /> Edit
                </Link>
                <button onClick={handleDelete} style={s.deleteBtn} type="button">
                  <Trash2 size={16} /> Delete
                </button>
              </>
            )}
          </div>

          {isRegistered && (
            <div style={s.registeredBanner}>
              <CheckCircle2 size={16} color="#16a34a" />
              You're registered for this event!
            </div>
          )}
        </div>
      </div>

      {/* Attendees */}
      <div style={s.attendeesCard}>
        <h2 style={s.attendeesTitle}>
          <Users size={20} color="#f97316" />
          Registered attendees
          <span style={s.attendeesBadge}>{attendeeCount}</span>
        </h2>
        {event.attendees?.length ? (
          <div style={s.attendeeList}>
            {event.attendees.map((a, i) => (
              <div style={s.attendeeRow} key={a.user?._id || a.registeredAt}>
                <div style={s.attendeeLeft}>
                  <div style={s.attendeeAvatar}>
                    {a.user?.name?.[0]?.toUpperCase() || '?'}
                  </div>
                  <div>
                    <div style={s.attendeeName}>{a.user?.name || 'Unknown user'}</div>
                    <div style={s.attendeeEmail}>{a.user?.email}</div>
                  </div>
                </div>
                <time style={s.attendeeDate}>{format(new Date(a.registeredAt), 'dd MMM yyyy')}</time>
              </div>
            ))}
          </div>
        ) : (
          <div style={s.noAttendees}>No attendees registered yet. Be the first!</div>
        )}
      </div>
    </section>
  );
};

const btnBase = {
  alignItems: 'center',
  border: 0,
  borderRadius: 10,
  cursor: 'pointer',
  display: 'inline-flex',
  fontSize: '0.92rem',
  fontWeight: 700,
  gap: 8,
  minHeight: 46,
  padding: '0 20px',
  textDecoration: 'none',
  transition: 'opacity 0.15s',
};

const s = {
  page: { display: 'flex', flexDirection: 'column', gap: 24 },
  backLink: {
    alignItems: 'center',
    color: '#64748b',
    display: 'inline-flex',
    fontSize: '0.875rem',
    fontWeight: 600,
    gap: 6,
    textDecoration: 'none',
  },
  loadingWrap: { alignItems: 'center', display: 'flex', flexDirection: 'column', padding: '80px 20px' },
  loadingSpinner: {
    animation: 'spin 0.8s linear infinite',
    border: '3px solid #273449',
    borderRadius: '50%',
    borderTopColor: '#f97316',
    height: 36,
    width: 36,
  },
  hero: {
    background: '#0f172a',
    border: '1px solid #273449',
    borderRadius: 20,
    boxShadow: '0 10px 28px rgba(0,0,0,0.25)',
    display: 'grid',
    gap: 32,
    gridTemplateColumns: 'minmax(260px, 0.9fr) minmax(0, 1.1fr)',
    overflow: 'hidden',
    padding: 28,
  },
  heroMobile: { gridTemplateColumns: '1fr', padding: 20 },
  imgCol: { display: 'flex', flexDirection: 'column', gap: 16 },
  img: { borderRadius: 14, height: 360, objectFit: 'cover', width: '100%' },
  imgPlaceholder: {
    alignItems: 'center',
    background: '#431f12',
    borderRadius: 14,
    display: 'flex',
    height: 360,
    justifyContent: 'center',
    width: '100%',
  },
  imgPlaceholderText: { color: '#ea580c', fontSize: '1.2rem', fontWeight: 800, textTransform: 'uppercase' },
  capBox: {
    background: '#111c2e',
    border: '1px solid #273449',
    borderRadius: 12,
    padding: '14px 16px',
  },
  capHeader: { alignItems: 'center', display: 'flex', justifyContent: 'space-between', marginBottom: 10 },
  capLabel: { alignItems: 'center', color: '#cbd5e1', display: 'flex', fontSize: '0.82rem', fontWeight: 600, gap: 5 },
  capCount: { color: '#f8fafc', fontSize: '0.82rem', fontWeight: 700 },
  capBar: { background: '#334155', borderRadius: 999, height: 6, overflow: 'hidden', width: '100%' },
  capFill: { borderRadius: 999, height: '100%', transition: 'width 0.5s ease' },
  capPct: { color: '#64748b', display: 'block', fontSize: '0.75rem', fontWeight: 600, marginTop: 6 },
  contentCol: { alignSelf: 'flex-start', display: 'flex', flexDirection: 'column', gap: 16 },
  eyebrow: {
    background: '#431f12',
    border: '1px solid #7c2d12',
    borderRadius: 999,
    color: '#fb923c',
    display: 'inline-block',
    fontSize: '0.72rem',
    fontWeight: 800,
    letterSpacing: '0.06em',
    padding: '5px 11px',
    textTransform: 'uppercase',
    width: 'fit-content',
  },
  title: { color: '#f8fafc', fontSize: '2.2rem', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1, margin: 0 },
  desc: { color: '#94a3b8', fontSize: '0.97rem', lineHeight: 1.65, margin: 0 },
  factsGrid: { display: 'grid', gap: 10, gridTemplateColumns: '1fr 1fr' },
  factsGridMobile: { gridTemplateColumns: '1fr' },
  factCard: {
    alignItems: 'flex-start',
    background: '#111c2e',
    border: '1px solid #273449',
    borderRadius: 10,
    display: 'flex',
    gap: 10,
    padding: '12px 14px',
  },
  factLabel: { color: '#94a3b8', fontSize: '0.73rem', fontWeight: 600, marginBottom: 2, textTransform: 'uppercase' },
  factValue: { color: '#f1f5f9', fontSize: '0.9rem', fontWeight: 600 },
  btnRow: { display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 4 },
  registerBtn: { ...btnBase, background: 'linear-gradient(135deg,#f97316,#ea580c)', boxShadow: '0 4px 12px rgba(234,88,12,0.3)', color: '#fff' },
  cancelBtn: { ...btnBase, background: '#111c2e', border: '1px solid #334155', color: '#cbd5e1' },
  editBtn: { ...btnBase, background: '#431f12', border: '1px solid #7c2d12', color: '#fdba74' },
  deleteBtn: { ...btnBase, background: 'rgba(127,29,29,0.24)', border: '1px solid rgba(248,113,113,0.3)', color: '#fca5a5' },
  registeredBanner: {
    alignItems: 'center',
    background: 'rgba(20,83,45,0.28)',
    border: '1px solid rgba(74,222,128,0.3)',
    borderRadius: 10,
    color: '#86efac',
    display: 'flex',
    fontSize: '0.87rem',
    fontWeight: 600,
    gap: 7,
    padding: '10px 14px',
  },
  attendeesCard: {
    background: '#0f172a',
    border: '1px solid #273449',
    borderRadius: 20,
    boxShadow: '0 10px 28px rgba(0,0,0,0.25)',
    padding: 28,
  },
  attendeesTitle: {
    alignItems: 'center',
    color: '#f8fafc',
    display: 'flex',
    fontSize: '1.15rem',
    fontWeight: 800,
    gap: 8,
    margin: '0 0 20px',
  },
  attendeesBadge: {
    background: '#431f12',
    border: '1px solid #7c2d12',
    borderRadius: 999,
    color: '#fb923c',
    fontSize: '0.8rem',
    fontWeight: 700,
    padding: '2px 10px',
  },
  attendeeList: { display: 'flex', flexDirection: 'column', gap: 8 },
  attendeeRow: {
    alignItems: 'center',
    background: '#111c2e',
    border: '1px solid #273449',
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px 16px',
  },
  attendeeLeft: { alignItems: 'center', display: 'flex', gap: 12 },
  attendeeAvatar: {
    alignItems: 'center',
    background: 'linear-gradient(135deg,#f97316,#ea580c)',
    borderRadius: '50%',
    color: '#fff',
    display: 'flex',
    fontSize: '0.8rem',
    fontWeight: 700,
    height: 34,
    justifyContent: 'center',
    width: 34,
  },
  attendeeName: { color: '#f1f5f9', fontSize: '0.9rem', fontWeight: 600 },
  attendeeEmail: { color: '#64748b', fontSize: '0.78rem' },
  attendeeDate: { color: '#94a3b8', fontSize: '0.78rem', fontWeight: 500 },
  noAttendees: {
    background: '#111c2e',
    border: '1.5px dashed #334155',
    borderRadius: 10,
    color: '#94a3b8',
    fontSize: '0.9rem',
    padding: '32px 20px',
    textAlign: 'center',
  },
};

export default EventDetailsPage;
