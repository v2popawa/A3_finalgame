// --------------------------------------------------
// Shared UI + flow helpers
// Keeps UI logic separate from game logic
// --------------------------------------------------

let transitionPending = false;
let failedLevel = null;
let failedMessage = "Wrong suspect!";

function resetLevelByScreen(screenName) {
  if (screenName === "level1") resetLevel1();
  else if (screenName === "level2") resetLevel2();
  else if (screenName === "level3") resetLevel3();
}

// Draw a standard button
function drawButton(button, label, fillColor = [80, 110, 170]) {
  push();
  rectMode(CENTER);
  stroke(255);
  strokeWeight(2);
  fill(fillColor[0], fillColor[1], fillColor[2]);
  rect(button.x, button.y, button.w, button.h, 12);

  noStroke();
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(button.textSize || 18);
  text(label, button.x, button.y);
  pop();
}

// Mouse hit test for a centered button
function isOverButton(button) {
  return (
    mouseX > button.x - button.w / 2 &&
    mouseX < button.x + button.w / 2 &&
    mouseY > button.y - button.h / 2 &&
    mouseY < button.y + button.h / 2
  );
}

// Shared centered briefing panel for each level
function drawCenteredPanel(title, body, buttonLabel, button) {
  const panelW = min(width * 0.75, 720);
  const panelH = min(height * 0.62, 420);
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
  fill(24, 30, 44, 245);
  rect(panelX, panelY, panelW, panelH, 18);
  pop();

  push();
  fill(255);
  textAlign(CENTER, CENTER);

  const titleSize = min(width, height) * 0.045;
  const bodySize = min(width, height) * 0.024;
  const lineGap = 28;

  textSize(titleSize);

  let lines = body.split("\n");
  let visibleLines = [];

  for (let i = 0; i < lines.length; i++) {
    visibleLines.push(lines[i]);
  }

  const bodyHeight = visibleLines.length * lineGap;
  const totalBlockHeight = 40 + 24 + bodyHeight;
  let startY = panelY - totalBlockHeight / 2;

  textSize(titleSize);
  text(title, panelX, startY + 20);

  textSize(bodySize);
  let bodyStartY = startY + 40 + 24;

  for (let i = 0; i < visibleLines.length; i++) {
    text(visibleLines[i], panelX, bodyStartY + i * lineGap);
  }

  pop();

  drawButton(button, buttonLabel);
}

function drawCaseHeader(title, subtitle = "") {
  push();
  fill(255);
  textAlign(CENTER, TOP);

  const titleY = height * 0.06;
  const subtitleY = height * 0.12;

  textSize(min(width, height) * 0.04);
  text(title, width / 2, titleY);

  if (subtitle) {
    textSize(min(width, height) * 0.022);
    text(
      subtitle,
      width / 2 - width * 0.3,
      subtitleY,
      width * 0.6,
      height * 0.08,
    );
  }

  pop();
}

// Shared suspect placement so layout stays centered on any canvas size
function getLineupPositions(count) {
  const y = height * 0.5;
  const left = width * 0.18;
  const right = width * 0.82;

  if (count === 1) return [{ x: width / 2, y }];

  const step = (right - left) / (count - 1);
  const positions = [];

  for (let i = 0; i < count; i++) {
    positions.push({ x: left + i * step, y });
  }

  return positions;
}

// Create evenly spaced centered buttons in one row
function getButtonRow(count, centerY, buttonW, buttonH, gap = 20) {
  const totalWidth = count * buttonW + (count - 1) * gap;
  const startX = width / 2 - totalWidth / 2 + buttonW / 2;

  let buttons = [];

  for (let i = 0; i < count; i++) {
    buttons.push({
      x: startX + i * (buttonW + gap),
      y: centerY,
      w: buttonW,
      h: buttonH,
    });
  }

  return buttons;
}

// Draw a simple suspect token
function drawSuspectToken(x, y, size, name, fillColor) {
  push();
  noStroke();
  fill(fillColor[0], fillColor[1], fillColor[2]);
  ellipse(x, y, size);

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(max(14, size * 0.16));
  text(name, x, y + size * 0.95);
  pop();
}

// Shared footer message area
function drawFooterMessage(message) {
  if (!message) return;

  push();
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(min(width, height) * 0.024);
  text(message, width / 2, height * 0.94);
  pop();
}

// Shared outcome handler
function finishCase(
  isCorrect,
  successMessage,
  failureMessage,
  nextScreen,
  setMessage,
) {
  if (transitionPending) return;

  transitionPending = true;
  const originScreen = currentScreen;

  setMessage(isCorrect ? successMessage : failureMessage);

  setTimeout(() => {
    if (isCorrect) {
      currentScreen = nextScreen;
    } else {
      failedLevel = originScreen;
      failedMessage = failureMessage;
      resetLevelByScreen(originScreen);
      currentScreen = "fail";
    }

    transitionPending = false;
  }, 900);
}

// Reset every level from one place
function resetAllLevels() {
  resetLevel1();
  resetLevel2();
  resetLevel3();
}

function getButtonRow(count, centerY, buttonW, buttonH, gap = 20) {
  const totalWidth = count * buttonW + (count - 1) * gap;
  const startX = width / 2 - totalWidth / 2 + buttonW / 2;

  let buttons = [];

  for (let i = 0; i < count; i++) {
    buttons.push({
      x: startX + i * (buttonW + gap),
      y: centerY,
      w: buttonW,
      h: buttonH,
    });
  }

  return buttons;
}
