function drawWin() {
  background(20, 100, 60);
  fill(255);
  textSize(40);
  textAlign(CENTER, CENTER);
  text("You Win!", width / 2, height / 2);
}

function winMousePressed() {
  currentScreen = "start";
}