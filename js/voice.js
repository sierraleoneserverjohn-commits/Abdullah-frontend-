import { sendMessageToAI } from './ai.js';

const micBtn = document.getElementById('micBtn');
const statusText = document.getElementById('statusText');
const orb = document.getElementById('aiOrb');

let recognition;

if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
        statusText.innerText = "Listening...";
        orb.classList.add('orb-listening');
    };

    recognition.onresult = async (event) => {
        const text = event.results[0][0].transcript;
        statusText.innerText = "Thinking...";
        const response = await sendMessageToAI(text);
        speakText(response.reply);
    };

    recognition.onerror = () => {
        statusText.innerText = "Try again, Sana";
        orb.classList.remove('orb-listening');
    };

    recognition.onend = () => {
        orb.classList.remove('orb-listening');
    };
}

function speakText(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onstart = () => {
        statusText.innerText = "Abdullah AI speaking...";
        orb.classList.add('orb-listening');
    };
    utterance.onend = () => {
        statusText.innerText = "Tap to talk";
        orb.classList.remove('orb-listening');
    };
    window.speechSynthesis.speak(utterance);
}

micBtn.addEventListener('click', () => {
    recognition ? recognition.start() : alert("Speech not supported");
});
