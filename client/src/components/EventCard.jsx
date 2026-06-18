import { format } from 'date-fns';
import { Calendar, MapPin, Users, Heart, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { memo, useMemo, useState } from 'react';

const CATEGORY_COLORS = {
  Technology: { bg: '#172554', text: '#93c5fd', dot: '#3b82f6' },
  Business:   { bg: '#123524', text: '#86efac', dot: '#22c55e' },
  Cloud:      { bg: '#2e1f5e', text: '#c4b5fd', dot: '#8b5cf6' },
  Design:     { bg: '#4a174f', text: '#f0abfc', dot: '#d946ef' },
};
const defaultCatColor = { bg: '#431f12', text: '#fdba74', dot: '#f97316' };

const getOptimizedImageUrl = (url) => {
  if (!url) return '';
  if (!url.includes('images.unsplash.com')) return url;
  const sep = url.includes('?') ? '&' : '?';
  return `${url}${sep}auto=format&fit=crop&w=640&q=75`;
};

const EventCard = ({ event }) => {
  const [liked, setLiked] = useState(false);
  const attendeeCount = event.attendeeCount || event.attendees?.length || 0;
  const imageUrl = useMemo(() => getOptimizedImageUrl(event.imageUrl), [event.imageUrl]);
  const catColor = CATEGORY_COLORS[event.category] || defaultCatColor;
  const fillPct = event.capacity ? Math.min(100, Math.round((attendeeCount / event.capacity) * 100)) : 0;

  return (
    <article style={s.card}>
      <Link to={`/events/${event._id}`} style={s.link}>
        {/* Image */}
        <div style={s.imgWrap}>
          {imageUrl ? (
            <img alt={event.title} decoding="async" loading="lazy" src={imageUrl} style={s.img} />
          ) : (
            <div style={{ ...s.imgPlaceholder, background: catColor.bg, color: catColor.text }}>
              <span style={s.placeholderText}>{event.category}</span>
            </div>
          )}
          {/* Gradient overlay */}
          <div style={s.imgGradient} />
          {/* Category pill on image */}
          <span style={{ ...s.catPill, background: catColor.bg, color: catColor.text }}>
            <span style={{ ...s.catDot, background: catColor.dot }} />
            {event.category}
          </span>
          {/* Heart button */}
          <button
            aria-label="Save event"
            onClick={(e) => { e.preventDefault(); setLiked(l => !l); }}
            style={{ ...s.heartBtn, ...(liked ? s.heartBtnActive : {}) }}
            type="button"
          >
            <Heart size={15} fill={liked ? 'currentColor' : 'none'} strokeWidth={2} />
          </button>
        </div>

        {/* Body */}
        <div style={s.body}>
          <h2 style={s.title}>{event.title}</h2>
          <p style={s.desc}>{event.description}</p>

          {/* Meta */}
          <div style={s.meta}>
            <span style={s.metaItem}>
              <Calendar size={13} style={{ flexShrink: 0 }} />
              {format(new Date(event.startsAt), 'dd MMM yyyy')}
            </span>
            <span style={s.metaItem}>
              <MapPin size={13} style={{ flexShrink: 0 }} />
              {event.location}
            </span>
          </div>

          {/* Capacity bar */}
          <div style={s.capacityRow}>
            <div style={s.capacityBar}>
              <div style={{ ...s.capacityFill, width: `${fillPct}%`, background: fillPct >= 90 ? '#ef4444' : '#f97316' }} />
            </div>
            <span style={s.capacityLabel}>
              <Users size={12} /> {attendeeCount}/{event.capacity}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div style={s.footer}>
          <span style={s.viewLink}>View details <ArrowUpRight size={14} /></span>
        </div>
      </Link>
    </article>
  );
};

const s = {
  card: {
    background: '#0f172a',
    border: '1px solid #243247',
    borderRadius: 16,
    boxShadow: '0 8px 24px rgba(0,0,0,0.22)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    transition: 'box-shadow 0.2s, transform 0.2s',
  },
  link: {
    color: 'inherit',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    textDecoration: 'none',
  },
  imgWrap: {
    background: '#111c2e',
    height: 180,
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
  },
  img: {
    height: '100%',
    objectFit: 'cover',
    width: '100%',
    transition: 'transform 0.3s ease',
  },
  imgGradient: {
    background: 'linear-gradient(to top, rgba(15,23,42,0.2) 0%, transparent 50%)',
    bottom: 0,
    left: 0,
    pointerEvents: 'none',
    position: 'absolute',
    right: 0,
    top: 0,
  },
  imgPlaceholder: {
    alignItems: 'center',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
  placeholderText: {
    fontSize: '0.85rem',
    fontWeight: 700,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
  },
  catPill: {
    alignItems: 'center',
    borderRadius: 999,
    bottom: 10,
    display: 'inline-flex',
    fontSize: '0.7rem',
    fontWeight: 700,
    gap: 5,
    left: 10,
    letterSpacing: '0.04em',
    padding: '4px 9px',
    position: 'absolute',
    textTransform: 'uppercase',
  },
  catDot: {
    borderRadius: '50%',
    display: 'inline-block',
    height: 6,
    width: 6,
  },
  heartBtn: {
    alignItems: 'center',
    background: 'rgba(15,23,42,0.9)',
    backdropFilter: 'blur(8px)',
    border: 0,
    borderRadius: '50%',
    boxShadow: '0 2px 8px rgba(15,23,42,0.12)',
    color: '#cbd5e1',
    display: 'flex',
    height: 32,
    justifyContent: 'center',
    position: 'absolute',
    right: 10,
    top: 10,
    transition: 'background 0.15s, color 0.15s',
    width: 32,
  },
  heartBtnActive: {
    background: '#3f1725',
    color: '#f43f5e',
  },
  body: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    gap: 8,
    padding: '14px 16px 10px',
  },
  title: {
    color: '#f8fafc',
    fontSize: '1rem',
    fontWeight: 700,
    letterSpacing: '-0.01em',
    lineHeight: 1.3,
    margin: 0,
  },
  desc: {
    color: '#94a3b8',
    display: '-webkit-box',
    flex: 1,
    fontSize: '0.85rem',
    lineHeight: 1.5,
    margin: 0,
    overflow: 'hidden',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
  },
  meta: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
    marginTop: 4,
  },
  metaItem: {
    alignItems: 'center',
    color: '#94a3b8',
    display: 'flex',
    fontSize: '0.78rem',
    fontWeight: 500,
    gap: 5,
  },
  capacityRow: {
    alignItems: 'center',
    display: 'flex',
    gap: 8,
    marginTop: 6,
  },
  capacityBar: {
    background: '#273449',
    borderRadius: 999,
    flex: 1,
    height: 4,
    overflow: 'hidden',
  },
  capacityFill: {
    borderRadius: 999,
    height: '100%',
    transition: 'width 0.3s ease',
  },
  capacityLabel: {
    alignItems: 'center',
    color: '#94a3b8',
    display: 'flex',
    flex: '0 0 auto',
    fontSize: '0.73rem',
    fontWeight: 600,
    gap: 3,
  },
  footer: {
    borderTop: '1px solid #243247',
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '10px 16px',
  },
  viewLink: {
    alignItems: 'center',
    color: '#ea580c',
    display: 'inline-flex',
    fontSize: '0.8rem',
    fontWeight: 600,
    gap: 3,
  },
};

export default memo(EventCard);
