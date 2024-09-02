function getCurrentTab(callback) {
  let queryOptions = { active: true, lastFocusedWindow: true };
  chrome.tabs.query(queryOptions, ([tab]) => {
    if (chrome.runtime.lastError) console.error(chrome.runtime.lastError);
    callback(tab);
  });
}

function sendMessage(message) {
  getCurrentTab((tab) => chrome.tabs.sendMessage(tab.id, message));
}
