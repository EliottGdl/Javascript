
class Sun {

  constructor(){
      this.x = 0;
      this.y = 0;
      this.r = 100;
  }

  show(){

    fill(255,255,0);
    ellipse(this.x,this.y,this.r,this.r);

  }

  update(time){
      angleMode(DEGREES);
      // console.log(time);
      this.x = cos(time) * 410 + 450;
      this.y = sin(time) * 420 + 900;
      // console.log(this.y);
  }

}
