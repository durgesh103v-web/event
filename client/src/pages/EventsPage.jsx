import { Calendar, CalendarDays, Layers3, MapPin, Search, Users } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import api, { getErrorMessage } from '../api/client';
import EventCard from '../components/EventCard';
import Pagination from '../components/Pagination';
import StatusMessage from '../components/StatusMessage';
import { StyleSheet } from '../styles/StyleSheet';

const filterChips = [
  { label: 'All Categories', value: '' },
  { label: 'Technology', value: 'Technology' },
  { label: 'Business', value: 'Business' },
  { label: 'Cloud', value: 'Cloud' },
  { label: 'Design', value: 'Design' }
];

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const abortControllerRef = useRef(null);
  const activeAttendees = events.reduce(
    (total, event) => total + (event.attendeeCount || event.attendees?.length || 0),
    0
  );

  const fetchEvents = async (
    page = 1,
    nextQuery = query,
    nextCategory = category,
    nextLocation = location,
    nextDate = date
  ) => {
    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;
    setLoading(true);
    setError('');

    try {
      const { data } = await api.get('/events', {
        signal: controller.signal,
        params: {
          page,
          limit: 12,
          search: nextQuery,
          category: nextCategory || undefined,
          location: nextLocation || undefined,
          date: nextDate || undefined
        }
      });
      setEvents(data.data);
      setPagination(data.pagination);
    } catch (err) {
      if (err.name === 'CanceledError' || err.code === 'ERR_CANCELED') return;
      setError(getErrorMessage(err));
    } finally {
      if (abortControllerRef.current === controller) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchEvents(1, '', '', '', '');
    return () => abortControllerRef.current?.abort();
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    setQuery(search);
    fetchEvents(1, search, category, location, date);
  };

  const handleCategoryChange = (e) => {
    const val = e.target.value;
    setCategory(val);
    fetchEvents(1, query, val, location, date);
  };

  const handleLocationChange = (e) => {
    const val = e.target.value;
    setLocation(val);
    fetchEvents(1, query, category, val, date);
  };

  const handleDateChange = (e) => {
    const val = e.target.value;
    setDate(val);
    fetchEvents(1, query, category, location, val);
  };

  return (
    <section style={styles.page}>
      <div style={styles.hero}>
        <div style={styles.heroContent}>
          <span style={styles.heroBadge}>Biz Technologies Assignment</span>
          <h1 style={styles.heroTitle}>
            Event Management System<br/>
            <span style={styles.textHighlight}>MERN Stack Role</span>
          </h1>
          <p style={styles.heroSubtitle}>
            Find events that inspire you. Explore upcoming meetups, workshops, and sessions. Register quickly and track your joined events seamlessly.
          </p>
          
          <div style={styles.heroFeatures}>
            <div style={styles.featureItem}>
              <div style={styles.featureIcon}><Search size={18} /></div>
              <span style={styles.featureText}>Discover</span>
            </div>
            <div style={styles.featureItem}>
              <div style={styles.featureIcon}><Users size={18} /></div>
              <span style={styles.featureText}>Register</span>
            </div>
            <div style={styles.featureItem}>
              <div style={styles.featureIcon}><CalendarDays size={18} /></div>
              <span style={styles.featureText}>Manage</span>
            </div>
          </div>
        </div>

        <div style={styles.heroImageWrapper}>
          <div style={styles.heroImageFrame}>
            <img
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=760&q=80"
              alt="Audience at an event"
              decoding="async"
              fetchPriority="high"
              style={styles.heroImage}
            />
          </div>
          <div style={styles.floatingStat}>
            <div style={styles.statIcon}><Users size={24} /></div>
            <div style={styles.statText}>
              <strong style={styles.statValue}>{activeAttendees}</strong>
              <span style={styles.statLabel}>Registered Attendees</span>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.searchPanel}>
        <form style={styles.searchForm} onSubmit={handleSearch}>
          <div style={{ ...styles.searchField, ...styles.mainSearch }}>
            <Search size={20} color="#64748b" />
            <input
              aria-label="Search events"
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by keyword..."
              style={styles.input}
              value={search}
            />
          </div>
          <div style={styles.divider} />
          <div style={styles.searchField}>
            <Layers3 size={20} color="#64748b" />
            <select aria-label="Category" style={styles.select} value={category} onChange={handleCategoryChange}>
              {filterChips.map(chip => (
                <option key={chip.label} value={chip.value}>{chip.label}</option>
              ))}
            </select>
          </div>
          <div style={styles.divider} />
          <div style={styles.searchField}>
            <MapPin size={20} color="#64748b" />
            <select aria-label="Location" style={styles.select} value={location} onChange={handleLocationChange}>
              <option value="">All Locations</option>
              <option value="Online">Online</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Bengaluru">Bengaluru</option>
            </select>
          </div>
          <div style={styles.divider} />
          <div style={styles.searchField}>
            <Calendar size={20} color="#64748b" />
            <select aria-label="Date" style={styles.select} value={date} onChange={handleDateChange}>
              <option value="">Any Date</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
            </select>
          </div>
          <button type="submit" style={styles.searchButton}>Search Events</button>
        </form>
      </div>

      <StatusMessage type="error">{error}</StatusMessage>

      <div style={styles.sectionHeading}>
        <div>
          <h2 style={styles.sectionTitle}>Featured Events</h2>
          <p style={styles.sectionSubtitle}>Handpicked events you won't want to miss.</p>
        </div>
      </div>

      {loading && !events.length ? (
        <div style={styles.emptyState}>Loading events...</div>
      ) : events.length ? (
        <>
          <div style={{ ...styles.eventGrid, ...(loading ? styles.eventGridUpdating : null) }} aria-busy={loading}>
            {events.map((event) => (
              <EventCard event={event} key={event._id} />
            ))}
          </div>
          <Pagination pagination={pagination} onPageChange={fetchEvents} />
        </>
      ) : (
        <div style={styles.emptyState}>No events found.</div>
      )}
    </section>
  );
};

