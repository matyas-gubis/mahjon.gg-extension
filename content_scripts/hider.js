chrome.runtime.onMessage.addListener((msg) => {
  if (msg && msg.action === 'hideBlocked') {
    const hiderStyle = document.getElementById('hider-style');
    if (hiderStyle) {
      hiderStyle.remove();
      window.removeEventListener('click', hideBlocked, true);
    } else {
      const style = document.createElement('style');
      style.innerHTML = '.hidden {display: none}';
      style.id = 'hider-style';
      document.head.appendChild(style);

      window.addEventListener('click', hideBlocked, true);
      hideBlocked();
    }
  }
});

function hideBlocked() {
  setTimeout(() => {
    const tiles = document.querySelectorAll('.tileContainer');
    tiles.forEach((tile) => {
      if (!Array.from(tile.children).some((child) => child.className.includes('unblocked'))) {
        tile.classList.add('hidden');
      } else {
        tile.classList.remove('hidden');
      }
    });
  }, 500);
}
