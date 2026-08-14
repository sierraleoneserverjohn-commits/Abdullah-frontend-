import { useRef, useState } from 'react';

export default function InputBar({ onSend, onStartLiveVoice, isSending }) {
  const [text, setText] = useState('');
  const [pendingFiles, setPendingFiles] = useState([]);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  const hasContent = text.trim().length > 0 || pendingFiles.length > 0;

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setPendingFiles((prev) => [...prev, ...files]);
    e.target.value = '';
  };

  const removeFile = (index) => {
    setPendingFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSend = () => {
    if (!hasContent || isSending) return;
    onSend(text, pendingFiles);
    setText('');
    setPendingFiles([]);
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const autosize = (e) => {
    setText(e.target.value);
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 140)}px`;
  };

  return (
    <div className="px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-2 bg-gradient-to-t from-ink-950 via-ink-950 to-transparent">
      {pendingFiles.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {pendingFiles.map((file, i) => (
            <div
              key={`${file.name}-${i}`}
              className="flex items-center gap-2 bg-ink-800 border border-ink-700 rounded-xl pl-3 pr-2 py-1.5 text-xs text-haze-300 font-body"
            >
              <span aria-hidden="true">📄</span>
              <span className="truncate max-w-[120px]">{file.name}</span>
              <button
                onClick={() => removeFile(i)}
                className="text-haze-500 hover:text-haze-100 leading-none"
                aria-label={`Remove ${file.name}`}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-end gap-2 bg-ink-850 border border-ink-700 rounded-[26px] pl-2 pr-2 py-2 shadow-panel">
        <input ref={fileInputRef} type="file" multiple hidden onChange={handleFileChange} />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-10 h-10 shrink-0 rounded-full flex items-center justify-center text-haze-300 hover:text-haze-100 hover:bg-ink-800 transition-colors"
          aria-label="Attach a document"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <textarea
          ref={textareaRef}
          value={text}
          onChange={autosize}
          onKeyDown={handleKeyDown}
          rows={1}
          placeholder="Message Abdullah AI"
          className="flex-1 resize-none bg-transparent outline-none font-body text-[15px] text-haze-100 placeholder:text-haze-500 py-2 max-h-[140px]"
        />

        {hasContent ? (
          <button
            onClick={handleSend}
            disabled={isSending}
            className="w-10 h-10 shrink-0 rounded-full bg-signal flex items-center justify-center disabled:opacity-50 active:scale-95 transition-transform"
            aria-label="Send message"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M4 12l16-7-6.5 16-2.5-6.5L4 12z" fill="#08090B" />
            </svg>
          </button>
        ) : (
          <button
            onClick={onStartLiveVoice}
            className="w-10 h-10 shrink-0 rounded-full bg-ink-800 border border-ink-700 flex items-center justify-center text-signal hover:bg-ink-700 active:scale-95 transition-transform"
            aria-label="Start live voice conversation"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <rect x="9" y="3" width="6" height="11" rx="3" stroke="currentColor" strokeWidth="1.8" />
              <path d="M5 11a7 7 0 0014 0M12 18v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
