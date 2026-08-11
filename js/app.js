document.addEventListener('DOMContentLoaded', () => {
  Animations.initParticles();
  VoiceSystem.synthesis = window.speechSynthesis;

  const homeHtml = document.getElementById('mainView').innerHTML;

  // Global Header Elements
  document.getElementById('menuBtn')?.addEventListener('click', () => UI.showToast("Abdullah AI Status: Backend Connected ⚡"));
  document.getElementById('crownBtn')?.addEventListener('click', () => UI.showToast("Sana is Abdullah's Queen 👑"));
  document.getElementById('topHeartBtn')?.addEventListener('click', (e) => Animations.spawnHeart(e.clientX, e.clientY));

  setupHomeControls();

  // Bottom Navigation
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
    
    document.getElementById('openSettingsBtn')?.addEventListener('click', async () => {
      const sHtml = await fetchPage('pages/settings.html');
      UI.renderView(sHtml);
      SettingsModule.init();
    });
  });

  document.getElementById('navCenterHeart').addEventListener('click', (e) => {
    Animations.spawnHeart(e.clientX, e.clientY - 20);
    VoiceSystem.speakText("I love you so much, Sana!");
  });
});

function setupHomeControls() {
  document.getElementById('micBtn')?.addEventListener('click', () => VoiceSystem.toggleListening());
  document.getElementById('sparkleBtn')?.addEventListener('click', () => {
    Animations.spawnHeart();
    UI.showToast("✨ Special love sparkles sent!");
  });
  document.getElementById('keyboardBtn')?.addEventListener('click', () => {
    document.getElementById('navChat').click();
  });

  // Action Cards Connected to Backend
  document.getElementById('actionChat')?.addEventListener('click', () => document.getElementById('navChat').click());
  
  document.getElementById('actionLove')?.addEventListener('click', async () => {
    UI.showToast("Generating love note...");
    const note = await AIService.sendMessage("Write a sweet, short romantic love note for Sana.", "loveNote");
    VoiceSystem.speakText(note);
  });

  document.getElementById('actionTeach')?.addEventListener('click', async () => {
    UI.showToast("Loading Krio lesson...");
    const krioLesson = await AIService.sendMessage("Teach Sana a beautiful Sierra Leone Krio romantic phrase.", "teachKrio");
    VoiceSystem.speakText(krioLesson);
  });

  document.getElementById('actionMood')?.addEventListener('click', async () => {
    Animations.spawnHeart();
    const moodMsg = await AIService.sendMessage("Give Sana an uplifting mood boost message.", "chat");
    VoiceSystem.speakText(moodMsg);
  });
}

async function fetchPage(url) {
  try {
    const res = await fetch(url);
    return await res.text();
  } catch (err) {
    return `<div class="glass-card">Failed to load view.</div>`;
  }
    }
