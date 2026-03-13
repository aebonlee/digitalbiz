import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { getGalleryItems } from '../utils/supabase';
import Pagination from '../components/Pagination';
import SEOHead from '../components/SEOHead';

const CATEGORIES = ['all', 'coding', 'artwork', 'project', 'screenshot'];

const Gallery = () => {
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
    const result = await getGalleryItems(page, cat);
    setItems(result.items);
    setTotal(result.total);
    setLoading(false);
  };

  const getCategoryLabel = (cat) => {
    const map = {
      all: t('site.gallery.all'),
      artwork: t('site.gallery.artwork'),
      project: t('site.gallery.project'),
      screenshot: t('site.gallery.screenshot'),
      coding: t('site.gallery.coding'),
    };
    return map[cat] || cat;
  };

  return (
    <>
      <SEOHead title={t('site.gallery.title')} path="/community/gallery" />

      <section className="page-header">
        <div className="container">
          <h1>{t('site.gallery.title')}</h1>
          <p>{t('site.gallery.subtitle')}</p>
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
              <Link to="/community/gallery/write" className="board-write-btn">
                {t('site.gallery.write')}
              </Link>
            )}
          </div>

          {loading ? (
            <div className="board-loading">
              <div className="loading-spinner"></div>
            </div>
          ) : items.length === 0 ? (
            <div className="board-empty">{t('site.gallery.empty')}</div>
          ) : (
            <>
              <div className="lecture-grid">
                {items.map((item) => (
                  <Link
                    to={`/community/gallery/${item.id}`}
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
                      <div className="lecture-card-meta">
                        <span>{item.author_name}</span>
                        <span>{t('site.gallery.views')}: {item.views || 0}</span>
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

export default Gallery;
