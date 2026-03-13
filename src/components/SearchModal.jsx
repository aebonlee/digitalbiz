import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { searchPosts } from '../utils/supabase';

const SearchModal = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setResults([]);
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const doSearch = useCallback(async (q) => {
    if (!q.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      const data = await searchPosts(q);
      setResults(data);
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => doSearch(val), 300);
  };

  const handleNavigate = (path) => {
    onClose();
    navigate(path);
  };

  const hasQuery = query.trim().length > 0;

  if (!isOpen) return null;

  return (
    <div className="search-modal-overlay" onClick={onClose}>
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>
        <div className="search-modal-header">
          <div className="search-input-wrapper">
            <svg className="search-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              className="search-input"
              placeholder={t('search.placeholder')}
              value={query}
              onChange={handleChange}
            />
            <button className="search-close-btn" onClick={onClose}>ESC</button>
          </div>
        </div>

        <div className="search-modal-body">
          {loading && (
            <div className="search-loading">{t('search.searching')}</div>
          )}

          {!loading && hasQuery && results.length === 0 && (
            <div className="search-empty">{t('search.noResults')}</div>
          )}

          {!loading && !hasQuery && (
            <div className="search-hint">{t('search.hint')}</div>
          )}

          {!loading && results.length > 0 && (
            <div className="search-group">
              <h4 className="search-group-title">{t('search.board')}</h4>
              {results.map((item) => (
                <button
                  key={`board-${item.id}`}
                  className="search-result-item"
                  onClick={() => handleNavigate(`/community/board/${item.id}`)}
                >
                  <span className="search-result-type">Board</span>
                  <div className="search-result-info">
                    <span className="search-result-title">{item.title}</span>
                    <span className="search-result-meta">{item.author_name} · {new Date(item.created_at).toLocaleDateString()}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
