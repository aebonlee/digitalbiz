import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { createPost } from '../utils/supabase';
import SEOHead from '../components/SEOHead';

const BoardWrite = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user } = useAuth();
  const { showToast } = useToast();

  const [form, setForm] = useState({
    title: '',
    category: 'free',
    content: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) return;

    setSubmitting(true);
    try {
      const post = await createPost({
        title: form.title.trim(),
        category: form.category,
        content: form.content.trim(),
        user_id: user.id,
        author_name: user.user_metadata?.full_name || user.email,
      });
      showToast('게시글이 등록되었습니다.', 'success');
      navigate(`/community/board/${post.id}`);
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEOHead title={t('site.board.writeTitle')} path="/community/board/write" noindex />

      <section className="page-header">
        <div className="container">
          <h1>{t('site.board.writeTitle')}</h1>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <form className="board-write-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>{t('site.board.category')}</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                <option value="free">{t('site.board.free')}</option>
                <option value="question">{t('site.board.question')}</option>
                <option value="notice">{t('site.board.notice')}</option>
              </select>
            </div>

            <div className="form-group">
              <label>{t('site.board.titleLabel')}</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder={t('site.board.titlePlaceholder')}
                required
              />
            </div>

            <div className="form-group">
              <label>{t('site.board.content')}</label>
              <textarea
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                placeholder={t('site.board.contentPlaceholder')}
                rows={12}
                required
              />
            </div>

            <div className="form-actions">
              <button type="button" className="board-btn" onClick={() => navigate('/community/board')}>
                {t('site.board.cancel')}
              </button>
              <button type="submit" className="board-btn primary" disabled={submitting}>
                {submitting ? t('site.board.submitting') : t('site.board.submit')}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default BoardWrite;
