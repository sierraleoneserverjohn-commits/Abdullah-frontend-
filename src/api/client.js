import { BASE_URL, ROUTES } from './config.js';

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { Accept: 'application/json', ...options.headers },
    ...options,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Request failed (${res.status}): ${text || res.statusText}`);
  }

  const contentType = res.headers.get('content-type') || '';
  return contentType.includes('application/json') ? res.json() : res.text();
}

export function sendMessage({ conversationId, text, attachmentIds = [] }) {
  return request(ROUTES.chat, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ conversation_id: conversationId, message: text, attachment_ids: attachmentIds }),
  });
}

export function uploadDocument(file, conversationId) {
  const form = new FormData();
  form.append('file', file);
  if (conversationId) form.append('conversation_id', conversationId);

  return request(ROUTES.upload, {
    method: 'POST',
    body: form,
  });
}

export function listConversations() {
  return request(ROUTES.conversations, { method: 'GET' });
}

export function getConversation(id) {
  return request(ROUTES.conversation(id), { method: 'GET' });
}

export function deleteConversation(id) {
  return request(ROUTES.conversation(id), { method: 'DELETE' });
}

export function uploadProfileImage(file) {
  const form = new FormData();
  form.append('image', file);
  return request(ROUTES.profile, { method: 'POST', body: form });
}
