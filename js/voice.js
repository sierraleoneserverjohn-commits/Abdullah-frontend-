export function initVoiceControls(orbController) {
  const micBtn = document.getElementById('micBtn');
  const statusTitle = document.getElementById('voiceStatusTitle');
  let isListening = false;

  if (micBtn) {
    micBtn.addEventListener('click', () => {
      isListening = !isListening;
      orbController.setListening(isListening);
      if (statusTitle) {
        statusTitle.textContent = isListening ? "Listening closely..." : "Tap to talk";
      }
    });
  }
}

