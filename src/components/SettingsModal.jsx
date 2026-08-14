import { useRef } from 'react';
import { MODEL_LAYERS } from '../api/config.js';

export default function SettingsModal({ isOpen, onClose, userName, userAvatarUrl, onProfileImageChange }) {
  const fileInputRef = useRef(null);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/60 animate-fadeUp">
      <div className="w-full md:w-[420px] bg-ink-900 border border-ink-800 rounded-t-3xl md:rounded-3xl p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-lg text-haze-100">Settings</h2>
          <button onClick={onClose} className="text-haze-500 hover:text-haze-100" aria-label="Close settings">
            ✕
          </button>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => fileInputRef.current?.click()} className="relative group" aria-label="Change profile photo">
            <img src={userAvatarUrl} alt={userName} className="w-16 h-16 rounded-full object-cover ring-1 ring-ink-700" />
            <span className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
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
          <div>
            <p className="font-display text-base text-haze-100">{userName}</p>
            <p className="font-body text-xs text-haze-500">Tap the photo to update it</p>
          </div>
        </div>

        <p className="font-mono text-[11px] tracking-widest uppercase text-haze-500 mb-2">AI layers</p>
        <div className="space-y-2">
          {Object.entries(MODEL_LAYERS).map(([key, layer]) => (
            <div key={key} className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-ink-850 border border-ink-800">
              <span className="font-body text-sm text-haze-300">{layer.label}</span>
              <span className="font-mono text-xs text-signal">{layer.provider}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
