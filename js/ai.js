export async function sendMessageToAI(message) {
    // Simulated API call
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                reply: `Hey Sana, Abdullah wanted me to tell you that you're amazing. How can I help you more?`
            });
        }, 1000);
    });
}
