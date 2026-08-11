const UI = {
  toastTimeout: null,

  showToast(message, duration = 3000) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');

    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  },

  setActiveNav(activeId) {
    document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));
    const target = document.getElementById(activeId);
    if (target) target.classList.add('active');
  },

  renderView(htmlContent) {
    const mainView = document.getElementById('mainView');
    if (mainView) {
      mainView.classList.remove('page-fade');
      void mainView.offsetWidth; // trigger reflow
      mainView.innerHTML = htmlContent;
      mainView.classList.add('page-fade');
    }
  }
};

