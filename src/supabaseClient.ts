import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rdozikgtjiuqfjcwzxet.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJkb3ppa2d0aml1cWZqY3d6eGV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA4MzQ1MTksImV4cCI6MjA0NjQxMDUxOX0.264eLz9yhGJcXaoz_GWScCW09UnZvDi2oTIybImmn_o';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);