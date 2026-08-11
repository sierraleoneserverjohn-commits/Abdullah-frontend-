document.addEventListener('DOMContentLoaded', () => {
  // Initialize Core Systems
  Animations.initParticles();
  VoiceSystem.init();

  const homeHtml = document.getElementById('mainView').innerHTML;

  // Header Buttons
  const menuBtn = document.getElementById('menuBtn');
  const crownBtn = document.getElementById('crownBtn');
  const topHeartBtn = document.getElementById('topHeartBtn');

  if (menuBtn) menuBtn.addEventListener('click', () => UI.showToast("Abdullah AI Menu"));
  if (crownBtn) crownBtn.addEventListener('click', () => UI.showToast("Sana is Abdullah's Queen 👑"));
  if (topHeartBtn) topHeartBtn.addEventListener('click', (e) => Animations.spawnHeart(e.clientX, e.clientY));

  // Voice Controls Setup on Home
  setupHomeControls();

  // Navigation Setup
  document.getElementById('navHome').addEventListener('click', () => {
    UI.setActiveNav('navHome');
    UI.renderView(homeHtml);
    setupHomeControls();
  });

  document.getElementById('navChat').addEventListener('click', async () => {
    UI.setActiveNav('navChat');
    const html = await fetchPage('pages/chat.html');
    UI.renderView(html);
    ChatModule.init();
  });

  document.getElementById('navMemory').addEventListener('click', async () => {
    UI.setActiveNav('navMemory');
    const html = await fetchPage('pages/memory.html');
    UI.renderView(html);
    MemoryModule.init();
  });

  document.getElementById('navProfile').addEventListener('click', async () => {
    UI.setActiveNav('navProfile');
    const html = await fetchPage('pages/profile.html');
    UI.renderView(html);
    const setBtn = document.getElementById('openSettingsBtn');
    if (setBtn) {
      setBtn.addEventListener('click', async () => {
        const sHtml = await fetchPage('pages/settings.html');
        UI.renderView(sHtml);
        SettingsModule.init();
      });
    }
  });

  document.getElementById('navCenterHeart').addEventListener('click', (e) => {
    Animations.spawnHeart(e.clientX, e.clientY - 20);
    VoiceSystem.speak("I love you so much, Sana!");
  });
});

function setupHomeControls() {
  const micBtn = document.getElementById('micBtn');
  const sparkleBtn = document.getElementById('sparkleBtn');
  const keyboardBtn = document.getElementById('keyboardBtn');

  if (micBtn) micBtn.addEventListener('click', () => VoiceSystem.toggleListening());
  if (sparkleBtn) sparkleBtn.addEventListener('click', () => {
    Animations.spawnHeart();
    UI.showToast("Sparkling love sent to Sana ✨");
  });
  if (keyboardBtn) {
    keyboardBtn.addEventListener('click', () => {
      document.getElementById('navChat').click();
    });
  }

  // Quick Action Buttons
  const actionChat = document.getElementById('actionChat');
  const actionLove = document.getElementById('actionLove');
  const actionTeach = document.getElementById('actionTeach');
  const actionMood = document.getElementById('actionMood');

  if (actionChat) actionChat.addEventListener('click', () => document.getElementById('navChat').click());
  if (actionLove) actionLove.addEventListener('click', () => VoiceSystem.speak("Here is your love note: You are the light of Abdullah's heart, today and forever. 💕"));
  if (actionTeach) actionTeach.addEventListener('click', () => VoiceSystem.speak("What topic would you love to learn about today, my dear Sana?"));
  if (actionMood) actionMood.addEventListener('click', () => {
    Animations.spawnHeart();
    VoiceSystem.speak("Sending you huge hugs, smiles, and warmth! You've got this, Sana!");
  });
}

async function fetchPage(url) {
  try {
    const res = await fetch(url);
    return await res.text();
  } catch (err) {
    return `<div class="glass-card">Failed to load content.</div>`;
  }
}
    
