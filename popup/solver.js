const solveBtn = document.getElementById('solve');

solveBtn.addEventListener('click', () => sendMessage({ action: 'solve' }));
