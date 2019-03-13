//code to have video screen using p5.js
//code by shawn

let videowatch;

function setup() {
  createCanvas(400, 400);

  videowatch = createCapture('VIDEO', captureCallback);
  videowatch.hide();
}

function captureCallback(s) {
  initwebrtc(s);
}

function draw() {
  background(220);

    image(videowatch, 0, 0);

  loadPixels();
  for (let i = 0; i < pixels.length; i+=4) {
    let r = pixels[i];
    let g = pixels[i+1];
    let b = pixels[i+2];

    // There is probably a better way to do threshold?
    if (r+b+g > 200) {
      pixels[i] = 216;
      pixels[i+1] = 191;
      pixels[i+2] = 216;
    } else {
      pixels[i] = 100;
      pixels[i+1] = 149;
      pixels[i+2] = 237;
    }
  }
  updatePixels();

}
