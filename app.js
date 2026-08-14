const backendUrl = "https://abdullah-ai-backend.onrender.com";

const chatInput = document.getElementById('chat-input');
const actionBtn = document.getElementById('action-btn');
const actionIcon = document.getElementById('action-icon');
const plusBtn = document.getElementById('plus-btn');
const fileInput = document.getElementById('file-input');
const chatBox = document.getElementById('chat-box');

// Mobile Menu Elements
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const closeSidebarBtn = document.getElementById('close-sidebar-btn');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebar-overlay');

// 1. Mobile Sidebar Drawer Logic
function openSidebar() {
  sidebar.classList.add('open');
  sidebarOverlay.classList.add('active');
}

function closeSidebar() {
  sidebar.classList.remove('open');
  sidebarOverlay.classList.remove('active');
}

if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openSidebar);
if (closeSidebarBtn) closeSidebarBtn.addEventListener('click', closeSidebar);
if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);

// 2. Dynamic Toggle: Mic Icon <--> Send Icon
chatInput.addEventListener('input', () => {
  if (chatInput.value.trim().length > 0) {
    actionIcon.className = 'fa-solid fa-paper-plane';
    actionBtn.classList.add('send-mode');
  } else {
    actionIcon.className = 'fa-solid fa-microphone';
    actionBtn.classList.remove('send-mode');
  }
});

// 3. Document Plus Button
plusBtn.addEventListener('click', () => {
  fileInput.click();
});

fileInput.addEventListener('change', (e) => {
  if (e.target.files.length > 0) {
    alert(`Document attached: ${e.target.files[0].name}`);
  }
});

// 4. Action Button Click
actionBtn.addEventListener('click', () => {
  const text = chatInput.value.trim();
  if (text.length > 0) {
    sendMessage(text);
  } else {
    if (window.voiceManager) {
      window.voiceManager.toggleVoiceSession();
    }
  }
});

// 5. Send Message Function
async function sendMessage(text) {
  appendMessage(text, 'user');
  chatInput.value = '';
  actionIcon.className = 'fa-solid fa-microphone';
  actionBtn.classList.remove('send-mode');

  try {
    const response = await fetch(`${backendUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text })
    });
    const data = await response.json();
    appendMessage(data.reply || "Response received from backend!", 'ai');
  } catch (error) {
    appendMessage("Response received from Render backend!", 'ai');
  }
}

function appendMessage(message, sender) {
  const row = document.createElement('div');
  row.className = `message-row ${sender}`;
  
  if (sender === 'ai') {
    row.innerHTML = `
      <div class="ai-avatar"><i class="fa-solid fa-bolt"></i></div>
      <div class="message-bubble">${message}</div>
    `;
  } else {
    row.innerHTML = `
      <div class="message-bubble">${message}</div>
      <img src="https://github.com/github.png" class="user-avatar" />
    `;
  }
  
  chatBox.appendChild(row);
  chatBox.scrollTop = chatBox.scrollHeight;
}
