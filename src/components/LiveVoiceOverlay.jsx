import { useCallback, useEffect, useRef, useState } from 'react';
import Waveform from './Waveform.jsx';
import { LiveVoiceSocket } from '../api/liveVoiceSocket.js';
import { useMicStream } from '../hooks/useMicStream.js';

const STATUS_LABEL = {
  connecting: 'Connecting…',
  listening: 'Listening',
  thinking: 'Thinking',
  speaking: 'Speaking',
  error: 'Connection lost',
};

export default function LiveVoiceOverlay({ conversationId, aiAvatarUrl, onClose }) {
  const [status, setStatus] = useState('connecting');
  const [captionText, setCaptionText] = useState('');
  const socketRef = useRef(null);

  const handleChunk = useCallback((buffer) => {
    socketRef.current?.sendAudioChunk(buffer);
  }, []);

  const { amplitude, start, stop } = useMicStream({ onChunk: handleChunk });

  useEffect(() => {
    const socket = new LiveVoiceSocket({
      conversationId,
      onOpen: async () => {
        setStatus('listening');
        try {
          await start();
        } catch {
          setStatus('error');
        }
      },
      onEvent: (event) => {
        if (event.type === 'status') setStatus(event.status);
        if (event.type === 'text') setCaptionText(event.text);
      },
      onClose: () => setStatus('error'),
      onError: () => setStatus('error'),
    });
    socketRef.current = socket;
    socket.connect();

    return () => {
      stop();
      socket.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationId]);

  const handleEnd = () => {
    stop();
    socketRef.current?.close();
    onClose();
  };

  const isSpeaking = status === 'speaking';
  const barColor = isSpeaking ? '#F2B84B' : '#00D9C0';

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-ink-950/98 backdrop-blur-xl animate-fadeUp">
      <div className="w-full flex items-center justify-between px-6 pt-6">
        <span className="font-mono text-xs tracking-widest text-haze-500 uppercase">Live conversation</span>
        <button
          onClick={handleEnd}
          className="text-haze-300 hover:text-haze-100 text-sm font-body px-3 py-1.5 rounded-full border border-ink-700 hover:border-ink-600 transition-colors"
        >
          End
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-8 px-8 w-full max-w-md">
        <div className="relative w-40 h-40 flex items-center justify-center">
          {status === 'listening' && (
            <>
              <span className="absolute inset-0 rounded-full border border-signal/40 animate-pulseRing" />
              <span className="absolute inset-0 rounded-full border border-signal/40 animate-pulseRing [animation-delay:0.6s]" />
            </>
          )}
          <img
            src={aiAvatarUrl}
            alt="Abdullah AI"
            className="w-32 h-32 rounded-full object-cover ring-2 ring-ink-700 shadow-glow"
          />
        </div>

        <div className="w-full h-20">
          <Waveform amplitude={amplitude} active={status !== 'error'} color={barColor} />
        </div>

        <div className="text-center space-y-1">
          <p className="font-display text-sm text-haze-100 tracking-wide">{STATUS_LABEL[status]}</p>
          {captionText && <p className="font-body text-sm text-haze-500 max-w-sm">{captionText}</p>}
        </div>
      </div>

      <div className="pb-10">
        <button
          onClick={handleEnd}
          className="w-16 h-16 rounded-full bg-ember flex items-center justify-center shadow-panel active:scale-95 transition-transform"
          aria-label="End live conversation"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M6 6l12 12M18 6L6 18" stroke="#08090B" strokeWidth="2.4" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
