import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import getSupabase, { updateLastLogin } from '../utils/supabase';
import { getProfile, updateProfile, signOut as authSignOut } from '../utils/auth';
import { ADMIN_EMAILS } from '../config/admin';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [accountBlock, setAccountBlock] = useState(null);

  const loadProfile = useCallback(async (authUser) => {
    if (!authUser) {
      setProfile(null);
      return;
    }
    const p = await getProfile(authUser.id);
    if (p) {
      const updates = {};
      if (!p.signup_domain) updates.signup_domain = window.location.hostname;
      if (!p.role || p.role === 'user') updates.role = 'member';
      // 현재 도메인이 visited_sites에 없으면 자동 추가
      const currentDomain = window.location.hostname;
      const sites = Array.isArray(p.visited_sites) ? p.visited_sites : [];
      if (!sites.includes(currentDomain)) {
        updates.visited_sites = [...sites, currentDomain];
      }
      if (Object.keys(updates).length > 0) {
        try {
          const updated = await updateProfile(authUser.id, updates);
          setProfile(updated);
        } catch {
          setProfile(p);
        }
      } else {
        setProfile(p);
      }
    }

    updateLastLogin(authUser.id);

    try {
      const client = getSupabase();
      if (client) {
        const { data: statusData } = await client.rpc('check_user_status', {
          target_user_id: authUser.id,
          current_domain: window.location.hostname,
        });
        if (statusData && statusData.status && statusData.status !== 'active') {
          setAccountBlock({
            status: statusData.status,
            reason: statusData.reason || '',
            suspended_until: statusData.suspended_until || null,
          });
          await authSignOut();
          setUser(null);
          setProfile(null);
          return;
        }
      }
    } catch {
      // check_user_status 함수 미존재 시 무시
    }
  }, []);

  useEffect(() => {
    const client = getSupabase();
    if (!client) {
      setLoading(false);
      return;
    }

    const { data: { subscription } } = client.auth.onAuthStateChange((event, session) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u) {
        loadProfile(u);
        if (event === 'SIGNED_IN') {
          const c = getSupabase();
          if (c) {
            c.from('user_profiles')
              .update({ last_sign_in_at: new Date().toISOString() })
              .eq('id', u.id)
              .then(() => {});
          }
        }
      } else {
        setProfile(null);
      }
      if (event === 'INITIAL_SESSION') {
        setLoading(false);
      }
    });

    const fallbackTimer = setTimeout(() => {
      setLoading((prev) => {
        if (prev) console.warn('Auth: INITIAL_SESSION timeout, forcing loading=false');
        return false;
      });
    }, 5000);

    return () => {
      clearTimeout(fallbackTimer);
      subscription.unsubscribe();
    };
  }, [loadProfile]);

  const signOut = useCallback(async () => {
    await authSignOut();
    setUser(null);
    setProfile(null);
  }, []);

  const refreshProfile = useCallback(async () => {
    if (user) await loadProfile(user);
  }, [user, loadProfile]);

  const allEmails = [
    user?.email,
    user?.user_metadata?.email,
    user?.identities?.[0]?.identity_data?.email,
    profile?.email,
  ].filter(Boolean).map((e) => e.toLowerCase());
  const isAdmin = allEmails.some((e) => ADMIN_EMAILS.includes(e));
  const isLoggedIn = !!user;

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      loading,
      isLoggedIn,
      isAdmin,
      signOut,
      refreshProfile,
      accountBlock,
      clearAccountBlock: () => setAccountBlock(null),
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
