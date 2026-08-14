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
    if (this.voiceBtn) this.voiceBtn.classList.add('active');
    if (this.voiceStatusText) this.voiceStatusText.textContent = 'End Live Voice';
    
    if (this.geminiStatus) {
      this.geminiStatus.textContent = 'Active Web Socket';
      this.geminiStatus.className = 'status-active';
    }
  }

  stopVoice() {
    console.log("Ending Gemini Live Voice Session...");
    if (this.voiceBtn) this.voiceBtn.classList.remove('active');
    if (this.voiceStatusText) this.voiceStatusText.textContent = 'Start Live Voice';

    if (this.geminiStatus) {
      this.geminiStatus.textContent = 'Standby';
      this.geminiStatus.className = 'status-standby';
    }
  }
}

window.voiceManager = new VoiceManager();
