import { createClient } from '@supabase/supabase-js'

/**
 * Supabase singleton client
 */
const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY)

export default supabase
