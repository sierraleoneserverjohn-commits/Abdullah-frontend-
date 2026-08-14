import { triggerSanaAnimation } from './sana-animation.js';

export function initNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  const centerHeartBtn = document.getElementById('centerHeartBtn');

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      if (item.dataset.tab === 'sana') {
        triggerSanaAnimation();
      }
    });
  });

  if (centerHeartBtn) {
    centerHeartBtn.addEventListener('click', () => {
      triggerSanaAnimation();
    });
  }
}

