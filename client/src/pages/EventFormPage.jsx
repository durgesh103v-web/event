import { Save, ArrowLeft, ImageIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api, { getErrorMessage } from '../api/client';
import StatusMessage from '../components/StatusMessage';

const initialForm = { title: '', description: '', category: '', location: '', startsAt: '', capacity: 50, imageUrl: '' };

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
    const load = async () => {
      if (!isEdit) return;
      try {
        const { data } = await api.get(`/events/${id}`);
        setForm({ title: data.title, description: data.description, category: data.category, location: data.location, startsAt: toDateTimeLocal(data.startsAt), capacity: data.capacity, imageUrl: data.imageUrl || '' });
      } catch (err) { setError(getErrorMessage(err)); }
      finally { setLoading(false); }
    };
    load();
  }, [id, isEdit]);

  const handleChange = (e) => setForm(c => ({ ...c, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true); setError('');
    try {
      const payload = { ...form, startsAt: new Date(form.startsAt).toISOString(), capacity: Number(form.capacity) };
      const { data } = isEdit ? await api.put(`/events/${id}`, payload) : await api.post('/events', payload);
      navigate(`/events/${data._id}`);
    } catch (err) { setError(getErrorMessage(err)); }
    finally { setSaving(false); }
  };

  if (loading) return (
    <div style={s.loadingWrap}>
      <div style={s.spinner} />
      <p style={{ color: '#64748b', marginTop: 12 }}>Loading form...</p>
    </div>
  );

  return (
    <section style={s.page}>
      <Link to={isEdit ? `/events/${id}` : '/'} style={s.backLink}>
        <ArrowLeft size={16} /> {isEdit ? 'Back to event' : 'Back to events'}
      </Link>

      <div style={s.header}>
        <span style={s.eyebrow}>{isEdit ? 'Edit event' : 'New event'}</span>
        <h1 style={s.title}>{isEdit ? 'Update event details' : 'Create an event'}</h1>
        <p style={s.subtitle}>{isEdit ? 'Make changes to your event details below.' : 'Fill in the details to publish your event.'}</p>
      </div>

      {error && <StatusMessage type="error">{error}</StatusMessage>}

      <div style={s.card}>
        <form style={s.form} onSubmit={handleSubmit}>
          {/* Title */}
          <div style={s.fieldGroup}>
            <label style={s.label}>Event title <span style={s.req}>*</span></label>
            <input name="title" onChange={handleChange} placeholder="e.g. React Summit 2025" required style={s.input} value={form.title} />
          </div>

          {/* Category + Location */}
          <div style={s.twoCol}>
            <div style={s.fieldGroup}>
              <label style={s.label}>Category <span style={s.req}>*</span></label>
              <input name="category" onChange={handleChange} placeholder="e.g. Technology" required style={s.input} value={form.category} />
            </div>
            <div style={s.fieldGroup}>
              <label style={s.label}>Location <span style={s.req}>*</span></label>
              <input name="location" onChange={handleChange} placeholder="e.g. Mumbai or Online" required style={s.input} value={form.location} />
            </div>
          </div>

          {/* Date + Capacity */}
          <div style={s.twoCol}>
            <div style={s.fieldGroup}>
              <label style={s.label}>Start date & time <span style={s.req}>*</span></label>
              <input name="startsAt" onChange={handleChange} required style={s.input} type="datetime-local" value={form.startsAt} />
            </div>
            <div style={s.fieldGroup}>
              <label style={s.label}>Capacity <span style={s.req}>*</span></label>
              <input min="1" name="capacity" onChange={handleChange} required style={s.input} type="number" value={form.capacity} />
            </div>
          </div>

          {/* Image URL */}
          <div style={s.fieldGroup}>
            <label style={s.label}>
              <ImageIcon size={14} style={{ display: 'inline', marginRight: 4 }} />
              Cover image URL
            </label>
            <input name="imageUrl" onChange={handleChange} placeholder="https://images.unsplash.com/..." style={s.input} type="url" value={form.imageUrl} />
            {form.imageUrl && (
              <div style={s.imgPreviewWrap}>
                <img alt="Preview" src={form.imageUrl} style={s.imgPreview} onError={(e) => e.target.style.display = 'none'} />
              </div>
            )}
          </div>

          {/* Description */}
          <div style={s.fieldGroup}>
            <label style={s.label}>Description <span style={s.req}>*</span></label>
            <textarea name="description" onChange={handleChange} placeholder="Describe your event..." required rows="6" style={{ ...s.input, ...s.textarea }} value={form.description} />
          </div>

          {/* Submit */}
          <div style={s.formFooter}>
            <Link to={isEdit ? `/events/${id}` : '/'} style={s.cancelBtn}>Cancel</Link>
            <button disabled={saving} style={{ ...s.saveBtn, ...(saving ? s.saveBtnLoading : {}) }} type="submit">
              {saving ? <span style={s.btnSpinner} /> : <Save size={17} />}
              {saving ? 'Saving…' : isEdit ? 'Save changes' : 'Publish event'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

const s = {
  page: { display: 'flex', flexDirection: 'column', gap: 20, margin: '0 auto', maxWidth: 860, width: '100%' },
  loadingWrap: { alignItems: 'center', display: 'flex', flexDirection: 'column', padding: '80px 20px' },
  spinner: { animation: 'spin 0.8s linear infinite', border: '3px solid #f1f5f9', borderRadius: '50%', borderTopColor: '#f97316', height: 36, width: 36 },
  backLink: { alignItems: 'center', color: '#64748b', display: 'inline-flex', fontSize: '0.875rem', fontWeight: 600, gap: 6, textDecoration: 'none' },
  header: { display: 'flex', flexDirection: 'column', gap: 4 },
  eyebrow: {
    background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: 999, color: '#ea580c',
    display: 'inline-block', fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.06em',
    padding: '5px 11px', textTransform: 'uppercase', width: 'fit-content',
  },
  title: { color: '#0f172a', fontSize: '2rem', fontWeight: 900, letterSpacing: '-0.03em', margin: 0 },
  subtitle: { color: '#64748b', fontSize: '0.9rem', margin: 0 },
  card: {
    background: '#fff', border: '1px solid #e2e8f0', borderRadius: 20,
    boxShadow: '0 4px 16px rgba(15,23,42,0.05)', overflow: 'hidden',
  },
  form: { display: 'flex', flexDirection: 'column', gap: 20, padding: 28 },
  twoCol: { display: 'grid', gap: 16, gridTemplateColumns: 'repeat(2,minmax(0,1fr))' },
  fieldGroup: { display: 'flex', flexDirection: 'column', gap: 6 },
  label: { color: '#374151', fontSize: '0.85rem', fontWeight: 600 },
  req: { color: '#ef4444' },
  input: {
    background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: 10,
    color: '#0f172a', fontFamily: 'inherit', fontSize: '0.92rem',
    minHeight: 44, outline: 'none', padding: '10px 14px', transition: 'border-color 0.15s', width: '100%',
  },
  textarea: { minHeight: 'unset', resize: 'vertical' },
  imgPreviewWrap: { borderRadius: 10, height: 140, marginTop: 8, overflow: 'hidden', width: '100%' },
  imgPreview: { height: '100%', objectFit: 'cover', width: '100%' },
  formFooter: {
    alignItems: 'center', borderTop: '1px solid #f1f5f9',
    display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 4, paddingTop: 20,
  },
  cancelBtn: {
    alignItems: 'center', background: '#f1f5f9', border: '1px solid #e2e8f0',
    borderRadius: 10, color: '#475569', display: 'inline-flex',
    fontSize: '0.9rem', fontWeight: 600, minHeight: 44, padding: '0 20px', textDecoration: 'none',
  },
  saveBtn: {
    alignItems: 'center', background: 'linear-gradient(135deg,#f97316,#ea580c)',
    border: 0, borderRadius: 10, boxShadow: '0 4px 12px rgba(234,88,12,0.3)',
    color: '#fff', cursor: 'pointer', display: 'inline-flex',
    fontSize: '0.9rem', fontWeight: 700, gap: 7, minHeight: 44, padding: '0 24px',
  },
  saveBtnLoading: { opacity: 0.7, pointerEvents: 'none' },
  btnSpinner: {
    animation: 'spin 0.8s linear infinite', border: '2px solid rgba(255,255,255,0.3)',
    borderRadius: '50%', borderTopColor: '#fff', display: 'inline-block', height: 14, width: 14,
  },
};

export default EventFormPage;
