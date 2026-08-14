import { useCallback, useRef, useState } from 'react';

export function useMicStream({ onChunk } = {}) {
  const [amplitude, setAmplitude] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const streamRef = useRef(null);
  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const processorRef = useRef(null);
  const rafRef = useRef(null);

  const tickAmplitude = useCallback(() => {
    const analyser = analyserRef.current;
    if (!analyser) return;
    const data = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteTimeDomainData(data);
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      const centered = (data[i] - 128) / 128;
      sum += centered * centered;
    }
    const rms = Math.sqrt(sum / data.length);
    setAmplitude(Math.min(1, rms * 4));
    rafRef.current = requestAnimationFrame(tickAmplitude);
  }, []);

  const start = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    streamRef.current = stream;

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 16000 });
    audioCtxRef.current = audioCtx;

    const source = audioCtx.createMediaStreamSource(stream);
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 512;
    analyserRef.current = analyser;
    source.connect(analyser);

    const processor = audioCtx.createScriptProcessor(2048, 1, 1);
    processorRef.current = processor;
    source.connect(processor);
    processor.connect(audioCtx.destination);

    processor.onaudioprocess = (e) => {
      const input = e.inputBuffer.getChannelData(0);
      const pcm16 = new Int16Array(input.length);
      for (let i = 0; i < input.length; i++) {
        const s = Math.max(-1, Math.min(1, input[i]));
        pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
      }
      onChunk?.(pcm16.buffer);
    };

    setIsActive(true);
    tickAmplitude();
  }, [onChunk, tickAmplitude]);

  const stop = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    processorRef.current?.disconnect();
    analyserRef.current?.disconnect();
    audioCtxRef.current?.close();
    streamRef.current?.getTracks().forEach((t) => t.stop());
    setIsActive(false);
    setAmplitude(0);
  }, []);

  return { amplitude, isActive, start, stop };
}
