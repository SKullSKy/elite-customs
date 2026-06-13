import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://cijsgtfpcqmldxhoglgo.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpanNndGZwY3FtbGR4aG9nbGdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyODkzNDksImV4cCI6MjA5Njg2NTM0OX0.7AUb4uy5BwsmHJRA-abLTvmjPqjcZF8wK3ZUekGhjX8'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
