//By Gandiolle Eliott

var song;
var slider;
// var slider2;
var slider3;
var pane = 0;
var dir = 1;

function setup(){
  createCanvas(200,200);
  song = loadSound("yourfile.mp3",loaded);
  slider = createSlider(0,1,0.2,0.01);
  // slider2 = createSlider(-1,1,0,0.1);
  slider3 = createSlider(0,3,1,0.01);
}

function togglePlaying(){
  if(song.isPlaying()){
    song.pause()
  } else {
    song.play()
  }
}
function loaded(){
  button = createButton("Play");
  button.mousePressed(togglePlaying);
}

function draw(){
  background(random(255),random(255),0);

  if(pane < 1 && dir == 1){
    pane+=0.01;
  } else {
    dir = 0;
  }

  if(pane > -1 && dir == 0){
    pane-=0.01;
  } else {
    dir = 1;
  }
  song.setVolume(slider.value());
  song.pan(pane);
  // song.pan(slider2.value());
  song.rate(slider3.value());
}
