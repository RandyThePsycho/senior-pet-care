// src/lib/supabase/server.ts
// 仅服务端使用的 Supabase client（用 service role key，绕过 RLS）。
// 绝不可在 client component 中 import —— service role key 不能进入浏览器。
// 说明：未用 `server-only` 包以避免新增依赖；安全性由 SUPABASE_SERVICE_ROLE_KEY
//       不带 NEXT_PUBLIC_ 前缀保证（不会被打进客户端 bundle），且本文件只被 API route 引用。

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let cached: SupabaseClient | null = null;

export function getServerSupabase(): SupabaseClient {
  if (cached) return cached;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      'Supabase env missing: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required (server-side). See .env.example.',
    );
  }

  cached = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}

// 判断 Supabase 是否已配置（用于 API 在未配置时优雅降级）
export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
}
