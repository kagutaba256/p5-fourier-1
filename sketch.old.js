const w = 800;
const hw = w / 2;
let amp = 100;
let per = 0.02;
let max_per = 100;
const points = [];
let slider;

function setup() {
  createCanvas(w, windowHeight);
  slider = createSlider(1, 100, 30);
}

const f1 = (x) => {
  return -(x ** 4) + slider.value() * x;
};

const m_sin = (x) => {
  return sin((x / w) * per * PI) * amp;
};

const fourier = (xs) => {
  let length = 40;
  let X = [];
  let cX = [];
  let sX = [];
  const { complex: c } = math;
  let g = c(-1).mul(c(0, 1)).mul(c(2)).mul(c(PI));
  for (let i = -hw; i < hw; i++) {
    let a = (length / hw) * i;
    let sum = c(0);
    let h = c(Math.E).pow(g.mul(c(a)).div(c(w)));
    for (let i = -hw; i < hw; i++) {
      let x = c(xs[i]).mul(h);
      sum = sum.add(x);
    }
    X[i] = sum;
    cX[i] = X[i].re;
  }
  return cX;
};

const graph = (xs) => {
  let length = 40;
  let prev = {};
  let p = {};
  for (let i = -hw; i < hw; i++) {
    n = (length / hw) * i;
    p = {};
    p.x = i;
    p.y = xs[i];
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
  let xs = [];
  let length = 10;
  let prev = {};
  let p = {};
  let n;
  for (let i = -hw; i < hw; i++) {
    n = (length / hw) * i;
    xs[i] = f1(n);
  }
  stroke(255, 0, 0);
  graph(xs);
  let fx = fourier(xs);
  stroke(0, 255, 0);
  graph(fx);
}
