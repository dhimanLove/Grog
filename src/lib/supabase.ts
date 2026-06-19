import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? ""
export const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? ""

export const isSupabaseConfigured = Boolean(
  supabaseUrl.trim().length > 0 && supabaseAnonKey.trim().length > 0,
)

if (!isSupabaseConfigured) {
  console.warn(
    '[Supabase] missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. Authentication is disabled.',
  )
}

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : undefined