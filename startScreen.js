// --------------------------------------------------
// Start screen
// --------------------------------------------------

function getStartButtons() {
  return {
    start: { x: width / 2, y: height * 0.58, w: 240, h: 60 },
    instructions: { x: width / 2, y: height * 0.7, w: 240, h: 60 },
  };
}

function drawStart() {
  background(42, 49, 65);

  const buttons = getStartButtons();

  push();
  fill(255);
  textAlign(CENTER, CENTER);

  textSize(min(width, height) * 0.07);
  text("Detective Lineup", width / 2, height * 0.28);

  textSize(min(width, height) * 0.026);
  text(
    "Inspect clues, compare stories, and solve all three cases.",
    width / 2,
    height * 0.4,
  );
  pop();

  drawButton(buttons.start, "Start Game");
  drawButton(buttons.instructions, "Instructions");
}

function startMousePressed() {
  const buttons = getStartButtons();

  if (isOverButton(buttons.start)) {
    resetAllLevels();
    currentScreen = "level1";
    return;
  }

  if (isOverButton(buttons.instructions)) {
    currentScreen = "instructions";
  }
}
