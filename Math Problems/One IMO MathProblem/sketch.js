// By Eliott Gandiolle
var points = [];
var droite;

function setup(){
  createCanvas(400,600);
  for(var i = 0; i < random(4,15);i++){
    points.push(createVector(random(15,385),random(15,585)));
  }

  droite = new Droite(points[0]);
}

function draw(){
  ellipseMode(CENTER);
  background(0);
  stroke(4);
  fill(255,255,255);
  for(var i = 0; i < points.length; i++){
    ellipse(points[i].x,points[i].y,15,15);
  }

  droite.checkPoint(points);
  droite.update();
  droite.show();
}
