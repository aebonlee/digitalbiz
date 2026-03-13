import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { createWebsite, updateWebsite, getWebsiteById } from '../utils/supabase';
import SEOHead from '../components/SEOHead';

const WebsiteWrite = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { t } = useLanguage();
  const { user } = useAuth();
  const { showToast } = useToast();

  const isEdit = !!id;

  const [form, setForm] = useState({
    title: '',
    category: 'education',
    url: '',
    image_url: '',
    description: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      loadItem();
    }
  }, [id]);

  const loadItem = async () => {
    setLoading(true);
    const data = await getWebsiteById(id);
    if (data) {
      setForm({
        title: data.title || '',
        category: data.category || 'education',
        url: data.url || '',
        image_url: data.image_url || '',
        description: data.description || '',
      });
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.url.trim()) return;

    setSubmitting(true);
    try {
      const itemData = {
        title: form.title.trim(),
        category: form.category,
        url: form.url.trim(),
        image_url: form.image_url.trim() || null,
        description: form.description.trim(),
      };

      let item;
      if (isEdit) {
        item = await updateWebsite(id, itemData);
        showToast(t('site.websites.updated'), 'success');
      } else {
        item = await createWebsite({
          ...itemData,
          user_id: user.id,
          author_name: user.user_metadata?.full_name || user.email,
        });
        showToast('사이트가 등록되었습니다.', 'success');
      }
      navigate(`/community/websites/${item.id}`);
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

  const pageTitle = isEdit ? t('site.websites.editTitle') : t('site.websites.writeTitle');

  return (
    <>
      <SEOHead title={pageTitle} path={isEdit ? `/community/websites/edit/${id}` : '/community/websites/write'} noindex />

      <section className="page-header">
        <div className="container">
          <h1>{pageTitle}</h1>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <form className="board-write-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>{t('site.websites.category')}</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                <option value="education">{t('site.websites.education')}</option>
                <option value="devtool">{t('site.websites.devtool')}</option>
                <option value="design">{t('site.websites.design')}</option>
                <option value="ai">{t('site.websites.ai')}</option>
                <option value="reference">{t('site.websites.reference')}</option>
              </select>
            </div>

            <div className="form-group">
              <label>{t('site.websites.titleLabel')}</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder={t('site.websites.titlePlaceholder')}
                required
              />
            </div>

            <div className="form-group">
              <label>{t('site.websites.url')}</label>
              <input
                type="url"
                value={form.url}
                onChange={(e) => setForm({ ...form, url: e.target.value })}
                placeholder={t('site.websites.urlPlaceholder')}
                required
              />
            </div>

            <div className="form-group">
              <label>{t('site.websites.imageUrl')}</label>
              <input
                type="url"
                value={form.image_url}
                onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                placeholder={t('site.websites.imageUrlPlaceholder')}
              />
            </div>

            <div className="form-group">
              <label>{t('site.websites.description')}</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder={t('site.websites.descriptionPlaceholder')}
                rows={6}
              />
            </div>

            <div className="form-actions">
              <button type="button" className="board-btn" onClick={() => navigate('/community/websites')}>
                {t('site.websites.cancel')}
              </button>
              <button type="submit" className="board-btn primary" disabled={submitting}>
                {submitting ? t('site.websites.submitting') : t('site.websites.submit')}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default WebsiteWrite;
