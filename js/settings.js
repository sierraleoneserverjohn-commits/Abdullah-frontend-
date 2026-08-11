const SettingsModule = {
  key: "abdullah_ai_settings",

  getSettings() {
    return JSON.parse(localStorage.getItem(this.key)) || AppConfig.themeDefaults;
  },

  saveSettings(newSettings) {
    localStorage.setItem(this.key, JSON.stringify(newSettings));
  },

  init() {
    const voiceCb = document.getElementById('settingVoice');
    const autoCb = document.getElementById('settingAutoSpeak');
    const animCb = document.getElementById('settingAnimations');
    const resetBtn = document.getElementById('resetDataBtn');

    const current = this.getSettings();
    if (voiceCb) voiceCb.checked = current.voice;
    if (autoCb) autoCb.checked = current.autoSpeak;
    if (animCb) animCb.checked = current.animations;

    if (voiceCb) voiceCb.addEventListener('change', (e) => this.update('voice', e.target.checked));
    if (autoCb) autoCb.addEventListener('change', (e) => this.update('autoSpeak', e.target.checked));
    if (animCb) animCb.addEventListener('change', (e) => this.update('animations', e.target.checked));

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        localStorage.clear();
        UI.showToast("App data reset!");
        setTimeout(() => location.reload(), 1000);
      });
    }
  },

  update(field, val) {
    const settings = this.getSettings();
    settings[field] = val;
    this.saveSettings(settings);
    UI.showToast("Setting saved!");
  }
};
