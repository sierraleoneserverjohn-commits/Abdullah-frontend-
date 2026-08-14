import { useRef } from 'react';

export default function Sidebar({
  isOpen,
  onClose,
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewChat,
  onStartLiveVoice,
  userName,
  userAvatarUrl,
  onProfileImageChange,
  onOpenSettings,
}) {
  const fileInputRef = useRef(null);

  return (
    <>
      {isOpen && (
        <button
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={onClose}
          aria-label="Close sidebar"
        />
      )}

      <aside
        className={`fixed md:static inset-y-0 left-0 z-40 w-72 shrink-0 bg-ink-900 border-r border-ink-800 flex flex-col
        transition-transform duration-200 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        <div className="px-4 pt-6 pb-4 border-b border-ink-800">
          <div className="flex items-center gap-3">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="relative group shrink-0"
              aria-label="Change profile photo"
            >
              <img
                src={userAvatarUrl}
                alt={userName}
                className="w-12 h-12 rounded-full object-cover ring-1 ring-ink-700"
              />
              <span className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M4 20h4l11-11-4-4L4 16v4z" stroke="#F5F7FA" strokeWidth="1.6" />
                </svg>
              </span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) onProfileImageChange(file);
                e.target.value = '';
              }}
            />
            <div className="min-w-0">
              <p className="font-display text-sm text-haze-100 truncate">{userName}</p>
              <button
                onClick={onOpenSettings}
                className="font-body text-xs text-haze-500 hover:text-signal transition-colors"
              >
                Settings
              </button>
            </div>
          </div>
        </div>

        <div className="px-3 pt-4 space-y-1.5">
          <button
            onClick={onNewChat}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-ink-800 hover:bg-ink-700 transition-colors"
          >
            <span className="w-6 h-6 rounded-full bg-signal/15 text-signal flex items-center justify-center text-xs">+</span>
            <span className="font-body text-sm text-haze-100">New chat</span>
          </button>

          <button
            onClick={onStartLiveVoice}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-ink-800 transition-colors"
          >
            <span className="w-6 h-6 rounded-full bg-ember/15 text-ember flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <rect x="9" y="3" width="6" height="11" rx="3" stroke="currentColor" strokeWidth="1.8" />
                <path d="M5 11a7 7 0 0014 0M12 18v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </span>
            <span className="font-body text-sm text-haze-100">Live conversation</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto scroll-thin px-3 mt-5">
          <p className="font-mono text-[11px] tracking-widest uppercase text-haze-500 px-2 mb-2">Recent</p>
          <div className="space-y-0.5 pb-4">
            {conversations.length === 0 && (
              <p className="font-body text-xs text-haze-500 px-2 py-3">No conversations yet.</p>
            )}
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => onSelectConversation(conv.id)}
                className={`w-full text-left px-3 py-2.5 rounded-xl font-body text-sm truncate transition-colors ${
                  conv.id === activeConversationId
                    ? 'bg-signal/10 text-signal'
                    : 'text-haze-300 hover:bg-ink-800 hover:text-haze-100'
                }`}
              >
                {conv.title || 'Untitled conversation'}
              </button>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
