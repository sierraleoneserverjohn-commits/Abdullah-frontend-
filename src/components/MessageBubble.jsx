export default function MessageBubble({ message, aiAvatarUrl, userAvatarUrl }) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex items-end gap-2.5 animate-fadeUp ${isUser ? 'flex-row-reverse' : ''}`}>
      <img
        src={isUser ? userAvatarUrl : aiAvatarUrl}
        alt={isUser ? 'You' : 'Abdullah AI'}
        className="w-8 h-8 rounded-full object-cover shrink-0 ring-1 ring-ink-700"
      />

      <div className={`max-w-[78%] flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
        {message.attachments?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-1.5">
            {message.attachments.map((att, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-ink-800 border border-ink-700 rounded-xl px-3 py-2 text-xs text-haze-300 font-body"
              >
                <span aria-hidden="true">📄</span>
                <span className="truncate max-w-[140px]">{att.name}</span>
              </div>
            ))}
          </div>
        )}

        {message.text && (
          <div
            className={`px-4 py-2.5 rounded-2xl font-body text-[15px] leading-relaxed whitespace-pre-wrap break-words ${
              isUser
                ? 'bg-signal text-ink-950 rounded-br-sm'
                : 'bg-ink-800 text-haze-100 rounded-bl-sm border border-ink-700'
            }`}
          >
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
}
