export class VoiceController {
  constructor(onStatusChange) {
    this.isListening = false;
    this.onStatusChange = onStatusChange;
  }

  toggleMic() {
    this.isListening = !this.isListening;
    if (this.onStatusChange) {
      this.onStatusChange(this.isListening);
    }
    return this.isListening;
  }
}
