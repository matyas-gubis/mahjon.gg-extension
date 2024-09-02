chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action && msg.action === 'solve') {
    solve();
  }
});
function solve() {
  const tileContainers = document.querySelectorAll('.tileContainer');

  const unblockedTileContainers = Array.from(tileContainers).filter((tileContainer) =>
    Array.from(tileContainer.children).some((element) => element.className.includes('unblocked'))
  );

  const pairs = [];

  unblockedTileContainers.forEach((tileContainer) => {
    const tileName = tileContainer.children[0].className.split(' ')[1];
    let foundPair = pairs.find((pair) => pair.tileName === tileName);
    if (!foundPair) {
      pairs.push({ tileName, elements: [] });
      foundPair = pairs.find((pair) => pair.tileName === tileName);
    }

    foundPair.elements.push({
      id: tileContainer.children[1].id,
      zIndex: tileContainer.children[0].style.zIndex,
    });
  });

  const filteredPairs = pairs.filter((pair) => pair.elements.length > 1);
  let max = 0;
  let bestPair;

  filteredPairs.forEach((pair) => {
    pair.elements.forEach((element) => {
      if (Number(element.zIndex) > max) {
        max = element.zIndex;
        bestPair = pair;
      }
    });
  });

  bestPair.elements.sort((a, b) => {
    if (Number(a.zIndex) > Number(b.zIndex)) {
      return -1;
    } else if (Number(a.zIndex) < Number(b.zIndex)) {
      return 1;
    } else {
      return 0;
    }
  });

  const bestItem = document.getElementById(bestPair.elements[0].id);
  const secondBestItem = document.getElementById(bestPair.elements[1].id);

  console.log(bestPair, bestItem, secondBestItem);

  bestItem.click();
  setTimeout(() => {
    secondBestItem.click();
    if (filteredPairs.length > 0) {
      solve();
    }
  }, 100);
}
