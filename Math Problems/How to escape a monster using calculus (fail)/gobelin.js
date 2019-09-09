function gobelin() {
  this.x = 703;
  this.y = 400;
  this.r = 30;
  this.speed = createVector(0, 0);
  this.ang = 0;

  this.show = function() {
    fill(200, 240, 30);
    ellipse(this.x, this.y, this.r, this.r);
  }

  this.update = function(xa, ya) {
    angleMode(DEGREES);
    if (dist(xa, ya, 400, 400) != 0) {
      var angle = acos(dist(xa, 400, 400, 400) / dist(xa, ya, 400, 400));
    }

    if (xa > 400 && ya < 400) {
        angle = 360 - angle;
    } else if (xa < 400 && ya < 400) {
        angle = 180 + angle;
    } else if (xa > 400 && ya > 400) {
        angle = angle;
    } else if (xa < 400 && ya > 400) {
        angle = 180 - angle;
    }



    if((PI * 606 * (this.ang - angle)) / 360 >= 20){
          if(this.ang - angle < 0){
            this.ang += 2;
          } else {
            this.ang -= 2;
          }
    } else {
      this.ang = angle;
    }
    //  {
    //
    //   if (3.78189963783 + this.ang > 90) {
    //     angle = 3.78189963783 + this.ang - 90;
    //
    //   } else {
    //     angle = 3.78189963783 + this.ang;
    //     console.log(angle)
    //   }
    //   this.ang = angle;
    //
    // } else {
    //
    //   this.ang = angle;
    //
    // }

      this.x = cos(this.ang) * 303 + 400;
      this.y = sin(this.ang) * 303 + 400;



    // if (xa > 400 && ya < 400) {
    //   this.x = cos(angle) * 303 + 400;
    //   this.y = sin(angle) * -303 + 400;
    //
    // } else if (xa < 400 && ya < 400) {
    //   this.x = cos(angle) * -303 + 400;
    //   this.y = sin(angle) * -303 + 400;
    //
    // } else if (xa > 400 && ya > 400) {
    //   this.x = cos(angle) * 303 + 400;
    //   this.y = sin(angle) * 303 + 400;
    //
    // } else if (xa < 400 && ya > 400) {
    //   this.x = cos(angle) * -303 + 400;
    //   this.y = sin(angle) * 303 + 400;
    //
    // }


  }

}
