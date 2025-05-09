import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@env';
import 'react-native-url-polyfill/auto'

const supabaseClient = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
);

export { supabaseClient };

export const fetchUserData = async () => {
    const { data, error } = await supabaseClient
      .from("users")
      .select("*")

      console.log('data', data)
      console.log('error', error)
  
    return { data: data, error };
  };