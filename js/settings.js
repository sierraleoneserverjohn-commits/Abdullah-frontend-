const SettingsModule = {
  init() {
    const keyInput = document.getElementById('userApiKeyInput');
    const modelSelect = document.getElementById('modelSelectInput');
    const saveBtn = document.getElementById('saveSettingsBtn');
    const resetBtn = document.getElementById('resetDataBtn');

    // Populate model selection options
    if (modelSelect) {
      modelSelect.innerHTML = AppConfig.models.map(m => `
        <option value="${m.id}">${m.name}</option>
      `).join('');

      const savedModel = localStorage.getItem("abdullah_ai_model") || AppConfig.defaultModel;
      modelSelect.value = savedModel;
    }

    if (keyInput) {
      keyInput.value = localStorage.getItem("abdullah_ai_user_key") || "";
    }

    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        if (keyInput) localStorage.setItem("abdullah_ai_user_key", keyInput.value.trim());
        if (modelSelect) localStorage.setItem("abdullah_ai_model", modelSelect.value);
        UI.showToast("Settings and model updated! ❤️");
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        localStorage.clear();
        UI.showToast("App data cleared.");
        setTimeout(() => location.reload(), 1000);
      });
    }
  }
};
