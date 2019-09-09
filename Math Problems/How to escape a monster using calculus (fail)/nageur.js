function nageur(){
    this.x = width/2;
    this.y = height/2;
    this.r = 30;

    this.show = function(){
        fill(30,240,30);
        ellipse(this.x,this.y,this.r,this.r);
    }

    this.update = function(xe,ye){
        var xx = this.x - xe;
        var yy = this.y - ye;
        var vitesse = 4;
        if(dist(xe,this.x,ye,this.y) >= vitesse){
            this.x -= xx * (vitesse/(abs(xx)+abs(yy)));
            this.y -= yy * (vitesse/(abs(xx)+abs(yy)));
        } else {
          this.x -= xx;
          this.y -= yy;
    }
  }
}
