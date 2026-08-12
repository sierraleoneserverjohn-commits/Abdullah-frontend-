// Configuration
const BACKEND_URL = "https://your-backend-deployment-url.com"; // Replace with your active backend URL

let mediaRecorder;
let audioChunks = [];
let isRecording = false;

document.addEventListener("DOMContentLoaded", () => {
  const micBtn = document.getElementById("globalMicBtn");
  const sendBtn = document.getElementById("sendBtn");
  const chatInput = document.getElementById("chatInput");

  // Handle Voice Recording Toggle
  if (micBtn) {
    micBtn.addEventListener("click", () => {
      if (!isRecording) {
        startRecording();
      } else {
        stopRecordingAndSend();
      }
    });
  }

  // Handle Text Message Send
  if (sendBtn) {
    sendBtn.addEventListener("click", () => {
      const text = chatInput.value.trim();
      if (text) {
        appendUserMessage(text);
        chatInput.value = "";
        sendTextToBackend(text);
      }
    });
  }
});

// Start Recording Microphone Stream
async function startRecording() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    audioChunks = [];

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) audioChunks.push(event.data);
    };

    mediaRecorder.start();
    isRecording = true;
    updateMicUI(true);
  } catch (err) {
    console.error("Microphone access error:", err);
    alert("Microphone permission denied or not supported.");
  }
}

// Stop Recording and Post Blob Directly to Backend API
async function stopRecordingAndSend() {
  if (!mediaRecorder) return;

  mediaRecorder.stop();
  isRecording = false;
  updateMicUI(false);

  mediaRecorder.onstop = async () => {
    const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
    
    // Render immediate UI feedback
    appendVoiceNoteMessage("0:18");

    // Asynchronous backend request (keeps app snappy)
    const formData = new FormData();
    formData.append("file", audioBlob, "voice_input.webm");

    try {
      const response = await fetch(`${BACKEND_URL}/api/voice-chat`, {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      
      if (data && data.reply) {
        appendBotMessage(data.reply);
      }
    } catch (error) {
      console.error("Backend voice error:", error);
    }
  };
}

// Send Text Prompt to Backend API
async function sendTextToBackend(messageText) {
  try {
    const response = await fetch(`${BACKEND_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: messageText })
    });
    const data = await response.json();
    if (data && data.reply) {
      appendBotMessage(data.reply);
    }
  } catch (error) {
    console.error("Backend text request error:", error);
  }
}

// UI Helpers
function updateMicUI(recording) {
  const micBtn = document.getElementById("globalMicBtn");
  if (recording) {
    micBtn.style.borderColor = "#00ff88";
    micBtn.style.boxShadow = "0 0 25px #00ff88";
  } else {
    micBtn.style.borderColor = "var(--primary-pink)";
    micBtn.style.boxShadow = "0 0 20px var(--glow-pink)";
  }
}

function appendUserMessage(text) {
  const container = document.getElementById("chatContainer");
  const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const html = `
    <div class="message-row user">
      <div class="bubble user-bubble">
        <p>${text}</p>
        <span class="timestamp">${timeStr} <span class="ticks">✓✓</span></span>
      </div>
    </div>`;
  container.insertAdjacentHTML("beforeend", html);
  container.scrollTop = container.scrollHeight;
}

function appendBotMessage(text) {
  const container = document.getElementById("chatContainer");
  const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const html = `
    <div class="message-row bot">
      <div class="bot-avatar-msg">🤖</div>
      <div class="bubble bot-bubble">
        <p>${text}</p>
        <span class="timestamp">${timeStr}</span>
      </div>
    </div>`;
  container.insertAdjacentHTML("beforeend", html);
  container.scrollTop = container.scrollHeight;
}

function appendVoiceNoteMessage(durationStr) {
  const container = document.getElementById("chatContainer");
  const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const html = `
    <div class="message-row user">
      <div class="bubble user-bubble voice-bubble">
        <button class="voice-play-btn">▶</button>
        <div class="voice-waveform">
          <span style="height: 12px;"></span><span style="height: 20px;"></span><span style="height: 14px;"></span>
          <span style="height: 26px;"></span><span style="height: 18px;"></span><span style="height: 10px;"></span>
        </div>
        <span class="voice-duration">${durationStr}</span>
        <span class="timestamp">${timeStr} <span class="ticks">✓✓</span></span>
      </div>
    </div>`;
  container.insertAdjacentHTML("beforeend", html);
  container.scrollTop = container.scrollHeight;
}
