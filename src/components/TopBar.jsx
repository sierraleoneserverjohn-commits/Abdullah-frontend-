export default function TopBar({ onOpenSidebar, title, aiAvatarUrl }) {
  return (
    <header className="flex items-center justify-between px-3 py-3 border-b border-ink-800 shrink-0">
      <button
        onClick={onOpenSidebar}
        className="w-10 h-10 rounded-full flex items-center justify-center text-haze-300 hover:text-haze-100 hover:bg-ink-800 transition-colors md:hidden"
        aria-label="Open sidebar"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>

      <div className="flex items-center gap-2 mx-auto md:mx-0">
        <img src={aiAvatarUrl} alt="Abdullah AI" className="w-7 h-7 rounded-full object-cover ring-1 ring-ink-700" />
        <span className="font-display text-sm text-haze-100 truncate max-w-[60vw]">{title}</span>
      </div>

      <span className="w-10 h-10 md:hidden" aria-hidden="true" />
    </header>
  );
}
