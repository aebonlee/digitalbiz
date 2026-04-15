import { useState, useEffect, useMemo, useCallback } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import getSupabase from '../../utils/supabase';
import '../../styles/admin.css';

type Tab = 'members' | 'content' | 'stats';
const PER_PAGE = 10;

interface MemberRow {
  id: string;
  display_name: string | null;
  email: string | null;
  provider: string | null;
  role: string | null;
  created_at: string | null;
  last_login_at: string | null;
  visited_sites: string[] | null;
}

interface PostRow {
  id: string;
  title: string;
  author_name: string | null;
  category: string | null;
  created_at: string;
  views: number;
}

export default function AdminDashboard() {
  const { language } = useLanguage();
  const ko = language === 'ko';
  const [tab, setTab] = useState<Tab>('members');

  /* ── Stats ── */
  const [stats, setStats] = useState({ members: 0, posts: 0, lectures: 0, gallery: 0 });

  /* ── Members ── */
  const [members, setMembers] = useState<MemberRow[]>([]);
  const [memberSearch, setMemberSearch] = useState('');
  const [memberPage, setMemberPage] = useState(1);
  const [memberLoading, setMemberLoading] = useState(false);

  /* ── Content ── */
  const [contentType, setContentType] = useState<'posts' | 'lectures' | 'gallery'>('posts');
  const [posts, setPosts] = useState<PostRow[]>([]);
  const [contentSearch, setContentSearch] = useState('');
  const [contentPage, setContentPage] = useState(1);
  const [contentLoading, setContentLoading] = useState(false);

  const client = getSupabase();

  /* ── Load Stats ── */
  useEffect(() => {
    if (!client) return;
    (async () => {
      const [m, p, l, g] = await Promise.all([
        client.from('user_profiles').select('id', { count: 'exact', head: true }),
        client.from('digb_posts').select('id', { count: 'exact', head: true }),
        client.from('digb_lectures').select('id', { count: 'exact', head: true }),
        client.from('digb_gallery').select('id', { count: 'exact', head: true }),
      ]);
      setStats({
        members: m.count || 0,
        posts: p.count || 0,
        lectures: l.count || 0,
        gallery: g.count || 0,
      });
    })();
  }, [client]);

  /* ── Load Members ── */
  const loadMembers = useCallback(async () => {
    if (!client) return;
    setMemberLoading(true);
    const { data } = await client
      .from('user_profiles')
      .select('id, display_name, email, provider, role, created_at, last_login_at, visited_sites')
      .order('created_at', { ascending: false });
    setMembers((data || []) as MemberRow[]);
    setMemberLoading(false);
  }, [client]);

  useEffect(() => { if (tab === 'members') loadMembers(); }, [tab, loadMembers]);

  const filteredMembers = useMemo(() => {
    if (!memberSearch.trim()) return members;
    const q = memberSearch.trim().toLowerCase();
    return members.filter(
      (m) =>
        (m.display_name || '').toLowerCase().includes(q) ||
        (m.email || '').toLowerCase().includes(q)
    );
  }, [members, memberSearch]);

  const pagedMembers = useMemo(() => {
    const start = (memberPage - 1) * PER_PAGE;
    return filteredMembers.slice(start, start + PER_PAGE);
  }, [filteredMembers, memberPage]);

  const memberTotalPages = Math.max(1, Math.ceil(filteredMembers.length / PER_PAGE));

  /* ── Load Content ── */
  const loadContent = useCallback(async () => {
    if (!client) return;
    setContentLoading(true);
    const table = contentType === 'posts' ? 'digb_posts' : contentType === 'lectures' ? 'digb_lectures' : 'digb_gallery';
    const { data } = await client
      .from(table)
      .select('id, title, author_name, category, created_at, views')
      .order('created_at', { ascending: false });
    setPosts((data || []) as PostRow[]);
    setContentLoading(false);
  }, [client, contentType]);

  useEffect(() => { if (tab === 'content') loadContent(); }, [tab, contentType, loadContent]);

  const filteredContent = useMemo(() => {
    if (!contentSearch.trim()) return posts;
    const q = contentSearch.trim().toLowerCase();
    return posts.filter((p) => (p.title || '').toLowerCase().includes(q));
  }, [posts, contentSearch]);

  const pagedContent = useMemo(() => {
    const start = (contentPage - 1) * PER_PAGE;
    return filteredContent.slice(start, start + PER_PAGE);
  }, [filteredContent, contentPage]);

  const contentTotalPages = Math.max(1, Math.ceil(filteredContent.length / PER_PAGE));

  const handleDeletePost = async (id: string) => {
    if (!client) return;
    if (!confirm(ko ? '정말 삭제하시겠습니까?' : 'Are you sure you want to delete?')) return;
    const table = contentType === 'posts' ? 'digb_posts' : contentType === 'lectures' ? 'digb_lectures' : 'digb_gallery';
    await client.from(table).delete().eq('id', id);
    loadContent();
  };

  const fmt = (d: string | null) => {
    if (!d) return '-';
    return new Date(d).toLocaleDateString();
  };

  const tabs: { key: Tab; label: string; icon: string }[] = [
    { key: 'members', label: ko ? '회원관리' : 'Members', icon: '👥' },
    { key: 'content', label: ko ? '콘텐츠관리' : 'Content', icon: '📝' },
    { key: 'stats', label: ko ? '통계' : 'Statistics', icon: '📊' },
  ];

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <h3>ADMIN</h3>
        <ul className="admin-nav">
          {tabs.map((t) => (
            <li key={t.key}>
              <button
                className={`admin-nav-item${tab === t.key ? ' active' : ''}`}
                onClick={() => setTab(t.key)}
              >
                <span>{t.icon}</span> {t.label}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main */}
      <div className="admin-main">
        <div className="admin-header">
          <h1>{ko ? '관리자 대시보드' : 'Admin Dashboard'}</h1>
        </div>

        {/* Stats Cards (always visible) */}
        <div className="admin-dashboard-stats">
          <div className="admin-stat-card-v2">
            <div className="stat-label">{ko ? '총 회원수' : 'Total Members'}</div>
            <div className="stat-value">{stats.members.toLocaleString()}</div>
          </div>
          <div className="admin-stat-card-v2">
            <div className="stat-label">{ko ? '게시글' : 'Posts'}</div>
            <div className="stat-value">{stats.posts.toLocaleString()}</div>
          </div>
          <div className="admin-stat-card-v2">
            <div className="stat-label">{ko ? '강의자료' : 'Lectures'}</div>
            <div className="stat-value">{stats.lectures.toLocaleString()}</div>
          </div>
          <div className="admin-stat-card-v2">
            <div className="stat-label">{ko ? '갤러리' : 'Gallery'}</div>
            <div className="stat-value">{stats.gallery.toLocaleString()}</div>
          </div>
        </div>

        {/* ── Members Tab ── */}
        {tab === 'members' && (
          <>
            <div className="admin-toolbar-v2">
              <input
                type="text"
                placeholder={ko ? '이름 또는 이메일 검색...' : 'Search name or email...'}
                value={memberSearch}
                onChange={(e) => { setMemberSearch(e.target.value); setMemberPage(1); }}
              />
            </div>
            <div className="admin-table-wrapper">
              {memberLoading ? (
                <div className="admin-empty"><div className="loading-spinner" /></div>
              ) : (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>{ko ? '이름' : 'Name'}</th>
                      <th>{ko ? '이메일' : 'Email'}</th>
                      <th>{ko ? '가입수단' : 'Provider'}</th>
                      <th>{ko ? '역할' : 'Role'}</th>
                      <th>{ko ? '가입일' : 'Joined'}</th>
                      <th>{ko ? '최근 로그인' : 'Last Login'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pagedMembers.length === 0 ? (
                      <tr><td colSpan={6} className="admin-empty">{ko ? '회원이 없습니다.' : 'No members found.'}</td></tr>
                    ) : pagedMembers.map((m) => (
                      <tr key={m.id}>
                        <td>{m.display_name || '-'}</td>
                        <td>{m.email || '-'}</td>
                        <td>{m.provider || 'email'}</td>
                        <td>
                          <span className={`badge ${m.role === 'admin' ? 'badge-admin' : 'badge-member'}`}>
                            {m.role || 'member'}
                          </span>
                        </td>
                        <td>{fmt(m.created_at)}</td>
                        <td>{fmt(m.last_login_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            {memberTotalPages > 1 && (
              <div className="admin-pagination">
                <button disabled={memberPage <= 1} onClick={() => setMemberPage(memberPage - 1)}>
                  {ko ? '이전' : 'Prev'}
                </button>
                <span>{memberPage} / {memberTotalPages}</span>
                <button disabled={memberPage >= memberTotalPages} onClick={() => setMemberPage(memberPage + 1)}>
                  {ko ? '다음' : 'Next'}
                </button>
              </div>
            )}
          </>
        )}

        {/* ── Content Tab ── */}
        {tab === 'content' && (
          <>
            <div className="admin-toolbar-v2">
              <select value={contentType} onChange={(e) => { setContentType(e.target.value as 'posts' | 'lectures' | 'gallery'); setContentPage(1); }}>
                <option value="posts">{ko ? '게시글' : 'Posts'} (digb_posts)</option>
                <option value="lectures">{ko ? '강의자료' : 'Lectures'} (digb_lectures)</option>
                <option value="gallery">{ko ? '갤러리' : 'Gallery'} (digb_gallery)</option>
              </select>
              <input
                type="text"
                placeholder={ko ? '제목 검색...' : 'Search title...'}
                value={contentSearch}
                onChange={(e) => { setContentSearch(e.target.value); setContentPage(1); }}
              />
            </div>
            <div className="admin-table-wrapper">
              {contentLoading ? (
                <div className="admin-empty"><div className="loading-spinner" /></div>
              ) : (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>{ko ? '제목' : 'Title'}</th>
                      <th>{ko ? '작성자' : 'Author'}</th>
                      <th>{ko ? '카테고리' : 'Category'}</th>
                      <th>{ko ? '조회' : 'Views'}</th>
                      <th>{ko ? '작성일' : 'Date'}</th>
                      <th>{ko ? '관리' : 'Action'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pagedContent.length === 0 ? (
                      <tr><td colSpan={6} className="admin-empty">{ko ? '데이터가 없습니다.' : 'No data found.'}</td></tr>
                    ) : pagedContent.map((p) => (
                      <tr key={p.id}>
                        <td>{p.title}</td>
                        <td>{p.author_name || '-'}</td>
                        <td>{p.category || '-'}</td>
                        <td>{p.views ?? 0}</td>
                        <td>{fmt(p.created_at)}</td>
                        <td>
                          <button className="admin-btn-delete" onClick={() => handleDeletePost(p.id)}>
                            {ko ? '삭제' : 'Delete'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            {contentTotalPages > 1 && (
              <div className="admin-pagination">
                <button disabled={contentPage <= 1} onClick={() => setContentPage(contentPage - 1)}>
                  {ko ? '이전' : 'Prev'}
                </button>
                <span>{contentPage} / {contentTotalPages}</span>
                <button disabled={contentPage >= contentTotalPages} onClick={() => setContentPage(contentPage + 1)}>
                  {ko ? '다음' : 'Next'}
                </button>
              </div>
            )}
          </>
        )}

        {/* ── Stats Tab ── */}
        {tab === 'stats' && (
          <div className="admin-table-wrapper" style={{ padding: 32 }}>
            <h2 style={{ marginBottom: 24 }}>{ko ? '사이트 통계 요약' : 'Site Statistics Summary'}</h2>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>{ko ? '항목' : 'Item'}</th>
                  <th>{ko ? '수량' : 'Count'}</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>{ko ? '총 회원수' : 'Total Members'}</td><td><strong>{stats.members.toLocaleString()}</strong></td></tr>
                <tr><td>{ko ? '게시글 수' : 'Total Posts'}</td><td><strong>{stats.posts.toLocaleString()}</strong></td></tr>
                <tr><td>{ko ? '강의자료 수' : 'Total Lectures'}</td><td><strong>{stats.lectures.toLocaleString()}</strong></td></tr>
                <tr><td>{ko ? '갤러리 수' : 'Total Gallery'}</td><td><strong>{stats.gallery.toLocaleString()}</strong></td></tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
