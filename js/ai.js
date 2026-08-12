const AIService = {
  async sendMessage(message, mode = "chat") {
    // Get the selected model from the 5 options
    const selectedModel = localStorage.getItem("abdullah_ai_model") || AppConfig.defaultModel;

    const payload = {
      message: message,
      model: selectedModel,
      mode: mode 
      // Notice: No userKey is passed anymore. The backend handles its own keys.
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
        throw new Error(`Backend Error: ${response.status}`);
      }

      const data = await response.json();
      return data.reply;
    } catch (err) {
      console.error("Failed to connect to backend:", err);
      return "Abdullah AI says: My backend servers are currently taking a nap. Please check your connection!";
    }
  }
};
