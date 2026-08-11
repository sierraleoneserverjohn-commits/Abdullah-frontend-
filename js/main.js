document.addEventListener('DOMContentLoaded', () => {
    UI.init();

    // Voice to Text Setup
    Voice.init((transcript) => {
        UI.chatInput.value = transcript;
        UI.chatInput.dispatchEvent(new Event('input'));
    });

    document.getElementById('mic-btn').onclick = () => Voice.toggle();

    // Action button handler
    UI.actionBtn.onclick = async () => {
        const text = UI.chatInput.value.trim();

        if (text.length > 0) {
            // Send Message Mode
            UI.addMessage(text, 'sana');
            UI.chatInput.value = '';
            UI.chatInput.dispatchEvent(new Event('input'));

            try {
                const res = await API.sendMessage(text);
                UI.addMessage(res.response, 'abdullah');

                if (res.tokens_used) {
                    const currentTokens = parseInt(document.getElementById('tokens-count').innerText);
                    document.getElementById('tokens-count').innerText = currentTokens + res.tokens_used;
                }
                if (res.learning_progress !== undefined) {
                    document.getElementById('learning-score').innerText = `${res.learning_progress}%`;
                }
            } catch (err) {
                UI.addMessage("Connection error with Abdullah AI backend.", 'abdullah');
            }
        } else {
            // Live Voice Mode Trigger
            alert("Starting Live Voice Mode...");
        }
    };

    // Health Check on start
    API.checkHealth()
        .then(data => {
            document.getElementById('system-status').innerText = "Online";
            document.getElementById('system-status').style.color = "#10b981";
            if (data.live_learning_score !== undefined) {
                document.getElementById('learning-score').innerText = `${data.live_learning_score}%`;
            }
        })
        .catch(() => {
            document.getElementById('system-status').innerText = "Offline";
            document.getElementById('system-status').style.color = "#ef4444";
        });
});

