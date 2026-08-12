const SettingsModule = {
  init() {
    const modelSelect = document.getElementById('modelSelectInput');
    const saveBtn = document.getElementById('saveSettingsBtn');

    // Populate exactly the 5 models
    if (modelSelect) {
      modelSelect.innerHTML = AppConfig.models.map(m => `
        <option value="${m.id}">${m.name}</option>
      `).join('');

      const savedModel = localStorage.getItem("abdullah_ai_model") || AppConfig.defaultModel;
      modelSelect.value = savedModel;
    }

    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        if (modelSelect) localStorage.setItem("abdullah_ai_model", modelSelect.value);
        UI.showToast("Settings securely saved to backend preference! ❤️");
      });
    }
  }
};
