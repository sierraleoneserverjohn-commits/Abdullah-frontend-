export function initSidebar() {
  const menuBtn = document.getElementById('menuBtn');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  const closeBtn = document.getElementById('closeSidebarBtn');

  const open = () => { sidebar.classList.add('active'); overlay.classList.add('active'); };
  const close = () => { sidebar.classList.remove('active'); overlay.classList.remove('active'); };

  if (menuBtn) menuBtn.addEventListener('click', open);
  if (closeBtn) closeBtn.addEventListener('click', close);
  if (overlay) overlay.addEventListener('click', close);
}

