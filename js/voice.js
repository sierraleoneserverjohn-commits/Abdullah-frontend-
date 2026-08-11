const VoiceSystem = {
  mediaRecorder: null,
  audioChunks: [],
  isListening: false,
  synthesis: window.speechSynthesis,

  async toggleListening() {
    if (this.isListening) {
      this.stopListening();
    } else {
      await this.startListening();
    }
  },

  async startListening() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);
      this.audioChunks = [];

      this.mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) this.audioChunks.push(e.data);
      };

      this.mediaRecorder.onstart = () => {
        this.isListening = true;
        this.updateUI("Listening...", "Groq Whisper V3 Turbo active...", true);
        Animations.setWaveformActive(true);
      };

      this.mediaRecorder.onstop = async () => {
        this.isListening = false;
        Animations.setWaveformActive(false);
        this.updateUI("Processing audio...", "Connecting to Abdullah AI...", false);

        const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
        await this.processVoiceBackend(audioBlob);
      };

      this.mediaRecorder.start();
    } catch (err) {
      UI.showToast("Microphone access denied or unsupported.");
      this.fallbackBrowserSTT();
    }
  },

  stopListening() {
    if (this.mediaRecorder && this.isListening) {
      this.mediaRecorder.stop();
      this.mediaRecorder.stream.getTracks().forEach(track => track.stop());
    }
  },

  async processVoiceBackend(blob) {
    const formData = new FormData();
    formData.append("audio", blob);
    formData.append("sttModel", AppConfig.sttModel);
    formData.append("userKey", localStorage.getItem("abdullah_ai_user_key") || "");

    try {
      const response = await fetch(AppConfig.endpoints.voice, {
        method: "POST",
        body: formData
      });

      if (!response.ok) throw new Error("Backend voice endpoint offline");
      const data = await response.json();

      this.updateUI("Abdullah AI speaking...", data.reply, false);
      if (data.audioUrl) {
        const audio = new Audio(data.audioUrl);
        audio.play();
      } else {
        this.speakText(data.reply);
      }
    } catch (err) {
      console.warn("Backend voice processing failed, falling back to Web Speech", err);
      this.fallbackBrowserSTT();
    }
  },

  fallbackBrowserSTT() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      UI.showToast("Voice Recognition not supported on this browser.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      this.isListening = true;
      this.updateUI("Listening...", "Speak now, Sana ❤️", true);
      Animations.setWaveformActive(true);
    };

    recognition.onresult = async (event) => {
      const transcript = event.results[0][0].transcript;
      this.updateUI("Processing...", `"${transcript}"`, false);
      const reply = await AIService.sendMessage(transcript, "chat");
      this.speakText(reply);
    };

    recognition.onend = () => {
      this.isListening = false;
      Animations.setWaveformActive(false);
    };

    recognition.start();
  },

  speakText(text) {
    if (!this.synthesis) return;
    this.synthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = 1.05;
    utterance.rate = 0.95;

    utterance.onstart = () => {
      this.updateUI("Abdullah AI speaking...", text, false);
      Animations.setWaveformActive(true);
    };

    utterance.onend = () => {
      this.updateUI("Tap to talk", "I'm listening...", false);
      Animations.setWaveformActive(false);
    };

    this.synthesis.speak(utterance);
  },

  updateUI(title, sub, listening) {
    const titleEl = document.getElementById('voiceStatusTitle');
    const subEl = document.getElementById('voiceStatusSub');
    const micBtn = document.getElementById('micBtn');

    if (titleEl) titleEl.textContent = title;
    if (subEl) subEl.textContent = sub;
    if (micBtn) {
      if (listening) micBtn.classList.add('listening');
      else micBtn.classList.remove('listening');
    }
  }
};
