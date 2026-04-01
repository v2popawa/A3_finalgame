// --------------------------------------------------
// Level 1 - Visual clue case
// Uses one image sheet with 3 suspect portraits
// Left = calm, middle = nervous, right = angry
// --------------------------------------------------

let suspects1 = [
  {
    name: "Mia",
    isCulprit: false,
    emotion: "calm",
    spriteIndex: 0,
    expression: "Steady posture and relaxed face.",
    magnifiedClue:
      "No dye marks, no torn threads, and no cash fibers on the sleeves.",
  },
  {
    name: "Derek",
    isCulprit: true,
    emotion: "nervous",
    spriteIndex: 1,
    expression: "Tense face and uneasy body language.",
    magnifiedClue:
      "A faint red bank dye stain is caught in the cuff stitching.",
  },
  {
    name: "Luis",
    isCulprit: false,
    emotion: "angry",
    spriteIndex: 2,
    expression: "Looks irritated, but not fearful.",
    magnifiedClue:
      "Only outdoor dust on the shoes. Nothing connects him to the bank floor.",
  },
];

let level1Stage = "intro";
let level1Mode = "lineup";
let selected1 = null;
let message1 = "";
let magnifyMessage1 = "";
let convictMode1 = false;

function getLevel1Buttons() {
  return {
    begin: { x: width / 2, y: height * 0.74, w: 220, h: 52 },
    convict: { x: width / 2, y: height * 0.9, w: 220, h: 50 },
    back: { x: width * 0.14, y: height * 0.12, w: 120, h: 46 },
    magnify: { x: width / 2, y: height * 0.82, w: 220, h: 50 },
  };
}

function formatEmotionLabel(emotion) {
  return emotion.charAt(0).toUpperCase() + emotion.slice(1);
}

// Check if mouse is over a suspect portrait
function isMouseOverLevel1Suspect(x, y, w, h) {
  return (
    mouseX > x - w / 2 &&
    mouseX < x + w / 2 &&
    mouseY > y - h / 2 &&
    mouseY < y + h / 2
  );
}

// Draw one suspect portrait by cropping 1/3 of the image sheet
function drawLevel1Portrait(x, y, index, drawW, drawH) {
  const hovered =
    mouseX > x - drawW / 2 &&
    mouseX < x + drawW / 2 &&
    mouseY > y - drawH / 2 &&
    mouseY < y + drawH / 2;

  let scale = hovered ? 1.05 : 1;

  push();
  imageMode(CENTER);
  rectMode(CENTER);

  // draw suspect image
  if (suspectImgs1[index]) {
    image(suspectImgs1[index], x, y, drawW * scale, drawH * scale);
  } else {
    fill(200);
    noStroke();
    rect(x, y, drawW, drawH, 12);
  }

  // hover outline
  if (hovered) {
    noFill();

    if (convictMode1) {
      stroke(255, 110, 110); // red
    } else {
      stroke(120, 210, 255); // blue
    }

    strokeWeight(4);

    // shorter vertically: 70% of the image height
    let outlineH = drawH * scale * 0.96;
    let outlineW = drawW * scale + 8; // keep width similar

    rect(x, y, outlineW, outlineH, 12);
  }

  pop();
}

function drawLevel1() {
  if (level1BG) {
    image(level1BG, 0, 0, width, height);
  } else {
    background(70, 78, 96);
  }

  if (level1Stage === "intro") {
    drawLevel1Intro();
  } else if (level1Mode === "lineup") {
    drawLevel1Lineup();
  } else {
    drawLevel1Inspect();
  }

  drawFooterMessage(message1);
}

function drawLevel1Intro() {
  const buttons = getLevel1Buttons();

  drawCenteredPanel(
    "Level 1: Bank Robbery",
    "This case is all about observation.\n\n" +
      "The three suspects show different emotions.\n" +
      "Inspect them closely.\n" +
      "Use Magnify to catch tiny visual details.\n\n" +
      "Convict the robber when the clue gives them away.",
    "Begin",
    buttons.begin,
  );
}

