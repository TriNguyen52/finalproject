import { createClient } from '@supabase/supabase-js'
const URL = 'https://hqdlzdvtecfsnwjueyzz.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhxZGx6ZHZ0ZWNmc253anVleXp6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMTY0MjUxOCwiZXhwIjoyMDQ3MjE4NTE4fQ.M50WKqb8Z0Oq1cTvjr9x97BbUSsaDxSAmtadUPVs6Sg'
export const supabase = createClient(URL, API_KEY);
