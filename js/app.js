import { initSidebar } from './sidebar.js';
import { initOrb } from './orb.js';
import { initVoiceControls } from './voice.js';
import { initNavigation } from './nav.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Sidebar Drawer
  initSidebar();

  // 2. Initialize Orbital AI Engine
  const orbController = initOrb();

  // 3. Initialize Voice Controller
  initVoiceControls(orbController);

  // 4. Initialize Navigation & Animation Triggers
  initNavigation();
});

