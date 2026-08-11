const MemoryModule = {
  key: "abdullah_ai_sana_memories",

  getMemories() {
    return JSON.parse(localStorage.getItem(this.key)) || [
      "Favorite Flower: Pink Tulips 🌷",
      "Special Anniversary: June 14 💕",
      "Loves sweet surprise notes in the morning."
    ];
  },

  addMemory(text) {
    if (!text.trim()) return;
    const list = this.getMemories();
    list.push(text.trim());
    localStorage.setItem(this.key, JSON.stringify(list));
    this.render();
    UI.showToast("Memory saved ❤️");
  },

  deleteMemory(index) {
    const list = this.getMemories();
    list.splice(index, 1);
    localStorage.setItem(this.key, JSON.stringify(list));
    this.render();
  },

  init() {
    const addBtn = document.getElementById('addMemoryBtn');
    const input = document.getElementById('memoryInput');

    if (addBtn && input) {
      addBtn.addEventListener('click', () => {
        this.addMemory(input.value);
        input.value = '';
      });
    }
    this.render();
  },

  render() {
    const listEl = document.getElementById('memoryList');
    if (!listEl) return;

    const memories = this.getMemories();
    if (memories.length === 0) {
      listEl.innerHTML = `<div class="glass-card" style="text-align:center; color:var(--text-sub);">No memories stored yet.</div>`;
      return;
    }

    listEl.innerHTML = memories.map((mem, i) => `
      <div class="glass-card" style="display:flex; justify-content:space-between; align-items:center;">
        <span>${mem}</span>
        <button onclick="MemoryModule.deleteMemory(${i})" class="icon-btn" style="width:32px; height:32px;">✕</button>
      </div>
    `).join('');
  }
};
      
