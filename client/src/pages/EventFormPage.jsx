import { Save } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api, { getErrorMessage } from '../api/client';
import StatusMessage from '../components/StatusMessage';
import { StyleSheet } from '../styles/StyleSheet';

const initialForm = {
  title: '',
  description: '',
  category: '',
  location: '',
  startsAt: '',
  capacity: 50,
  imageUrl: ''
};

const toDateTimeLocal = (value) => {
  if (!value) return '';
  const date = new Date(value);
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date.toISOString().slice(0, 16);
};

const EventFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadEvent = async () => {
      if (!isEdit) return;

      try {
        const { data } = await api.get(`/events/${id}`);
        setForm({
          title: data.title,
          description: data.description,
          category: data.category,
          location: data.location,
          startsAt: toDateTimeLocal(data.startsAt),
          capacity: data.capacity,
          imageUrl: data.imageUrl || ''
        });
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };

    loadEvent();
  }, [id, isEdit]);

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError('');

    try {
      const payload = {
        ...form,
        startsAt: new Date(form.startsAt).toISOString(),
        capacity: Number(form.capacity)
      };
      const { data } = isEdit ? await api.put(`/events/${id}`, payload) : await api.post('/events', payload);
      navigate(`/events/${data._id}`);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div style={styles.emptyState}>Loading form...</div>;

  return (
    <section style={styles.page}>
      <div style={styles.heading}>
        <span style={styles.eyebrow}>{isEdit ? 'Update event' : 'New event'}</span>
        <h1 style={styles.title}>{isEdit ? 'Edit event details' : 'Create an event'}</h1>
      </div>

      <StatusMessage type="error">{error}</StatusMessage>

      <form style={styles.form} onSubmit={handleSubmit}>
        <label style={styles.label}>
          Title
          <input name="title" onChange={handleChange} required style={styles.input} value={form.title} />
        </label>
        <div style={styles.twoColumn}>
          <label style={styles.label}>
            Category
            <input name="category" onChange={handleChange} required style={styles.input} value={form.category} />
          </label>
          <label style={styles.label}>
            Location
            <input name="location" onChange={handleChange} required style={styles.input} value={form.location} />
          </label>
        </div>
        <div style={styles.twoColumn}>
          <label style={styles.label}>
            Start date and time
            <input name="startsAt" onChange={handleChange} required style={styles.input} type="datetime-local" value={form.startsAt} />
          </label>
          <label style={styles.label}>
            Capacity
            <input min="1" name="capacity" onChange={handleChange} required style={styles.input} type="number" value={form.capacity} />
          </label>
        </div>
        <label style={styles.label}>
          Image URL
          <input name="imageUrl" onChange={handleChange} placeholder="https://..." style={styles.input} type="url" value={form.imageUrl} />
        </label>
        <label style={styles.label}>
          Description
          <textarea name="description" onChange={handleChange} required rows="7" style={{ ...styles.input, ...styles.textarea }} value={form.description} />
        </label>
        <button disabled={saving} style={styles.primaryButton} type="submit">
          <Save size={18} /> {saving ? 'Saving...' : 'Save event'}
        </button>
      </form>
    </section>
  );
};

const styles = StyleSheet.create({
  page: {
    display: 'grid',
    gap: 18,
    placeItems: 'start center'
  },
  heading: {
    color: '#475569',
    width: '100%',
    maxWidth: 820
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
    fontSize: '2rem',
    margin: '0 0 8px'
  },
  form: {
    background: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: 12,
    boxShadow: '0 10px 30px rgba(15, 23, 42, 0.05)',
    display: 'grid',
    gap: 16,
    maxWidth: 820,
    padding: 24,
    width: '100%'
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
  textarea: {
    resize: 'vertical'
  },
  twoColumn: {
    display: 'grid',
    gap: 16,
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))'
  },
  primaryButton: {
    alignItems: 'center',
    background: '#f97316',
    border: 0,
    borderRadius: 8,
    color: '#ffffff',
    display: 'inline-flex',
    fontWeight: 700,
    gap: 8,
    justifyContent: 'center',
    minHeight: 42,
    padding: '10px 16px'
  },
  emptyState: {
    background: '#ffffff',
    border: '1px dashed #cbd5e1',
    borderRadius: 12,
    color: '#64748b',
    padding: '40px 20px',
    textAlign: 'center'
  }
});

export default EventFormPage;
