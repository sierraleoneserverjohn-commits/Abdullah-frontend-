const Animations = {
  canvas: null,
  ctx: null,
  particles: [],

  initParticles() {
    this.canvas = document.getElementById('particlesCanvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());

    this.particles = [];
    for (let i = 0; i < 35; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        radius: Math.random() * 2 + 0.5,
        color: Math.random() > 0.5 ? '#ff3b8b' : '#b522ff',
        alpha: Math.random() * 0.7 + 0.2,
        speedY: -Math.random() * 0.4 - 0.1,
        speedX: (Math.random() - 0.5) * 0.3
      });
    }
    this.animate();
  },

  resizeCanvas() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  },

  animate() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach(p => {
      p.y += p.speedY;
      p.x += p.speedX;

      if (p.y < 0) p.y = this.canvas.height;
      if (p.x < 0 || p.x > this.canvas.width) p.speedX *= -1;

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.globalAlpha = p.alpha;
      this.ctx.shadowBlur = 8;
      this.ctx.shadowColor = p.color;
      this.ctx.fill();
    });

    requestAnimationFrame(() => this.animate());
  },

  spawnHeart(x, y) {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.innerHTML = '💖';
    heart.style.left = `${x || window.innerWidth / 2}px`;
    heart.style.top = `${y || window.innerHeight / 2}px`;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 3000);
  },

  setWaveformActive(active) {
    const bars = document.querySelectorAll('.waveform-bar');
    bars.forEach(bar => {
      if (active) {
        bar.classList.add('active');
        bar.style.animationDelay = `${Math.random() * 0.5}s`;
      } else {
        bar.classList.remove('active');
      }
    });
  }
};
      
