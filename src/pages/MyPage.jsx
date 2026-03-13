import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { updateProfile } from '../utils/auth';
import SEOHead from '../components/SEOHead';

const MyPage = () => {
  const { t } = useLanguage();
  const { user, profile, signOut, refreshProfile } = useAuth();
  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ displayName: '' });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (profile) {
      setForm({ displayName: profile.display_name || '' });
    }
  }, [profile]);

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      await updateProfile(user.id, { display_name: form.displayName });
      await refreshProfile();
      setEditing(false);
      setMessage(t('auth.profileUpdated'));
    } catch (err) {
      setMessage(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <>
      <SEOHead title="마이페이지" path="/mypage" noindex />
      <section className="page-header">
        <div className="container">
          <h1>{t('auth.myPage')}</h1>
        </div>
      </section>

      <section className="auth-section">
        <div className="container">
          <div className="mypage-card">
            <div className="mypage-avatar">
              {profile?.avatar_url ? (
                <img src={profile.avatar_url} alt={profile.display_name} loading="lazy" />
              ) : (
                <div className="mypage-avatar-placeholder">
                  {(profile?.display_name || user?.email || '?')[0].toUpperCase()}
                </div>
              )}
            </div>

            <div className="mypage-info">
              {editing ? (
                <div className="mypage-edit-form">
                  <div className="auth-form-group">
                    <label>{t('auth.displayName')}</label>
                    <input type="text" value={form.displayName} onChange={e => setForm({ ...form, displayName: e.target.value })} />
                  </div>
                  <div className="mypage-edit-actions">
                    <button className="board-btn primary" onClick={handleSave} disabled={saving}>{saving ? t('auth.saving') : t('auth.save')}</button>
                    <button className="board-btn" onClick={() => setEditing(false)}>{t('community.cancel')}</button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="mypage-name">{profile?.display_name || t('auth.noName')}</h2>
                  <p className="mypage-email">{user?.email}</p>
                  <p className="mypage-provider">{profile?.provider ? `${t('auth.loginWith')} ${profile.provider}` : t('auth.emailAccount')}</p>
                  {profile?.role === 'admin' && <span className="mypage-role-badge">{t('auth.admin')}</span>}
                  <button className="board-btn" onClick={() => setEditing(true)} style={{ marginTop: '16px' }}>{t('auth.editProfile')}</button>
                </>
              )}
              {message && <div className="auth-message">{message}</div>}
            </div>

            <div className="mypage-footer">
              <button className="board-btn danger" onClick={handleSignOut}>{t('auth.logout')}</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MyPage;
