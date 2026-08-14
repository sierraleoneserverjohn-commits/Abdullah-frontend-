import { useCallback, useEffect, useState } from 'react';
import * as api from '../api/client.js';

export function useChat(conversationId) {
  const [messages, setMessages] = useState([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!conversationId) { setMessages([]); return; }
    let cancelled = false;
    setIsLoadingHistory(true);
    api.getConversation(conversationId)
      .then((data) => { if (!cancelled) setMessages(data.messages || []); })
      .catch((err) => { if (!cancelled) setError(err.message); })
      .finally(() => { if (!cancelled) setIsLoadingHistory(false); });
    return () => { cancelled = true; };
  }, [conversationId]);

  const send = useCallback(
    async (text, { attachmentIds = [], attachmentPreviews = [] } = {}) => {
      if (!text.trim() && attachmentIds.length === 0) return;
      const optimisticUserMessage = {
        id: `local-${Date.now()}`,
        role: 'user',
        text,
        attachments: attachmentPreviews,
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, optimisticUserMessage]);
      setIsSending(true);
      setError(null);
      try {
        const reply = await api.sendMessage({ conversationId, text, attachmentIds });
        setMessages((prev) => [
          ...prev,
          {
            id: reply.id || `assistant-${Date.now()}`,
            role: 'assistant',
            text: reply.message ?? reply.text ?? '',
            createdAt: reply.created_at || new Date().toISOString(),
          },
        ]);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsSending(false);
      }
    },
    [conversationId]
  );

  return { messages, isLoadingHistory, isSending, error, send };
}
