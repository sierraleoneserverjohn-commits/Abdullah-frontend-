export const BASE_URL = 'https://abdullah-ai-backend.onrender.com';

export const WS_BASE_URL = BASE_URL.replace(/^http/, 'ws');

export const ROUTES = {
  chat: '/api/chat',
  upload: '/api/upload',
  conversations: '/api/conversations',
  conversation: (id) => `/api/conversations/${id}`,
  liveVoice: '/ws/live-voice',
  profile: '/api/profile',
};

export const MODEL_LAYERS = {
  main: { label: 'Main AI', provider: 'Groq + Llama' },
  voice: { label: 'Live voice', provider: 'Gemini Live API' },
  backup: { label: 'Backup speech', provider: 'Groq Whisper' },
};
