// Made by Eliott Gandiolle
// Inspired by http://datagenetics.com/blog/october12013/index.html
var nageur;
var bon = false;
var gob;

function setup() {
  createCanvas(800, 800);
  nageur = new nageur();
  gob = new gobelin();

}

function mousePressed() {
  bon = true;

}

function draw() {
  background(55);

  fill(210, 30, 30);
  ellipse(400, 400, 606, 606);
  stroke(240,25,25);
  strokeWeight(5);
  fill(20, 20, 255);
  ellipse(400, 400, 604, 604);
  strokeWeight(1);
  noStroke();
  nageur.show();
  gob.show();
  gob.update(nageur.x,nageur.y);
  if (bon) {
    nageur.update(mouseX, mouseY);
  }
}
