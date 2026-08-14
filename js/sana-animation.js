export function triggerSanaAnimation() {
  const canvas = document.getElementById('heartCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const hearts = Array.from({ length: 35 }, () => ({
    x: canvas.width / 2,
    y: canvas.height / 2 + 80,
    size: Math.random() * 20 + 15,
    speedX: (Math.random() - 0.5) * 8,
    speedY: (Math.random() - 1) * 10 - 4,
    opacity: 1,
    rotation: Math.random() * 360
  }));

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hearts.forEach((h, i) => {
      ctx.save();
      ctx.translate(h.x, h.y);
      ctx.rotate((h.rotation * Math.PI) / 180);
      ctx.globalAlpha = h.opacity;
      ctx.font = `${h.size}px serif`;
      ctx.fillText('💖', 0, 0);
      ctx.restore();

      h.x += h.speedX;
      h.y += h.speedY;
      h.opacity -= 0.018;

      if (h.opacity <= 0) hearts.splice(i, 1);
    });

    if (hearts.length > 0) requestAnimationFrame(render);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  render();
}

