// --------------------------------------------------
// Main app loop
// --------------------------------------------------

let currentScreen = "start";
let level1Sprite = null;
let level2Sprite = null;
let level3Sprite = null;
let level1bg;
let suspectImgs1 = [];
let suspectFaces1 = [];

function preload() {
  level1BG = loadImage("assets/images/backgroundimagefixed.png");
  suspectImgs1[0] = loadImage("assets/images/mia.png");
  suspectImgs1[1] = loadImage("assets/images/derek.png");
  suspectImgs1[2] = loadImage("assets/images/luis.png");

  suspectFaces1[0] = loadImage("assets/images/miacalm.png");
  suspectFaces1[1] = loadImage("assets/images/dereknervous.png");
  suspectFaces1[2] = loadImage("assets/images/luisangry.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont("Arial");
  textAlign(CENTER, CENTER);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(30);

  if (currentScreen === "start") drawStart();
  else if (currentScreen === "instructions") drawInstructions();
  else if (currentScreen === "level1") drawLevel1();
  else if (currentScreen === "level2") drawLevel2();
  else if (currentScreen === "level3") drawLevel3();
  else if (currentScreen === "win") drawWin();
  else if (currentScreen === "fail") drawFail();
}

function mousePressed() {
  if (transitionPending) return;

  if (currentScreen === "start") startMousePressed();
  else if (currentScreen === "instructions") instructionsMousePressed();
  else if (currentScreen === "level1") level1MousePressed();
  else if (currentScreen === "level2") level2MousePressed();
  else if (currentScreen === "level3") level3MousePressed();
  else if (currentScreen === "win") winMousePressed();
  else if (currentScreen === "fail") failMousePressed();
}
