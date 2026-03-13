/**
 * searchStorage.js
 * 통합 검색 — posts 테이블에서 ilike 검색
 */

import { searchPosts } from './supabase';

export async function searchAll(query) {
  const posts = await searchPosts(query);
  return { board: posts };
}
