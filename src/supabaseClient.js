import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qfjuqbuysawwhnvzmjta.supabase.co'; 
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmanVxYnV5c2F3d2hudnptanRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY0NTU4NjQsImV4cCI6MjA1MjAzMTg2NH0.8ShCQpI4s8BQZbu4ausLCcp-9H6C4t3qy6oL9JnRJrc'; 

export const supabase = createClient(supabaseUrl, supabaseKey);
