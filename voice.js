// VOICE MODULE
class VoiceManager {
  constructor() {
    this.isLive = false;
    this.voiceBtn = document.getElementById('voice-trigger-btn');
    this.voiceStatusText = document.getElementById('voice-status-text');
    this.geminiStatus = document.getElementById('gemini-status');
    
    this.initListeners();
  }

  initListeners() {
    if (this.voiceBtn) {
      this.voiceBtn.addEventListener('click', () => this.toggleVoiceSession());
    }
  }

  toggleVoiceSession() {
    this.isLive = !this.isLive;

    if (this.isLive) {
      this.startVoice();
    } else {
      this.stopVoice();
    }
  }

  startVoice() {
    console.log("Starting Gemini Live Voice Session...");
    this.voiceBtn.classList.add('active');
    this.voiceStatusText.textContent = 'End Live Voice';
    
    if (this.geminiStatus) {
      this.geminiStatus.textContent = 'Active Web Socket';
      this.geminiStatus.className = 'status-active';
    }

    // TODO: Connect Web Socket stream to https://abdullah-ai-backend.onrender.com for Live Gemini audio
  }

  stopVoice() {
    console.log("Ending Gemini Live Voice Session...");
    this.voiceBtn.classList.remove('active');
    this.voiceStatusText.textContent = 'Start Live Voice';

    if (this.geminiStatus) {
      this.geminiStatus.textContent = 'Standby';
      this.geminiStatus.className = 'status-standby';
    }

    // TODO: Close AudioContext and WebSocket connection
  }
}

// Global Voice Instance
window.voiceManager = new VoiceManager();
