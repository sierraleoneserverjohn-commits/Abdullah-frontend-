const ChatModule = {
  messages: [],

  init() {
    const sendBtn = document.getElementById('sendChatBtn');
    const input = document.getElementById('chatInput');
    const clearBtn = document.getElementById('clearChatBtn');

    if (sendBtn && input) {
      sendBtn.addEventListener('click', () => this.handleSend());
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') this.handleSend();
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        this.messages = [];
        this.render();
        UI.showToast("Chat cleared!");
      });
    }
  },

  async handleSend() {
    const input = document.getElementById('chatInput');
    if (!input || !input.value.trim()) return;

    const userText = input.value.trim();
    input.value = '';

    this.addMessage(userText, 'user');
    const reply = await AIService.sendMessage(userText);
    this.addMessage(reply, 'ai');

    const settings = SettingsModule.getSettings();
    if (settings.autoSpeak) {
      VoiceSystem.speak(reply);
    }
  },

  addMessage(text, sender) {
    this.messages.push({ text, sender, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) });
    this.render();
  },

  render() {
    const container = document.getElementById('chatMessages');
    if (!container) return;

    container.innerHTML = this.messages.map(m => `
      <div class="message ${m.sender}-msg glass-card" style="align-self: ${m.sender === 'user' ? 'flex-end' : 'flex-start'}; max-width: 80%; border-radius: ${m.sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px'}; padding: 12px 16px; background: ${m.sender === 'user' ? 'rgba(255,59,139,0.3)' : 'var(--bg-card)'};">
        ${m.text}
        <span class="time" style="display:block; font-size:10px; color:var(--text-sub); margin-top:4px;">${m.time}</span>
      </div>
    `).join('');

    container.scrollTop = container.scrollHeight;
  }
};
