import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder_key';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder_service_key';

// Standard client (subject to RLS)
export const supabase = createClient(supabaseUrl, supabaseKey);

// Admin client (bypasses RLS - use ONLY in Server Actions/API routes)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
