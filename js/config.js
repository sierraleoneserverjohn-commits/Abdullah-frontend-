const AppConfig = {
  appName: "Abdullah AI",
  userTarget: "Sana",
  
  // ALL requests strictly go to the backend now.
  backendUrl: "https://abdullah-ai-backend.onrender.com",
  endpoints: {
    chat: "https://abdullah-ai-backend.onrender.com/api/chat",
    loveNote: "https://abdullah-ai-backend.onrender.com/api/love-note",
    teachKrio: "https://abdullah-ai-backend.onrender.com/api/teach-krio",
    voice: "https://abdullah-ai-backend.onrender.com/api/voice"
  },
  
  // The 5 specific APIs from your Johnny Tec setup
  models: [
    { id: "groq-llama-3.1-8b", name: "Groq - Llama 3.1 8B Instant (Text/Brain)" },
    { id: "gemini-2.5-flash", name: "Google Gemini 2.5 Flash (Text/Brain)" },
    { id: "gemini-2.5-flash-lite", name: "Google Gemini 2.5 Flash-Lite (Text/Brain)" },
    { id: "gemini-live-api", name: "Google Gemini Live API (Voice/Live)" },
    { id: "gemini-native-audio", name: "Google Gemini Native Audio (Voice/Live)" }
  ],
  
  defaultModel: "groq-llama-3.1-8b"
};
