function getFailButtons() {
  const row = getButtonRow(2, height * 0.72, 180, 54, 30);

  return {
    home: row[0],
    retry: row[1],
  };
}

function getFailedLevelLabel() {
  if (failedLevel === "level1") return "Level 1";
  if (failedLevel === "level2") return "Level 2";
  if (failedLevel === "level3") return "Level 3";
  return "This Case";
}

function drawFail() {
  background(35, 20, 20);

  const buttons = getFailButtons();
  const panelW = min(width * 0.72, 700);
  const panelH = min(height * 0.56, 380);
  const panelX = width / 2;
  const panelY = height / 2;

  push();
  fill(0, 170);
  noStroke();
  rect(0, 0, width, height);
  pop();

  push();
  rectMode(CENTER);
  stroke(255);
  strokeWeight(2);
  fill(52, 24, 24, 245);
  rect(panelX, panelY, panelW, panelH, 18);
  pop();

  // centered text block
  push();
  fill(255);
  textAlign(CENTER, CENTER);

  const titleSize = min(width, height) * 0.05;
  const subSize = min(width, height) * 0.026;
  const bodySize = min(width, height) * 0.022;
  const lineGap = 28;

  const titleText = "Case Failed";
  const subText = getFailedLevelLabel();
  const bodyLines = [
    failedMessage,
    "",
    "Choose Retry to replay this level",
    "or Home to return to the main menu.",
  ];

  const titleH = 40;
  const subH = 26;
  const bodyH = bodyLines.length * lineGap;
  const gap1 = 18;
  const gap2 = 22;

  const totalBlockH = titleH + gap1 + subH + gap2 + bodyH;
  let startY = panelY - totalBlockH / 2;

  textSize(titleSize);
  text(titleText, panelX, startY + titleH / 2);

  startY += titleH + gap1;

  textSize(subSize);
  text(subText, panelX, startY + subH / 2);

  startY += subH + gap2;

  textSize(bodySize);
  for (let i = 0; i < bodyLines.length; i++) {
    text(bodyLines[i], panelX, startY + i * lineGap);
  }

  pop();

  drawButton(buttons.home, "Home");
  drawButton(buttons.retry, "Retry");
}

function failMousePressed() {
  const buttons = getFailButtons();

  if (isOverButton(buttons.home)) {
    resetAllLevels();
    failedLevel = null;
    failedMessage = "Wrong suspect!";
    currentScreen = "start";
    return;
  }

  if (isOverButton(buttons.retry)) {
    if (failedLevel) {
      currentScreen = failedLevel;
    } else {
      currentScreen = "start";
    }
  }
}
