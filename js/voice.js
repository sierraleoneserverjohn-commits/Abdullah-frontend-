const VoiceSystem = {
  recognition: null,
  synthesis: window.speechSynthesis,
  isListening: false,

  init() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = 'en-US';

      this.recognition.onstart = () => {
        this.isListening = true;
        this.updateUI("Listening...", "Speak now, Sana ❤️", true);
        Animations.setWaveformActive(true);
      };

      this.recognition.onresult = async (event) => {
        const transcript = event.results[0][0].transcript;
        this.updateUI("Processing...", `"${transcript}"`, false);
        const reply = await AIService.sendMessage(transcript);
        this.speak(reply);
      };

      this.recognition.onerror = () => {
        this.stopListening();
        UI.showToast("Couldn't hear clearly. Try tapping again!");
      };

      this.recognition.onend = () => {
        this.isListening = false;
        Animations.setWaveformActive(false);
      };
    }
  },

  toggleListening() {
    if (!this.recognition) {
      UI.showToast("Speech Recognition not supported in this browser.");
      return;
    }
    if (this.isListening) {
      this.stopListening();
    } else {
      this.recognition.start();
    }
  },

  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
      this.updateUI("Tap to talk", "I'm listening...", false);
      Animations.setWaveformActive(false);
    }
  },

  speak(text) {
    if (!this.synthesis) return;
    this.synthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = 1.1;
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
