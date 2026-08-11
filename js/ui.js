const UI = {
    leftSidebar: document.getElementById('left-sidebar'),
    rightSidebar: document.getElementById('right-sidebar'),
    overlay: document.getElementById('sidebar-overlay'),
    chatInput: document.getElementById('chat-input'),
    actionBtn: document.getElementById('action-btn'),
    messageList: document.getElementById('message-list'),
    chatViewport: document.getElementById('chat-viewport'),

    init() {
        // Toggle sidebars
        document.getElementById('open-left-sidebar').onclick = () => this.toggleLeft(true);
        document.getElementById('open-right-sidebar').onclick = () => this.toggleRight(true);
        this.overlay.onclick = () => this.closeAll();

        // Switch button dynamically (Live voice <--> Send)
        this.chatInput.addEventListener('input', () => {
            if (this.chatInput.value.trim().length > 0) {
                this.actionBtn.className = "action-btn send-mode";
                this.actionBtn.innerHTML = `<i class="fa-solid fa-paper-plane"></i>`;
                this.actionBtn.title = "Send Message";
            } else {
                this.actionBtn.className = "action-btn live-mode";
                this.actionBtn.innerHTML = `<i class="fa-solid fa-circle-dot red-pulse"></i>`;
                this.actionBtn.title = "Live Voice Conversation";
            }
        });
    },

    toggleLeft(open) {
        this.leftSidebar.classList.toggle('open', open);
        this.overlay.classList.toggle('active', open);
    },

    toggleRight(open) {
        this.rightSidebar.classList.toggle('open', open);
        this.overlay.classList.toggle('active', open);
    },

    closeAll() {
        this.leftSidebar.classList.remove('open');
        this.rightSidebar.classList.remove('open');
        this.overlay.classList.remove('active');
    },

    addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `msg ${sender}`;
        msgDiv.innerHTML = `<p>${text}</p>`;
        this.messageList.appendChild(msgDiv);
        this.chatViewport.scrollTop = this.chatViewport.scrollHeight;
    }
};

