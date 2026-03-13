import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { getLectureById, deleteLecture, incrementLectureViews } from '../utils/supabase';
import SEOHead from '../components/SEOHead';

const LectureDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { isAdmin, isLoggedIn } = useAuth();
  const { showToast } = useToast();

  const [lecture, setLecture] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLecture();
  }, [id]);

  const loadLecture = async () => {
    setLoading(true);
    const data = await getLectureById(id);
    setLecture(data);
    if (data) {
      incrementLectureViews(id);
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!window.confirm(t('site.lectures.deleteConfirm'))) return;
    try {
      await deleteLecture(id);
      showToast(t('site.lectures.deleted'), 'success');
      navigate('/references');
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

  if (!lecture) {
    return (
      <section className="section">
        <div className="container">
          <div className="board-empty">{t('site.lectures.notFound')}</div>
          <Link to="/references" className="board-btn">{t('site.lectures.backToList')}</Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <SEOHead title={lecture.title} path={`/references/${id}`} />

      <section className="page-header">
        <div className="container">
          <h1>{t('site.references.title')}</h1>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="lecture-detail">
            <div className="lecture-detail-header">
              <span className="lecture-week-badge">
                Week {lecture.week_number}
              </span>
              <h2 className="lecture-detail-title">{lecture.title}</h2>
              <div className="lecture-detail-meta">
                <span>{new Date(lecture.created_at).toLocaleDateString('ko-KR')}</span>
                <span>{t('site.lectures.views')}: {lecture.views || 0}</span>
              </div>
            </div>

            {lecture.content && (
              <div className="lecture-detail-content">
                {lecture.content.split('\n').map((line, i) => (
                  <p key={i}>{line || '\u00A0'}</p>
                ))}
              </div>
            )}

            {lecture.file_url && (
              <div className="lecture-file-section">
                {isLoggedIn ? (
                  <a
                    href={lecture.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="board-btn primary"
                  >
                    {t('site.lectures.download')}
                  </a>
                ) : (
                  <button
                    className="board-btn primary"
                    onClick={() => {
                      showToast(t('download.loginRequired'), 'error');
                      navigate('/login');
                    }}
                  >
                    {t('site.lectures.download')}
                  </button>
                )}
              </div>
            )}

            <div className="lecture-detail-actions">
              <Link to="/references" className="board-btn">
                {t('site.lectures.backToList')}
              </Link>
              {isAdmin && (
                <>
                  <Link to={`/references/edit/${id}`} className="board-btn primary">
                    {t('site.lectures.edit')}
                  </Link>
                  <button className="board-btn danger" onClick={handleDelete}>
                    {t('site.lectures.delete')}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LectureDetail;