function drawLevel1Lineup() {
  const buttons = getLevel1Buttons();

  // ✅ SAME positioning system as Level 2 & 3
  const positions = getLineupPositions(suspects1.length);

  drawCaseHeader(
    "Level 1: Bank Robbery",
    convictMode1
      ? "Convict mode: click the suspect."
      : "Click a suspect to inspect them.",
  );

  for (let i = 0; i < suspects1.length; i++) {
    let imgW = 180;
    let imgH = 420;

    // draw image (your existing UI stays)
    drawLevel1Portrait(positions[i].x, positions[i].y, i, imgW, imgH);

    // ✅ SAME hitbox system as other levels
    suspects1[i].hitbox = {
      x: positions[i].x,
      y: positions[i].y,
      w: imgW,
      h: imgH,
    };

    // ✅ SAME name positioning style
    push();
    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(18);
    text(suspects1[i].name, positions[i].x, positions[i].y - 230);
    pop();
  }

  // buttons
  drawButton(buttons.convict, convictMode1 ? "Cancel" : "Convict");
}

function drawLevel1Inspect() {
  const buttons = getLevel1Buttons();
  const suspect = suspects1[selected1];

  drawCaseHeader(
    "Inspecting " + suspect.name,
    "Use the face and magnified clue together.",
  );

  push();
  imageMode(CENTER);

  // ✅ FACE IMAGE ONLY (no rectangle)
  if (suspectFaces1[selected1]) {
    image(suspectFaces1[selected1], width / 2, height * 0.4, 300, 320);
  } else {
    fill(200);
    noStroke();
    rect(width / 2, height * 0.35, 300, 320, 12);
  }

  // text
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);

  textSize(min(width, height) * 0.024);
  text(
    "Observed emotion: " + formatEmotionLabel(suspect.emotion),
    width / 2,
    height * 0.68,
  );

  textSize(min(width, height) * 0.022);
  text(
    suspect.expression,
    width / 2 - width * 0.25,
    height * 0.67,
    width * 0.5,
    50,
  );

  if (magnifyMessage1) {
    text(
      "Magnify: " + magnifyMessage1,
      width / 2 - width * 0.3,
      height * 0.7,
      width * 0.6,
      90,
    );
  }

  pop();

  drawButton(buttons.back, "Back");
  drawButton(buttons.magnify, "Magnify");
}

function level1MousePressed() {
  if (transitionPending) return;

  const buttons = getLevel1Buttons();

  // -----------------------------
  // INTRO
  // -----------------------------
  if (level1Stage === "intro") {
    if (isOverButton(buttons.begin)) {
      level1Stage = "play";
    }
    return;
  }

  // -----------------------------
  // LINEUP
  // -----------------------------
  if (level1Mode === "lineup") {
    // toggle convict mode
    if (isOverButton(buttons.convict)) {
      convictMode1 = !convictMode1;
      message1 = convictMode1 ? "Select the robber." : "";
      return;
    }

    // click IMAGE hitboxes
    for (let i = 0; i < suspects1.length; i++) {
      let hb = suspects1[i].hitbox;

      let hovered =
        mouseX > hb.x - hb.w / 2 &&
        mouseX < hb.x + hb.w / 2 &&
        mouseY > hb.y - hb.h / 2 &&
        mouseY < hb.y + hb.h / 2;

      if (hovered) {
        if (convictMode1) {
          finishCase(
            suspects1[i].isCulprit,
            "Correct! The nervous suspect had the bank dye clue.",
            "Wrong suspect! The real robber slips away.",
            "level2",
            (msg) => {
              message1 = msg;
            },
          );
        } else {
          selected1 = i;
          level1Mode = "inspect";
          magnifyMessage1 = "";
          message1 = "";
        }

        return;
      }
    }
  }

  // -----------------------------
  // INSPECT
  // -----------------------------
  else {
    if (isOverButton(buttons.back)) {
      level1Mode = "lineup";
      magnifyMessage1 = "";
      return;
    }

    if (isOverButton(buttons.magnify)) {
      magnifyMessage1 = suspects1[selected1].magnifiedClue;
    }
  }
}

function resetLevel1() {
  level1Stage = "intro";
  level1Mode = "lineup";
  selected1 = null;
  message1 = "";
  magnifyMessage1 = "";
  convictMode1 = false;
}
