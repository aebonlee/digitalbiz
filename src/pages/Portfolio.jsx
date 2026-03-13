import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { getPortfolios } from '../utils/supabase';
import Pagination from '../components/Pagination';
import SEOHead from '../components/SEOHead';

const Portfolio = () => {
  const { t } = useLanguage();
  const { isLoggedIn } = useAuth();
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const perPage = 12;
  const totalPages = Math.ceil(total / perPage);

  useEffect(() => {
    loadItems();
  }, [page]);

  const loadItems = async () => {
    setLoading(true);
    const result = await getPortfolios(page);
    setItems(result.items);
    setTotal(result.total);
    setLoading(false);
  };

  return (
    <>
      <SEOHead title={t('site.portfolio.title')} path="/community/portfolio" />

      <section className="page-header">
        <div className="container">
          <h1>{t('site.portfolio.title')}</h1>
          <p>{t('site.portfolio.subtitle')}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="board-toolbar">
            <div></div>
            {isLoggedIn && (
              <Link to="/community/portfolio/write" className="board-write-btn">
                {t('site.portfolio.write')}
              </Link>
            )}
          </div>

          {loading ? (
            <div className="board-loading">
              <div className="loading-spinner"></div>
            </div>
          ) : items.length === 0 ? (
            <div className="board-empty">{t('site.portfolio.empty')}</div>
          ) : (
            <>
              <div className="lecture-grid">
                {items.map((item) => (
                  <Link
                    to={`/community/portfolio/${item.id}`}
                    key={item.id}
                    className="lecture-card"
                  >
                    <div className="lecture-card-image">
                      {item.cover_image ? (
                        <img src={item.cover_image} alt={item.title} />
                      ) : (
                        <div className="lecture-card-placeholder">{item.title}</div>
                      )}
                    </div>
                    <div className="lecture-card-body">
                      <h3 className="lecture-card-title">{item.title}</h3>
                      {item.summary && (
                        <p className="portfolio-summary">{item.summary}</p>
                      )}
                      {item.tags && (
                        <div className="lecture-card-tags">
                          {item.tags.split(',').map((tag, i) => (
                            <span key={i} className="lecture-tag">{tag.trim()}</span>
                          ))}
                        </div>
                      )}
                      <div className="lecture-card-meta">
                        <span>{item.author_name}</span>
                        <span>{new Date(item.created_at).toLocaleDateString('ko-KR')}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Portfolio;
