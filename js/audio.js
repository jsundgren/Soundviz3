var song, analyzer;
var filter;
var rend = true;

function preload(){
    song = loadSound('fy.ogg');
}

function setup(){
    createCanvas(0.75*windowWidth, 0.75*windowHeight);
    song.loop();
    colorMode(HSB);
    analyzer = new p5.Amplitude();
    analyzer.setInput(song);
    fft = new p5.FFT(0.8,256);
    fft.setInput(song);
}

function draw(){
    background(255);
    var spectrum = fft.analyze();
    push();
        translate(width/2, height/2);
        noStroke();
        beginShape();
        rotate(frameCount*0.01);
        push;
            for(var i = 0; i < spectrum.length; i++){
            var amp = spectrum[i];
            var x = amp*cos(i);
            var y = amp*sin(i);
            fill(36,45,83);
            vertex(x,y);
        }
        endShape();
        pop();
    pop();
    var speed = map(mouseX, 0, width, 0.5, 1.5);
    speed = constrain(speed, 0.01, 4);
    speed = speed.toFixed(2);
    song.rate(speed);
    noStroke();
    fill(38,48,69);
    ellipse(mouseX, mouseY, 20, 20);
    fill(0);
    textSize(16);
    text(speed + "x SPEED", 20, 20);
}

function pause(){
    if(song.isPlaying()){
        song.pause();
        document.getElementById("ppToggle").innerHTML = "&#9654;";
    }else{
        song.play();
        document.getElementById("ppToggle").innerHTML = "&#9724;";
    }
}

function windowResized() {
    resizeCanvas(0.75*windowWidth, 0.75*windowHeight);
}