import { format } from 'date-fns';
import { Calendar, Edit, MapPin, Trash2, Users } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api, { getErrorMessage } from '../api/client';
import StatusMessage from '../components/StatusMessage';
import { useAuth } from '../context/AuthContext';
import { StyleSheet } from '../styles/StyleSheet';

const EventDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const attendeeCount = event?.attendees?.length || 0;
  const isRegistered = useMemo(
    () => event?.attendees?.some((attendee) => attendee.user?._id === user?.id),
    [event, user]
  );
  const canManage = event && user?.role === 'admin';

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

  useEffect(() => {
    loadEvent();
  }, [id]);

  const handleRegistration = async () => {
    setError('');
    setMessage('');

    try {
      const endpoint = `/events/${id}/register`;
      const { data } = isRegistered ? await api.delete(endpoint) : await api.post(endpoint);
      setMessage(data.message);
      await loadEvent();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm('Delete this event permanently?');
    if (!confirmed) return;

    try {
      await api.delete(`/events/${id}`);
      navigate('/');
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  if (loading) return <div style={styles.emptyState}>Loading event...</div>;

  if (!event) {
    return (
      <section>
        <StatusMessage type="error">{error || 'Event not found'}</StatusMessage>
      </section>
    );
  }

  return (
    <section style={styles.page}>
      <StatusMessage type="error">{error}</StatusMessage>
      <StatusMessage type="success">{message}</StatusMessage>

      <div style={styles.hero}>
        <div style={styles.imageWrap}>
          {event.imageUrl ? <img alt={event.title} src={event.imageUrl} style={styles.image} /> : <span>{event.category}</span>}
        </div>
        <div style={styles.content}>
          <span style={styles.eyebrow}>{event.category}</span>
          <h1 style={styles.title}>{event.title}</h1>
          <p style={styles.description}>{event.description}</p>
          <div style={styles.facts}>
            <span style={styles.fact}>
              <Calendar size={18} /> {format(new Date(event.startsAt), 'dd MMM yyyy, h:mm a')}
            </span>
            <span style={styles.fact}>
              <MapPin size={18} /> {event.location}
            </span>
            <span style={styles.fact}>
              <Users size={18} /> {attendeeCount}/{event.capacity} seats filled
            </span>
          </div>
          <div style={styles.buttonRow}>
            {isAuthenticated ? (
              <button disabled={attendeeCount >= event.capacity && !isRegistered} onClick={handleRegistration} style={styles.primaryButton} type="button">
                {isRegistered ? 'Cancel registration' : 'Register for event'}
              </button>
            ) : (
              <Link style={styles.primaryLink} to="/login">
                Login to register
              </Link>
            )}
            {canManage && (
              <>
                <Link style={styles.secondaryButton} to={`/events/${event._id}/edit`}>
                  <Edit size={18} /> Edit
                </Link>
                <button onClick={handleDelete} style={styles.dangerButton} type="button">
                  <Trash2 size={18} /> Delete
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div style={styles.attendeesPanel}>
        <h2>Registered attendees</h2>
        {event.attendees?.length ? (
          <div style={styles.attendeeList}>
            {event.attendees.map((attendee) => (
              <div style={styles.attendeeRow} key={attendee.user?._id || attendee.registeredAt}>
                <div>
                  <strong>{attendee.user?.name || 'Unknown user'}</strong>
                  <span style={styles.muted}>{attendee.user?.email}</span>
                </div>
                <time style={styles.muted}>{format(new Date(attendee.registeredAt), 'dd MMM yyyy')}</time>
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.emptyState}>No attendees yet.</div>
        )}
      </div>
    </section>
  );
};

const buttonBase = {
  alignItems: 'center',
  borderRadius: 8,
  display: 'inline-flex',
  fontWeight: 700,
  gap: 8,
  minHeight: 42,
  padding: '10px 16px',
  textDecoration: 'none'
};

const styles = StyleSheet.create({
  page: {
    display: 'grid',
    gap: 24
  },
  hero: {
    display: 'grid',
    gap: 30,
    gridTemplateColumns: 'minmax(280px, 0.85fr) minmax(0, 1.15fr)',
    marginBottom: 24
  },
  imageWrap: {
    background: '#fff7ed',
    borderRadius: 12,
    color: '#ea580c',
    minHeight: 420,
    overflow: 'hidden'
  },
  image: {
    height: '100%',
    objectFit: 'cover',
    width: '100%'
  },
  content: {
    alignSelf: 'center'
  },
  eyebrow: {
    background: '#fff7ed',
    border: '1px solid #fed7aa',
    borderRadius: 999,
    color: '#ea580c',
    display: 'inline-block',
    fontSize: '0.78rem',
    fontWeight: 800,
    marginBottom: 8,
    padding: '6px 10px',
    textTransform: 'uppercase'
  },
  title: {
    color: '#0f172a',
    fontSize: '2.5rem',
    lineHeight: 1.1,
    margin: '0 0 14px'
  },
  description: {
    color: '#475569',
    fontSize: '1.04rem'
  },
  facts: {
    color: '#475569',
    display: 'grid',
    gap: 9,
    margin: '22px 0'
  },
  fact: {
    alignItems: 'center',
    display: 'flex',
    gap: 6
  },
  buttonRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 12
  },
  primaryButton: {
    ...buttonBase,
    background: '#f97316',
    border: 0,
    color: '#ffffff'
  },
  primaryLink: {
    ...buttonBase,
    background: '#f97316',
    color: '#ffffff'
  },
  secondaryButton: {
    ...buttonBase,
    background: '#ffffff',
    border: '1px solid #fed7aa',
    color: '#9a3412'
  },
  dangerButton: {
    ...buttonBase,
    background: '#fef2f2',
    border: '1px solid #fecaca',
    color: '#ef4444'
  },
  attendeesPanel: {
    background: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: 12,
    boxShadow: '0 10px 30px rgba(15, 23, 42, 0.05)',
    padding: 24
  },
  attendeeList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12
  },
  attendeeRow: {
    border: '1px solid #e2e8f0',
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'space-between',
    padding: 12
  },
  muted: {
    color: '#64748b'
  },
  emptyState: {
    background: '#ffffff',
    border: '1px dashed #cbd5e1',
    borderRadius: 12,
    color: '#64748b',
    padding: '30px 20px',
    textAlign: 'center'
  }
});

export default EventDetailsPage;
