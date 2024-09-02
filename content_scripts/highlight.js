let highlightColor = "black";

chrome.runtime.onMessage.addListener((message) => {
  if (!message.action) return;
  if (message.action === "highlightColorChange") {
    highlightColor = message.color;
    renderHighlightColor();
  }
  if (message.action === "toggleHighlight") {
    toggleHighlight();
  }
});

function toggleHighlight() {
  if (document.getElementById("highlight-style")) {
    removeHighlight();
  } else {
    addHighlight();
  }
}

function addHighlight() {
  if (document.getElementById("highlight-style")) return;

  const style = document.createElement("style");
  style.innerHTML = `.unblocked { border: 4px solid ${highlightColor}; }`;
  style.id = "highlight-style";
  document.head.appendChild(style);
}

function removeHighlight() {
  document.getElementById("highlight-style")?.remove();
}

function renderHighlightColor() {
  const style = document.getElementById("highlight-style");
  if (style) {
    removeHighlight();
    addHighlight();
  }
}
