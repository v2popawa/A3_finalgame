// --------------------------------------------------
// Level 2 - Interview case
// Keeps Level 1 features:
// - inspect
// - magnify
// - convict
//
// Adds Level 2 features:
// - ask question
// - evidence board
//
// Uses one sprite sheet with 4 suspect portraits
// --------------------------------------------------

let suspects2 = [
  {
    name: "Taylor",
    isCulprit: false,
    spriteIndex: 0,
    expression: "Looks alert but composed.",
    magnifiedClue:
      "A clean bracelet clasp and no velvet fibers on the sleeves.",
    answer: "I was at the florist at 8:10. I still have the printed receipt.",
    boardNote: "Receipt timestamp matches 8:10 PM.",
  },
  {
    name: "Jordan",
    isCulprit: true,
    spriteIndex: 1,
    expression: "Keeps glancing away and tightening their jaw.",
    magnifiedClue:
      "A tiny strand of black velvet is caught near the cuff seam.",
    answer: "I stayed outside the gallery the whole time.",
    boardNote:
      "Parking camera shows Jordan re-entering the gallery at 8:12 PM.",
  },
  {
    name: "Avery",
    isCulprit: false,
    spriteIndex: 2,
    expression: "Looks irritated, not frightened.",
    magnifiedClue:
      "Only catering glitter from the gift table, nothing from the necklace case.",
    answer: "I was packing the gift table when security shouted.",
    boardNote: "A staff member confirms Avery was beside the exit display.",
  },
  {
    name: "Morgan",
    isCulprit: false,
    spriteIndex: 3,
    expression: "Tired eyes, steady voice.",
    magnifiedClue:
      "Phone screen smudge and lipstick trace, but no display-case residue.",
    answer: "I stepped outside for a phone call before the lights flickered.",
    boardNote: "Phone log shows a three-minute call beginning at 8:07 PM.",
  },
];

let level2Stage = "intro";
let level2Mode = "lineup";
let selected2 = null;

let message2 = "";
let askMessage2 = "";
let magnifyMessage2 = "";

let convictMode2 = false;
let showBoard2 = false;
let questioned2 = [false, false, false, false];

function getLevel2Buttons() {
  const lineupRow = getButtonRow(2, height * 0.86, 170, 50, 28);
  const inspectRow = getButtonRow(2, height * 0.86, 170, 50, 28);

  return {
    begin: { x: width / 2, y: height * 0.74, w: 220, h: 52 },

    board: lineupRow[0],
    convict: lineupRow[1],

    back: { x: width * 0.12, y: height * 0.12, w: 110, h: 44 },
    magnify: inspectRow[0],
    ask: inspectRow[1],
  };
}

function isMouseOverLevel2Suspect(x, y, w, h) {
  return (
    mouseX > x - w / 2 &&
    mouseX < x + w / 2 &&
    mouseY > y - h / 2 &&
    mouseY < y + h / 2
  );
}

function drawLevel2Portrait(x, y, suspect, drawW, drawH) {
  const hovered = isMouseOverLevel2Suspect(x, y, drawW, drawH);

  push();
  imageMode(CENTER);
  rectMode(CENTER);

  noFill();
  strokeWeight(4);

  if (convictMode2) stroke(255, 110, 110);
  else if (hovered) stroke(120, 210, 255);
  else stroke(255);

  rect(x, y, drawW + 12, drawH + 12, 14);

  if (level2Sprite && level2Sprite.width > 0) {
    const srcW = level2Sprite.width / 4;
    const srcH = level2Sprite.height;
    const sx = suspect.spriteIndex * srcW;
    const sy = 0;

    image(level2Sprite, x, y, drawW, drawH, sx, sy, srcW, srcH);
  } else {
    fill(160);
    noStroke();
    rect(x, y, drawW, drawH, 12);
  }

  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(max(14, drawW * 0.11));
  text(suspect.name, x, y + drawH * 0.62);
  pop();
}

function drawLevel2() {
  background(58, 72, 88);

  if (level2Stage === "intro") drawLevel2Intro();
  else if (level2Mode === "lineup") drawLevel2Lineup();
  else drawLevel2Inspect();

  if (showBoard2) drawLevel2Board();

  drawFooterMessage(message2);
}

function drawLevel2Intro() {
  const buttons = getLevel2Buttons();

  drawCenteredPanel(
    "Level 2: Jewelry Theft",
    "Level 2 keeps the tools from Level 1.\n\n" +
      "You can still inspect and magnify suspects.\n" +
      "Now you can also question them and compare what you learn on the evidence board.\n\n" +
      "Use all of those tools before you convict.",
    "Begin",
    buttons.begin,
  );
}

function drawLevel2Lineup() {
  const buttons = getLevel2Buttons();
  const positions = getLineupPositions(suspects2.length);
  const recordedCount = questioned2.filter(Boolean).length;

  drawCaseHeader(
    "Level 2: Jewelry Theft",
    convictMode2
      ? "Convict mode: click the thief."
      : "Inspect, magnify, question, then compare the board.",
  );

  push();
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(min(width, height) * 0.022);
  text(
    `Statements recorded: ${recordedCount}/${suspects2.length}`,
    width / 2,
    height * 0.22,
  );
  pop();

  for (let i = 0; i < suspects2.length; i++) {
    drawLevel2Portrait(positions[i].x, positions[i].y, suspects2[i], 125, 185);
  }

  drawButton(buttons.board, "Board");
  drawButton(buttons.convict, convictMode2 ? "Cancel" : "Convict");
}

