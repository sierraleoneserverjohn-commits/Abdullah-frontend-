const AIService = {
  async sendMessage(message) {
    try {
      if (AppConfig.useLocalFallback) {
        return this.getLocalResponse(message);
      }

      const response = await fetch(AppConfig.apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message })
      });

      if (!response.ok) throw new Error("API error");
      const data = await response.json();
      return data.reply;
    } catch (err) {
      console.warn("Using local AI response logic due to network:", err);
      return this.getLocalResponse(message);
    }
  },

  getLocalResponse(msg) {
    const text = msg.toLowerCase();
    if (text.includes("love") || text.includes("note")) {
      return "Sana, you are Abdullah's world. Every moment with you is a gift, and I am here to make your day brighter! 💕";
    }
    if (text.includes("hello") || text.includes("hi")) {
      return "Hello my love! How can Abdullah AI assist you today?";
    }
    if (text.includes("mood") || text.includes("cheer")) {
      return "Remember that you are loved, capable, and extraordinarily special! Abdullah sends you all his love right now! ✨";
    }
    return `I am always here for you, Sana! You said: "${msg}". How else can I help?`;
  }
};
