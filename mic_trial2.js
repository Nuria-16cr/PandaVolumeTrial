let mic;
let pandaImg;

function preload() {
  pandaImg = loadImage("data/panda-big.svg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  mic = new p5.AudioIn();
  mic.start();
  userStartAudio(); 
  textAlign(CENTER, CENTER);
  textSize(48);
  noStroke();
}

function draw() {
  let vol = mic.getLevel(); 
  let size = map(vol, 0, 0.2, 10, 400); 

  // changing background
  if (vol < 0.02) {
    // Quiet
    background(173, 216, 230);
    fill(50);
    text("😴 zzz...", width / 2, height / 2);
  } else if (vol >= 0.02 && vol < 0.1) {
    // Medium
    background(255, 165, 0); //  orange
    fill(0);
    text("Uhhh... that's a bit too loud, speak quieter please.", width / 2, height / 2);
  } else {
    // Loud
    if (frameCount % 20 < 10) {
      background(255, 0, 0); // flashing red
    } else {
      background(100);
    }
    fill(255);
    text("⚠️ WARNING: NOISE LEVEL TOO HIGH!", width / 2, height / 2);
  }

  fill(100, 0, 255, 150);
  ellipse(mouseX, mouseY, size);

  // adding the panda
  if (pandaImg) {
    let imgHeight = 200;
    let aspectRatio = pandaImg.width / pandaImg.height;
    let imgWidth = imgHeight * aspectRatio;

    image(pandaImg, width / 2 - imgWidth / 2, height - imgHeight - 20, imgWidth, imgHeight);
  }
}

function touchStarted() {
  getAudioContext().resume(); 
}
