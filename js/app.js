import { OrbController } from './orb.js';
import { VoiceController } from './voice.js';
import { sendChatMessage } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
  const orb = new OrbController('aiOrb');
  const statusTitle = document.getElementById('voiceStatusTitle');
  const micBtn = document.getElementById('micBtn');

  const voice = new VoiceController((isListening) => {
    orb.setListening(isListening);
    if (statusTitle) {
      statusTitle.textContent = isListening ? "Listening..." : "Tap to talk";
    }
  });

  if (micBtn) {
    micBtn.addEventListener('click', () => {
      voice.toggleMic();
    });
  }
});
