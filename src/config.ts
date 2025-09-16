if (!import.meta.env.VITE_GEMINI_API_KEY) {
  alert('VITE_GEMINI_API_KEY is required');
  throw new Error('VITE_SUPABASE_ANON_KEY is required');
}

export const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
