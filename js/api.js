export async function sendChatMessage(message) {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, user: 'Sana' })
    });
    
    if (!response.ok) throw new Error('Network error');
    return await response.json();
  } catch (err) {
    console.error('API Call Failed:', err);
    return { reply: "I'm having trouble connecting to my database right now." };
  }
}
