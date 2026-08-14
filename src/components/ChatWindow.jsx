import { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble.jsx';

export default function ChatWindow({ messages, isLoadingHistory, isSending, aiAvatarUrl, userAvatarUrl }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isSending]);

  if (isLoadingHistory) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <span className="font-mono text-xs text-haze-500 tracking-widest uppercase">Loading conversation…</span>
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center px-8 gap-3">
        <img src={aiAvatarUrl} alt="Abdullah AI" className="w-16 h-16 rounded-full object-cover ring-1 ring-ink-700" />
        <p className="font-display text-lg text-haze-100">Say something to Abdullah AI</p>
        <p className="font-body text-sm text-haze-500 max-w-xs">
          Type a message, attach a document, or start a live voice conversation.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto scroll-thin px-4 py-6 space-y-5">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} aiAvatarUrl={aiAvatarUrl} userAvatarUrl={userAvatarUrl} />
      ))}

      {isSending && (
        <div className="flex items-end gap-2.5 animate-fadeUp">
          <img src={aiAvatarUrl} alt="Abdullah AI" className="w-8 h-8 rounded-full object-cover ring-1 ring-ink-700" />
          <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-ink-800 border border-ink-700 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-haze-500 animate-wave [animation-delay:0s]" />
            <span className="w-1.5 h-1.5 rounded-full bg-haze-500 animate-wave [animation-delay:0.15s]" />
            <span className="w-1.5 h-1.5 rounded-full bg-haze-500 animate-wave [animation-delay:0.3s]" />
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
