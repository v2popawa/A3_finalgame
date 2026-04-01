// --------------------------------------------------
// Win screen
// --------------------------------------------------

function drawWin() {
  background(12, 22, 18);

  push();
  fill(120, 255, 140);
  textAlign(CENTER, CENTER);

  textSize(min(width, height) * 0.07);
  text("You Solved All Cases!", width / 2, height * 0.46);

  fill(255);
  textSize(min(width, height) * 0.03);
  text("Click anywhere to restart.", width / 2, height * 0.58);
  pop();
}

function winMousePressed() {
  resetAllLevels();
  currentScreen = "start";
}
