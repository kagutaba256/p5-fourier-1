// config
const ROTATE_SPEED = 0.0005

// colors
const SCREEN_COLOR = '#565656'
const FLOOR_COLOR = '#262626'
const BACKGROUND_COLOR = '#161616'
const FUNCTION_COLOR = '#16aa16'
const FOURIER_COLOR = '#aa1616'
const SUM_COLOR = '#aa8416'

// drawing params
const scale = 30
const s_length = 6
const s_height = 3
const sample = 76

// private vars
let function_points = []
let fourier_points = []

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL)
}

function draw() {
  background(BACKGROUND_COLOR)
  orbitControl(5, 5, 5)
  rotateY(frameCount * -ROTATE_SPEED)
  drawScreens()
  drawFloor()
  drawFunctionOnScreen(func1)
  drawFourierOnScreen(func1)
}

const func1 = (x) => {
  return x ** 3
}

const func2 = (x) => {
  return x
}

const drawFunctionOnScreen = (f) => {
  let p
  let yscale = 0.00005
  let points = []
  for (let i = -(sample / 2); i < sample / 2; i++) {
    function_points[i + sample / 2] = f(i)
    p = {}
    p.x = i
    let val = -f(i) * yscale
    if (val > s_height) {
      p.y = s_height
    } else if (val < -s_height) {
      p.y = -s_height
    } else {
      p.y = val
    }
    p.z = s_length + 1
    points[i] = p
  }
  stroke(FUNCTION_COLOR)
  noFill()
  beginShape()
  for (let i = -(sample / 2); i < sample / 2; i++) {
    p = points[i]
    vertex(p.x * (s_length / (sample / 2)) * scale, p.y * scale, p.z * scale)
  }
  endShape()
}

const fourier = (f) => {
  const { complex: c } = math
  for (let m = 0; m < sample; m++) {
    let Fm = c(0)
    for (let n = 0; n < sample; n++) {
      Fm = Fm.add(
        function_points[n] *
          Math.E ** -c(0, 1).mul(c(Math.PI)).mul(c(m)).mul(c(n)).div(c(sample))
      )
    }
    fourier_points.push(Fm.div(c(sample)))
  }
}

const drawFourierOnScreen = (f) => {
  let yscale = 0.00005
  const data = new ComplexArray(sample).map((value, i) => {
    value.real = f(i)
  })
  const frequencies = data.FFT()
  stroke(FOURIER_COLOR)
  noFill()
  beginShape()
  let p
  frequencies.map((frequency, i) => {
    p = {}
    p.x = (s_length + 1) * scale
    p.y = frequency.imag * yscale * scale
    p.z = (i - sample / 2) * (-s_length / (sample / 2)) * scale
    vertex(p.x, p.y, p.z)
  })
  endShape()
}

const drawScreens = () => {
  stroke(SCREEN_COLOR)
  noFill()
  // front screen
  beginShape()
  vertex(s_length * scale, s_height * scale, (s_length + 1) * scale)
  vertex(s_length * scale, -s_height * scale, (s_length + 1) * scale)
  vertex(-s_length * scale, -s_height * scale, (s_length + 1) * scale)
  vertex(-s_length * scale, s_height * scale, (s_length + 1) * scale)
  vertex(s_length * scale, s_height * scale, (s_length + 1) * scale)
  endShape()
  // side screen
  beginShape()
  vertex((s_length + 1) * scale, s_height * scale, -s_length * scale)
  vertex((s_length + 1) * scale, -s_height * scale, -s_length * scale)
  vertex((s_length + 1) * scale, -s_height * scale, s_length * scale)
  vertex((s_length + 1) * scale, s_height * scale, s_length * scale)
  vertex((s_length + 1) * scale, s_height * scale, -s_length * scale)
  endShape()
}

const drawFloor = () => {
  stroke(FLOOR_COLOR)
  fill(FLOOR_COLOR)
  beginShape()
  vertex(s_length * scale, (s_height + 0.5) * scale, -s_length * scale)
  vertex(s_length * scale, (s_height + 0.5) * scale, s_length * scale)
  vertex(-s_length * scale, (s_height + 0.5) * scale, s_length * scale)
  vertex(-s_length * scale, (s_height + 0.5) * scale, -s_length * scale)
  endShape()
}
