export function initOrb() {
  const orb = document.getElementById('aiOrb');
  return {
    setListening: (isListening) => {
      if (isListening) orb.classList.add('listening');
      else orb.classList.remove('listening');
    }
  };
}

