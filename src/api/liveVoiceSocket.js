import { WS_BASE_URL, ROUTES } from './config.js';

export class LiveVoiceSocket {
  constructor({ conversationId, onEvent, onOpen, onClose, onError }) {
    this.conversationId = conversationId;
    this.onEvent = onEvent || (() => {});
    this.onOpen = onOpen || (() => {});
    this.onClose = onClose || (() => {});
    this.onError = onError || (() => {});
    this.ws = null;
  }

  connect() {
    const url = `${WS_BASE_URL}${ROUTES.liveVoice}?conversation_id=${encodeURIComponent(this.conversationId || '')}`;
    this.ws = new WebSocket(url);
    this.ws.binaryType = 'arraybuffer';

    this.ws.onopen = () => this.onOpen();
    this.ws.onclose = () => this.onClose();
    this.ws.onerror = (err) => this.onError(err);

    this.ws.onmessage = (msg) => {
      if (typeof msg.data === 'string') {
        try {
          this.onEvent(JSON.parse(msg.data));
        } catch {
          this.onEvent({ type: 'text', text: msg.data });
        }
      } else {
        this.onEvent({ type: 'audio', data: msg.data });
      }
    };
  }

  sendAudioChunk(buffer) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(buffer);
    }
  }

  sendControl(type, payload = {}) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type, ...payload }));
    }
  }

  close() {
    this.ws?.close();
    this.ws = null;
  }
}
