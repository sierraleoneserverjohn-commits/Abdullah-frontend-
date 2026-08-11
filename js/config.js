const AppConfig = {
  appName: "Abdullah AI",
  version: "2.0.0",
  userTarget: "Sana",
  backendUrl: "https://abdullah-ai-backend.onrender.com",
  endpoints: {
    chat: "https://abdullah-ai-backend.onrender.com/api/chat",
    loveNote: "https://abdullah-ai-backend.onrender.com/api/love-note",
    teachKrio: "https://abdullah-ai-backend.onrender.com/api/teach-krio",
    voice: "https://abdullah-ai-backend.onrender.com/api/voice",
    liveStream: "https://abdullah-ai-backend.onrender.com/api/live-stream"
  },
  
  // 10 Llama & Groq AI Models Configuration
  models: [
    { id: "llama-3.1-8b-instant", name: "Llama 3.1 8B Instant (Default - Ultra Fast)" },
    { id: "llama-3.3-70b-versatile", name: "Llama 3.3 70B Versatile" },
    { id: "llama-3.2-1b-preview", name: "Llama 3.2 1B Preview" },
    { id: "llama-3.2-3b-preview", name: "Llama 3.2 3B Preview" },
    { id: "llama-3.2-11b-vision-preview", name: "Llama 3.2 11B Vision" },
    { id: "llama-3.2-90b-vision-preview", name: "Llama 3.2 90B Vision" },
    { id: "llama3-70b-8192", name: "Llama 3 70B (8K)" },
    { id: "llama3-8b-8192", name: "Llama 3 8B (8K)" },
    { id: "mixtral-8x7b-32768", name: "Mixtral 8x7B" },
    { id: "gemma2-9b-it", name: "Gemma 2 9B" }
  ],
  
  defaultModel: "llama-3.1-8b-instant",
  sttModel: "whisper-large-v3-turbo",
  liveVoiceEngine: "gemini-live-api"
};
