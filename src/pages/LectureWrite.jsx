import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { createLecture, updateLecture, getLectureById } from '../utils/supabase';
import SEOHead from '../components/SEOHead';

const LectureWrite = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { t } = useLanguage();
  const { user, isAdmin } = useAuth();
  const { showToast } = useToast();

  const isEdit = !!id;

  const [form, setForm] = useState({
    week_number: '',
    title: '',
    file_url: '',
    content: '',
    is_published: true,
  });
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      loadLecture();
    }
  }, [id]);

  const loadLecture = async () => {
    setLoading(true);
    const data = await getLectureById(id);
    if (data) {
      setForm({
        week_number: data.week_number || '',
        title: data.title || '',
        file_url: (data.file_url || '').replace(/^\/pdf\//, ''),
        content: data.content || '',
        is_published: data.is_published !== false,
      });
    }
    setLoading(false);
  };

  if (!isAdmin) {
    return (
      <section className="section">
        <div className="container">
          <div className="board-empty">{t('site.lectures.adminOnly')}</div>
          <Link to="/references" className="board-btn">{t('site.lectures.backToList')}</Link>
        </div>
      </section>
    );
  }

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.week_number || !form.title.trim()) return;

    setSubmitting(true);
    try {
      const lectureData = {
        week_number: Number(form.week_number),
        title: form.title.trim(),
        description: '',
        slide_url: '',
        file_url: form.file_url.trim() ? (form.file_url.trim().startsWith('http') ? form.file_url.trim() : `/pdf/${form.file_url.trim()}`) : '',
        cover_image: '',
        content: form.content.trim(),
        tags: [],
        is_published: form.is_published,
        user_id: user.id,
      };

      let lecture;
      if (isEdit) {
        lecture = await updateLecture(id, lectureData);
        showToast(t('site.lectures.updated'), 'success');
      } else {
        lecture = await createLecture(lectureData);
        showToast(t('site.lectures.created'), 'success');
      }
      navigate(`/references/${lecture.id}`);
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <section className="section">
        <div className="container" style={{ textAlign: 'center', padding: '80px 0' }}>
          <div className="loading-spinner"></div>
        </div>
      </section>
    );
  }

  return (
    <>
      <SEOHead
        title={isEdit ? t('site.lectures.editTitle') : t('site.lectures.writeTitle')}
        path={isEdit ? `/references/edit/${id}` : '/references/write'}
        noindex
      />

      <section className="page-header">
        <div className="container">
          <h1>{isEdit ? t('site.lectures.editTitle') : t('site.lectures.writeTitle')}</h1>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <form className="lecture-write-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group form-group-small">
                <label>{t('site.lectures.weekNumber')}</label>
                <input
                  type="number"
                  min="1"
                  value={form.week_number}
                  onChange={(e) => handleChange('week_number', e.target.value)}
                  placeholder={t('site.lectures.weekNumberPlaceholder')}
                  required
                />
              </div>
              <div className="form-group form-group-grow">
                <label>{t('site.lectures.titleLabel')}</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  placeholder={t('site.lectures.titlePlaceholder')}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>{t('site.lectures.content')}</label>
              <textarea
                value={form.content}
                onChange={(e) => handleChange('content', e.target.value)}
                placeholder={t('site.lectures.contentPlaceholder')}
                rows={12}
              />
            </div>

            <div className="form-group">
              <label>{t('site.lectures.fileUrl')}</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                <span style={{ padding: '10px 12px', background: 'var(--bg-light-gray)', border: '1px solid var(--border-light)', borderRight: 'none', borderRadius: 'var(--radius-md) 0 0 var(--radius-md)', fontSize: '0.9rem', color: 'var(--text-light)', whiteSpace: 'nowrap' }}>/pdf/</span>
                <input
                  type="text"
                  value={form.file_url}
                  onChange={(e) => handleChange('file_url', e.target.value)}
                  placeholder={t('site.lectures.fileUrlPlaceholder')}
                  style={{ borderRadius: '0 var(--radius-md) var(--radius-md) 0' }}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-checkbox-label">
                <input
                  type="checkbox"
                  checked={form.is_published}
                  onChange={(e) => handleChange('is_published', e.target.checked)}
                />
                {t('site.lectures.isPublished')}
              </label>
            </div>

            <div className="form-actions">
              <button type="button" className="board-btn" onClick={() => navigate('/references')}>
                {t('site.lectures.cancel')}
              </button>
              <button type="submit" className="board-btn primary" disabled={submitting}>
                {submitting ? t('site.lectures.submitting') : t('site.lectures.submit')}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default LectureWrite;
