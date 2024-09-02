const hiderBtn = document.getElementById("hider");

hiderBtn.addEventListener("click", (e) => {
  sendMessage({ action: "hideBlocked" });
});
