const highlightBtn = document.getElementById("highlight");
const highlightColorPicker = document.getElementById("highlight_color_picker");

let highlightColor = "black";

highlightColorPicker.addEventListener("change", (e) => {
  highlightColor = e.target.value;
  sendMessage({
    action: "highlightColorChange",
    color: highlightColor,
  });
});

highlightBtn.addEventListener("click", () => {
  sendMessage({ action: "toggleHighlight" });
});
