
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fofimcnyyiryquyxyaki.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvZmltY255eWlyeXF1eXh5YWtpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMTUzOTUwNiwiZXhwIjoyMDM3MTE1NTA2fQ.oIAUWKmNhSuVq03fXaT_Y4MfWukaUKC9SkF7UjxJNJE"
const supabaseKey1 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvZmltY255eWlyeXF1eXh5YWtpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMTUzOTUwNiwiZXhwIjoyMDM3MTE1NTA2fQ.oIAUWKmNhSuVq03fXaT_Y4MfWukaUKC9SkF7UjxJNJE"



const supabase = createClient(supabaseUrl, supabaseKey1);

 


export default supabase;



