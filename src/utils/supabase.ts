import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase: SupabaseClient | null = null;

const getSupabase = (): SupabaseClient | null => {
  if (!supabase && supabaseUrl && supabaseAnonKey) {
    supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        flowType: 'pkce',
        detectSessionInUrl: true,
        autoRefreshToken: true,
        persistSession: true,
      }
    });
  }
  return supabase;
};

const POSTS_PER_PAGE = 10;
const SITE_DOMAIN = window.location.hostname;

export interface PostRecord {
  id: string;
  title: string;
  content: string;
  category: string;
  author_name: string;
  user_id: string;
  created_at: string;
  views: number;
  site_domain: string;
  [key: string]: unknown;
}

export interface CommentRecord {
  id: string;
  post_id?: string;
  gallery_id?: string;
  portfolio_id?: string;
  website_id?: string;
  content: string;
  author_name: string;
  user_id: string;
  created_at: string;
  site_domain: string;
  [key: string]: unknown;
}

export interface LectureRecord {
  id: string;
  title: string;
  content: string;
  week_number: number;
  description?: string;
  file_url?: string;
  is_published: boolean;
  views: number;
  created_at: string;
  site_domain: string;
  author_id?: string;
  [key: string]: unknown;
}

export interface GalleryRecord {
  id: string;
  title: string;
  description?: string;
  image_url: string;
  link_url?: string;
  category: string;
  author_name: string;
  user_id: string;
  views: number;
  created_at: string;
  site_domain: string;
  [key: string]: unknown;
}

export interface PortfolioRecord {
  id: string;
  title: string;
  content: string;
  summary?: string;
  cover_image?: string;
  tags?: string[];
  author_name: string;
  user_id: string;
  views: number;
  created_at: string;
  site_domain: string;
  [key: string]: unknown;
}

export interface WebsiteRecord {
  id: string;
  title: string;
  description?: string;
  url: string;
  image_url?: string;
  category: string;
  author_name: string;
  user_id: string;
  views: number;
  created_at: string;
  site_domain: string;
  [key: string]: unknown;
}

export interface ProfileRecord {
  id: string;
  display_name?: string;
  email?: string;
  provider?: string;
  role?: string;
  created_at?: string;
  last_login_at?: string;
  signup_domain?: string;
  visited_sites?: string[];
  [key: string]: unknown;
}

export const getPosts = async (page = 1, category: string | null = null) => {
  const client = getSupabase();
  if (!client) return { posts: [] as PostRecord[], total: 0 };

  let query = client
    .from('digb_posts')
    .select('*', { count: 'exact' })
    .eq('site_domain', SITE_DOMAIN)
    .order('created_at', { ascending: false });

  if (category) {
    query = query.eq('category', category);
  }

  const from = (page - 1) * POSTS_PER_PAGE;
  const to = from + POSTS_PER_PAGE - 1;
  query = query.range(from, to);

  const { data, error, count } = await query;

  if (error) {
    console.error('getPosts error:', error);
    return { posts: [] as PostRecord[], total: 0 };
  }

  return { posts: (data || []) as PostRecord[], total: count || 0 };
};

export const getPostById = async (id: string) => {
  const client = getSupabase();
  if (!client) return null;

  const { data, error } = await client
    .from('digb_posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('getPostById error:', error);
    return null;
  }

  return data as PostRecord;
};

