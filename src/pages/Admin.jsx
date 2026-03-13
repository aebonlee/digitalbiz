import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { getAllProfiles } from '../utils/supabase';

const Admin = () => {
  const { isAdmin } = useAuth();
  const { t } = useLanguage();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [providerFilter, setProviderFilter] = useState('');

  useEffect(() => {
    if (!isAdmin) {
      setLoading(false);
      return;
    }
    getAllProfiles().then((data) => {
      setProfiles(data);
      setLoading(false);
    });
  }, [isAdmin]);

  const providers = useMemo(() => {
    const set = new Set(profiles.map((p) => p.provider || 'email').filter(Boolean));
    return [...set].sort();
  }, [profiles]);

  const filtered = useMemo(() => {
    let list = profiles;
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (p) =>
          (p.display_name || '').toLowerCase().includes(q) ||
          (p.email || '').toLowerCase().includes(q)
      );
    }
    if (providerFilter) {
      list = list.filter((p) => (p.provider || 'email') === providerFilter);
    }
    return list;
  }, [profiles, search, providerFilter]);

  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const totalMembers = profiles.length;
  const recentSignups = profiles.filter(
    (p) => p.created_at && new Date(p.created_at) >= sevenDaysAgo
  ).length;
  const recentLogins = profiles.filter(
    (p) => p.last_login_at && new Date(p.last_login_at) >= sevenDaysAgo
  ).length;

  const formatDate = (dateStr) => {
    if (!dateStr) return t('site.admin.never');
    const d = new Date(dateStr);
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isAdmin) {
    return (
      <div className="section">
        <div className="container">
          <div className="admin-access-denied">{t('site.admin.accessDenied')}</div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="container">
        <h2 className="section-title">{t('site.admin.title')}</h2>
        <p className="section-subtitle">{t('site.admin.subtitle')}</p>

        {/* Stats Cards */}
        <div className="admin-stats">
          <div className="admin-stat-card">
            <div className="admin-stat-value">{totalMembers}{t('site.admin.unit')}</div>
            <div className="admin-stat-label">{t('site.admin.totalMembers')}</div>
          </div>
          <div className="admin-stat-card">
            <div className="admin-stat-value">{recentSignups}{t('site.admin.unit')}</div>
            <div className="admin-stat-label">{t('site.admin.recentSignups')}</div>
          </div>
          <div className="admin-stat-card">
            <div className="admin-stat-value">{recentLogins}{t('site.admin.unit')}</div>
            <div className="admin-stat-label">{t('site.admin.recentLogins')}</div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="admin-toolbar">
          <input
            type="text"
            className="admin-search"
            placeholder={t('site.admin.search')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="admin-filter"
            value={providerFilter}
            onChange={(e) => setProviderFilter(e.target.value)}
          >
            <option value="">{t('site.admin.allProviders')}</option>
            {providers.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        {/* Members Table */}
        <div className="board-table-wrapper">
          <table className="board-table">
            <thead>
              <tr>
                <th>{t('site.admin.name')}</th>
                <th>{t('site.admin.email')}</th>
                <th className="board-col-author">{t('site.admin.provider')}</th>
                <th className="board-col-category">{t('site.admin.role')}</th>
                <th className="board-col-date">{t('site.admin.signupDate')}</th>
                <th className="board-col-date">{t('site.admin.lastLogin')}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-light)' }}>
                    {t('site.admin.noMembers')}
                  </td>
                </tr>
              ) : (
                filtered.map((p) => (
                  <tr key={p.id}>
                    <td>{p.display_name || '-'}</td>
                    <td>{p.email || '-'}</td>
                    <td className="board-col-author">{p.provider || 'email'}</td>
                    <td className="board-col-category">
                      <span className={`board-badge ${p.role === 'admin' ? 'badge-notice' : 'badge-free'}`}>
                        {p.role || 'member'}
                      </span>
                    </td>
                    <td className="board-col-date">{formatDate(p.created_at)}</td>
                    <td className="board-col-date">{formatDate(p.last_login_at)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