function drawLevel2Inspect() {
  const buttons = getLevel2Buttons();
  const suspect = suspects2[selected2];

  drawCaseHeader(
    "Inspecting " + suspect.name,
    "Level 1 tools stay here: inspect and magnify. New tool: question.",
  );

  push();
  imageMode(CENTER);
  rectMode(CENTER);

  noFill();
  stroke(255);
  strokeWeight(4);
  rect(width / 2, height * 0.34, 250, 280, 16);

  if (level2Sprite && level2Sprite.width > 0) {
    const srcW = level2Sprite.width / 4;
    const srcH = level2Sprite.height;
    const sx = suspect.spriteIndex * srcW;
    const sy = 0;

    image(level2Sprite, width / 2, height * 0.34, 230, 260, sx, sy, srcW, srcH);
  } else {
    fill(210);
    noStroke();
    rect(width / 2, height * 0.34, 230, 260, 12);
  }

  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);

  textSize(min(width, height) * 0.022);
  text(
    "Visual read: " + suspect.expression,
    width / 2 - width * 0.3,
    height * 0.56,
    width * 0.6,
    60,
  );

  if (magnifyMessage2) {
    text(
      "Magnify: " + magnifyMessage2,
      width / 2 - width * 0.3,
      height * 0.66,
      width * 0.6,
      80,
    );
  }

  if (askMessage2) {
    text(
      "Statement: " + askMessage2,
      width / 2 - width * 0.3,
      height * 0.78,
      width * 0.6,
      90,
    );
  }

  pop();

  drawButton(buttons.back, "Back");
  drawButton(buttons.magnify, "Magnify");
  drawButton(buttons.ask, questioned2[selected2] ? "Asked" : "Ask");
}

function drawLevel2Board() {
  push();
  fill(0, 180);
  noStroke();
  rect(0, 0, width, height);

  rectMode(CENTER);
  fill(245);
  stroke(255);
  strokeWeight(2);

  const panelW = min(width * 0.78, 760);
  const panelH = min(height * 0.72, 480);
  rect(width / 2, height / 2, panelW, panelH, 16);

  fill(0);
  noStroke();
  textAlign(CENTER, CENTER);

  textSize(min(width, height) * 0.035);
  text("Evidence Board", width / 2, height / 2 - panelH * 0.38);

  textSize(min(width, height) * 0.021);
  textLeading(26);

  const startY = height / 2 - panelH * 0.22;

  for (let i = 0; i < suspects2.length; i++) {
    const line = questioned2[i]
      ? `${suspects2[i].name}: ${suspects2[i].boardNote}`
      : `${suspects2[i].name}: no statement recorded yet.`;

    text(line, width / 2, startY + i * 58);
  }

  textSize(min(width, height) * 0.018);
  text("Click anywhere to close.", width / 2, height / 2 + panelH * 0.36);
  pop();
}

function level2MousePressed() {
  if (transitionPending) return;

  if (showBoard2) {
    showBoard2 = false;
    return;
  }

  const buttons = getLevel2Buttons();

  if (level2Stage === "intro") {
    if (isOverButton(buttons.begin)) {
      level2Stage = "play";
    }
    return;
  }

  if (level2Mode === "lineup") {
    if (isOverButton(buttons.board)) {
      showBoard2 = true;
      return;
    }

    if (isOverButton(buttons.convict)) {
      convictMode2 = !convictMode2;
      message2 = convictMode2 ? "Select the thief." : "";
      return;
    }

    const positions = getLineupPositions(suspects2.length);

    for (let i = 0; i < suspects2.length; i++) {
      if (isMouseOverLevel2Suspect(positions[i].x, positions[i].y, 125, 185)) {
        if (convictMode2) {
          finishCase(
            suspects2[i].isCulprit,
            "Correct! Jordan's story and the velvet fiber give it away.",
            "Wrong suspect! The necklace is never recovered.",
            "level3",
            (msg) => {
              message2 = msg;
            },
          );
        } else {
          selected2 = i;
          level2Mode = "inspect";
          askMessage2 = questioned2[i] ? suspects2[i].answer : "";
          magnifyMessage2 = "";
          message2 = "";
        }
        return;
      }
    }
  } else {
    if (isOverButton(buttons.back)) {
      level2Mode = "lineup";
      return;
    }

    if (isOverButton(buttons.magnify)) {
      magnifyMessage2 = suspects2[selected2].magnifiedClue;
      return;
    }

    if (isOverButton(buttons.ask)) {
      questioned2[selected2] = true;
      askMessage2 = suspects2[selected2].answer;
      message2 = "Statement recorded to the board.";
    }
  }
}

function resetLevel2() {
  level2Stage = "intro";
  level2Mode = "lineup";
  selected2 = null;
  message2 = "";
  askMessage2 = "";
  magnifyMessage2 = "";
  convictMode2 = false;
  showBoard2 = false;
  questioned2 = [false, false, false, false];
}
