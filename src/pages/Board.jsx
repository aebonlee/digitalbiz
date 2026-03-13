import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { getPosts } from '../utils/supabase';
import getSupabase from '../utils/supabase';
import Pagination from '../components/Pagination';
import SEOHead from '../components/SEOHead';

const CATEGORIES = ['all', 'notice', 'question', 'free'];

const Board = () => {
  const { t } = useLanguage();
  const { isLoggedIn } = useAuth();
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  const client = getSupabase();
  const perPage = 10;
  const totalPages = Math.ceil(total / perPage);

  useEffect(() => {
    loadPosts();
  }, [page, category]);

  const loadPosts = async () => {
    setLoading(true);
    const cat = category === 'all' ? null : category;
    const result = await getPosts(page, cat);
    setPosts(result.posts);
    setTotal(result.total);
    setLoading(false);
  };

  const getCategoryLabel = (cat) => {
    const map = {
      notice: t('site.board.notice'),
      question: t('site.board.question'),
      free: t('site.board.free'),
    };
    return map[cat] || cat;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('ko-KR');
  };

  return (
    <>
      <SEOHead title={t('site.board.title')} path="/community/board" />

      <section className="page-header">
        <div className="container">
          <h1>{t('site.board.title')}</h1>
          <p>{t('site.board.subtitle')}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {!client ? (
            <div className="board-empty">{t('site.board.notConfigured')}</div>
          ) : (
            <>
              <div className="board-toolbar">
                <div className="board-categories">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      className={`board-category-btn ${category === cat ? 'active' : ''}`}
                      onClick={() => { setCategory(cat); setPage(1); }}
                    >
                      {cat === 'all' ? t('site.board.all') : getCategoryLabel(cat)}
                    </button>
                  ))}
                </div>
                {isLoggedIn && (
                  <Link to="/community/board/write" className="board-write-btn">
                    {t('site.board.write')}
                  </Link>
                )}
              </div>

              {loading ? (
                <div className="board-loading">
                  <div className="loading-spinner"></div>
                </div>
              ) : posts.length === 0 ? (
                <div className="board-empty">{t('site.board.noPost')}</div>
              ) : (
                <>
                  <div className="board-table-wrapper">
                    <table className="board-table">
                      <thead>
                        <tr>
                          <th className="board-col-category">{t('site.board.category')}</th>
                          <th className="board-col-title">{t('site.board.titleLabel')}</th>
                          <th className="board-col-author">{t('site.board.author')}</th>
                          <th className="board-col-date">{t('site.board.date')}</th>
                          <th className="board-col-views">{t('site.board.views')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {posts.map((post) => (
                          <tr key={post.id}>
                            <td className="board-col-category">
                              <span className={`board-badge badge-${post.category}`}>
                                {getCategoryLabel(post.category)}
                              </span>
                            </td>
                            <td className="board-col-title">
                              <Link to={`/community/board/${post.id}`}>{post.title}</Link>
                            </td>
                            <td className="board-col-author">{post.author_name}</td>
                            <td className="board-col-date">{formatDate(post.created_at)}</td>
                            <td className="board-col-views">{post.views || 0}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                  />
                </>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Board;
