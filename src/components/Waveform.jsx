import { useEffect, useRef } from 'react';

export default function Waveform({ amplitude = 0, active = false, barCount = 40, color = '#00D9C0' }) {
  const canvasRef = useRef(null);
  const historyRef = useRef(new Array(barCount).fill(0.06));
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    function resize() {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);

    function draw() {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);

      const history = historyRef.current;
      const target = active ? Math.max(0.06, amplitude) : 0.06;
      history.shift();
      const prev = history[history.length - 1] ?? target;
      history.push(prev + (target - prev) * 0.35);

      const barWidth = width / barCount;
      const gap = barWidth * 0.35;

      history.forEach((v, i) => {
        const centerBoost = 1 - Math.abs(i - barCount / 2) / (barCount / 2) * 0.5;
        const h = Math.max(3, v * height * centerBoost);
        const x = i * barWidth + gap / 2;
        const y = (height - h) / 2;
        ctx.fillStyle = color;
        ctx.globalAlpha = active ? 0.55 + v * 0.45 : 0.35;
        const r = Math.min(3, barWidth - gap);
        roundedRect(ctx, x, y, barWidth - gap, h, r);
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [amplitude, active, barCount, color]);

  return <canvas ref={canvasRef} className="w-full h-full" aria-hidden="true" />;
}

function roundedRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
