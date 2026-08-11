import { sendMessageToAI } from './ai.js';

const chatContainer = document.getElementById('chatContainer');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');

function addMessage(text, isUser = false) {
    const msg = document.createElement('div');
    msg.className = isUser ? 'msg-user' : 'msg-ai';
    msg.innerText = text;
    chatContainer.appendChild(msg);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

sendBtn.addEventListener('click', async () => {
    const text = chatInput.value.trim();
    if (!text) return;

    addMessage(text, true);
    chatInput.value = '';
    
    const response = await sendMessageToAI(text);
    addMessage(response.reply, false);
});
