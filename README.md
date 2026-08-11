# Abdullah AI ❤️

A premium, mobile-first personal AI assistant web app created especially for Sana. Features a romantic futuristic design, interactive voice input/synthesis, glowing AI orb, waveform visualizer, dynamic messaging, and memory tracking.

## Features
- **Mobile-First Glassmorphic UI**: Neon pink/purple glows, floating heart particles, and dark futuristic aesthetics.
- **Voice Interaction**: Native Web Speech API integration for real-time speech recognition and synthesis.
- **Interactive AI Persona**: Contextual AI communication tailored with love for Sana.
- **Memory System**: Track preferences, special dates, and personal notes.
- **Settings & Themes**: Audio toggle, voice auto-speak, animation controls, and theme preferences.

## Getting Started
1. Clone this repository.
2. Serve static files using any local HTTP server (e.g., `npx serve`, Live Server in VS Code, or Python `python -m http.server`).
3. Open `index.html` in a modern web browser.

## Backend Integration Notes
The frontend connects to a REST endpoint specified in `js/config.js` (`/api/chat`). To link a real LLM server:
- Implement a POST `/api/chat` endpoint accepting `{ "message": "user input" }`.
- Return a JSON payload formatted as `{ "reply": "AI response" }`.
- 
