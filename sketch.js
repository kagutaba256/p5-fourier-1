const w = 800;
let amp = 10;
let per = 10;
let max_per = 100;
const points = [];
let slider;

function setup() {
  createCanvas(800, windowHeight);
  slider = createSlider(1, 100, 30);
}

const f1 = (x) => {
  return x ** 2;
};

const m_sin = (x) => {
  return sin((x / w) * per * PI) * amp;
};

const graph = (f) => {
  let hw = w / 2;
  let prev = {};
  let p = {};
  for (let i = -hw; i < hw; i++) {
    p = {};
    p.x = i;
    p.y = -f(i);
    beginShape();
    vertex(prev.x, prev.y);
    vertex(p.x, p.y);
    endShape();
    prev = p;
  }
};

function draw() {
  background("#161616");
  translate(width / 2, height / 2);
  stroke(255);
  amp = slider.value();
  per = max_per - slider.value();
  graph(m_sin);
}