const styles = StyleSheet.create({
  page: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    gap: 32,
    paddingBottom: 60,
    width: '100%'
  },
  hero: {
    alignItems: 'center',
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: 16,
    boxSizing: 'border-box',
    display: 'grid',
    gap: 32,
    gridTemplateColumns: '1fr 1fr',
    margin: '0 auto',
    maxWidth: 1200,
    overflow: 'hidden',
    padding: '48px 48px',
    width: '100%',
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)'
  },
  heroContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    zIndex: 2
  },
  heroBadge: {
    background: '#fff7ed',
    border: '1px solid #fdba74',
    borderRadius: 999,
    color: '#ea580c',
    display: 'inline-block',
    fontSize: '0.75rem',
    fontWeight: 700,
    letterSpacing: '0.05em',
    padding: '4px 12px',
    textTransform: 'uppercase',
    alignSelf: 'flex-start'
  },
  heroTitle: {
    color: '#0f172a',
    fontSize: '3rem',
    fontWeight: 800,
    lineHeight: 1.1,
    margin: 0
  },
  textHighlight: {
    color: '#ea580c'
  },
  heroSubtitle: {
    color: '#475569',
    fontSize: '1.1rem',
    lineHeight: 1.6,
    margin: 0,
    maxWidth: 480
  },
  heroFeatures: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 16
  },
  featureItem: {
    alignItems: 'center',
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: 8,
    display: 'flex',
    gap: 8,
    padding: '8px 12px'
  },
  featureIcon: {
    color: '#ea580c',
    display: 'flex'
  },
  featureText: {
    color: '#1e293b',
    fontSize: '0.9rem',
    fontWeight: 600
  },
  heroImageWrapper: {
    height: 380,
    minWidth: 0,
    position: 'relative',
    width: '100%'
  },
  heroImageFrame: {
    borderRadius: 16,
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  },
  heroImage: {
    height: '100%',
    objectFit: 'cover',
    width: '100%'
  },
  floatingStat: {
    alignItems: 'center',
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: 12,
    bottom: -20,
    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    display: 'flex',
    gap: 12,
    padding: '12px 16px',
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 3,
    whiteSpace: 'nowrap'
  },
  statIcon: {
    alignItems: 'center',
    background: '#ea580c',
    borderRadius: '50%',
    color: '#ffffff',
    display: 'flex',
    height: 40,
    justifyContent: 'center',
    width: 40
  },
  statText: {
    display: 'flex',
    flexDirection: 'column'
  },
  statValue: {
    color: '#0f172a',
    fontSize: '1.25rem',
    fontWeight: 800,
    lineHeight: 1.1
  },
  statLabel: {
    color: '#64748b',
    fontSize: '0.8rem',
    fontWeight: 600
  },
  searchPanel: {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: 12,
    boxSizing: 'border-box',
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)',
    margin: '-16px auto 0',
    maxWidth: 1000,
    padding: 8,
    width: '100%',
    position: 'relative',
    zIndex: 10
  },
  searchForm: {
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'nowrap',
    width: '100%',
    gap: 8
  },
  searchField: {
    alignItems: 'center',
    boxSizing: 'border-box',
    display: 'flex',
    flex: '1 1 auto',
    gap: 8,
    padding: '8px 16px'
  },
  mainSearch: {
    flex: '2 1 auto'
  },
  divider: {
    width: 1,
    height: 32,
    backgroundColor: '#e2e8f0'
  },
  input: {
    background: 'transparent',
    border: 0,
    color: '#0f172a',
    fontSize: '0.95rem',
    outline: 'none',
    width: '100%',
    fontFamily: 'inherit'
  },
  select: {
    background: 'transparent',
    border: 0,
    color: '#0f172a',
    cursor: 'pointer',
    fontSize: '0.95rem',
    outline: 'none',
    width: '100%',
    fontFamily: 'inherit'
  },
  searchButton: {
    alignSelf: 'stretch',
    background: '#ea580c',
    border: 0,
    borderRadius: 8,
    color: '#ffffff',
    cursor: 'pointer',
    flex: '0 0 auto',
    fontWeight: 600,
    padding: '0 24px',
    whiteSpace: 'nowrap',
    transition: 'background-color 0.2s ease'
  },
  sectionHeading: {
    maxWidth: 1200,
    margin: '0 auto',
    width: '100%'
  },
  sectionTitle: {
    color: '#0f172a',
    fontSize: '1.75rem',
    fontWeight: 800,
    margin: '0 0 4px'
  },
  sectionSubtitle: {
    color: '#64748b',
    fontSize: '1rem',
    margin: 0
  },
  eventGrid: {
    boxSizing: 'border-box',
    display: 'grid',
    gap: 24,
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    margin: '0 auto',
    maxWidth: 1200,
    width: '100%'
  },
  eventGridUpdating: {
    opacity: 0.6,
    pointerEvents: 'none'
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
  }
});

export default EventsPage;
