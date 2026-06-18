import { format } from 'date-fns';
import { Calendar, MapPin, Users, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { memo, useMemo, useState } from 'react';
import { StyleSheet } from '../styles/StyleSheet';

const getOptimizedImageUrl = (url) => {
  if (!url) return '';
  if (!url.includes('images.unsplash.com')) return url;

  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}auto=format&fit=crop&w=640&q=70`;
};

const EventCard = ({ event }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const attendeeCount = event.attendeeCount || event.attendees?.length || 0;
  const imageUrl = useMemo(() => getOptimizedImageUrl(event.imageUrl), [event.imageUrl]);

  const handleBookmark = (e) => {
    e.preventDefault(); // Prevent link navigation
    setIsBookmarked(!isBookmarked);
  };

  return (
    <article style={styles.card}>
      <Link to={`/events/${event._id}`} style={styles.link}>
        <div style={styles.imageWrap}>
          {imageUrl ? (
            <img alt={event.title} decoding="async" loading="lazy" src={imageUrl} style={styles.image} />
          ) : (
            <div style={styles.placeholderImage}>{event.category}</div>
          )}
          <button
            aria-label="Save event"
            onClick={handleBookmark}
            style={{
              ...styles.bookmarkButton,
              ...(isBookmarked ? styles.bookmarkButtonActive : null)
            }}
            type="button"
          >
            <Heart size={18} fill={isBookmarked ? 'currentColor' : 'none'} />
          </button>
        </div>
        <div style={styles.body}>
          <div style={styles.metaTop}>
            <span style={styles.categoryTag}>{event.category}</span>
            <span style={styles.attendeeCount}>
              <Users size={14} /> {attendeeCount} / {event.capacity}
            </span>
          </div>
          <h2 style={styles.title}>{event.title}</h2>
          <p style={styles.description}>{event.description}</p>
          <div style={styles.metaBottom}>
            <span style={styles.fact}>
              <Calendar size={14} /> {format(new Date(event.startsAt), 'dd MMM yyyy, h:mm a')}
            </span>
            <span style={styles.fact}>
              <MapPin size={14} /> {event.location}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
};

const styles = StyleSheet.create({
  card: {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: 12,
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)',
    contentVisibility: 'auto',
    containIntrinsicSize: '360px',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  link: {
    color: 'inherit',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    textDecoration: 'none'
  },
  imageWrap: {
    background: '#f1f5f9',
    height: 180,
    position: 'relative',
    width: '100%'
  },
  image: {
    height: '100%',
    objectFit: 'cover',
    transform: 'translateZ(0)',
    width: '100%'
  },
  placeholderImage: {
    alignItems: 'center',
    color: '#94a3b8',
    display: 'flex',
    fontWeight: 600,
    height: '100%',
    justifyContent: 'center',
    textTransform: 'uppercase',
    width: '100%'
  },
  bookmarkButton: {
    alignItems: 'center',
    background: '#ffffff',
    border: 0,
    borderRadius: '50%',
    boxShadow: '0 3px 8px rgba(15, 23, 42, 0.1)',
    color: '#475569',
    display: 'flex',
    height: 32,
    justifyContent: 'center',
    position: 'absolute',
    right: 12,
    top: 12,
    width: 32
  },
  bookmarkButtonActive: {
    background: '#ffedd5',
    color: '#ea580c'
  },
  body: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    padding: 16
  },
  metaTop: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 12
  },
  categoryTag: {
    background: '#ffedd5',
    borderRadius: 6,
    color: '#ea580c',
    fontSize: '0.7rem',
    fontWeight: 700,
    padding: '4px 10px',
    textTransform: 'uppercase'
  },
  attendeeCount: {
    alignItems: 'center',
    color: '#64748b',
    display: 'flex',
    fontSize: '0.8rem',
    fontWeight: 600,
    gap: 6
  },
  title: {
    color: '#0f172a',
    fontSize: '1.15rem',
    fontWeight: 700,
    lineHeight: 1.3,
    margin: '0 0 8px'
  },
  description: {
    color: '#475569',
    display: '-webkit-box',
    flex: 1,
    fontSize: '0.9rem',
    lineHeight: 1.5,
    margin: '0 0 16px',
    overflow: 'hidden',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2
  },
  metaBottom: {
    alignItems: 'center',
    borderTop: '1px solid #f1f5f9',
    color: '#64748b',
    display: 'flex',
    fontSize: '0.8rem',
    fontWeight: 500,
    justifyContent: 'space-between',
    paddingTop: 12
  },
  fact: {
    alignItems: 'center',
    display: 'flex',
    gap: 4
  }
});

export default memo(EventCard);
