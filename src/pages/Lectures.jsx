import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { getLectures, incrementLectureViews } from '../utils/supabase';
import getSupabase from '../utils/supabase';
import SEOHead from '../components/SEOHead';

const Lectures = () => {
  const { t } = useLanguage();
  const { isAdmin, isLoggedIn } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  const client = getSupabase();

  useEffect(() => {
    loadLectures();
  }, []);

  const loadLectures = async () => {
    setLoading(true);
    const data = await getLectures();
    setLectures(data);
    setLoading(false);
  };

  const toggleExpand = (lecture) => {
    if (expandedId === lecture.id) {
      setExpandedId(null);
    } else {
      setExpandedId(lecture.id);
      incrementLectureViews(lecture.id);
    }
  };

  const handleFileAction = (e, lecture) => {
    if (!isLoggedIn) {
      e.preventDefault();
      showToast(t('download.loginRequired'), 'error');
      navigate('/login');
    }
  };

  const getFileUrl = (fileUrl) => {
    if (!fileUrl) return null;
    if (fileUrl.startsWith('http')) return fileUrl;
    const cleanPath = fileUrl.startsWith('/pdf/') ? fileUrl : `/pdf/${fileUrl}`;
    return `${import.meta.env.BASE_URL}${cleanPath.replace(/^\//, '')}`;
  };

  const getFileName = (fileUrl) => {
    if (!fileUrl) return '';
    return fileUrl.split('/').pop();
  };

  return (
    <>
      <SEOHead title={t('site.references.title')} path="/references" />

      <section className="page-header">
        <div className="container">
          <h1>{t('site.references.title')}</h1>
          <p>{t('site.references.subtitle')}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {!client ? (
            <div className="board-empty">{t('site.board.notConfigured')}</div>
          ) : (
            <>
              {isAdmin && (
                <div className="lecture-toolbar">
                  <Link to="/references/write" className="board-write-btn">
                    {t('site.references.write')}
                  </Link>
                </div>
              )}

              {loading ? (
                <div className="board-loading">
                  <div className="loading-spinner"></div>
                </div>
              ) : lectures.length === 0 ? (
                <div className="board-empty">{t('site.references.empty')}</div>
              ) : (
                <div className="materials-table-wrapper">
                  <table className="materials-table">
                    <thead>
                      <tr>
                        <th className="materials-col-week">{t('site.lectures.weekPrefix')}</th>
                        <th>{t('site.lectures.titleLabel')}</th>
                        <th className="ref-col-actions">{t('site.lectures.materials.actions')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lectures.map((lecture) => {
                        const isExpanded = expandedId === lecture.id;
                        const fileUrl = getFileUrl(lecture.file_url);
                        return (
                          <React.Fragment key={lecture.id}>
                            <tr
                              className={isExpanded ? 'active-row' : ''}
                              style={{ cursor: 'pointer' }}
                              onClick={() => toggleExpand(lecture)}
                            >
                              <td className="materials-col-week">
                                <span className="materials-week-badge">
                                  Week {lecture.week_number}
                                </span>
                              </td>
                              <td className="materials-title-cell">
                                <div className="ref-title-row">
                                  <span className={`ref-expand-icon ${isExpanded ? 'expanded' : ''}`}>&#9654;</span>
                                  <span>{lecture.title}</span>
                                </div>
                              </td>
                              <td className="ref-col-actions" onClick={(e) => e.stopPropagation()}>
                                <div className="materials-btn-group">
                                  {fileUrl ? (
                                    <>
                                      <a
                                        className="materials-btn newtab"
                                        href={fileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => handleFileAction(e, lecture)}
                                      >
                                        {t('site.lectures.materials.view')}
                                      </a>
                                      <a
                                        className="materials-btn download"
                                        href={fileUrl}
                                        download={getFileName(lecture.file_url)}
                                        onClick={(e) => handleFileAction(e, lecture)}
                                      >
                                        {t('site.lectures.materials.download')}
                                      </a>
                                    </>
                                  ) : (
                                    <span className="ref-no-file">{t('site.references.noFile')}</span>
                                  )}
                                  {isAdmin && (
                                    <Link
                                      to={`/references/edit/${lecture.id}`}
                                      className="materials-btn ref-edit-btn"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      {t('site.lectures.edit')}
                                    </Link>
                                  )}
                                </div>
                              </td>
                            </tr>
                            {isExpanded && (
                              <tr className="ref-dropdown-row">
                                <td colSpan="3">
                                  <div className="ref-dropdown-content">
                                    {lecture.content ? (
                                      <div className="ref-content-text">
                                        {lecture.content.split('\n').map((line, i) => (
                                          <p key={i}>{line || '\u00A0'}</p>
                                        ))}
                                      </div>
                                    ) : (
                                      <p className="ref-content-empty">{t('site.references.noContent')}</p>
                                    )}
                                    {lecture.description && (
                                      <div className="ref-description">
                                        <strong>{t('site.lectures.description')}:</strong> {lecture.description}
                                      </div>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Lectures;
