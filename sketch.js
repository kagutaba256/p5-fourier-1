// colors
const SCREEN_COLOR = "#565656";
const FLOOR_COLOR = "#262626";
const BACKGROUND_COLOR = "#161616";
const FUNCTION_COLOR = "#16ff16";

// drawing params
const scale = 30;
const s_length = 6;
const s_height = 3;
const sample = 100;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
  background(BACKGROUND_COLOR);
  orbitControl(5, 5, 5);
  drawScreens();
  drawFloor();
  drawFunctionOnScreen(func1);
}

const func1 = (x) => {
  return x ** 3;
};

const func2 = (x) => {
  return x ** 3;
};

const drawFunctionOnScreen = (f) => {
  const window_length = 10;
  const window_height = 10;
  const length_ratio = window_length / (sample / 2);
  const height_ratio = window_height / (sample / 2);
  let p;
  stroke(FUNCTION_COLOR);
  noFill();
  beginShape();
  for (let i = -(sample / 2); i < sample / 2; i++) {
    p = {};
    p.x = length_ratio * i;
    p.y = -(f(i) * height_ratio);
    p.z = s_length + 1;
    vertex(p.x * scale, p.y * scale, p.z * scale);
  }
  endShape();
};

const drawScreens = () => {
  stroke(SCREEN_COLOR);
  noFill();
  // front screen
  beginShape();
  vertex(s_length * scale, s_height * scale, (s_length + 1) * scale);
  vertex(s_length * scale, -s_height * scale, (s_length + 1) * scale);
  vertex(-s_length * scale, -s_height * scale, (s_length + 1) * scale);
  vertex(-s_length * scale, s_height * scale, (s_length + 1) * scale);
  vertex(s_length * scale, s_height * scale, (s_length + 1) * scale);
  endShape();
  // side screen
  beginShape();
  vertex((s_length + 1) * scale, s_height * scale, -s_length * scale);
  vertex((s_length + 1) * scale, -s_height * scale, -s_length * scale);
  vertex((s_length + 1) * scale, -s_height * scale, s_length * scale);
  vertex((s_length + 1) * scale, s_height * scale, s_length * scale);
  vertex((s_length + 1) * scale, s_height * scale, -s_length * scale);
  endShape();
};

const drawFloor = () => {
  stroke(FLOOR_COLOR);
  fill(FLOOR_COLOR);
  beginShape();
  vertex(s_length * scale, (s_height + 0.5) * scale, -s_length * scale);
  vertex(s_length * scale, (s_height + 0.5) * scale, s_length * scale);
  vertex(-s_length * scale, (s_height + 0.5) * scale, s_length * scale);
  vertex(-s_length * scale, (s_height + 0.5) * scale, -s_length * scale);
  endShape();
};
