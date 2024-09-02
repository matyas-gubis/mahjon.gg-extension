const rgbColors = [
  "rgb(255 0 0)",
  "rgb(0 255 0)",
  "rgb(0 0 255)",
  "rgb(0 255 255)",
  "rgb(255 0 255)",
  "rgb(255 255 0)",
  "rgb(255 165 0)",
  "rgb(128 0 128)",
  "rgb(0 255 0)",
  "rgb(255 192 203)",
  "rgb(0 128 128)",
  "rgb(128 128 0)",
  "rgb(128 0 0)",
  "rgb(0 0 128)",
  "rgb(165 42 42)",
  "rgb(173 216 230)",
  "rgb(0 100 0)",
  "rgb(245 245 220)",
  "rgb(255 215 0)",
  "rgb(192 192 192)",
  "rgb(230 230 250)",
  "rgb(250 128 114)",
  "rgb(255 127 80)",
  "rgb(64 224 208)",
  "rgb(238 130 238)",
  "rgb(75 0 130)",
  "rgb(240 230 140)",
  "rgb(220 20 60)",
  "rgb(221 160 221)",
  "rgb(255 218 185)",
  "rgb(189 252 201)",
  "rgb(210 105 30)",
  "rgb(255 99 71)",
  "rgb(204 204 255)",
  "rgb(255 140 0)",
  "rgb(135 206 235)",
  "rgb(144 238 144)",
  "rgb(240 128 128)",
  "rgb(60 179 113)",
  "rgb(238 232 170)",
  "gb(178 34 34)",
  "rgb(70 130 180)",
  "rgb(30 144 255)",
  "rgb(34 139 34)",
  "rgb(244 164 96)",
  "rgb(255 105 180)",
  "rgb(147 112 219)",
  "rgb(46 139 87)",
  "rgb(106 90 205)",
  "rgb(139 0 139)",
];

chrome.runtime.onMessage.addListener((message) => {
  if (!message.action) return;
  if (message.action === "colorize") {
    const colorStyle = document.getElementById("colorful-tiles");
    if (colorStyle) {
      colorStyle.remove();
    } else {
      const listOfTileNames = collectTileNames();
      const generatedStyle = assignColorsToTileNames(listOfTileNames);
      createStyleElementIntoHTMLHead(generatedStyle);
    }
  }
});

function createStyleElementIntoHTMLHead(generatedStyle) {
  const style = document.createElement("style");
  style.innerHTML = generatedStyle;
  style.id = "colorful-tiles";
  document.head.appendChild(style);
}

function collectTileNames() {
  const list = [];
  document.querySelectorAll(".tile").forEach((tile) => {
    const className = tile.className.split(" ")[1];
    if (!list.includes(className)) {
      list.push(className);
    }
  });
  return list;
}

function assignColorsToTileNames(listOfTileNames) {
  let generatedStyle = "";
  listOfTileNames.forEach((cn, i) => {
    generatedStyle += `\n.${cn} {background-image: none; background-color: ${rgbColors[i]}}`;
    console.log(rgbColors[i]);
  });
  return generatedStyle;
}
