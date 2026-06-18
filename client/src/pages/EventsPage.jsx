import { Calendar, CalendarDays, Layers3, MapPin, Search, Users, Sparkles, TrendingUp } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import api, { getErrorMessage } from '../api/client';
import EventCard from '../components/EventCard';
import FilterSelect from '../components/FilterSelect';
import Pagination from '../components/Pagination';
import StatusMessage from '../components/StatusMessage';
import { CATEGORY_FILTER_OPTIONS, DATE_FILTER_OPTIONS, LOCATION_FILTER_OPTIONS } from '../constants/eventFilters';
import useMediaQuery from '../hooks/useMediaQuery';

const EventsPage = () => {
  const isTablet = useMediaQuery('(max-width: 900px)');
  const isMobile = useMediaQuery('(max-width: 600px)');
  const [events, setEvents] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const abortRef = useRef(null);

  const totalAttendees = events.reduce((t, e) => t + (e.attendeeCount || e.attendees?.length || 0), 0);

  const fetchEvents = async (page = 1, nq = query, nc = category, nl = location, nd = date) => {
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    setLoading(true);
    setError('');
    try {
      const { data } = await api.get('/events', {
        signal: ctrl.signal,
        params: { page, limit: 8, search: nq, category: nc || undefined, location: nl || undefined, date: nd || undefined },
      });
      setEvents(data.data);
      setPagination(data.pagination);
    } catch (err) {
      if (err.name === 'CanceledError' || err.code === 'ERR_CANCELED') return;
      setError(getErrorMessage(err));
    } finally {
      if (abortRef.current === ctrl) setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(1, '', '', '', '');
    return () => abortRef.current?.abort();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    fetchEvents(1, search, category, location, date);
  };

  return (
    <section style={s.page}>
      {/* Hero */}
      <div style={{ ...s.hero, ...(isMobile ? s.heroMobile : {}) }}>
        <div style={s.heroGlow} />
        <div style={s.heroGlow2} />

        <div style={{ ...s.heroGrid, ...(isTablet ? s.heroGridTablet : {}) }}>
          {/* Left content */}
          <div style={s.heroLeft}>
            <span style={s.heroBadge}>
              <Sparkles size={12} />
              Event Management Platform
            </span>
            <h1 style={{ ...s.heroTitle, ...(isMobile ? s.heroTitleMobile : {}) }}>
              Find events that<br />
              <span style={s.heroAccent}>inspire you.</span>
            </h1>
            <p style={s.heroSub}>
              Explore upcoming meetups, workshops, and conferences. Register in seconds and track everything in one place.
            </p>

            {/* Stats row */}
            <div style={{ ...s.statsRow, ...(isMobile ? s.statsRowMobile : {}) }}>
              <div style={s.statCard}>
                <TrendingUp size={18} color="#f97316" />
                <div>
                  <strong style={s.statNum}>{pagination.total || 0}</strong>
                  <span style={s.statLabel}>Events</span>
                </div>
              </div>
              <div style={{ ...s.statDivider, ...(isMobile ? s.statDividerMobile : {}) }} />
              <div style={s.statCard}>
                <Users size={18} color="#f97316" />
                <div>
                  <strong style={s.statNum}>{totalAttendees}</strong>
                  <span style={s.statLabel}>Attendees</span>
                </div>
              </div>
              <div style={{ ...s.statDivider, ...(isMobile ? s.statDividerMobile : {}) }} />
              <div style={s.statCard}>
                <CalendarDays size={18} color="#f97316" />
                <div>
                  <strong style={s.statNum}>4+</strong>
                  <span style={s.statLabel}>Categories</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right image */}
          {!isMobile && (
            <div style={s.heroRight}>
              <div style={s.heroImgFrame}>
                <img
                  alt="Event audience"
                  decoding="async"
                  fetchpriority="high"
                  src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80"
                  style={s.heroImg}
                />
                <div style={s.heroImgOverlay} />
              </div>
              {/* Floating card */}
              <div style={s.floatCard}>
                <div style={s.floatIconWrap}><CalendarDays size={16} color="#fff" /></div>
                <div>
                  <div style={s.floatTitle}>Next event</div>
                  <div style={s.floatSub}>Starts soon →</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Search bar */}
      <div style={s.searchWrap}>
        <form
          style={{ ...s.searchForm, ...(isTablet ? s.searchFormTablet : {}), ...(isMobile ? s.searchFormMobile : {}) }}
          onSubmit={handleSearch}
        >
          <div style={{ ...s.field, flex: '2 1 0' }}>
            <Search size={17} color="#94a3b8" />
            <input
              aria-label="Search events"
              className="event-search-input"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search events..."
              style={s.fieldInput}
              value={search}
            />
          </div>
          {!isTablet && <div style={s.sep} />}
          <div style={s.field}>
            <Layers3 size={17} color="#94a3b8" />
            <FilterSelect
              ariaLabel="Category"
              onChange={(value) => { setCategory(value); fetchEvents(1, query, value, location, date); }}
              options={CATEGORY_FILTER_OPTIONS}
              value={category}
            />
          </div>
          {!isTablet && <div style={s.sep} />}
          <div style={s.field}>
            <MapPin size={17} color="#94a3b8" />
            <FilterSelect
              ariaLabel="Location"
              onChange={(value) => { setLocation(value); fetchEvents(1, query, category, value, date); }}
              options={LOCATION_FILTER_OPTIONS}
              value={location}
            />
          </div>
          {!isTablet && <div style={s.sep} />}
          <div style={s.field}>
            <Calendar size={17} color="#94a3b8" />
            <FilterSelect
              ariaLabel="Date"
              onChange={(value) => { setDate(value); fetchEvents(1, query, category, location, value); }}
              options={DATE_FILTER_OPTIONS}
              value={date}
            />
          </div>
          <button type="submit" style={s.searchBtn}>
            <Search size={16} />
            {!isMobile && 'Search'}
          </button>
        </form>
      </div>

      <StatusMessage type="error">{error}</StatusMessage>

      {/* Section heading */}
      <div style={s.sectionHead}>
        <div>
          <h2 style={s.sectionTitle}>Featured Events</h2>
          <p style={s.sectionSub}>Handpicked events you won't want to miss.</p>
        </div>
        {pagination.total > 0 && (
          <span style={s.totalBadge}>{pagination.total} results</span>
        )}
      </div>

      {loading && !events.length ? (
        <div style={s.empty}>
          <div style={s.loadingDots}>
            <span style={{ ...s.dot, animationDelay: '0ms' }} />
            <span style={{ ...s.dot, animationDelay: '160ms' }} />
            <span style={{ ...s.dot, animationDelay: '320ms' }} />
          </div>
          <p>Loading events...</p>
        </div>
      ) : events.length ? (
        <>
          <div
            style={{ ...s.grid, ...(isMobile ? s.gridMobile : {}), ...(loading ? s.gridLoading : {}) }}
            aria-busy={loading}
          >
            {events.map((event) => <EventCard event={event} key={event._id} />)}
          </div>
          <Pagination pagination={pagination} onPageChange={fetchEvents} />
        </>
      ) : (
        <div style={s.empty}>
          <Search size={32} color="#cbd5e1" />
          <p style={{ margin: '8px 0 0', color: '#64748b' }}>No events found. Try adjusting your filters.</p>
        </div>
      )}
    </section>
  );
};

const s = {
  page: { display: 'flex', flexDirection: 'column', gap: 24, paddingBottom: 48, width: '100%' },
  hero: {
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    borderRadius: 20,
    boxSizing: 'border-box',
    overflow: 'hidden',
    padding: 'clamp(28px,4vw,52px)',
    position: 'relative',
    width: '100%',
  },
  heroMobile: { padding: '24px 18px' },
  heroGlow: {
    background: 'radial-gradient(ellipse at 15% 50%, rgba(249,115,22,0.22) 0%, transparent 60%)',
    inset: 0,
    pointerEvents: 'none',
    position: 'absolute',
  },
  heroGlow2: {
    background: 'radial-gradient(ellipse at 85% 50%, rgba(59,130,246,0.1) 0%, transparent 60%)',
    inset: 0,
    pointerEvents: 'none',
    position: 'absolute',
  },
  heroGrid: {
    alignItems: 'center',
    display: 'grid',
    gap: 'clamp(24px,4vw,56px)',
    gridTemplateColumns: '1fr 1fr',
    position: 'relative',
    zIndex: 2,
  },
  heroGridTablet: { gridTemplateColumns: '1fr' },
  heroLeft: { display: 'flex', flexDirection: 'column', gap: 20 },
  heroBadge: {
    alignItems: 'center',
    background: 'rgba(249,115,22,0.15)',
    border: '1px solid rgba(249,115,22,0.3)',
    borderRadius: 999,
    color: '#fb923c',
    display: 'inline-flex',
    fontSize: '0.72rem',
    fontWeight: 700,
    gap: 5,
    letterSpacing: '0.05em',
    padding: '5px 12px',
    textTransform: 'uppercase',
    width: 'fit-content',
  },
  heroTitle: {
    color: '#f8fafc',
    fontSize: 'clamp(2rem,3.5vw,3.2rem)',
    fontWeight: 900,
    letterSpacing: '-0.04em',
    lineHeight: 1.05,
    margin: 0,
  },
  heroTitleMobile: { fontSize: '1.9rem' },
  heroAccent: {
    background: 'linear-gradient(90deg, #f97316, #fb923c)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  heroSub: { color: '#94a3b8', fontSize: '0.97rem', lineHeight: 1.6, margin: 0, maxWidth: 480 },
  statsRow: {
    alignItems: 'center',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 14,
    display: 'flex',
    gap: 0,
    padding: '14px 20px',
    width: 'fit-content',
    boxSizing: 'border-box',
    maxWidth: '100%',
    overflowX: 'auto',
  },
  statsRowMobile: { padding: '12px 14px' },
  statCard: { alignItems: 'center', display: 'flex', gap: 10, flexShrink: 0 },
  statDivider: { background: 'rgba(255,255,255,0.1)', height: 28, margin: '0 20px', width: 1, flexShrink: 0 },
  statDividerMobile: { margin: '0 12px' },
  statNum: { color: '#f8fafc', display: 'block', fontSize: '1.2rem', fontWeight: 800 },
  statLabel: { color: '#64748b', display: 'block', fontSize: '0.72rem', fontWeight: 600 },
  heroRight: { height: 280, position: 'relative' },
  heroImgFrame: { borderRadius: 16, height: '100%', overflow: 'hidden', position: 'relative', width: '100%' },
  heroImg: { height: '100%', objectFit: 'cover', objectPosition: 'center 40%', width: '100%' },
  heroImgOverlay: {
    background: 'linear-gradient(to bottom, transparent 50%, rgba(15,23,42,0.5))',
    inset: 0,
    position: 'absolute',
  },
  floatCard: {
    alignItems: 'center',
    backdropFilter: 'blur(12px)',
    background: 'rgba(15,23,42,0.8)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 12,
    bottom: 14,
    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
    display: 'flex',
    gap: 10,
    left: 14,
    padding: '10px 14px',
    position: 'absolute',
  },
  floatIconWrap: {
    alignItems: 'center',
    background: 'linear-gradient(135deg,#f97316,#ea580c)',
    borderRadius: 8,
    display: 'flex',
    height: 32,
    justifyContent: 'center',
    width: 32,
  },
  floatTitle: { color: '#f8fafc', fontSize: '0.8rem', fontWeight: 700 },
  floatSub: { color: '#64748b', fontSize: '0.72rem' },
  searchWrap: {
    background: '#0f172a',
    border: '1px solid #273449',
    borderRadius: 14,
    boxShadow: '0 8px 24px rgba(0,0,0,0.22)',
    padding: 6,
    width: '100%',
    boxSizing: 'border-box',
  },
  searchForm: { alignItems: 'center', display: 'flex', gap: 0, width: '100%' },
  searchFormTablet: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 4, padding: 4 },
  searchFormMobile: { gridTemplateColumns: '1fr' },
  field: {
    alignItems: 'center',
    display: 'flex',
    flex: '1 1 0',
    gap: 8,
    minWidth: 0,
    padding: '8px 14px',
  },
  fieldInput: {
    background: 'transparent',
    border: 0,
    color: '#f1f5f9',
    flex: 1,
    fontSize: '0.9rem',
    minWidth: 0,
    outline: 'none',
    fontFamily: 'inherit',
  },
  sep: { background: '#273449', flexShrink: 0, height: 28, width: 1 },
  searchBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    background: 'linear-gradient(135deg,#f97316,#ea580c)',
    border: 0,
    borderRadius: 10,
    boxShadow: '0 2px 8px rgba(234,88,12,0.3)',
    color: '#fff',
    cursor: 'pointer',
    display: 'flex',
    flex: '0 0 auto',
    fontSize: '0.9rem',
    fontWeight: 700,
    gap: 6,
    padding: '10px 20px',
    whiteSpace: 'nowrap',
    minHeight: 44,
  },
  sectionHead: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  sectionTitle: { color: '#f8fafc', fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 2px' },
  sectionSub: { color: '#94a3b8', fontSize: '0.87rem', margin: 0 },
  totalBadge: {
    background: '#111c2e',
    border: '1px solid #273449',
    borderRadius: 999,
    color: '#cbd5e1',
    fontSize: '0.8rem',
    fontWeight: 600,
    padding: '4px 12px',
  },
  grid: {
    display: 'grid',
    gap: 18,
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px,1fr))',
    width: '100%',
  },
  gridMobile: { gridTemplateColumns: '1fr' },
  gridLoading: { opacity: 0.55, pointerEvents: 'none', transition: 'opacity 0.2s' },
  empty: {
    alignItems: 'center',
    background: '#0f172a',
    border: '1.5px dashed #334155',
    borderRadius: 16,
    color: '#94a3b8',
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    padding: '56px 24px',
    textAlign: 'center',
    width: '100%',
  },
  loadingDots: { display: 'flex', gap: 6 },
  dot: {
    animation: 'pulse 1s ease-in-out infinite',
    background: '#f97316',
    borderRadius: '50%',
    display: 'inline-block',
    height: 8,
    width: 8,
  },
};

export default EventsPage;
