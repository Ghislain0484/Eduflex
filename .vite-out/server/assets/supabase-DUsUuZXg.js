import { createClient } from "@supabase/supabase-js";
var supabase = createClient("https://isuaplqkthdgwyqdoqkn.supabase.co", "your-anon-key-here");
//#endregion
export { supabase as t };
