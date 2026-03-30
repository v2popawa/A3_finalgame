// --------------------------------------------------
// Main instructions screen
// --------------------------------------------------

function getInstructionsBackButton() {
  return { x: width / 2, y: height * 0.78, w: 220, h: 52 };
}

function drawInstructions() {
  background(25, 30, 40);

  const backButton = getInstructionsBackButton();

  drawCenteredPanel(
    "How to Play",
    "Each level begins with its own centered briefing.\n\n" +
      "Level 1: use visual clues and Magnify.\n" +
      "Level 2: question suspects and compare statements.\n" +
      "Level 3: combine notebook notes with one forensic clue.\n\n" +
      "Use Convict only when you are sure.",
    "Back",
    backButton,
  );
}

function instructionsMousePressed() {
  const backButton = getInstructionsBackButton();

  if (isOverButton(backButton)) {
    currentScreen = "start";
  }
}
