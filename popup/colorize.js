const colorizeBtn = document.getElementById("colorize");

colorizeBtn.addEventListener("click", (e) => {
  sendMessage({ action: "colorize" });
});
