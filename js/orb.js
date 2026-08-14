export class OrbController {
  constructor(orbElementId) {
    this.orb = document.getElementById(orbElementId);
  }

  setListening(isListening) {
    if (!this.orb) return;
    if (isListening) {
      this.orb.classList.add('listening');
    } else {
      this.orb.classList.remove('listening');
    }
  }

  setSpeaking(isSpeaking) {
    if (!this.orb) return;
    if (isSpeaking) {
      this.orb.classList.add('speaking');
    } else {
      this.orb.classList.remove('speaking');
    }
  }
}
