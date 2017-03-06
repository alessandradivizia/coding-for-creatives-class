let x, y;

const smallellipse1 = (50, 50);
const smallellipse2 = (30, 30);
const smallellipse3 = (85, 85);

let eyeSize = 300;
let counter = 0;
let mouth;
let mouseClicked = false;
let mouthOpeningCompleted = false;
let canvasNode;
let mouthColor;

document.addEventListener('click', onMouseClick);

function setup() {
  createCanvas(windowWidth, windowHeight);
  canvasNode = document.getElementsByTagName('canvas')[1];
  mouthColor = color(0, 0, 0); // will be changed on click @TODO - replace with real values
  mouth = new Mouth();
}

function draw() {
  if (mouthOpeningCompleted) {
    noLoop();
    return
  }
  background(255);
  ellipseMode(CENTER);
  rectMode(CENTER);
  r = random(-1, 1);
  head();

  if (mouseClicked) {
    mouth.open();
  }

  mouth.display();

  counter++;
}

function blink() {
  eyeSize = 20;
  if (eyeSize == 0) {
    eyeSize = 300;
  }
}

function head() {
  fill(0, 0, 225, 100);
  ellipse(mouseX, mouseY, 115, 60, 60);

  // Eyes
  fill(0);
  ellipse(950, 330, 300, eyeSize);
  ellipse(350, 330, 300, eyeSize);

  var remainder = counter % 150;
  eyeSize = 300;
  if (remainder == 1) {
    blink();
  }

  // flickering bubbles in eyes
  fill(255);
  // small
  ellipse(1060 + r, 370, smallellipse1);
  ellipse(460 + r, 370, smallellipse1);

  ellipse(1020 + r, 430, smallellipse2);
  ellipse(420 + r, 430, smallellipse2);
  // big
  ellipse(880 + r, 280 + r, smallellipse3);
  ellipse(280 + r, 280 + r, smallellipse3);

  // chickbones
  noStroke();
  fill(250, 157, 190);
  ellipse(1100, 600, 250, 120);
  ellipse(200, 600, 250, 120);

  // white highlights
  fill(255);
  ellipse(1050, 580, 30, 20);
  ellipse(155, 580, 30, 20);
}

// mouth
function Mouth() {
  this.size = 120;
  this.display = function () {
    fill(0);
    ellipse(650, 600, 250, 120);
    fill(255);
    ellipse(650, 580, 250, this.size);
  };
  this.open = function () {
    if (this.size <= 0) {
      mouthOpeningCompleted = true
      return
    }
    this.size = this.size - 2;
  }
}

function onMouseClick() {
  mouseClicked = true;
  canvasNode.style.transition = '1s';
  canvasNode.style.transform = 'scale(.0001)';
  setTimeout(function() {
    showRenderer();
    animate();
    showVideo();
  }, 1000)
}
