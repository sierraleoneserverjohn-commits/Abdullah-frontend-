const Voice = {
    recognition: null,
    isListening: false,

    init(onResultCallback) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            console.warn("Speech recognition not supported in this browser.");
            return;
        }

        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.lang = 'en-US';

        this.recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            onResultCallback(transcript);
        };

        this.recognition.onend = () => {
            this.isListening = false;
            document.getElementById('mic-btn').style.color = '#94a3b8';
        };
    },

    toggle() {
        if (!this.recognition) return;
        if (this.isListening) {
            this.recognition.stop();
        } else {
            this.recognition.start();
            this.isListening = true;
            document.getElementById('mic-btn').style.color = '#ef4444';
        }
    }
};

