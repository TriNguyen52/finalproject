import { createClient } from '@supabase/supabase-js'
const URL = 'https://hqdlzdvtecfsnwjueyzz.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhxZGx6ZHZ0ZWNmc253anVleXp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE2NDI1MTgsImV4cCI6MjA0NzIxODUxOH0.B9gFlwZSif4XuXETZDxrtitC5UdT2oLoyTYsHl3Bmy8'
export const supabase = createClient(URL, API_KEY);
