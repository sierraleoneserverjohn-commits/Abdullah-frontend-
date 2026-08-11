const API = {
    async sendMessage(text) {
        const url = `${CONFIG.getBackendUrl()}/chat`;
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: text })
        });
        if (!response.ok) throw new Error("API Network error");
        return await response.json();
    },

    async checkHealth() {
        const url = `${CONFIG.getBackendUrl()}/`;
        const response = await fetch(url);
        return await response.json();
    }
};

