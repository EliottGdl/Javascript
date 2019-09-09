function Droite(pt) {
  this.angle = 0;
  this.pos = pt;
  this.cd;
  this.ordo;
  this.inter1;
  this.inter2;
  this.red = false;

  this.update = function() {

    if(this.angle < 360) {
      this.angle+= 0.01;
    } else {
      this.angle = 0;
    }
    this.intersect();

  }

  this.checkPoint = function(points) {

    for(var i = 0; i < points.length; i++){
      var p = points[i];
      console.log((p.x * this.cd) + this.ordo - p.y);
      if((p.x * this.cd) + this.ordo - p.y < 0.4 && (p.x * this.cd) + this.ordo - p.y > -0.4 && this.pos != p){
        this.pos = p;
        this.red = true;
        return;
      }
    }
    this.red = false;

  }

  this.intersect = function() {

    angleMode(DEGREES);

    var tempo = tan(this.angle);
    var oppose = tempo * 10;

    this.cd = 10 / oppose;

    this.ordo = - ((this.cd * this.pos.x) - this.pos.y);

    this.inter1 = createVector(400,this.cd * 400 + this.ordo);
    this.inter2 = createVector(0,this.cd * 0 + this.ordo);

  }

  this.show = function() {
    push();

    stroke(255);
    if(this.red){
      stroke(255,0,0);
    }
    line(this.inter1.x,this.inter1.y,this.inter2.x,this.inter2.y);

    pop();
    //console.log(400,this.cd * 400 + this.ordo,0,this.cd * 0 + this.ordo)
  }
}
