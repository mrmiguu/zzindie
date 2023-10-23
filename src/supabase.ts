import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://ptkstiulsgtjgiawvoee.supabase.co'
const ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0a3N0aXVsc2d0amdpYXd2b2VlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc5ODQ1MTcsImV4cCI6MjAxMzU2MDUxN30.MpPKrQ59qyXsU9ANZX1ypejLfCcp4dqobrMK8YIBYWQ'

export const supabase = createClient(SUPABASE_URL, ANON_KEY)
