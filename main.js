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
let suspectImgs2 = [];
let suspectFaces2 = [];
let suspectImgs3 = [];
let suspectFaces3 = [];

let level2BG;

function preload() {
  level1BG = loadImage("assets/images/backgroundimagefixed.png");
  suspectImgs1[0] = loadImage("assets/images/mia.png");
  suspectImgs1[1] = loadImage("assets/images/derek.png");
  suspectImgs1[2] = loadImage("assets/images/luis.png");

  suspectFaces1[0] = loadImage("assets/images/miacalm.png");
  suspectFaces1[1] = loadImage("assets/images/dereknervous.png");
  suspectFaces1[2] = loadImage("assets/images/luisangry.png");

  // ------------------
  // LEVEL 2 IMAGES
  // ------------------
  level2BG = loadImage("assets/images/backgroundimagefixed.png");

  suspectImgs2[0] = loadImage("assets/images/taylor.png");
  suspectImgs2[1] = loadImage("assets/images/jordon.png");
  suspectImgs2[2] = loadImage("assets/images/avery.png");
  suspectImgs2[3] = loadImage("assets/images/morgan.png");

  suspectFaces2[0] = loadImage("assets/images/taylorcalm.png");
  suspectFaces2[1] = loadImage("assets/images/jordonnervous.png");
  suspectFaces2[2] = loadImage("assets/images/averyupset.png");
  suspectFaces2[3] = loadImage("assets/images/morgantired.png");

  level3BG = loadImage("assets/images/backgroundimagefixed.png");

  // ------------------
  // LEVEL 3 IMAGES
  // ------------------

  // FULL BODY (lineup)
  suspectImgs3[0] = loadImage("assets/images/noah.png");
  suspectImgs3[1] = loadImage("assets/images/riley.png");
  suspectImgs3[2] = loadImage("assets/images/casey.png");
  suspectImgs3[3] = loadImage("assets/images/jamie.png");
  suspectImgs3[4] = loadImage("assets/images/emma.png");

  // FACE (inspect)
  suspectFaces3[0] = loadImage("assets/images/noahemotion.png");
  suspectFaces3[1] = loadImage("assets/images/rileyemotion.png");
  suspectFaces3[2] = loadImage("assets/images/caseyemotion.png");
  suspectFaces3[3] = loadImage("assets/images/jamieemotion.png");
  suspectFaces3[4] = loadImage("assets/images/emmaemotion.png");
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
