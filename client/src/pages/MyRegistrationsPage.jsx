import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api, { getErrorMessage } from '../api/client';
import EventCard from '../components/EventCard';
import StatusMessage from '../components/StatusMessage';
import { StyleSheet } from '../styles/StyleSheet';

const MyRegistrationsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadRegistrations = async () => {
      try {
        const { data } = await api.get('/registrations/my-events');
        setEvents(data.data || []);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };

    loadRegistrations();
  }, []);

  return (
    <section style={styles.page}>
      <div style={styles.heading}>
        <div>
          <span style={styles.eyebrow}>My registrations</span>
          <h1 style={styles.title}>Events you have joined</h1>
        </div>
      </div>

      <StatusMessage type="error">{error}</StatusMessage>

      {loading ? (
        <div style={styles.emptyState}>Loading registrations...</div>
      ) : events.length ? (
        <div style={styles.eventGrid}>
          {events.map((event) => (
            <div style={styles.cardWrap} key={event._id}>
              <EventCard event={event} />
              {event.myRegistration?.registeredAt && (
                <div style={styles.registrationNote}>
                  Registered on {new Date(event.myRegistration.registeredAt).toLocaleDateString()}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div style={styles.emptyState}>
          <p>You have not registered for any events yet.</p>
          <Link style={styles.primaryLink} to="/">
            Browse events
          </Link>
        </div>
      )}
    </section>
  );
};

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'column',
    gap: 32,
    paddingBottom: 60,
    width: '100%'
  },
  heading: {
    margin: '0 auto',
    maxWidth: 1200,
    width: '100%',
    padding: '0 24px'
  },
  eyebrow: {
    background: '#fff7ed',
    border: '1px solid #fdba74',
    borderRadius: 999,
    color: '#ea580c',
    display: 'inline-block',
    fontSize: '0.75rem',
    fontWeight: 700,
    letterSpacing: '0.05em',
    marginBottom: 8,
    padding: '4px 12px',
    textTransform: 'uppercase'
  },
  title: {
    color: '#0f172a',
    fontSize: '2.5rem',
    fontWeight: 800,
    margin: 0
  },
  eventGrid: {
    display: 'grid',
    gap: 24,
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    margin: '0 auto',
    maxWidth: 1200,
    padding: '0 24px',
    width: '100%'
  },
  cardWrap: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12
  },
  registrationNote: {
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: 8,
    color: '#475569',
    fontSize: '0.85rem',
    fontWeight: 600,
    padding: '8px 12px',
    textAlign: 'center'
  },
  emptyState: {
    background: '#ffffff',
    border: '1px dashed #cbd5e1',
    borderRadius: 12,
    color: '#64748b',
    margin: '0 auto',
    maxWidth: 1200,
    padding: '48px 24px',
    textAlign: 'center',
    width: '100%'
  },
  primaryLink: {
    alignItems: 'center',
    background: '#ea580c',
    borderRadius: 8,
    color: '#ffffff',
    display: 'inline-flex',
    fontWeight: 600,
    marginTop: 16,
    minHeight: 44,
    padding: '0 24px',
    textDecoration: 'none',
    transition: 'background-color 0.2s ease'
  }
});

export default MyRegistrationsPage;
