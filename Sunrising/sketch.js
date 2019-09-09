var sun;
var mini = 0;
var bool = false;

function setup(){
      createCanvas(900,900);
      sun = new Sun();
}

function coloorr(mini){
  if(mini < 360 && mini > -10){
    var bjr = map(mini,-10,360,0,255);
    background(0,floor(bjr/2),bjr);
  } else if (mini > 360){
    var bjr = map(mini,360,720,255,0);
      background(0,floor(bjr/2),bjr);
  } else {
      background(0,0,0);
  }

}

function draw(){
  coloorr(mini);
  sun.show();

  if(bool){
    mini++;
    bool = false;
  } else {
    bool = true;
  }
  sun.update(map(mini,-720,720,0,360));
  if(mini > 720){
    mini = -720;
  }

}
