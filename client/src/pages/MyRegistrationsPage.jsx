import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, Search, CheckCircle2 } from 'lucide-react';
import api, { getErrorMessage } from '../api/client';
import EventCard from '../components/EventCard';
import StatusMessage from '../components/StatusMessage';

const MyRegistrationsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get('/registrations/my-events');
        setEvents(data.data || []);
      } catch (err) { setError(getErrorMessage(err)); }
      finally { setLoading(false); }
    };
    load();
  }, []);

  return (
    <section style={s.page}>
      {/* Header */}
      <div style={s.header}>
        <div style={s.headerLeft}>
          <span style={s.eyebrow}>My registrations</span>
          <h1 style={s.title}>Your events</h1>
          <p style={s.subtitle}>All events you've registered for, in one place.</p>
        </div>
        {!loading && events.length > 0 && (
          <div style={s.countChip}>
            <CheckCircle2 size={16} color="#16a34a" />
            <span>{events.length} registered</span>
          </div>
        )}
      </div>

      <StatusMessage type="error">{error}</StatusMessage>

      {loading ? (
        <div style={s.loadingGrid}>
          {[1, 2, 3].map(i => <div key={i} style={s.skeleton} />)}
        </div>
      ) : events.length ? (
        <div style={s.grid}>
          {events.map((event) => (
            <div style={s.cardWrap} key={event._id}>
              <EventCard event={event} />
              {event.myRegistration?.registeredAt && (
                <div style={s.regNote}>
                  <CheckCircle2 size={13} color="#16a34a" />
                  Registered on {new Date(event.myRegistration.registeredAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div style={s.empty}>
          <div style={s.emptyIcon}><CalendarDays size={36} color="#94a3b8" /></div>
          <h3 style={s.emptyTitle}>No events yet</h3>
          <p style={s.emptySub}>You haven't registered for any events. Start exploring!</p>
          <Link style={s.browseBtn} to="/">
            <Search size={16} /> Browse events
          </Link>
        </div>
      )}
    </section>
  );
};

const s = {
  page: { display: 'flex', flexDirection: 'column', gap: 28, paddingBottom: 60, width: '100%' },
  header: {
    alignItems: 'flex-start',
    background: '#fff',
    border: '1px solid #e2e8f0',
    borderRadius: 20,
    boxShadow: '0 4px 16px rgba(15,23,42,0.05)',
    display: 'flex',
    justifyContent: 'space-between',
    padding: 'clamp(20px,3vw,36px)',
  },
  headerLeft: { display: 'flex', flexDirection: 'column', gap: 4 },
  eyebrow: {
    background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: 999, color: '#ea580c',
    display: 'inline-block', fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.06em',
    padding: '5px 11px', textTransform: 'uppercase', width: 'fit-content',
  },
  title: { color: '#0f172a', fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 900, letterSpacing: '-0.03em', margin: 0 },
  subtitle: { color: '#64748b', fontSize: '0.9rem', margin: 0 },
  countChip: {
    alignItems: 'center',
    background: '#f0fdf4',
    border: '1px solid #bbf7d0',
    borderRadius: 999,
    color: '#15803d',
    display: 'flex',
    fontSize: '0.85rem',
    fontWeight: 700,
    gap: 6,
    padding: '7px 14px',
    whiteSpace: 'nowrap',
  },
  loadingGrid: { display: 'grid', gap: 18, gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))' },
  skeleton: {
    animation: 'pulse 1.5s ease-in-out infinite',
    background: 'linear-gradient(90deg,#f1f5f9 25%,#e2e8f0 50%,#f1f5f9 75%)',
    backgroundSize: '200% 100%',
    borderRadius: 16,
    height: 320,
  },
  grid: { display: 'grid', gap: 20, gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', width: '100%' },
  cardWrap: { display: 'flex', flexDirection: 'column', gap: 8 },
  regNote: {
    alignItems: 'center',
    background: '#f0fdf4',
    border: '1px solid #dcfce7',
    borderRadius: 8,
    color: '#15803d',
    display: 'flex',
    fontSize: '0.78rem',
    fontWeight: 600,
    gap: 6,
    padding: '7px 12px',
  },
  empty: {
    alignItems: 'center',
    background: '#fff',
    border: '1.5px dashed #e2e8f0',
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    padding: '72px 24px',
    textAlign: 'center',
    width: '100%',
  },
  emptyIcon: {
    alignItems: 'center',
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '50%',
    display: 'flex',
    height: 72,
    justifyContent: 'center',
    marginBottom: 4,
    width: 72,
  },
  emptyTitle: { color: '#0f172a', fontSize: '1.2rem', fontWeight: 800, margin: 0 },
  emptySub: { color: '#64748b', fontSize: '0.9rem', margin: 0, maxWidth: 320 },
  browseBtn: {
    alignItems: 'center',
    background: 'linear-gradient(135deg,#f97316,#ea580c)',
    borderRadius: 10,
    boxShadow: '0 4px 12px rgba(234,88,12,0.3)',
    color: '#fff',
    display: 'inline-flex',
    fontSize: '0.9rem',
    fontWeight: 700,
    gap: 7,
    marginTop: 6,
    minHeight: 44,
    padding: '0 22px',
    textDecoration: 'none',
  },
};

export default MyRegistrationsPage;
