import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { getWebsites } from '../utils/supabase';
import Pagination from '../components/Pagination';
import SEOHead from '../components/SEOHead';

const CATEGORIES = ['all', 'education', 'devtool', 'design', 'ai', 'reference'];

const Websites = () => {
  const { t } = useLanguage();
  const { isLoggedIn } = useAuth();
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  const perPage = 12;
  const totalPages = Math.ceil(total / perPage);

  useEffect(() => {
    loadItems();
  }, [page, category]);

  const loadItems = async () => {
    setLoading(true);
    const cat = category === 'all' ? null : category;
    const result = await getWebsites(page, cat);
    setItems(result.items);
    setTotal(result.total);
    setLoading(false);
  };

  const getCategoryLabel = (cat) => {
    const map = {
      all: t('site.websites.all'),
      education: t('site.websites.education'),
      devtool: t('site.websites.devtool'),
      design: t('site.websites.design'),
      ai: t('site.websites.ai'),
      reference: t('site.websites.reference'),
    };
    return map[cat] || cat;
  };

  return (
    <>
      <SEOHead title={t('site.websites.title')} path="/community/websites" />

      <section className="page-header">
        <div className="container">
          <h1>{t('site.websites.title')}</h1>
          <p>{t('site.websites.subtitle')}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="board-toolbar">
            <div className="board-categories">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={`board-category-btn ${category === cat ? 'active' : ''}`}
                  onClick={() => { setCategory(cat); setPage(1); }}
                >
                  {getCategoryLabel(cat)}
                </button>
              ))}
            </div>
            {isLoggedIn && (
              <Link to="/community/websites/write" className="board-write-btn">
                {t('site.websites.write')}
              </Link>
            )}
          </div>

          {loading ? (
            <div className="board-loading">
              <div className="loading-spinner"></div>
            </div>
          ) : items.length === 0 ? (
            <div className="board-empty">{t('site.websites.empty')}</div>
          ) : (
            <>
              <div className="lecture-grid">
                {items.map((item) => (
                  <Link
                    to={`/community/websites/${item.id}`}
                    key={item.id}
                    className="lecture-card"
                  >
                    <div className="lecture-card-image">
                      {item.image_url ? (
                        <img src={item.image_url} alt={item.title} />
                      ) : (
                        <div className="lecture-card-placeholder">{item.title}</div>
                      )}
                    </div>
                    <div className="lecture-card-body">
                      <span className="lecture-week-badge">{getCategoryLabel(item.category)}</span>
                      <h3 className="lecture-card-title">{item.title}</h3>
                      <p className="website-url">{item.url}</p>
                      {item.description && (
                        <p className="lecture-card-desc">{item.description}</p>
                      )}
                      <div className="lecture-card-meta">
                        <span>{item.author_name}</span>
                        <span>{t('site.websites.views')}: {item.views || 0}</span>
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

export default Websites;
