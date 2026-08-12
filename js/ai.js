const AIService = {
  async sendMessage(message, mode = "chat") {
    const userApiKey = localStorage.getItem("abdullah_ai_user_key");
    const selectedModel = localStorage.getItem("abdullah_ai_model") || AppConfig.defaultModel;

    const payload = {
      message: message,
      model: selectedModel,
      mode: mode,
      userKey: userApiKey || null
    };

    let targetEndpoint = AppConfig.endpoints.chat;
    if (mode === "loveNote") targetEndpoint = AppConfig.endpoints.loveNote;
    if (mode === "teachKrio") targetEndpoint = AppConfig.endpoints.teachKrio;

    try {
      const response = await fetch(targetEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Server status ${response.status}`);
      }

      const data = await response.json();
      return data.reply;
    } catch (err) {
      console.warn("Backend unavailable or key missing. Attempting direct fallback processing...", err);
      return this.handleFallback(message, userApiKey, selectedModel, mode);
    }
  },

  async handleFallback(message, apiKey, model, mode) {
    if (!apiKey) {
      return "Abdullah AI says: Please add your Llama or Groq API Key in Settings to connect me directly!";
    }

    try {
      let systemPrompt = "You are Abdullah AI, a loving, protective, intelligent personal assistant dedicated to Sana, Abdullah's wife.";
      if (mode === "teachKrio") {
        systemPrompt = "You are Abdullah AI, an expert teacher in Sierra Leone Krio language. Teach Sana Krio words, phrases, and grammar with romantic, warm examples.";
      } else if (mode === "loveNote") {
        systemPrompt = "You are Abdullah writing poetic, affectionate, romantic love notes for his beloved wife Sana.";
      }

      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: model,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: message }
          ],
          temperature: 0.7
        })
      });

      const data = await res.json();
      return data.choices[0].message.content;
    } catch (fallbackErr) {
      return "Error connecting to AI service. Please verify your API Key in Settings.";
    }
  }
};