export const createPost = async (postData: Record<string, unknown>) => {
  const client = getSupabase();
  if (!client) throw new Error('Supabase not configured');

  const { data, error } = await client
    .from('digb_posts')
    .insert({ ...postData, site_domain: SITE_DOMAIN })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deletePost = async (id: string) => {
  const client = getSupabase();
  if (!client) throw new Error('Supabase not configured');

  const { error } = await client
    .from('digb_posts')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

export const incrementViews = async (id: string) => {
  const client = getSupabase();
  if (!client) return;

  try {
    await client.rpc('digb_increment_views', { post_id: id });
  } catch {
    try {
      await client
        .from('digb_posts')
        .update({ views: (client as unknown as Record<string, CallableFunction>).sql`views + 1` })
        .eq('id', id);
    } catch {
      // silently fail
    }
  }
};

export const getComments = async (postId: string) => {
  const client = getSupabase();
  if (!client) return [] as CommentRecord[];

  const { data, error } = await client
    .from('digb_comments')
    .select('*')
    .eq('post_id', postId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('getComments error:', error);
    return [] as CommentRecord[];
  }

  return (data || []) as CommentRecord[];
};

export const createComment = async (commentData: Record<string, unknown>) => {
  const client = getSupabase();
  if (!client) throw new Error('Supabase not configured');

  const { data, error } = await client
    .from('digb_comments')
    .insert({ ...commentData, site_domain: SITE_DOMAIN })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteComment = async (id: string) => {
  const client = getSupabase();
  if (!client) throw new Error('Supabase not configured');

  const { error } = await client
    .from('digb_comments')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

export const searchPosts = async (query: string) => {
  const client = getSupabase();
  if (!client || !query.trim()) return [] as PostRecord[];

  const pattern = `%${query.trim()}%`;

  const { data, error } = await client
    .from('digb_posts')
    .select('id, title, author_name, created_at')
    .eq('site_domain', SITE_DOMAIN)
    .or(`title.ilike.${pattern},content.ilike.${pattern}`)
    .order('created_at', { ascending: false })
    .limit(5);

  if (error) {
    console.error('searchPosts error:', error);
    return [] as PostRecord[];
  }

  return (data || []) as PostRecord[];
};

export const getLectures = async () => {
  const client = getSupabase();
  if (!client) return [] as LectureRecord[];

  const { data, error } = await client
    .from('digb_lectures')
    .select('*')
    .eq('site_domain', SITE_DOMAIN)
    .eq('is_published', true)
    .order('week_number', { ascending: true });

  if (error) {
    console.error('getLectures error:', error);
    return [] as LectureRecord[];
  }

  return (data || []) as LectureRecord[];
};

export const getLectureById = async (id: string) => {
  const client = getSupabase();
  if (!client) return null;

  const { data, error } = await client
    .from('digb_lectures')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('getLectureById error:', error);
    return null;
  }

  return data as LectureRecord;
};

export const createLecture = async (lectureData: Record<string, unknown>) => {
  const client = getSupabase();
  if (!client) throw new Error('Supabase not configured');

  const { data, error } = await client
    .from('digb_lectures')
    .insert({ ...lectureData, site_domain: SITE_DOMAIN })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateLecture = async (id: string, lectureData: Record<string, unknown>) => {
  const client = getSupabase();
  if (!client) throw new Error('Supabase not configured');

  const { data, error } = await client
    .from('digb_lectures')
    .update({ ...lectureData, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteLecture = async (id: string) => {
  const client = getSupabase();
  if (!client) throw new Error('Supabase not configured');

  const { error } = await client
    .from('digb_lectures')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

export const incrementLectureViews = async (id: string) => {
  const client = getSupabase();
  if (!client) return;

  try { await client.rpc('digb_increment_lecture_views', { lecture_id: id }); } catch { /* silent */ }
};

export const getAllProfiles = async () => {
  const client = getSupabase();
  if (!client) return [] as ProfileRecord[];

  const domain = window.location.hostname;

  const { data, error } = await client
    .from('user_profiles')
    .select('*')
    .eq('signup_domain', domain)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('getAllProfiles error:', error);
    return [] as ProfileRecord[];
  }

  return (data || []) as ProfileRecord[];
};

export const updateLastLogin = async (userId: string) => {
  const client = getSupabase();
  if (!client) return;

  try { await client.rpc('update_last_login', { target_user_id: userId }); } catch { /* silent */ }
};

// --- Gallery ---

const GALLERY_PER_PAGE = 12;

export const getGalleryItems = async (page = 1, category: string | null = null) => {
  const client = getSupabase();
  if (!client) return { items: [] as GalleryRecord[], total: 0 };

  let query = client
    .from('digb_gallery')
    .select('*', { count: 'exact' })
    .eq('site_domain', SITE_DOMAIN)
    .order('created_at', { ascending: false });

  if (category) {
    query = query.eq('category', category);
  }

  const from = (page - 1) * GALLERY_PER_PAGE;
  const to = from + GALLERY_PER_PAGE - 1;
  query = query.range(from, to);

  const { data, error, count } = await query;

  if (error) {
    console.error('getGalleryItems error:', error);
    return { items: [] as GalleryRecord[], total: 0 };
  }

  return { items: (data || []) as GalleryRecord[], total: count || 0 };
};

export const getGalleryItemById = async (id: string) => {
  const client = getSupabase();
  if (!client) return null;

  const { data, error } = await client
    .from('digb_gallery')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('getGalleryItemById error:', error);
    return null;
  }

  return data as GalleryRecord;
};

export const createGalleryItem = async (itemData: Record<string, unknown>) => {
  const client = getSupabase();
  if (!client) throw new Error('Supabase not configured');

  const { data, error } = await client
    .from('digb_gallery')
    .insert({ ...itemData, site_domain: SITE_DOMAIN })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateGalleryItem = async (id: string, itemData: Record<string, unknown>) => {
  const client = getSupabase();
  if (!client) throw new Error('Supabase not configured');

  const { data, error } = await client
    .from('digb_gallery')
    .update(itemData)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteGalleryItem = async (id: string) => {
  const client = getSupabase();
  if (!client) throw new Error('Supabase not configured');

  const { error } = await client
    .from('digb_gallery')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

export const incrementGalleryViews = async (id: string) => {
  const client = getSupabase();
  if (!client) return;

  try { await client.rpc('digb_increment_gallery_views', { item_id: id }); } catch { /* silent */ }
};

export const getGalleryComments = async (galleryId: string) => {
  const client = getSupabase();
  if (!client) return [] as CommentRecord[];

  const { data, error } = await client
    .from('digb_gallery_comments')
    .select('*')
    .eq('gallery_id', galleryId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('getGalleryComments error:', error);
    return [] as CommentRecord[];
  }

  return (data || []) as CommentRecord[];
};

export const createGalleryComment = async (commentData: Record<string, unknown>) => {
  const client = getSupabase();
  if (!client) throw new Error('Supabase not configured');

  const { data, error } = await client
    .from('digb_gallery_comments')
    .insert({ ...commentData, site_domain: SITE_DOMAIN })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteGalleryComment = async (id: string) => {
  const client = getSupabase();
  if (!client) throw new Error('Supabase not configured');

  const { error } = await client
    .from('digb_gallery_comments')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

// --- Portfolio ---

const PORTFOLIO_PER_PAGE = 12;

export const getPortfolios = async (page = 1) => {
  const client = getSupabase();
  if (!client) return { items: [] as PortfolioRecord[], total: 0 };

  const from = (page - 1) * PORTFOLIO_PER_PAGE;
  const to = from + PORTFOLIO_PER_PAGE - 1;

  const { data, error, count } = await client
    .from('digb_portfolio')
    .select('*', { count: 'exact' })
    .eq('site_domain', SITE_DOMAIN)
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) {
    console.error('getPortfolios error:', error);
    return { items: [] as PortfolioRecord[], total: 0 };
  }

  return { items: (data || []) as PortfolioRecord[], total: count || 0 };
};

export const getPortfolioById = async (id: string) => {
  const client = getSupabase();
  if (!client) return null;

  const { data, error } = await client
    .from('digb_portfolio')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('getPortfolioById error:', error);
    return null;
  }

  return data as PortfolioRecord;
};

export const createPortfolio = async (portfolioData: Record<string, unknown>) => {
  const client = getSupabase();
  if (!client) throw new Error('Supabase not configured');

  const { data, error } = await client
    .from('digb_portfolio')
    .insert({ ...portfolioData, site_domain: SITE_DOMAIN })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updatePortfolio = async (id: string, portfolioData: Record<string, unknown>) => {
  const client = getSupabase();
  if (!client) throw new Error('Supabase not configured');

  const { data, error } = await client
    .from('digb_portfolio')
    .update(portfolioData)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deletePortfolio = async (id: string) => {
  const client = getSupabase();
  if (!client) throw new Error('Supabase not configured');

  const { error } = await client
    .from('digb_portfolio')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

export const incrementPortfolioViews = async (id: string) => {
  const client = getSupabase();
  if (!client) return;

  try { await client.rpc('digb_increment_portfolio_views', { item_id: id }); } catch { /* silent */ }
};

export const getPortfolioComments = async (portfolioId: string) => {
  const client = getSupabase();
  if (!client) return [] as CommentRecord[];

  const { data, error } = await client
    .from('digb_portfolio_comments')
    .select('*')
    .eq('portfolio_id', portfolioId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('getPortfolioComments error:', error);
    return [] as CommentRecord[];
  }

  return (data || []) as CommentRecord[];
};

export const createPortfolioComment = async (commentData: Record<string, unknown>) => {
  const client = getSupabase();
  if (!client) throw new Error('Supabase not configured');

  const { data, error } = await client
    .from('digb_portfolio_comments')
    .insert({ ...commentData, site_domain: SITE_DOMAIN })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deletePortfolioComment = async (id: string) => {
  const client = getSupabase();
  if (!client) throw new Error('Supabase not configured');

  const { error } = await client
    .from('digb_portfolio_comments')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

// --- Websites ---

const WEBSITES_PER_PAGE = 12;

export const getWebsites = async (page = 1, category: string | null = null) => {
  const client = getSupabase();
  if (!client) return { items: [] as WebsiteRecord[], total: 0 };

  let query = client
    .from('digb_websites')
    .select('*', { count: 'exact' })
    .eq('site_domain', SITE_DOMAIN)
    .order('created_at', { ascending: false });

  if (category) {
    query = query.eq('category', category);
  }

  const from = (page - 1) * WEBSITES_PER_PAGE;
  const to = from + WEBSITES_PER_PAGE - 1;
  query = query.range(from, to);

  const { data, error, count } = await query;

  if (error) {
    console.error('getWebsites error:', error);
    return { items: [] as WebsiteRecord[], total: 0 };
  }

  return { items: (data || []) as WebsiteRecord[], total: count || 0 };
};

export const getWebsiteById = async (id: string) => {
  const client = getSupabase();
  if (!client) return null;

  const { data, error } = await client
    .from('digb_websites')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('getWebsiteById error:', error);
    return null;
  }

  return data as WebsiteRecord;
};

export const createWebsite = async (itemData: Record<string, unknown>) => {
  const client = getSupabase();
  if (!client) throw new Error('Supabase not configured');

  const { data, error } = await client
    .from('digb_websites')
    .insert({ ...itemData, site_domain: SITE_DOMAIN })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateWebsite = async (id: string, itemData: Record<string, unknown>) => {
  const client = getSupabase();
  if (!client) throw new Error('Supabase not configured');

  const { data, error } = await client
    .from('digb_websites')
    .update(itemData)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteWebsite = async (id: string) => {
  const client = getSupabase();
  if (!client) throw new Error('Supabase not configured');

  const { error } = await client
    .from('digb_websites')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

export const incrementWebsiteViews = async (id: string) => {
  const client = getSupabase();
  if (!client) return;

  try { await client.rpc('digb_increment_website_views', { item_id: id }); } catch { /* silent */ }
};

export const getWebsiteComments = async (websiteId: string) => {
  const client = getSupabase();
  if (!client) return [] as CommentRecord[];

  const { data, error } = await client
    .from('digb_websites_comments')
    .select('*')
    .eq('website_id', websiteId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('getWebsiteComments error:', error);
    return [] as CommentRecord[];
  }

  return (data || []) as CommentRecord[];
};

export const createWebsiteComment = async (commentData: Record<string, unknown>) => {
  const client = getSupabase();
  if (!client) throw new Error('Supabase not configured');

  const { data, error } = await client
    .from('digb_websites_comments')
    .insert({ ...commentData, site_domain: SITE_DOMAIN })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteWebsiteComment = async (id: string) => {
  const client = getSupabase();
  if (!client) throw new Error('Supabase not configured');

  const { error } = await client
    .from('digb_websites_comments')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

export default getSupabase;
