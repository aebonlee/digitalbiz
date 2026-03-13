import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import {
  getGalleryItemById,
  deleteGalleryItem,
  incrementGalleryViews,
  getGalleryComments,
  createGalleryComment,
  deleteGalleryComment,
} from '../utils/supabase';
import SEOHead from '../components/SEOHead';

const GalleryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user, isAdmin } = useAuth();
  const { showToast } = useToast();

  const [item, setItem] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadItem();
  }, [id]);

  const loadItem = async () => {
    setLoading(true);
    const data = await getGalleryItemById(id);
    setItem(data);
    if (data) {
      incrementGalleryViews(id);
      const cmts = await getGalleryComments(id);
      setComments(cmts);
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!window.confirm(t('site.gallery.deleteConfirm'))) return;
    try {
      await deleteGalleryItem(id);
      showToast('삭제되었습니다.', 'success');
      navigate('/community/gallery');
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleCommentSubmit = async () => {
    if (!commentText.trim()) return;
    setSubmitting(true);
    try {
      await createGalleryComment({
        gallery_id: Number(id),
        user_id: user.id,
        author_name: user.user_metadata?.full_name || user.email,
        content: commentText.trim(),
      });
      setCommentText('');
      const cmts = await getGalleryComments(id);
      setComments(cmts);
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCommentDelete = async (commentId) => {
    if (!window.confirm(t('comments.deleteConfirm'))) return;
    try {
      await deleteGalleryComment(commentId);
      const cmts = await getGalleryComments(id);
      setComments(cmts);
    } catch (err) {
      showToast(err.message, 'error');
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

  if (!item) {
    return (
      <section className="section">
        <div className="container">
          <div className="board-empty">{t('site.gallery.notFound')}</div>
          <Link to="/community/gallery" className="board-btn">{t('site.gallery.backToList')}</Link>
        </div>
      </section>
    );
  }

  const isAuthor = user?.id === item.user_id;

  return (
    <>
      <SEOHead title={item.title} path={`/community/gallery/${id}`} />

      <section className="page-header">
        <div className="container">
          <h1>{t('site.gallery.title')}</h1>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="board-detail">
            {/* Image */}
            <div className="gallery-detail-image">
              <img src={item.image_url} alt={item.title} />
            </div>

            <div className="board-detail-header">
              <h2 className="board-detail-title">{item.title}</h2>
              <div className="board-detail-meta">
                <span>{item.author_name}</span>
                <span>{new Date(item.created_at).toLocaleDateString('ko-KR')}</span>
                <span>{t('site.gallery.views')}: {item.views || 0}</span>
              </div>
            </div>

            {item.link_url && (
              <div style={{ padding: '12px 24px', borderBottom: '1px solid var(--border-light)' }}>
                <a href={item.link_url} target="_blank" rel="noopener noreferrer" className="board-btn primary">
                  {t('site.gallery.openLink')} ↗
                </a>
              </div>
            )}

            {item.description && (
              <div className="board-detail-content">
                {item.description.split('\n').map((line, i) => (
                  <p key={i}>{line || '\u00A0'}</p>
                ))}
              </div>
            )}

            <div className="board-detail-actions">
              <Link to="/community/gallery" className="board-btn">{t('site.gallery.backToList')}</Link>
              {(isAuthor || isAdmin) && (
                <Link to={`/community/gallery/edit/${id}`} className="board-btn">
                  {t('site.gallery.edit')}
                </Link>
              )}
              {(isAuthor || isAdmin) && (
                <button className="board-btn danger" onClick={handleDelete}>
                  {t('site.gallery.delete')}
                </button>
              )}
            </div>
          </div>

          {/* Comments */}
          <div className="board-comments">
            <h3>{t('comments.title')} ({comments.length})</h3>
            {comments.length === 0 ? (
              <p className="comments-empty">{t('comments.empty')}</p>
            ) : (
              <ul className="comments-list">
                {comments.map((c) => (
                  <li key={c.id} className="comment-item">
                    <div className="comment-header">
                      <strong>{c.author_name}</strong>
                      <span>{new Date(c.created_at).toLocaleDateString('ko-KR')}</span>
                      {(user?.id === c.user_id || isAdmin) && (
                        <button className="comment-delete" onClick={() => handleCommentDelete(c.id)}>
                          {t('comments.delete')}
                        </button>
                      )}
                    </div>
                    <p className="comment-content">{c.content}</p>
                  </li>
                ))}
              </ul>
            )}

            {user ? (
              <div className="comment-form">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder={t('comments.placeholder')}
                  rows={3}
                />
                <button
                  className="board-btn primary"
                  onClick={handleCommentSubmit}
                  disabled={submitting || !commentText.trim()}
                >
                  {submitting ? t('comments.submitting') : t('comments.submit')}
                </button>
              </div>
            ) : (
              <p className="comments-login-notice">{t('comments.loginRequired')}</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default GalleryDetail;
